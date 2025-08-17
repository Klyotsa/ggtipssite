<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config.php';

// Проверяем аутентификацию пользователя
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$current_password = $data['current_password'] ?? '';
$new_password = $data['new_password'] ?? '';

if (empty($current_password) || empty($new_password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

if (strlen($new_password) < 8) {
    http_response_code(400);
    echo json_encode(['error' => 'New password must be at least 8 characters long']);
    exit;
}

try {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }

    // Проверяем текущий пароль пользователя
    $stmt = $pdo->prepare('SELECT password_hash FROM users WHERE id = ?');
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($current_password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid current password']);
        exit;
    }

                // Хешируем новый пароль
            $password_hash = password_hash($new_password, PASSWORD_BCRYPT, ['cost' => PASSWORD_COST]);

            // Начинаем транзакцию для обновления пароля
            $pdo->beginTransaction();

            // Сохраняем старый пароль в историю
            $stmt = $pdo->prepare('SELECT password_hash FROM users WHERE id = ?');
            $stmt->execute([$_SESSION['user_id']]);
            $old_password = $stmt->fetch();

            if ($old_password) {
                $stmt = $pdo->prepare('
                    INSERT INTO password_history (user_id, password_hash, changed_by, ip_address, user_agent) 
                    VALUES (?, ?, ?, ?, ?)
                ');
                $stmt->execute([
                    $_SESSION['user_id'],
                    $old_password['password_hash'],
                    'user',
                    $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                    $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
                ]);
            }

            // Обновляем пароль пользователя
            $stmt = $pdo->prepare('
                UPDATE users 
                SET password_hash = ?, password_last_changed = NOW(), password_change_count = password_change_count + 1 
                WHERE id = ?
            ');
            $stmt->execute([$password_hash, $_SESSION['user_id']]);

            // Подтверждаем транзакцию
            $pdo->commit();

    // Логируем изменение пароля
    logActivity($_SESSION['user_id'], 'password_changed', 'User password changed via API');

    echo json_encode([
        'success' => true,
        'message' => 'Password changed successfully'
    ]);

} catch (Exception $e) {
    error_log('Password change error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to change password: ' . $e->getMessage()]);
}
?>
