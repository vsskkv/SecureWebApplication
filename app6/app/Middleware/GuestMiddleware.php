<?php

namespace App\Middleware;

class GuestMiddleware extends Middleware {
	
  public function __invoke($request, $response, $next) {
  	if(!empty($_SESSION["uid"])) {
  	  return $response->withRedirect($this->container->router->pathFor("home"));
  	}
    return $next($request, $response);
  }

}