<?php
// backend/api/send_verification_code.php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

$code = random_int(100000, 999999);
$_SESSION['email_verification'][$email] = [
    'code' => $code,
    'expires' => time() + 600 // 10 минут
];

$subject = 'Your verification code';
$message = "Your verification code: $code\nThis code is valid for 10 minutes.";
$headers = "From: support@ganggametips.com\r\nReply-To: support@ganggametips.com";

if (mail($email, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
} 