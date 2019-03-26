<?php

namespace App\Controllers;

use App\Models\UserModel as U;
use Respect\Validation\Validator as V;

class AuthController extends Controller {
  // ================================================================================
  public function getLogin($request, $response) {
    $csrf = $request->getAttribute("csrf");
    return $this->view->render($response, "Login.php", ["router" => $this->router, "csrf" => $csrf]); 
  }
  // ================================================================================
  // https://stackoverflow.com/questions/520237/how-do-i-expire-a-php-session-after-30-minutes
  public function postLogin($request, $response) {
    $validation = $this->validator->validate($request, [
      'email' => V::noWhitespace()->notEmpty(),
      'password' => V::noWhitespace()->notEmpty()
    ]);

    if($validation->failed()) {
      $_SESSION["myMessage"] = "There are errors on the form";
      return $response->withRedirect($this->router->pathFor("login"));
    }

    $m = new U($this->db);
    $r = $m->authenticateUser($request, $response);
    if($r) {
      return $response->withRedirect($this->router->pathFor("home")); 
    } else {
      $_SESSION["myMessage"] = "Email/password not found";
      return $response->withRedirect($this->router->pathFor("login"));      
    }
  }
  // ================================================================================
  public function getLogout($request, $response) {
    $_SESSION["uid"] = null;
    $_SESSION["firstname"] = null;
    unset($_SESSION["uid"]);
    unset($_SESSION["firstname"]);

    $_SESSION["myMessage"] = "1:You have logged out";
    return $response->withRedirect($this->router->pathFor("home"));
  }
  // ================================================================================
  public function getRegister($request, $response) {
    $csrf = $request->getAttribute("csrf");
//    var_dump($csrf);
//    die();
    return $this->view->render($response, "Register.php", ["router" => $this->router, "csrf" => $csrf]); 
  }
  // ================================================================================
  public function postRegister($request, $response) {
    $validation = $this->validator->validate($request, [
      'firstname' => V::notEmpty(),
      'surname' => V::notEmpty(),
      'email' => V::noWhitespace()->notEmpty()->email()->EmailAvailable($this->db)->IsItAston(),
      'password' => V::noWhitespace()->notEmpty()
    ]);

    if($validation->failed()) {
      $_SESSION["myMessage"] = "There are errors on the form";
      return $response->withRedirect($this->router->pathFor("register"));
    }

    //var_dump($request->getParams());
    $m = new U($this->db);
    $r = $m->saveUser($request, $response);
    return $response->withRedirect($this->router->pathFor("home"));
  }
  // ================================================================================
  public function getChangePassword($request, $response) {
    $csrf = $request->getAttribute("csrf");
    return $this->view->render($response, "ChangePassword.php", ["router" => $this->router, "csrf" => $csrf]); 
  }
  // ================================================================================
  public function postChangePassword($request, $response) {
/*    $data = $request->getParsedBody();
    $pdata = [];
    $pdata['existingpassword'] = filter_var($data['existingpassword'], FILTER_SANITIZE_STRING);
    $pdata['newpassword'] = filter_var($data['newpassword'], FILTER_SANITIZE_STRING);
    $pdata['confirmpassword'] = filter_var($data['confirmpassword'], FILTER_SANITIZE_STRING);
*/
    $validation = $this->validator->validate($request, [
      'existingpassword' => V::notEmpty(),
      'newpassword' => V::noWhitespace()->notEmpty(),
      'confirmpassword' => V::noWhitespace()->notEmpty()->strIdentical($pdata)
    ]);

    if($validation->failed()) {
      $_SESSION["myMessage"] = "There are errors on the form";
      return $response->withRedirect($this->router->pathFor("changepassword"));
    }

    //var_dump($request->getParams());
    $m = new U($this->db);
    $s = $m->updatePassword($request, $response);
    if($s == "Update OK") {
      $_SESSION["myMessage"] = "SUCCESS: Your password has been updated";
      return $response->withRedirect($this->router->pathFor("home"));
    } else {
      $_SESSION["myMessage"] = $s;
      return $response->withRedirect($this->router->pathFor("changepassword"));
    }
  }
  // ================================================================================
  public function getResetPassword($request, $response) {
    $csrf = $request->getAttribute("csrf");
    return $this->view->render($response, "ResetPassword.php", ["router" => $this->router, "csrf" => $csrf]); 
  }
  // ================================================================================
  public function postResetPassword($request, $response) {
/*    $data = $request->getParsedBody();
    $pdata = [];
    $pdata['existingpassword'] = filter_var($data['existingpassword'], FILTER_SANITIZE_STRING);
    $pdata['newpassword'] = filter_var($data['newpassword'], FILTER_SANITIZE_STRING);
    $pdata['confirmpassword'] = filter_var($data['confirmpassword'], FILTER_SANITIZE_STRING);
*/
    $validation = $this->validator->validate($request, [
     'email' => V::noWhitespace()->notEmpty()
    ]);

    if($validation->failed()) {
      $_SESSION["myMessage"] = "There are errors on the form";
      return $response->withRedirect($this->router->pathFor("changepassword"));
    }

    //var_dump($request->getParams());
    $m = new U($this->db);
    $s = $m->resetPassword($request, $response);
/*    if($s == "Update OK") {
      $_SESSION["myMessage"] = "SUCCESS: Your password has been updated";
      return $response->withRedirect($this->router->pathFor("home"));
    } else {
      $_SESSION["myMessage"] = $s;
      return $response->withRedirect($this->router->pathFor("changepassword"));
    } */
  }
  // ================================================================================
}
