<?php

namespace App\Validation\Rules;

use App\Models\UserModel as U;
use Respect\Validation\Rules\AbstractRule;

class EmailAvailable extends AbstractRule
{

  private $db;

  public function __construct($db) {
    if(!empty($db)) {
      $this->db = $db;
    } else {
      throw new Exception("ERROR: Failed to connect to database.");
    }
  }  

  public function validate($input) {
  	$a = new U($this->db);
    $user = $a->getUserWithEmail($input);

    if(empty($user)) { return true; }
    else { return false; }
  }
}