<?php
session_start();
require_once 'backend/config.php';

// Проверка авторизации
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: admin_login.php');
    exit;
}

// Проверка IP адреса
$allowed_ips = ['157.230.244.205', '127.0.0.1', '::1'];
$client_ip = $_SERVER['REMOTE_ADDR'] ?? '';
if (!in_array($client_ip, $allowed_ips)) {
    session_destroy();
    header('Location: admin_login.php');
    exit;
}

$pdo = getDBConnection();
if (!$pdo) {
    die('Ошибка подключения к базе данных');
}

// Получаем статистику
$stats = [];
try {
    // Количество пользователей
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $stats['users'] = $stmt->fetch()['count'];
    
    // Количество транзакций
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM transactions");
    $stats['transactions'] = $stmt->fetch()['count'];
    
    // Общий баланс всех пользователей
    $stmt = $pdo->query("SELECT SUM(balance) as total FROM users");
    $stats['total_balance'] = $stmt->fetch()['total'] ?? 0;
    
    // Последние регистрации
    $stmt = $pdo->query("SELECT username, email, created_at FROM users ORDER BY created_at DESC LIMIT 5");
    $stats['recent_users'] = $stmt->fetchAll();
    
} catch (Exception $e) {
    $error = 'Ошибка получения статистики: ' . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GGTips - Админ панель</title>
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
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-card h3 {
            font-size: 2em;
            margin-bottom: 10px;
            color: #ffd700;
        }
        
        .stat-card p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .nav-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .nav-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        
        .nav-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .nav-card h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: #ffd700;
        }
        
        .nav-card p {
            opacity: 0.8;
            margin-bottom: 20px;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 25px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: transform 0.3s ease;
        }
        
        .btn:hover {
            transform: scale(1.05);
        }
        
        .recent-users {
            background: rgba(255, 255, 255, 0.1);
            padding: 25px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        .recent-users h3 {
            margin-bottom: 20px;
            color: #ffd700;
        }
        
        .user-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            margin-bottom: 10px;
            border-radius: 10px;
        }
        
        .user-info {
            flex: 1;
        }
        
        .user-date {
            opacity: 0.7;
            font-size: 0.9em;
        }
        
        .error {
            background: rgba(255, 0, 0, 0.2);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 0, 0, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 GGTips - Админ панель</h1>
            <p>Управление базой данных и пользователями</p>
            <div style="margin-top: 15px;">
                <span style="opacity: 0.8;">👤 <?php echo htmlspecialchars($_SESSION['admin_username'] ?? 'Admin'); ?></span>
                <span style="margin: 0 15px; opacity: 0.6;">|</span>
                <span style="opacity: 0.8;">🌐 <?php echo htmlspecialchars($client_ip); ?></span>
                <span style="margin: 0 15px; opacity: 0.6;">|</span>
                <a href="admin_logout.php" style="color: #ff6b6b; text-decoration: none; padding: 8px 15px; border: 1px solid #ff6b6b; border-radius: 20px; transition: all 0.3s ease;">🚪 Выйти</a>
            </div>
        </div>
        
        <?php if (isset($error)): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3><?php echo $stats['users'] ?? 0; ?></h3>
                <p>Пользователей</p>
            </div>
            <div class="stat-card">
                <h3><?php echo $stats['transactions'] ?? 0; ?></h3>
                <p>Транзакций</p>
            </div>
            <div class="stat-card">
                <h3>$<?php echo number_format($stats['total_balance'] ?? 0, 2); ?></h3>
                <p>Общий баланс</p>
            </div>
        </div>
        
        <div class="nav-grid">
            <div class="nav-card" onclick="window.location.href='admin_users.php'">
                <h3>👥 Пользователи</h3>
                <p>Управление пользователями, просмотр профилей, редактирование данных</p>
                <a href="admin_users.php" class="btn">Открыть</a>
            </div>
            
            <div class="nav-card" onclick="window.location.href='admin_transactions.php'">
                <h3>💰 Транзакции</h3>
                <p>История всех транзакций, пополнений и расходов пользователей</p>
                <a href="admin_transactions.php" class="btn">Открыть</a>
            </div>
            
            <div class="nav-card" onclick="window.location.href='admin_activity.php'">
                <h3>📊 Активность</h3>
                <p>Логи активности пользователей, входы в систему, действия</p>
                <a href="admin_activity.php" class="btn">Открыть</a>
            </div>
            
            <div class="nav-card" onclick="window.location.href='admin_database.php'">
                <h3>🗄️ База данных</h3>
                <p>Прямой доступ к базе данных, SQL запросы, экспорт данных</p>
                <a href="admin_database.php" class="btn">Открыть</a>
            </div>
        </div>
        
        <div class="recent-users">
            <h3>🆕 Последние регистрации</h3>
            <?php if (isset($stats['recent_users']) && !empty($stats['recent_users'])): ?>
                <?php foreach ($stats['recent_users'] as $user): ?>
                    <div class="user-item">
                        <div class="user-info">
                            <strong><?php echo htmlspecialchars($user['username']); ?></strong>
                            <br>
                            <small><?php echo htmlspecialchars($user['email']); ?></small>
                        </div>
                        <div class="user-date">
                            <?php echo date('d.m.Y H:i', strtotime($user['created_at'])); ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p>Нет зарегистрированных пользователей</p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
