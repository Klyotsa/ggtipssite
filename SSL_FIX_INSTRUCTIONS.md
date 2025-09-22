# Исправление SSL для GGTips

## Проблема
SSL сертификат настроен для localhost вместо IP адреса 157.230.244.205, что вызывает предупреждения безопасности в браузере.

## Решение
Создан самоподписанный SSL сертификат специально для IP адреса сервера.

## Файлы для развертывания

1. **nginx_ssl_config_fixed.conf** - исправленная конфигурация nginx
2. **generate_ssl_certificate.sh** - скрипт создания SSL сертификата
3. **deploy_ssl_fix.sh** - скрипт автоматического развертывания

## Инструкция по развертыванию

### Вариант 1: Автоматическое развертывание
```bash
# Подключиться к серверу
ssh root@157.230.244.205

# Скачать файлы из репозитория
git clone https://github.com/Klyotsa/ggtipssite.git
cd ggtipssite

# Запустить автоматическое развертывание
chmod +x deploy_ssl_fix.sh
./deploy_ssl_fix.sh
```

### Вариант 2: Ручное развертывание
```bash
# 1. Создать SSL сертификат
chmod +x generate_ssl_certificate.sh
./generate_ssl_certificate.sh

# 2. Создать бэкап конфигурации
cp /etc/nginx/sites-available/ggtips /etc/nginx/sites-available/ggtips.backup

# 3. Установить новую конфигурацию
cp nginx_ssl_config_fixed.conf /etc/nginx/sites-available/ggtips

# 4. Проверить конфигурацию
nginx -t

# 5. Перезагрузить nginx
systemctl reload nginx
```

## Результат
После развертывания:
- ✅ SSL будет работать для IP адреса 157.230.244.205
- ✅ Браузер не будет показывать предупреждения о несоответствии сертификата
- ✅ Сайт будет доступен по https://157.230.244.205
- ✅ Админка: https://157.230.244.205/admin_login.php

## Проверка
После развертывания проверить:
```bash
curl -I https://157.230.244.205/
openssl s_client -connect 157.230.244.205:443 -servername 157.230.244.205
```

