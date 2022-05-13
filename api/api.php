<?php
header("Content-type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

  case 'GET':
    getData();
    break;

  case 'POST':
     $data = json_decode(file_get_contents('php://input'),true);
     postData($data);
    break;

  case 'PUT':
    $data = json_decode(file_get_contents('php://input'),true);
    putData($data);
    break;

  case 'DELETE':
    $data = json_decode(file_get_contents('php://input'),true);
    deleteData($data);
    break;

  default:
    echo '{"output" : "request not match"}';
    break;
}


function getData(){
  require_once "db.php";

  $sql = $conn->query("SELECT * FROM products");
  $flag = false;
  while($result = $sql->fetch(PDO::FETCH_ASSOC))  {
    $rows["result"][] = $result;
    $flag = true;
  }

  if($flag){
    echo json_encode($rows);
  } else {
      echo '{"result":"No data found"}';
  }
  return;
}

function postData($data){
    require_once "db.php";

    $name = $data["name"];
    $description= $data["desc"];
    $price = $data["price"];
    if($name=='' || $price==''){
        echo '{"result" : "input error" }';
        return;
    }
    $sql = $conn->prepare("insert into products(name,description,price) values ('$name','$description','$price')");
    $sql->execute();
    if ($sql) {
      echo '{"result" : "success"}';
    } else {
      echo '{"result" : "sql error" }';
    }
}

function putData($data){
  require_once "db.php";
  $id = $data["id"];
  $name = $data["name"];
  $description= $data["desc"];
  $price = $data["price"];

  if($name=='' || $id=='' || $price==''){
    echo '{"result" : "input error" }';
    return;
  }

  $sql = $conn->prepare("UPDATE products SET name='$name',description='$description',price ='$price' WHERE id='$id'");
  $sql->execute();

  if ($sql) {
    echo '{"result" : "success"}';
  } else {
    echo '{"result" : "sql error" }';
  }

}

function deleteData($data){
  require_once "db.php";
  $id = $data["id"];
  if($id==''){
    echo '{"result" : "input error" }';
    return;
  }
  $sql = $conn->prepare("DELETE FROM products WHERE id='$id' ");
  $sql->execute();

  

  if ($sql) {
    echo '{"result" : "success"}';
  } else {
    echo '{"result" : "sql error" }';
  }

}