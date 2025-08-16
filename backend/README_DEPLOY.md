# Деплой PHP backend на Reg.ru

1. **Загрузите папку backend/** (все файлы из backend/api, .htaccess, и папку avatars/) в корень вашего сайта (обычно `public_html/backend` или аналогично через FTP/файловый менеджер Reg.ru).
   - Папка avatars создается автоматически при первой загрузке аватара, либо создайте вручную с правами 755.
   - Все PHP-файлы теперь лежат в backend/api (например, backend/api/register.php).

2. **Настройте config.php**
   - Впишите свои значения DB_USER и DB_PASS из панели управления базами данных Reg.ru в backend/api/config.php.

3. **Проверьте права на папку backend/**
   - Все файлы должны быть доступны для чтения сервером (обычно права 644 для файлов, 755 для папок).
   - Папка avatars должна быть доступна для записи (755).

4. **Тестирование API**
   - Пример запроса регистрации (POST):
     - URL: `https://ganggametips.com/backend/api/register.php`
     - Тело (JSON):
       ```json
       {"email": "test@example.com", "username": "testuser", "password": "123456"}
       ```
   - Пример запроса логина (POST):
     - URL: `https://ganggametips.com/backend/api/login.php`
     - Тело (JSON):
       ```json
       {"login": "testuser", "password": "123456"}
       ```
   - Для профиля используйте GET/POST запросы к `api/profile.php` (куки сессии сохраняются браузером автоматически).
   - Для загрузки аватара используйте POST multipart/form-data на `api/upload_avatar.php`:
     - URL: `https://ganggametips.com/backend/api/upload_avatar.php`
     - FormData: поле avatar (файл)

5. **Интеграция с React**
   - Используйте fetch/axios для запросов к API:
     ```js
     // Регистрация
     fetch('https://ganggametips.com/backend/api/register.php', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, username, password })
     })
     // Логин
     fetch('https://ganggametips.com/backend/api/login.php', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ login, password }),
       credentials: 'include' // важно для сессий
     })
     // Получить профиль
     fetch('https://ganggametips.com/backend/api/profile.php', {
       method: 'GET',
       credentials: 'include'
     })
     // Загрузка аватара
     const formData = new FormData();
     formData.append('avatar', file);
     fetch('https://ganggametips.com/backend/api/upload_avatar.php', {
       method: 'POST',
       body: formData,
       credentials: 'include'
     })
     // После загрузки avatar_url будет вида /backend/avatars/имяфайла.jpg
     // Для отображения: <img src={`https://ganggametips.com${avatar_url}`} ... />
     ```

6. **Безопасность**
   - Не храните config.php в общедоступных местах.
   - Не забудьте сменить пароль БД на сложный.

7. **Вопросы?**
   - Пишите сюда или в поддержку Reg.ru, если возникнут ошибки с доступом или правами. 

# Включить mod_rewrite
RewriteEngine On
RewriteBase /

# Не трогать index.html напрямую
RewriteRule ^index\.html$ - [L]

# Если не найден файл или папка — отдавать index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L] 