<?php
  if(!empty($_SESSION["myMessage"])) {
  	$s = $_SESSION["myMessage"];

  	if($s[0] == "1") {         // Green 
      $s1 = '<div class="alert alert-success alert-dismissable">';
      $s1 .= '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
      $s1 .= substr($s, 2) . "</div>";
    } else if($s[0] == "2") {  // Blue
      $s1 = '<div class="alert alert-info alert-dismissable">';
      $s1 .= '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
      $s1 .= substr($s, 2) . "</div>";
    } else if($s[0] == "3") {  // Yellowish
      $s1 = '<div class="alert alert-warning alert-dismissable">';
      $s1 .= '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
      $s1 .= substr($s, 2) . "</div>";
    } else {                   // Redish 
      $s1 = '<div class="alert alert-danger alert-dismissable">'; 
      $s1 .= '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
      $s1 .= $s . "</div>";
    }
    echo $s1;
    $_SESSION["myMessage"] = null;
  }
?>