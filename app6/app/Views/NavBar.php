
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a href=<?php echo $router->pathFor("home");?> class="navbar-brand"><img src=<?php echo $_SESSION['baseUrl'] . "css/images/wwa4f.png";?> alt="WWA4F Logo"></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">

      <ul class="nav navbar-nav navbar-right">
<?php 
if(!empty($_SESSION["uid"])) {
  $s = '<li class="dropdown">';
  $s .= '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Logout<span class="caret"></span>&nbsp;</a>';
  $s .= '<ul class="dropdown-menu">';
  $s .= '<li><a href=' . $router->pathFor("changepassword") . '>Change Password</a></li>';
  $s .= '<li><a href=' . $router->pathFor("logout") . '>Logout</a></li>';
  $s .= '</ul></li>';
} else {
  $s = '<li class="dropdown">';
  $s .= '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Login<span class="caret"></span>&nbsp;</a>';
  $s .= '<ul class="dropdown-menu">';
  $s .= '<li><a href=' . $router->pathFor('register') . '>Register</a></li>';
  $s .= '<li><a href=' . $router->pathFor('login') . '>Login</a></li>';
  $s .= '</ul></li>';
}
echo $s;
?>
      </ul>

    </div><!--/.nav-collapse -->
  </div>
</nav>
