<?php

namespace App\Validation;

use Respect\Validation\Validator as Respect;
use Respect\Validation\Exceptions\NestedValidationException;

class Validator 
{

  protected $errors;

  public function validate($request, array $rules) {
    // Save existing values
    foreach ($request->getParams() as $key => $value) {
      if($key !== 'password') {
        $_SESSION[$key] = $value;
      }
    }

  	foreach($rules as $field => $rule) {
//      echo "field: " . $request->getParam($field) . ", " . (string)$rule . "<br>";
  	  try {
  	    $rule->setName(ucfirst($field))->assert($request->getParam($field));
  	  } catch(NestedValidationException $e) {
  	  	$this->errors[$field] = $e->getMessages();
  	  }
  	}
//  	var_dump($this->errors);
//  	die();

    $_SESSION['errors'] = $this->errors;
  	return $this;
  }

  public function failed() {
  	return !empty($this->errors);
  }
	
}