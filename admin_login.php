<?php
session_start();
require_once 'backend/config.php';

// Если уже авторизован, перенаправляем на панель
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: admin_panel.php');
    exit;
}

$error = '';
$success = '';

// Проверяем IP адрес
$client_ip = $_SERVER['REMOTE_ADDR'] ?? '';
$allowed_ip = '157.230.244.205'; // Ваш IP адрес

// Обработка формы входа
if ($_POST) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Проверяем IP адрес
    if ($client_ip !== $allowed_ip) {
        $error = 'Доступ к странице входа разрешен только с IP: ' . $allowed_ip;
    } else {
        // Проверяем учетные данные
        if ($username === 'admin' && $password === 'GGTips2025!') {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $username;
            $_SESSION['admin_ip'] = $client_ip;
            $_SESSION['admin_login_time'] = time();
            
            // Логируем вход
            logActivity(1, 'admin_login', 'Успешный вход в админку', ['ip' => $client_ip]);
            
            header('Location: admin_panel.php');
            exit;
        } else {
            $error = 'Неверный логин или пароль';
            
            // Логируем неудачную попытку
            logActivity(1, 'admin_login_failed', 'Неудачная попытка входа в админку', [
                'ip' => $client_ip,
                'username' => $username
            ]);
        }
    }
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
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        
        .logo {
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .title {
            font-size: 1.8em;
            margin-bottom: 30px;
            color: #ffd700;
        }
        
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #ffd700;
        }
        
        .form-input {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            transition: all 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
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
        }
        
        .success {
            background: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid rgba(76, 175, 80, 0.3);
        }
        
        .ip-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .credentials {
            background: rgba(255, 215, 0, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
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
            padding: 5px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">🚀</div>
        <h1 class="title">GGTips - Админ панель</h1>
        
        <?php if ($error): ?>
            <div class="error">❌ <?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <?php if ($success): ?>
            <div class="success">✅ <?php echo htmlspecialchars($success); ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="form-group">
                <label for="username">👤 Логин:</label>
                <input type="text" id="username" name="username" class="form-input" 
                       placeholder="Введите логин" required>
            </div>
            
            <div class="form-group">
                <label for="password">🔒 Пароль:</label>
                <input type="password" id="password" name="password" class="form-input" 
                       placeholder="Введите пароль" required>
            </div>
            
            <button type="submit" class="login-btn">🚀 Войти в админку</button>
        </form>
        
        <div class="ip-info">
            <strong>🌐 Ваш IP адрес:</strong> <?php echo htmlspecialchars($client_ip); ?>
            <br>
            <strong>✅ Разрешенный IP:</strong> <?php echo htmlspecialchars($allowed_ip); ?>
        </div>
        
        <div class="credentials">
            <h4>🔑 Тестовые учетные данные:</h4>
            <p><strong>Логин:</strong> admin</p>
            <p><strong>Пароль:</strong> GGTips2025!</p>
        </div>
    </div>
</body>
</html>
