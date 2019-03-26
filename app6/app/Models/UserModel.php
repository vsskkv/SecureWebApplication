<?php

namespace App\Models;

class UserModel {

  private $db;

  public function __construct($db) {
    if(!empty($db)) {
      $this->db = $db;
    } else {
      throw new Exception("ERROR: Failed to connect to database.");
    }
  }  

// ================================================================================
  public function getUsers() {
//    var_dump($this->handler);
//    die();
    $sql = "SELECT * FROM Users ORDER BY U_ID";
    $statement = $this->db->prepare($sql);

    $results = [];
    if($statement->execute()) {
      while($row = $statement->fetch()) {
        $results[] = $row;
      }
    }
    return $results; 
  }
// ================================================================================
  public function getUserWithEmail($inEmail) {
    $sql = "SELECT * FROM Users WHERE U_Email=?";
    $statement = $this->db->prepare($sql);
    $statement->bindParam(1, $inEmail);

    $results = [];
    if($statement->execute()) {
      while($row = $statement->fetch()) {
        $results[] = $row;
      }
    }
    return $results; 
  }
// ================================================================================
  public function saveUser($request, $response) {
//    var_dump($request->getParams());
//    die();
    $dt = date("Y-m-d H:i:s", time());
    $data = array($request->getParam("firstname"), $request->getParam("surname"), $request->getParam("email"), password_hash($request->getParam("password"), PASSWORD_DEFAULT));
    $sql = "INSERT INTO Users (U_Firstname, U_Surname, U_Email, U_Password) VALUES (?,?,?,?)";
    $statement = $this->db->prepare($sql);
    $result = $statement->execute($data);
    if(!$result) {
      throw new Exception("ERROR: Could not save record");
    } else {
      return true;
    }
  }
// ================================================================================
  public function updatePassword($request, $response) {
    $r = "ERROR: Failed to update password";
    $data = $request->getParsedBody();
    $existingpassword = filter_var($data['existingpassword'], FILTER_SANITIZE_STRING);
    $newpassword = filter_var($data['newpassword'], FILTER_SANITIZE_STRING);
    echo $existingpassword . ", " . $newpassword;
//    var_dump($request);
//    die();
    $sql = "SELECT * FROM Users WHERE U_ID=?";
    $statement = $this->db->prepare($sql);
    $statement->bindParam(1, $_SESSION["uid"]);

    $results = [];
    if($statement->execute()) {
      $results = $statement->fetch();
      if(password_verify($existingpassword, $results["U_Password"])) {
        $dt = date("Y-m-d H:i:s", time());
        $data = array(password_hash($newpassword, PASSWORD_DEFAULT), $dt, $_SESSION["uid"]);
        $sql = "UPDATE Users SET U_Password=?, U_Updated=? WHERE U_ID=?";
        $statement = $this->db->prepare($sql);
        if($statement->execute($data)) { $r = "Update OK"; }
        else { $r = "ERROR: Update failed"; }
      } 
      else { $r = "ERROR: Wrong password"; }
    } else {
      $r = "ERROR: Failed to execute SQL"; 
    }
    return $r; 
  }
// ================================================================================
  public function resetPassword($request, $response) {
    $s = "Reset password";
var_dump($s);
  }
// ================================================================================
  public function authenticateUser($request, $response) {
    $r = false;
    $data = $request->getParsedBody();
    $email = filter_var($data['email'], FILTER_SANITIZE_STRING);
    if(!strpos($email, '@aston.ac.uk')) { $email .= '@aston.ac.uk'; }       
    $password = filter_var($data['password'], FILTER_SANITIZE_STRING);
    $sql = "SELECT * FROM Users WHERE U_Email=?";
    $statement = $this->db->prepare($sql);
    $statement->bindParam(1, $email);

    $results = [];
    $statement->execute();
    $results = $statement->fetch();
    if($results) {
      if(empty($results["U_Password"]) && !empty($password)) {
        $sql1 = 'UPDATE Users SET U_Password=? WHERE U_Email=?';
        $statement1 = $this->db->prepare($sql1);
        $statement1->bindParam(1, password_hash($password, PASSWORD_DEFAULT));
        $statement1->bindParam(2, $email);
        if($statement1->execute()) {
          $_SESSION["uid"] = $results["U_ID"];
          $_SESSION["firstname"] = $results["U_Firstname"];
          $r = true;
        }
      } else if(password_verify($password, $results["U_Password"])) {
        $_SESSION["uid"] = $results["U_ID"];
        $_SESSION["firstname"] = $results["U_Firstname"];
        $r = true;
      }
    }
    return $r; 
  }
// ================================================================================
  public function saveURI($request, $response) {
    $data = $request->getParsedBody();
    $arr = array($_SESSION['uid'],
                 filter_var($data['category'], FILTER_SANITIZE_STRING),
                 filter_var($data['description'], FILTER_SANITIZE_STRING),
                 filter_var($data['uri'], FILTER_SANITIZE_STRING));

    $sql = 'INSERT INTO URIs (URI_UID, URI_Category, URI_Description, URI_Identifier) ';
    $sql .= 'VALUES (?,?,?,?)';
    $statement = $this->db->prepare($sql);
    $result = $statement->execute($arr);
    if(!$result) {
      return false;
    } else {
      $r = array();
      $sql = 'SELECT URI_Category, URI_Description, URI_Identifier, URI_Created FROM URIs ';
      $sql .= 'WHERE URI_UID=?';
      $statement = $this->db->prepare($sql);
      $statement->bindParam(1, $_SESSION['uid']);
      $result = $statement->execute();
      while($row = $statement->fetch()) {
        $s = '{"Category":"' . $row['URI_Category'];
        $s .= '","Description":"' . $row['URI_Description'];
        $s .= '","URI":"' . $row['URI_Identifier'];
        $s .= '","Date":"' . $row['URI_Created'] . '"}';
      array_push($r, $s);      }
      return $r;
    }
  }
// ================================================================================
  public function getURIs($uid) {
    $r = array();
    $sql = 'SELECT URI_Category, URI_Description, URI_Identifier, URI_Created FROM URIs ';
    $sql .= 'WHERE URI_UID=?';
    $statement = $this->db->prepare($sql);
    $statement->bindParam(1, $_SESSION['uid']);
    $result = $statement->execute();
    while($row = $statement->fetch()) {
      $s = '{"Category":"' . $row['URI_Category'];
      $s .= '","Description":"' . $row['URI_Description'];
      $s .= '","URI":"' . $row['URI_Identifier'];
      $s .= '","Date":"' . $row['URI_Created'] . '"}';
      array_push($r, $s);
    }
    return $r;
  }
// ================================================================================
}
// ================================================================================
