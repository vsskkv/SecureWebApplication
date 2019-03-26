<?php

namespace App\Validation\Exceptions;

use Respect\Validation\Exceptions\ValidationException;

class IsItAstonException extends ValidationException
{
  public static $defaultTemplates = [
    self::MODE_DEFAULT => [
      self::STANDARD => 'Sorry, you need an Aston University email address.',
    ],
    self::MODE_NEGATIVE => [
      self::STANDARD => 'Sorry, you need an Aston University email address.',
      ],
  ];  
}