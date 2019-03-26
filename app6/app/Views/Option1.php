
<?php
include "Header.php";
include "NavBar.php";
include "Message.php";
?>

<div class="container-fluid">

<div class="jumbotron">
  <div class="container">

<?php
if (!empty($_SESSION["firstname"])) {
  echo '<h1>Hello ' . $_SESSION["firstname"] . ',</h1>';
}
?>
    <h2>Option1</h2>
    <p>This is Option 1 from the navbar. You do not need to be logged in to view this page.</p>
</div>
</div>
</div>

</body>
</html>
