<?php
session_start();

// Логируем выход
if (isset($_SESSION['admin_username'])) {
    $username = $_SESSION['admin_username'];
    $ip = $_SESSION['admin_ip'] ?? 'unknown';
    error_log("Admin logout: Username: $username, IP: $ip");
}

// Уничтожаем сессию
session_destroy();

// Перенаправляем на страницу входа
header('Location: admin_login.php');
exit;
?>
