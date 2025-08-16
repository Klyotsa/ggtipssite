<?php
// backend/api/topup_balance.php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$amount = isset($data['amount']) ? floatval($data['amount']) : 0;
if ($amount <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid amount']);
    exit;
}

$user_id = $_SESSION['user_id'];
$mysqli = getDbConnection();

// Пополнение баланса (вставка или обновление)
$stmt = $mysqli->prepare('INSERT INTO user_balance (user_id, balance) VALUES (?, ?) ON DUPLICATE KEY UPDATE balance = balance + VALUES(balance)');
$stmt->bind_param('id', $user_id, $amount);
if ($stmt->execute()) {
    // Получаем новый баланс
    $stmt2 = $mysqli->prepare('SELECT balance FROM user_balance WHERE user_id = ?');
    $stmt2->bind_param('i', $user_id);
    $stmt2->execute();
    $result = $stmt2->get_result();
    $row = $result->fetch_assoc();
    $stmt2->close();
    echo json_encode(['success' => true, 'balance' => $row['balance']]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to top up balance']);
}
$stmt->close();
$mysqli->close(); 