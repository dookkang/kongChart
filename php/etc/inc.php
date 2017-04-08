<?php

	session_start();
	if(!isset($_SESSION['cltId']) ){
		header('location: /php/member/login.html');  
	}
	
?>