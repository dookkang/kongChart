<?php

	session_start();
	if(!isset($_SESSION['cltId']) ){
		header('Location: /php/member/login.html');  
	}
	
?>