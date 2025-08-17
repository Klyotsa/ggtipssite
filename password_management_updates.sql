-- Обновление таблицы users для управления паролями
ALTER TABLE `users` 
ADD COLUMN `password_remembered` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Флаг запоминания пароля',
ADD COLUMN `password_remembered_at` TIMESTAMP NULL DEFAULT NULL COMMENT 'Дата запоминания пароля',
ADD COLUMN `password_last_changed` TIMESTAMP NULL DEFAULT NULL COMMENT 'Дата последнего изменения пароля',
ADD COLUMN `password_change_count` INT(11) NOT NULL DEFAULT 0 COMMENT 'Количество изменений пароля',
ADD COLUMN `password_reset_requested` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Флаг запроса сброса пароля',
ADD COLUMN `password_reset_requested_at` TIMESTAMP NULL DEFAULT NULL COMMENT 'Дата запроса сброса пароля';

-- Создание таблицы для истории паролей
CREATE TABLE IF NOT EXISTS `password_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `changed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changed_by` enum('user','admin','reset') NOT NULL DEFAULT 'user',
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `changed_at` (`changed_at`),
  CONSTRAINT `password_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Создание таблицы для запомненных паролей (для админов)
CREATE TABLE IF NOT EXISTS `admin_password_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `password_accessed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `user_id` (`user_id`),
  KEY `password_accessed_at` (`password_accessed_at`),
  CONSTRAINT `admin_password_access_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_password_access_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Индексы для оптимизации
CREATE INDEX idx_users_password_management ON users(password_remembered, password_last_changed, password_reset_requested);
CREATE INDEX idx_password_history_user_date ON password_history(user_id, changed_at);

-- Комментарии к новым полям
ALTER TABLE `users` 
MODIFY COLUMN `password_remembered` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Флаг запоминания пароля (0 - не запомнен, 1 - запомнен)',
MODIFY COLUMN `password_remembered_at` TIMESTAMP NULL DEFAULT NULL COMMENT 'Дата запоминания пароля администратором',
MODIFY COLUMN `password_last_changed` TIMESTAMP NULL DEFAULT NULL COMMENT 'Дата последнего изменения пароля пользователем',
MODIFY COLUMN `password_change_count` INT(11) NOT NULL DEFAULT 0 COMMENT 'Количество изменений пароля (для безопасности)',
MODIFY COLUMN `password_reset_requested` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Флаг запроса сброса пароля (0 - нет запроса, 1 - запрос активен)',
MODIFY COLUMN `password_reset_requested_at` TIMESTAMP NULL DEFAULT NULL COMMENT 'Дата последнего запроса сброса пароля';

-- Обновление существующих записей
UPDATE `users` SET 
  `password_last_changed` = `created_at`,
  `password_change_count` = 1
WHERE `password_last_changed` IS NULL;
