<?php
// backend/register.php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';
$verification_code = $data['verification_code'] ?? '';

if (!$email || !$username || !$password || !$verification_code) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Проверка кода из сессии
if (!isset($_SESSION['email_verification'][$email])) {
    http_response_code(400);
    echo json_encode(['error' => 'Verification code not sent']);
    exit;
}
$codeData = $_SESSION['email_verification'][$email];
if ($codeData['expires'] < time()) {
    unset($_SESSION['email_verification'][$email]);
    http_response_code(400);
    echo json_encode(['error' => 'Verification code expired']);
    exit;
}
if ((string)$codeData['code'] !== (string)$verification_code) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid verification code']);
    exit;
}
// Всё ок — удаляем код, продолжаем регистрацию
unset($_SESSION['email_verification'][$email]);

$mysqli = getDbConnection();

// Проверка уникальности email и username
$stmt = $mysqli->prepare('SELECT id FROM users WHERE email = ? OR username = ?');
$stmt->bind_param('ss', $email, $username);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['error' => 'Email or username already exists']);
    exit;
}
$stmt->close();

// Хеширование пароля
$password_hash = password_hash($password, PASSWORD_BCRYPT);

// Сохранение пользователя
$stmt = $mysqli->prepare('INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $email, $username, $password_hash);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'user_id' => $stmt->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed']);
}
$stmt->close();
$mysqli->close(); 