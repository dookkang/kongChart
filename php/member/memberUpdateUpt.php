<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/inc.php"; ?>
<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/dbConnect.php"; ?>
<?php
	$upna = $_REQUEST["upname"];
	$uppa = $_REQUEST["uppass"];
	$upni = $_REQUEST["upnick"];
	$upad = $_REQUEST["upaddr"];
	$upbi = $_REQUEST["upbirth"];
?>
<doctype html>
<html>
<head>
<title>UPdate</title>
<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/meta.php"; ?>
</head>
<body>
<?php
	$cltId = $_SESSION['cltId'];
	$upnamequery = "update membership set name='$upna',pass='$uppa',nick='$upni',addr='$upad',birth='$upbi' WHERE id='".$cltId."'";
	if(mysql_query($upnamequery)){
?>
		<h4>정보변경을 성공하였습니다</h4>
		<a href="http://chart2.nanuminet.co.kr/"> 홈페이지 </a>
<?php 
	}else{
?>
		<h4>정보변경을 실패하였습니다</h4>
		<a href="http://chart2.nanuminet.co.kr/"> 홈페이지 </a>
<?php
	}
	mysql_close($conn);
?>
</body>
</html>
