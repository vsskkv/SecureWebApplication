<!--
<?php
//if($_SERVER['SERVER_PORT'] != '443') { header('Location: https://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); exit(); }
?>
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>WWA4F</title>

  <meta name="description" content="Write a Web App for Free">
  <meta name="author" content="Thomas Davenport">
  <link rel="icon" href="css/images/favicon.ico" type="image/x-icon"/>
  
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  
  <script src=<?=$_SESSION["baseUrl"] . "js/jquery.touchSwipe.min.js"?>></script>  
  <link href=<?=$_SESSION["baseUrl"] . "css/wwa4f.css"?> rel="stylesheet"> 

</head>
<body>
