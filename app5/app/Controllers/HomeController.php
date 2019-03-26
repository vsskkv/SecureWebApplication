<?php

namespace App\Controllers;

use Slim\views\PhpRenderer as View;
use App\Models\QuestionModel as Q;

class HomeController extends Controller {
  
  public function index($request, $response) {
    return $this->view->render($response, "Home.php", ["router" => $this->router]); 
  }

  public function option1($request, $response) {
    return $this->view->render($response, "Option1.php", ["router" => $this->router]); 
  }

}