<?php
session_start();
require_once 'backend/config.php';

$message = '';
$error = '';
$token_valid = false;
$user_id = null;

// Проверяем токен
if (isset($_GET['token'])) {
    $token = trim($_GET['token']);
    
    try {
        $pdo = getDBConnection();
        if (!$pdo) {
            throw new Exception('Database connection failed');
        }

        // Проверяем токен и его срок действия
        $stmt = $pdo->prepare('
            SELECT user_id, expires_at 
            FROM password_reset_tokens 
            WHERE token = ? AND expires_at > NOW() AND used = 0
        ');
        $stmt->execute([$token]);
        $token_data = $stmt->fetch();

        if ($token_data) {
            $token_valid = true;
            $user_id = $token_data['user_id'];
        } else {
            $error = 'Недействительная или просроченная ссылка для сброса пароля.';
        }
    } catch (Exception $e) {
        error_log('Token validation error: ' . $e->getMessage());
        $error = 'Произошла ошибка при проверке токена.';
    }
} else {
    $error = 'Ссылка для сброса пароля не указана.';
}

// Обработка изменения пароля
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $token_valid) {
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    
    if (empty($password)) {
        $error = 'Пожалуйста, введите новый пароль';
    } elseif (strlen($password) < 8) {
        $error = 'Пароль должен содержать минимум 8 символов';
    } elseif ($password !== $confirm_password) {
        $error = 'Пароли не совпадают';
    } else {
        try {
            $pdo = getDBConnection();
            if (!$pdo) {
                throw new Exception('Database connection failed');
            }

            // Начинаем транзакцию
            $pdo->beginTransaction();

            // Хешируем новый пароль
            $password_hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => PASSWORD_COST]);

            // Сохраняем старый пароль в историю
            $stmt = $pdo->prepare("SELECT password_hash FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            $old_password = $stmt->fetch();

            if ($old_password) {
                $stmt = $pdo->prepare("INSERT INTO password_history (user_id, password_hash, changed_by, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $user_id,
                    $old_password["password_hash"],
                    "reset",
                    $_SERVER["HTTP_CLIENT_IP"] ?? $_SERVER["HTTP_X_FORWARDED_FOR"] ?? $_SERVER["REMOTE_ADDR"] ?? "unknown",
                    $_SERVER["HTTP_USER_AGENT"] ?? "unknown"
                ]);
            }

            // Обновляем пароль пользователя
            $stmt = $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
            $stmt->execute([$password_hash, $user_id]);

            // Помечаем токен как использованный
            $stmt = $pdo->prepare('UPDATE password_reset_tokens SET used = 1 WHERE token = ?');
            $stmt->execute([$token]);

            // Логируем изменение пароля
            logActivity($user_id, 'password_changed', 'Password changed via reset link');

            // Подтверждаем транзакцию
            $pdo->commit();

            $message = 'Пароль успешно изменен! Теперь вы можете войти в систему с новым паролем.';
            
            // Перенаправляем на страницу входа через 3 секунды
            header("refresh:3;url=index.html");
            
        } catch (Exception $e) {
            // Откатываем транзакцию в случае ошибки
            if ($pdo) {
                $pdo->rollBack();
            }
            
            error_log('Password change error: ' . $e->getMessage());
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
    <title>Изменение пароля - GGTips</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .container {
            max-width: 400px;
            width: 100%;
            padding: 20px;
        }

        .change-form {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            text-align: center;
        }

        .logo {
            margin-bottom: 30px;
        }

        .logo h1 {
            font-size: 2.5em;
            color: #ffd700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #ccc;
            font-size: 0.9em;
        }

        .form-group input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid rgba(157, 78, 221, 0.3);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 1em;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #9d4edd;
            box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.1);
        }

        .form-group input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        .password-strength {
            margin-top: 8px;
            font-size: 0.8em;
            color: #ccc;
        }

        .password-strength.weak { color: #f44336; }
        .password-strength.medium { color: #ff9800; }
        .password-strength.strong { color: #4caf50; }

        .submit-btn {
            width: 100%;
            padding: 14px 20px;
            background: linear-gradient(45deg, #9d4edd, #7b2cbf);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .submit-btn:hover {
            transform: translateY(-2px);
        }

        .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .message {
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-size: 0.9em;
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

        .back-link {
            margin-top: 20px;
            text-align: center;
        }

        .back-link a {
            color: #9d4edd;
            text-decoration: none;
            font-size: 0.9em;
        }

        .back-link a:hover {
            text-decoration: underline;
        }

        .info-text {
            color: #ccc;
            font-size: 0.9em;
            line-height: 1.5;
            margin-bottom: 25px;
        }

        @media (max-width: 480px) {
            .container {
                padding: 15px;
            }
            
            .change-form {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="change-form">
            <div class="logo">
                <h1>🔐</h1>
            </div>
            
            <h2 style="margin-bottom: 20px; color: #ffd700;">Изменение пароля</h2>

            <?php if ($error): ?>
                <div class="message error">
                    <?php echo htmlspecialchars($error); ?>
                </div>
                <div class="back-link">
                    <a href="reset_password.php">← Запросить новую ссылку</a>
                </div>
            <?php elseif ($message): ?>
                <div class="message success">
                    <?php echo htmlspecialchars($message); ?>
                </div>
                <div class="back-link">
                    <a href="index.html">← Перейти на главную</a>
                </div>
            <?php elseif ($token_valid): ?>
                <p class="info-text">
                    Введите новый пароль для вашего аккаунта. 
                    Пароль должен содержать минимум 8 символов.
                </p>

                <form method="POST" action="" id="passwordForm">
                    <div class="form-group">
                        <label for="password">Новый пароль:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Введите новый пароль"
                            minlength="8"
                            required
                        >
                        <div class="password-strength" id="passwordStrength"></div>
                    </div>

                    <div class="form-group">
                        <label for="confirm_password">Подтвердите пароль:</label>
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
                        Изменить пароль
                    </button>
                </form>

                <div class="back-link">
                    <a href="index.html">← Вернуться на главную</a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <script>
        // Проверка силы пароля
        document.getElementById('password').addEventListener('input', function() {
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
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            if (strength < 3) {
                feedback = 'Слабый пароль';
                strengthDiv.className = 'password-strength weak';
            } else if (strength < 4) {
                feedback = 'Средний пароль';
                strengthDiv.className = 'password-strength medium';
            } else {
                feedback = 'Сильный пароль';
                strengthDiv.className = 'password-strength strong';
            }
            
            strengthDiv.textContent = feedback;
        });

        // Проверка совпадения паролей
        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Пароли не совпадают!');
                return false;
            }
            
            if (password.length < 8) {
                e.preventDefault();
                alert('Пароль должен содержать минимум 8 символов!');
                return false;
            }
        });
    </script>
</body>
</html>
