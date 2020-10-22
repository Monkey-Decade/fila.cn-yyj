<?php
require('./model/_connect.php');
//获取前端的参数
$id = $_REQUEST['id'];//用户手机号
$pwd = $_REQUEST['pwd'];//用户密码

//根据前端参数插入数据
// $sql = "SELECT * FROM `user` WHERE `product_id`='$id'";
// $res = mysqli_query($conn,$sql);
// $rows = mysqli_num_rows($res);//mysqli_num_rows方法是统计查询结果有几行
// if($rows>0){
// 	$row = mysqli_fetch_assoc($res);//获取当前行数据,转成php数组
// 	// $num = $row['product_num']+$num;
// 	$sql = "UPDATE `user` SET `product_num`='$num' WHERE `product_id`='$id'";
// }else{
	$sql = "INSERT INTO `user` (`product_id`,`product_pwd`) VALUES ('$id','$pwd')";
// }

$result = mysqli_query($conn,$sql);
// print_r($result);
if($result){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}

?>