<?php
session_start();

// Разрешенные IP адреса для доступа к админке
$allowed_ips = [
    '157.230.244.205',  // IP вашего сервера
    '127.0.0.1',        // localhost
    '::1'               // IPv6 localhost
];

// Проверяем IP адрес
$client_ip = $_SERVER['REMOTE_ADDR'] ?? '';
$is_allowed_ip = in_array($client_ip, $allowed_ips);

// Если IP не разрешен, показываем ошибку
if (!$is_allowed_ip) {
    http_response_code(403);
    die('
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Доступ запрещен</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .error-box {
                background: rgba(255, 0, 0, 0.2);
                padding: 40px;
                border-radius: 20px;
                border: 2px solid rgba(255, 0, 0, 0.3);
                backdrop-filter: blur(10px);
            }
            h1 { color: #ff6b6b; margin-bottom: 20px; }
            .ip-info { background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="error-box">
            <h1>🚫 Доступ запрещен</h1>
            <p>Ваш IP адрес не разрешен для доступа к административной панели.</p>
            <div class="ip-info">
                <strong>Ваш IP:</strong> ' . htmlspecialchars($client_ip) . '<br>
                <strong>Разрешенные IP:</strong> ' . implode(', ', $allowed_ips) . '
            </div>
            <p>Для получения доступа свяжитесь с администратором.</p>
        </div>
    </body>
    </html>');
}

// Обработка входа
$error = '';
if ($_POST) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Проверяем учетные данные администратора
    if ($username === 'admin' && $password === 'GGTips2025!') {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        $_SESSION['admin_ip'] = $client_ip;
        $_SESSION['admin_login_time'] = time();
        
        // Логируем успешный вход
        error_log("Admin login successful from IP: $client_ip, Username: $username");
        
        header('Location: admin_panel.php');
        exit;
    } else {
        $error = 'Неверный логин или пароль';
        error_log("Admin login failed from IP: $client_ip, Username: $username");
    }
}

// Если уже авторизован, перенаправляем на панель
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in']) {
    header('Location: admin_panel.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GGTips - Вход в админку</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .login-container {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            opacity: 0.8;
            font-size: 1.1em;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #ffd700;
        }
        
        .form-group input {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus {
            outline: none;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
        
        .login-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s ease;
            margin-top: 10px;
        }
        
        .login-btn:hover {
            transform: scale(1.02);
        }
        
        .error {
            background: rgba(255, 0, 0, 0.2);
            color: #ff6b6b;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 0, 0, 0.3);
            text-align: center;
        }
        
        .ip-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .credentials {
            background: rgba(255, 215, 0, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
            border: 1px solid rgba(255, 215, 0, 0.3);
        }
        
        .credentials h4 {
            color: #ffd700;
            margin-bottom: 10px;
        }
        
        .credentials p {
            margin: 5px 0;
            font-family: monospace;
            background: rgba(0, 0, 0, 0.2);
            padding: 5px 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="header">
            <h1>🚀 GGTips</h1>
            <p>Вход в административную панель</p>
        </div>
        
        <?php if ($error): ?>
            <div class="error">❌ <?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="form-group">
                <label for="username">👤 Логин:</label>
                <input type="text" id="username" name="username" required 
                       placeholder="Введите логин администратора">
            </div>
            
            <div class="form-group">
                <label for="password">🔒 Пароль:</label>
                <input type="password" id="password" name="password" required 
                       placeholder="Введите пароль">
            </div>
            
            <button type="submit" class="login-btn">🔑 Войти в админку</button>
        </form>
        
        <div class="ip-info">
            <strong>Ваш IP адрес:</strong> <?php echo htmlspecialchars($client_ip); ?><br>
            <strong>Статус:</strong> ✅ Разрешен
        </div>
        
        <div class="credentials">
            <h4>📋 Учетные данные для демонстрации:</h4>
            <p><strong>Логин:</strong> admin</p>
            <p><strong>Пароль:</strong> GGTips2025!</p>
        </div>
    </div>
</body>
</html>
