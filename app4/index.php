<?php

$servername = "localhost";
$username = "ArjunUser";
$password = "LDdMDuu3z7LZajk";
$dbname = "wwa4f";

// Create connection
$db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Check connection
if ($db->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

echo 'Connected to WWA4F database<br><br>';

$db = null;
echo 'Connection closed';
?>
    