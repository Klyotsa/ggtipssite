#!/bin/bash

# Скрипт для создания ZIP-архива для хостинга
# Использование: ./create-hosting-zip.sh

# Устанавливаем переменные
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_ROOT/dist"
HOSTING_DIR="$PROJECT_ROOT/deploy/hosting"
ZIP_NAME="GGTips_hosting.zip"
ZIP_PATH="$PROJECT_ROOT/$ZIP_NAME"

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Проверяем наличие директории dist
if [ ! -d "$DIST_DIR" ]; then
    echo -e "${RED}Ошибка: Директория $DIST_DIR не найдена."
    echo -e "Сначала выполните сборку проекта: npm run build${NC}"
    exit 1
fi

echo -e "${GREEN}Начинаю создание ZIP-архива для хостинга...${NC}"

# Проверяем наличие старого архива и удаляем его
if [ -f "$ZIP_PATH" ]; then
    echo -e "${YELLOW}Найден старый архив. Удаляю...${NC}"
    rm "$ZIP_PATH"
fi

# Создаем временную директорию для подготовки файлов
TEMP_DIR="$PROJECT_ROOT/deploy/temp_hosting"
mkdir -p "$TEMP_DIR"

# Копируем все файлы из dist в временную директорию
echo -e "${GREEN}Копирую файлы из директории dist...${NC}"
cp -R "$DIST_DIR"/* "$TEMP_DIR"

# Копируем дополнительные файлы для настройки хостинга
echo -e "${GREEN}Добавляю документацию и конфигурационные файлы...${NC}"
mkdir -p "$TEMP_DIR/hosting_config"
cp "$HOSTING_DIR/README.txt" "$TEMP_DIR"
cp "$HOSTING_DIR/README.md" "$TEMP_DIR/hosting_config"
cp "$HOSTING_DIR/deploy-checklist.md" "$TEMP_DIR/hosting_config"
cp "$HOSTING_DIR/netlify.toml" "$TEMP_DIR/hosting_config"
cp "$HOSTING_DIR/vercel.json" "$TEMP_DIR/hosting_config"

# Переходим в директорию и создаем архив
echo -e "${GREEN}Создаю ZIP-архив...${NC}"
cd "$TEMP_DIR"

# Для macOS проверяем наличие специального ключа -j для zip
if [ "$(uname)" == "Darwin" ]; then
    # Современные версии macOS поддерживают этот флаг
    zip -r "$ZIP_PATH" .
else
    # Для других систем (в основном Linux)
    zip -r "$ZIP_PATH" .
fi

# Проверяем результат
if [ $? -eq 0 ]; then
    echo -e "${GREEN}ZIP-архив успешно создан: $ZIP_NAME${NC}"
    echo -e "${GREEN}Размер архива: $(du -h "$ZIP_PATH" | cut -f1)${NC}"
else
    echo -e "${RED}Ошибка при создании ZIP-архива.${NC}"
    exit 1
fi

# Удаляем временную директорию
echo -e "${YELLOW}Очистка временных файлов...${NC}"
rm -rf "$TEMP_DIR"

echo -e "${GREEN}Архив готов для загрузки на хостинг!${NC}"
echo -e "${YELLOW}Путь к архиву: $ZIP_PATH${NC}"
echo -e "${YELLOW}Все необходимые инструкции находятся в README.txt внутри архива.${NC}"

exit 0 