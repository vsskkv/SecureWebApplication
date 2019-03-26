<?php

namespace App\Controllers;

use Slim\views\PhpRenderer as View;
use App\Models\UserModel as U;

class UserController extends Controller {
  
  public function index($request, $response) {
    $arr = new U($this->db);
    $users = $arr->getUsers();
    return $this->view->render($response, "Users.php", ["users" => $users, "router" => $this->router]); 
  }
}
