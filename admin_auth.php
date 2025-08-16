<?php
session_start();

// Функция проверки авторизации администратора
function checkAdminAuth() {
    // Проверяем, авторизован ли администратор
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        header('Location: admin_login.php');
        exit;
    }
    
    // Проверяем время последней активности (30 минут)
    $timeout = 30 * 60; // 30 минут в секундах
    if (isset($_SESSION['admin_login_time']) && (time() - $_SESSION['admin_login_time']) > $timeout) {
        // Сессия истекла
        session_destroy();
        header('Location: admin_login.php?error=timeout');
        exit;
    }
    
    // Обновляем время последней активности
    $_SESSION['admin_login_time'] = time();
    
    return true;
}

// Функция выхода из админки
function adminLogout() {
    // Логируем выход
    if (isset($_SESSION['admin_username'])) {
        error_log("Admin logout: " . $_SESSION['admin_username'] . " from " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    }
    
    // Уничтожаем сессию
    session_destroy();
    
    // Перенаправляем на страницу входа
    header('Location: admin_login.php');
    exit;
}

// Функция получения информации об администраторе
function getAdminInfo() {
    if (isset($_SESSION['admin_username'])) {
        return [
            'username' => $_SESSION['admin_username'],
            'login_time' => $_SESSION['admin_login_time'] ?? 0,
            'session_duration' => time() - ($_SESSION['admin_login_time'] ?? time())
        ];
    }
    return null;
}

// Функция для отображения информации об администраторе в шапке
function renderAdminHeader() {
    $admin_info = getAdminInfo();
    if (!$admin_info) return '';
    
    $login_time = date('d.m.Y H:i', $admin_info['login_time']);
    $duration = gmdate('H:i:s', $admin_info['session_duration']);
    
    return '
    <div class="admin-info">
        <span>👤 Админ: ' . htmlspecialchars($admin_info['username']) . '</span>
        <span>🕐 Вход: ' . $login_time . '</span>
        <span>⏱️ Сессия: ' . $duration . '</span>
        <a href="admin_logout.php" class="logout-btn">🚪 Выйти</a>
    </div>';
}

// Функция для добавления CSS стилей админки
function renderAdminStyles() {
    return '
    <style>
        .admin-info {
            display: flex;
            gap: 20px;
            align-items: center;
            padding: 15px 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
            font-size: 0.9em;
        }
        
        .admin-info span {
            opacity: 0.8;
        }
        
        .logout-btn {
            padding: 8px 15px;
            background: linear-gradient(45deg, #f44336, #d32f2f);
            color: white;
            text-decoration: none;
            border-radius: 20px;
            font-size: 0.9em;
            transition: transform 0.3s ease;
        }
        
        .logout-btn:hover {
            transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
            .admin-info {
                flex-direction: column;
                gap: 10px;
                text-align: center;
            }
        }
    </style>';
}
?>
