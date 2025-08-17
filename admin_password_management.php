<?php
session_start();
require_once 'backend/config.php';

// Проверяем аутентификацию администратора
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin_login.php');
    exit;
}

$message = '';
$error = '';

// Получаем список пользователей с информацией о паролях
try {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }

    $stmt = $pdo->prepare('
        SELECT 
            u.id, u.username, u.email, u.password_remembered, u.password_remembered_at,
            u.password_last_changed, u.password_change_count, u.password_reset_requested,
            u.password_reset_requested_at, u.created_at
        FROM users u 
        ORDER BY u.created_at DESC
    ');
    $stmt->execute();
    $users = $stmt->fetchAll();

} catch (Exception $e) {
    error_log('Password management error: ' . $e->getMessage());
    $error = 'Произошла ошибка при загрузке данных.';
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Управление паролями - Админ панель GGTips</title>
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
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        .header h1 {
            font-size: 2.5em;
            color: #ffd700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .back-btn {
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(45deg, #9d4edd, #7b2cbf);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            margin-top: 15px;
            transition: transform 0.3s ease;
        }

        .back-btn:hover {
            transform: translateY(-2px);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

        .users-table {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .table-header {
            background: rgba(157, 78, 221, 0.3);
            padding: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .table-header h2 {
            color: #ffd700;
            font-size: 1.5em;
        }

        .table-content {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        th {
            background: rgba(255, 255, 255, 0.05);
            color: #ffd700;
            font-weight: 600;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        td {
            color: #e0e0e0;
            font-size: 0.9em;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(45deg, #9d4edd, #7b2cbf);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
        }

        .status-badge {
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.8em;
            font-weight: 600;
            text-transform: uppercase;
        }

        .status-remembered {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
            border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .status-not-remembered {
            background: rgba(158, 158, 158, 0.2);
            color: #9E9E9E;
            border: 1px solid rgba(158, 158, 158, 0.3);
        }

        .status-reset-requested {
            background: rgba(255, 152, 0, 0.2);
            color: #FF9800;
            border: 1px solid rgba(255, 152, 0, 0.3);
        }

        .action-btn {
            padding: 8px 15px;
            border: none;
            border-radius: 8px;
            font-size: 0.8em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 2px;
        }

        .btn-view {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
        }

        .btn-view:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        .btn-reset {
            background: linear-gradient(45deg, #FF9800, #F57C00);
            color: white;
        }

        .btn-reset:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
        }

        .btn-history {
            background: linear-gradient(45deg, #9C27B0, #7B1FA2);
            color: white;
        }

        .btn-history:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);
        }

        .message {
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
        }

        .message.success {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
            border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .message.error {
            background: rgba(244, 67, 54, 0.2);
            color: #f44336;
            border: 1px solid rgba(244, 67, 54, 0.3);
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-content {
            background: linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 100%);
            border-radius: 20px;
            padding: 30px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .modal-title {
            color: #ffd700;
            font-size: 1.5em;
            margin: 0;
        }

        .close-btn {
            background: none;
            border: none;
            color: #ccc;
            font-size: 2em;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .close-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        .password-info {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-label {
            color: #ccc;
            font-weight: 600;
        }

        .info-value {
            color: #fff;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .table-content {
                font-size: 0.8em;
            }
            
            th, td {
                padding: 10px 8px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Управление паролями</h1>
            <p>Просмотр, запоминание и управление паролями пользователей</p>
            <a href="admin_panel.php" class="back-btn">← Назад к панели</a>
        </div>

        <?php if ($message): ?>
            <div class="message success"><?php echo htmlspecialchars($message); ?></div>
        <?php endif; ?>

        <?php if ($error): ?>
            <div class="message error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <div class="stats-grid">
            <div class="stat-card">
                <h3><?php echo count($users); ?></h3>
                <p>Всего пользователей</p>
            </div>
            <div class="stat-card">
                <h3><?php echo count(array_filter($users, fn($u) => $u['password_remembered'])); ?></h3>
                <p>Пароли запомнены</p>
            </div>
            <div class="stat-card">
                <h3><?php echo count(array_filter($users, fn($u) => $u['password_reset_requested'])); ?></h3>
                <p>Запрошены сбросы</p>
            </div>
            <div class="stat-card">
                <h3><?php echo array_sum(array_column($users, 'password_change_count')); ?></h3>
                <p>Всего изменений паролей</p>
            </div>
        </div>

        <div class="users-table">
            <div class="table-header">
                <h2>👥 Список пользователей</h2>
            </div>
            <div class="table-content">
                <table>
                    <thead>
                        <tr>
                            <th>Пользователь</th>
                            <th>Email</th>
                            <th>Статус пароля</th>
                            <th>Последнее изменение</th>
                            <th>Количество изменений</th>
                            <th>Дата регистрации</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div class="user-avatar">
                                            <?php echo strtoupper(substr($user['username'], 0, 1)); ?>
                                        </div>
                                        <div>
                                            <div style="font-weight: 600; color: #fff;"><?php echo htmlspecialchars($user['username']); ?></div>
                                            <div style="font-size: 0.8em; color: #ccc;">ID: <?php echo $user['id']; ?></div>
                                        </div>
                                    </div>
                                </td>
                                <td><?php echo htmlspecialchars($user['email']); ?></td>
                                <td>
                                    <?php if ($user['password_remembered']): ?>
                                        <span class="status-badge status-remembered">Запомнен</span>
                                        <div style="font-size: 0.8em; color: #ccc; margin-top: 5px;">
                                            <?php echo date('d.m.Y H:i', strtotime($user['password_remembered_at'])); ?>
                                        </div>
                                    <?php elseif ($user['password_reset_requested']): ?>
                                        <span class="status-badge status-reset-requested">Запрошен сброс</span>
                                        <div style="font-size: 0.8em; color: #ccc; margin-top: 5px;">
                                            <?php echo date('d.m.Y H:i', strtotime($user['password_reset_requested_at'])); ?>
                                        </div>
                                    <?php else: ?>
                                        <span class="status-badge status-not-remembered">Не запомнен</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php if ($user['password_last_changed']): ?>
                                        <?php echo date('d.m.Y H:i', strtotime($user['password_last_changed'])); ?>
                                    <?php else: ?>
                                        <span style="color: #ccc;">Не изменялся</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <span style="color: #ffd700; font-weight: 600;">
                                        <?php echo $user['password_change_count']; ?>
                                    </span>
                                </td>
                                <td><?php echo date('d.m.Y H:i', strtotime($user['created_at'])); ?></td>
                                <td>
                                    <button class="action-btn btn-view" onclick="viewPassword(<?php echo $user['id']; ?>, '<?php echo htmlspecialchars($user['username']); ?>')">
                                        👁️ Просмотр
                                    </button>
                                    <button class="action-btn btn-reset" onclick="requestPasswordReset(<?php echo $user['id']; ?>, '<?php echo htmlspecialchars($user['username']); ?>')">
                                        🔄 Сброс
                                    </button>
                                    <button class="action-btn btn-history" onclick="viewPasswordHistory(<?php echo $user['id']; ?>, '<?php echo htmlspecialchars($user['username']); ?>')">
                                        📊 История
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Модальное окно просмотра пароля -->
    <div id="passwordModal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Просмотр пароля пользователя</h3>
                <button class="close-btn" onclick="closePasswordModal()">&times;</button>
            </div>
            <div id="passwordModalContent">
                <!-- Содержимое будет загружено динамически -->
            </div>
        </div>
    </div>

    <script>
        function viewPassword(userId, username) {
            const modal = document.getElementById('passwordModal');
            const content = document.getElementById('passwordModalContent');
            
            // Показываем загрузку
            content.innerHTML = '<div style="text-align: center; padding: 20px; color: #ccc;">Загрузка...</div>';
            modal.style.display = 'flex';
            
            // Загружаем данные о пароле
            fetch('/backend/api/admin_view_password.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    reason: `Password view for user: ${username}`
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    content.innerHTML = `
                        <div class="password-info">
                            <div class="info-row">
                                <span class="info-label">Пользователь:</span>
                                <span class="info-value">${data.user.username}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Email:</span>
                                <span class="info-value">${data.user.email}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Хеш пароля:</span>
                                <span class="info-value" style="font-family: monospace; font-size: 0.8em; word-break: break-all;">${data.user.password_hash}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Статус:</span>
                                <span class="info-value" style="color: #4CAF50;">✓ Запомнен администратором</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Дата запоминания:</span>
                                <span class="info-value">${data.user.password_remembered_at}</span>
                            </div>
                        </div>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="action-btn btn-view" onclick="closePasswordModal()">Закрыть</button>
                        </div>
                    `;
                } else {
                    content.innerHTML = `
                        <div style="text-align: center; padding: 20px; color: #f44336;">
                            Ошибка: ${data.error}
                        </div>
                        <div style="text-align: center; margin-top: 20px;">
                            <button class="action-btn btn-view" onclick="closePasswordModal()">Закрыть</button>
                        </div>
                    `;
                }
            })
            .catch(error => {
                content.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #f44336;">
                        Ошибка соединения: ${error.message}
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="action-btn btn-view" onclick="closePasswordModal()">Закрыть</button>
                    </div>
                `;
            });
        }

        function requestPasswordReset(userId, username) {
            if (confirm(`Вы уверены, что хотите запросить сброс пароля для пользователя "${username}"?`)) {
                // Здесь можно добавить логику для запроса сброса пароля
                alert('Функция запроса сброса пароля будет реализована в следующем обновлении.');
            }
        }

        function viewPasswordHistory(userId, username) {
            // Здесь можно добавить логику для просмотра истории паролей
            alert('Функция просмотра истории паролей будет реализована в следующем обновлении.');
        }

        function closePasswordModal() {
            document.getElementById('passwordModal').style.display = 'none';
        }

        // Закрытие модального окна при клике вне его
        document.getElementById('passwordModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closePasswordModal();
            }
        });
    </script>
</body>
</html>
