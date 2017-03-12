

function excel_save(areaObj,fileName){
	window.open('data:application/vnd.ms-excel,filename="'+fileName+'",' + encodeURIComponent(areaObj.html()), '_blank');
	e.preventDefault(); 
}

function page_print(){
	window.print();
}


function act(_actionKey,_actionType,_parameters){
	/*
	 * _actionType::
	  		dbQuery  디비쿼리해서 화면에 뿌리기
			    _parameters::
			  		dbServer = 192.10.20.12
			  	    dbName = kdncmd1
			        dbPort = 9090
			        dbUser = niceman
			        dbPassword = 1234
			        queryTable = TB_COMMON
			        queryColumn = C_NAME,C_ADDDRESS,C_ETC
			        resultView = table18
		    redisPublish  레디스로 쏘기
			    _parameters::
			    	redisServer = 192.10.20.12
			    	redisPort =191919
			  		redisChannel = REQ_DTS
			  	    sensorName = channel1	    
	  		popup  팝업창 띄우기
			    _parameters::
			    	popupName = DTS_CHART_OPTION_POPUP
	  		chartControl  차트 컨트롤하기
			    _parameters::
			    	chartName = DTS_CHART
			    	series1_querydb = cmd1DB
			    	series1_name = 발컨수치
			    	series1_color = red
			    	

	 *      
	 * 		redisPublish : 레디스로 쏘기
	 * 		popup : 팝업창 띄우기
	 * 		chartControl : 차트 컨트롤하기 
	 */
	//console.log(JSON.stringify({'ab':'cd'}));
/*	console.log('_actionKey:'+_actionKey+' _actionType:'+_actionType+' _parameters:'+JSON.stringify(_parameters));
	console.log('->'+_parameters.divId);*/
	if(_actionType == 'popup'){
		
		if(_actionKey == 'close'){
			$('#'+_parameters.divId).bPopup().close();
		}else if(_actionKey == 'open'){
			//$('#'+_parameters.divId).bPopup();
			//여기 팝업 띄워주세요
				
		}else if(_actionKey == 'save'){
			var pattern = '#'+_parameters.divId+' input[type=\'checkbox\'] ';
			console.log(pattern);
			var checkbox_arr = $(pattern);
			for(var i=0; i < checkbox_arr.length; i++){
				var checkboxObj = checkbox_arr[i];
				console.log(checkboxObj.name +':'+checkboxObj.checked);
				var yBaseLinesArr = eval('yBaseLines_'+_parameters.chartId);
				for(var j=0; j < yBaseLinesArr.length; j++){
					var seriesObj = yBaseLinesArr[j];
					if(seriesObj.alramLabel == checkboxObj.name){
						seriesObj.s_draw = checkboxObj.checked;
					}
				}
				var xTermsArr = eval('xTerms_'+_parameters.chartId);
				for(var j=0; j < xTermsArr.length; j++){
					var seriesObj = xTermsArr[j];
					if(seriesObj.termLabel == checkboxObj.name){
						seriesObj.s_draw = checkboxObj.checked;
					}
				}
			}
			redraw(_parameters.chartId);	
			$('#'+_parameters.divId).bPopup().close();
		}		
	}else if(_actionType == 'func'){
		
		
	}else if(_actionType == 'chart'){
		if(_actionKey == 'seriesCtrl'){
			var seriesArr = series_array[_parameters.chartId];
			for(var i=0; i < seriesArr.length; i++){
				var seriesObj = seriesArr[i];
				if(seriesObj.s_name == _parameters.name){
					seriesObj.s_draw = _parameters.isChecked;
					redraw(_parameters.chartId);
					break;
				}
			}
		}else if(_actionKey == 'addInfoCtrl'){
/*			var seriesArr = eval('yBaseLines_'+_parameters.chartId);
			var flag = false;
			for(var i=0; i < seriesArr.length; i++){
				var seriesObj = seriesArr[i];
				if(seriesObj.s_name == _parameters.name){
					seriesObj.s_draw = _parameters.isChecked;
					alert(_parameters.isChecked);
					flag = true;

				}
			}
			
				
			var seriesArr2 = eval('xTerms_'+_parameters.chartId);
			for(var i=0; i < seriesArr2.length; i++){
				var seriesObj = seriesArr2[i];
				if(seriesObj.s_name == _parameters.name){
					seriesObj.s_draw = _parameters.isChecked;
					flag = true;
				}
			}	
			
			if(true){
					starts();
			}
			
			*/
			
			
			
			
			
			
			var pattern = '#'+_parameters.divId+' input[type=\'checkbox\'] ';
			//console.log('pattern:'+pattern);
			var checkbox_arr = $(pattern);
			//console.log('checkbox_arr.length:'+checkbox_arr.length);
			for(var i=0; i < checkbox_arr.length; i++){
				
				var checkboxObj = checkbox_arr[i];
				var yBaseLinesArr = yBaseLines[_parameters.chartId];
				for(var j=0; j < yBaseLinesArr.length; j++){
					var seriesObj = yBaseLinesArr[j];
					//console.log(seriesObj.alramLabel +'-'+ checkboxObj.name);
					if(seriesObj.alramLabel == checkboxObj.name){
						//console.log(':'+seriesObj.alramLabel +'-'+ checkboxObj.name+'/'+checkboxObj.checked);
						seriesObj.s_draw = checkboxObj.checked;
					}
				}
				var xTermsArr = xTerms[_parameters.chartId];
				for(var j=0; j < xTermsArr.length; j++){
					var seriesObj = xTermsArr[j];
					if(seriesObj.termLabel == checkboxObj.name){
						//console.log('checkboxObj.checked:'+checkboxObj.checked);
						seriesObj.s_draw = checkboxObj.checked;
					}
				}
			}
			redraw(_parameters.chartId);
			
		
		}	
	}
}

