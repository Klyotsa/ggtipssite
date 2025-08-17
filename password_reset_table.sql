-- Создание таблицы для токенов сброса пароля
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `user_id` (`user_id`),
  KEY `expires_at` (`expires_at`),
  KEY `used` (`used`),
  CONSTRAINT `password_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Индексы для оптимизации
CREATE INDEX idx_password_reset_user_expires ON password_reset_tokens(user_id, expires_at);
CREATE INDEX idx_password_reset_token_valid ON password_reset_tokens(token, expires_at, used);

-- Комментарии к таблице
ALTER TABLE `password_reset_tokens` COMMENT = 'Токены для сброса паролей пользователей';

-- Добавление комментариев к полям
ALTER TABLE `password_reset_tokens` 
MODIFY COLUMN `user_id` int(11) NOT NULL COMMENT 'ID пользователя',
MODIFY COLUMN `token` varchar(64) NOT NULL COMMENT 'Уникальный токен для сброса пароля',
MODIFY COLUMN `expires_at` datetime NOT NULL COMMENT 'Дата истечения токена',
MODIFY COLUMN `used` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Флаг использования токена (0 - не использован, 1 - использован)',
MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата создания токена';
