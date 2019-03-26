
<?php
include "Header.php";
include "NavBar.php";
include "Message.php";
?>

<div class="container">

<?php include "Message.php"; ?>

  <form id="loginForm" action="<?=$router->pathFor('login')?>" method="POST">
<!--      <input type="hidden" id="pword" name="pword" value=""> --> 
    <h3>WWA4F Log In</h3>
    <?php
      if(!empty($_SESSION['errors']['email'])) { echo '<div class="form-group has-error">'; } 
      else { echo '<div class="form-group">'; }
      echo '<label for="email">Email</label>';
      if(!empty($_SESSION['email'])) {
        echo '<input type="text" name="email" id="email" class="form-control" placeholder="Email" value=' . $_SESSION['email'] . ' autofocus />';
        unset($_SESSION["email"]);
      } else {
        echo '<input type="text" name="email" id="email" class="form-control" placeholder="Email" autofocus />';
      }

      if(!empty($_SESSION['errors']['email'])) { 
        echo '<span class="help-block">' . $_SESSION['errors']['email'][0] . '</span>'; 
      }
    ?>
    </div>

    <?php
      if(!empty($_SESSION['errors']['password'])) { echo '<div class="form-group has-error">'; } 
      else { echo '<div class="form-group">'; }
    ?>
      <label for="password">Password</label>
      <input type="password" name="password" class="form-control" id="password" placeholder="Password">
    <?php
      if(!empty($_SESSION['errors']['password'])) { 
        echo '<span class="help-block">' . $_SESSION['errors']['password'][0] . '</span>'; 
      }
    ?>
    </div>
    <?=$csrf?>
    <button type="submit" class="btn btn-success">Log In</button> 
    <input type="button" class="btn btn-danger" onclick="location.href='<?=$router->pathFor('home')?>';" value="Cancel" />
    <h6><a href="<?=$router->pathFor('resetpassword')?>" >Reset password</a></h6>

  </form> 
</div>

<?php unset($_SESSION['errors']); ?>

</body>
</html>
