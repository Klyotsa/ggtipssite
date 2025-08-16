// Скрипт для копирования всех медиафайлов и проверки их наличия
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Исходная директория с файлами
const publicDir = path.join(rootDir, 'public');
// Целевая директория для сборки
const distDir = path.join(rootDir, 'dist');

// Список расширений для различных типов файлов
const mediaExtensions = [
  // Изображения
  '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico',
  // Видео
  '.mp4', '.webm', '.ogv', '.mov',
  // Аудио
  '.mp3', '.ogg', '.wav',
  // Шрифты
  '.woff', '.woff2', '.ttf', '.otf', '.eot'
];

/**
 * Проверяет, является ли файл медиа-файлом
 * @param {string} filename Имя файла
 * @returns {boolean} true, если файл является медиа-файлом
 */
function isMediaFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return mediaExtensions.includes(ext);
}

/**
 * Рекурсивно читает все файлы в директории
 * @param {string} dir Путь к директории
 * @returns {Promise<string[]>} Массив путей к файлам
 */
async function readDirRecursive(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map(async (dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? await readDirRecursive(res) : res;
  }));
  return files.flat();
}

/**
 * Обеспечивает наличие директории
 * @param {string} dir Путь к директории
 */
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Копирует файл из исходной директории в целевую
 * @param {string} src Путь к исходному файлу
 * @param {string} dest Путь к целевому файлу
 */
async function copyFile(src, dest) {
  try {
    await ensureDir(path.dirname(dest));
    await fs.copyFile(src, dest);
    console.log(`✓ Скопирован: ${path.relative(rootDir, src)} -> ${path.relative(rootDir, dest)}`);
  } catch (error) {
    console.error(`✗ Ошибка копирования файла ${src}: ${error.message}`);
  }
}

/**
 * Копирует все медиа-файлы из исходной директории в целевую
 */
async function copyMediaFiles() {
  try {
    // Проверяем, существует ли директория public
    try {
      await fs.access(publicDir);
    } catch (error) {
      console.warn(`⚠ Директория public не найдена: ${error.message}`);
      return;
    }

    // Проверяем, существует ли директория dist
    try {
      await fs.access(distDir);
    } catch (error) {
      await ensureDir(distDir);
      console.log(`✓ Создана директория dist`);
    }

    const files = await readDirRecursive(publicDir);
    const mediaFiles = files.filter(file => isMediaFile(file));

    console.log(`Найдено ${mediaFiles.length} медиа-файлов для копирования`);

    // Копируем каждый медиа-файл
    await Promise.all(mediaFiles.map(async (file) => {
      // Создаем путь к целевому файлу, сохраняя структуру директорий
      const relativePath = path.relative(publicDir, file);
      const destPath = path.join(distDir, relativePath);
      await copyFile(file, destPath);
    }));

    // Копируем .htaccess файл, если он существует
    const htaccessPath = path.join(rootDir, '.htaccess');
    try {
      await fs.access(htaccessPath);
      await copyFile(htaccessPath, path.join(distDir, '.htaccess'));
    } catch (error) {
      console.warn(`⚠ .htaccess не найден или не может быть скопирован: ${error.message}`);
    }

    console.log('✓ Копирование медиа-файлов завершено');
  } catch (error) {
    console.error(`✗ Ошибка при копировании медиа-файлов: ${error.message}`);
    process.exit(1);
  }
}

// Запуск скрипта
copyMediaFiles(); 