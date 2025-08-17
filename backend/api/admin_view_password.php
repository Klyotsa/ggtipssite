<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config.php';

// Проверяем аутентификацию администратора
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'] ?? null;
$reason = $data['reason'] ?? 'Administrative access';

if (!$user_id || !is_numeric($user_id)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid user ID']);
    exit;
}

try {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }

    // Проверяем, что пользователь существует
    $stmt = $pdo->prepare('SELECT id, username, email, password_hash FROM users WHERE id = ?');
    $stmt->execute([$user_id]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }

    // Начинаем транзакцию
    $pdo->beginTransaction();

    // Логируем доступ к паролю
    $stmt = $pdo->prepare('
        INSERT INTO admin_password_access (admin_id, user_id, ip_address, user_agent, reason) 
        VALUES (?, ?, ?, ?, ?)
    ');
    $stmt->execute([
        1, // ID администратора
        $user_id,
        $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        $reason
    ]);

    // Помечаем пароль как запомненный
    $stmt = $pdo->prepare('
        UPDATE users 
        SET password_remembered = 1, password_remembered_at = NOW() 
        WHERE id = ?
    ');
    $stmt->execute([$user_id]);

    // Подтверждаем транзакцию
    $pdo->commit();

    // Логируем активность
    logActivity(1, 'admin_password_view', "Admin viewed password for user: {$user['username']} (ID: $user_id)");

    // Возвращаем информацию о пароле (только хеш для безопасности)
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'password_hash' => $user['password_hash'],
            'password_remembered' => true,
            'password_remembered_at' => date('Y-m-d H:i:s')
        ],
        'message' => 'Password accessed and logged successfully'
    ]);

} catch (Exception $e) {
    // Откатываем транзакцию в случае ошибки
    if ($pdo) {
        $pdo->rollBack();
    }
    
    error_log('Admin password view error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to access password: ' . $e->getMessage()]);
}
?>
