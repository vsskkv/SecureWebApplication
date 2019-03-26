
<?php
include "Header.php";
include "NavBar.php";
include "Message.php";
?>

<div class="container-fluid">

<div class="jumbotron">
  <div class="container">

<?if (!empty($user)):?>
  <h1>Hello <?=$user?>,</h1>
<?endif;?>

    <h2>App5</h2>
    <p>This is a template for a Slim 3 framework web application.</p>
</div>
</div>
</div>

</body>
</html>
