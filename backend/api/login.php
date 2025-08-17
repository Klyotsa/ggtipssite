<?php
// backend/api/login.php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$data = json_decode(file_get_contents('php://input'), true);
$login = trim($data['login'] ?? ''); // email или username
$password = $data['password'] ?? '';

if (!$login || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }

    $stmt = $pdo->prepare('SELECT id, email, username, password_hash, avatar_url, created_at FROM users WHERE email = ? OR username = ?');
    $stmt->execute([$login, $login]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    // Устанавливаем сессию
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_username'] = $user['username'];
    $_SESSION['user_email'] = $user['email'];
    
    // Логируем активность
    $ip = $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    logActivity($user['id'], 'user_login', 'User login successful', $ip, $_SERVER['HTTP_USER_AGENT'] ?? 'unknown');
    
    // Не возвращаем password_hash
    unset($user['password_hash']);
    
    echo json_encode(['success' => true, 'user' => $user]);
    
} catch (Exception $e) {
    error_log('Login error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Login failed: ' . $e->getMessage()]);
} 