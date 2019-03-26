<?php

use App\Middleware\AuthMiddleware;
use App\Middleware\GuestMiddleware;

$app->get("/", "HomeController:index")->setName("home");
$app->get("/option1", "HomeController:option1")->setName("option1");

$app->group("", function() {

  $this->get("/register", "AuthController:getRegister")->setName("register");
  $this->post("/register", "AuthController:postRegister");

  $this->get("/login", "AuthController:getLogin")->setName("login");
  $this->post("/login", "AuthController:postLogin");

  $this->get("/resetpassword", "AuthController:getResetPassword")->setName("resetpassword");
  $this->post("/resetpassword", "AuthController:postResetPassword");

})->add(new GuestMiddleware($container));

$app->group("", function() {
  $this->post("/saveuri", "HomeController:saveURI")->setName("saveuri");

  $this->get("/changepassword", "AuthController:getChangePassword")->setName("changepassword");
  $this->post("/changepassword", "AuthController:postChangePassword");

  $this->get("/logout", "AuthController:getLogout")->setName("logout");

})->add(new AuthMiddleware($container));