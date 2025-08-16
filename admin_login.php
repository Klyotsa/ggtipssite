<?php
session_start();

// Если уже авторизован, перенаправляем на главную страницу админки
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: admin_panel.php');
    exit;
}

$error = '';

// Обработка формы входа
if ($_POST) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Проверяем учетные данные администратора
    if ($username === 'admin' && $password === 'admin123') {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        $_SESSION['admin_login_time'] = time();
        $_SESSION['admin_ip'] = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        
        // Логируем успешный вход
        error_log("Admin login successful: $username from " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        
        header('Location: admin_panel.php');
        exit;
    } else {
        $error = 'Неверный логин или пароль!';
        error_log("Admin login failed: $username from " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GGTips - Вход в админ панель</title>
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
            color: #ffd700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .title {
            font-size: 1.8em;
            margin-bottom: 10px;
            color: white;
        }
        
        .subtitle {
            font-size: 1em;
            margin-bottom: 30px;
            opacity: 0.8;
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
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .error-message {
            background: rgba(255, 0, 0, 0.2);
            color: #ff6b6b;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 0, 0, 0.3);
            font-weight: bold;
        }
        
        .credentials-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .credentials-info strong {
            color: #ffd700;
        }
        
        .back-link {
            margin-top: 20px;
            display: block;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .back-link:hover {
            color: white;
        }
        
        .security-note {
            font-size: 0.8em;
            opacity: 0.6;
            margin-top: 15px;
            color: #ffd700;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">🚀</div>
        <h1 class="title">GGTips</h1>
        <p class="subtitle">Вход в административную панель</p>
        
        <?php if ($error): ?>
            <div class="error-message">
                ❌ <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="username">👤 Логин:</label>
                <input type="text" id="username" name="username" class="form-input" 
                       placeholder="Введите логин" required autocomplete="username">
            </div>
            
            <div class="form-group">
                <label for="password">🔒 Пароль:</label>
                <input type="password" id="password" name="password" class="form-input" 
                       placeholder="Введите пароль" required autocomplete="current-password">
            </div>
            
            <button type="submit" class="login-btn">
                🚀 Войти в админку
            </button>
        </form>
        
        <div class="credentials-info">
            <strong>Демо доступ:</strong><br>
            Логин: <strong>admin</strong><br>
            Пароль: <strong>admin123</strong>
        </div>
        
        <a href="../" class="back-link">← Вернуться на главную страницу</a>
        
        <div class="security-note">
            ⚠️ В продакшене обязательно измените пароль!
        </div>
    </div>
</body>
</html>
