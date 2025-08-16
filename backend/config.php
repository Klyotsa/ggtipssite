<?php
// Database configuration for GGTips
define('DB_HOST', 'localhost');
define('DB_NAME', 'ggtips_db');
define('DB_USER', 'ggtips_user');
define('DB_PASS', 'GGTips2025!');
define('DB_CHARSET', 'utf8mb4');

// Site configuration
define('SITE_NAME', 'GGTips');
define('SITE_URL', 'http://157.230.244.205');
define('SITE_EMAIL', 'admin@ggtips.com');

// Security settings
define('JWT_SECRET', 'your-super-secret-jwt-key-change-this-in-production');
define('PASSWORD_COST', 12);
define('SESSION_TIMEOUT', 3600); // 1 hour

// File upload settings
define('UPLOAD_DIR', '/opt/ggtips/uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'webp']);

// Email settings (if using SMTP)
define('SMTP_HOST', 'localhost');
define('SMTP_PORT', 587);
define('SMTP_USER', '');
define('SMTP_PASS', '');

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Timezone
date_default_timezone_set('UTC');

// Database connection function
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return false;
    }
}

// Helper functions
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

function generateToken($length = 32) {
    return bin2hex(random_bytes($length));
}

function logActivity($userId, $action, $description = '', $metadata = null) {
    try {
        $pdo = getDBConnection();
        if ($pdo) {
            $stmt = $pdo->prepare("
                INSERT INTO user_activity_log (user_id, action, description, ip_address, user_agent, metadata) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $userId,
                $action,
                $description,
                $_SERVER['REMOTE_ADDR'] ?? null,
                $_SERVER['HTTP_USER_AGENT'] ?? null,
                $metadata ? json_encode($metadata) : null
            ]);
        }
    } catch (Exception $e) {
        error_log("Failed to log activity: " . $e->getMessage());
    }
}
?> 