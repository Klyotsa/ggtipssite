<?php
// backend/api/purchase_history.php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$user_id = $_SESSION['user_id'];
$mysqli = getDbConnection();

$stmt = $mysqli->prepare('SELECT id, item_id, amount, created_at FROM purchases WHERE user_id = ? ORDER BY created_at DESC');
$stmt->bind_param('i', $user_id);
$stmt->execute();
$result = $stmt->get_result();
$purchases = [];
while ($row = $result->fetch_assoc()) {
    $purchases[] = $row;
}
$stmt->close();
$mysqli->close();

echo json_encode(['success' => true, 'purchases' => $purchases]); 