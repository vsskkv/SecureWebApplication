<?php

namespace App\Validation\Rules;

use Respect\Validation\Rules\AbstractRule;

class strIdentical extends AbstractRule
{
  public function __construct($pdata) {
    $this->p1 = $pdata["newpassword"];
    $this->p2 = $pdata["confirmpassword"];
  }  

  public function validate($input) {
    if($this->p1 === $this->p2) { return true; }
    else { return false; }
  }
}