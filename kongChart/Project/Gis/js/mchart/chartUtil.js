  	var chartUtil = {};

  	chartUtil.getDate = function(_dt) {
		var reDate = {};
  	    var today;
  	    if(_dt == null){
  	    	today = new Date();
  	    }else{
  	    	today = _dt; 	
  	    }
  	    /*
  	    var tz = today.getTime() + (today.getTimezoneOffset() * 60000) + (0 * 3600000);
  	    today.setTime(tz);
  	  	*/
  	    var year = today.getFullYear();
  	    var month = (today.getMonth() + 1);
  	    var day = today.getDate();
  	    var hour = today.getHours();
  	    var min = today.getMinutes();
  	    var second = today.getSeconds();
  	    var millisecond = today.getMilliseconds();

  	    if (parseInt(month) < 10)
  	        month = "0" + month;
  	    if (parseInt(day) < 10)
  	        day = "0" + day;
  	    if (parseInt(hour) < 10)
  	        hour = "0" + hour;
  	    if (parseInt(min) < 10)
  	        min = "0" + min;
  	    if (parseInt(second) < 10)
  	        second = "0" + second;
  	    if (parseInt(millisecond) < 10) {
  	        millisecond = "00" + millisecond;
  	    } else {
  	        if (parseInt(millisecond) < 100)
  	            millisecond = "0" + millisecond;
  	    }
  	  	reDate['year'] 		=  String(year);
  	  	reDate['month'] 	=  String(month);
  		reDate['day'] 		=  String(day);

  	  	reDate['hour'] 		=  String(hour);
  	  	reDate['min'] 		=  String(min);
  		reDate['second'] 	=  String(second);	

  	    return reDate;
  	};  	  	  	
  	
 	chartUtil.strToDate = function(hDt) {
 		var hDt2 = hDt.replace(/(.{10})\s{1}(.{8})/g,'$1T$2Z');
 		var dDate = new Date(hDt2);
 		var tz = dDate.getTime() + (dDate.getTimezoneOffset() * 60000) + (0 * 3600000);
 		dDate.setTime(tz);
 		return dDate;
 	}
	    
  	chartUtil.formatData = function(s1_data,_min) {
  		if(_min == null){
  			_min = 10;//10분
  		}  		
/*  		var diff;
  		if(_min != null){
  			diff = 60000*_min;
  		}else{
  			diff = 600000;//10분의 ms
  		}*/
  		var markTimeGep = 6;//6시간
  		var gepMs = 60000*_min*6*markTimeGep;//10분*1시간,*6시간

  		var time = _min;
		var lastObject = s1_data[s1_data.length-1];
		var dDate = chartUtil.strToDate(lastObject[0]);
		var d = chartUtil.getDate(dDate);
		var reArr = [];
		var maxXindex = 0;
		var maxYValue = -99999;
		var minYValue = 99999;
		for(var i=(s1_data.length-1);i>-1;i--){
			var dDate2 = chartUtil.strToDate(s1_data[i][0]);
			var diff = Math.abs(dDate - dDate2);//10분이면 60만 600000 , 60초*1000= 60000ms , 10분이면 60만ms
			var v = diff/gepMs;//마이너스 몇시간인지를 구함
			if(maxXindex < v ){
				maxXindex = Math.ceil(v);
			}
			var v1 = (-v*markTimeGep).toFixed(2);
			var v2 = s1_data[i][1];
			reArr[i] = [v1,v2,s1_data[i][0]];//x좌표(인덱스)1,y값,x죄표(타임)2
			
			var _val = s1_data[i][1];
			if(maxYValue < _val ){
				maxYValue = _val;
			}
			if(minYValue > _val ){ 
				minYValue = _val;
			}		
		}
		var _tmp_v1 = parseInt(maxXindex);
		var _tmp_v2 = _tmp_v1+1;
	
		var _tmp_y_max = Math.ceil(maxYValue);
		var _tmp_y_min = Math.floor(minYValue);
		
		var dataInfo = {};
		dataInfo['maxYValue'] = maxYValue;
		dataInfo['minYValue'] = minYValue;
		dataInfo['_tmp_v2'] = _tmp_v1;
		dataInfo['_tmp_y_max'] = _tmp_y_max;
		dataInfo['_tmp_y_min'] = _tmp_y_min;
		dataInfo['d'] = d;
		dataInfo['reArr'] = reArr;
		
		return dataInfo;
		
  	}
  	
  	
  	chartUtil.formatData_profile = function(s1_data) {
		var reArr = [];
		var maxXindex = 0;
		var maxYValue = -99999;
		var minYValue = 99999;
		for(var i=(s1_data.length-1);i>-1;i--){
			var v1 = s1_data[i][0];
			var v2 = s1_data[i][1];
			reArr[i] = [v1,v2,v2];
			
			var _val = s1_data[i][1];
			if(maxYValue < _val ){
				maxYValue = _val;
			}
			if(minYValue > _val ){
				minYValue = _val;
			}			
			
		}
	
		var _tmp_y_max = Math.ceil(maxYValue);
		var _tmp_y_min = Math.floor(minYValue);
		
		var dataInfo = {};
		dataInfo['maxYValue'] = maxYValue;
		dataInfo['minYValue'] = minYValue;
		dataInfo['_tmp_y_max'] = _tmp_y_max;
		dataInfo['_tmp_y_min'] = _tmp_y_min;
		dataInfo['reArr'] = reArr;
		
		return dataInfo;
		
  	}
  	
  	chartUtil.formatDataTotalTime = function(s1_data,_minute,_seriesArray) {
  		if(_minute == null){
  			_minute = 10;
  		}
		var lastObject = s1_data[s1_data.length-1];
		var dDate = chartUtil.strToDate(lastObject[0]);
		var d = chartUtil.getDate(dDate);
		var reArr = [];
		var maxXindex = 0;
		var maxYValue = -99999;
		var minYValue = 99999;
		//var seriesMap = {"40":[],"30":[],"20":[],"10":[],"0":[],"-10":[],"-20":[],"-30":[],"-40":[],"-50":[],};
		var seriesMap = {};
		for(var i=0;i < _seriesArray.length; i++){
			seriesMap[_seriesArray[i]] = [];
		}
		var timeGep = 6;
		timeGep = (_minute/10)*6;
		//for(var i=(s1_data.length-1);i>-1;i--){
		for(var i=0;i < s1_data.length;i++){//formatData에서 역순으로 바꿀것이므로, 여기선 정순으로
			var dDate2 = chartUtil.strToDate(s1_data[i][0]);
			var seriesNm = s1_data[i][2];
			var aSeriesArr = seriesMap[seriesNm+''];
			if(aSeriesArr != null){
				var aArr = [];
				aArr[0] = s1_data[i][0];
				aArr[1] = s1_data[i][1];
				aSeriesArr[aSeriesArr.length] = aArr;
				seriesMap[seriesNm+''] = aSeriesArr; 
				var diff = Math.abs(dDate - dDate2);
				var v = diff/(_minute*60*60*6*100);//10분 -> 21600000
				if(maxXindex < v ){
					maxXindex = Math.ceil(v);
				}
				var v1 = (-v*timeGep).toFixed(2);
				var v2 = s1_data[i][1];
				reArr[i] = [v1,v2,s1_data[i][0]];
				
				var _val = s1_data[i][1];
				if(maxYValue < _val ){
					maxYValue = _val;
				}
				if(minYValue > _val ){
					minYValue = _val;
				}	
				
			}
		
			
		}
		var _tmp_v1 = parseInt(maxXindex);
		var _tmp_v2 = _tmp_v1+1;
	
		var _tmp_y_max = Math.ceil(maxYValue);
		var _tmp_y_min = Math.floor(minYValue);
		
		var dataInfo = {};
		dataInfo['maxYValue'] = maxYValue;
		dataInfo['minYValue'] = minYValue;
		dataInfo['_tmp_v2'] = _tmp_v1;
		dataInfo['_tmp_y_max'] = _tmp_y_max;
		dataInfo['_tmp_y_min'] = _tmp_y_min;
		dataInfo['d'] = d;
		dataInfo['reArr'] = reArr;
		dataInfo['seriesMap'] = seriesMap;		
		
		
		return dataInfo;
		
  	}
  	
  	
  	chartUtil.formatDataMetrix = function(s1_data,_colorValueIndex,_secGep) {
		var lastObject = s1_data[s1_data.length-1];
		var dDate = chartUtil.strToDate(lastObject[0]);
		var d = chartUtil.getDate(dDate);
		var reArr = [];
		var maxXindex = 0;
		var maxYValue = -99999;
		var minYValue = 99999;
		
		var msec = 0;
		var hur = 0;
		if(_secGep == null){
			hur = 6;//6시간
		}else{
			hur = _secGep;		
		}
		msec = hur*60*60*1000;
		for(var i=(s1_data.length-1);i>-1;i--){
			var dDate2 = chartUtil.strToDate(s1_data[i][0]);
			var diff = Math.abs(dDate - dDate2);//데이터의 간격?
			var v = diff/msec;
			if(maxXindex < v ){
				maxXindex = Math.ceil(v);
			}
			var v1 = (-v*hur).toFixed(2);
			var v2 = s1_data[i][_colorValueIndex];
			reArr[i] = [v1,v2,s1_data[i][0],s1_data[i][1],s1_data[i][2],s1_data[i][3]];
			
			var _val = s1_data[i][_colorValueIndex];
			if(maxYValue != null && maxYValue < _val ){
				maxYValue = _val;
			}
			if(_val != null && minYValue > _val ){
				minYValue = _val;
			}						
		}
		var _tmp_v1 = parseInt(maxXindex);
		var _tmp_v2 = _tmp_v1+1;
	
		var _tmp_y_max = Math.ceil(maxYValue);
		var _tmp_y_min = Math.floor(minYValue);
		
		var dataInfo = {};
		dataInfo['maxYValue'] = maxYValue;
		dataInfo['minYValue'] = minYValue;
		dataInfo['_tmp_v2'] = _tmp_v1;
		dataInfo['_tmp_y_max'] = _tmp_y_max;
		dataInfo['_tmp_y_min'] = _tmp_y_min;
		dataInfo['d'] = d;
		dataInfo['reArr'] = reArr;
		
		return dataInfo;
		
  	}  	
	
 	chartUtil.formatDataHodo = function(s1_data) {
		var max = -9999;
		var min = 9999;
		for(var i=(s1_data.length-1);i>-1;i--){
			var u = s1_data[i][4];
			var v = s1_data[i][5];
								
			if(u > max ){
				max = u;
			}
			if(u < min ){
				min = u;
			}	

			if(v > max ){
				max = v;
			}
			if(v < min ){
				min = v;
			}			
		}
		
		var dataInfo = {};
		dataInfo['max'] = max;
		dataInfo['min'] = min;
		dataInfo['reArr'] = s1_data;
		
		return dataInfo;		
  	}  	

 	chartUtil.formatDataWin3d = function(s1_data) {
		var max = -9999;
		var min = 9999;
		for(var i=(s1_data.length-1);i>-1;i--){
			var u = s1_data[i][4];
			var v = s1_data[i][5];
								
			if(u > max ){
				max = u;
			}
			if(u < min ){
				min = u;
			}	

			if(v > max ){
				max = v;
			}
			if(v < min ){
				min = v;
			}			
		}
		
		var dataInfo = {};
		dataInfo['max'] = max;
		dataInfo['min'] = min;
		dataInfo['reArr'] = s1_data;
		
		return dataInfo;		
  	}  	





 	chartUtil.calcDate = function(reDate,_hgep) {
 		var reDate2 = {};  		
 	  	var dt=new Date(reDate['year'],parseInt(reDate['month'])+1,reDate['day'],reDate['hour'],reDate['min'],reDate['second']);
 	  	dt.setHours(dt.getHours() + _hgep);
 	  	//dt.setDate(dt.getDate() +  (_hgep));
 	  	/*
 	  	var Adate = dt.getTime() + 60 * 60 * _hgep *1000;
 	  	dt.setTime(Adate);
 	  	*/
 	    var year 		= dt.getFullYear();
 	    var month 		= dt.getMonth()-1;
 	    var day 		= dt.getDate();
 	    var hour 		= dt.getHours();
 	    var min 		= dt.getMinutes();
 	    var second 		= dt.getSeconds();
 	    var millisecond = dt.getMilliseconds();
 	    //console.log(reDate+'_date:'+year+'/'+month+'/'+day+':'+hour+':'+min+':'+second);    
 		if (parseInt(month) < 10)
 	        month = "0" + month;
 	    if (parseInt(day) < 10)
 	        day = "0" + day;
 	    if (parseInt(hour) < 10)
 	        hour = "0" + hour;
 	    if (parseInt(min) < 10)
 	        min = "0" + min;
 	    if (parseInt(second) < 10)
 	        second = "0" + second;
 	    if (parseInt(millisecond) < 10) {
 	        millisecond = "00" + millisecond;
 	    } else {
 	        if (parseInt(millisecond) < 100)
 	            millisecond = "0" + millisecond;
 	    }    
 	  	reDate2['year'] 	=  String(year);
 	  	reDate2['month'] 	=  String(month);
 		reDate2['day'] 		=  String(day);
 	  	reDate2['hour'] 	=  String(hour);
 	  	reDate2['min'] 		=  String(min);
 		reDate2['second'] 	=  String(second);	

 	    return reDate2; 
 	};  	
 	  
	chartUtil.getFixedNum = function(_val,_fix) {
		var fNum = _val.toFixed(_fix);
		var namugi = fNum%10;
		if(namugi == 0){
			return parseInt(fNum);
		}else{
			return fNum;
		}
 	};  	
 	  
	