<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/dbConnect.php"; ?>
<?php
	$cltId=$_REQUEST['cltId'];
	$pass=$_REQUEST['pass'];
	$name=$_REQUEST['name'];
	$addr=$_REQUEST['addr'];
	$birth=$_REQUEST['birth'];
	$nick=$_REQUEST['nick'];
?>
<doctype html>
<html>
<head>
<title>Member</title>
<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/meta.php"; ?>	
</head>
<body>
<?php
	$sql = "insert into membership ( name, id, pass, nick, addr, birth, ctrl)";
	$sql = $sql. "values('$name','$cltId','$pass','$nick','$addr','$birth','0')";
	if(mysql_query($sql)){
?>
		<h4>회원가입에 성공하였습니다</h4>
		<a href="/php/member/login.html"> 로그인 </a>
<?php 
	}else{
?>
		<h4>회원가입에 실패하였습니다</h4>
		<a href="/php/member/join.html"> 회원가입 </a>
<?php
	}
	mysql_close($conn);
?>
</body>
</html>