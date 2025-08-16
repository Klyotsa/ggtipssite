# Решение проблем с отображением изображений

Если после загрузки сайта на хостинг изображения не отображаются, выполните следующие действия:

## 1. Проверка структуры файлов на хостинге

Убедитесь, что все файлы загружены в правильные директории:

- Все HTML, CSS и JavaScript файлы должны быть в корне сайта
- Папка `assets` должна находиться в корне сайта
- Все изображения должны быть как в корне, так и в папке `assets/images/`
- Файл `.htaccess` должен быть загружен в корень сайта

## 2. Исправление путей к изображениям вручную

Если изображения по-прежнему не отображаются, проверьте HTML код сайта:

1. Откройте файл `index.html` в корне сайта
2. Найдите ссылки на изображения и проверьте правильность путей
3. При необходимости исправьте пути к изображениям:

```html
<!-- Исправьте пути в HTML -->
<img src="./logo_brand.png" alt="Logo">
<!-- или используйте абсолютные пути -->
<img src="/logo_brand.png" alt="Logo">
```

## 3. Проверка прав доступа к файлам

Установите правильные права доступа:

```
chmod 644 *.jpg *.png *.gif
chmod 644 assets/images/*
```

## 4. Добавление файла .htaccess

Если файл `.htaccess` отсутствует или не работает, создайте новый файл в корне сайта со следующим содержимым:

```
# Включение модуля перезаписи
RewriteEngine On

# Обработка статических файлов
<IfModule mod_headers.c>
  <FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
</IfModule>

# Правильные MIME-типы
<IfModule mod_mime.c>
  AddType image/jpeg .jpg .jpeg
  AddType image/png .png
  AddType image/gif .gif
  AddType image/svg+xml .svg
</IfModule>

# SPA редиректы для React Router
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 5. Альтернативное решение: встраивание изображений (если ничего другое не помогает)

В крайнем случае можно преобразовать изображение в формат base64 и встроить их непосредственно в HTML/CSS:

1. Преобразуйте изображение в base64 (используя онлайн инструменты)
2. Добавьте встроенное изображение в CSS:

```css
.logo {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...');
}
```

## 6. Решение проблем с CORS

Если у вас возникают ошибки CORS, добавьте следующие заголовки в `.htaccess`:

```
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header set Access-Control-Allow-Headers "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type"
</IfModule>
```

## 7. Проверка в консоли браузера

Откройте консоль браузера (F12) и проверьте ошибки:
- Ошибки 404: файл не найден по указанному пути
- Ошибки CORS: проблемы с политикой безопасности
- Другие ошибки, связанные с загрузкой ресурсов

## 8. Связь с хостинг-провайдером

Если ничего не помогает, свяжитесь с технической поддержкой вашего хостинг-провайдера для получения помощи с настройкой сервера. 