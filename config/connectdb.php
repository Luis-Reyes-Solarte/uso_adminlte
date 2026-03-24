<?php
$hostDB = 'db';
$nameDB = 'games_db';
$userDB = 'rpg_user';
$pwDB = 'hola123..';

try {
  $hostPDO = "mysql:host=$hostDB;dbname=$nameDB;charset=utf8";
  $myPDO = new PDO($hostPDO, $userDB, $pwDB);
  $myPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo json_encode(["error" => "Error de conexión"]);
  exit;
}
