<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/dbConnect.php"; ?>
<?php
	$cltId = $_REQUEST["cltId"];
?>
<doctype html>
<html>
<head>
<?php require $_SERVER["DOCUMENT_ROOT"]."/php/etc/meta.php"; ?>
</head>
<body>
 <h1 align="center">중복확인</h1>
<?php
	$query = "SELECT * FROM membership WHERE id='$cltId'";
	$result = mysql_query($query, $conn);
	$count = mysql_num_rows($result);
	mysql_close($conn); 
	if($count == 1){
?>
		<h4>사용 불가능</h4>
		<script>
		opener.fm.dup.value = "0";
		</script>
<?php 
	}else{
?>
		<h4>사용 가능</h4>
		<script>
		opener.fm.dup.value = "1";
		opener.fm.dupId.value = "<?php print $cltId ?>";
		</script>
<?php
	}
?>
 

 
 
 
 
 
 
 
 
 
</body>
</html>