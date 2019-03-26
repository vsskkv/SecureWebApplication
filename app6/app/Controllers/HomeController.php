<?php

namespace App\Controllers;

use Slim\views\PhpRenderer as View;
use App\Models\UserModel as U;

class HomeController extends Controller {
  
  public function index($request, $response) {
    if(!empty($_SESSION["uid"])) {
      $u = new U($this->db);
      $data = json_encode($u->getURIs($_SESSION['uid']));
    } else { $data = 'null'; }
    $csrf = $request->getAttribute("csrf");
    return $this->view->render($response, "Home.php",["router" => $this->router, 'data' => $data, "csrf" => $csrf]); 
  }

  public function option1($request, $response) {
    $csrf = $request->getAttribute("csrf");
    return $this->view->render($response, "Option1.php", ["router" => $this->router, "csrf" => $csrf]);
  }

  public function saveuri($request, $response) {
//  	var_dump($request);
    $u = new U($this->db);
    $uris = $u->saveURI($request, $response);

    if(!empty($uris)) {
      $returnData['success'] = true;
      $returnData['responseText'] = $uris; 
    } else {
      $returnData['success'] = false;
      $returnData['responseText'] = 'ERROR: Failed to save URI';
    }

    $csrf = $request->getAttribute('csrf');
    $response = $response->withAddedHeader('csrf', $csrf);
    return $response->withJson($returnData, 201);
  }
}