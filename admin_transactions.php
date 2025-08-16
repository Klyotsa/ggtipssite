<?php
session_start();
require_once 'backend/config.php';

$pdo = getDBConnection();
if (!$pdo) {
    die('Ошибка подключения к базе данных');
}

// Фильтры
$type_filter = $_GET['type'] ?? '';
$status_filter = $_GET['status'] ?? '';
$search = $_GET['search'] ?? '';
$page = max(1, intval($_GET['page'] ?? 1));
$per_page = 25;
$offset = ($page - 1) * $per_page;

// Построение запроса
$where_conditions = [];
$params = [];

if ($type_filter) {
    $where_conditions[] = "t.type = ?";
    $params[] = $type_filter;
}

if ($status_filter) {
    $where_conditions[] = "t.status = ?";
    $params[] = $status_filter;
}

if ($search) {
    $where_conditions[] = "(u.username LIKE ? OR u.email LIKE ? OR t.description LIKE ?)";
    $search_param = "%$search%";
    $params[] = $search_param;
    $params[] = $search_param;
    $params[] = $search_param;
}

$where_clause = $where_conditions ? 'WHERE ' . implode(' AND ', $where_conditions) : '';

// Получение общего количества транзакций
$count_query = "SELECT COUNT(*) as total FROM transactions t JOIN users u ON t.user_id = u.id $where_clause";
$count_stmt = $pdo->prepare($count_query);
$count_stmt->execute($params);
$total_transactions = $count_stmt->fetch()['total'];
$total_pages = ceil($total_transactions / $per_page);

// Получение транзакций
$transactions_query = "
    SELECT t.*, u.username, u.email, u.first_name, u.last_name
    FROM transactions t 
    JOIN users u ON t.user_id = u.id 
    $where_clause 
    ORDER BY t.created_at DESC 
    LIMIT ? OFFSET ?
";
$stmt = $pdo->prepare($transactions_query);
$stmt->execute([...$params, $per_page, $offset]);
$transactions = $stmt->fetchAll();

// Статистика
$stats_query = "
    SELECT 
        SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) as total_deposits,
        SUM(CASE WHEN type = 'withdrawal' THEN amount ELSE 0 END) as total_withdrawals,
        SUM(CASE WHEN type = 'purchase' THEN amount ELSE 0 END) as total_purchases,
        COUNT(*) as total_count
    FROM transactions 
    WHERE status = 'completed'
";
$stats_stmt = $pdo->query($stats_query);
$stats = $stats_stmt->fetch();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GGTips - Управление транзакциями</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        .header h1 {
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .back-btn {
            padding: 12px 25px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: transform 0.3s ease;
        }
        
        .back-btn:hover {
            transform: scale(1.05);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        
        .stat-card h3 {
            font-size: 1.8em;
            margin-bottom: 10px;
            color: #ffd700;
        }
        
        .stat-card.deposits h3 { color: #4CAF50; }
        .stat-card.withdrawals h3 { color: #f44336; }
        .stat-card.purchases h3 { color: #2196F3; }
        
        .filters {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
        }
        
        .filters form {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            align-items: end;
        }
        
        .filter-group {
            display: flex;
            flex-direction: column;
        }
        
        .filter-group label {
            margin-bottom: 5px;
            font-weight: bold;
            color: #ffd700;
        }
        
        .filter-input, .filter-select {
            padding: 10px 15px;
            border: none;
            border-radius: 10px;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
        }
        
        .filter-btn {
            padding: 12px 25px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .filter-btn:hover {
            transform: scale(1.05);
        }
        
        .transactions-table {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            overflow: hidden;
            backdrop-filter: blur(10px);
            margin-bottom: 20px;
        }
        
        .table-header {
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            font-weight: bold;
            font-size: 1.1em;
        }
        
        .transaction-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr auto;
            gap: 15px;
            padding: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            align-items: center;
        }
        
        .transaction-row:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        
        .user-info h4 {
            margin-bottom: 5px;
            color: #ffd700;
        }
        
        .user-info small {
            opacity: 0.7;
        }
        
        .amount {
            font-weight: bold;
            font-size: 1.1em;
        }
        
        .amount.deposit { color: #4CAF50; }
        .amount.withdrawal { color: #f44336; }
        .amount.purchase { color: #2196F3; }
        .amount.refund { color: #FF9800; }
        .amount.bonus { color: #9C27B0; }
        
        .type-badge {
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 0.9em;
            font-weight: bold;
            text-align: center;
        }
        
        .type-badge.deposit { background: rgba(76, 175, 80, 0.3); color: #4CAF50; }
        .type-badge.withdrawal { background: rgba(244, 67, 54, 0.3); color: #f44336; }
        .type-badge.purchase { background: rgba(33, 150, 243, 0.3); color: #2196F3; }
        .type-badge.refund { background: rgba(255, 152, 0, 0.3); color: #FF9800; }
        .type-badge.bonus { background: rgba(156, 39, 176, 0.3); color: #9C27B0; }
        
        .status-badge {
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 0.9em;
            font-weight: bold;
            text-align: center;
        }
        
        .status-badge.completed { background: rgba(76, 175, 80, 0.3); color: #4CAF50; }
        .status-badge.pending { background: rgba(255, 152, 0, 0.3); color: #FF9800; }
        .status-badge.failed { background: rgba(244, 67, 54, 0.3); color: #f44336; }
        .status-badge.cancelled { background: rgba(158, 158, 158, 0.3); color: #9E9E9E; }
        
        .pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }
        
        .page-btn {
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            transition: background 0.3s ease;
        }
        
        .page-btn:hover, .page-btn.active {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .transaction-date {
            font-size: 0.9em;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💰 Управление транзакциями</h1>
            <a href="admin_panel.php" class="back-btn">← Назад к панели</a>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card deposits">
                <h3>$<?php echo number_format($stats['total_deposits'] ?? 0, 2); ?></h3>
                <p>Всего пополнений</p>
            </div>
            <div class="stat-card withdrawals">
                <h3>$<?php echo number_format($stats['total_withdrawals'] ?? 0, 2); ?></h3>
                <p>Всего выводов</p>
            </div>
            <div class="stat-card purchases">
                <h3>$<?php echo number_format($stats['total_purchases'] ?? 0, 2); ?></h3>
                <p>Всего покупок</p>
            </div>
            <div class="stat-card">
                <h3><?php echo $total_transactions; ?></h3>
                <p>Всего транзакций</p>
            </div>
        </div>
        
        <div class="filters">
            <form method="GET">
                <div class="filter-group">
                    <label>Тип транзакции:</label>
                    <select name="type" class="filter-select">
                        <option value="">Все типы</option>
                        <option value="deposit" <?php echo $type_filter === 'deposit' ? 'selected' : ''; ?>>Пополнение</option>
                        <option value="withdrawal" <?php echo $type_filter === 'withdrawal' ? 'selected' : ''; ?>>Вывод</option>
                        <option value="purchase" <?php echo $type_filter === 'purchase' ? 'selected' : ''; ?>>Покупка</option>
                        <option value="refund" <?php echo $type_filter === 'refund' ? 'selected' : ''; ?>>Возврат</option>
                        <option value="bonus" <?php echo $type_filter === 'bonus' ? 'selected' : ''; ?>>Бонус</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Статус:</label>
                    <select name="status" class="filter-select">
                        <option value="">Все статусы</option>
                        <option value="completed" <?php echo $status_filter === 'completed' ? 'selected' : ''; ?>>Завершено</option>
                        <option value="pending" <?php echo $status_filter === 'pending' ? 'selected' : ''; ?>>В ожидании</option>
                        <option value="failed" <?php echo $status_filter === 'failed' ? 'selected' : ''; ?>>Ошибка</option>
                        <option value="cancelled" <?php echo $status_filter === 'cancelled' ? 'selected' : ''; ?>>Отменено</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Поиск:</label>
                    <input type="text" name="search" value="<?php echo htmlspecialchars($search); ?>" 
                           placeholder="Поиск по пользователю или описанию..." class="filter-input">
                </div>
                
                <div class="filter-group">
                    <button type="submit" class="filter-btn">🔍 Применить фильтры</button>
                </div>
                
                <?php if ($type_filter || $status_filter || $search): ?>
                    <div class="filter-group">
                        <a href="admin_transactions.php" class="filter-btn">❌ Сбросить</a>
                    </div>
                <?php endif; ?>
            </form>
        </div>
        
        <div class="transactions-table">
            <div class="table-header">
                <div class="transaction-row">
                    <div>👤 Пользователь</div>
                    <div>💰 Сумма</div>
                    <div>📊 Тип</div>
                    <div>📝 Описание</div>
                    <div>📅 Дата</div>
                    <div>✅ Статус</div>
                    <div>⚙️ Действия</div>
                </div>
            </div>
            
            <?php foreach ($transactions as $transaction): ?>
                <div class="transaction-row">
                    <div class="user-info">
                        <h4><?php echo htmlspecialchars($transaction['username']); ?></h4>
                        <small><?php echo htmlspecialchars($transaction['email']); ?></small>
                    </div>
                    
                    <div class="amount <?php echo $transaction['type']; ?>">
                        $<?php echo number_format($transaction['amount'], 2); ?>
                    </div>
                    
                    <div>
                        <span class="type-badge <?php echo $transaction['type']; ?>">
                            <?php 
                            $type_labels = [
                                'deposit' => 'Пополнение',
                                'withdrawal' => 'Вывод',
                                'purchase' => 'Покупка',
                                'refund' => 'Возврат',
                                'bonus' => 'Бонус'
                            ];
                            echo $type_labels[$transaction['type']] ?? $transaction['type'];
                            ?>
                        </span>
                    </div>
                    
                    <div>
                        <?php echo htmlspecialchars($transaction['description']); ?>
                        <?php if ($transaction['payment_method']): ?>
                            <br><small>💳 <?php echo htmlspecialchars($transaction['payment_method']); ?></small>
                        <?php endif; ?>
                    </div>
                    
                    <div class="transaction-date">
                        <?php echo date('d.m.Y H:i', strtotime($transaction['created_at'])); ?>
                    </div>
                    
                    <div>
                        <span class="status-badge <?php echo $transaction['status']; ?>">
                            <?php 
                            $status_labels = [
                                'completed' => '✅ Завершено',
                                'pending' => '⏳ В ожидании',
                                'failed' => '❌ Ошибка',
                                'cancelled' => '🚫 Отменено'
                            ];
                            echo $status_labels[$transaction['status']] ?? $transaction['status'];
                            ?>
                        </span>
                    </div>
                    
                    <div>
                        <a href="admin_transaction_view.php?id=<?php echo $transaction['id']; ?>" 
                           class="filter-btn" style="padding: 8px 15px; font-size: 0.9em;">👁️</a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <?php if ($total_pages > 1): ?>
            <div class="pagination">
                <?php if ($page > 1): ?>
                    <a href="?page=<?php echo $page - 1; ?>&type=<?php echo urlencode($type_filter); ?>&status=<?php echo urlencode($status_filter); ?>&search=<?php echo urlencode($search); ?>" class="page-btn">← Предыдущая</a>
                <?php endif; ?>
                
                <?php for ($i = max(1, $page - 2); $i <= min($total_pages, $page + 2); $i++): ?>
                    <a href="?page=<?php echo $i; ?>&type=<?php echo urlencode($type_filter); ?>&status=<?php echo urlencode($status_filter); ?>&search=<?php echo urlencode($search); ?>" 
                       class="page-btn <?php echo $i == $page ? 'active' : ''; ?>"><?php echo $i; ?></a>
                <?php endforeach; ?>
                
                <?php if ($page < $total_pages): ?>
                    <a href="?page=<?php echo $page + 1; ?>&type=<?php echo urlencode($type_filter); ?>&status=<?php echo urlencode($status_filter); ?>&search=<?php echo urlencode($search); ?>" class="page-btn">Следующая →</a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
