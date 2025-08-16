<?php
// backend/api/purchase.php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$item_id = isset($data['item_id']) ? intval($data['item_id']) : 0;
$amount = isset($data['amount']) ? floatval($data['amount']) : 0;
if ($item_id <= 0 || $amount <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid item or amount']);
    exit;
}

$user_id = $_SESSION['user_id'];
$mysqli = getDbConnection();
$mysqli->begin_transaction();

try {
    // 1. Получить текущий баланс
    $stmt = $mysqli->prepare('SELECT balance FROM user_balance WHERE user_id = ? FOR UPDATE');
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $current_balance = $row ? floatval($row['balance']) : 0;
    $stmt->close();

    if ($current_balance < $amount) {
        $mysqli->rollback();
        http_response_code(400);
        echo json_encode(['error' => 'Insufficient balance']);
        exit;
    }

    // 2. Списать сумму
    $stmt = $mysqli->prepare('UPDATE user_balance SET balance = balance - ? WHERE user_id = ?');
    $stmt->bind_param('di', $amount, $user_id);
    $stmt->execute();
    $stmt->close();

    // 3. Записать покупку
    $stmt = $mysqli->prepare('INSERT INTO purchases (user_id, item_id, amount) VALUES (?, ?, ?)');
    $stmt->bind_param('iid', $user_id, $item_id, $amount);
    $stmt->execute();
    $purchase_id = $stmt->insert_id;
    $stmt->close();

    // 4. Зафиксировать транзакцию
    $mysqli->commit();

    // 5. Вернуть результат
    echo json_encode(['success' => true, 'purchase_id' => $purchase_id]);

    // --- Для интеграции платежной системы ---
    // Здесь можно добавить проверку статуса оплаты через платежный шлюз
    // и только после успешной оплаты выполнять списание и запись покупки
    // Например, добавить статус оплаты в таблицу purchases
    // ----------------------------------------

} catch (Exception $e) {
    $mysqli->rollback();
    http_response_code(500);
    echo json_encode(['error' => 'Purchase failed', 'details' => $e->getMessage()]);
}
$mysqli->close(); 