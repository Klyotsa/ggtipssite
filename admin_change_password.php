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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $current_password = $_POST['current_password'] ?? '';
    $new_password = $_POST['new_password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    
    if (empty($current_password) || empty($new_password) || empty($confirm_password)) {
        $error = 'Пожалуйста, заполните все поля';
    } elseif (strlen($new_password) < 8) {
        $error = 'Новый пароль должен содержать минимум 8 символов';
    } elseif ($new_password !== $confirm_password) {
        $error = 'Новые пароли не совпадают';
    } else {
        try {
            $pdo = getDBConnection();
            if (!$pdo) {
                throw new Exception('Database connection failed');
            }

            // Проверяем текущий пароль администратора
            $stmt = $pdo->prepare('SELECT password_hash FROM users WHERE id = 1 AND username = "admin"');
            $stmt->execute();
            $admin = $stmt->fetch();

            if (!$admin || !password_verify($current_password, $admin['password_hash'])) {
                $error = 'Неверный текущий пароль';
            } else {
                // Хешируем новый пароль
                $password_hash = password_hash($new_password, PASSWORD_BCRYPT, ['cost' => PASSWORD_COST]);

                // Обновляем пароль администратора
                $stmt = $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = 1');
                $stmt->execute([$password_hash]);

                // Логируем изменение пароля
                logActivity(1, 'admin_password_changed', 'Admin password changed');

                $message = 'Пароль администратора успешно изменен!';
                
                // Очищаем поля формы
                $_POST = array();
            }
            
        } catch (Exception $e) {
            error_log('Admin password change error: ' . $e->getMessage());
            $error = 'Произошла ошибка при изменении пароля. Попробуйте позже.';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Изменение пароля администратора - GGTips</title>
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
            max-width: 600px;
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

        .change-form {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #ffd700;
            font-weight: 600;
            font-size: 1em;
        }

        .form-group input {
            width: 100%;
            padding: 15px 20px;
            border: 1px solid rgba(157, 78, 221, 0.3);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 1.1em;
            transition: all 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #9d4edd;
            box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.1);
            background: rgba(255, 255, 255, 0.15);
        }

        .form-group input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .password-strength {
            margin-top: 10px;
            font-size: 0.9em;
            padding: 8px 12px;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
        }

        .password-strength.weak { 
            background: rgba(244, 67, 54, 0.2); 
            color: #f44336; 
            border: 1px solid rgba(244, 67, 54, 0.3);
        }
        .password-strength.medium { 
            background: rgba(255, 152, 0, 0.2); 
            color: #ff9800; 
            border: 1px solid rgba(255, 152, 0, 0.3);
        }
        .password-strength.strong { 
            background: rgba(76, 175, 80, 0.2); 
            color: #4caf50; 
            border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .submit-btn {
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(45deg, #9d4edd, #7b2cbf);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.2em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
        }

        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(157, 78, 221, 0.3);
        }

        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .message {
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 25px;
            font-size: 1em;
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

        .security-info {
            background: rgba(255, 215, 0, 0.1);
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
        }

        .security-info h3 {
            color: #ffd700;
            margin-bottom: 15px;
            font-size: 1.2em;
        }

        .security-info ul {
            list-style: none;
            padding: 0;
        }

        .security-info li {
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }

        .security-info li:before {
            content: "✅";
            position: absolute;
            left: 0;
            color: #4CAF50;
        }

        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .change-form {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Изменение пароля</h1>
            <p>Измените пароль администратора для повышения безопасности</p>
            <a href="admin_panel.php" class="back-btn">← Назад к панели</a>
        </div>

        <div class="change-form">
            <div class="security-info">
                <h3>🛡️ Требования безопасности</h3>
                <ul>
                    <li>Пароль должен содержать минимум 8 символов</li>
                    <li>Рекомендуется использовать буквы, цифры и специальные символы</li>
                    <li>Не используйте простые комбинации (123456, password)</li>
                    <li>Регулярно меняйте пароль для безопасности</li>
                </ul>
            </div>

            <?php if ($message): ?>
                <div class="message success">
                    <?php echo htmlspecialchars($message); ?>
                </div>
            <?php endif; ?>

            <?php if ($error): ?>
                <div class="message error">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="" id="passwordForm">
                <div class="form-group">
                    <label for="current_password">Текущий пароль:</label>
                    <input 
                        type="password" 
                        id="current_password" 
                        name="current_password" 
                        placeholder="Введите текущий пароль"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="new_password">Новый пароль:</label>
                    <input 
                        type="password" 
                        id="new_password" 
                        name="new_password" 
                        placeholder="Введите новый пароль"
                        minlength="8"
                        required
                    >
                    <div class="password-strength" id="passwordStrength"></div>
                </div>

                <div class="form-group">
                    <label for="confirm_password">Подтвердите новый пароль:</label>
                    <input 
                        type="password" 
                        id="confirm_password" 
                        name="confirm_password" 
                        placeholder="Повторите новый пароль"
                        minlength="8"
                        required
                    >
                </div>

                <button type="submit" class="submit-btn">
                    Изменить пароль администратора
                </button>
            </form>
        </div>
    </div>

    <script>
        // Проверка силы пароля
        document.getElementById('new_password').addEventListener('input', function() {
            const password = this.value;
            const strengthDiv = document.getElementById('passwordStrength');
            
            if (password.length === 0) {
                strengthDiv.textContent = '';
                strengthDiv.className = 'password-strength';
                return;
            }
            
            let strength = 0;
            let feedback = '';
            
            if (password.length >= 8) strength++;
            if (password.length >= 12) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            if (strength < 3) {
                feedback = 'Слабый пароль';
                strengthDiv.className = 'password-strength weak';
            } else if (strength < 5) {
                feedback = 'Средний пароль';
                strengthDiv.className = 'password-strength medium';
            } else {
                feedback = 'Сильный пароль';
                strengthDiv.className = 'password-strength strong';
            }
            
            strengthDiv.textContent = feedback;
        });

        // Проверка формы
        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            const currentPassword = document.getElementById('current_password').value;
            const newPassword = document.getElementById('new_password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            if (currentPassword === newPassword) {
                e.preventDefault();
                alert('Новый пароль должен отличаться от текущего!');
                return false;
            }
            
            if (newPassword !== confirmPassword) {
                e.preventDefault();
                alert('Новые пароли не совпадают!');
                return false;
            }
            
            if (newPassword.length < 8) {
                e.preventDefault();
                alert('Новый пароль должен содержать минимум 8 символов!');
                return false;
            }
            
            // Дополнительная проверка безопасности
            if (newPassword.toLowerCase().includes('password') || 
                newPassword.toLowerCase().includes('admin') ||
                newPassword.toLowerCase().includes('123456')) {
                e.preventDefault();
                alert('Пароль слишком простой! Выберите более сложный пароль.');
                return false;
            }
        });
    </script>
</body>
</html>
