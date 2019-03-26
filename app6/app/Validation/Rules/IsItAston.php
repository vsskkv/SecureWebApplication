<?php

namespace App\Validation\Rules;

use App\Models\UserModel as U;
use Respect\Validation\Rules\AbstractRule;

class IsItAston extends AbstractRule
{
  public function validate($input) {
    if(stripos($input, "aston.ac.uk") > -1) { return true; }
    else { return false; }
  }
}