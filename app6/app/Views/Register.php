
<?php
include "Header.php";
include "NavBar.php";
include "Message.php";
?>

<div class="container">

  <form id="loginForm" action="<?=$router->pathFor('register')?>" method="POST">
<!--      <input type="hidden" id="pword" name="pword" value=""> --> 
    <h3>Register for WWA4F</h3>
    <?php 
      if(!empty($_SESSION['errors']['firstname'])) { echo '<div class="form-group has-error">'; } 
      else { echo '<div class="form-group">'; }

      echo '<label for="firstname">First Name</label>';
      if(!empty($_SESSION['firstname'])) {
        echo '<input type="text" name="firstname" id="firstname" class="form-control" placeholder="First Name" value=' . $_SESSION["firstname"] . ' autofocus />';
        unset($_SESSION["firstname"]);
      } else {
        echo '<input type="text" name="firstname" id="firstname" class="form-control" placeholder="First Name" autofocus />'; 
      }

      if(!empty($_SESSION['errors']['firstname'])) { 
        echo '<span class="help-block">' . $_SESSION['errors']['firstname'][0] . '</span>'; 
      }
    ?>
    </div>

    <?php 
      if(!empty($_SESSION['errors']['surname'])) { echo '<div class="form-group has-error">'; } 
      else { echo '<div class="form-group">'; }

      echo '<label for="surname">Surname</label>';
      if(!empty($_SESSION['surname'])) {
        echo '<input type="text" name="surname" id="surname" class="form-control" placeholder="Surame" value=' . $_SESSION["surname"] . ' />';
        unset($_SESSION["surname"]);
      } else {
        echo '<input type="text" name="surname" id="surname" class="form-control" placeholder="Surame" />';
      }

      if(!empty($_SESSION['errors']['surname'])) { 
        echo '<span class="help-block">' . $_SESSION['errors']['surname'][0] . '</span>'; 
      }
    ?>
    </div>

    <?php
      if(!empty($_SESSION['errors']['email'])) { echo '<div class="form-group has-error">'; } 
      else { echo '<div class="form-group">'; }
      echo '<label for="email">Email</label>';
      if(!empty($_SESSION['email'])) {
        echo '<input type="text" name="email" id="email" class="form-control" placeholder="Email" value=' . $_SESSION['email'] . ' />';
        unset($_SESSION["email"]);
      } else {
        echo '<input type="text" name="email" id="email" class="form-control" placeholder="Email" />';
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
    <button type="submit" class="btn btn-success">Register</button> 
    <input type="button" class="btn btn-danger" onclick="location.href='<?=$router->pathFor('home')?>';" value="Cancel" />

  </form> 
</div>

<?php unset($_SESSION['errors']); ?>

</body>
</html>
