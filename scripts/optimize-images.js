const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

const SOURCE_DIR = path.join(__dirname, '../public');
const DEST_DIR = path.join(__dirname, '../public/optimized');
const FAVICON_SIZES = [16, 32, 192, 512];

// Создаем директории если их нет
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Создаем директорию для favicon
const FAVICON_DIR = path.join(__dirname, '../public/icons');
if (!fs.existsSync(FAVICON_DIR)) {
  fs.mkdirSync(FAVICON_DIR, { recursive: true });
}

// Функция для создания favicon разных размеров
async function createFavicons() {
  const logoPath = path.join(SOURCE_DIR, 'logo_brand.png');
  
  try {
    // Создаем favicon.ico и разные размеры PNG
    for (const size of FAVICON_SIZES) {
      await sharp(logoPath)
        .resize(size, size)
        .toFile(path.join(FAVICON_DIR, `favicon-${size}x${size}.png`));
      
      console.log(`✅ Created favicon ${size}x${size}`);
    }
    
    // Создаем apple-touch-icon
    await sharp(logoPath)
      .resize(180, 180)
      .toFile(path.join(FAVICON_DIR, 'apple-touch-icon.png'));
    
    console.log('✅ Created apple-touch-icon');
    
    // Копируем favicon в корень для совместимости
    await sharp(logoPath)
      .resize(32, 32)
      .toFile(path.join(SOURCE_DIR, 'favicon.png'));
    
    console.log('✅ Created root favicon.png');
  } catch (error) {
    console.error('❌ Error creating favicons:', error);
  }
}

// Функция для оптимизации GIF
async function optimizeGif(filePath) {
  const fileName = path.basename(filePath);
  const outputPath = path.join(DEST_DIR, fileName);
  
  try {
    // GIF не так просто оптимизировать с sharp, поэтому просто копируем
    // В реальном проекте здесь можно использовать другие библиотеки для оптимизации GIF
    fs.copyFileSync(filePath, outputPath);
    console.log(`✅ Copied GIF: ${fileName}`);
    return outputPath;
  } catch (error) {
    console.error(`❌ Error processing GIF ${fileName}:`, error);
    return null;
  }
}

// Функция для оптимизации одного изображения
async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const extname = path.extname(filePath).toLowerCase();
  const outputPath = path.join(DEST_DIR, fileName);
  const webpPath = path.join(DEST_DIR, fileName.replace(extname, '.webp'));
  
  try {
    if (extname === '.gif') {
      return await optimizeGif(filePath);
    }
    
    // Оптимизируем оригинальное изображение
    await sharp(filePath)
      .resize({ width: 1920, withoutEnlargement: true }) // Максимальная ширина 1920px
      .toFile(outputPath);
    
    // Создаем WebP версию
    await imagemin([filePath], {
      destination: DEST_DIR,
      plugins: [
        imageminWebp({ quality: 80 })
      ]
    });
    
    console.log(`✅ Optimized: ${fileName} and created WebP version`);
    return { original: outputPath, webp: webpPath };
  } catch (error) {
    console.error(`❌ Error optimizing ${fileName}:`, error);
    return null;
  }
}

// Функция для создания favicon и обновления HTML
async function updateHTML() {
  const indexPath = path.join(SOURCE_DIR, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Обновляем ссылки на favicon
  html = html.replace(
    /<link rel="icon".*?>/g,
    '<link rel="icon" type="image/png" href="/icons/favicon-32x32.png">'
  );
  
  html = html.replace(
    /<link rel="apple-touch-icon".*?>/g,
    '<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">'
  );
  
  // Добавляем preload для критических изображений
  const preloadSection = `
    <!-- Preload critical assets -->
    <link rel="preload" href="/optimized/logo_brand.png" as="image">
    <link rel="preload" href="/optimized/imagebghead.webp" as="image">
  `;
  
  html = html.replace(
    /<\/head>/,
    `${preloadSection}\n</head>`
  );
  
  // Добавляем script для ленивой загрузки изображений
  const lazyLoadScript = `
    <script>
      // Ленивая загрузка изображений
      document.addEventListener("DOMContentLoaded", function() {
        var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
        
        if ("IntersectionObserver" in window) {
          let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                let lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                if (lazyImage.dataset.srcset) {
                  lazyImage.srcset = lazyImage.dataset.srcset;
                }
                lazyImage.classList.remove("lazy");
                lazyImageObserver.unobserve(lazyImage);
              }
            });
          });
          
          lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
          });
        } else {
          // Fallback для браузеров без IntersectionObserver
          let lazyImageTimeout;
          
          function lazyLoad() {
            if (lazyImageTimeout) {
              clearTimeout(lazyImageTimeout);
            }
            
            lazyImageTimeout = setTimeout(function() {
              let scrollTop = window.pageYOffset;
              lazyImages.forEach(function(lazyImage) {
                if (lazyImage.offsetTop < (window.innerHeight + scrollTop)) {
                  lazyImage.src = lazyImage.dataset.src;
                  if (lazyImage.dataset.srcset) {
                    lazyImage.srcset = lazyImage.dataset.srcset;
                  }
                  lazyImage.classList.remove("lazy");
                }
              });
              if (lazyImages.length == 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationChange", lazyLoad);
              }
            }, 20);
          }
          
          document.addEventListener("scroll", lazyLoad);
          window.addEventListener("resize", lazyLoad);
          window.addEventListener("orientationChange", lazyLoad);
        }
      });
    </script>
  `;
  
  html = html.replace(
    /<\/body>/,
    `${lazyLoadScript}\n</body>`
  );
  
  // Обновляем манифест
  const manifestPath = path.join(SOURCE_DIR, 'site.webmanifest');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  manifest.icons = FAVICON_SIZES.map(size => ({
    src: `/icons/favicon-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: "image/png"
  }));
  
  // Записываем обновленные файлы
  fs.writeFileSync(indexPath, html);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('✅ Updated HTML and manifest file');
}

// Основная функция
async function main() {
  console.log('🔍 Starting image optimization...');
  
  // Создаем иконки
  await createFavicons();
  
  // Получаем список всех изображений
  const files = fs.readdirSync(SOURCE_DIR);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });
  
  console.log(`🖼 Found ${imageFiles.length} images to optimize`);
  
  // Оптимизируем каждое изображение
  for (const file of imageFiles) {
    await optimizeImage(path.join(SOURCE_DIR, file));
  }
  
  // Обновляем HTML и манифест
  await updateHTML();
  
  console.log('✨ Image optimization complete!');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
}); 