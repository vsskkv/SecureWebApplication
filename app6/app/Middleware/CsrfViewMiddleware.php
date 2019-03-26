<?php

namespace App\Middleware;

class CsrfViewMiddleware extends Middleware {
	
  public function __invoke($request, $response, $next) {
    $csrf = '<input type="hidden" name="' . 
            $this->container->csrf->getTokenNameKey() . '" id="' .
            $this->container->csrf->getTokenNameKey() . '" value="' .
            $this->container->csrf->getTokenName() . 
            '"><input type="hidden" name="' . 
            $this->container->csrf->getTokenValueKey() . '" id="' .
            $this->container->csrf->getTokenValueKey() . '" value="' .
            $this->container->csrf->getTokenValue() . '">';

    $request = $request->withAttribute("csrf", $csrf);
    return $next($request, $response, $next);
  }

}