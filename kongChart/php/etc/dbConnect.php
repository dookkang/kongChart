<?php
	$mysql_host = 'localhost'; 
	$mysql_user = 'chart2';      
	$mysql_password = 'chart123!';
	$mysql_db = 'chart2';
	$conn = mysql_connect($mysql_host, $mysql_user, $mysql_password) or die('접속실패.');
	$db_status = mysql_select_db($mysql_db, $conn);
	mysql_query("set names utf8"); // charset UTF8 : 한글안깨지게함 [중요]
	mysql_query("set session character_set_connection=utf8;");
	mysql_query("set session character_set_results=utf8;");
	mysql_query("set session character_set_client=utf8;");
?>