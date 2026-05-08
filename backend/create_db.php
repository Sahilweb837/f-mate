<?php
$host = '127.0.0.1';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `cupmate_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    echo "Database 'cupmate_db' created successfully.\n";
} catch (PDOException $e) {
    die("Error creating database: " . $e->getMessage());
}
