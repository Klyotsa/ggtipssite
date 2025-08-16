<?php
require_once 'admin_auth.php';
checkAdminAuth();

// Проверяем, что передан ID пользователя
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    header('Location: admin_users.php?error=invalid_id');
    exit;
}

$user_id = (int)$_GET['id'];

// Проверяем, что пользователь не админ
if ($user_id === 1) { // ID админа
    header('Location: admin_users.php?error=cannot_delete_admin');
    exit;
}

try {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception('Database connection failed');
    }

    // Начинаем транзакцию
    $pdo->beginTransaction();

    // Удаляем связанные записи
    $stmt = $pdo->prepare('DELETE FROM user_activity_log WHERE user_id = ?');
    $stmt->execute([$user_id]);

    $stmt = $pdo->prepare('DELETE FROM user_sessions WHERE user_id = ?');
    $stmt->execute([$user_id]);

    $stmt = $pdo->prepare('DELETE FROM verification_codes WHERE user_id = ?');
    $stmt->execute([$user_id]);

    $stmt = $pdo->prepare('DELETE FROM transactions WHERE user_id = ?');
    $stmt->execute([$user_id]);

    $stmt = $pdo->prepare('DELETE FROM user_profiles WHERE user_id = ?');
    $stmt->execute([$user_id]);

    // Удаляем самого пользователя
    $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
    $stmt->execute([$user_id]);

    // Подтверждаем транзакцию
    $pdo->commit();

    // Логируем удаление
    logActivity(1, 'admin_action', "Admin deleted user ID: $user_id");

    header('Location: admin_users.php?success=user_deleted');
    exit;

} catch (Exception $e) {
    // Откатываем транзакцию в случае ошибки
    if ($pdo) {
        $pdo->rollBack();
    }
    
    error_log('User deletion error: ' . $e->getMessage());
    header('Location: admin_users.php?error=deletion_failed');
    exit;
}
?>
