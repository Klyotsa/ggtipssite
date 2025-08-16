<?php
// Test database connection
try {
    $pdo = new PDO('mysql:host=localhost;dbname=ggtips_db', 'ggtips_user', 'GGTips2025!');
    echo "Database connection: OK\n";
    
    // Test query
    $stmt = $pdo->query("SELECT COUNT(*) as user_count FROM users");
    $result = $stmt->fetch();
    echo "Users in database: " . $result['user_count'] . "\n";
    
    // Show tables
    $stmt = $pdo->query("SHOW TABLES");
    echo "Tables in database:\n";
    while ($row = $stmt->fetch()) {
        echo "- " . $row[0] . "\n";
    }
    
} catch (Exception $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
?>
