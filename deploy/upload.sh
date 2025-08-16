#!/bin/bash

# Скрипт для загрузки проекта на FTP-хостинг
# Использование: ./upload.sh <host> <username> <password> <remote_dir>
# Пример: ./upload.sh ftp.example.com user pass /public_html

# Проверяем количество аргументов
if [ "$#" -ne 4 ]; then
    echo "Использование: $0 <host> <username> <password> <remote_dir>"
    exit 1
fi

# Параметры
FTP_HOST="$1"
FTP_USER="$2"
FTP_PASS="$3"
REMOTE_DIR="$4"
LOCAL_DIR="../dist"

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Проверяем наличие локальной директории dist
if [ ! -d "$LOCAL_DIR" ]; then
    echo -e "${RED}Ошибка: Директория $LOCAL_DIR не найдена. Сначала выполните сборку проекта.${NC}"
    exit 1
fi

# Проверяем наличие lftp
if ! command -v lftp &> /dev/null; then
    echo -e "${YELLOW}Утилита lftp не найдена. Пробуем установить...${NC}"
    
    # Определяем систему и устанавливаем lftp
    if [ "$(uname)" == "Darwin" ]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install lftp
        else
            echo -e "${RED}Homebrew не найден. Пожалуйста, установите lftp вручную.${NC}"
            exit 1
        fi
    elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
        # Linux
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y lftp
        elif command -v yum &> /dev/null; then
            sudo yum install -y lftp
        else
            echo -e "${RED}Не удается установить lftp. Пожалуйста, установите вручную.${NC}"
            exit 1
        fi
    else
        echo -e "${RED}Неподдерживаемая операционная система. Пожалуйста, установите lftp вручную.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}Начинаю загрузку файлов на FTP-сервер: $FTP_HOST${NC}"

# Создаем LFTP скрипт
LFTP_SCRIPT=$(mktemp)
cat > "$LFTP_SCRIPT" << EOF
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
mirror -R --delete --verbose $LOCAL_DIR .
bye
EOF

# Выполняем загрузку через lftp
lftp -f "$LFTP_SCRIPT"

# Проверяем результат
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Загрузка завершена успешно!${NC}"
    echo -e "${YELLOW}Важно: проверьте правильность отображения медиафайлов на сайте.${NC}"
else
    echo -e "${RED}Ошибка при загрузке файлов.${NC}"
    exit 1
fi

# Удаляем временный скрипт
rm "$LFTP_SCRIPT"

echo -e "${GREEN}Не забудьте выполнить чеклист проверки после деплоя:${NC}"
echo -e "${YELLOW}1. Проверьте работу всех маршрутов${NC}"
echo -e "${YELLOW}2. Проверьте отображение всех изображений и медиафайлов${NC}"
echo -e "${YELLOW}3. Проверьте корректность работы навигации${NC}"
echo -e "${YELLOW}4. Проверьте кэширование статических ресурсов${NC}"

exit 0 