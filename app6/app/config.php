<?php

use Respect\Validation\Validator as V;

date_default_timezone_set("Europe/London");

session_start();
$_SESSION['lastActivity'] = time(); 

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

date_default_timezone_set("Europe/London");

require __DIR__ . '/../vendor/autoload.php';

include 'config/config.php';
$_SESSION['baseUrl'] = $baseUrl;
$app = new \Slim\App(["settings" => $config]);

// ================================================================================
$container = $app->getContainer();

$container['db'] = function ($container) {
  try {
    $db = $container['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'], $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
  } catch (Exception $e) {
    echo $e->getMessage();
    die();
  }
};
// ================================================================================
$container['view'] = new \Slim\Views\PhpRenderer(__DIR__ . "/Views/");
// ================================================================================
$container['validator'] = function($container) {
  return new \App\Validation\Validator($container);
};
// ================================================================================
$container['HomeController'] = function($container) {
  return new \App\Controllers\HomeController($container);
};
$container['UserController'] = function($container) {
  return new \App\Controllers\UserController($container);
};
$container['AuthController'] = function($container) {
  return new \App\Controllers\AuthController($container);
};
$container['csrf'] = function($container) {
  return new \Slim\Csrf\Guard;
};
// ================================================================================
$app->add(new App\Middleware\ValidationErrorsMiddleware($container));
$app->add(new App\Middleware\CsrfViewMiddleware($container));

V::with("App\\Validation\\Rules");
// ================================================================================

$app->add($container->csrf);

require __DIR__ . "/../app/routes.php";

// ================================================================================
