
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a href='<?=$router->pathFor("home")?>' class="navbar-brand"><img src=<?php echo $_SESSION['baseUrl'] . "css/images/wwa4f.png";?> alt="WWA4F Logo"></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">

      <ul class="nav navbar-nav">
        <li><a href="<?=$router->pathFor('option1')?>" >Option 1</a></li>
      </ul>

      <ul class="nav navbar-nav navbar-right">
<?php if(!empty($_SESSION["uid"])) : ?>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Logout<span class="caret"></span>&nbsp;</a>
          <ul class="dropdown-menu">
            <li><a href="<?=$router->pathFor('changepassword')?>">Change Password</a></li>
            <li><a href="<?=$router->pathFor('logout')?>">Logout</a></li>
          </ul>
        </li> 
<?php else : ?>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Login<span class="caret"></span>&nbsp;</a>
          <ul class="dropdown-menu">
            <li><a href="<?=$router->pathFor('register')?>">Register</a></li>
            <li><a href="<?=$router->pathFor('login')?>">Login</a></li>
          </ul>
        </li> 
<?php endif; ?>
      </ul>

    </div><!--/.nav-collapse -->
  </div>
</nav>
