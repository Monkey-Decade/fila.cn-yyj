<?php
require('./model/_connect.php');
//获取前端的参数
$id = $_REQUEST['id'];//商品id
$name = $_REQUEST['name'];//商品name
$img = $_REQUEST['img'];//商品img
$price = $_REQUEST['price'];//商品price
$num = $_REQUEST['num'];//商品数量
$mktprice = $_REQUEST['mktprice'];//商品原价
$color = $_REQUEST['color'];//商品颜色
$size = $_REQUEST['size'];//尺寸
//根据前端参数插入数据
$sql = "SELECT * FROM `cart` WHERE `product_id`='$id'";
$res = mysqli_query($conn,$sql);
$rows = mysqli_num_rows($res);//mysqli_num_rows方法是统计查询结果有几行
if($rows>0){
	$row = mysqli_fetch_assoc($res);//获取当前行数据,转成php数组
	$num = $row['product_num']+$num;
	$sql = "UPDATE `cart` SET `product_num`='$num' WHERE `product_id`='$id'";
}else{
	$sql = "INSERT INTO `cart` (`product_id`,`product_img`,`product_name`,`product_num`,`product_price`,`product_mktprice`,`product_color`,`product_size`) VALUES ('$id','$img','$name','$num','$price','$mktprice','$color','$size')";
}

$result = mysqli_query($conn,$sql);
if($result){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}

?>