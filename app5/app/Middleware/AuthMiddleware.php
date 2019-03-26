<?php

namespace App\Middleware;

class AuthMiddleware extends Middleware {
	
  public function __invoke($request, $response, $next) {
    if(!empty($_SESSION['lastActivity'])) {
      if(time() - $_SESSION['lastActivity'] > 1800) {
        // last request was more than 30 minutes ago
        $_SESSION["uid"] = null;
        $_SESSION["knownas"] = null;
        $_SESSION['lastActivity'] = null;
//        session_unset();     // unset $_SESSION variable for the run-time 
//        session_destroy();   // destroy session data in storage
        $_SESSION["myMessage"] = "SESSION TIMEOUT: You need to log in";
      } else {
        $_SESSION['lastActivity'] = time(); 
      }
    }

  	if(empty($_SESSION["uid"])) {
  	  if(empty($_SESSION['myMessage'])) { $_SESSION["myMessage"] = "You need to log in"; }
  	  return $response->withRedirect($this->container->router->pathFor("login"));
  	}

    return $next($request, $response);
  }

}