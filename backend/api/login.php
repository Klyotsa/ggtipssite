<?php
// backend/login.php
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

$mysqli = getDbConnection();
$stmt = $mysqli->prepare('SELECT id, email, username, password_hash, avatar_url, created_at FROM users WHERE email = ? OR username = ?');
$stmt->bind_param('ss', $login, $login);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'User not found']);
    exit;
}
if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Wrong password']);
    exit;
}
// Устанавливаем сессию
$_SESSION['user_id'] = $user['id'];
// Не возвращаем password_hash
unset($user['password_hash']);
echo json_encode(['success' => true, 'user' => $user]);
$mysqli->close(); 