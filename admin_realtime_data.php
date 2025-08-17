<?php
session_start();
require_once 'backend/config.php';

// Проверяем аутентификацию администратора
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

try {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }

    $page = $_GET['page'] ?? 'admin_panel.php';
    $response = ['success' => true, 'timestamp' => time()];

    switch ($page) {
        case 'admin_panel.php':
            $response['data'] = getDashboardData($pdo);
            break;
        case 'admin_users.php':
            $response['data'] = getUsersData($pdo);
            break;
        case 'admin_transactions.php':
            $response['data'] = getTransactionsData($pdo);
            break;
        case 'admin_activity.php':
            $response['data'] = getActivityData($pdo);
            break;
        default:
            $response['data'] = getDashboardData($pdo);
    }

    echo json_encode($response);

} catch (Exception $e) {
    error_log('Realtime data error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to get data: ' . $e->getMessage()]);
}

function getDashboardData($pdo) {
    // Статистика для главной панели
    $stats = [];
    
    // Общее количество пользователей
    $stmt = $pdo->query('SELECT COUNT(*) FROM users');
    $stats['total_users'] = $stmt->fetchColumn();
    
    // Новые пользователи за сегодня
    $stmt = $pdo->query('SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE()');
    $stats['new_users_today'] = $stmt->fetchColumn();
    
    // Общий баланс всех пользователей
    $stmt = $pdo->query('SELECT COALESCE(SUM(balance), 0) FROM users');
    $stats['total_balance'] = $stmt->fetchColumn();
    
    // Количество транзакций за сегодня
    $stmt = $pdo->query('SELECT COUNT(*) FROM transactions WHERE DATE(created_at) = CURDATE()');
    $stats['transactions_today'] = $stmt->fetchColumn();
    
    // Сумма транзакций за сегодня
    $stmt = $pdo->query('SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE DATE(created_at) = CURDATE()');
    $stats['amount_today'] = $stmt->fetchColumn();
    
    // Последние действия
    $stmt = $pdo->query('SELECT action, description, created_at FROM user_activity_log ORDER BY created_at DESC LIMIT 5');
    $stats['recent_activities'] = $stmt->fetchAll();
    
    return ['stats' => $stats];
}

function getUsersData($pdo) {
    // Данные пользователей для обновления
    $users = [];
    
    $stmt = $pdo->query('
        SELECT id, username, email, balance, created_at, 
               (SELECT COUNT(*) FROM user_activity_log WHERE user_id = users.id) as activity_count
        FROM users 
        ORDER BY created_at DESC 
        LIMIT 50
    ');
    
    while ($row = $stmt->fetch()) {
        $users[] = [
            'id' => $row['id'],
            'username' => $row['username'],
            'email' => $row['email'],
            'balance' => $row['balance'],
            'created_at' => $row['created_at'],
            'activity_count' => $row['activity_count']
        ];
    }
    
    return ['users' => $users];
}

function getTransactionsData($pdo) {
    // Данные транзакций для обновления
    $transactions = [];
    
    $stmt = $pdo->query('
        SELECT t.id, t.type, t.amount, t.status, t.description, t.created_at,
               u.username, u.email
        FROM transactions t
        LEFT JOIN users u ON t.user_id = u.id
        ORDER BY t.created_at DESC 
        LIMIT 50
    ');
    
    while ($row = $stmt->fetch()) {
        $transactions[] = [
            'id' => $row['id'],
            'type' => $row['type'],
            'amount' => $row['amount'],
            'status' => $row['status'],
            'description' => $row['description'],
            'created_at' => $row['created_at'],
            'username' => $row['username'],
            'email' => $row['email']
        ];
    }
    
    return ['transactions' => $transactions];
}

function getActivityData($pdo) {
    // Данные активности для обновления
    $activities = [];
    
    $stmt = $pdo->query('
        SELECT ual.id, ual.action, ual.description, ual.ip_address, 
               ual.created_at, ual.user_agent,
               u.username, u.email
        FROM user_activity_log ual
        LEFT JOIN users u ON ual.user_id = u.id
        ORDER BY ual.created_at DESC 
        LIMIT 50
    ');
    
    while ($row = $stmt->fetch()) {
        $activities[] = [
            'id' => $row['id'],
            'action' => $row['action'],
            'description' => $row['description'],
            'ip_address' => $row['ip_address'],
            'created_at' => $row['created_at'],
            'user_agent' => $row['user_agent'],
            'username' => $row['username'],
            'email' => $row['email']
        ];
    }
    
    return ['activities' => $activities];
}
?>
