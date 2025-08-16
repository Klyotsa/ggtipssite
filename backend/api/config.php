<?php
// backend/config.php

// Настройки подключения к MySQL
const DB_HOST = 'localhost';
const DB_USER = 'u3078296_default'; // замените на ваш логин
const DB_PASS = 'ВАШ_ПАРОЛЬ';      // замените на ваш пароль
const DB_NAME = 'u3078296_default'; // имя вашей базы

function getDbConnection() {
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($mysqli->connect_errno) {
        http_response_code(500);
        die('Database connection failed: ' . $mysqli->connect_error);
    }
    $mysqli->set_charset('utf8mb4');
    return $mysqli;
} 