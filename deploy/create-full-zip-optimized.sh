#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Название архива
ZIP_NAME="GGTips_website_optimized.zip"
TEMP_DIR="deploy/temp_hosting_optimized"

echo -e "${BLUE}Начинаю создание полного ZIP-архива для хостинга с оптимизированными изображениями...${NC}"

# Удаляем старый архив, если он существует
if [ -f "$ZIP_NAME" ]; then
    echo -e "${YELLOW}Найден старый архив. Удаляю...${NC}"
    rm -f "$ZIP_NAME"
fi

# Создаем временную директорию для подготовки файлов
echo -e "${BLUE}Создаю временную директорию для подготовки файлов...${NC}"
mkdir -p $TEMP_DIR

# Проверяем наличие директории dist
if [ ! -d "dist" ]; then
    echo -e "${RED}Ошибка: Директория dist не найдена. Пожалуйста, запустите 'npm run build' перед созданием архива.${NC}"
    exit 1
fi

# Копируем файлы из директории dist
echo -e "${BLUE}Копирую файлы из директории dist...${NC}"
cp -r dist/* $TEMP_DIR/

# Копируем оптимизированные изображения
echo -e "${BLUE}Копирую оптимизированные изображения...${NC}"
mkdir -p $TEMP_DIR/optimized
cp -r public/optimized/* $TEMP_DIR/optimized/

# Копируем иконки
echo -e "${BLUE}Копирую иконки...${NC}"
mkdir -p $TEMP_DIR/icons
cp -r public/icons/* $TEMP_DIR/icons/

# Проверяем наличие .htaccess
echo -e "${BLUE}Проверяю наличие .htaccess...${NC}"
if [ ! -f "$TEMP_DIR/.htaccess" ]; then
    echo -e "${YELLOW}Файл .htaccess не найден в dist. Копирую из корня проекта...${NC}"
    cp .htaccess $TEMP_DIR/
fi

# Добавляем документацию
echo -e "${BLUE}Добавляю документацию и конфигурационные файлы...${NC}"
mkdir -p $TEMP_DIR/hosting_config
cp deploy/hosting/README.txt $TEMP_DIR/
cp deploy/hosting/README-fix.md $TEMP_DIR/hosting_config/
cp deploy/hosting/netlify.toml $TEMP_DIR/hosting_config/
cp deploy/hosting/vercel.json $TEMP_DIR/hosting_config/
cp deploy/deploy-checklist.md $TEMP_DIR/hosting_config/
cp deploy/hosting/README.md $TEMP_DIR/hosting_config/

# Создаем ZIP-архив
echo -e "${BLUE}Создаю ZIP-архив с оптимизированными изображениями...${NC}"
cd $TEMP_DIR && zip -r ../../$ZIP_NAME . && cd ../../

# Проверяем, создан ли архив успешно
if [ -f "$ZIP_NAME" ]; then
    ZIP_SIZE=$(du -h "$ZIP_NAME" | cut -f1)
    echo -e "${GREEN}ZIP-архив успешно создан: $ZIP_NAME${NC}"
    echo -e "${GREEN}Размер архива: $ZIP_SIZE${NC}"
else
    echo -e "${RED}Ошибка при создании ZIP-архива.${NC}"
    exit 1
fi

# Очищаем временные файлы
echo -e "${BLUE}Очистка временных файлов...${NC}"
rm -rf $TEMP_DIR

echo -e "${GREEN}=====================================================${NC}"
echo -e "${GREEN}Архив готов для загрузки на хостинг!${NC}"
echo -e "${GREEN}Путь к архиву: $(pwd)/$ZIP_NAME${NC}"
echo -e "${YELLOW}Этот архив содержит ОПТИМИЗИРОВАННЫЕ изображения и WebP версии.${NC}"
echo -e "${GREEN}=====================================================${NC}"
echo -e "${BLUE}Инструкция по использованию:${NC}"
echo -e "${BLUE}1. Скачайте архив $ZIP_NAME${NC}"
echo -e "${BLUE}2. Распакуйте все содержимое архива в корень вашего хостинга${NC}"
echo -e "${BLUE}3. Убедитесь, что файл .htaccess присутствует и не скрыт${NC}"
echo -e "${BLUE}4. Проверьте отображение всех медиафайлов после загрузки${NC}"
echo -e "${GREEN}=====================================================${NC}" 