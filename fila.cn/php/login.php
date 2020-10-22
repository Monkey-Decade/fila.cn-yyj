<?php
require('./model/_connect.php');
$id = $_REQUEST['id'];//用户手机号
$pwd = $_REQUEST['pwd'];//用户密码

$sql = "SELECT * FROM user WHERE `product_id`='$id' AND `product_pwd`='$pwd'";

$result = mysqli_query($conn,$sql);
// print_r($result);
$row = mysqli_fetch_assoc($result);
// print_r($row);

if($row){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}
?>