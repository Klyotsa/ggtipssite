<?php
session_start();
require_once 'backend/config.php';

$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    
    if (empty($email)) {
        $error = 'Пожалуйста, введите email адрес';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Пожалуйста, введите корректный email адрес';
    } else {
        try {
            $pdo = getDBConnection();
            if (!$pdo) {
                throw new Exception('Database connection failed');
            }

            // Проверяем, существует ли пользователь с таким email
            $stmt = $pdo->prepare('SELECT id, username FROM users WHERE email = ?');
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user) {
                // Генерируем токен для сброса пароля
                $token = bin2hex(random_bytes(32));
                $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
                
                // Сохраняем токен в базе
                $stmt = $pdo->prepare('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)');
                $stmt->execute([$user['id'], $token, $expires]);
                
                // Отправляем email
                $reset_link = "https://ganggametips.com/change_password.php?token=" . $token;
                $subject = "Сброс пароля - GGTips";
                $message_body = "
                <html>
                <body>
                    <h2>Сброс пароля для аккаунта {$user['username']}</h2>
                    <p>Вы запросили сброс пароля для вашего аккаунта на сайте GGTips.</p>
                    <p>Для сброса пароля перейдите по ссылке:</p>
                    <p><a href='{$reset_link}' style='background: #9d4edd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;'>Сбросить пароль</a></p>
                    <p>Ссылка действительна в течение 1 часа.</p>
                    <p>Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.</p>
                    <br>
                    <p>С уважением,<br>Команда GGTips</p>
                </body>
                </html>";
                
                $headers = "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
                $headers .= "From: GGTips <noreply@ganggametips.com>\r\n";
                
                if (mail($email, $subject, $message_body, $headers)) {
                    $message = 'Инструкции по сбросу пароля отправлены на ваш email адрес.';
                } else {
                    $error = 'Ошибка отправки email. Попробуйте позже.';
                }
            } else {
                // Не показываем, что email не существует (безопасность)
                $message = 'Если указанный email существует в нашей базе, вы получите инструкции по сбросу пароля.';
            }
            
        } catch (Exception $e) {
            error_log('Password reset error: ' . $e->getMessage());
            $error = 'Произошла ошибка. Попробуйте позже.';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сброс пароля - GGTips</title>
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

        .reset-form {
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
            
            .reset-form {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="reset-form">
            <div class="logo">
                <h1>🔐</h1>
            </div>
            
            <h2 style="margin-bottom: 20px; color: #ffd700;">Сброс пароля</h2>
            
            <p class="info-text">
                Введите email адрес, указанный при регистрации. 
                Мы отправим вам ссылку для сброса пароля.
            </p>

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

            <form method="POST" action="">
                <div class="form-group">
                    <label for="email">Email адрес:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Введите ваш email"
                        value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>"
                        required
                    >
                </div>

                <button type="submit" class="submit-btn">
                    Отправить ссылку для сброса
                </button>
            </form>

            <div class="back-link">
                <a href="index.html">← Вернуться на главную</a>
            </div>
        </div>
    </div>
</body>
</html>
