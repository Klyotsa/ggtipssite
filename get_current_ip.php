<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

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

// Получаем текущий IP
$current_ip = getClientIP();

// Возвращаем JSON ответ
echo json_encode([
    'ip' => $current_ip,
    'timestamp' => time(),
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
]);
?>
