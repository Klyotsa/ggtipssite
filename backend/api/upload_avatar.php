<?php
// backend/upload_avatar.php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

$user_id = $_SESSION['user_id'];
$file_tmp = $_FILES['avatar']['tmp_name'];
$file_type = $_FILES['avatar']['type'];
$file_data = file_get_contents($file_tmp);

$mysqli = getDbConnection();
$stmt = $mysqli->prepare('UPDATE users SET avatar_blob = ?, updated_at = NOW() WHERE id = ?');
$stmt->send_long_data(0, $file_data);
$stmt->bind_param('bi', $file_data, $user_id);
$stmt->execute();
$stmt->close();
$mysqli->close();
echo json_encode(['success' => true, 'mime_type' => $file_type]); 