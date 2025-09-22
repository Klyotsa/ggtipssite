#!/bin/bash

# Скрипт для развертывания исправления SSL на сервере GGTips
# Запускать на сервере 157.230.244.205

echo "=== Развертывание исправления SSL для GGTips ==="

# 1. Создаем SSL сертификат
echo "Шаг 1: Создание SSL сертификата..."
bash generate_ssl_certificate.sh

# 2. Создаем бэкап текущей конфигурации
echo "Шаг 2: Создание бэкапа текущей конфигурации..."
cp /etc/nginx/sites-available/ggtips /etc/nginx/sites-available/ggtips.backup.$(date +%Y%m%d_%H%M%S)

# 3. Копируем новую конфигурацию
echo "Шаг 3: Установка новой конфигурации nginx..."
cp nginx_ssl_config_fixed.conf /etc/nginx/sites-available/ggtips

# 4. Проверяем конфигурацию nginx
echo "Шаг 4: Проверка конфигурации nginx..."
nginx -t

if [ $? -eq 0 ]; then
    echo "Конфигурация nginx корректна!"
    
    # 5. Перезагружаем nginx
    echo "Шаг 5: Перезагрузка nginx..."
    systemctl reload nginx
    
    # 6. Проверяем статус nginx
    echo "Шаг 6: Проверка статуса nginx..."
    systemctl status nginx --no-pager
    
    echo ""
    echo "=== SSL исправление завершено! ==="
    echo "Сайт теперь доступен по адресу: https://157.230.244.205"
    echo "Админка: https://157.230.244.205/admin_login.php"
    echo ""
    echo "Примечание: Браузер может показать предупреждение о самоподписанном сертификате."
    echo "Это нормально для самоподписанного сертификата."
    
else
    echo "ОШИБКА: Конфигурация nginx некорректна!"
    echo "Восстанавливаем бэкап..."
    cp /etc/nginx/sites-available/ggtips.backup.$(date +%Y%m%d_%H%M%S) /etc/nginx/sites-available/ggtips
    exit 1
fi

