
	function goIn(){
		//location.href='./Project/Weather/index.html';
		document.fm.action = '/php/member/loginSel.php';
		document.fm.target = '_self';
		document.fm.method = 'post';
		document.fm.submit();
	};
	
	function keyCheck(){
		if (event.keyCode == 13){//엔터키
			goIn();		
		}
	};
	function changeInfo(){
		//location.href='./Project/Weather/index.html';
		document.fm.action = '/php/member/memberUpdateUpt.php';
		document.fm.target = '_self';
		document.fm.method = 'post';
		document.fm.submit();
	};
	
	function InfokeyCheck(){
		if (event.keyCode == 13){//엔터키
			changeInfo();		
		}
	};
	function goPopup() { 
		//아이디필수체크
		if(fm.cltId.value == ''){
			alert("아이디를 입력하십시요");
			fm.cltId.focus();
			return;
		}
		
		var openWinId = 'dupWinChk';	
		 		
		window.open('',openWinId,'scrollbars=yes,toolbar=yes,resizable=yes,width=400,height=200,left=0,top=0');
			fm.action = "/php/member/memberJoinSel.php"; 
			fm.method = 'post';
			fm.target = openWinId; 
			fm.submit();
	}; 
		
	
	function reg(){
		try{
			//아이디필수체크
			if(fm.cltId.value == ''){
				alert("아이디를 입력하십시요");
				fm.cltId.focus();
				return;
			}
			if (fm.dupId.value != fm.cltId.value || fm.dup.value != "1"){
				fm.dup.value = "0";
				alert("아이디중복체크를 하십시요");
				return;
			}			
			if(fm.dup.value == "1"){ 				
				fm.action = "/php/member/memberJoinIns.php"; 
				fm.method = 'post';
				fm.target = '_self';  
				fm.submit(); 
			}else{
				alert("정보를 입력하십시오")		
			}		
		}catch(e){
			alert(e);
		}
	};
	
	function fnLogout(){
		if(confirm('로그아웃 하시겠습니까?')){
			top.location.href = "/php/member/logout.html";					
		}
	};
	function fnmypage(){
		if(confirm('이동하시겠습니까?')){
			top.location.href = "/php/member/memberUpdate.html";					
		}
	};
	function fndel(){
		if(confirm('탈퇴하시겠습니까?')){
			top.location.href = "/php/member/memberDel.html";					
		}
	};
	function delIn(){
		top.location.href = "/php/member/logout.html";	
	};
	
	function delPopup() { 
		var openWinId = 'dupWinChk';	
		 		
		window.open('',openWinId,'scrollbars=yes,toolbar=yes,resizable=yes,width=400,height=200,left=0,top=0');
			fm.action = "/php/member/memberJoinSel.php"; 
			fm.method = 'post';
			fm.target = openWinId; 
			fm.submit();
	}; 
	function autoClikeHomeLeft(){
			parent.c3.location.href = "/php/board/test1.html";
	};
		function autoClikeLeft(){
			parent.c3.location.href = "/kongChart/kongChart17.html";
	};
	function goBo(){
		//location.href='./Project/Weather/index.html';
		document.fm.action = '/php/board/insert.html';
		document.fm.target = '_self';
		document.fm.method = 'post';
		document.fm.submit();
	};
	function goEdit(){
	
		//location.href='./Project/Weather/index.html';
		document.fm.action = '/php/board/update.html';
		document.fm.target = '_self';
		document.fm.method = 'post';
		document.fm.submit();
	};
	function goDel(){
		
		//location.href='./Project/Weather/index.html';
		document.fm.action = '/php/board/del.html';
		document.fm.target = '_self';
		document.fm.method = 'post';
		document.fm.submit();
	};
	function fnBo(){
		if(confirm('이동하시겠습니까?')){
			top.location.href = "/php/board/list.html";					
		}
	};
	function goW(){
		//location.href='./Project/Weather/index.html';
		document.fm.action = '/php/board/write.html';
		document.fm.target = '_self';
		document.fm.method = 'post';
		document.fm.submit();
	};
	function wri(){
		try{
			//아이디필수체크
			if(fm.title.value == ''){
				alert("제목을 입력하십시요");
				alert(fm.title);
				fm.title.focus();
				return;
			}
			if(fm.content.value == ''){
				alert("내용을 입력하십시요");
				fm.content.focus();
				return;	
			}
			document.fm.action = "/php/board/insert.html";
			document.fm.target = '_self';
			document.fm.method = 'post';
			document.fm.submit();			
		}catch(e){
			alert(e);
		}
	};
	function edi(){
		try{
			//아이디필수체크
			if(fm.title.value == ''){
				alert("제목을 입력하십시요");
				alert(fm.title);
				fm.title.focus();
				return;
			}
			if(fm.content.value == ''){
				alert("내용을 입력하십시요");
				fm.content.focus();
				return;	
			}
			document.fm.action = "/php/board/update.html";
			document.fm.target = '_self';
			document.fm.method = 'post';
			document.fm.submit();			
		}catch(e){
			alert(e);
		}
	};