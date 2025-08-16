<?php
session_start();
require_once 'backend/config.php';

// Логируем выход
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    logActivity(1, 'admin_logout', 'Выход из админки', [
        'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
        'username' => $_SESSION['admin_username'] ?? ''
    ]);
}

// Очищаем сессию
session_unset();
session_destroy();

// Перенаправляем на страницу входа
header('Location: admin_login.php');
exit;
?>
