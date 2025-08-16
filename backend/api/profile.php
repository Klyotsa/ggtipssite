<?php
// backend/profile.php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$mysqli = getDbConnection();
$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Получить профиль
    $stmt = $mysqli->prepare('SELECT id, email, username, avatar_url, avatar_blob, created_at FROM users WHERE id = ?');
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    if ($user && $user['avatar_blob']) {
        $user['avatar_base64'] = 'data:image/png;base64,' . base64_encode($user['avatar_blob']);
    } else {
        $user['avatar_base64'] = null;
    }
    unset($user['avatar_blob']);
    $stmt->close();
    echo json_encode(['success' => true, 'user' => $user]);
    $mysqli->close();
    exit;
}

// Обновить профиль (username/email/avatar_url)
$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$avatar_url = $data['avatar_url'] ?? null;

if (!$username && !$email && !$avatar_url) {
    http_response_code(400);
    echo json_encode(['error' => 'No data to update']);
    exit;
}

$fields = [];
$params = [];
$types = '';
if ($username) { $fields[] = 'username = ?'; $params[] = $username; $types .= 's'; }
if ($email)    { $fields[] = 'email = ?';    $params[] = $email;    $types .= 's'; }
if ($avatar_url !== null) { $fields[] = 'avatar_url = ?'; $params[] = $avatar_url; $types .= 's'; }
$params[] = $user_id; $types .= 'i';

$sql = 'UPDATE users SET ' . implode(', ', $fields) . ', updated_at = NOW() WHERE id = ?';
$stmt = $mysqli->prepare($sql);
$stmt->bind_param($types, ...$params);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Update failed']);
}
$stmt->close();
$mysqli->close(); 