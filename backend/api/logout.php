<?php
// backend/api/logout.php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    // Логируем выход
    try {
        require_once __DIR__ . '/config.php';
        $pdo = getDBConnection();
        if ($pdo) {
            $ip = $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
            logActivity($_SESSION['user_id'], 'user_logout', 'User logout', $ip, $_SERVER['HTTP_USER_AGENT'] ?? 'unknown');
        }
    } catch (Exception $e) {
        error_log('Logout logging error: ' . $e->getMessage());
    }
}

// Уничтожаем сессию
session_destroy();

echo json_encode(['success' => true, 'message' => 'Logged out successfully']); 