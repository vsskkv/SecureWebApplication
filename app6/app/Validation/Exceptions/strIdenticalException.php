<?php

namespace App\Validation\Exceptions;

use Respect\Validation\Exceptions\ValidationException;

class strIdenticalException extends ValidationException
{
  public static $defaultTemplates = [
    self::MODE_DEFAULT => [
      self::STANDARD => 'New password and confirm password are different.',
    ],
    self::MODE_NEGATIVE => [
      self::STANDARD => 'New password and confirm password are different.',
      ],
  ];  
}