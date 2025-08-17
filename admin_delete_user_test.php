<?php
require_once 'backend/config.php';

// Проверяем, что передан ID пользователя
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo "Error: Invalid ID";
    exit;
}

$user_id = (int)$_GET['id'];

// Проверяем, что пользователь не админ
if ($user_id === 1) { // ID админа
    echo "Error: Cannot delete admin";
    exit;
}

try {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }

    // Проверяем, существует ли пользователь
    $stmt = $pdo->prepare('SELECT username FROM users WHERE id = ?');
    $stmt->execute([$user_id]);
    $user = $stmt->fetch();
    
    if (!$user) {
        echo "Error: User not found";
        exit;
    }

    echo "Found user: " . $user['username'] . "<br>";

    // Начинаем транзакцию
    $pdo->beginTransaction();

    // Удаляем связанные записи
    $stmt = $pdo->prepare('DELETE FROM user_activity_log WHERE user_id = ?');
    $stmt->execute([$user_id]);
    echo "Deleted from user_activity_log<br>";

    $stmt = $pdo->prepare('DELETE FROM user_sessions WHERE user_id = ?');
    $stmt->execute([$user_id]);
    echo "Deleted from user_sessions<br>";

    $stmt = $pdo->prepare('DELETE FROM verification_codes WHERE user_id = ?');
    $stmt->execute([$user_id]);
    echo "Deleted from verification_codes<br>";

    $stmt = $pdo->prepare('DELETE FROM transactions WHERE user_id = ?');
    $stmt->execute([$user_id]);
    echo "Deleted from transactions<br>";

    $stmt = $pdo->prepare('DELETE FROM user_profiles WHERE user_id = ?');
    $stmt->execute([$user_id]);
    echo "Deleted from user_profiles<br>";

    // Удаляем самого пользователя
    $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
    $stmt->execute([$user_id]);
    echo "Deleted from users<br>";

    // Подтверждаем транзакцию
    $pdo->commit();

    echo "SUCCESS: User deleted successfully!";

} catch (Exception $e) {
    // Откатываем транзакцию в случае ошибки
    if ($pdo) {
        $pdo->rollBack();
    }
    
    echo "ERROR: " . $e->getMessage();
}
?>
