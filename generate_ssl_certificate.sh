#!/bin/bash

# Скрипт для создания SSL сертификата для IP адреса 157.230.244.205
# Запускать на сервере

echo "Создание SSL сертификата для GGTips..."

# Создаем директории если не существуют
mkdir -p /etc/ssl/certs
mkdir -p /etc/ssl/private

# Создаем конфигурацию для OpenSSL
cat > /tmp/ssl.conf << EOF
[req]
default_bits = 4096
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = v3_req

[dn]
C=RU
ST=Moscow
L=Moscow
O=GGTips
OU=IT Department
CN=157.230.244.205

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
IP.1 = 157.230.244.205
DNS.1 = localhost
EOF

# Генерируем приватный ключ и сертификат
openssl req -new -x509 -newkey rsa:4096 -sha256 -nodes -keyout /etc/ssl/private/ggtips.key -days 365 -out /etc/ssl/certs/ggtips.crt -config /tmp/ssl.conf

# Устанавливаем правильные права доступа
chmod 600 /etc/ssl/private/ggtips.key
chmod 644 /etc/ssl/certs/ggtips.crt

# Удаляем временный файл
rm /tmp/ssl.conf

echo "SSL сертификат создан успешно!"
echo "Файлы:"
echo "  Сертификат: /etc/ssl/certs/ggtips.crt"
echo "  Приватный ключ: /etc/ssl/private/ggtips.key"

# Проверяем сертификат
echo "Проверка сертификата:"
openssl x509 -in /etc/ssl/certs/ggtips.crt -text -noout | grep -A 2 "Subject Alternative Name"

