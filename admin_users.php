<?php
require_once 'admin_auth.php';
require_once 'backend/config.php';

// Проверяем авторизацию администратора
checkAdminAuth();

$pdo = getDBConnection();
if (!$pdo) {
    die('Ошибка подключения к базе данных');
}

// Обработка поиска
$search = $_GET['search'] ?? '';
$page = max(1, intval($_GET['page'] ?? 1));
$per_page = 20;
$offset = ($page - 1) * $per_page;

// Построение запроса
$where_clause = '';
$params = [];

if ($search) {
    $where_clause = "WHERE username LIKE ? OR email LIKE ? OR first_name LIKE ? OR last_name LIKE ?";
    $search_param = "%$search%";
    $params = [$search_param, $search_param, $search_param, $search_param];
}

// Получение общего количества пользователей
$count_stmt = $pdo->prepare("SELECT COUNT(*) as total FROM users $where_clause");
$count_stmt->execute($params);
$total_users = $count_stmt->fetch()['total'];
$total_pages = ceil($total_users / $per_page);

// Получение пользователей
$users_query = "
    SELECT u.*, up.phone, up.country, up.city 
    FROM users u 
    LEFT JOIN user_profiles up ON u.id = up.user_id 
    $where_clause 
    ORDER BY u.created_at DESC 
    LIMIT ? OFFSET ?
";
$stmt = $pdo->prepare($users_query);
$stmt->execute([...$params, $per_page, $offset]);
$users = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GGTips - Управление пользователями</title>
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
        
        .search-box {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
        }
        
        .search-form {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .search-input {
            flex: 1;
            padding: 12px 20px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
        }
        
        .search-btn {
            padding: 12px 25px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .search-btn:hover {
            transform: scale(1.05);
        }
        
        .users-table {
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
        
        .user-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
            gap: 15px;
            padding: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            align-items: center;
        }
        
        .user-row:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        
        .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
        }
        
        .user-info h4 {
            margin-bottom: 5px;
            color: #ffd700;
        }
        
        .user-info small {
            opacity: 0.7;
        }
        
        .balance {
            font-weight: bold;
            color: #4CAF50;
        }
        
        .status {
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 0.9em;
            font-weight: bold;
        }
        
        .status.active {
            background: rgba(76, 175, 80, 0.3);
            color: #4CAF50;
        }
        
        .status.inactive {
            background: rgba(244, 67, 54, 0.3);
            color: #f44336;
        }
        
        .actions {
            display: flex;
            gap: 10px;
        }
        
        .action-btn {
            padding: 8px 15px;
            border: none;
            border-radius: 20px;
            font-size: 0.9em;
            cursor: pointer;
            transition: transform 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .action-btn:hover {
            transform: scale(1.05);
        }
        
        .btn-edit {
            background: linear-gradient(45deg, #2196F3, #1976D2);
            color: white;
        }
        
        .btn-view {
            background: linear-gradient(45deg, #4CAF50, #388E3C);
            color: white;
        }
        
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
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        
        .stat-card h3 {
            font-size: 1.8em;
            color: #ffd700;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php echo renderAdminStyles(); ?>
        <?php echo renderAdminHeader(); ?>
        
        <div class="header">
            <h1>👥 Управление пользователями</h1>
            <a href="admin_panel.php" class="back-btn">← Назад к панели</a>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <h3><?php echo $total_users; ?></h3>
                <p>Всего пользователей</p>
            </div>
            <div class="stat-card">
                <h3><?php echo $page; ?>/<?php echo $total_pages; ?></h3>
                <p>Страница</p>
            </div>
        </div>
        
        <div class="search-box">
            <form class="search-form" method="GET">
                <input type="text" name="search" value="<?php echo htmlspecialchars($search); ?>" 
                       placeholder="Поиск по имени, email, логину..." class="search-input">
                <button type="submit" class="search-btn">🔍 Поиск</button>
                <?php if ($search): ?>
                    <a href="admin_users.php" class="search-btn">❌ Сброс</a>
                <?php endif; ?>
            </form>
        </div>
        
        <div class="users-table">
            <div class="table-header">
                <div class="user-row">
                    <div>👤 Пользователь</div>
                    <div>📧 Контакты</div>
                    <div>💰 Баланс</div>
                    <div>📅 Дата регистрации</div>
                    <div>📊 Статус</div>
                    <div>⚙️ Действия</div>
                </div>
            </div>
            
            <?php foreach ($users as $user): ?>
                <div class="user-row">
                    <div class="user-info">
                        <div class="user-avatar">
                            <?php if ($user['avatar_url']): ?>
                                <img src="<?php echo htmlspecialchars($user['avatar_url']); ?>" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%;">
                            <?php else: ?>
                                👤
                            <?php endif; ?>
                        </div>
                        <h4><?php echo htmlspecialchars($user['username']); ?></h4>
                        <small><?php echo htmlspecialchars($user['first_name'] . ' ' . $user['last_name']); ?></small>
                    </div>
                    
                    <div class="user-info">
                        <h4><?php echo htmlspecialchars($user['email']); ?></h4>
                        <small>
                            <?php if ($user['phone']): ?>
                                📱 <?php echo htmlspecialchars($user['phone']); ?><br>
                            <?php endif; ?>
                            <?php if ($user['city'] && $user['country']): ?>
                                🌍 <?php echo htmlspecialchars($user['city'] . ', ' . $user['country']); ?>
                            <?php endif; ?>
                        </small>
                    </div>
                    
                    <div class="balance">
                        $<?php echo number_format($user['balance'], 2); ?>
                    </div>
                    
                    <div class="user-date">
                        <?php echo date('d.m.Y H:i', strtotime($user['created_at'])); ?>
                    </div>
                    
                    <div>
                        <span class="status <?php echo $user['is_active'] ? 'active' : 'inactive'; ?>">
                            <?php echo $user['is_active'] ? '✅ Активен' : '❌ Неактивен'; ?>
                        </span>
                    </div>
                    
                    <div class="actions">
                        <a href="admin_user_view.php?id=<?php echo $user['id']; ?>" class="action-btn btn-view">👁️</a>
                        <a href="admin_user_edit.php?id=<?php echo $user['id']; ?>" class="action-btn btn-edit">✏️</a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <?php if ($total_pages > 1): ?>
            <div class="pagination">
                <?php if ($page > 1): ?>
                    <a href="?page=<?php echo $page - 1; ?>&search=<?php echo urlencode($search); ?>" class="page-btn">← Предыдущая</a>
                <?php endif; ?>
                
                <?php for ($i = max(1, $page - 2); $i <= min($total_pages, $page + 2); $i++): ?>
                    <a href="?page=<?php echo $i; ?>&search=<?php echo urlencode($search); ?>" 
                       class="page-btn <?php echo $i == $page ? 'active' : ''; ?>"><?php echo $i; ?></a>
                <?php endfor; ?>
                
                <?php if ($page < $total_pages): ?>
                    <a href="?page=<?php echo $page + 1; ?>&search=<?php echo urlencode($search); ?>" class="page-btn">Следующая →</a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
