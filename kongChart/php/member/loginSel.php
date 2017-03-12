<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/dbConnect.php"; ?>
<?php
	$cltId = $_REQUEST["cltId"];
	$cltPw = $_REQUEST["cltPw"];
?>
<!doctype html>
<HTML>
<HEAD>
	<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/meta.php"; ?>
</HEAD>
<body>
로그인아이디:<br>
<?php
	$query = "SELECT * FROM membership WHERE id='".$cltId. "' and pass='".$cltPw."'";
	$result = mysql_query($query, $conn);
	$count = mysql_num_rows($result);
	mysql_close($conn);
	if($count == 1) {
		session_start();
		$_SESSION['cltId'] = $cltId;
		header('Location: http://chart2.nanuminet.co.kr/?cltId='.$_SESSION['cltId']);   
		exit;
	}else{
		header('Location: /php/member/login.html');   
	}
?>		
</body>
</html>