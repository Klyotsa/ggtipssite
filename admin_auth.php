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
            'session_duration' => time() - ($_SESSION['admin_login_time'] ?? time()),
            'ip_address' => $_SESSION['admin_ip'] ?? 'unknown'
        ];
    }
    return null;
}

// Функция для получения IP-адреса
function getClientIP() {
    $ip_keys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'];
    foreach ($ip_keys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Функция для отображения информации об администраторе в шапке
function renderAdminHeader() {
    $admin_info = getAdminInfo();
    if (!$admin_info) return '';
    
    $login_time = date('d.m.Y H:i', $admin_info['login_time']);
    $current_ip = getClientIP();
    
    return '
    <div class="admin-info">
        <span>👤 Админ: ' . htmlspecialchars($admin_info['username']) . '</span>
        <span id="current-ip">🌐 IP: ' . htmlspecialchars($current_ip) . '</span>
        <span>🕐 Вход: ' . $login_time . '</span>
        <span id="session-timer">⏱️ Сессия: 00:00:01</span>
        <a href="admin_logout.php" class="logout-btn">🚪 Выйти</a>
    </div>
    <script>
        // Работающий таймер сессии (начинаем с 1 секунды)
        const startTime = Math.floor(Date.now() / 1000) + 1; // +1 секунда
        
        function updateSessionTimer() {
            const now = Math.floor(Date.now() / 1000);
            const duration = Math.max(1, now - startTime);
            
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration % 3600) / 60);
            const seconds = duration % 60;
            
            const timeString = 
                (hours < 10 ? "0" : "") + hours + ":" +
                (minutes < 10 ? "0" : "") + minutes + ":" +
                (seconds < 10 ? "0" : "") + seconds;
            
            document.getElementById("session-timer").innerHTML = "⏱️ Сессия: " + timeString;
        }
        
        // Обновляем таймер каждую секунду
        setInterval(updateSessionTimer, 1000);
        updateSessionTimer(); // Запускаем сразу
        
        // Функция для обновления IP-адреса
        function updateIPAddress() {
            // Создаем AJAX запрос для получения текущего IP
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "get_current_ip.php", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.ip) {
                            document.getElementById("current-ip").innerHTML = "🌐 IP: " + response.ip;
                        }
                    } catch (e) {
                        console.log("IP update error:", e);
                    }
                }
            };
            xhr.send();
        }
        
        // Обновляем IP-адрес каждые 10 секунд
        setInterval(updateIPAddress, 10000);
    </script>';
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
