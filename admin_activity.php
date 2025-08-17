<?php
session_start();
require_once 'backend/config.php';

// Проверяем аутентификацию администратора
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin_login.php');
    exit;
}

try {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }

    // Параметры фильтрации
    $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
    $per_page = 50;
    $offset = ($page - 1) * $per_page;
    
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $action_filter = isset($_GET['action']) ? trim($_GET['action']) : '';
    $user_filter = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;
    $date_from = isset($_GET['date_from']) ? $_GET['date_from'] : '';
    $date_to = isset($_GET['date_to']) ? $_GET['date_to'] : '';

    // Формируем WHERE условия
    $where_conditions = [];
    $params = [];

    if ($search) {
        $where_conditions[] = "(description LIKE ? OR ip_address LIKE ?)";
        $params[] = "%$search%";
        $params[] = "%$search%";
    }

    if ($action_filter) {
        $where_conditions[] = "action = ?";
        $params[] = $action_filter;
    }

    if ($user_filter) {
        $where_conditions[] = "ual.user_id = ?";
        $params[] = $user_filter;
    }

    if ($date_from) {
        $where_conditions[] = "ual.created_at >= ?";
        $params[] = $date_from . ' 00:00:00';
    }

    if ($date_to) {
        $where_conditions[] = "ual.created_at <= ?";
        $params[] = $date_to . ' 23:59:59';
    }

    $where_clause = $where_conditions ? 'WHERE ' . implode(' AND ', $where_conditions) : '';

    // Получаем общее количество записей
    $count_sql = "SELECT COUNT(*) FROM user_activity_log ual 
                   LEFT JOIN users u ON ual.user_id = u.id 
                   $where_clause";
    $count_stmt = $pdo->prepare($count_sql);
    $count_stmt->execute($params);
    $total_records = $count_stmt->fetchColumn();
    $total_pages = ceil($total_records / $per_page);

    // Получаем записи активности
    $sql = "SELECT ual.*, u.username, u.email 
            FROM user_activity_log ual 
            LEFT JOIN users u ON ual.user_id = u.id 
            $where_clause 
            ORDER BY ual.created_at DESC 
            LIMIT ? OFFSET ?";
    
    $params[] = $per_page;
    $params[] = $offset;
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $activities = $stmt->fetchAll();

    // Получаем уникальные действия для фильтра
    $actions_stmt = $pdo->query("SELECT DISTINCT action FROM user_activity_log ORDER BY action");
    $actions = $actions_stmt->fetchAll(PDO::FETCH_COLUMN);

    // Получаем пользователей для фильтра
    $users_stmt = $pdo->query("SELECT id, username, email FROM users ORDER BY username");
    $users = $users_stmt->fetchAll();

    // Статистика
    $stats_sql = "SELECT 
                    COUNT(*) as total_actions,
                    COUNT(DISTINCT user_id) as unique_users,
                    COUNT(CASE WHEN action = 'user_login' THEN 1 END) as logins,
                    COUNT(CASE WHEN action = 'user_logout' THEN 1 END) as logouts,
                    COUNT(CASE WHEN action LIKE '%deposit%' OR action LIKE '%withdrawal%' THEN 1 END) as financial_actions
                   FROM user_activity_log";
    $stats_stmt = $pdo->query($stats_sql);
    $stats = $stats_stmt->fetch();

} catch (Exception $e) {
    error_log('Admin activity error: ' . $e->getMessage());
    $error = 'Ошибка загрузки данных: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Отслеживание активности - Админ панель</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 100%);
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
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        .header h1 {
            font-size: 2.5em;
            color: #ffd700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .back-btn {
            padding: 12px 24px;
            background: linear-gradient(45deg, #9d4edd, #7b2cbf);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            transition: transform 0.3s ease;
        }

        .back-btn:hover {
            transform: translateY(-2px);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-card h3 {
            font-size: 2em;
            color: #ffd700;
            margin-bottom: 10px;
        }

        .stat-card p {
            color: #ccc;
            font-size: 0.9em;
        }

        .filters {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
        }

        .filters h3 {
            margin-bottom: 15px;
            color: #ffd700;
        }

        .filter-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
        }

        .filter-group label {
            margin-bottom: 5px;
            color: #ccc;
            font-size: 0.9em;
        }

        .filter-group input,
        .filter-group select {
            padding: 8px 12px;
            border: 1px solid rgba(157, 78, 221, 0.3);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 0.9em;
        }

        .filter-group input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .filter-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: linear-gradient(45deg, #9d4edd, #7b2cbf);
            color: white;
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }

        .btn:hover {
            transform: translateY(-2px);
        }

        .activity-table {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            overflow: hidden;
            backdrop-filter: blur(10px);
        }

        .table-header {
            background: rgba(157, 78, 221, 0.3);
            padding: 15px 20px;
            font-weight: 600;
            display: grid;
            grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
            gap: 15px;
            align-items: center;
        }

        .activity-row {
            display: grid;
            grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
            gap: 15px;
            padding: 15px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            align-items: center;
        }

        .activity-row:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .activity-row:last-child {
            border-bottom: none;
        }

        .user-info {
            display: flex;
            flex-direction: column;
        }

        .user-info .username {
            font-weight: 600;
            color: #ffd700;
        }

        .user-info .email {
            font-size: 0.8em;
            color: #ccc;
        }

        .action-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: 600;
            text-align: center;
        }

        .action-login { background: rgba(76, 175, 80, 0.3); color: #4CAF50; }
        .action-logout { background: rgba(244, 67, 54, 0.3); color: #f44336; }
        .action-deposit { background: rgba(33, 150, 243, 0.3); color: #2196F3; }
        .action-withdrawal { background: rgba(255, 152, 0, 0.3); color: #FF9800; }
        .action-purchase { background: rgba(156, 39, 176, 0.3); color: #9C27B0; }
        .action-default { background: rgba(158, 158, 158, 0.3); color: #9E9E9E; }

        .ip-address {
            font-family: monospace;
            font-size: 0.9em;
            color: #ccc;
        }

        .timestamp {
            font-size: 0.9em;
            color: #ccc;
        }

        .pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 30px;
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

        .no-data {
            text-align: center;
            padding: 40px;
            color: #ccc;
            font-style: italic;
        }

        @media (max-width: 768px) {
            .table-header,
            .activity-row {
                grid-template-columns: 1fr;
                gap: 10px;
            }
            
            .filter-row {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Отслеживание активности</h1>
            <a href="admin_panel.php" class="back-btn">← Назад к панели</a>
        </div>

        <?php if (isset($error)): ?>
            <div class="error-message" style="background: rgba(244, 67, 54, 0.2); color: #f44336; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <?php if (isset($stats)): ?>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3><?php echo number_format($stats['total_actions']); ?></h3>
                    <p>Всего действий</p>
                </div>
                <div class="stat-card">
                    <h3><?php echo number_format($stats['unique_users']); ?></h3>
                    <p>Уникальных пользователей</p>
                </div>
                <div class="stat-card">
                    <h3><?php echo number_format($stats['logins']); ?></h3>
                    <p>Входов в систему</p>
                </div>
                <div class="stat-card">
                    <h3><?php echo number_format($stats['logouts']); ?></h3>
                    <p>Выходов из системы</p>
                </div>
                <div class="stat-card">
                    <h3><?php echo number_format($stats['financial_actions']); ?></h3>
                    <p>Финансовых операций</p>
                </div>
            </div>
        <?php endif; ?>

        <div class="filters">
            <h3>🔍 Фильтры</h3>
            <form method="GET" action="">
                <div class="filter-row">
                    <div class="filter-group">
                        <label for="search">Поиск по описанию/IP:</label>
                        <input type="text" id="search" name="search" value="<?php echo htmlspecialchars($search); ?>" placeholder="Введите текст для поиска...">
                    </div>
                    <div class="filter-group">
                        <label for="action">Тип действия:</label>
                        <select id="action" name="action">
                            <option value="">Все действия</option>
                            <?php foreach ($actions as $action): ?>
                                <option value="<?php echo htmlspecialchars($action); ?>" <?php echo $action_filter === $action ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($action); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="user_id">Пользователь:</label>
                        <select id="user_id" name="user_id">
                            <option value="">Все пользователи</option>
                            <?php foreach ($users as $user): ?>
                                <option value="<?php echo $user['id']; ?>" <?php echo $user_filter === $user['id'] ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($user['username']); ?> (<?php echo htmlspecialchars($user['email']); ?>)
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="filter-row">
                    <div class="filter-group">
                        <label for="date_from">Дата с:</label>
                        <input type="date" id="date_from" name="date_from" value="<?php echo htmlspecialchars($date_from); ?>">
                    </div>
                    <div class="filter-group">
                        <label for="date_to">Дата по:</label>
                        <input type="date" id="date_to" name="date_to" value="<?php echo htmlspecialchars($date_to); ?>">
                    </div>
                </div>
                <div class="filter-buttons">
                    <button type="submit" class="btn btn-primary">🔍 Применить фильтры</button>
                    <a href="admin_activity.php" class="btn btn-secondary">❌ Сбросить</a>
                </div>
            </form>
        </div>

        <div class="activity-table">
            <div class="table-header">
                <div>👤 Пользователь</div>
                <div>⚡ Действие</div>
                <div>📝 Описание</div>
                <div>🌐 IP-адрес</div>
                <div>🕐 Время</div>
                <div>📱 Устройство</div>
            </div>

            <?php if (empty($activities)): ?>
                <div class="no-data">
                    <p>📭 Записи активности не найдены</p>
                </div>
            <?php else: ?>
                <?php foreach ($activities as $activity): ?>
                    <div class="activity-row">
                        <div class="user-info">
                            <?php if ($activity['username']): ?>
                                <div class="username"><?php echo htmlspecialchars($activity['username']); ?></div>
                                <div class="email"><?php echo htmlspecialchars($activity['email']); ?></div>
                            <?php else: ?>
                                <div class="username">ID: <?php echo $activity['user_id']; ?></div>
                                <div class="email">Пользователь удален</div>
                            <?php endif; ?>
                        </div>
                        
                        <div>
                            <span class="action-badge action-<?php echo strtolower(str_replace('_', '-', $activity['action'])); ?>">
                                <?php 
                                switch ($activity['action']) {
                                    case 'user_login': echo '🔑 Вход'; break;
                                    case 'user_logout': echo '🚪 Выход'; break;
                                    case 'user_registered': echo '📝 Регистрация'; break;
                                    case 'deposit': echo '💰 Пополнение'; break;
                                    case 'withdrawal': echo '💸 Списание'; break;
                                    case 'purchase': echo '🛒 Покупка'; break;
                                    default: echo htmlspecialchars($activity['action']); break;
                                }
                                ?>
                            </span>
                        </div>
                        
                        <div class="description">
                            <?php echo htmlspecialchars($activity['description'] ?: 'Нет описания'); ?>
                        </div>
                        
                        <div class="ip-address">
                            <?php echo htmlspecialchars($activity['ip_address'] ?: 'Неизвестно'); ?>
                        </div>
                        
                        <div class="timestamp">
                            <?php echo date('d.m.Y H:i:s', strtotime($activity['created_at'])); ?>
                        </div>
                        
                        <div class="user-agent" style="font-size: 0.8em; color: #ccc;">
                            <?php 
                            $ua = $activity['user_agent'] ?: 'Неизвестно';
                            echo htmlspecialchars(strlen($ua) > 50 ? substr($ua, 0, 50) . '...' : $ua);
                            ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <?php if ($total_pages > 1): ?>
            <div class="pagination">
                <?php if ($page > 1): ?>
                    <a href="?page=<?php echo $page - 1; ?>&search=<?php echo urlencode($search); ?>&action=<?php echo urlencode($action_filter); ?>&user_id=<?php echo $user_filter; ?>&date_from=<?php echo urlencode($date_from); ?>&date_to=<?php echo urlencode($date_to); ?>" class="page-btn">← Предыдущая</a>
                <?php endif; ?>
                
                <?php for ($i = max(1, $page - 2); $i <= min($total_pages, $page + 2); $i++): ?>
                    <a href="?page=<?php echo $i; ?>&search=<?php echo urlencode($search); ?>&action=<?php echo urlencode($action_filter); ?>&user_id=<?php echo $user_filter; ?>&date_from=<?php echo urlencode($date_from); ?>&date_to=<?php echo urlencode($date_to); ?>" 
                       class="page-btn <?php echo $i == $page ? 'active' : ''; ?>"><?php echo $i; ?></a>
                <?php endfor; ?>
                
                <?php if ($page < $total_pages): ?>
                    <a href="?page=<?php echo $page + 1; ?>&search=<?php echo urlencode($search); ?>&action=<?php echo urlencode($action_filter); ?>&user_id=<?php echo $user_filter; ?>&date_from=<?php echo urlencode($date_from); ?>&date_to=<?php echo urlencode($date_to); ?>" class="page-btn">Следующая →</a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
