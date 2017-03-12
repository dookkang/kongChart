/**
 * This is kimsaechang chart libs.
 */

MbaseChart = function(_canvas,_leftCanvas,_bottomCanvas,_centerCanvas,_rightCanvas) {
	this.canvas = _canvas;
	this.leftCanvas 	= _leftCanvas;
	this.bottomCanvas 	= _bottomCanvas;
	this.centerCanvas 	= _centerCanvas;
	this.rightCanvas 	= _rightCanvas;
}


MbaseChart.prototype.init0 = function(canvas,leftCanvas,bottomCanvas,centerCanvas,isAddListen,rightCanvas) {
	
	var M = this;
	this.xStartIndex = 0;
	this.sortArr = new Array();

	this.pad = 20;
	this.isDblClicked = false;
	//this.objectArr = [];
	//this._dataArr_forAxis = [];
	this.drawXAxis = true;
    this.canvas = canvas;
    this.leftCanvas = leftCanvas;
    this.centerCanvas = centerCanvas;
    this.bottomCanvas = bottomCanvas;
    this.rightCanvas = rightCanvas;
    
    this.objectArr = [];
    this.objectArrOri = [];
    

	this.toPhysicalVal = function(_LogicalVal){
		return this.yAxisObj.yStart-(((_LogicalVal-this.yAxisObj.min)/(this.yAxisObj.max-this.yAxisObj.min))*(this.yAxisObj.yStart-this.yAxisObj.yEnd));
	}
	
	this.toPhysicalVal2 = function(_LogicalVal){
		return this.yAxisObj2.yStart-(((_LogicalVal-this.yAxisObj2.min)/(this.yAxisObj2.max-this.yAxisObj2.min))*(this.yAxisObj2.yStart-this.yAxisObj2.yEnd));
	}	
    
	this.toPhysicalValSize = function(_LogicalVal){
		return ((_LogicalVal/(this.yAxisObj.max-this.yAxisObj.min))*(this.yAxisObj.yStart-this.yAxisObj.yEnd));
	}	
	
	this.comma = function commify(n) {
		var reg = /(^[+-]?\d+)(\d{3})/;   
		n += '';                          

		while (reg.test(n))
	    n = n.replace(reg, '$1' + ',' + '$2');

		return n;
	}
	
	/*
	 * 천 단위로 k로 표시함 ( 1000 -> 1k )
	 */
	this.procK = function (n) {
		if(Math.abs(n/1000) > 1 || Math.abs(n/1000) == 1){
			return (parseFloat(parseInt(n/1000)+'.'+parseInt(n%1000)))+'k';
		}else{
			var tmp = n.toFixed(2);
			if((tmp+'').match(/.00$/)){
				return n;
			}else{
				return tmp;
			}
			
		}
	}
	
	this.isShiftPressed = false;

    this.isShiftPressedChk = function (e) {
        var shiftPressed = 0;
        
        if (parseInt(navigator.appVersion) > 3) {
            var evt = navigator.appName == "Netscape" ? e : event;
            
            if (navigator.appName == "Netscape" && parseInt(navigator.appVersion) == 4) {
                // NETSCAPE 4 CODE
                var mString = (e.modifiers + 32).toString(2).substring(3, 6);
                shiftPressed = (mString.charAt(0) == "1");
            }
            else {
                // NEWER BROWSERS [CROSS-PLATFORM]
                shiftPressed = evt.shiftKey;
            }
            
            if (shiftPressed) 
                return true;
        }
        
        return false;
    }
    
    String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
     }
	
    this.setReMinMax = function(yAxisObj){
		if(yAxisObj.min == yAxisObj.max){
			yAxisObj.min = yAxisObj.min-(yAxisObj.max);
			yAxisObj.max = yAxisObj.max+(yAxisObj.max);
		}
		var new_gepDecimal_dived = this.getSmartValue((yAxisObj.max-yAxisObj.min)/5,'ceil');
		if(new_gepDecimal_dived < 1){
			new_gepDecimal_dived = (yAxisObj.max-yAxisObj.min)/5;
		}
		
		var start_min=Math.round(yAxisObj.min)+'';
		var new_start_min = this.getSmartValue(start_min,'floor');
		var new_gepDecimal_dived_real = new_gepDecimal_dived;
		var tmp_max =0;
		var tik_cnt = 0;
		for(var j=parseFloat(new_start_min); j< yAxisObj.max;j+=new_gepDecimal_dived_real){
			tmp_max = j;
			tik_cnt++;
		}
		tmp_max += new_gepDecimal_dived_real;tik_cnt++;
		if(!(this.minFlag && this.maxFlag)){
			yAxisObj.min = Math.floor(new_start_min);
			yAxisObj.max = Math.ceil(tmp_max);
		}
		
		yAxisObj.min2 = yAxisObj.min;
		yAxisObj.max2 = yAxisObj.max;
		yAxisObj.div = new_gepDecimal_dived;
		
		yAxisObj.minOri = yAxisObj.min;
		yAxisObj.maxOri = yAxisObj.max;
		yAxisObj.min2Ori = yAxisObj.min2;
		yAxisObj.max2Ori = yAxisObj.max2;
		yAxisObj.divOri = yAxisObj.div;
		
		if(this.type == 'metrix'){
			yAxisObj.min = this.yMin;
			yAxisObj.max = this.yMax;yAxisObj.max++;		
			
			yAxisObj.min2 = this.yMin;
			yAxisObj.max2 = this.yMax;yAxisObj.max2++;
			yAxisObj.div = ((this.yMax-this.yMin)+1)/this.yDivCnt;
		}
		

		
	}

    
    /*
     * y축의 min,max를 구함.
     * 
     */
	this.setAutoMinMax = function(series_arr,yAxisObj){
		
		if(!(this.minFlag && this.maxFlag)){
			
			var value_min;
			var value_max;
			var tmp_min;
			var tmp_max;
			for(var j=0;j< series_arr.length; j++){
				var seriesObj = series_arr[j];
				var dataArr0 = seriesObj.s_data;
				for(var i=0; i < dataArr0.length; i++){
					var aArr;
					if(this.dataType == 1){
						aArr = [i+1,dataArr0[i],0];
					}else{
						aArr = dataArr0[i];
					}
					
					if(j==0 && i==0){
						tmp_min = aArr[1];
						tmp_max = aArr[1];
					}else{
						if(tmp_min > aArr[1]){
							tmp_min = aArr[1];
						}
						if(tmp_max < aArr[1]){
							tmp_max = aArr[1];
						}			
					}
				}			
			}
			
	
			yAxisObj.valueMin = tmp_min;
			yAxisObj.valueMax = tmp_max;
			
			yAxisObj.min = tmp_min-((tmp_max-tmp_min)*0.1);
			yAxisObj.max = tmp_max+((tmp_max-tmp_min)*0.1);
			
			
			if(yAxisObj.min == yAxisObj.max){
				yAxisObj.min = yAxisObj.min-(yAxisObj.max);
				yAxisObj.max = yAxisObj.max+(yAxisObj.max);
			}
		}
		yAxisObj.tikGepValue = (yAxisObj.max - yAxisObj.min)/yAxisObj.tikCnt;
		yAxisObj.tikGepLength = this.toPhysicalValSize(yAxisObj.tikGepValue);
		this.setReMinMax(yAxisObj);
	}
    
	this.toLogicalVal = function(_phyicVal){
    	_phyicVal = _phyicVal - this.yAxisObj.yEnd;
    	var fullLength = this.yAxisObj.yStart - this.yAxisObj.yEnd;
    	var aLength = fullLength - _phyicVal;
    	var aLength_logical = (this.yAxisObj.max - this.yAxisObj.min)*(aLength/fullLength);
    	return this.yAxisObj.min + aLength_logical;
	}
	
	this.toLogicalVal2 = function(_phyicVal){
    	_phyicVal = _phyicVal - this.yAxisObj2.yEnd;
    	var fullLength = this.yAxisObj2.yStart - this.yAxisObj2.yEnd;
    	var aLength = fullLength - _phyicVal;
    	var aLength_logical = (this.yAxisObj2.max - this.yAxisObj2.min)*(aLength/fullLength);
    	return this.yAxisObj2.min + aLength_logical;
	}	
	
	this.toLogicalValX = function(_phyicVal){
    	_phyicVal = _phyicVal - this.xAxisObj.xStart;
    	var fullLength = this.xAxisObj.xStart - this.xAxisObj.xEnd;
    	var aLength = _phyicVal;
    	return (aLength/this.xAxisObj.tikGepLength)*this.xAxisObj.tikGepValue;
	}
	
	
	this.hitTestCircle = function(ex,ey,obj,cw,ch){
		 ey = obj.y;
		 var s = 90 * Math.PI / 180;
		 var e =  -90 * Math.PI / 180;
		
		 var x = 0 -ex+obj.x, y = 0 - ey+obj.y;
		 var m1 = Math.sin(s) / Math.cos(s);
		 var m2 = Math.sin(e) / Math.cos(e);
		 var flg;
		 if( 
				 (y < m1 * x || y == m1 * x)
				 && 
				 (y > m2 * x || y == m2 * x)
				 && 
				 ((( Math.sqrt( Math.pow(x,2) + Math.pow(y,2) ) ) < obj.r+1) || (( Math.sqrt( Math.pow(x,2) + Math.pow(y,2) ) ) == (obj.r+1)))) {
		     flg = true;
		 } else {
			 m1 = Math.sin(-s) / Math.cos(-s);
			 m2 = Math.sin(-e) / Math.cos(-e);			 
			 if( 
					 (y < m1 * x || y == m1 * x)
					 && 
					 (y > m2 * x || y == m2 * x)
					 && 
					 ((( Math.sqrt( Math.pow(x,2) + Math.pow(y,2) ) ) < obj.r+1) || (( Math.sqrt( Math.pow(x,2) + Math.pow(y,2) ) ) == (obj.r+1)))) {
			     flg = true;
			 } else {
			     flg = false;
			 }
		 }
		 return flg;
	}
	
	
	this.hitTest = function(ex,ey,obj,cw,ch){
		if(obj.shape == 'rectangle'){
			return this.hitTestRect(ex, ey, obj, cw, ch);
		}else if(obj.shape == 'circle'){
			return this.hitTestCircle(ex, ey, obj, cw, ch);
		}else {
			return this.hitTestCircle(ex, ey, obj, cw, ch);
		}
		
	}
	
	
	this.hitTestRect = function(ex,ey,obj,cw,ch){
		 var xv = this.xAxisObj.tikGepLength/2;
		 var yv = xv+xv/2;
		 if(ex > obj.x-xv/2 && ex < obj.x+xv/2){
			 if(ey > obj.y-yv/2 && ey < obj.y+yv/2){
				 flg = true;
			 }else{
				 flg = false;
			 }
		 }else{
			 flg = false;
		 }
		 return flg;
	}
	
	this.hitTestBar = function(ex,ey,obj,cw,ch){
		 if(ex > obj.startx && ex < (obj.startx+obj.width)){
			 if(ey > obj.starty && ey < obj.starty+obj.height){
				 flg = true;
			 }else{
				 flg = false;
			 }
		 }else{
			 flg = false;
		 }
		 return flg;
	}	
    
	function trackTransforms(ctx){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		ctx.getTransform = function(){ return xform; };
		
		var savedTransforms = [];
		var save = ctx.save;
		ctx.save = function(){
			savedTransforms.push(xform.translate(0,0));
			return save.call(ctx);
		};
		var restore = ctx.restore;
		ctx.restore = function(){
			xform = savedTransforms.pop();
			return restore.call(ctx);
		};

		var scale = ctx.scale;
		ctx.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy);
			return scale.call(ctx,sx,sy);
		};
		var rotate = ctx.rotate;
		ctx.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI);
			return rotate.call(ctx,radians);
		};
		var translate = ctx.translate;
		ctx.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(ctx,dx,dy);
		};
		var transform = ctx.transform;
		ctx.transform = function(a,b,c,d,e,f){
			var m2 = svg.createSVGMatrix();
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
			xform = xform.multiply(m2);
			return transform.call(ctx,a,b,c,d,e,f);
		};
		var setTransform = ctx.setTransform;
		ctx.setTransform = function(a,b,c,d,e,f){
			xform.a = a;
			xform.b = b;
			xform.c = c;
			xform.d = d;
			xform.e = e;
			xform.f = f;
			return setTransform.call(ctx,a,b,c,d,e,f);
		};
		var pt  = svg.createSVGPoint();
		ctx.transformedPoint = function(x,y){
			pt.x=x-M.leftCanvasWidth; pt.y=y;
			return pt.matrixTransform(xform.inverse());
		}
	}    

	//this.canvas = canvas;
	//this.leftCanvas = leftCanvas;
	//this.bottomCanvas = bottomCanvas;
	this.canvasWidth = canvas.width-(canvas.width*0.01);
	this.canvasHeight = canvas.height;

	this.ctx = canvas.getContext("2d");
	trackTransforms(this.ctx);

	this.colourGradientObject;
	this.leftCtx = leftCanvas.getContext("2d");
	
	this.leftCanvasWidth = parseInt(leftCanvas.width);
	this.leftCanvasHeight = parseInt(leftCanvas.height);
	
	this.rightCtx = rightCanvas.getContext("2d");
	this.rightCanvasWidth = rightCanvas.width;
	this.rightCanvasHeight = rightCanvas.height;	

	this.centerCtx = centerCanvas.getContext("2d");
	this.centerCanvasWidth = centerCanvas.width;
	this.centerCanvasHeight = centerCanvas.height;
	
	this.bottomCtx = bottomCanvas.getContext("2d");
	this.bottomCanvasWidth = bottomCanvas.width;
	this.bottomCanvasHeight = bottomCanvas.height;
	
	this.s = new Array();this.sDot = new Array();	
	this.s_ctx = new Array();this.sDot_ctx = new Array();
	var seriesMax = 4;
	for(var i=0; i < seriesMax; i++){
		this.s[i] = document.createElement("canvas"),
		this.s[i].width = centerCanvas.width;
		this.s[i].height = centerCanvas.height;
		this.s_ctx[i] = this.s[i].getContext("2d");
		
		this.sDot[i] = document.createElement("canvas"),
		this.sDot[i].width = centerCanvas.width;
		this.sDot[i].height = centerCanvas.height;
		this.sDot_ctx[i] = this.sDot[i].getContext("2d");		
	}

	
	
	this.bufferImage = document.createElement("canvas"),
	this.bufferCtx = this.bufferImage.getContext("2d");trackTransforms(this.bufferCtx);
	this.bufferImage.width = centerCanvas.width;
	this.bufferImage.height = centerCanvas.height;

	this.fullImage = document.createElement("canvas"),
	this.fullCtx = this.fullImage.getContext("2d");
	this.fullImage.width = canvas.width;
	this.fullImage.height = canvas.height;
	
	this.bufferBackgroundImage = document.createElement("canvas"),
	this.bufferBackgroundCtx = this.bufferBackgroundImage.getContext("2d");
	this.bufferBackgroundImage.width = centerCanvas.width;
	this.bufferBackgroundImage.height = centerCanvas.height;
	
	this.fullBackgroundImage = document.createElement("canvas"),
	this.fullBackgroundCtx = this.fullBackgroundImage.getContext("2d");
	this.fullBackgroundImage.width = canvas.width;
	this.fullBackgroundImage.height = canvas.height;
	
	this.bufferOriImage = document.createElement("canvas"),
	this.bufferOriCtx = this.bufferOriImage.getContext("2d");
	this.bufferOriImage.width = centerCanvas.width;
	this.bufferOriImage.height = centerCanvas.height;	
	
	this.bufferOriLeftImage = document.createElement("canvas"),
	this.bufferOriLeftCtx = this.bufferOriLeftImage.getContext("2d");
	this.bufferOriLeftImage.width = leftCanvas.width;
	this.bufferOriLeftImage.height = leftCanvas.height;	
	
	this.bufferLeftImage = document.createElement("canvas"),
	this.bufferLeftCtx = this.bufferLeftImage.getContext("2d");
	this.bufferLeftImage.width = leftCanvas.width;
	this.bufferLeftImage.height = leftCanvas.height;	
	
	
	this.bufferOriRightImage = document.createElement("canvas"),
	this.bufferOriRightCtx = this.bufferOriRightImage.getContext("2d");
	this.bufferOriRightImage.width = rightCanvas.width;
	this.bufferOriRightImage.height = rightCanvas.height;	
	
	this.bufferRightImage = document.createElement("canvas"),
	this.bufferRightCtx = this.bufferRightImage.getContext("2d");
	this.bufferRightImage.width = rightCanvas.width;
	this.bufferRightImage.height = rightCanvas.height;
	
	
	
	this.bufferOriBottomImage = document.createElement("canvas"),
	this.bufferOriBottomCtx =this. bufferOriBottomImage.getContext("2d");
	this.bufferOriBottomImage.width = bottomCanvas.width;
	this.bufferOriBottomImage.height = bottomCanvas.height;			

	
	if(isAddListen){
		

	document.addEventListener('keydown',function(evt){
		//evt.preventDefault(); 
/*		M.isShiftPressed = M.isShiftPressedChk(evt);
*/
	},false);	
	
	document.addEventListener('keyup',function(evt){
		//evt.preventDefault(); 
		//evt.stopPropagation();
/*		M.isShiftPressed = false;	

		M.bufferCtx.clearRect(0, 0, M.bufferImage.width, M.bufferImage.height);
		M.bufferCtx.drawImage(M.bufferBackgroundImage,0, 0);  
		M.ctx.clearRect(0, 0, canvas.width, canvas.height);
		M.ctx.drawImage(M.bufferImage,0, 0);*/	

			
	},false);
	
	canvas.addEventListener('mousedown',function(evt){
		M.dragStart = setEvent(evt);
		M.dragged = false;
		

	},false);
	function setEvent(evt){
		evt.preventDefault(); 
		evt.stopPropagation();
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
		M.lastX = (evt.offsetX || (evt.pageX - M.canvas.offsetLeft));
		M.lastY = evt.offsetY || (evt.pageY - M.canvas.offsetTop);	
		var re = M.ctx.transformedPoint(M.lastX,M.lastY);

		return re;
	}	
	

	
	function yInfoBox(pt){

		if(pt > 0){
		    var paddingx = 1;
		    var padding = 4;
	    	var boxHeight = M.xAxisObj.fontSize+padding*2;
	    	var x;
	    	var y;
	    	
			var yAxisObj;
			var tmp_v;
			var yAxisBufferImage;
			var clearWidth;
			var clearHeight;
			var boxWidth;
		    if(M.useRightAxisOnly){
		    	yAxisObj = M.rightCtx;
		    	tmp_v = M.toLogicalVal2(pt);//0/64 to -60/20
		    	yAxisBufferImage = M.bufferRightImage;
		    	clearWidth = M.rightCanvas.width;
		    	clearHeight = M.rightCanvas.height;
		    	boxWidth = M.rightCanvas.width;
		    	x = 0;
		    	y = pt- boxHeight/2;		    	
		    }else{
		    	yAxisObj = M.leftCtx;
		    	tmp_v = M.toLogicalVal(pt);//0/64 to -60/20
		    	yAxisBufferImage = M.bufferLeftImage;
		    	clearWidth = M.leftCanvas.width;
		    	clearHeight = M.leftCanvas.height;	
		    	boxWidth = M.leftCanvas.width;
		    	x = 0;
		    	y = pt- boxHeight/2;		    	
		    }
		    			
			if(M.type == 'metrix'){
				//실데이터를 변환값으로 바꿈.
				tmp_v = tmp_v*((M.yMax_re-M.yMin_re)/((M.yMax-M.yMin)+1))+M.yMin_re;
			}
			
			var _txt = M.comma(M.procK(tmp_v));
			var metrics = M.centerObj.centerCtx.measureText(""+_txt);
		    var mwidth = metrics.width;	
		    

	    	//var x = M.leftCanvas.width-boxWidth-1;

	    	var txt_x = x;
	    	var txt_y = y+boxHeight/2+padding;    	


	    	yAxisObj.clearRect(0, 0,clearWidth , clearHeight);
	    	yAxisObj.drawImage(yAxisBufferImage,0, 0);
	    	yAxisObj.translate(0.5,0.5);
	    	yAxisObj.fillStyle = 'white';
	    	yAxisObj.fillRect(x,y,boxWidth,boxHeight);	    	
	    	yAxisObj.beginPath();
	    	yAxisObj.strokeStyle = 'black';
	    	yAxisObj.lineWidth = 1;
	    	yAxisObj.strokeRect(x,y,boxWidth,boxHeight);
	    	yAxisObj.stroke();
	    	yAxisObj.fillStyle = 'black';

	    	yAxisObj.fillText(_txt,txt_x,txt_y);
	    	
	    	yAxisObj.translate(-0.5,-0.5);	
			
			
		}

	    
	
		
	
	}
	
	/*
	 * 십자선나올때 y축에 표시되는값.
	 */
	function yDetail(pt){
		yInfoBox(pt.y);
	}
	
	function crossLine(pt){
		//cross
		M.bufferCtx.font = M.y_value_font;
		M.bufferCtx.beginPath();M.bufferCtx.strokeStyle = "red";M.setLine(M.bufferCtx,1,true);M.bufferCtx.moveTo(0,pt.y);M.bufferCtx.lineTo(M.centerCanvas.width,pt.y);M.setStroke(M.bufferCtx,true);
		M.bufferCtx.beginPath();M.bufferCtx.strokeStyle = "red";M.setLine(M.bufferCtx,1,true);M.bufferCtx.moveTo(pt.x,M.yAxisObj.yStart);M.bufferCtx.lineTo(pt.x,0);M.setStroke(M.bufferCtx,true);
		
		M.bufferCtx.fillStyle = "black";
		
	}
	
	function xInfoBox(_txt,pt){

    	if(pt.x > -1){
    		var metrics_x = M.bufferCtx.measureText(""+_txt);
    	    var mwidth = metrics_x.width;	
        	var padding = 4;
        	var boxWidth = mwidth+padding*2+2;
        	var x = pt.x-boxWidth/2;
        	var txt_x = x+padding;
        	var y = M.xAxisObj.fontSize+2;
        	if(pt.x+mwidth > M.centerCanvas.width){
        		x -= boxWidth/2;
        		txt_x -= boxWidth/2;
    	    }else if(pt.x-mwidth < 0){
    	    	x = 0;
    	    	txt_x = x+padding;
    	    }
    		
        	M.bufferCtx.translate(0.5,0.5);
        	M.bufferCtx.fillStyle = 'white';
        	M.bufferCtx.fillRect(x,0,boxWidth,M.xAxisObj.fontSize+padding*2);	    	
        	M.bufferCtx.beginPath();
        	M.bufferCtx.strokeStyle = 'black';
        	M.bufferCtx.lineWidth = 1;
        	M.bufferCtx.strokeRect(x,0,boxWidth,M.xAxisObj.fontSize+padding*2);
        	M.bufferCtx.stroke();
        	M.bufferCtx.fillStyle = 'black';

        	M.bufferCtx.fillText(_txt,txt_x,y+padding/2);
        	
        	M.bufferCtx.translate(-0.5,-0.5);
    	}

	}
	
	
	function xDetail(pt){
		var t = Math.round(pt.x/M.xAxisObj.tikGepLength);
		var now_x_label_index;
		now_x_label_index = t;		
		var now_x_label2;

		if(M.series[0].s_chartType == 'metrix'){
			if(M.xAxisObj.min_pre == null) { M.xAxisObj.min_pre = 0;}
			now_x_label2 = M.xStartIndex +t;
		}else{
			var aSeries = M.series[M.maxSeriesIndex];
			if(typeof aSeries._dataArr_forAxis != 'undefined' && aSeries._dataArr_forAxis != null){
				if((now_x_label_index > aSeries._dataArr_forAxis.length-1)){
					if(aSeries._dataArr_forAxis.length > 0){
						now_x_label2 = aSeries._dataArr_forAxis[aSeries._dataArr_forAxis.length-1][0];	
					}else{
						now_x_label2 = '';
					}
				}else if(typeof aSeries._dataArr_forAxis[now_x_label_index] != 'undefined'){
					now_x_label2 = aSeries._dataArr_forAxis[now_x_label_index][0];					
				}else{
					now_x_label2 = '';
				}	
			}	
		}
		

		
	    var now_y = M.comma(M.toLogicalVal(pt.y).toFixed(2));
	    if(M.type == 'metrix'){
	    	now_x_label2 = (now_x_label2+1) * M.xMax_re/((M.xMax-M.xMin)+1);
	    }
		now_x_label2 = M.comma(now_x_label2);
		xInfoBox(now_x_label2,pt);
	    
	}
	
	function drawBox(pt){
		M.bufferCtx.clearRect(0, 0, M.bufferImage.width, M.bufferImage.height);
		M.bufferCtx.drawImage(M.bufferBackgroundImage,0, 0); 
		
		M.bufferCtx.fillStyle = "rgba(253,238,108,0.5)";
		M.bufferCtx.fillRect(M.dragStart.x,M.dragStart.y,pt.x-M.dragStart.x,pt.y-M.dragStart.y);
		
		M.bufferCtx.fillStyle = "black";
		M.bufferCtx.strokeRect(M.dragStart.x,M.dragStart.y,pt.x-M.dragStart.x,pt.y-M.dragStart.y);
	}
	
/*
	canvas.addEventListener('mousemove',function(evt){
		if(!M.halfXAxis){
			
			
			
		var pt = setEvent(evt);
		pt.x = Math.round(pt.x/M.xAxisObj.tikGepLength)*M.xAxisObj.tikGepLength;
		M.dragged = true;
		
		M.refreshNowBackground();

		if(false){
			mouseup_out(evt);
		}else{
			if(M.dragStart){
				drawBox(pt);
			}else{
				M.makeTooltip(pt);
				crossLine(pt);
			    xDetail(pt);
			    yDetail(pt);
			}
			M.callbackDraw(false);//background占쎌뮋�쇿뜝�덇턁占쎈��숋옙袁⑤콦�좎럩瑗룟뜝�숈삕占쎈굝裕됧뜝�숈삕
		}
		
		
		
		if(M.isDblClicked){
			M.refreshNowBackground();
			M.xStartIndex = 0;M.xAxisObj.min = 0;

			if(false){
				//占쏙옙伊볩옙�듭물�좎띁�わ옙占쎈쐸
				M.initView2();
				M.ctx.clearRect(0, 0, M.fullBackgroundImage.width, M.fullBackgroundImage.height);
				M.ctx.drawImage(M.fullBackgroundImage,0,0);
				
				
			}else{
				//�좎뜫�됵옙�룸돥筌뤾봇遊븀뼨�먯삕
				M.initView();
				M.draw();
			}
			
			M.isDblClicked = false;
		}	
			
			
			
		}

	},false);
	*/
	function evt_dblclick(evt){
		setEvent(evt);
		M.isDblClicked = true;		
	}
	
	canvas.addEventListener('dblclick',evt_dblclick,false);
		
	
}
	
	this.initView = function(){
		M.bufferCtx.clearRect(0, 0, M.bufferImage.width, M.bufferImage.height);
		M.bufferCtx.drawImage(M.bufferOriImage,0, 0);  
		
		//�좎떬�댿뵛
		M.bufferLeftCtx.clearRect(0, 0, M.leftCanvas.width, M.leftCanvas.height);
		M.bufferLeftCtx.drawImage(M.bufferOriLeftImage,0, 0);
		
		M.leftCtx.clearRect(0, 0, M.leftCanvas.width, M.leftCanvas.height);
		M.leftCtx.drawImage(M.bufferLeftImage,0, 0);
		
		M.bottomCtx.clearRect(0, 0, M.bottomCanvas.width, M.bottomCanvas.height);
		M.bottomCtx.drawImage(M.bufferOriBottomImage,0, 0);

		M.takeAPic();
		
		M.dragStart = null;
		M.dragEnd = null;

		M.zoom = 1;
/*		for(var k=0; k < M.series.length; k++){
			var seriesObj = M.series[k];
			seriesObj.objectArr = seriesObj.objectArrOri;	
			seriesObj._dataArr_forAxis = seriesObj.s_data;	
			seriesObj._dataArr_forAxis2 = seriesObj.s_data;
		}
		M.xAxisObj.tikGepLength = M.xAxisObj.tikGepLengthOri;
		M.yAxisObj.min = M.yAxisObj.minOri;
		M.yAxisObj.max = M.yAxisObj.maxOri;
		M.yAxisObj.min2 = M.yAxisObj.min2Ori;
		M.yAxisObj.max2 = M.yAxisObj.max2Ori;
		M.yAxisObj.div = M.yAxisObj.divOri;
		*/
		
		
		for(var k=0; k < M.series.length; k++){
			var seriesObj = M.series[k];
			seriesObj.objectArr = seriesObj.objectArrOri;
			seriesObj._dataArr_forAxis = null;	
			seriesObj._dataArr_forAxis2 = null;	
			if(seriesObj.s_chartType == 'metrix'){
				M.xAxisObj.min_pre = 0;
				M.xAxisObj.min = M.xMin;
				M.xAxisObj.max = M.xMax;
				M.yAxisObj.min = M.yMin;
				M.yAxisObj.max = M.yMax;
				M.yAxisObj.tikCnt = ((M.yMax-M.yMin)+1)/M.yDivCnt;
				M.yAxisObj.tikGepValue = 4;
			}			
		}		
		M.xAxisObj.tikGepLength = M.xAxisObj.tikGepLengthOri;
		M.yAxisObj.min = M.yAxisObj.minOri;
		M.yAxisObj.max = M.yAxisObj.maxOri;
		M.yAxisObj.min2 = M.yAxisObj.min2Ori;
		M.yAxisObj.max2 = M.yAxisObj.max2Ori;
		M.yAxisObj.div = M.yAxisObj.divOri;
		
		
		//M.xAxisObj.max = 0;
	}
	
	
	this.initView2= function(){
		M.bufferCtx.clearRect(0, 0, M.bufferImage.width, M.bufferImage.height);
		M.bufferCtx.drawImage(M.bufferOriImage,0, 0);  
		
		M.bufferLeftCtx.clearRect(0, 0, M.leftCanvas.width, M.leftCanvas.height);
		M.bufferLeftCtx.drawImage(M.bufferOriLeftImage,0, 0);
		
		M.leftCtx.clearRect(0, 0, M.leftCanvas.width, M.leftCanvas.height);
		M.leftCtx.drawImage(M.bufferLeftImage,0, 0);
				
		M.bottomCtx.clearRect(0, 0, M.bottomCanvas.width, M.bottomCanvas.height);
		M.bottomCtx.drawImage(M.bufferOriBottomImage,0, 0);
		
		M.takeAPic();
		M.dragStart = null;
		M.dragEnd = null;

		M.zoom = 1;
		for(var k=0; k < M.series.length; k++){
			var seriesObj = M.series[k];
			seriesObj.objectArr = seriesObj.objectArrOri;	
			seriesObj._dataArr_forAxis = seriesObj.s_data;	
			seriesObj._dataArr_forAxis2 = seriesObj.s_data;
		}
		M.xAxisObj.tikGepLength = M.xAxisObj.tikGepLengthOri;
		M.yAxisObj.min = M.yAxisObj.minOri;
		M.yAxisObj.max = M.yAxisObj.maxOri;
		M.yAxisObj.min2 = M.yAxisObj.min2Ori;
		M.yAxisObj.max2 = M.yAxisObj.max2Ori;
		M.yAxisObj.div = M.yAxisObj.divOri;

	}
	
	canvas.addEventListener('mouseup',function(evt){
		if(!M.halfXAxis){
			mouseup_out(evt);
		}
		
					
	},false);	
	

	
/*	canvas.addEventListener('mouseout',function(evt){
		if(!M.halfXAxis){
			mouseup_out(evt);
		}
	},false);	
	*/
	



	function mouseup_out(evt,initx,inity){
		M.dragEnd = setEvent(evt);
		if(M.dragEnd.x < 0){
			M.dragEnd.x  = 0;
		}

		
		if(M.dragStart != null && M.dragStart != 'undefined' ){
			this.drawXAxis = true;
			var v1;
			var v2;	
			var yo;
			if(M.useRightAxisOnly){
				v1 = M.toLogicalVal2(M.dragStart.y);
				v2 = M.toLogicalVal2(M.dragEnd.y);
				yo = M.yAxisObj2;
			}else{
				v1 = M.toLogicalVal(M.dragStart.y);
				v2 = M.toLogicalVal(M.dragEnd.y);
				yo = M.yAxisObj;
				
			}

			
			var vx1Index = M.toLogicalValX(M.dragStart.x);
			var vx2Index = M.toLogicalValX(M.dragEnd.x);

			if(Math.abs(M.dragStart.x - M.dragEnd.x) > 10){
				M.zoom = 2;
				M.zoomStartX = M.dragStart.x;
				M.zoomEndX = M.dragEnd.x;
				var xmin,xmax;
				if(M.dragStart.x > M.dragEnd.x){
					xmin = M.dragEnd.x;
					xmax = M.dragStart.x;
				}else{
					xmin = M.dragStart.x;
					xmax = M.dragEnd.x;			
				}
			}

			
			if(Math.abs(M.dragStart.y - M.dragEnd.y) > 10){
				if(v1> v2){
					yo.min = Math.floor(v2);
					yo.max = Math.ceil(v1);
				}else{
					yo.min = Math.floor(v1);
					yo.max = Math.ceil(v2);
				}			

				var xmin_pre = M.xAxisObj.min;
				
				var xmax_pre = M.xAxisObj.max;
				var xminIndex = 0;
				var xmaxIndex = 0;
				if(vx1Index> vx2Index){
					M.xAxisObj.min = Math.ceil(vx2Index);
					M.xAxisObj.max = Math.floor(vx1Index);	
				}else{
					M.xAxisObj.min = Math.ceil(vx1Index);
					M.xAxisObj.max = Math.floor(vx2Index);
				}
				if(M.series[0].s_chartType == 'metrix'){
					if(M.xAxisObj.min == 0){
						M.xAxisObj.min = 1;	
					}
				}
				yo.tikGepValue = (yo.max-yo.min)/yo.tikCnt;
				yo.tikGepLength = (yo.yStart -yo.yEnd)/yo.tikCnt; 
				
				M.bufferLeftCtx.clearRect(0, 0, M.bufferLeftImage.width, M.bufferLeftImage.height);
				if(M.useRightAxisOnly){
					yo.rightCtx.clearRect(0, 0, M.rightCanvas.width, M.rightCanvas.height);
				}else{
					yo.leftCtx.clearRect(0, 0, M.leftCanvas.width, M.leftCanvas.height);
					if(typeof yo.rightCtx != 'undefined'){
						yo.rightCtx.clearRect(0, 0, M.rightCanvas.width, M.rightCanvas.height);
					}
				}
								
				M.fullCtx.clearRect(0, 0, M.canvas.width, M.canvas.height);
				M.bottomCtx.clearRect(0, 0, M.bottomCanvas.width, M.bottomCanvas.height);
				M.draw();
				
			}
			M.dragStart = null;
			M.dragEnd = null;
		}else{
			M.refreshNowBackground();
			M.callbackDraw();
		}

	}
	M.resizeBuffers(canvas,leftCanvas,bottomCanvas,centerCanvas,rightCanvas,this);
}




MbaseChart.prototype.getSmartValue = function(num,_floor_ceil) {
	var zcnt = new Object();
	zcnt.cnt = 0;
	
	var re = this.makeNumTenDivid(num,zcnt);
	if(_floor_ceil == 'floor'){
		re = Math.floor(re);
	}else {
		re = Math.ceil(re);		
	}
	for(var i=0; i < zcnt.cnt;i++){
		re = re*10;
	}
	
	return re;
}


MbaseChart.prototype.makeNumTenDivid = function(num,zcntObj) {
	var re = num/10;
	zcntObj.cnt++;
	if(Math.abs(re) >= 10){
		re = this.makeNumTenDivid(re,zcntObj);
	}else{
	}
	return re;
}



MbaseChart.prototype.takeAPic = function() {

	
	this.bufferBackgroundCtx.clearRect(0, 0, this.bufferImage.width, this.bufferImage.height);
	this.bufferBackgroundCtx.drawImage(this.bufferImage,0, 0);
	
	

}

MbaseChart.prototype.takeAPic2 = function() {
	this.bufferOriCtx.clearRect(0, 0, this.bufferImage.width, this.bufferImage.height);
	this.bufferOriCtx.drawImage(this.bufferImage,0, 0);
	
	this.bufferOriLeftCtx.clearRect(0, 0, this.bufferOriLeftImage.width, this.bufferOriLeftImage.height);
	this.bufferOriLeftCtx.drawImage(this.leftCanvas,0,0);
	
	this.bufferOriRightCtx.clearRect(0, 0, this.bufferOriRightImage.width, this.bufferOriRightImage.height);
	this.bufferOriRightCtx.drawImage(this.rightCanvas,0,0);	
	
	this.bufferOriBottomCtx.clearRect(0, 0, this.bufferOriBottomImage.width, this.bufferOriBottomImage.height);
	this.bufferOriBottomCtx.drawImage(this.bottomCanvas,0,0);	
	
	this.fullBackgroundImage.width = this.canvas.width;
	this.fullBackgroundImage.height = this.canvas.height;	
	
	this.fullBackgroundCtx.clearRect(0, 0, this.fullBackgroundImage.width, this.fullBackgroundImage.height);
	this.fullBackgroundCtx.drawImage(this.canvas,0,0);
	

}


MbaseChart.prototype.draw_square = function() {
	var c1 = document.getElementById("c1");
	var c1_context = c1.getContext("2d");
	c1_context.fillStyle = "#f00";
	c1_context.fillRect(50, 50, 100, 100);
}
 
MbaseChart.prototype.findControlPoint = function(s1, s2, s3) {
	var // Unit vector, length of line s1,s3
		ux1 = s3.x - s1.x,
		uy1 = s3.y - s1.y,

		ul1 = Math.sqrt(ux1*ux1 + uy1*uy1)
		u1 = { x: ux1/ul1, y: uy1/ul1 },
 
		// Unit vector, length of line s1,s2
		ux2 = s2.x - s1.x,
		uy2 = s2.y - s1.y,
		ul2 = Math.sqrt(ux2*ux2 + uy2*uy2),
		u2 = { x: ux2/ul2, y: uy2/ul2 },
 
		// Dot product
		k = u1.x*u2.x + u1.y*u2.y,
 
		// Project s2 onto s1,s3
		il1 = { x: s1.x+u1.x*k*ul2, y: s1.y+u1.y*k*ul2 },
 
		// Unit vector, length of s2,il1
		dx1 = s2.x - il1.x,
		dy1 = s2.y - il1.y,
		dl1 = Math.sqrt(dx1*dx1 + dy1*dy1),
		d1 = { x: dx1/dl1, y: dy1/dl1 },
 
		// Midpoint
		mp = { x: (s1.x+s3.x)/2, y: (s1.y+s3.y)/2 },
 
		// Control point on s2,il1
		cpm = { x: s2.x+d1.x*dl1, y: s2.y+d1.y*dl1 },
 
		// Translate based on distance from midpoint
		tx = il1.x - mp.x,
		ty = il1.y - mp.y,
		cp = { x: cpm.x+tx, y: cpm.y+ty };
				
 
	return cp;
}

MbaseChart.prototype.makeTooltip= function(pt) {
	var flg = false;		
	//var chg_x = 0;
	var tt_text = "";
	var text_arr = new Array();
	var trueCnt=0;		
	for(var k=0; k < this.series.length; k++){
		var seriesObj = this.series[k];
		if(seriesObj.objectArr != null){
			var aObject = null;
			for(var i=0; i < seriesObj.objectArr.length; i++){
				aObject = seriesObj.objectArr[i];
				
				if(seriesObj.s_chartType == 'spline'){
					//flg = M.hitTestRect(M.lastX,M.lastY,aObject,M.canvas.width/2,M.canvas.height/2);
					flg = this.hitTestCircle(pt.x,pt.y,aObject,this.canvas.width/2,this.canvas.height/2);
					if(flg){
						break;
					}
				}
			}
			if(flg){
				var tooltip_obj = {};
				if(seriesObj.s_chartType == 'metrix'){
					tooltip_obj.text = seriesObj.s_name+ " ("+this.comma(aObject.lx_label)+" : "+this.comma(aObject.ly)+",Z:"+this.comma(aObject.value);
					tooltip_obj.color = aObject.color;
				}else{
					tooltip_obj.text = seriesObj.s_name+ " ("+this.comma(aObject.lx_label)+" : "+this.comma(aObject.ly)+")";
					tooltip_obj.color = seriesObj.s_color;
				}
				
				
				text_arr[trueCnt] = tooltip_obj;
				trueCnt++;
				flg = false;
			}
			
		}
	}
	
	if(trueCnt > 0){
			//tooltip
			
			var tooltipMargin = 4;
			var tooltipLineMargin = 3;
			this.bufferCtx.font=this.tooltip_font;
			
			var mwidth =0;
			for(var k=0; k < text_arr.length; k++){
				var metrics = this.bufferCtx.measureText(text_arr[k].text);
			    if(metrics.width > mwidth){
			    	mwidth = metrics.width;
			    }		
			}
			
			
			this.bufferCtx.beginPath();
			this.setLine(this.bufferCtx,1);
			this.bufferCtx.font = this.y_value_font;
			this.bufferCtx.strokeStyle = "black";
			this.bufferCtx.fillStyle = "rgba(255,255,200,1)";
			this.tooltipRectX = mwidth+2+this.tooltip_font_size+tooltipMargin*2;
			this.tooltipRectY = this.tooltip_font_size*text_arr.length+tooltipMargin*3+ tooltipLineMargin*3*(text_arr.length-1);
			
			var ttp = this.getToolTipPosition(pt.x,pt.y,this.tooltipRectX,this.tooltipRectY,tooltipMargin);
			
			var tx = ttp.rect_start_x;
			var ty = ttp.rect_start_y;
			var tw = this.tooltipRectX+tooltipMargin;
			var th = this.tooltipRectY+tooltipMargin;
			this.bufferCtx.fillRect(tx,ty,tw,th);
			this.bufferCtx.fillStyle = "lightgrey";
			this.bufferCtx.strokeStyle = "lightgrey";
			this.setLine(this.bufferCtx,1,true);
			this.bufferCtx.strokeRect(tx,ty,tw,th);	
			this.bufferCtx.translate(-0.5,-0.5);
			rect_start_y += this.tooltip_font_size;
			for(var k=0; k < text_arr.length; k++){
				var y = ttp.rect_start_y+((k+1)*this.tooltip_font_size)+tooltipMargin*2+k*tooltipLineMargin*2;
				var y_rect = ttp.rect_start_y+(k*this.tooltip_font_size)+tooltipMargin*2+k*tooltipLineMargin*2;
				this.bufferCtx.fillStyle = text_arr[k].color;
				if(seriesObj.s_chartType == 'metrix'){
					this.bufferCtx.arc(
							(ttp.rect_start_x+tooltipLineMargin*2)+this.tooltip_font_size/2, y_rect+this.tooltip_font_size/2, this.tooltip_font_size/2, 0, 2 * Math.PI, false);
					this.bufferCtx.fill(); 	
				}else{
					this.bufferCtx.fillRect(ttp.rect_start_x+tooltipLineMargin*2,
							y_rect,
							this.tooltip_font_size,
							this.tooltip_font_size);
				}
				
				this.setLine(this.bufferCtx,0.1);
				this.bufferCtx.font = this.tooltip_font;
				this.bufferCtx.fillStyle = "rgba(0,0,0,1)";
				this.bufferCtx.strokeStyle = "rgba(0,0,0,1)";
				this.bufferCtx.fillText(text_arr[k].text,
				this.tooltip_font_size+ttp.rect_start_x+tooltipLineMargin*3,
				y);
			}
			
			this.bufferCtx.closePath();
			
			//chg_x = this.comma(aObject.lx_label);
			
			trueCnt = 0;
			return true;
	}else{
		return false;
	}				
			
}


MbaseChart.prototype.drawLineDash= function(ctxObj,_startx,_starty,_width,_height) {
	ctxObj.translate(0.5,0.5);
	ctxObj.setLineDash([2, 5]);
	ctxObj.beginPath();
	ctxObj.strokeRect(_startx, _starty, _width, _height);
	ctxObj.closePath();
	ctxObj.setLineDash([]);
	ctxObj.translate(-0.5,-0.5);
}


MbaseChart.prototype.refreshNowBackground= function() {
	this.fullCtx.clearRect(0, 0, this.fullImage.width, this.fullImage.height);
	this.bufferCtx.clearRect(0, 0, this.bufferImage.width, this.bufferImage.height);
	this.bufferCtx.drawImage(this.bufferBackgroundImage,0, 0); 
	
/*	this.bufferLeftCtx.clearRect(0, 0, this.bufferLeftImage.width, this.bufferLeftImage.height);
	this.bufferLeftCtx.drawImage(this.bufferOriLeftImage,0, 0); */
}

/*
 * 모든 그래프의 공통 Y축 그리기
 */
MbaseChart.prototype.drawYAxis_common = function(centerObj,xAxisObj,yAxisObj,dataArr,idDrawAxis,_type) {
	var leftIndex = 0;
	var rightIndex = 1;
	
	for(var e=0; e < dataArr.length; e++){
		if(dataArr[e].s_axis == 'left'){
			leftIndex = e;
		}else if(dataArr[e].s_axis == 'right'){
			rightIndex = e;
		}
	}
	
	if(this.lyWidth > 0){
		yAxisObj.leftCtx.clearRect(0, 0, this.leftCanvas.width, this.leftCanvas.height);
		this.bufferLeftCtx.clearRect(0, 0, this.bufferLeftImage.width, this.bufferLeftImage.height);
	}
    
    if(this.ryWidth > 0  && this.axis_use_cnt == 2){
    	this.yAxisObj2.rightCtx.clearRect(0, 0, this.rightCanvas.width, this.rightCanvas.height);
        this.bufferRightCtx.clearRect(0, 0, this.bufferRightImage.width, this.bufferRightImage.height);
    }

	if(this.zoom == 1){
		if(this.type == 'metrix'){
			this.setReMinMax(yAxisObj);	
		}else{
			if(this.axis_use_cnt == 2 || this.useRightAxisOnly){
				for(var t=0; t < dataArr.length; t++){
					var yo;
					if(dataArr[t].s_axis == 'left'){
						yo = yAxisObj;
					}else if(dataArr[t].s_axis == 'right'){
						yo = this.yAxisObj2;
					}
					this.setAutoMinMax([dataArr[t]],yo);
				}
			}else{
				this.setAutoMinMax(dataArr,yAxisObj);
			}

		}
	}
	
	var colorMax = 255;
	if(centerObj.summax > colorMax){
		colorMax = centerObj.summax;
	}
	this.colourGradientObject = new ColourGradient(0, colorMax, this.colours);
	
	if(this.lyWidth > 0){
		this.bufferLeftCtx.beginPath();
		this.bufferLeftCtx.moveTo(this.leftCanvasWidth,0);
		this.bufferLeftCtx.lineTo(this.leftCanvasWidth,this.leftCanvasHeight);
		this.bufferLeftCtx.stroke();
	}
	if((this.axis_use_cnt == 2 || this.useRightAxisOnly)){
		this.bufferRightCtx.beginPath();
		this.bufferRightCtx.moveTo(0,0);
		this.bufferRightCtx.lineTo(0,this.rightCanvas.height);
		this.bufferRightCtx.stroke();
	}
	


	//�곕벡湲쏙옙�λ퓠  占쎌눖爰쇽옙怨뚮┛
	if(this.lyWidth > 0){
		this.bufferLeftCtx.beginPath();
		this.bufferLeftCtx.font = this.y_label_font;
		this.bufferLeftCtx.fillStyle = dataArr[leftIndex].s_color;
		this.bufferLeftCtx.fillText(this.y_label,0,this.y_label_font_size);
		this.bufferLeftCtx.stroke();
	}
	if((this.axis_use_cnt == 2 || this.useRightAxisOnly)){
		this.bufferRightCtx.beginPath();
		this.bufferRightCtx.font = this.y_label_font;
		this.bufferRightCtx.fillStyle = dataArr[rightIndex].s_color;
		this.bufferRightCtx.fillText(this.y2_label,this.rightCanvas.width-this.bufferRightCtx.measureText(this.y2_label).width,this.y_label_font_size);
		this.bufferRightCtx.stroke();
	}


	if(this.type == 'metrix'){
		var d = this.toPhysicalValSize(yAxisObj.div);
		this.radius = (d/yAxisObj.div)/2;
	}
	
	var gridFlag = true;
	
	if(this.yBaseLines != null){
		
		for(var i=0; i < this.yBaseLines.length; i++){
			var addInfoObj = this.yBaseLines[i];
			if(addInfoObj.s_draw){
				var tmp_alram_y;
				if(this.useRightAxisOnly){
					tmp_alram_y = this.toPhysicalVal2(addInfoObj.alramValue);
				}else{
					tmp_alram_y = this.toPhysicalVal(addInfoObj.alramValue);
				}
				//占쎈슣�わ옙紐꾩뒠占쎌눖以��얜똻�쒎쳞占쏙옙�륁궎占쎄쑬以�占쎌꼷�깍옙�륁뿳占쏙옙揶쏅���筌≪뼚釉섓옙占썸뉩紐꺿뵝.
				
				if(i == 0){
					if(this.useRightAxisOnly){
						var mid = ((this.yAxisObj2.max - this.yAxisObj2.min)/2)/2+this.yAxisObj2.min;
						tmp_alram_y = this.toPhysicalVal2(mid);
					}else{
						var mid = ((yAxisObj.max - yAxisObj.min)/2)/2+this.yAxisObj.min;
						tmp_alram_y = this.toPhysicalVal(mid);	
					}
				}else{
					if(this.useRightAxisOnly){
						var mid = (this.yAxisObj2.max - this.yAxisObj2.min)/2+this.yAxisObj2.min;
						tmp_alram_y = this.toPhysicalVal2(mid);
					}else{
						var mid = (yAxisObj.max - yAxisObj.min)/2+this.yAxisObj.min;
						tmp_alram_y = this.toPhysicalVal(mid);
					}
				}
				
				
				
				this.bufferCtx.font = this.tooltip_font;
				this.bufferCtx.strokeStyle = addInfoObj.alramColor;
				this.bufferCtx.fillStyle = addInfoObj.alramColor;
				this.bufferCtx.beginPath();
				this.setLine(centerObj.centerCtx,3);
				this.bufferCtx.moveTo(0,Math.round(tmp_alram_y));
				this.bufferCtx.lineTo(this.centerCanvas.width,Math.round(tmp_alram_y));
				this.bufferCtx.stroke();			
				var aLabel = addInfoObj.alramLabel;
				gridFlag = false;
			}

		}
	}
	
	
	
	
	
	

	
	if(this.lyWidth > 0){
		this.leftCtx.font = this.y_value_font;
		this.bufferLeftCtx.font = this.y_value_font;
		if(this.axis_use_cnt == 2){
			this.leftCtx.fillStyle = dataArr[leftIndex].s_color;
			this.bufferLeftCtx.fillStyle = dataArr[leftIndex].s_color;
		}else{
			this.leftCtx.fillStyle = this.y_value_font_color;
			this.bufferLeftCtx.fillStyle = this.y_value_font_color;
		}
		
		
	}
	if((this.axis_use_cnt == 2 || this.useRightAxisOnly)){
		//占쎌뮆�곻쭩�뉛옙 �곕베��揶쏆뮆�わ쭖占쏙옙�뺚봺筌앸뜆源뗰옙�곗쨮 占쎈뿮�울옙�롢늺 �ル뿪荑뗰옙占�
		this.rightCtx.font = this.y_value_font;
		this.bufferRightCtx.font = this.y_value_font;
		this.rightCtx.fillStyle = dataArr[rightIndex].s_color;
		this.bufferRightCtx.fillStyle = dataArr[rightIndex].s_color;		
	}	
	if(!this.useRightAxisOnly){
		for(var i=yAxisObj.min2; i < (yAxisObj.max2+1); i+=yAxisObj.div){
			//i => logical
			var re_i;
			var pi;
			if(this.type == 'metrix'){
				re_i = i-1;
				pi = this.toPhysicalVal(re_i);
			}else{
				pi = this.toPhysicalVal(i);
				
			}
			if(this.type == 'metrix' || (this.type != 'metrix' && pi > this.yAxis_limit)){
				if(gridFlag){
					this.bufferCtx.lineWidth = 1;
					this.bufferCtx.strokeStyle = centerObj.fillStyle;
					this.drawLineDash(this.bufferCtx,0,Math.round(pi),this.centerCanvas.width,0);	
				}else{
					this.bufferCtx.lineWidth = 0.2;
					this.bufferCtx.strokeStyle = centerObj.fillStyle;
					this.drawLineDash(this.bufferCtx,0,Math.round(pi),this.centerCanvas.width,0);		
				}
	
				if((this.axis_use_cnt == 2 || this.useRightAxisOnly)){
					this.yAxisObj2.rightCtx.font = this.y_value_font;
					this.bufferRightCtx.font = this.y_value_font;
				}else{
					yAxisObj.leftCtx.font = this.y_value_font;
					this.bufferLeftCtx.font = this.y_value_font;
				}
	
				var la;
				if(this.type == 'metrix'){
					la = this.comma(this.procK(re_i));
				}else{
					la = this.comma(this.procK(i));
				}
				
				if(this.type == 'metrix'){
					if(la == -1){
						la = -60;
					}else if(la == 15){
						la = -40;
					}else if(la == 31){
						la = -20;
					}else if(la == 47){
						la = 0;
					}else if(la == 63){
						la = 20;
					}	
				}
	
				var metrics = yAxisObj.leftCtx.measureText(la+'');
			    var mwidth = metrics.width;	


	
				if((this.axis_use_cnt == 2 || this.useRightAxisOnly)){

				}else{
					if(this.lyWidth > 0){
						this.bufferLeftCtx.beginPath();
					    this.bufferLeftCtx.font = this.y_value_font;
					    //yAxisObj.tikHalfWidth는 y축 눈금 길이
					    this.bufferLeftCtx.moveTo(this.leftCanvas.width-yAxisObj.tikHalfWidth,pi);
					    this.bufferLeftCtx.lineTo(this.leftCanvas.width+yAxisObj.tikHalfWidth,pi);
					    this.bufferLeftCtx.stroke();
					}
				}
			    
			    var correction;
			    if(i == yAxisObj.min2){
			    	correction = -yAxisObj.fontSize/2;
			    	
			    }else{
			    	
			    	correction = yAxisObj.fontSize/2;	    	
			    }
			    
				if(this.lyWidth > 0){
				    this.bufferLeftCtx.fillText(la,this.leftCanvas.width-mwidth-yAxisObj.tikHalfWidth*2,pi+correction);
				    this.bufferLeftCtx.stroke();
				}
				if(this.ryWidth > 0  && this.axis_use_cnt == 2){
	
				}
				
				
	
	
			    this.leftCtx.clearRect(0, 0, this.leftCanvas.width, this.leftCanvas.height);
			    this.leftCtx.drawImage(this.bufferLeftImage,0,0);
	
				
			}
			
		}
	}

	//축2개 사용하고, 오른쪽 축사용을 할경우
	if((this.axis_use_cnt == 2 || this.useRightAxisOnly)){
		//오른쪽 Y축
		for(var i=this.yAxisObj2.min2; i < (this.yAxisObj2.max2+1); i+=this.yAxisObj2.div){
			//i => logical
			var re_i;
			var pi;
			if(this.type == 'metrix'){
	
			}else{
				pi = this.toPhysicalVal2(i);
			}
			if(this.type == 'metrix' || (this.type != 'metrix' && pi > this.yAxis_limit)){
				if(this.useRightAxisOnly){
					if(gridFlag){
						this.bufferCtx.lineWidth = 1;
						this.bufferCtx.strokeStyle = centerObj.fillStyle;
						this.drawLineDash(this.bufferCtx,0,Math.round(pi),this.centerCanvas.width,0);	
					}else{
						this.bufferCtx.lineWidth = 0.2;
						this.bufferCtx.strokeStyle = centerObj.fillStyle;
						this.drawLineDash(this.bufferCtx,0,Math.round(pi),this.centerCanvas.width,0);		
					}
				}
				this.yAxisObj2.rightCtx.font = this.y_value_font;
				this.bufferRightCtx.font = this.y_value_font;
				var la;
				if(this.type == 'metrix'){
					la = this.comma(this.procK(re_i));
				}else{
					la = this.comma(this.procK(i));
				}
				
				if(this.type == 'metrix'){
					if(la == -1){
						la = -60;
					}else if(la == 15){
						la = -40;
					}else if(la == 31){
						la = -20;
					}else if(la == 47){
						la = 0;
					}else if(la == 63){
						la = 20;
					}	
				}
	
				var metrics = this.yAxisObj2.rightCtx.measureText(la+'');
			    var mwidth = metrics.width;	
	
				if((this.axis_use_cnt == 2 || this.useRightAxisOnly)){
					if(this.ryWidth > 0){
						this.bufferRightCtx.beginPath();
					    this.bufferRightCtx.font = this.y_value_font;
					    this.bufferRightCtx.moveTo(this.rightCanvas.width-this.yAxisObj2.tikHalfWidth,pi);
					    this.bufferRightCtx.lineTo(this.rightCanvas.width+this.yAxisObj2.tikHalfWidth,pi);
					    this.bufferRightCtx.stroke();
					}
				}else{

				}
			    var correction;
			    if(i == this.yAxisObj2.min2){
			    	correction = -yAxisObj.fontSize/2;
			    	
			    }else{
			    	
			    	correction = yAxisObj.fontSize/2;	    	
			    }
			    
				if(this.lyWidth > 0){
	
				}
				if(this.ryWidth > 0  && this.axis_use_cnt == 2){
				    this.bufferRightCtx.fillText(la,yAxisObj.tikHalfWidth*2,pi+correction);
				    this.bufferRightCtx.stroke();
				}
				
				
	
	
	
			    this.rightCtx.clearRect(0, 0, this.rightCanvas.width, this.rightCanvas.height);
			    this.rightCtx.drawImage(this.bufferRightImage,0,0);
				
			}
			
		}
	}//2Y for
}				




/*
 * 모든 그래프의 공통 Y축 그리기
 */
MbaseChart.prototype.drawYAxis_test = function(centerObj,xAxisObj,yAxisObj,series,idDrawAxis,_type) {
	var minMaxObj = this.getMinMax(series);
	console.log(minMaxObj.min+'<->'+minMaxObj.max);
	this.drawYALine(minMaxObj);
}

MbaseChart.prototype.drawXAxis_spline_test = function(_series) {
	this.xAxisObj.minPixel = this.leftCanvasWidth;
	this.xAxisObj.maxPixel = this.canvas.width-20;
	this.drawXALine(this.xAxisObj,_series);
}


/*
 * series전체의 min,max구하기
 */
MbaseChart.prototype.drawYALine = function(_minMaxObj) {
	this.ctx.beginPath();
	this.ctx.moveTo(this.leftCanvasWidth,0);
	this.ctx.lineTo(this.leftCanvasWidth,this.leftCanvasHeight);
	this.ctx.stroke();
	
	var div = (this.yAxisObj.max - this.yAxisObj.min)/2;
	for(var i=this.yAxisObj.min; i < this.yAxisObj.max+1; i=i+div){
			var y = this.toPhysicalVal(i);
			this.ctx.beginPath();
			this.ctx.moveTo(this.leftCanvasWidth-10,y);
			this.ctx.lineTo(this.leftCanvasWidth, y);
			this.ctx.fillText(i,0,y);
			this.ctx.stroke();
	}
}

MbaseChart.prototype.drawXALine = function(_xAxisObj,_series) {
	this.ctx.beginPath();
	this.ctx.strokeStyle = 'black';
	this.ctx.moveTo(_xAxisObj.minPixel,this.leftCanvasHeight);
	this.ctx.lineTo(_xAxisObj.maxPixel,this.leftCanvasHeight);
	this.ctx.stroke();
	var aGepPixel = ((this.canvas.width-this.leftCanvasWidth)-this.pad*2)/ _series[this.maxSeriesIndex].s_data.length;
/*	for(var i=0; i < _series[this.maxSeriesIndex].s_data.length; i++){
			var x = i*aGepPixel+this.pad+this.leftCanvasWidth;
			for(var j=0; j < _series.length; j++){
				var y = this.toPhysicalVal(_series[j].s_data[i][1]);
				
				if(i == 0){
				}else{
					this.ctx.beginPath();
					this.ctx.strokeStyle = _series[j].s_color;
					this.ctx.moveTo(_series[j].x_pre,_series[j].y_pre);
					this.ctx.lineTo(x,y);this.ctx.stroke();
				}
				_series[j].x_pre = x;
				_series[j].y_pre = y;
			}
	}*/
	for(var j=0; j < _series.length; j++){
		this.ctx.beginPath();
		this.ctx.strokeStyle = _series[j].s_color;
		for(var i=0; i < _series[this.maxSeriesIndex].s_data.length; i++){
				var x = i*aGepPixel+this.pad+this.leftCanvasWidth;
				var y = this.toPhysicalVal(_series[j].s_data[i][1]);				
				if(i == 0){
					this.ctx.moveTo(x,y);
				}else{
					this.ctx.lineTo(x,y);
				}
		}
		this.ctx.stroke();
	}
}


/*
 * series전체의 min,max구하기
 */
MbaseChart.prototype.getMinMax = function(series) {
	var min;
	var max;
	for(var i=0; i < series.length; i++){
		for(var j=0; j < series[i].s_data.length; j++){
			if(i == 0 && j == 0){
				min = series[i].s_data[j][1];
				max = min;
				this.maxSeriesIndex = i;
			}else{
				if(min >  series[i].s_data[j][1]){
					min =  series[i].s_data[j][1];	
				}else if(max <  series[i].s_data[j][1]){
					max =  series[i].s_data[j][1];				
				}			
				
				if(series[this.maxSeriesIndex].s_data.length < series[i].s_data.length){
					this.maxSeriesIndex = i;
				}
			}
		}
	}

		
	this.yAxisObj.yStart = this.leftCanvasHeight;
	this.yAxisObj.yEnd = 20;//top 20picxel padding
	this.yAxisObj.min = min;
	this.yAxisObj.max = max;
		
	return {'min':min,'max':max};
}


MbaseChart.prototype.makeTitle = function(_title,_color) {
var rect_height = this.xAxisObj.fontSize;	
var space = 3;
var seriesBox_width =space;
//for(var k=0; k < this.series.length; k++){
	//var sObj = this.series[k];
	var n = _title;
	this.centerObj.centerCtx.font = this.tooltip_font;
	var metrics = this.centerObj.centerCtx.measureText(n);
	//seriesBox_width += 12;
	seriesBox_width += space+metrics.width;
//}
var startx = (this.bottomCanvas.width-seriesBox_width)/2;
var seriesBox_width2 = startx+space;


	this.bufferCtx.fillStyle = 'rgba(255,255,255,1)';
	//this.bufferCtx.fillRect(startx,rect_height+this.titleBoxHeight/2,seriesBox_width,rect_height+this.titleBoxHeight);
	this.bufferCtx.fillRect(startx,1,seriesBox_width,rect_height+this.titleBoxHeight);
	this.bufferCtx.stroke();

	var n = _title;
	
	this.setLine(this.bufferCtx,1);
	this.bufferCtx.font = this.tooltip_font;
	this.bufferCtx.fillStyle = "rgba(0,0,0,0.1)";
	this.bufferCtx.strokeStyle = "rgba(0,0,0,0.1)";
	this.bufferCtx.font = this.tooltip_font;
	var metrics = this.bufferCtx.measureText(n);

	
	this.bufferCtx.fillStyle = "black";
/*	this.bufferCtx.fillText(n,
			seriesBox_width2,
			rect_height*2+this.titleBoxHeight);//text�좎룞�쇿뜝�꾩뫊占쎈�泥롥뜝�몃Ь�⑥��� �꾩룆踰∽옙�륁삕�좎룞�숃쥈�놁삕 �リ옇�ｅ뜝占�
*/	
	this.bufferCtx.fillText(n,
			seriesBox_width2,
			rect_height*2-4);//text�좎룞�쇿뜝�꾩뫊占쎈�泥롥뜝�몃Ь�⑥��� �꾩룆踰∽옙�륁삕�좎룞�숃쥈�놁삕 �リ옇�ｅ뜝占�
	seriesBox_width2 += space+metrics.width;
	//this.bufferCtx.strokeRect(startx,rect_height+this.titleBoxHeight/2,seriesBox_width,rect_height+this.titleBoxHeight);
	this.bufferCtx.strokeRect(startx,1,seriesBox_width,rect_height+this.titleBoxHeight);

}




MbaseChart.prototype.drawDottedLine = function(centerObj,tik_x,yAxisObj,dot_length) {
	for(var i=yAxisObj.yStart; i > yAxisObj.yEnd; i=i-dot_length*2 ){
		centerObj.centerCtx.beginPath();
		this.setLine(centerObj.centerCtx,1);centerObj.centerCtx.moveTo(tik_x,i);centerObj.centerCtx.lineTo(tik_x,i-dot_length);centerObj.centerCtx.stroke();centerObj.centerCtx.closePath();	
	}
		
}



MbaseChart.prototype.zoomDataSetter = function(_dataArr2,j,aArr) {
	_dataArr2[j++] = aArr;
	
}

MbaseChart.prototype.setZoomData = function(seriesArr,xAxisObj,isCeil,availLog,isHalf) {
	

	var zoomObj = {};

	var startFlag = false;
	var _dataArr2_series = new Array();
	
	var mainArr;//�좎럡�ｏ옙醫묒삕�⑤슢彛붷뜝�덈뼬�좑옙�띠룊�숋옙節녿Ь占쏙옙爰믥춯�る폁�깍옙

	for(var i=0;i < seriesArr.length; i++){//seriesArr�좎룞�쇿뜝�뚮츊占쎄내彛⑼옙�쀫빰�좎럩瑗뜹퐲酉귥삕占쎄퉮踰�data array!
		
		if(mainArr == null){
			mainArr = seriesArr[i];
			this.maxSeriesIndex = i;
		}else if(mainArr.length < seriesArr[i].length){
			mainArr = seriesArr[i];
			this.maxSeriesIndex = i;
		}
	}
	
	var _dataArr2 = new Array();
	var j = 0;

	if(this.dataType == 1){
		//1�띠룊�셶alue嶺뚮씭�ｏ옙��뿉�좎뜽琉껓옙�묕옙�쇿뜝�뀁물占쎈슣��
/*		for(var k=0; k < mainArr.length; k++){
			var aArr = new Array();
			for(var i=0;i < seriesArr.length; i++){
				aArr[i] = [k+1,seriesArr[i][k],0];
			}

			if(this.zoom == 2){
				if(xAxisObj.min ==  k && xAxisObj.max ==  k){		
					_dataArr2[j++] = aArr;
					break;
				}else if(xAxisObj.min ==  k){
					startFlag = true;
					if(isCeil){
						if(k-1 > -1){
							var aArr_1 = new Array();
							for(var i=0;i < seriesArr.length; i++){
								aArr_1[i] = seriesArr[i][k-1];
							}
														
							_dataArr2[j++] = aArr_1;
						}					
					}				
					_dataArr2[j++] = aArr;
				}else if(xAxisObj.max ==  k){
					_dataArr2[j++] = aArr;
					if(isCeil){
						if(k+1 < mainArr.length){
							var aArr1 = new Array();
							for(var i=0;i < seriesArr.length; i++){
								aArr1[i] = seriesArr[i][k+1];
							}
							
							_dataArr2[j++] = aArr1;
						}					
					}
					startFlag = false;
					break;
				}else{
					if(startFlag){
						_dataArr2[j++] = aArr;
					}
				}						
			}else{
				_dataArr2[j++] = aArr;
			}
		}		*/
	}else{
		if(this.arrow){
			if(this.zoom == 1){
				this.sortArr = new Array();
				for(var kk=5; kk> 0; kk--){
					this.sortArr.push([0,kk,1]);
				}
				
			}
		}

		

		
		for(var k=0; k < mainArr.length; k++){
			var aArr = new Array();
			for(var i=0;i < seriesArr.length; i++){
				if(typeof seriesArr[i][k] == 'undefined'){
				}
				
				aArr[i] = seriesArr[i][k];
				if(this.arrow){
					if(this.zoom == 1){
						this.sort(this.sortArr,aArr,i,j);
					}	
				}

			}

			if(this.zoom == 2){
				if(xAxisObj.min ==  k && xAxisObj.max ==  k){
					_dataArr2[j++] = aArr;
					break;
				}else if(xAxisObj.min ==  k){
					startFlag = true;		
					_dataArr2[j++] = aArr;
				}else if(xAxisObj.max ==  k){
					_dataArr2[j++] = aArr;
					startFlag = false;
					break;
				}else{
					if(startFlag){
						_dataArr2[j++] = aArr;
					}
				}						
			}else{

				_dataArr2[j++] = aArr;
			}
			
		}
		
	}
	

	var cw;
	if(this.halfXAxis){
		cw = this.centerCanvas.width/2;
		xAxisObj.tikGepLength = ((cw/(this.leftIndexs-1)));//0占쏙옙1揶쏆뮆以�占썬끉堉긷첎占쏙옙嚥∽옙
		xAxisObj.tikGepLength2 = ((cw/(_dataArr2.length-this.leftIndexs)));
	}else{
		cw = this.centerCanvas.width;
		if(_dataArr2.length == 1){
			xAxisObj.tikGepLength = ((cw/(_dataArr2.length+1)));
		}else{
			xAxisObj.tikGepLength = ((cw/_dataArr2.length));
		}	
	}
	return {'data':_dataArr2,'sortData':this.sortArr,'maxSeriesIndex':this.maxSeriesIndex};
}

MbaseChart.prototype.sort = function(sortArr,aArr,i,k) {
	var val = aArr[i][1];
	for(var jj=0; jj < sortArr.length; jj++){
		if(val > sortArr[jj][1]){
			for(var o=sortArr.length-1; o > jj-1; o--){
				sortArr[o] = sortArr[o-1];
			}
			sortArr[jj] = aArr[i];
			sortArr[jj][3] = k;
			break;
		}
	}
	return sortArr;
}


MbaseChart.prototype.drawXAxis_spline_draw = function(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,z,_dataArr2,index) {
	
	if(series_arr[z].s_draw){
		var circle_size;
		if(_dataArr2.length < 20){
			circle_size = series_arr[z].s_sizeDefault;
		}else if(_dataArr2.length > 19 && _dataArr2.length < 40  ){
			circle_size = series_arr[z].s_sizeDefault-1;
		}else if(_dataArr2.length > 39 && _dataArr2.length < 60  ){
			circle_size = series_arr[z].s_sizeDefault-2;
		}else if(_dataArr2.length > 59 && _dataArr2.length < 80  ){
			circle_size = series_arr[z].s_sizeDefault-3;
		}else if(_dataArr2.length > 79 && _dataArr2.length < 100  ){
			circle_size = series_arr[z].s_sizeDefault-3;
		}else if(_dataArr2.length > 99 && _dataArr2.length < 120  ){
			circle_size = series_arr[z].s_sizeDefault-3;
		}else if(_dataArr2.length > 119 && _dataArr2.length < 140  ){
			circle_size = series_arr[z].s_sizeDefault-4;
		}else if(_dataArr2.length > 139 && _dataArr2.length < 160  ){
			circle_size = series_arr[z].s_sizeDefault-4;	
		}else if(_dataArr2.length > 159 && _dataArr2.length < this.centerCanvas.width  ){
			circle_size = series_arr[z].s_sizeDefault-4;				
		}else{
			circle_size = 0;
		}
		
		//bar占쏙옙占쎈벡��drawing占쎄낯�쒙옙占�
		if(series_arr[z].s_chartType == 'bar' || (circle_size > 0 && series_arr[z].s_draw)){
			var t_ly;
			//媛쒖닔泥섎━
			if(typeof _dataArr2[index][z] != 'undefined'){
				t_ly =  _dataArr2[index][z][1];
			}else{
				t_ly =  0;		
			}
			
			if(this.type == 'metrix'){
				if(true){
					for(var e=0; e < _dataArr2[index][z].length; e++){
						t_ly =  e;
						//_dataArr2[index][z][e]/4;//256 base to 64 base
						var color = this.colourGradientObject.getColour(_dataArr2[index][z][e]);
						var colorText = 'rgba('+color.red+','+color.green+','+color.blue+',1)';
						this.drawPoint(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,z,_dataArr2,index,circle_size,t_ly,colorText);					
					}	
					
				}

			}else{
				var yo;
				if(this.axis_use_cnt == 2){
					if(series_arr[z].s_axis == 'left'){
						yo = yAxisObj;
					}else if(series_arr[z].s_axis == 'right'){
						yo = this.yAxisObj2;
					}	
				}else{
					yo = yAxisObj;
				}
				this.drawPoint(centerObj,xAxisObj,yo,series_arr,isDrawXAxis,z,_dataArr2,index,circle_size,t_ly,color);
			}	
			
			

		}
	}
	series_arr[z]._dataArr_forAxis[index] = _dataArr2[index][z];
	
}

MbaseChart.prototype.CatmullRomSplines = function(ctx,p0, p1, p2, p3) {
        if (p0 == null) {
                p0x = 0;
                p0y = 0;
        } else {
                p0x = p0._x;
                p0y = p0._y;
        }
        if(p3 == null){
                p3x = 0;
                p3y = 0;
        }else{
                p3x = p3._x;
                p3y = p3._y;
        }

        p2x = p2._x;
        p2y = p2._y;
        p1x = p1._x;
        p1y = p1._y;

 
        d = 15;
        ctx.moveTo(p1x, p1y);
        for (var i = 0; i<=d; i++) {
                t = i/d;
                t2 = t*t;
                t3 = t2*t;
                px = 0.5*((2*p1x)+(-p0x+p2x)*t+(2*p0x-5*p1x+4*p2x-p3x)*t2+(-p0x+3*p1x-3*p2x+p3x)*t3);
                py = 0.5*((2*p1y)+(-p0y+p2y)*t+(2*p0y-5*p1y+4*p2y-p3y)*t2+(-p0y+3*p1y-3*p2y+p3y)*t3);
                ctx.lineTo(px, py);
				
        }
}

MbaseChart.prototype.drawPoint = function(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,z,_dataArr2,index,circle_size,t_ly,color) {
	var t_i =  index;
	var t_lx =  index;
	var t_lx_label;
	
	try{
		if(typeof _dataArr2[index][z] != 'undefined'){
			t_lx_label =  _dataArr2[index][z][0];	
		}
	}catch(e){
		console.log(index+':ERROR z:'+z+':'+_dataArr2[index][z]);
		
	}
	
	var t_x = index*xAxisObj.tikGepLength;
	if(this.halfXAxis && index > this.leftIndexs-1){
    	t_x = this.getXByHalf(index);
    }else{
    	t_x = index*xAxisObj.tikGepLength;
    }	
	
	var t_y;
	if(series_arr[z].s_axis == 'right'){
		t_y = this.toPhysicalVal2(t_ly);
	}else{
		t_y = this.toPhysicalVal(t_ly);
	}	
	
	
	var t_r = circle_size;
	var t_s = 0;
	var t_e = 2 * Math.PI;	
	var arcObject = {
			'x':t_x,
			'y':t_y,
			'r':t_r,
			's':t_s,
			'e':t_e,
			'i':t_i,
			'lx':t_i,
			'lx_label':t_lx_label,
			'ly':t_ly,
			'shape':series_arr[z].s_shape
	};		

	series_arr[z].objectArr.push(arcObject);
	if(this.zoom == 1){
		if(typeof series_arr[z].objectArrOri == 'undefined'){
			series_arr[z].objectArrOri = new Array();
		}
		series_arr[z].objectArrOri.push(arcObject);
	}					
	
	
	//if(this.type != 'line'){
		this.sDot_ctx[z].beginPath();
	//}
	this.setLine(this.sDot_ctx[z],1);
	this.sDot_ctx[z].fillStyle = series_arr[z].s_color;
	this.sDot_ctx[z].strokeStyle = series_arr[z].s_borderColor;
	if(series_arr[z].s_chartType == 'metrix'){
		this.sDot_ctx[z].fillStyle = color;
		this.sDot_ctx[z].strokeStyle = color;
	}
	if(series_arr[z].s_chartType == 'bar'){
		var _x = t_x-(xAxisObj.tikGepLength-2)/2;
		var _y = t_y;
		this.sDot_ctx[z].fillRect(_x, _y,(xAxisObj.tikGepLength-2),this.centerCanvas.height-t_y );
	}else if(series_arr[z].s_chartType == 'metrix'){	
		this.sDot_ctx[z].fillRect(t_x-xAxisObj.tikGepLength/2, t_y-yAxisObj.div/2,xAxisObj.tikGepLength,yAxisObj.div );		
	} else {
		
		this.sDot_ctx[z].arc(t_x, t_y,t_r, 0, 2 * Math.PI, false);
		
	}
	
	this.sDot_ctx[z].fill();
	this.sDot_ctx[z].stroke();
	this.sDot_ctx[z].closePath();
	
}

/*
 * X축 그리기 공통
 */
MbaseChart.prototype.drawXAxis_spline_drawX = function(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,arr,nowIndex,dotted_gep,excep_str,_maxSeriesIndex) {
	if(this.halfXAxis && nowIndex > this.leftIndexs-1){
    	dotted_gep = 1;
    }
	
	if(excep_str == 'start'){
		this.xStartIndex +=  xAxisObj.min;//use metrix case
	}
	
	
	var seriesIndexForXaxis = _maxSeriesIndex;

	
	var seq = nowIndex;
	var divid_rest;
	if(this.type== 'metrix'){
		nowIndex = nowIndex+this.xStartIndex;
		divid_rest = 15;
	}else{
		divid_rest = 0;
	}
	

	var aGep = Math.ceil(dotted_gep);

	if(nowIndex == 0 || nowIndex % aGep == divid_rest || excep_str == 'end' || (this.type == 'metrix') ){
		
		var xTikLabel;
		if(this.type == 'metrix'){
			xTikLabel = (nowIndex+1)*(this.xMax_re/((this.xMax-this.xMin)+1));//index揶쏉옙0�븝옙苑ｏ옙��옙嚥∽옙+1占쏙옙占쎈�釉녑첎誘れ뱽 疫꿸퀣占쏙옙�곗쨮 4嚥∽옙占쎌꼶�삼옙�곷튊占쏙옙
			if(xTikLabel%10 != 0){
				xTikLabel = "";
			}
		}else{
			xTikLabel = this.comma(arr[nowIndex][seriesIndexForXaxis][0]);
		}
		var metrics = centerObj.centerCtx.measureText(xTikLabel);
		var mwidth = metrics.width;

		
		if(this.halfXAxis && (seq > this.leftIndexs-1)){
	    	x_now = this.getXByHalf(seq);
	    }else{
	    	x_now = xAxisObj.tikGepLength*seq;
	    }	
		
		
		this.setLine(xAxisObj.bottomCtx,1);
		xAxisObj.bottomCtx.beginPath();xAxisObj.bottomCtx.moveTo(x_now,0-xAxisObj.tikHalfWidth);
		var x_start = 0;
		var y_start = 0;
		var y_long = (0+yAxisObj.fontSize)+yAxisObj.tikHalfWidth*3+2;
		if(excep_str == 'start'){
			x_start = 0;
			y_start = y_long;
			
			
			if(this.type == 'bar'){
				xAxisObj.bottomCtx.lineTo(x_now,0+xAxisObj.tikHalfWidth*2);
				if(this.xangle){
					x_start = x_now+xAxisObj.fontSize;
					y_start = y_long+mwidth-xAxisObj.fontSize;				
					xAxisObj.bottomCtx.translate(x_start,y_start);
					xAxisObj.bottomCtx.rotate(-90*Math.PI/180);
					xAxisObj.bottomCtx.fillText(xTikLabel,0,0);	
					xAxisObj.bottomCtx.rotate(90*Math.PI/180);	
					xAxisObj.bottomCtx.translate(-x_start, -y_start);					
				}else{
					xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);
				}
				xAxisObj.bottomCtx.stroke();
			}else if(this.type == 'metrix'){
				if(xTikLabel != ''){
					xAxisObj.bottomCtx.lineTo(x_now,0+xAxisObj.tikHalfWidth*2);
					xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);	
					xAxisObj.bottomCtx.stroke();
				}
			}else{
				xAxisObj.bottomCtx.lineTo(x_now,0+xAxisObj.tikHalfWidth*2);
				if(this.xangle){
					x_start = x_now+xAxisObj.fontSize;
					y_start = y_long+mwidth-xAxisObj.fontSize;						
					xAxisObj.bottomCtx.translate(x_start,y_start);
					xAxisObj.bottomCtx.rotate(-90*Math.PI/180);
					xAxisObj.bottomCtx.fillText(xTikLabel,0,0);	
					xAxisObj.bottomCtx.rotate(90*Math.PI/180);	
					xAxisObj.bottomCtx.translate(-x_start, -y_start);					
				}else{
					xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);		
				}
				xAxisObj.bottomCtx.stroke();				
			}
		}else if(excep_str == 'end'){
			x_start = x_now-mwidth;
			y_start = y_long;
			
			if(this.type == 'bar'){
				xAxisObj.bottomCtx.lineTo(x_now,xAxisObj.tikHalfWidth*2);
				if(this.xangle){
					x_start = x_now;
					y_start = y_long+mwidth-xAxisObj.fontSize;					
					xAxisObj.bottomCtx.translate(x_start,y_start);
					xAxisObj.bottomCtx.rotate(-90*Math.PI/180);
					xAxisObj.bottomCtx.fillText(xTikLabel,0,0);	
					xAxisObj.bottomCtx.rotate(90*Math.PI/180);	
					xAxisObj.bottomCtx.translate(-x_start, -y_start);					
				}else{
					xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);	
				}
	
				xAxisObj.bottomCtx.stroke();
			}else if(this.type == 'metrix'){
				if(xTikLabel != ''){
					xAxisObj.bottomCtx.lineTo(x_now,xAxisObj.tikHalfWidth*2);
					xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);	
					xAxisObj.bottomCtx.stroke();					
				}
			}else{
				xAxisObj.bottomCtx.lineTo(x_now,xAxisObj.tikHalfWidth*2);
				if(this.xangle){
					x_start = x_now;
					y_start = y_long+mwidth-xAxisObj.fontSize;
					xAxisObj.bottomCtx.translate(x_start,y_start);
					xAxisObj.bottomCtx.rotate(-90*Math.PI/180);
					xAxisObj.bottomCtx.fillText(xTikLabel,0,0);	
					xAxisObj.bottomCtx.rotate(90*Math.PI/180);	
					xAxisObj.bottomCtx.translate(-x_start, -y_start);
				}else{
					xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);	
				}
				xAxisObj.bottomCtx.stroke();
			}
		}else{
			//餓λ쵌而�..........................................................................
			x_start = x_now-mwidth/2;
			y_start = y_long;
			
			var xWidth;
			var gepLength = xAxisObj.tikGepLength;
			var gepLength2;
			var dG;
			var condition;
		    if(this.halfXAxis){
		    	xWidth = this.centerCanvas.width;
		    	gepLength2 = xAxisObj.tikGepLength2;
		    	dG = 1;
		    	condition = true;
		    }else{
		    	xWidth = this.centerCanvas.width;
		    	gepLength2 = xAxisObj.tikGepLength;
		    	dG = dotted_gep;
		    	condition = (x_now < (xWidth-gepLength2*dG- mwidth*0.6));
		    }			
			
			if(this.type == 'metrix' || condition){
				if(this.type == 'bar'){
					xAxisObj.bottomCtx.lineTo(x_now,0+xAxisObj.tikHalfWidth*2);
					if(this.xangle){
						x_start = x_now+xAxisObj.fontSize/2;
						y_start = y_long+mwidth-xAxisObj.fontSize;
						xAxisObj.bottomCtx.translate(x_start,y_start);
						xAxisObj.bottomCtx.rotate(-90*Math.PI/180);
						xAxisObj.bottomCtx.fillText(xTikLabel,0,0);	
						xAxisObj.bottomCtx.rotate(90*Math.PI/180);	
						xAxisObj.bottomCtx.translate(-x_start, -y_start);						
					}else{
						xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);	
					}					
					xAxisObj.bottomCtx.stroke();
				}else if(this.type == 'metrix'){
					if(xTikLabel != ''){
						xAxisObj.bottomCtx.lineTo(x_now,0+xAxisObj.tikHalfWidth*2);
						xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);	
						xAxisObj.bottomCtx.stroke();					
					}
				}else{
					xAxisObj.bottomCtx.lineTo(x_now,0+xAxisObj.tikHalfWidth*2);
					if(this.xangle){
						x_start = x_now+xAxisObj.fontSize/2;
						y_start = y_long+mwidth-xAxisObj.fontSize;
						xAxisObj.bottomCtx.translate(x_start,y_start);
						xAxisObj.bottomCtx.rotate(-90*Math.PI/180);
						xAxisObj.bottomCtx.fillText(xTikLabel,0,0);
						xAxisObj.bottomCtx.rotate(90*Math.PI/180);	
						xAxisObj.bottomCtx.translate(-x_start, -y_start);						
					}else{
						xAxisObj.bottomCtx.fillText(xTikLabel,x_start,y_start);		
					}
					xAxisObj.bottomCtx.stroke();

				}

			}
		}
		
			
	}
};

MbaseChart.prototype.getXByHalf = function(_seq){
	return (this.xAxisObj.tikGepLength*(this.leftIndexs-1))+(this.xAxisObj.tikGepLength2*(_seq-(this.leftIndexs-1)));
}

MbaseChart.prototype.setLine = function(obj,width,isTrans){
	try{
		if(isTrans){
			obj.translate(0.5, 0.5);
		}
		
		if(width == null){
			obj.lineWidth = 1;
		}else{
			obj.lineWidth = width;
		}
	}catch(e){
		console.dir(e);
	}

};

MbaseChart.prototype.setStroke = function(obj,isTrans){
	try{
		obj.stroke();
		if(isTrans){
			obj.translate(-0.5, -0.5);
		}
	}catch(e){
		console.dir(e);
	}

};







MbaseChart.prototype.drawXAxis_spline2 = function(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis) {
	this.bufferCtx.fillStyle = 'yellow';
	this.bufferCtx.fillRect(0,0,this.centerCanvas.width, this.centerCanvas.height);
	
	this.leftCtx.fillStyle = 'red';
	this.leftCtx.fillRect(0,0,this.leftCanvas.width, this.leftCanvas.height);

	this.setLine(this.bufferCtx,1);
	this.bufferCtx.strokeStyle = "black";	
	this.bufferCtx.moveTo(50,100);
	this.bufferCtx.lineTo(100,100);
	this.bufferCtx.stroke();
	
	if(isDrawXAxis){
		xAxisObj.bottomCtx.clearRect(0, 0, this.bottomCanvas.width, this.bottomCanvas.height);
		xAxisObj.bottomCtx.beginPath();
		xAxisObj.bottomCtx.fillStyle = 'pink';
		xAxisObj.bottomCtx.fillRect(0,0,this.bottomCanvas.width, this.bottomCanvas.height);
		
		this.setLine(xAxisObj.bottomCtx,1);
		xAxisObj.bottomCtx.strokeStyle = "black";	
		xAxisObj.bottomCtx.moveTo(0,0);
		xAxisObj.bottomCtx.lineTo(this.bottomCanvas.width,0);
		xAxisObj.bottomCtx.stroke();
		
		//centerObj.centerCtx.drawImage(this.bottomCanvas,this.lyWidth,this.centerCanvas.height);
	}	
	this.fullCtx.drawImage(this.leftCanvas,0,0);
}

MbaseChart.prototype.drawXAxis_spline = function(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis) {
	console.time('draw');
	//this.drawXAxis_spline_cat(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis);
	this.drawXAxis_spline_test(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis);
	console.timeEnd('draw');
}



/*
 * x축을 선회하며 그림을 그린다.
 */
MbaseChart.prototype.drawXAxis_spline_cat = function(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis) {

	var mainArr = new Array();
	for(var i=0; i< series_arr.length; i++){
		this.s_ctx[i].clearRect(0, 0, this.s[i].width, this.s[i].height);
		this.sDot_ctx[i].clearRect(0, 0, this.sDot[i].width, this.sDot[i].height);
		this.s_ctx[i].strokeStyle = series_arr[i].s_color;
		this.setLine(this.s_ctx[i],series_arr[i].s_lineWidth);
		
		if(series_arr[i]._dataArr_forAxis != null && series_arr[i]._dataArr_forAxis.length > 0){
			mainArr[i] = series_arr[i]._dataArr_forAxis;series_arr[i]._dataArr_forAxis2 = mainArr[i]; 
		}else{
			mainArr[i] = series_arr[i].s_data;
		}
	}
	if(isDrawXAxis){
		xAxisObj.bottomCtx.clearRect(0, 0, this.bottomCanvas.width, this.bottomCanvas.height);

		xAxisObj.bottomCtx.beginPath();
		this.setLine(xAxisObj.bottomCtx,1);
		xAxisObj.bottomCtx.strokeStyle = "black";	
		xAxisObj.bottomCtx.moveTo(0,0);
		xAxisObj.bottomCtx.lineTo(this.centerCanvas.width,0);
		xAxisObj.bottomCtx.stroke();
	}
	
	//분할차트
    if(this.halfXAxis){
		xAxisObj.bottomCtx.beginPath();
		this.setLine(xAxisObj.bottomCtx,1);
		xAxisObj.bottomCtx.strokeStyle = "black";	
		xAxisObj.bottomCtx.moveTo(this.centerCanvas.width/2,0);
		xAxisObj.bottomCtx.lineTo(this.centerCanvas.width/2,this.centerCanvas.height);
		xAxisObj.bottomCtx.stroke();
		
		this.bufferCtx.beginPath();
		this.setLine(this.bufferCtx,1);
		this.bufferCtx.strokeStyle = "black";	
		this.bufferCtx.moveTo(this.centerCanvas.width/2,0);
		this.bufferCtx.lineTo(this.centerCanvas.width/2,this.centerCanvas.height);
		this.bufferCtx.stroke();
		this.bufferCtx.closePath();
    }
	

	
	
	this.setLine(this.bufferCtx,1);
	this.bufferCtx.font = this.y_value_font;
	var x1 = {};
	var x2 = {};
	var x3 = {};
	//실제 그려질 데이터 가져오기.
	var dataObj = this.setZoomData(mainArr,xAxisObj,false);
	var _dataArr2 = dataObj.data;
	var topArr = _dataArr2;

	
	
	var _dataArr_forAxis_index = 0;
	
	var g = 0;

	var redCount = 0;
	var allCount = 0;
	
	var text='';
	if(topArr != null && topArr.length > 0){
		text = _dataArr2[_dataArr2.length-1][dataObj.maxSeriesIndex][0];
	}
	
	var dotted_gep = this.getDottedGep(topArr,text);
	var show_x_tik = true;
	if(this.canvas.width*0.8 < topArr.length){
		show_x_tik = false;
	}
	
	
	
	
	//var gridFlag = true;
	if(this.xTerms != null){
		for(var i=0; i < this.xTerms.length; i++){
			var addInfoObj = this.xTerms[i];
			if(addInfoObj.s_draw){
				var fromValue = addInfoObj.fromValue;
				var toValue = addInfoObj.toValue;
				var f = xAxisObj.tikGepLength*fromValue;
				var t = xAxisObj.tikGepLength*toValue;

				this.drawLineDash(this.bufferCtx,f,0,t-f,this.centerCanvas.height);
				//this.bufferCtx.fillText(aLabel,0,tmp_alram_y-4);
				//gridFlag = false;
				
			}

		}
	}
	
	

	var startIndex = 0;

	if(isDrawXAxis){
		xAxisObj.bottomCtx.beginPath();
		xAxisObj.bottomCtx.font = this.x_label_font;
		xAxisObj.bottomCtx.fillStyle = this.x_label_font_color;
		xAxisObj.bottomCtx.fillText(this.x_label,this.centerCanvas.width-this.bufferCtx.measureText(this.x_label).width-8,this.bottomCanvas.height-1);
		xAxisObj.bottomCtx.stroke();
	}
	
	xAxisObj.bottomCtx.font = this.x_value_font;
	xAxisObj.bottomCtx.fillStyle = this.x_value_font_color;
	var ceil_dotted_gep;

	//loop section
	var loopCnt;
    if(this.halfXAxis){
    	loopCnt = _dataArr2.length;
    }else{
    	//loopCnt = _dataArr2.length-1;
    	loopCnt = _dataArr2.length;
    }

 	var spline_end = false;
 	//실데이터를 loop돌면서 그린다.
	for(var i=startIndex; i < loopCnt; i++){

				
		
		
		
				
				var valueArr = _dataArr2[i];
				var tik_x;
				if(this.halfXAxis && (i > (this.leftIndexs-1))){
			    	tik_x = this.getXByHalf(i);//offset2
			    }else{
			    	tik_x = xAxisObj.tikGepLength*i;//offset1
			    }

				if(i == 0){
					this.drawXAxis_spline_drawX(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,topArr,i,dotted_gep,'start',dataObj.maxSeriesIndex);					
				}else if(i == _dataArr2.length-1){
					this.drawXAxis_spline_drawX(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,topArr,i,dotted_gep,'end',dataObj.maxSeriesIndex);	
				}else{
					this.drawXAxis_spline_drawX(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,topArr,i,dotted_gep,null,dataObj.maxSeriesIndex);
				}
				
				


			if(i < topArr.length){
				for(var z=0; z< series_arr.length; z++){
					if(i == 0){
						series_arr[z].objectArr = new Array();
						series_arr[z].objectArrOri = new Array(); 
						if(series_arr[z].s_chartType == 'spline' || series_arr[z].s_chartType == 'line'){
							this.s_ctx[z].beginPath();
							this.s_ctx[z].fillStyle = series_arr[z].s_color;
							this.s_ctx[z].strokeStyle = series_arr[z].s_color;				
						}
						series_arr[z]._dataArr_forAxis = new Array();	
					}

				
				
				
					if(series_arr[z].s_draw){
						var canDraw = true;
						var stype;
						if(
								(series_arr[z].s_chartType == 'spline' && _dataArr2.length < 3) 
							||
								(series_arr[z].s_chartType == 'spline' && _dataArr2.length > this.centerCanvas.width) 								
						){
							stype = 'line';
						}else{
							stype = series_arr[z].s_chartType;
						}
						
						if(!spline_end && stype == 'spline'){
							var hcon = this.halfXAxis && i > this.leftIndexs-1;
							var v = xAxisObj.tikGepLength;
							
							var p_0;
							var p_1;
							var p_2;
							var p_3;
							if(i == 0){
								if(typeof _dataArr2[i][z] != 'undefined'){
									p_1 = [(hcon)? this.getXByHalf(i):v*i,(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i][z][1]):this.toPhysicalVal(_dataArr2[i][z][1])];
									p_0 = p_1;
								}else{
									p_1 = null;
									p_0 = null;
								}	
								if(typeof _dataArr2[i+1][z] != 'undefined'){
									p_2 = [(hcon)? this.getXByHalf(i+1):v*(i+1),(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i+1][z][1]):this.toPhysicalVal(_dataArr2[i+1][z][1])];
								}else{
									p_2 = null;
								}	
								if(typeof _dataArr2[i+2][z] != 'undefined'){
									p_3 = [(hcon)? this.getXByHalf(i+2):v*(i+2),(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i+2][z][1]):this.toPhysicalVal(_dataArr2[i+2][z][1])];
								}else{
									p_3 = null;
								}									
							}else if(i == _dataArr2.length -2){
								if(typeof _dataArr2[i][z] != 'undefined'){
									p_1 = [(hcon)? this.getXByHalf(i):v*i,(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i][z][1]):this.toPhysicalVal(_dataArr2[i][z][1])];
								}else{
									p_1 = null;
								}								
								if(typeof _dataArr2[i-1][z] != 'undefined'){
									p_0 = [(hcon)? this.getXByHalf(i-1):v*(i-1),(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i-1][z][1]):this.toPhysicalVal(_dataArr2[i-1][z][1])];
								}else{
									p_0 = null;
								}										
								if(typeof _dataArr2[i+1][z] != 'undefined'){
									p_2 = [(hcon)? this.getXByHalf(i+1):v*(i+1),(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i+1][z][1]):this.toPhysicalVal(_dataArr2[i+1][z][1])];
									p_3 = p_2;
								}else{
									p_2 = null;
									p_3 = null;
								}
								
								if(z == series_arr.length-1){
									spline_end = true;
								}
							}else{
								if(typeof _dataArr2[i][z] != 'undefined'){
									p_1 = [(hcon)? this.getXByHalf(i):v*i,(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i][z][1]):this.toPhysicalVal(_dataArr2[i][z][1])];									
								}else{
									p_1 = null;
								}	
								
								if(typeof _dataArr2[i-1][z] != 'undefined'){
									p_0 = [(hcon)? this.getXByHalf(i-1):v*(i-1),(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i-1][z][1]):this.toPhysicalVal(_dataArr2[i-1][z][1])];									
								}else{
									p_0 = null;
								}	
								
								if(typeof _dataArr2[i+1][z] != 'undefined'){
									p_2 = [(hcon)? this.getXByHalf(i+1):v*(i+1),(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i+1][z][1]):this.toPhysicalVal(_dataArr2[i+1][z][1])];									
								}else{
									p_2 = null;
								}					
								
								if(typeof _dataArr2[i+2][z] != 'undefined'){
									p_3 = [(hcon)? this.getXByHalf(i+2):v*(i+2),(series_arr[z].s_axis == 'right')? this.toPhysicalVal2(_dataArr2[i+2][z][1]):this.toPhysicalVal(_dataArr2[i+2][z][1])];									
								}else{
									p_3 = null;
								}

							}
	
							if(p_0 != null && p_1 != null && p_2 != null && p_3 == null){
								p_3 = p_2;
							}
							
							if(p_0 != null && p_1 != null && p_2 != null && p_3 != null){
								this.CatmullRomSplines(this.s_ctx[z],{_x:p_0[0],_y:p_0[1]},{_x:p_1[0],_y:p_1[1]},{_x:p_2[0],_y:p_2[1]},{_x:p_3[0],_y:p_3[1]});
							}
							
						}else if(stype == 'line'){
							var p_x;
							if(this.halfXAxis && i > this.leftIndexs-1){
						    	p_x = this.getXByHalf(i);
						    }else{
						    	p_x = xAxisObj.tikGepLength*i;
						    }	
							
							if(typeof _dataArr2[i][z] != 'undefined'){
								var p_y = this.toPhysicalVal(_dataArr2[i][z][1]);
								var p_y_pre;
								if(series_arr[z].s_axis == 'right'){
									p_y = this.toPhysicalVal2(_dataArr2[i][z][1]);
									if(i > 0){
										p_y_pre = this.toPhysicalVal2(_dataArr2[(i-1)][z][1]);
									}else{
										p_y_pre = this.toPhysicalVal2(_dataArr2[i][z][1]);
									}
									
								}else{
									p_y = this.toPhysicalVal(_dataArr2[i][z][1]);
									if(i > 0){
										p_y_pre = this.toPhysicalVal(_dataArr2[(i-1)][z][1]);
									}else{
										p_y_pre = this.toPhysicalVal(_dataArr2[i][z][1]);
									}
									
								}
								var p_x_pre;
								if(this.halfXAxis && (i-1) > this.leftIndexs-1){
							    	p_x_pre = this.getXByHalf(i-1);
							    }else{
							    	p_x_pre = (i-1)*xAxisObj.tikGepLength;
							    }								
								this.s_ctx[z].fillStyle = series_arr[z].s_color;
								this.s_ctx[z].strokeStyle = series_arr[z].s_color;
								this.s_ctx[z].lineTo(p_x,p_y,p_x_pre,p_y_pre);
								this.drawXAxis_spline_draw(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,z,_dataArr2,i);
							}
							
							
						}
						
						//case of independent series
						if(typeof _dataArr2[i][z] != 'undefined'){
							this.drawXAxis_spline_draw(centerObj,xAxisObj,yAxisObj,series_arr,isDrawXAxis,z,_dataArr2,i);
						}
						
					}	
					
					
					
					
					if(i == (_dataArr2.length -1) && series_arr[z].s_draw){
						this.s_ctx[z].stroke();
						this.sDot_ctx[z].drawImage(this.s[z],0, 0);//<----slow area!
						this.bufferCtx.drawImage(this.sDot[z],0, 0);
					}	
					
					
					
				}	
				
			}


			
	}//for	 

	xAxisObj.bottomCtx.stroke();
 
	
	this.drawXAxis = false;
	if(this.arrow){
		this.bufferCtx.beginPath();
		this.bufferCtx.fillRect(150,40,1,1);
	    this.bufferCtx.strokeStyle = '#000000';     
	    this.bufferCtx.stroke();
	    var arrow_width = 30;
	    var arrow_height = 25;
	    var startFlag = false;
	    for(var z=this.sortArr.length-1; z > -1; z--){
	    	var x = this.sortArr[z][3];
	    	var xlabel = this.sortArr[z][0];
	    	var y = this.sortArr[z][1];
			var t_x = x*xAxisObj.tikGepLength;
			var t_y = this.toPhysicalVal(y); 
			//var degree = this.getArrowPosition(t_x,t_y,arrow_width,arrow_height,5);
			var degree = 90;
			//if(_dataArr2[0][0][0] <= x && _dataArr2[_dataArr2.length-1][0][0] >= x){
			//if(x < _dataArr2.length){
				//var x_phsic = (x-_dataArr2[0][0][0])*xAxisObj.tikGepLength;
				
				var x_phsic = (x-this.xStartIndex)*xAxisObj.tikGepLength;
				
				if(z == 0){
					this.drawArrow(x_phsic,t_y,degree,arrow_width,arrow_height,"#ff0000");
					this.showInfo(this.sortArr[z],x_phsic,t_y);
				}else{
					degree = this.getArrowPosition(t_x,t_y,arrow_width,arrow_height,5);
					this.drawArrow(x_phsic,t_y,degree,arrow_width,arrow_height,"rgba(145,34,67,0.5)");
				}
				
			//}
				
	    }
	}
	

};				


MbaseChart.prototype.showInfo = function(obj,x,y) {
	var txt = obj[0]+' : '+this.comma(obj[1]);
	var metrics = this.bufferCtx.measureText(txt);
	var mwidth;
    mwidth = metrics.width;
    this.bufferCtx.fillStyle = "rgba(255,255,200,0.5)";
    var _x = x+10;
    var _y = y-20
    var margin = 10;
    if(x > this.centerCanvas.width/2){
    	_x = x- (mwidth+mwidth/2)-margin;
    }
    
	this.bufferCtx.fillRect(_x,
			_y,
			mwidth+mwidth/2,
			12);
	this.bufferCtx.fill();
	this.setLine(this.bufferCtx,0.1);
	this.bufferCtx.font = this.y_label_font_weight+' '+'8'+'px '+this.y_label_font_name;
	this.bufferCtx.fillStyle = "rgba(0,0,0,1)";
	this.bufferCtx.strokeStyle = "rgba(0,0,0,1)";
	this.bufferCtx.fillText(txt,_x+margin,_y+10);	
	this.bufferCtx.strokeRect(_x,
			_y,
			mwidth+mwidth/2,
			12);
	
}		

MbaseChart.prototype.getArrowPosition = function(lastX,lastY,tooltipRectX,tooltipRectY,toolTipMargin) {
	var idex = 0;
			if(lastX < this.centerCanvas.width/2){
				if(lastY < this.centerCanvas.height/2){
					idex = 225;
				}else{
					idex = 135;
				}
			}else{
				if(lastY < this.centerCanvas.height/2){
					idex = 315;
				}else{
					idex = 45;					
				}	
			}
	return idex;
}		

MbaseChart.prototype.drawArrow = function(x,y,_degree,width,height,_color) {
	this.bufferCtx.fillStyle = _color;
	//this.bufferCtx.save();
    //Translate canvas to center
    this.bufferCtx.translate(x,y);
    // Rotate
	this.bufferCtx.lineWidth = 1;
    this.bufferCtx.rotate(_degree*Math.PI/180);
    // Create new drawing
    this.bufferCtx.beginPath();

    this.bufferCtx.moveTo(0, 0); 
    this.bufferCtx.lineTo(0-width/2, 0 + height/3);
    this.bufferCtx.lineTo(0-width/2, 0 + height/5); 
    
    this.bufferCtx.lineTo(0-width, 0 + height/5); 
    this.bufferCtx.lineTo(0-width, 0 - height/5);
    
    this.bufferCtx.lineTo(0-width/2, 0 - height/5);
    this.bufferCtx.lineTo(0-width/2, 0 - height/3);
    this.bufferCtx.lineTo(0, 0); 
    
    this.bufferCtx.closePath();
    
    
    this.bufferCtx.strokeStyle = '#000000';     
    
    
    this.bufferCtx.stroke();
    this.bufferCtx.rotate(-_degree*Math.PI/180);
    // Put it on the canvas
    //this.bufferCtx.restore();

    
    this.bufferCtx.translate(-x, -y);
    this.bufferCtx.fill();

   
}

MbaseChart.prototype.getDottedGep = function(_dataArr2,_text) {
	this.xAxisObj.bottomCtx.font = this.x_value_font;
	var metrics = this.xAxisObj.bottomCtx.measureText(""+_text);
    var mwidth = metrics.width+metrics.width*0.8;
    var maxTikCnt = this.canvas.width/mwidth;
    if(this.halfXAxis){
    	maxTikCnt = (this.canvas.width/2)/mwidth;
    }else{
    	maxTikCnt = this.canvas.width/mwidth;
    }
    
    if(this.type == 'metrix'){
    	maxTikCnt = 4;
    }
    var dotted_gep;
    if(_dataArr2.length > maxTikCnt){
        if(this.halfXAxis){
        	dotted_gep = this.leftIndexs/maxTikCnt;
        }else{
        	dotted_gep = _dataArr2.length/maxTikCnt;
        }
         	
    }else{
    	dotted_gep = 1;
    }
	return dotted_gep;
}


MbaseChart.prototype.init = function(options) {
	this.options = options;
	
	this.maxSeriesIndex = 0;
	this.backgroundColor = options.backgroundColor;
	this.yMin = options.yMin;
	this.yMax = options.yMax;
	this.xMin = options.xMin;
	this.xMax = options.xMax;	
	
	this.yMin_re = options.yMin_re;
	this.yMax_re = options.yMax_re;
	this.xMin_re = options.xMin_re;
	this.xMax_re = options.xMax_re;		
			
	this.yDivCnt = options.yDivCnt;	
			
	this.xangle = options.xangle;
	this.leftIndexs = options.leftIndexs;
	this.halfXAxis = options.halfXAxis;
	this.axis_use_cnt = options.axis_use_cnt;
	this.useRightAxisOnly = options.useRightAxisOnly;
	this.arrow = options.arrow;
	this.dataType = options.dataType;
	this.alramLine = options.alramLine;
	this.alramValue = options.alramValue;
	this.yAxis_limit = options.yAxis_limit;
	this.max_check = options.max_check;
	
	this.series = options.series;
	this.yBaseLines = options.yBaseLines;
	this.xTerms = options.xTerms;
	
	this.stock_color = options.stock_color;
	this.tooltip_font = options.tooltip_font;
	this.title = options.title;
	this.titleBoxHeight = 6;
	this.lyWidth = options.lyWidth;
	this.ryWidth = options.ryWidth;
	this.bHeight = options.bHeight;
	if(options.tooltip_font_size == null) options.tooltip_font_size = '10';
	this.tooltip_font_size = parseFloat(options.tooltip_font_size);	
	
	this.x_label_font_weight = options.x_label_font_weight;
	this.x_label_font_size = options.x_label_font_size;
	this.x_label_font_name = options.x_label_font_name;	
	this.x_label_font_color = options.x_label_font_color;	
	this.x_label_font = this.x_label_font_weight+' '+this.x_label_font_size+'px '+this.x_label_font_name;
	
	this.y_label_font_weight = options.y_label_font_weight;
	this.y_label_font_size = options.y_label_font_size;
	this.y_label_font_name = options.y_label_font_name;
	this.y_label_font_color = options.y_label_font_color;	
	this.y_label_font = this.y_label_font_weight+' '+this.y_label_font_size+'px '+this.y_label_font_name;
	
	this.x_value_font_weight = options.x_value_font_weight;
	this.x_value_font_size = options.x_value_font_size;
	this.x_value_font_name = options.x_value_font_name;	
	this.x_value_font_color = options.x_value_font_color;	
	this.x_value_font = this.x_value_font_weight+' '+this.x_value_font_size+'pt '+this.x_value_font_name;
	
	this.y_value_font_weight = options.y_value_font_weight;
	this.y_value_font_size = options.y_value_font_size;
	this.y_value_font_name = options.y_value_font_name;
	this.y_value_font_color = options.y_value_font_color;	
	this.y_value_font = this.y_value_font_weight+' '+this.y_value_font_size+'pt '+this.y_value_font_name;

	
	
	this.x_label = options.x_label;
	this.y_label = options.y_label;
	this.y2_label = options.y2_label;
	this._dataArr = options._dataArr;
	this._dataArr_ori = this._dataArr.slice(0);
	this.type = options.type;
	this.axes_font_size = options.axes_font_size;
	this.leftMargin = options.leftMargin;
	this.rightMargin = options.rightMargin;
	this.topMargin = options.topMargin;
	this.yAxis_x = this.leftMargin;
	this.yAxis_yStart = this.canvasHeight;
	this.yAxis_yEnd = options.topMargin;

	this.yAxis_tik_cnt = options.yAxis_tik_cnt;
	this.tik_half_width = options.tik_half_width;
	this.yAxis_tik_gep_value = options.yAxis_tik_gep_value;	


	this.xAxis_tik_cnt = options.xAxis_tik_cnt;
	this.xAxis_xStart = options.xAxis_xStart;
	this.xAxis_xEnd = this.centerCanvasWidth-this.rightMargin;
	this.xAxis_yEnd = options.yAxis_yEnd;
	
	this.yAxis_length = this.yAxis_yStart - this.yAxis_yEnd;
	this.xAxis_length = this.xAxis_xEnd - this.xAxis_xStart;

	this.xAxis_tik_gep_length = parseFloat(this.xAxis_length)/parseFloat(this.xAxis_tik_cnt);
	this.yAxis_tik_gep_length = parseFloat(this.yAxis_length)/parseFloat(this.yAxis_tik_cnt);
	this.yAxis_yEnd = this.yAxis_yStart - (this.yAxis_tik_gep_length*this.yAxis_tik_cnt);

	/*
	this._dataArr_forAxis = new Array();
	this._dataArr_forAxis2 = new Array();
	*/
	this.zoom = options.zoom;			
	this.radius = options.radius;
	this.zoomStartX;
	this.zoomEndX;
	this.dot_length = options.dot_length;
	
	
	
	this.tooltipRectX = 50;
	this.tooltipRectY = options.tooltipRectY;	
	
	
	this.colour1 = {red: 0,green: 0,blue: 255};
	this.colour2 = {red: 0,green: 255,blue: 255};
	this.colour3 = {red: 0,green: 255,blue: 0};
	this.colour4 = {red: 255,green: 255,blue: 0};
	this.colour5 = {red: 255,green: 0,blue: 0};
	
	
	
	
/*	20%blue 0 0 255
	20%red 255 0 0
	20%gray 189,189,189
	20%orange 255,287,0
	20%green 47,157,39*/
	
	
	
	this.colours = [this.colour1, this.colour2, this.colour3, this.colour4, this.colour5];
	
	this.xgrid = false;
	this.ygrid = false;
	this.xLabels = ['0','90','180','270','360'];
	
	
	this.xAxisObj = {};
	
	this.xAxisObj.xEnd=this.xAxis_xEnd;
	this.xAxisObj.xStart=this.xAxis_xStart;
	this.xAxisObj.tikCnt=this.xAxis_tik_cnt;

	this.xAxisObj.fillStyle="gray";
	this.xAxisObj.fontSize=this.axes_font_size;
	this.xAxisObj.tikHalfWidth = this.tik_half_width;
	this.xAxisObj.tikGepLength = this.xAxis_tik_gep_length;
	this.xAxisObj.tikGepValue = 1;
	this.xAxisObj.length = this.xAxis_length;
	this.xAxisObj.bottomCtx = this.bottomCtx;
	
	this.xAxisObj.min = 0;
	this.xAxisObj.max = 0;

	
	this.yAxisObj = {};
	this.yAxisObj.tikCnt=this.yAxis_tik_cnt;
	this.yAxisObj.xEnd = this.yAxis_yEnd;
	this.yAxisObj.tikGepLength = this.yAxis_tik_gep_length;
	this.yAxisObj.tikGepValue = this.yAxis_tik_gep_value;
	this.yAxisObj.leftFillStyle = "gray";
	this.yAxisObj.tikHalfWidth = this.tik_half_width;
	this.yAxisObj.leftCtx = this.leftCtx;
	this.yAxisObj.fontSize=this.axes_font_size;
	this.yAxisObj.min = 0;
	this.minFlag = false;
	if(options.min != null){
		this.yAxisObj.min = options.min;
		this.minFlag = true;
	}	
	this.yAxisObj.max = 0;
	this.maxFlag = false;
	if(options.max != null){
		this.yAxisObj.max = options.max;
		this.maxFlag = true;		
	}	
	
	this.yAxisObj.yStart = this.leftCanvasHeight;
	this.yAxisObj.yEnd = this.yAxis_yEnd;
	
	this.yAxisObj2 = {};
	this.yAxisObj2.tikCnt=this.yAxis_tik_cnt;
	this.yAxisObj2.xEnd = this.yAxis_yEnd;
	this.yAxisObj2.tikGepLength = this.yAxis_tik_gep_length;
	this.yAxisObj2.tikGepValue = this.yAxis_tik_gep_value;
	this.yAxisObj2.leftFillStyle = "gray";
	this.yAxisObj2.tikHalfWidth = this.tik_half_width;
	this.yAxisObj2.rightCtx = this.rightCtx;
	this.yAxisObj2.fontSize=this.axes_font_size;

	this.yAxisObj2.yStart = this.rightCanvas.height;
	this.yAxisObj2.yEnd = this.yAxis_yEnd;

	this.centerObj = {};
	this.centerObj.centerCtx = this.fullCtx;	
	this.centerObj.centerCtx2 = this.fullCtx2;	
	this.centerObj.fillStyle = "gray";
	this.centerObj.summax = options.summax;
	this.centerObj.summaxInc = options.summaxInc;
	this.centerObj.maxColorRate = 0;
	this.saveObj = {};

	this.bufferOriCtx;
	this.bufferOriLeftCtx; 
	this.bufferOriRightCtx; 
	this.bufferOriBottomCtx;
		
	
	this.lastX=this.centerCanvas.width/2;
	this.lastY=this.centerCanvas.height/2;
	this.dragStart;
	this.dragged;
	this.dragEnd;
	this.sx = this.lastX;
	this.sy = this.lastY;
	
		
}


			
MbaseChart.prototype.getToolTipPosition = function(lastX,lastY,tooltipRectX,tooltipRectY,toolTipMargin) {
	var obj = {};
	var idex = 1;
			if(lastX < this.canvas.width/2){
				if(lastY < this.canvas.height/2){
					idex = 1;
					rect_start_x = lastX;rect_start_y = lastY;
					//rect_start_x -= toolTipMargin;
				}else{
					idex = 3;
					rect_start_x = lastX;rect_start_y = lastY-tooltipRectY;
					rect_start_y -= toolTipMargin;
				}
			}else{
				if(lastY < this.canvas.height/2){
					idex = 2;
					rect_start_x = lastX-tooltipRectX;rect_start_y = lastY;
					rect_start_x -= toolTipMargin;
				}else{
					idex = 4;					
					rect_start_x = lastX-tooltipRectX;rect_start_y = lastY-tooltipRectY;
					rect_start_x -= toolTipMargin;
					rect_start_y -= toolTipMargin;
				}	
			}
	obj.rect_start_x = rect_start_x;
	obj.rect_start_y = rect_start_y;
	return obj;
}			
			
MbaseChart.prototype.saveParams = function() {
	this.saveObj.series = new Array();
	for(var k=0; k < this.series.length; k++){
		var obj = this.series[k];
		this.saveObj.series[k] = jQuery.extend(true, {}, obj);
		if(this.series[k]._dataArr_forAxis != null){
			this.saveObj.series[k]._dataArr_forAxis = this.series[k]._dataArr_forAxis.slice(0);
		}
		if(this.series[k]._dataArr_forAxis2 != null){
			this.saveObj.series[k]._dataArr_forAxis2 = this.series[k]._dataArr_forAxis2.slice(0);
		}		
	}
	this.saveObj._dataArr = this._dataArr.slice(0);
	this.saveObj._dataArr_ori = this._dataArr_ori.slice(0);
	this.saveObj.axes_font_size = this.axes_font_size;
	this.saveObj.leftMargin = this.leftMargin;
	this.saveObj.rightMargin = this.rightMargin;
	this.saveObj.topMargin = this.topMargin;
	this.saveObj.yAxis_x = this.yAxis_x;
	this.saveObj.yAxis_yStart = this.yAxis_yStart;
	this.saveObj.yAxis_yEnd = this.yAxis_yEnd;
	this.saveObj.ctx = this.fullCtx;
	this.saveObj.yAxis_tik_cnt =this.yAxis_tik_cnt;
	this.saveObj.tik_half_width = this.tik_half_width;
	this.saveObj.yAxis_tik_gep_value = this.yAxis_tik_gep_value;	
	this.saveObj.xAxis_tik_cnt = this.xAxis_tik_cnt;
	this.saveObj.xAxis_xStart = this.xAxis_xStart;
	this.saveObj.xAxis_xEnd = this.xAxis_xEnd;
	this.saveObj.xAxis_yEnd = this.xAxis_yEnd;
	this.saveObj.yAxis_length =this.yAxis_length;
	this.saveObj.xAxis_length =this.xAxis_length;
	this.saveObj.xAxis_tik_gep_length = this.xAxis_tik_gep_length;
	this.saveObj.yAxis_tik_gep_length = this.yAxis_tik_gep_length;
	this.saveObj.yAxis_yEnd = this.yAxis_yEnd;
	if(this._dataArr_forAxis != null && this._dataArr_forAxis.length > 0){
		this.saveObj._dataArr_forAxis = this._dataArr_forAxis.slice(0);
	}
	this.saveObj.zoom = this.zoom;			
	this.saveObj.radius =this.radius;
	this.saveObj.xAxisObj = jQuery.extend(true, {}, this.xAxisObj);
	this.saveObj.yAxisObj = jQuery.extend(true, {}, this.yAxisObj);
	this.saveObj.centerObj = jQuery.extend(true, {}, this.centerObj);
}


MbaseChart.prototype.resetParams = function() {
	this.series = new Array();
	for(var k=0; k < this.saveObj.series.length; k++){
		var obj = this.saveObj.series[k];
		this.series[k] = jQuery.extend(true, {}, obj);
		if(this.series[k]._dataArr_forAxis != null){
			this.series[k]._dataArr_forAxis = this.saveObj.series[k]._dataArr_forAxis.slice(0);
		}
		if(this.series[k]._dataArr_forAxis2 != null){
			this.series[k]._dataArr_forAxis2 = this.saveObj.series[k]._dataArr_forAxis2.slice(0);
		}		
	}

	this._dataArr = this.saveObj._dataArr.slice(0);
	this._dataArr_ori = this.saveObj._dataArr_ori.slice(0);
	this.axes_font_size = this.saveObj.axes_font_size;
	this.leftMargin = this.saveObj.leftMargin;
	this.rightMargin = this.saveObj.rightMargin;
	this.topMargin = this.saveObj.topMargin;
	this.yAxis_x = this.saveObj.yAxis_x;
	this.yAxis_yStart = this.saveObj.yAxis_yStart;
	this.yAxis_yEnd = this.saveObj.yAxis_yEnd;
	this.fullCtx = this.saveObj.ctx;
	this.yAxis_tik_cnt =this.saveObj.yAxis_tik_cnt;
	this.tik_half_width = this.saveObj.tik_half_width;
	this.yAxis_tik_gep_value = this.saveObj.yAxis_tik_gep_value;	
	this.xAxis_tik_cnt = this.saveObj.xAxis_tik_cnt;
	this.xAxis_xStart = this.saveObj.xAxis_xStart;
	this.xAxis_xEnd = this.saveObj.xAxis_xEnd;
	this.xAxis_yEnd = this.saveObj.xAxis_yEnd;
	this.yAxis_length =this.saveObj.yAxis_length;
	this.xAxis_length =this.saveObj.xAxis_length;
	this.xAxis_tik_gep_length = this.saveObj.xAxis_tik_gep_length;
	this.yAxis_tik_gep_length = this.saveObj.yAxis_tik_gep_length;
	this.yAxis_yEnd = this.saveObj.yAxis_yEnd;
	if(this.saveObj._dataArr_forAxis != null && this.saveObj._dataArr_forAxis.length > 0){
		this._dataArr_forAxis = this.saveObj._dataArr_forAxis.slice(0);
	}
	this.zoom = this.saveObj.zoom;			
	this.radius =this.saveObj.radius;
	this.xAxisObj = jQuery.extend(true, {}, this.saveObj.xAxisObj)
	this.yAxisObj = jQuery.extend(true, {}, this.saveObj.yAxisObj)
	this.centerObj = jQuery.extend(true, {}, this.saveObj.centerObj)
}

/*
 * 그리기 MAIN
 * 
 */
MbaseChart.prototype.draw = function(__dataArr) {
/*	if(__dataArr != null){		
		this._dataArr = __dataArr;
		this._dataArr_ori = this._dataArr.slice(0);
	}
	this.bottomCtx.clearRect(0, 0, this.bottomCanvas.width, this.bottomCanvas.height);
	this.leftCtx.clearRect(0, 0, this.leftCanvas.width, this.leftCanvas.height);
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.drawXAxis = true;
	if(this.zoom == 1){
		for(var k=0; k < this.series.length;k++){
			this.series[k]._dataArr_forAxis =  null;
		}
	}*/
console.log('drawCharts_test');


/*	for(var i=0;i < seriesArr.length; i++){//seriesArr�좎룞�쇿뜝�뚮츊占쎄내彛⑼옙�쀫빰�좎럩瑗뜹퐲酉귥삕占쎄퉮踰�data array!
		
		if(mainArr == null){
			mainArr = seriesArr[i];
			this.maxSeriesIndex = i;
		}else if(mainArr.length < seriesArr[i].length){
			mainArr = seriesArr[i];
			this.maxSeriesIndex = i;
		}
	}
	*/
	
	this.drawCharts_test();
/*	this.makeInfo();
	this.callbackDraw();
	
	this.takeAPic();
	if(this.zoom == 1){
		this.takeAPic2();
	}*/
};


MbaseChart.prototype.callbackDraw = function() {
	this.fullCtx.drawImage(this.leftCanvas,0, 0);this.fullCtx.drawImage(this.rightCanvas,this.leftCanvas.width+this.centerCanvas.width, 0);
	this.fullCtx.drawImage(this.bufferImage,this.leftCanvas.width, 0); 
	this.fullCtx.drawImage(this.bottomCanvas,this.leftCanvas.width, this.centerCanvas.height);
	 
	
/*	this.fullCtx.fillStyle = 'black';
	this.fullCtx.fillRect(this.leftCanvas.width-1,this.leftCanvas.height,1,1);*/
	
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.ctx.drawImage(this.fullImage,0, 0);
};
/*
 * x축,y축,data를 그림
 * 
 */
MbaseChart.prototype.drawCharts = function() {
	this.bufferCtx.clearRect(0, 0, this.bufferImage.width, this.bufferImage.height);
	this.bufferCtx.fillStyle = this.backgroundColor;
	this.bufferCtx.fillRect(0, 0, this.bufferImage.width, this.bufferImage.height);
	this.bufferCtx.fill();
	var series_arr = this.series;
	//y축 그림
	this.drawYAxis_common(this.centerObj,this.xAxisObj,this.yAxisObj,series_arr);
	
	var leftIndex = -1;
	var rightIndex = -1;
	
	for(var e=0; e < series_arr.length; e++){
		if(series_arr[e].s_axis == 'left'){
			leftIndex = e;
		}else if(series_arr[e].s_axis == 'right'){
			rightIndex = e;
		}
	}
	//x축+data 그림
	if(leftIndex != -1){
		this.drawXAxis_spline(this.centerObj,this.xAxisObj,this.yAxisObj,[series_arr[leftIndex]],this.drawXAxis);
	}
	if(rightIndex != -1){
		this.drawXAxis_spline(this.centerObj,this.xAxisObj,this.yAxisObj2,[series_arr[rightIndex]],this.drawXAxis);
	}
	
	if(leftIndex == -1 && rightIndex == -1){
		this.drawXAxis_spline(this.centerObj,this.xAxisObj,this.yAxisObj,series_arr,this.drawXAxis);
	}
	
}

MbaseChart.prototype.drawCharts_test = function() {
	this.drawYAxis_test(this.centerObj,this.xAxisObj,this.yAxisObj,this.series);
	this.drawXAxis_spline_test(this.series);
	
}

MbaseChart.prototype.makeInfo = function() {
	if(this.type == 'metrix'){
		this.makeColours();
	}else{
		this.makeIndex();
	}
	this.makeTitle(this.title,'black');
}


MbaseChart.prototype.makeIndex = function() {
var rect_height = this.xAxisObj.fontSize;	
var space = 3;
var seriesBox_width =space;
for(var k=0; k < this.series.length; k++){
	var sObj = this.series[k];
	var n = sObj.s_name;
	this.centerObj.centerCtx.font = this.tooltip_font;
	var metrics = this.centerObj.centerCtx.measureText(n);
	seriesBox_width += 12;
	seriesBox_width += space+metrics.width;
}
var startx = (this.bottomCanvas.width-seriesBox_width)/2;
var seriesBox_width2 = startx+space;
for(var k=0; k < this.series.length; k++){
	var sObj = this.series[k];
	var c = sObj.s_color;
	var n = sObj.s_name;
	
	this.setLine(this.xAxisObj.bottomCtx,1);
	this.xAxisObj.bottomCtx.font = this.tooltip_font;
	this.xAxisObj.bottomCtx.fillStyle = "rgba(0,0,0,0.1)";
	this.xAxisObj.bottomCtx.strokeStyle = "rgba(0,0,0,0.1)";
	this.centerObj.centerCtx.font = this.tooltip_font;
	var metrics = this.centerObj.centerCtx.measureText(n);
	this.xAxisObj.bottomCtx.fillStyle = c;
	this.xAxisObj.bottomCtx.fillRect(seriesBox_width2,
			this.bottomCanvas.height-12,
			12,12);
	seriesBox_width2 += 12;
	
	this.xAxisObj.bottomCtx.fillStyle = "black";
	this.xAxisObj.bottomCtx.fillText(n,
			seriesBox_width2,
			this.bottomCanvas.height-1);
	
	seriesBox_width2 += space+metrics.width;
}
//this.xAxisObj.bottomCtx.strokeRect(startx,rect_height+4,seriesBox_width,rect_height+6);
}




MbaseChart.prototype.makeColours = function() {
	var rect_height = this.bottomCanvas.height/3;	
	rect_height += 1;
	var space = 3;
	var seriesBox_width =this.centerCanvas.width/2;

	var startx = (this.bottomCanvas.width-seriesBox_width)/2;
	
	var aWidth = seriesBox_width/256;
	this.xAxisObj.bottomCtx.strokeRect(startx,rect_height+2,seriesBox_width,rect_height+4);
	for(var i=0; i < 255; i++,startx+=aWidth){
		var color = this.colourGradientObject.getColour(i);
		var colorText = 'rgba('+color.red+','+color.green+','+color.blue+',1)';
		this.xAxisObj.bottomCtx.fillStyle = colorText; 
		this.xAxisObj.bottomCtx.fillRect(startx,rect_height+2,aWidth,rect_height+4);
		this.xAxisObj.bottomCtx.fill();
	}
	
	
	
	
}


MbaseChart.prototype.drawGrid = function(startIndex,_dataArr2,dotted_gep) {
	//grid
	var k = 0,x = 0, y = 0;
	for(var i=startIndex; i < _dataArr2.length; i++){
		var tik_x = this.xAxisObj.tikGepLength*i;
		if(i != 0 && (dotted_gep == 0 || i%parseInt(dotted_gep) == 0)){
			this.drawDottedLine(this.centerObj,tik_x,this.yAxisObj,3);
			if(k !=0 && k%2 ==1){
				//draw rect
				this.centerObj.centerCtx.beginPath();
				this.setLIne(this.centerObj.centerCtx,1);
				this.centerObj.centerCtx.fillStyle = "rgba(221,221,221,0.05)";
				this.centerObj.centerCtx.fillRect(x,y,tik_x-x,this.canvas.height);
				this.centerObj.centerCtx.fill();
				this.centerObj.centerCtx.stroke();		
				now = (x+tik_x-x);
			}		
			x = tik_x;
			y = 0;
			k++;
		}	
	}//for	 
	this.bufferBackgroundCtx.clearRect(0, 0, this.bufferBackgroundImage.width, this.bufferBackgroundImage.height);
	this.bufferBackgroundCtx.drawImage(this.bufferImage,0, 0); 
	/*	M.bufferCtx.clearRect(0, 0, M.bufferImage.width, M.bufferImage.height);
	M.bufferCtx.drawImage(M.bufferBackgroundImage,0, 0);  
	M.ctx.drawImage(M.bufferImage,0, 0);
	*/
	
	
}

MbaseChart.prototype.resizeBuffers = function(canvas,leftCanvas,bottomCanvas,centerCanvas,rightCanvas,obj) {
	//this.canvasWidth = canvas.width-(canvas.width*0.01);
	this.canvasWidth = canvas.width;
	this.canvasHeight = canvas.height;
	
	this.centerCanvasWidth = centerCanvas.width;
	this.centerCanvasHeight = centerCanvas.height;	
	
	this.leftCanvasWidth = parseInt(leftCanvas.width);
	this.leftCanvasHeight = parseInt(leftCanvas.height);
	
	this.rightCanvasWidth = rightCanvas.width;
	this.rightCanvasHeight = rightCanvas.height;
	
	this.bottomCanvasWidth = bottomCanvas.width;
	this.bottomCanvasHeight = bottomCanvas.height;
	
	this.bufferImage.width = this.centerCanvas.width;
	this.bufferImage.height = this.centerCanvas.height;
	
	this.fullImage.width = this.canvas.width;
	this.fullImage.height = this.canvas.height;	
	
/*	this.fullBackgroundImage.width = this.canvas.width;
	this.fullBackgroundImage.height = this.canvas.height;		
	*/
	this.bufferBackgroundImage.width = this.centerCanvas.width;
	this.bufferBackgroundImage.height = this.centerCanvas.height;
	for(var i=0; i< this.s.length;i++){
		this.s[i].width = this.centerCanvas.width;
		this.s[i].height = this.centerCanvas.height;
		this.sDot[i].width = this.centerCanvas.width;
		this.sDot[i].height = this.centerCanvas.height;	
	}
	
	
	this.bufferOriImage.width = this.centerCanvas.width;
	this.bufferOriImage.height = this.centerCanvas.height;	
	

	this.bufferLeftImage.width = this.leftCanvas.width;
	this.bufferLeftImage.height = this.leftCanvas.height;
	if(typeof this.yAxisObj != 'undefined'){
		this.yAxisObj.yStart = this.leftCanvas.height;
	}

	
	this.bufferOriLeftImage.width = this.centerCanvas.width;
	this.bufferOriLeftImage.height = this.centerCanvas.height;	
	
	this.bufferOriBottomImage.width = this.centerCanvas.width;
	this.bufferOriBottomImage.height = this.centerCanvas.height;
	
	
}


function resizeC(obj,_percentw,_percenth){
    var container = obj.parentNode;
    $(obj).attr('width', $(container).width()*_percentw );
    $(obj).attr('height', $(container).height()*_percenth );
}


var charts = {};
var options = {};
var sizes_w = {};
var sizes_w2 = {};
var sizes_h = {};
MbaseChart.prototype.drawChart = function(chartName,option) {
	starts(this,chartName,option);
}

function setSize(mobj,w,h,key){
	var bHeight = h*sizes_h[key];
	var lHeight = w*sizes_w[key];
	var rHeight = w*sizes_w2[key];
	$(mobj.canvas).attr('width',w);$(mobj.canvas).attr('height',h);
    $(mobj.leftCanvas).attr('width',lHeight );$(mobj.leftCanvas).attr('height',h-bHeight );
    $(mobj.rightCanvas).attr('width',rHeight );$(mobj.rightCanvas).attr('height',h-bHeight );
    $(mobj.bottomCanvas).attr('width',w-lHeight-rHeight );$(mobj.bottomCanvas).attr('height',bHeight );
    $(mobj.centerCanvas).attr('width',mobj.bottomCanvas.width );$(mobj.centerCanvas).attr('height',mobj.leftCanvas.height );
}

/*
 * 특정 차트를 redraw함.
 */
function redraw(chartName){
	starts(null,chartName);
}

/*
 * 전체를 다시그릴수도 있고
 * 특정 차트만 다시그릴수도 있음.
 */
function starts(mobj,chartName,option){
	if(chartName == null){
		//refresh or redraw case!
		$.each( charts, function( key, value ) {
		    mobj = value;
			var container = mobj.canvas.parentNode;   
			var w = $(container).width();
			var h = $(container).height();
			setSize(mobj,w,h,key);
	
			startChart(mobj,mobj.canvas,mobj.leftCanvas,mobj.bottomCanvas,mobj.centerCanvas,key,options[key],mobj.rightCanvas);	  
		});	
	}else{
		if(option == null){
			mobj = charts[chartName];
			option = mobj.options;
		}
		
			var key = chartName;
		    sizes_w[key] = option.lyWidth;
		    sizes_w2[key] = option.ryWidth;
		    sizes_h[key] = option.bHeight;
			var container = mobj.canvas.parentNode;   
			var w = $(container).width();
			var h = $(container).height();
			setSize(mobj,w,h,key);

			startChart(mobj,mobj.canvas,mobj.leftCanvas,mobj.bottomCanvas,mobj.centerCanvas,chartName,option,mobj.rightCanvas);	
	}
}

/*    	function getSampleData(){
this.arr = [[400,10],[500,90],[600,20],[700,5]];
return arr;
}  */ 
function getSampleData(min,inc,cnt,_isFullData){
	this.arr = [];
	var save = min+ Math.floor(Math.random() * inc) + 1;
	for(var i=0; i < cnt; i++){
		var tmp = Math.floor(Math.random() * (save*0.5));
		var result;
		if(tmp%2 == 0){
			result = save- Math.floor(Math.random() * (save*0.5)) + 1;
		}else{
			result = save+ Math.floor(Math.random() * (save*0.5)) + 1;
		}
		
		var v = Math.floor(Math.random() * 8)+1;
		if(!_isFullData && (v==8  || v==6 || v==2 || v==11 || v==15 || v==19 || v==5 || v==8 || v==7) ){
		//if(true){
			arr[i] = [i,result,0];
		}else{
			
			arr[i] = [i,result,1];
			
		}
		
		save = result;
	}
	return arr;
}  

function getSampleDataRightX(arr,num,from,to){
	for(var i=from; i < to; i++){
		arr[i] = [i,Math.floor(Math.random() * num)*1000,0];
		
	}
	return arr;
}  

function getRealData(_obj,num){
	var d = new Date();
	var min = d.getMinutes()+'';min = min.length > 1 ? min : '0' + min;
	var sec = d.getSeconds()+'';sec = sec.length > 1 ? sec : '0' + sec;
	var txt = min+':'+sec;



	var re = _obj.s_data.slice(1);
	re[re.length] =  [txt,Math.floor(Math.random() * num)*1000,1];
	return re;
}

	   		
	   		

function getSampleData_1(min,inc,cnt,_isFullData){
	this.arr = [];
	var save = min+ Math.floor(Math.random() * inc) + 1;
	for(var i=0; i < cnt; i++){
		var tmp = Math.floor(Math.random() * (save*0.5));
		var result;
		if(tmp%2 == 0){
			result = save- Math.floor(Math.random() * (save*0.5)) + 1;
		}else{
			result = save+ Math.floor(Math.random() * (save*0.5)) + 1;
		}
		
		var v = Math.floor(Math.random() * 8)+1;
		if(!_isFullData && (v==8  || v==6 || v==2 || v==11 || v==15 || v==19 || v==5 || v==8 || v==7) ){
		//if(true){
			arr[i] = [i,34,0];
		}else{
			
			arr[i] = [i,82,1];
			
		}
		
		save = result;
	}
	return arr;
}  


function getDtsData(){
	var s1_data =[52,51,49,51,52,52,48,54,53,54,48,48,48,54,54,52,54,54,48,53,52,48,51,53,48,139,48,48,54,49,54,53,49,48,49,49,48,49,129,51,49,53,48,49,54,52,53,54,49,52,51,139,53,52,51,49,51,49,51,48,49,53,49,51,138,49,48,139,54,53,54,137,52,53,51,51,49,52,52,132,51,51,54,52,52,51,51,53,49,49,52,53,54,51,52,48,139,54,51,51,48,48,48,48,52,133,132,52,131,49,52,54,48,53,136,51,48,140,53,53,48,49,54,53,54,48,51,54,48,53,53,53,48,132,53,52,48,51,134,54,51,49,49,48,51,52,51,142,52,49,51,49,49,51,52,54,52,48,49,53,49,54,48,51,128,51,52,49,141,54,53,48,53,54,48,54,52,48,53,52,51,48,51,53,48,48,48,54,48,142,53,54,53,51,51,49,54,51,52,140,49,137,54,54,49,51,54,52,52,51,51,49,54,53,51,54,49,49,51,52,49,52,54,135,130,48,54,54,52,53,48,48,49,53,53,53,54,53,51,52,138,48,52,140,53,53,52,48,52,52,53,53,136,135,49,131,49,53,53,51,52,54,48,54,54,52,142,51,48,52,49,54,53,49,52,51,54,51,49,53,49,139,51,130,52,48,52,52,52,54,53,54,48,53,53,54,135,49,53,49,48,48,48,48,54,142,54,52,48,53,51,54,53,54,48,49,48,51,53,49,51,48,51,49,48,54,142,54,49,52,52,54,53,53,51,54,52,53,48,51,49,51,134,51,51,53,51,53,141,54,131,54,54,53,130,53,137,52,53,53,54,48,48,51,48,135,51,52,48,51,53,133,54,53,49,48,52,53,48,49,48,135,52,54,52,48,49,130,49,51,49,52,133,49,53,48,54,51,52,52,48,129,49,53,51,53,54,53,49,54,48,48,48,51,48,49,51,54,51,52,52,49,53,54,53,49,53,136,54,54,49,48,49,51,52,53,48,52,54,51,51,54,48,53,51,49,140,52,54,129,52,54,54,140,48,52,128,52,49,52,53,51,48,51,49,141,53,51,49,54,48,53,48,49,52,48,139,52,52,48,133,48,137,54,49,54,52,53,54,48,52,48,140,54,53,53,49,140,51,53,52,54,52,49,52,53,54,53,54,53,54,48,48,49,53,53,52,51,140,48,52,52,52,52,51,49,132,49,49,129,142,137,51,51,49,48,49,129,48,52,54,49,134,51,48,48,53,51,49,49,52,141,52,51,51,48,49,142,48,51,54,128,53,48,49,53,54,49,48,53,52,49,48,49,129,52,53,54,51,49,48,53,53,53,51,52,48,137,54,51,52,52,49,52,128,141,49,54,48,52,52,135,54,48,48,130,52,49,53,51,54,134,54,52,49,138,54,141,53,51,49,49,53,54,53,52,52,53,48,51,49,53,51,54,51,48,53,49,48,53,49,49,48,137,51,51,53,51,48,51,48,49,52,52,52,49,51,52,53,51,133,53,53,131,137,52,48,53,51,52,139,49,48,53,54,52,54,141,54,52,51,53,51,54,49,131,53,54,54,49,52,51,53,133,53,49,49,54,48,48,49,48,129,49,48,48,52,48,49,140,142,53,51,48,52,48,52,53,49,138,48,54,49,54,52,52,53,51,54,51,52,137,141,54,54,54,51,51,130,52,48,54,54,48,48,51,49,52,49,54,54,48,54,52,48,52,48,53,54,52,131,52,53,49,48,52,53,52,52,49,54,54,54,49,48,52,54,49,53,52,51,53,49,131,54,52,51,52,51,51,51,49,131,51,51,53,52,139,53,54,51,49,51,134,52,48,52,48,48,51,54,51,51,51,54,51,48,53,54,52,53,51,54,128,53,132,49,53,49,142,54,51,48,49,48,54,52,48,51,54,49,52,52,48,49,48,54,53,54,52,130,54,51,52,129,53,135,52,51,48,51,54,54,53,142,54,54,49,52,140,49,49,48,48,53,53,51,53,53,53,49,53,52,48,51,51,131,54,53,49,51,54,134,52,49,53,53,129,48,52,48,137,134,48,49,52,48,48,48,141,48,51,130,52,129,54,51,135,133,53,54,54,49,48,52,53,132,51,54,53,53,52,49,53,52,134,142,48,49,49,137,49,49,48,51,54,139,49,48,49,53,52,51,128,48,48,51,53,49,51,131,53,51,51,52,48,53,51,136,52,49,141,48,54,48,51,49,52,48,49,52,54,52,137,54,48,49,52,52,49,52,49,49,53,136,136,52,49,53,53,48,53,54,52,49,135,53,54,135,54,54,53,54,54,52,48,132,48,52,53,54,53,49,54,54,49,54,52,54,53,52,49,52,49,48,48,52,51,54,52,52,52,54,49,134,54,54,133,53,48,51,53,53,53,54,49,49,51,49,52,49,53,51,48,52,51,51,52,133,48,53,51,54,135,51,130,54,49,52,49,49,54,54,48,51,141,54,48,130,49,52,52,52,53,48,49,54,49,128,52,54,54,49,49,52,53,49,52,51,54,53,51,139,52,48,54,49,49,49,54,131,53,51,53,49,54,48,135,53,140,52,54,52,52,49,48,48,52,48,54,48,54,49,48,139,52,52,48,48,53,53,53,142,51,142,141,54,48,54,52,52,133,52,54,53,49,49,53,49,48,52,54,49,51,48,48,54,141,53,51,49,48,53,51,54,53,54,51,48,49,53,53,54,53,52,52,142,52,54,54,52,48,49,52,53,48,49,51,53,53,54,51,49,54,132,53,48,52,133,54,132,49,51,52,48,52,52,53,52,52,138,135,54,130,53,134,48,53,48,51,51,48,49,48,48,53,48,48,48,54,53,53,52,54,52,133,135,49,49,51,49,51,54,52,51,53,49,51,54,136,48,52,141,49,49,54,51,49,54,52,54,54,137,54,54,135,133,54,51,51,138,54,49,52,48,53,138,48,48,49,53,48,48,48,52,48,54,52,48,51,52,51,52,52,51,52,51,52,48,49,52,51,54,48,48,54,130,48,54,53,54,140,53,51,51,141,52,51,54,53,48,51,133,48,134,53,49,53,53,53,49,51,52,49,54,54,51,52,53,53,49,136,132,49,49,51,53,134,51,52,52,48,48,53,52,52,53,51,52,137,48,48,52,48,132,51,54,49,142,54,54,49,53,52,53,52,48,51,132,135,52,51,53,48,49,51,52,53,51,54,53,52,49,51,54,49,49,130,49,54,54,49,129,49,52,49,137,49,52,52,135,48,48,52,52,52,49,51,136,53,51,54,137,49,52,54,48,51,49,53,54,53,49,48,48,51,49,54,139,54,49,48,52,53,54,134,51,54,53,51,52,48,48,53,51,48,48,52,52,52,52,130,49,49,54,49,54,51,54,54,49,49,53,54,54,54,49,53,48,52,49,131,128,53,53,51,53,133,52,138,49,52,135,52,49,49,54,48,49,48,49,48,52,52,133,52,48,52,51,48,48,54,52,54,48,139,49,48,49,129,129,53,133,48,53,48,53,133,53,52,49,51,48,48,53,52,51,53,48,48,54,51,141,49,49,49,52,131,53,142,52,53,52,138,54,48,52,135,52,51,53,49,141,52,54,52,48,132,130,136,52,54,54,53,49,48,53,49,48,49,49,52,51,48,54,53,52,53,49,54,130,53,49,51,49,49,52,51,52,48,49,136,53,51,54,54,54,53,53,49,51,51,133,131,51,53,54,48,132,51,49,51,138,49,49,141,53,52,49,52,54,54,52,49,54,54,141,49,49,54,130,49,48,129,54,53,49,139,49,48,130,48,54,48,53,52,133,54,130,54,49,133,53,53,52,53,48,51,54,49,52,51,48,53,54,49,54,48,54,138,52,141,52,49,49,49,54,49,49,51,53,49,54,137,53,54,51,49,52,130,52,141,51,132,48,49,132,49,52,52,54,141,52,52,49,48,49,53,48,51,51,53,52,49,51,54,134,48,54,51,130,51,51,52,48,51,48,52,52,54,49,141,52,136,53,48,142,138,52,53,51,52,48,54,51,48,131,54,54,48,51,48,48,51,54,48,51,52,48,49,49,52,53,52,131,54,54,48,137,52,48,51,52,53,51,54,54,53,51,51,48,51,53,132,137,51,54,48,48,49,130,51,49,52,51,54,48,54,53,53,49,49,53,132,51,51,54,52,54,51,141,54,138,49,54,48,51,52,48,53,134,53,54,49,137,52,133,54,49,48,53,48,52,54,48,49,48,48,49,51,139,129,48,49,52,52,51,54,51,49,53,53,131,128,53,131,51,53,52,54,48,141,51,53,48,131,139,48,53,52,49,51,52,51,52,48,49,133,53,49,53,51,53,49,52,138,53,49,48,139,49,48,49,138,137,48,53,48,53,53,49,52,51,49,51,49,138,53,51,52,52,51,51,53,53,141,51,141,52,48,48,51,54,49,54,48,48,48,52,132,51,48,48,136,140,133,53,54,132,52,54,137,53,54,137,49,54,51,54,52,49,51,53,54,51,52,129,53,52,54,48,52,132,53,54,51,52,48,136,54,48,52,53,52,48,52,49,54,52,54,54,54,128,132,48,51,53,135,52,53,53,53,51,49,52,130,52,51,51,52,54,54,49,54,135,48,53,52,54,51,49,141,53,142,51,52,53,51,133,48,52,142,53,53,53,48,52,48,48,53,52,51,131,52,48,53,49,49,141,54,53,134,53,54,142,53,129,54,141,53,49,51,48,54,132,52,48,53,54,51,134,48,49,51,54,51,49,130,48,48,52,52,130,51,54,48,52,54,49,51,53,53,48,49,52,51,134,52,53,54,48,51,49,53,54,51,51,51,139,49,54,48,53,51,49,52,53,136,54,49,48,52,52,51,135,52,49,48,142,54,54,48,48,54,53,52,51,51,49,54,48,140,49,51,54,52,52,128,140,53,140,52,52,53,48,53,53,52,134,54,51,54,49,54,49,53,132,54,53,53,54,52,54,48,54,53,141,54,48,52,48,52,48,49,140,54,49,48,54,53,139,49,48,54,52,131,138,49,54,48,49,53,54,49,142,48,51,141,130,48,54,52,53,139,52,48,52,53,48,48,51,52,52,53,48,48,53,54,52,52,49,54,48,54,54,51,48,54,53,53,54,51,54,51,132,52,51,49,51,48,54,52,52,135,52,51,51,138,52,49,54,48,49,51,52,48,48,52,51,49,51,52,135,49,48,52,53,49,52,49,51,49,53,51,48,51,52,54,137,53,52,52,48,54,54,54,49,52,48,54,51,52,51,49,51,52,53,132,131,48,48,49,49,52,52,54,49,52,51,139,49,54,48,51,49,51,139,48,48,133,48,53,54,51,54,49,49,51,53,49,52,49,52,52,48,54,130,48,49,48,49,53,54,53,49,54,49,51,49,48,141,48,51,54,52,53,51,52,51,139,128,54,49,51,51,52,54,52,54,52,52,54,52,54,54,49,51,49,128,49,52,54,53,48,48,51,53,53,53,53,54,133,48,134,54,51,134,52,53,49,52,52,54,54,49,53,54,54,54,51,53,130,51,54,138,48,53,54,54,54,48,140,49,54,54,49,54,49,48,53,51,54,54,51,53,48,49,54,54,53,54,53,52,141,52,49,52,54,48,52,53,54,51,53,53,54,48,54,54,130,53,48,52,48,138,49,51,135,129,51,53,51,54,49,53,54,49,52,53,52,54,54,48,53,54,51,48,54,49,54,49,48,54,49,49,49,51,53,52,51,53,52,52,52,52,53,53,53,54,54,54,54,142,52,49,51,49,53,53,53,48,140,51,54,48,48,52,54,48,136,52,51,142,49,51,141,135,53,52,54,133,49,49,48,54,51,142,52,49,49,49,53,131,51,52,52,54,48,52,52,54,51,51,52,49,54,49,49,54,48,53,53,48,51,48,53,51,52,54,52,52,130,52,54,52,52,48,49,51,54,136,52,48,51,140,52,54,52,51,48,48,131,53,54,53,53,54,132,53,137,51,53,52,49,140,54,49,133,51,49,54,133,53,54,53,54,49,53,53,48,54,49,49,54,51,51,49,54,48,49,54,51,51,51,49,52,48,52,49,51,52,54,54,129,54,137,54,133,52,52,48,51,48,52,51,52,54,51,52,52,48,137,51,53,137,54,54,51,51,48,52,48,53,51,140,140,49,130,135,48,54,52,49,133,49,51,48,49,52,138,133,53,54,51,51,54,52,51,49,137,54,138,54,48,48,54,48,51,49,52,53,142,54,52,54,54,53,53,136,134,49,48,49,51,138,48,132,48,48,54,49,48,49,51,54,142,52,54,130,54,51,132,54,54,51,54,52,131,54,48,54,53,48,48,140,136,52,52,53,48,138,52,52,51,48,54,51,137,48,53,49,54,53,51,52,51,51,54,49,51,53,52,53,48,53,48,48,51,53,49,51,54,54,140,52,54,51,52,52,49,49,52,48,139,48,142,52,54,53,52,48,53,51,48,49,49,49,52,54,54,51,53,48,53,51,48,54,49,48,49,49,129,138,52,137,48,48,53,49,52,139,51,133,51,51,51,52,51,48,140,52,52,138,48,141,49,52,52,135,53,51,48,51,51,49,53,48,132,48,52,52,49,53,48,52,48,51,54,54,49,49,54,48,136,131,49,49,48,52,52,54,54,54,129,51,54,54,48,49,140,49,52,54,49,53,52,54,51,48,49,51,51,128,134,48,51,52,53,54,51,51,48,53,51,130,52,52,53,53,49,133,48,54,52,53,51,49,54,52,52,52,51,49,53,48,131,49,52,51,48,53,49,54,132,51,52,48,54,51,53,49,49,54,48,52,53,52,49,51,49,54,133,53,54,52,48,48,138,53,135,51,51,53,49,51,51,48,54,49,49,140,53,52,49,48,48,130,49,51,51,52,52,52,52,49,137,54,131,51,48,48,53,49,52,54,54,49,52,54,54,51,48,49,52,142,54,54,54,51,49,53,141,48,51,52,48,51,51,138,51,51,52,54,51,52,51,48,138,129,53,49,130,52,51,54,52,131,53,52,49,49,49,51,53,139,49,53,51,48,52,53,51,52,52,54,51,52,49,48,51,136,51,51,53,53,48,132,54,51,135,54,54,52,49,52,51,48,49,49,48,51,53,52,54,49,139,49,52,48,48,49,130,52,135,52,51,53,53,52,48,49,48,129,51,51,52,52,51,51,54,131,49,52,135,129,54,48,54,48,51,48,131,137,53,49,54,52,52,48,48,49,49,51,49,54,49,54,52,54,53,48,49,54,53,49,53,48,49,49,48,52,53,48,53,49,52,141,51,51,54,49,52,48,49,48,52,51,48,54,52,54,48,48,48,49,51,54,53,54,48,52,49,53,51,54,137,49,51,142,52,49,48,49,49,132,54,48,49,53,52,53,53,49,131,48,49,48,51,49,51,52,130,48,48,48,53,53,134,54,51,54,52,49,49,54,53,54,53,54,52,52,54,49,139,53,52,52,49,52,49,52,51,53,133,53,52,51,49,51,128,54,49,52,53,48,48,51,53,137,48,48,49,52,51,51,53,49,134,53,49,52,48,54,134,54,48,48,54,53,48,49,51,53,54,54,48,53,49,52,53,48,51,51,48,48,51,48,132,54,139,53,133,134,134,49,48,54,52,133,53,54,52,51,48,52,51,52,52,52,53,53,52,135,129,51,49,132,129,53,54,49,130,49,49,132,54,129,139,51,140,48,128,51,49,49,48,135,49,52,49,52,51,49,54,53,137,48,52,48,49,48,49,54,49,51,52,49,51,52,49,48,52,53,53,51,54,48,49,53,48,51,53,49,49,52,49,53,53,132,54,49,54,54,49,129,49,129,49,53,54,54,48,129,48,49,54,49,51,53,48,48,49,53,48,54,51,52,51,51,51,53,52,54,140,54,51,51,54,49,52,48,54,54,49,49,49,48,54,133,53,48,48,52,53,51,54,48,49,54,51,48,128,51,49,51,52,49,48,48,48,51,52,53,53,49,48,54,48,48,53,52,138,133,51,48,48,49,49,49,48,141,140,51,49,49,49,48,51,54,129,139,52,52,54,52,51,51,53,52,129,51,48,138,54,49,51,54,48,48,54,48,51,49,53,141,49,49,49,48,53,52,131,51,52,52,49,51,54,49,49,53,51,51,51,52,48,52,52,52,51,52,48,54,51,54,53,54,48,51,49,141,54,48,54,52,49,52,48,51,48,48,52,49,52,49,51,51,53,137,51,49,52,49,54,135,51,54,48,53,48,49,52,142,54,53,54,54,48,48,54,49,53,48,49,53,134,52,49,52,48,48,129,130,51,49,51,51,49,49,54,52,52,53,53,137,48,53,135,48,133,130,53,54,51,52,54,130,52,141,53,48,48,137,52,49,48,48,48,49,53,48,51,52,49,48,48,128,49,49,51,54,53,51,129,49,131,51,54,53,53,53,49,139,51,52,51,52,49,52,141,54,53,53,53,49,53,54,54,53,52,49,51,48,52,53,48,52,51,51,51,52,54,48,52,48,54,131,49,49,54,52,52,48,48,133,51,51,52,54,54,48,53,52,51,51,52,130,48,52,49,53,53,54,52,54,53,48,48,54,52,49,49,53,48,53,49,52,54,130,51,49,48,48,54,51,53,49,53,54,54,54,135,53,139,51,49,134,54,129,53,53,52,53,48,48,54,134,135,51,53,52,49,51,51,53,51,53,133,132,52,54,133,48,54,53,48,51,48,51,53,130,51,53,133,51,135,142,49,48,52,51,48,54,142,51,48,139,51,53,49,51,51,49,51,137,48,52,51,51,53,51,49,48,51,130,139,52,48,54,52,54,48,48,52,51,49,53,51,53,130,52,142,48,48,49,49,135,48,52,53,51,135,129,49,53,48,49,49,49,52,49,130,48,48,49,48,48,49,53,51,52,53,48,53,48,49,52,140,52,52,52,48,51,49,48,53,51,52,53,51,138,52,52,52,49,49,138,53,53,48,54,54,53,133,53,49,48,53,142,51,48,49,141,140,54,140,51,141,53,140,53,53,133,48,52,51,53,53,53,53,54,49,53,53,54,51,48,48,53,129,54,134,54,49,53,49,53,48,52,49,51,49,54,48,49,138,54,53,134,51,49,53,49,49,52,49,54,52,53,54,52,48,54,54,54,54,48,54,51,52,48,48,132,51,52,53,49,53,52,48,51,49,136,52,48,49,139,54,53,48,54,48,51,51,53,53,49,53,48,139,54,54,49,54,129,54,51,51,142,130,49,54,51,134,48,54,51,53,53,54,48,51,51,52,53,136,52,53,52,53,48,131,52,131,49,53,49,51,52,48,130,52,135,51,141,138,52,49,139,52,49,138,48,48,131,137,51,54,136,134,51,131,52,54,49,52,53,48,52,48,54,54,49,54,54,140,52,52,53,52,48,53,51,53,49,52,49,53,51,51,52,49,54,48,49,140,49,48,52,54,131,134,54,49,49,129,53,139,51,51,53,53,54,51,131,54,51,54,48,54,48,48,141,48,133,51,131,54,49,48,137,54,51,51,137,48,133,51,49,48,54,54,54,52,54,54,51,52,133,48,51,52,141,51,48,54,139,49,48,54,54,49,52,136,49,53,54,48,51,51,134,141,130,48,54,54,51,52,136,133,49,48,134,137,48,54,139,52,49,49,53,51,129,51,49,52,51,54,49,53,51,49,53,48,140,54,49,54,131,139,54,53,53,52,52,51,51,49,48,48,54,51,52,52,52,53,49,133,136,54,54,49,51,132,53,139,51,135,136,52,54,48,49,48,51,48,54,54,49,49,54,53,136,48,48,49,51,49,53,129,52,49,48,52,53,48,51,52,51,49,53,54,49,54,142,135,54,52,49,129,133,53,54,52,52,51,51,51,51,53,51,53,48,53,53,49,52,132,53,135,52,49,49,49,49,54,131,53,51,49,52,51,48,134,54,53,53,48,52,54,130,51,52,52,52,139,52,54,49,51,48,53,140,130,54,49,51,54,53,48,138,139,48,49,53,52,48,48,49,54,53,51,51,51,53,51,48,139,54,52,138,52,48,54,52,53,48,53,48,48,54,51,51,54,52,138,54,51,52,52,53,54,53,48,48,52,52,54,139,130,52,51,49,52,51,134,53,54,48,54,136,54,52,53,130,53,52,49,54,49,48,54,49,48,48,48,48,51,132,52,53,48,54,49,48,48,49,54,49,53,49,52,134,52,49,51,134,54,142,51,48,141,51,53,54,137,52,52,52,134,52,48,54,54,137,51,134,49,136,52,51,48,48,53,48,53,51,54,52,54,53,53,136,53,53,52,51,53,54,52,51,53,54,130,51,49,52,51,51,52,51,49,53,137,53,51,49,48,52,53,48,52,49,133,48,54,48,49,48,53,54,140,48,54,54,51,49,54,51,48,53,49,49,48,53,137,54,52,49,49,48,138,53,48,142,53,52,132,48,49,51,52,53,48,49,48,54,53,51,52,52,54,52,48,48,53,52,52,54,48,52,141,49,51,49,48,53,51,54,49,139,51,53,52,53,51,53,52,49,49,54,51,142,129,132,48,139,49,49,51,52,53,48,48,136,49,48,51,131,49,53,49,128,52,54,51,54,52,54,49,52,52,53,48,53,49,141,54,48,48,49,54,52,53,52,51,54,53,52,48,48,52,48,49,54,54,51,54,49,52,49,133,53,49,51,54,49,53,52,51,51,48,54,48,49,52,48,51,53,54,53,51,51,131,52,52,53,52,131,48,54,51,53,51,53,54,53,52,54,51,51,52,48,53,53,51,141,51,54,129,51,48,54,49,48,52,130,54,48,53,54,53,49,53,52,51,54,54,133,48,53,53,51,53,54,51,54,51,53,49,53,140,49,49,54,53,52,51,49,54,139,132,51,48,53,52,49,51,52,52,51,49,49,51,48,51,52,52,131,51,51,52,48,131,52,51,135,54,53,49,53,138,51,49,51,52,51,137,140,48,52,49,138,131,48,49,52,132,129,54,48,54,54,49,52,49,132,52,54,52,49,54,53,53,131,131,49,49,49,49,49,139,48,51,48,49,52,52,54,54,49,54,54,52,54,53,54,54,137,49,135,51,52,49,48,54,49,48,53,51,49,49,54,49,52,49,48,130,49,54,53,53,48,52,48,52,48,51,53,54,49,130,51,53,142,139,51,51,54,48,52,54,52,51,49,54,53,132,48,138,53,53,52,52,51,135,48,53,128,54,134,53,52,53,51,53,53,54,53,53,52,54,49,51,48,54,49,130,51,54,54,52,48,48,53,140,130,54,139,48,54,53,51,49,48,133,51,54,53,48,48,53,53,54,53,54,52,49,53,49,48,132,51,48,54,48,130,54,51,53,52,54,51,48,54,51,48,51,51,141,51,54,52,48,52,52,53,139,53,52,54,133,53,139,140,49,48,48,51,53,51,49,52,54,54,136,132,51,49,52,53,52,54,54,51,54,130,52,51,53,52,54,48,49,51,49,48,53,53,48,130,54,132,51,52,48,53,52,130,54,51,48,52,52,48,51,48,49,54,142,129,52,51,52,48,54,48,54,54,52,51,54,49,54,52,51,48,51,49,51,140,54,51,49,48,54,54,48,141,52,51,48,49,49,140,54,53,48,130,48,52,52,51,49,52,133,54,52,51,52,53,49,53,52,53,130,51,54,52,138,54,52,53,49,52,136,51,48,54,51,52,49,54,49,52,49,52,141,48,51,49,54,51,54,53,140,141,54,52,53,48,48,52,131,141,48,49,52,49,51,54,49,48,137,53,52,48,49,130,130,51,139,54,54,53,134,52,49,48,54,53,54,52,48,51,54,53,51,54,52,54,51,54,51,54,48,54,53,129,48,54,48,49,51,51,54,52,48,48,48,54,52,140,48,134,49,53,51,51,53,54,54,52,49,49,128,52,52,136,52,49,48,52,52,49,52,48,53,53,48,54,51,54,51,52,130,53,51,53,52,52,48,135,48,131,49,53,49,49,52,49,140,51,51,49,53,141,54,51,52,51,54,53,49,54,51,53,53,48,49,49,49,49,137,51,51,53,53,54,53,52,52,52,133,140,51,51,54,53,52,48,138,49,51,52,53,137,52,53,53,133,53,54,48,49,48,51,52,52,53,51,51,54,53,52,53,142,142,51,48,49,51,49,131,48,54,49,51,53,51,49,49,51,52,48,48,137,48,139,52,48,53,142,48,54,131,53,53,54,52,54,49,49,48,54,51,52,52,51,132,135,49,135,53,49,134,51,49,48,53,48,54,52,52,54,54,49,49,49,129,53,54,53,51,51,49,54,140,54,52,53,51,51,48,134,49,136,48,129,54,52,52,54,48,53,52,52,49,49,52,52,51,51,49,53,54,49,129,48,134,49,48,52,54,138,48,49,48,52,48,49,48,138,140,53,49,48,49,52,49,133,49,52,48,51,48,133,53,54,49,51,54,52,51,49,132,48,133,54,141,141,51,48,49,49,139,49,53,54,49,49,53,134,49,53,52,48,52,54,53,48,48,53,51,54,54,49,51,49,51,141,140,54,53,141,52,53,48,53,49,51,48,49,51,48,51,52,49,49,54,51,53,51,129,52,139,51,53,49,51,54,52,54,48,52,49,48,54,51,48,133,49,51,137,51,49,51,141,52,53,142,52,52,51,48,51,128,52,51,53,140,49,49,139,51,53,53,54,51,51,53,48,54,52,51,52,49,52,54,52,54,51,54,48,134,49,49,54,52,54,49,54,48,54,51,54,51,54,52,49,54,49,54,49,128,54,140,53,54,52,53,53,51,53,138,51,51,135,53,138,49,49,54,48,54,53,48,54,48,54,54,130,49,129,54,129,51,52,49,49,48,48,48,51,129,48,53,49,48,49,133,133,54,53,133,52,49,54,51,52,49,49,51,49,51,54,48,52,54,53,135,51,138,131,49,49,52,48,48,48,51,53,54,52,52,53,49,52,52,51,48,52,128,51,49,52,53,51,51,54,48,54,52,51,49,51,48,138,52,140,53,133,53,51,54,52,51,54,48,48,49,132,52,135,49,53,51,51,53,48,53,51,54,51,52,48,48,131,135,136,54,132,51,48,53,51,51,49,141,135,48,53,51,53,131,52,142,52,139,53,139,52,52,49,49,53,49,134,49,53,51,53,54,53,51,51,52,51,51,51,54,52,49,51,137,49,48,48,49,51,48,53,51,49,129,52,52,128,135,53,51,53,52,53,51,51,140,48,48,48,49,51,53,49,51,53,52,51,53,51,138,52,48,54,54,54,54,48,48,53,53,49,49,49,48,49,54,53,53,49,52,48,137,48,51,53,52,54,54,52,52,48,54,52,48,51,51,53,137,54,51,54,51,52,52,54,54,49,49,52,51,52,49,49,137,133,52,54,54,54,132,53,134,52,129,54,53,133,139,48,49,54,53,130,135,52,133,131,136,48,48,52,52,53,48,53,53,52,54,51,52,52,52,53,52,54,48,49,53,49,52,51,49,49,53,137,134,52,48,52,51,51,51,54,51,49,49,141,53,51,53,53,52,49,52,52,52,51,142,138,49,51,53,53,52,139,132,51,49,54,54,51,49,53,128,49,52,54,49,49,48,54,49,54,51,51,54,52,54,53,51,51,53,53,52,51,51,48,52,49,140,133,49,48,54,49,48,51,130,51,133,53,51,128,53,132,138,51,49,130,49,48,134,51,48,135,51,48,54,48,49,53,49,52,51,53,54,51,52,142,48,52,49,136,48,52,54,51,51,49,49,54,136,51,132,49,52,139,139,51,54,51,53,52,48,51,52,132,48,52,52,53,136,54,52,51,54,51,54,49,48,54,51,51,51,48,133,128,131,48,142,48,54,49,52,139,129,140,52,53,48,52,129,54,52,51,48,48,54,54,136,52,51,49,49,49,136,51,48,48,51,54,51,49,53,48,48,49,53,51,48,51,54,51,52,49,51,54,51,49,142,51,129,139,53,130,48,54,52,53,54,49,52,132,49,51,133,53,48,51,54,54,52,48,130,53,132,48,131,128,51,53,49,51,48,49,51,48,133,54,52,53,53,52,52,49,53,51,54,52,51,138,51,54,48,141,140,54,52,52,142,48,53,133,132,49,52,53,54,49,48,48,53,51,48,53,51,52,53,49,49,49,54,54,138,51,51,53,53,54,49,54,54,48,53,51,48,52,51,48,48,49,54,54,51,53,53,133,48,53,136,54,52,52,52,51,49,54,52,51,53,49,48,48,54,49,49,49,49,51,52,52,48,132,49,53,49,51,51,48,48,52,48,49,53,51,54,51,129,133,139,52,51,49,48,52,51,49,53,54,53,52,51,48,51,141,51,135,53,131,52,48,52,51,51,51,52,131,54,51,51,48,51,52,49,135,48,135,51,52,49,51,52,53,48,53,48,48,49,54,48,135,49,48,54,51,51,53,141,53,131,51,54,51,53,129,52,52,53,49,48,52,51,138,51,54,142,54,53,52,52,53,51,54,51,132,49,48,53,51,136,49,53,51,54,53,54,136,53,130,48,142,54,49,53,52,48,48,132,53,54,48,54,49,54,51,53,53,52,48,54,51,53,54,48,52,135,133,54,52,51,49,51,49,53,49,48,48,48,48,54,132,54,54,53,54,53,51,48,52,49,52,53,51,52,51,52,130,51,139,49,48,136,48,130,49,134,132,53,49,52,53,54,52,51,49,51,52,54,49,136,51,48,53,51,48,54,51,48,49,53,53,48,51,129,51,48,51,54,48,49,139,53,53,51,48,49,141,53,53,140,51,134,49,136,48,136,48,48,54,49,53,52,49,53,52,52,48,48,49,54,54,49,52,53,49,51,139,52,52,49,129,51,52,53,54,54,52,48,51,142,53,52,52,49,53,141,52,49,54,53,51,52,53,49,51,129,135,52,52,49,53,54,51,51,54,141,53,54,53,48,53,132,54,51,54,51,51,53,48,54,54,54,49,136,53,48,48,52,52,54,48,52,130,49,51,52,54,52,54,52,134,48,53,54,53,136,51,48,52,51,52,48,51,48,48,138,53,48,48,48,136,52,48,48,49,51,51,53,51,135,49,53,54,54,53,129,53,52,139,53,48,54,54,54,51,49,54,48,53,52,48,51,139,134,49,48,53,53,51,49,51,129,48,54,138,132,51,52,48,52,51,53,52,53,131,131,52,136,49,51,49,51,52,49,51,48,53,51,49,52,48,51,49,49,51,48,49,54,134,51,49,54,49,48,48,54,52,52,54,49,130,54,54,53,140,136,54,54,134,49,51,52,129,51,54,52,48,51,54,48,48,52,52,48,54,53,53,51,52,53,132,49,51,138,49,54,49,52,48,49,53,51,48,52,54,48,132,51,51,48,136,51,48,49,133,53,53,48,53,51,52,49,54,52,52,51,54,51,54,51,48,134,51,48,49,51,53,54,48,138,48,54,54,51,136,52,49,53,49,133,48,48,142,49,52,133,49,49,51,54,52,52,136,54,48,51,51,48,51,51,53,49,48,48,51,51,54,54,52,49,53,54,49,53,53,49,53,49,49,51,53,52,54,51,54,48,51,52,52,54,52,52,54,51,51,54,48,54,53,51,48,51,131,53,54,139,49,128,52,53,48,51,141,51,51,54,52,51,54,53,141,53,53,49,48,49,134,49,51,136,53,54,52,49,52,51,49,48,134,54,52,54,48,53,132,52,52,51,48,54,53,52,49,49,54,54,135,51,141,48,51,131,48,49,136,48,128,51,53,53,52,49,49,48,140,54,53,131,49,135,53,53,53,131,132,53,49,51,51,52,54,48,52,49,133,52,130,48,52,54,51,129,52,52,48,51,54,128,52,51,51,49,53,139,54,134,48,49,49,48,53,53,49,53,141,53,52,52,49,48,131,54,132,54,52,48,52,49,52,53,51,54,54,139,52,53,49,52,52,51,49,49,49,142,52,51,48,54,53,51,48,136,132,54,137,48,51,132,49,49,52,49,54,54,54,51,51,53,54,53,52,138,48,51,49,54,52,48,54,51,51,134,54,49,52,53,53,54,135,53,53,53,51,54,52,48,52,48,139,137,51,49,48,48,51,49,142,49,48,133,51,130,142,51,131,48,54,54,49,52,54,53,54,54,48,49,52,140,53,53,52,137,52,51,48,52,54,135,48,48,52,132,52,48,135,54,54,48,54,53,54,140,54,53,51,51,49,48,54,139,142,53,51,48,53,133,54,54,49,51,53,52,53,49,54,52,49,48,48,49,52,49,53,51,53,53,142,52,51,49,52,137,51,54,52,49,51,129,52,54,49,54,49,54,137,52,49,54,53,53,54,53,131,53,54,138,53,51,51,51,54,51,52,48,53,53,48,49,51,54,53,132,49,49,54,54,51,52,52,138,51,52,52,52,49,48,53,53,54,53,128,48,138,53,52,51,48,54,48,49,54,134,51,54,51,51,52,49,53,54,52,48,48,132,51,133,53,53,54,51,49,54,51,52,53,53,49,51,49,52,54,49,49,52,131,53,49,139,53,48,129,54,48,53,48,132,139,51,51,48,51,48,137,54,53,51,54,49,130,53,54,49,49,48,53,48,49,48,51,52,53,49,54,54,53,48,53,49,53,141,54,49,132,52,140,49,49,134,128,139,48,53,54,53,132,53,51,52,48,48,53,51,51,48,54,48,51,52,51,53,51,49,53,53,49,51,54,54,49,52,52,54,52,52,49,54,135,54,49,130,54,134,140,53,51,49,49,136,48,53,51,51,51,52,52,54,53,54,51,136,53,53,49,48,132,49,52,51,48,51,48,49,48,49,48,53,49,48,49,52,139,52,128,54,53,52,51,51,141,53,51,53,53,135,52,53,48,52,54,49,48,136,141,48,130,49,135,48,49,48,54,54,52,48,51,48,53,53,48,141,48,51,141,54,52,54,49,53,51,48,54,52,49,51,49,49,48,51,136,51,132,138,53,53,49,52,54,49,132,53,52,53,49,48,54,51,138,48,49,53,51,54,51,53,52,52,51,51,137,52,49,140,130,51,51,51,48,52,52,53,52,52,49,53,53,49,131,54,51,51,51,54,140,49,49,48,135,48,54,134,136,49,54,52,54,53,52,51,52,49,131,48,53,49,48,142,53,53,52,49,49,49,48,53,48,48,140,52,52,51,48,53,51,53,51,53,138,49,54,52,54,48,54,52,53,53,53,53,49,53,48,49,51,54,51,52,48,53,49,138,51,133,49,53,51,51,51,53,52,134,51,53,142,53,49,48,51,54,134,135,52,49,51,52,52,49,48,52,51,52,130,130,49,51,52,49,52,49,54,52,53,54,54,53,51,49,53,49,49,54,129,49,51,53,51,53,48,51,52,52,52,52,54,48,53,54,53,53,54,51,48,49,51,52,132,53,137,135,51,49,141,54,51,52,51,141,51,48,49,51,49,54,49,137,54,54,51,51,51,48,49,49,53,52,51,48,48,51,53,137,130,52,48,53,135,129,48,53,52,48,53,54,52,132,48,49,52,131,129,54,130,52,140,137,134,137,141,49,52,49,51,49,52,52,51,51,53,51,54,142,53,51,53,53,49,53,49,52,139,51,51,52,132,53,53,52,140,48,54,49,49,54,49,48,51,52,54,52,54,53,49,49,49,137,54,52,52,49,54,54,51,53,54,52,53,54,51,54,138,48,53,52,48,54,48,52,49,53,51,52,51,49,48,49,48,52,54,52,53,54,49,51,132,49,51,131,51,54,51,52,51,54,137,53,51,49,51,53,52,53,48,54,52,48,53,51,53,51,49,48,51,138,54,48,51,51,129,54,48,51,49,129,51,53,53,48,53,140,49,137,49,138,49,48,52,54,132,52,52,52,49,52,52,52,54,52,51,53,48,133,129,51,51,134,52,52,52,139,138,139,54,54,54,132,48,131,54,141,130,48,49,51,51,48,52,49,48,52,53,53,129,52,49,51,51,54,52,54,52,53,49,53,53,49,136,51,52,49,52,52,54,129,53,53,53,132,139,53,49,49,51,54,53,49,52,136,134,49,51,51,52,48,52,54,54,54,52,54,53,49,138,48,48,137,48,52,52,49,52,54,53,49,49,49,54,51,53,133,53,136,128,52,49,52,54,131,52,52,49,52,54,51,54,48,132,52,54,54,137,54,52,52,54,52,51,139,48,54,131,129,138,48,51,51,49,53,51,52,49,54,54,53,54,54,51,52,52,49,49,51,49,51,48,49,49,51,51,54,54,53,48,52,51,48,51,129,53,48,134,51,53,49,131,52,132,54,48,53,54,53,52,48,53,52,130,52,48,51,48,51,48,54,49,52,49,54,54,48,49,54,51,48,49,49,49,48,52,53,49,52,54,49,134,54,48,53,51,54,52,131,51,137,51,52,141,51,51,132,54,52,51,53,54,135,48,139,53,135,51,54,53,136,49,52,54,49,54,53,51,52,48,53,51,132,138,48,52,49,137,140,140,49,51,54,51,129,53,48,48,135,53,48,51,48,52,49,53,53,51,52,54,49,54,52,54,53,52,49,49,49,51,51,51,138,51,49,53,54,53,54,52,48,51,52,49,51,49,52,54,52,54,54,48,51,48,48,54,52,49,134,48,48,135,53,48,142,53,52,53,51,141,49,53,53,48,52,54,54,51,51,48,53,51,52,54,53,51,49,53,49,49,54,52,51,52,51,52,49,54,54,52,48,49,53,52,53,54,52,48,49,51,54,53,51,53,52,129,51,48,51,135,52,54,54,53,51,49,53,49,49,52,136,53,54,140,134,53,48,51,53,53,53,52,51,52,54,48,52,48,52,135,53,53,138,141,48,52,137,52,52,52,48,51,53,53,54,51,54,136,51,140,48,51,52,54,53,54,139,48,53,48,52,142,54,48,52,52,51,49,49,53,141,134,54,48,52,135,49,49,142,48,53,49,54,141,49,48,49,49,51,54,51,52,53,51,54,48,49,136,54,49,53,54,48,49,49,49,48,135,53,54,54,48,141,53,54,48,48,54,48,52,140,54,49,48,52,54,53,49,51,51,53,137,49,51,51,49,52,51,53,54,133,54,49,51,48,48,52,52,48,52,138,53,48,53,52,48,133,54,53,53,53,53,48,48,51,51,54,53,48,54,49,129,134,140,51,53,53,48,49,54,49,53,54,52,133,54,52,53,54,51,54,51,49,48,136,51,48,52,51,53,53,49,51,53,48,52,133,53,48,48,131,54,138,51,53,54,53,54,53,53,52,52,53,53,54,53,53,53,53,48,52,53,53,49,54,49,54,54,48,134,48,54,52,52,52,52,142,53,54,52,53,49,48,53,135,49,52,134,49,54,53,51,49,141,54,48,53,141,130,53,49,137,48,54,49,51,134,48,51,49,53,141,51,134,54,52,48,53,53,51,49,51,49,54,49,52,51,48,52,132,51,140,52,53,133,51,48,48,49,53,48,53,132,52,133,51,130,53,53,52,51,52,49,138,51,49,52,131,54,142,48,49,48,52,130,54,54,49,53,51,49,131,54,138,52,51,53,53,53,52,130,140,54,53,54,130,53,52,54,49,53,53,51,48,53,52,54,53,51,48,134,54,54,48,138,49,48,54,48,48,48,54,52,52,49,51,53,54,142,51,49,53,49,53,52,49,51,49,51,51,52,131,51,52,48,54,132,54,49,53,141,132,54,51,52,53,52,48,49,53,52,54,49,49,48,49,49,133,52,49,51,48,49,138,53,54,52,135,49,54,142,53,130,53,48,49,49,54,48,140,51,49,51,48,140,54,48,53,51,52,51,54,51,139,51,51,52,48,54,53,131,51,54,131,54,139,52,52,48,49,136,53,53,133,49,49,52,142,52,53,53,54,54,49,135,48,52,54,53,53,48,51,48,54,49,48,52,132,54,49,51,141,142,52,49,49,48,54,52,51,53,52,51,48,141,51,51,49,49,131,54,48,49,54,48,48,54,48,52,48,48,48,51,132,54,53,53,137,131,49,51,132,54,51,52,52,135,48,51,51,52,52,53,53,52,52,49,52,53,137,49,51,51,52,52,139,51,52,54,135,53,48,48,51,52,48,52,54,48,49,48,51,49,49,49,51,52,49,53,133,129,48,48,53,53,49,130,52,54,48,142,49,137,141,129,129,49,53,48,54,48,51,52,49,49,52,136,53,51,52,48,52,51,51,133,138,51,52,53,54,53,51,54,54,49,49,54,51,54,48,48,49,54,51,53,48,49,48,48,51,139,54,54,54,51,54,54,51,53,51,48,48,52,48,53,54,51,52,138,138,52,48,52,48,51,48,52,52,52,51,48,142,52,49,52,129,49,54,54,53,51,54,53,48,49,48,138,49,51,49,53,52,52,49,48,52,48,51,49,51,133,54,142,52,48,48,52,49,142,51,130,51,52,53,52,54,134,48,129,49,52,51,49,52,52,53,48,51,48,53,51,52,51,53,51,53,53,51,49,53,52,136,54,48,51,54,131,51,48,52,48,52,49,52,49,51,53,49,48,54,54,53,51,129,48,52,52,53,54,53,52,136,51,51,54,54,141,52,53,53,54,52,52,52,48,129,48,49,49,49,51,53,139,53,51,52,53,49,52,49,52,48,54,54,139,54,52,134,48,52,52,53,54,49,54,130,49,51,51,48,52,53,54,52,54,54,48,53,49,51,142,53,54,48,136,53,49,53,48,140,136,51,54,49,51,53,53,48,54,51,54,48,51,52,49,48,54,54,53,48,54,51,53,53,134,48,52,54,51,53,51,53,54,138,52,135,52,52,53,48,51,48,52,53,141,138,52,51,52,54,53,54,51,139,51,48,52,49,48,49,49,48,54,53,53,48,53,52,54,48,48,141,51,49,52,52,51,48,53,130,51,53,52,53,51,54,48,48,51,53,49,53,48,133,52,48,53,48,48,53,129,48,49,53,136,53,52,49,141,138,52,52,54,48,48,128,53,49,51,132,53,49,53,133,54,52,49,51,136,53,51,49,133,51,48,52,142,52,49,51,140,54,139,52,54,48,51,54,49,51,48,48,54,54,54,48,54,133,52,51,49,52,48,48,52,51,51,54,49,52,51,52,135,52,49,49,52,140,140,53,54,51,53,53,133,49,52,49,49,135,53,54,49,49,52,52,54,142,49,52,54,54,52,54,48,138,54,51,52,54,49,51,52,52,51,53,52,49,48,49,138,48,53,53,48,130,53,48,52,52,52,51,48,140,49,51,53,49,132,133,53,54,53,136,49,54,51,53,53,48,48,49,48,130,51,49,48,54,53,52,49,54,53,52,129,48,53,53,54,49,49,48,136,49,51,54,131,52,139,137,51,51,52,49,52,49,52,53,51,54,53,53,48,49,54,48,51,52,51,53,48,54,51,49,53,52,52,51,49,54,49,49,53,136,142,49,53,52,49,51,52,49,52,53,54,48,51,49,54,54,54,49,140,49,51,52,54,51,52,54,53,54,51,141,52,48,48,140,48,51,48,52,48,49,137,49,49,53,131,52,131,53,52,140,54,49,52,53,54,51,54,54,48,54,131,132,53,53,128,52,48,53,132,48,48,48,53,48,53,48,49,49,140,52,51,51,52,51,140,52,132,132,49,48,51,53,48,53,54,54,51,48,134,51,54,138,54,54,52,49,129,54,49,49,52,53,54,53,53,54,49,48,135,49,52,53,53,48,49,48,48,48,53,48,48,53,49,53,54,48,53,49,53,53,51,51,52,48,52,128,54,48,130,49,52,49,53,48,49,48,54,48,48,54,51,52,54,51,49,48,54,133,49,48,54,52,54,53,133,48,135,53,52,53,53,52,132,49,49,49,53,139,48,131,138,52,53,51,51,53,49,53,52,54,139,52,49,54,48,54,52,54,52,129,48,52,48,49,51,49,52,49,48,49,49,54,48,51,48,53,132,138,54,49,51,51,54,52,54,51,136,54,54,130,53,129,135,52,51,49,54,54,51,54,139,52,53,53,54,54,51,53,52,129,49,130,138,52,52,54,48,53,140,54,51,52,53,48,52,52,54,130,54,52,48,141,48,133,48,49,48,54,49,54,52,48,53,54,53,48,54,54,51,49,54,54,51,53,48,52,52,51,51,53,137,52,49,137,49,48,130,54,49,53,48,52,53,52,53,131,54,133,49,48,53,52,54,140,48,49,133,54,49,51,134,142,136,52,51,49,52,51,51,54,48,51,53,136,54,48,54,49,51,54,48,142,53,130,51,137,52,54,49,131,53,142,49,136,54,53,52,49,51,54,48,54,53,54,48,51,141,48,49,54,49,48,140,52,54,51,52,132,52,54,53,48,48,52,130,48,139,51,53,52,51,54,51,49,51,49,49,48,48,52,51,54,52,49,49,129,129,53,137,49,53,51,53,52,48,51,54,140,51,130,52,51,51,52,132,52,52,134,53,54,52,54,136,52,53,52,53,141,48,53,53,51,51,54,54,49,53,54,52,49,49,52,54,49,51,49,48,51,49,51,53,52,139,52,48,49,53,53,52,53,48,52,48,49,48,49,54,49,49,53,52,136,49,48,48,54,49,140,49,51,51,51,54,51,54,51,54,53,51,48,49,51,140,141,52,52,48,135,49,52,49,51,53,49,53,48,54,53,51,51,53,54,139,51,139,49,49,49,53,52,139,49,48,52,52,129,51,52,51,52,54,51,54,48,53,54,49,51,53,140,53,49,52,48,52,51,48,48,48,54,51,141,48,51,49,48,51,138,48,51,54,48,51,53,48,49,49,52,54,53,51,51,48,53,54,48,51,48,53,54,52,48,53,48,54,48,49,48,51,137,130,52,54,128,49,48,142,52,54,51,54,53,53,53,52,54,51,142,52,51,53,138,49,49,49,53,52,49,49,130,51,54,52,53,51,54,141,53,53,54,49,49,53,49,49,53,51,52,137,49,52,49,51,53,51,51,54,53,49,49,54,52,53,51,54,49,52,48,49,49,53,51,54,54,51,51,52,48,139,52,53,49,54,53,54,54,51,53,51,49,132,53,54,139,52,53,53,54,128,52,48,130,54,52,54,51,49,51,49,53,48,49,54,51,52,52,52,48,54,142,53,139,48,48,53,53,52,137,131,53,128,53,52,54,54,49,51,53,52,51,139,139,134,48,53,48,51,49,53,129,49,49,54,53,54,48,48,134,49,52,54,53,53,49,48,48,52,54,49,131,133,49,49,135,48,52,54,53,49,136,48,48,48,54,48,51,48,51,52,53,54,51,49,48,54,51,53,51,139,54,51,51,54,51,49,48,53,139,48,54,141,48,52,54,48,49,138,51,49,49,49,49,138,52,53,129,53,49,54,49,52,49,54,51,48,49,53,54,52,49,51,53,52,51,129,132,53,52,49,53,53,49,133,142,53,54,51,139,48,53,54,54,51,48,52,52,52,53,51,54,52,139,51,54,49,52,53,54,52,51,49,48,51,49,51,48,52,52,49,49,49,54,51,48,51,141,52,49,53,52,141,48,54,54,54,48,48,51,52,48,53,48,53,54,54,48,54,49,51,139,52,49,52,134,130,51,54,48,51,53,49,52,51,54,54,52,52,53,53,52,48,48,52,51,52,51,52,49,48,51,54,49,51,49,139,54,139,48,49,49,130,51,53,48,48,53,135,49,48,49,48,49,49,136,51,54,54,48,51,53,140,49,134,54,52,49,54,134,53,137,54,48,48,48,51,51,53,49,49,48,54,54,134,54,51,49,51,49,52,48,53,49,137,53,54,51,48,54,49,128,54,51,53,49,130,51,48,53,49,51,53,54,52,49,52,54,49,53,54,51,136,49,52,51,135,54,54,135,135,128,51,140,49,54,48,54,135,52,52,48,53,133,53,49,51,54,139,52,48,48,130,52,132,49,52,141,48,53,53,52,48,48,51,51,53,49,51,48,51,52,51,48,48,53,48,54,53,49,136,52,53,51,48,52,141,52,48,54,53,51,132,53,48,53,54,48,48,49,48,49,53,48,51,54,51,48,51,54,53,49,140,53,49,52,51,48,53,52,52,54,54,51,53,48,54,142,48,139,53,53,51,49,51,53,51,54,139,54,52,52,51,52,51,54,54,141,48,48,49,134,51,54,54,53,54,52,54,48,51,51,54,129,52,48,52,54,134,49,136,51,48,52,53,48,52,53,140,53,52,53,48,48,51,49,131,53,142,49,135,51,49,48,53,49,52,140,54,52,52,54,53,142,51,51,54,53,132,51,52,51,49,48,49,48,51,52,53,134,48,51,48,51,52,52,48,51,53,52,53,51,139,48,53,133,54,131,48,53,52,49,52,48,54,53,48,141,52,51,48,136,49,54,54,49,54,51,52,54,49,134,51,138,129,53,51,53,48,53,51,51,52,53,54,52,49,48,51,53,51,51,49,49,52,54,52,48,54,53,53,54,51,54,48,134,49,133,53,52,51,48,54,54,53,54,54,51,140,52,54,129,49,137,48,53,53,52,48,52,130,141,139,53,54,49,137,48,53,51,52,54,52,51,48,48,54,53,53,137,49,53,52,52,51,53,48,48,48,53,52,51,51,49,49,49,54,53,54,53,52,54,51,54,53,52,54,54,52,48,137,53,48,51,48,52,48,48,129,131,48,53,54,48,52,137,49,48,51,52,133,53,52,53,51,49,53,138,48,53,48,53,54,130,131,132,52,54,48,51,49,48,48,51,135,53,51,48,53,54,128,48,51,54,52,53,54,52,51,54,134,48,52,49,51,52,54,53,52,141,49,48,51,49,54,54,51,142,51,53,53,52,48,48,54,49,48,53,52,48,52,52,53,52,49,48,54,137,51,51,51,51,48,53,54,52,132,53,53,51,54,51,54,52,51,133,139,51,49,54,51,51,52,52,54,53,141,54,52,51,49,133,54,54,130,54,52,53,51,49,53,51,48,132,53,140,49,139,51,48,52,54,48,53,51,52,141,49,134,142,51,48,52,52,54,49,53,54,53,53,53,49,53,48,51,132,54,54,54,53,51,53,54,54,140,135,49,52,53,53,51,52,49,49,54,49,52,54,49,49,135,54,51,52,54,48,48,48,51,48,48,53,54,54,51,53,53,52,53,48,53,49,48,51,49,132,54,53,138,51,54,129,53,53,51,53,54,135,51,53,48,48,48,51,49,133,128,49,51,54,137,48,52,51,48,53,54,52,49,138,135,52,51,134,53,54,52,132,53,49,48,51,48,51,53,51,53,134,48,53,52,51,128,53,51,48,53,51,51,53,48,48,53,49,49,54,133,129,49,49,54,51,48,53,51,54,51,51,48,53,49,52,48,52,54,54,48,48,52,48,54,141,48,49,52,138,53,53,52,54,54,52,48,52,137,133,53,53,53,48,54,48,49,49,52,49,53,136,49,131,51,48,52,54,51,52,52,53,53,49,52,53,51,51,53,48,49,51,52,48,54,54,49,54,133,52,49,49,49,51,49,53,49,48,49,51,53,138,51,54,49,51,53,54,48,133,52,53,54,49,52,138,49,53,54,52,54,54,51,49,53,54,52,48,129,49,54,48,53,49,138,52,54,51,54,48,51,53,52,49,52,48,131,52,53,48,53,129,52,49,53,51,53,130,52,54,52,48,49,48,48,54,51,49,135,54,48,52,53,49,53,52,49,49,53,48,142,53,52,53,134,131,48,49,51,51,132,48,49,48,137,132,54,52,49,51,53,131,48,51,53,135,51,49,49,49,54,133,51,53,54,53,54,53,54,48,52,52,53,49,51,53,53,52,54,51,132,48,53,49,49,48,48,53,52,49,53,49,53,54,48,54,53,52,142,53,48,53,54,51,48,49,52,54,141,52,49,48,49,51,51,140,140,54,51,49,49,53,129,49,135,54,52,54,51,48,53,53,49,51,48,52,54,51,52,51,49,54,51,53,49,48,49,48,48,53,49,132,48,48,53,49,133,49,52,48,52,49,51,49,54,53,129,130,54,54,52,49,54,54,51,52,48,49,53,54,138,48,128,138,54,52,49,48,141,54,53,49,49,52,49,141,53,52,49,48,136,48,52,54,131,53,53,48,51,53,53,130,49,54,48,54,48,53,49,52,131,53,53,53,52,51,54,51,52,53,51,51,48,53,48,52,51,52,49,53,52,54,51,54,51,51,49,54,140,54,53,49,53,54,130,52,49,49,131,49,54,52,49,136,49,52,54,54,51,49,53,134,54,135,51,133,48,49,142,51,51,52,52,141,52,49,51,53,53,48,128,49,130,49,51,128,52,53,48,53,51,49,52,142,137,51,54,52,130,52,51,49,48,49,54,54,53,51,54,53,53,53,48,52,49,48,54,54,52,49,52,52,140,51,48,48,51,49,53,49,51,52,49,54,48,49,48,135,54,51,48,142,52,54,53,134,52,48,54,53,53,48,48,49,128,48,131,141,48,49,53,49,49,48,53,49,49,53,53,53,53,54,128,51,54,54,51,49,54,53,53,51,51,52,51,52,49,48,52,48,52,51,49,132,54,53,52,52,53,52,54,52,51,49,54,133,136,132,139,142,133,51,54,48,52,48,51,132,51,132,54,52,51,130,52,49,54,52,54,52,52,54,132,48,51,132,48,52,48,52,54,53,49,135,141,53,52,51,139,48,136,54,51,48,53,54,51,53,48,52,51,49,53,53,51,51,51,134,52,51,138,53,49,49,54,49,54,52,51,134,51,53,54,128,52,48,53,49,52,54,49,51,51,53,54,53,51,52,48,51,53,54,140,137,52,53,53,52,51,54,54,48,49,52,52,48,48,53,49,51,53,48,52,54,49,48,54,49,54,53,54,51,49,49,52,49,48,48,49,54,48,140,53,48,51,131,51,54,51,49,54,52,129,52,48,137,52,53,49,51,141,49,48,49,51,48,54,53,52,53,51,54,51,48,134,49,53,139,49,54,133,49,130,48,48,54,136,48,53,52,140,54,52,48,48,52,51,48,52,53,48,54,48,52,48,54,49,51,54,48,53,135,48,53,49,49,134,54,53,49,131,52,49,52,53,51,54,49,49,141,51,48,48,53,53,48,53,52,54,138,54,51,51,52,53,48,48,49,54,52,48,51,48,51,51,49,130,134,51,137,49,48,53,51,52,53,54,52,54,51,51,53,52,51,52,51,49,53,54,51,48,53,51,51,54,48,54,49,51,141,49,54,51,52,133,49,48,48,53,52,52,48,48,53,53,52,51,48,48,53,53,48,135,54,51,53,48,53,53,51,51,132,138,49,52,54,48,136,52,132,52,48,52,52,52,49,51,138,52,53,54,138,53,48,51,139,54,52,53,137,49,53,51,48,54,48,49,49,49,49,49,54,54,54,53,54,49,54,51,48,52,52,52,52,49,54,51,53,52,51,48,48,49,51,53,54,52,49,52,54,140,52,54,54,53,51,51,52,49,53,52,51,140,48,52,53,53,54,48,54,53,49,54,49,128,128,129,140,53,53,52,52,135,54,51,53,49,48,51,48,49,51,136,48,48,52,54,52,51,53,53,131,49,54,53,52,54,53,48,54,51,54,140,141,48,49,52,51,49,49,54,49,51,51,52,52,49,49,54,53,52,136,51,49,53,49,53,49,52,51,51,51,54,53,51,51,54,51,51,54,132,54,49,51,52,53,52,52,48,53,51,54,52,51,49,53,51,142,48,48,54,52,131,49,52,51,48,54,137,49,54,53,51,52,54,48,52,130,51,51,54,52,54,54,49,52,129,52,135,53,51,54,51,49,53,49,54,49,48,49,54,53,52,54,51,52,52,53,51,49,141,51,54,52,49,48,51,48,53,52,48,53,53,51,48,53,52,51,53,54,132,139,142,48,52,54,137,52,52,48,139,142,48,52,52,48,49,49,54,139,54,134,51,48,51,52,49,49,49,54,130,51,142,52,51,52,53,54,49,140,53,49,54,52,53,53,51,48,130,52,53,51,53,48,49,137,48,48,48,53,54,53,133,53,52,54,54,48,54,48,53,48,48,49,52,52,51,51,130,49,49,54,54,51,132,48,52,53,52,52,54,51,137,54,51,54,48,53,53,131,52,49,54,54,51,54,137,53,49,137,49,48,54,52,49,48,134,52,49,51,48,53,51,49,53,49,54,53,53,54,48,52,139,53,54,52,49,52,54,52,53,54,48,53,48,136,133,53,48,54,52,54,49,54,54,51,53,49,53,52,140,129,49,54,53,53,51,49,52,136,51,132,51,54,51,51,53,54,54,48,53,53,53,135,49,135,52,53,51,134,48,51,137,52,52,51,54,53,53,49,53,54,51,48,132,54,51,134,53,48,54,48,49,130,142,48,53,49,54,48,52,52,48,51,128,52,54,48,51,51,48,136,48,49,51,54,51,54,51,51,53,49,52,137,51,49,51,138,52,49,54,48,48,53,54,140,49,49,51,51,52,52,52,49,52,52,52,130,48,49,138,48,48,51,48,49,54,51,48,51,52,54,52,136,49,51,49,51,52,54,49,51,54,53,53,54,48,48,49,137,53,52,51,54,54,53,49,48,135,140,49,52,140,51,141,53,139,52,53,53,48,54,48,49,48,48,51,54,53,131,51,48,54,48,53,51,52,52,48,51,49,54,140,51,48,49,51,52,51,142,48,48,136,51,54,140,52,132,54,48,51,49,48,137,53,51,48,54,142,137,51,53,49,52,48,52,135,49,131,52,53,54,52,52,54,54,51,49,48,140,54,52,49,51,53,48,51,49,54,134,54,53,52,53,139,49,48,53,134,48,51,54,52,49,52,139,54,51,52,51,48,49,54,54,48,51,48,51,51,54,54,139,54,49,48,53,133,53,129,51,53,51,53,52,139,53,52,54,53,54,51,54,53,53,52,52,54,51,48,141,52,53,53,53,51,48,51,129,52,134,54,52,52,48,51,53,134,49,139,54,53,49,52,52,51,48,53,53,51,51,52,49,48,49,48,49,49,49,52,54,52,49,54,137,52,52,51,129,48,49,54,52,53,53,54,53,54,48,48,53,52,52,52,48,140,54,49,140,54,49,54,53,51,52,53,49,54,52,48,54,49,52,51,53,51,49,54,49,51,140,48,51,49,49,133,51,51,53,52,52,54,141,49,48,53,51,49,49,52,131,53,51,49,54,139,49,52,53,52,48,48,54,49,52,53,49,48,48,49,49,135,49,52,137,53,51,49,48,52,52,128,51,53,130,52,51,52,52,54,48,51,51,135,51,54,49,48,51,54,49,48,49,49,54,49,51,49,51,48,53,48,51,48,132,129,49,49,134,48,52,51,128,51,135,48,48,53,54,53,52,49,52,52,137,51,53,142,48,54,134,54,53,51,53,129,53,140,51,48,130,130,54,54,49,54,51,49,49,48,52,48,137,54,52,48,52,54,48,53,49,53,133,54,49,140,48,49,135,53,53,48,49,53,52,53,51,133,54,48,134,48,54,49,53,49,51,54,49,48,51,54,52,51,51,140,142,54,53,128,54,52,51,49,53,140,48,49,53,52,51,51,135,53,131,48,52,54,54,52,52,49,48,54,132,52,52,54,49,52,48,131,48,129,138,52,142,54,53,54,51,54,51,53,53,51,54,138,49,130,51,130,135,49,54,52,136,131,54,52,48,53,53,49,141,53,53,141,49,53,54,52,51,141,135,52,54,49,54,132,52,49,53,54,53,54,54,49,49,48,49,54,48,49,49,49,134,52,51,49,54,54,132,51,53,135,132,48,51,53,54,49,52,48,49,53,54,51,53,51,51,54,49,49,54,51,52,137,51,130,48,51,49,135,141,135,140,54,130,51,51,48,49,54,53,137,52,48,52,49,54,49,53,48,49,51,54,48,48,48,49,53,51,53,52,49,129,52,48,53,51,52,51,51,130,53,53,51,48,54,142,52,52,49,48,53,49,49,53,52,53,49,48,135,48,54,53,52,53,54,48,141,51,54,53,48,49,49,140,54,135,49,52,53,51,48,128,49,49,48,51,132,52,49,52,52,51,54,54,52,49,141,53,52,49,136,54,54,54,52,48,49,53,49,52,53,51,48,53,130,48,138,136,53,52,49,51,54,48,53,51,53,54,129,54,52,52,52,130,48,52,51,54,54,52,51,53,142,52,48,49,48,48,51,54,51,52,132,48,129,52,52,51,53,49,53,54,51,51,54,54,129,52,52,54,51,130,53,48,52,48,133,140,52,54,54,54,142,49,49,48,48,54,128,138,52,49,51,51,52,49,140,52,134,49,54,54,48,49,51,137,49,141,51,52,49,52,52,54,52,52,49,54,51,52,52,48,52,52,133,48,48,140,52,48,52,52,53,54,135,51,52,141,48,51,51,51,52,54,51,52,140,53,136,49,51,54,52,51,51,52,53,51,53,54,137,54,49,54,53,49,48,53,53,54,49,49,48,54,54,132,51,54,48,48,52,52,142,53,54,52,52,48,51,54,52,51,49,52,136,49,141,54,131,52,53,53,49,52,54,52,48,138,51,133,52,49,51,53,52,49,52,131,48,48,54,49,51,134,49,54,49,54,49,131,49,132,48,54,54,52,141,54,52,54,53,53,51,51,132,48,52,49,53,132,51,54,54,54,48,136,48,53,49,142,52,132,54,49,48,49,51,51,53,48,54,51,48,54,49,54,53,53,53,51,52,49,51,48,48,49,54,52,51,49,53,54,142,48,49,48,135,49,49,49,51,54,49,54,49,49,141,53,53,48,48,54,52,53,52,53,133,48,49,135,54,48,52,54,48,52,54,137,51,51,48,52,51,49,51,138,53,52,129,49,135,53,136,54,54,53,51,51,53,49,48,53,48,54,52,48,52,54,48,49,53,134,54,51,134,54,48,48,51,142,52,48,54,53,52,142,52,131,54,52,48,53,52,53,137,48,51,53,51,54,49,49,49,48,133,52,54,54,51,54,48,136,54,49,52,49,139,52,49,49,48,51,48,52,49,52,52,138,52,48,133,140,54,53,53,131,54,51,49,53,52,133,138,51,48,49,142,52,48,49,54,48,53,54,48,53,51,48,49,130,49,51,53,48,51,48,53,49,53,53,54,54,48,49,48,53,138,53,54,54,48,54,134,49,51,53,49,138,51,49,52,52,53,53,52,53,53,53,54,49,54,53,51,51,136,48,48,139,53,132,54,52,132,48,137,54,48,51,52,138,48,48,48,53,52,53,48,140,54,48,51,52,49,53,51,53,142,48,49,129,48,51,139,49,54,54,51,136,52,52,48,49,48,48,49,51,51,53,51,49,48,53,53,49,132,54,51,139,134,48,54,140,54,54,49,53,129,142,48,51,52,52,49,142,54,48,51,53,51,49,54,48,49,52,48,52,48,51,49,51,141,49,48,51,48,52,48,52,52,52,134,53,51,53,53,52,51,52,51,48,48,52,139,53,51,53,51,49,52,48,134,54,54,51,49,54,142,52,48,51,53,51,53,48,132,51,51,51,53,48,54,51,53,51,49,48,51,54,53,51,53,53];
	var re = new Array();
	for(var i=0;i < s1_data.length; i++){
		re[i] = [i+1,s1_data[i],0];
	}
	return re;
}

/*
 * redraw MAIN
 */
function startChart(mChart,canvas,leftCanvas,bottomCanvas,centerCanvas,chartName,option,rightCanvas){
	var optionx;
	if(mChart.bufferImage != null){
		mChart.resizeBuffers(canvas,leftCanvas,bottomCanvas,centerCanvas,rightCanvas,mChart);
		mChart.refreshNowBackground();
		if(mChart.zoom == 2){
			mChart.zoom = 3;  //줌상태이나 re zoom을 막고 re draw만함!
		}
	    mChart.draw();//hart.saveParams();
	}else{
	    mChart = new MbaseChart(
	    		canvas,
	    		leftCanvas,
	    		bottomCanvas);
	    mChart.init0(canvas,leftCanvas,bottomCanvas,centerCanvas,true,rightCanvas);
	    optionx = option;
	    mChart.init(optionx);
	    mChart.draw();//hart.saveParams();
	    //mChart.copyToOri();
	}
	
	
    charts[chartName] = mChart;
    options[chartName] = optionx;
}

function getSampleData_forMetrix(max,from,to){
		this.arr = [];
		var now_max;
		for(var i=from; i < to; i++){
			var row = [];

			for(var j=from; j < to; j++){

				if(j < 10){
					now_max = max*0.78;
				}else if(j < 20){
					now_max = max*0.80;			
				}else if(j < 40){
					now_max = max*0.84;			
				}else if(j < 50){
					now_max = max*0.90;	
				}else if(j < 50){
					now_max = max*0.92;			
				}else if(j < 60){
					now_max = max*0.94;			
				}else if(j < 70){
					now_max = max*0.96;	
				}else if(j < 75){
					now_max = max*0.98;						
				}else {
					now_max = max*1;			
				}
				now_max = parseInt(now_max);
				
				if(i < 20 && j < 20){
					now_max = 3;
					if(i < 10 && j < 6){
						now_max = 1;
					
					}
				}
				var result = Math.floor(Math.random() * now_max) + 1;
				if(result == 2 || result == 4 || result == 8 || result == 13 || result == 19 || result == 16  ){
					row[j] = 0;
				}else{
					row[j] = now_max;
				}

				
				
				var result2 = Math.floor(Math.random() * 6) + 1;
				if(i < 50 && j > 10*result2){
					row[j] = 0;
				}
				if(j < 10*result2 && i > 50){
					row[j] = 0;
				}
			}	

			arr[i] = row;
		}
		//console.log(JSON.stringify(arr));
		return arr;
}

function setChart(a,divObj,optionx){
	var b = document.createElement("canvas");b.width = 500;b.height = 300;
	var c = document.createElement("canvas");c.width = 0;c.height = 0;
	var d = document.createElement("canvas");d.width = 0;d.height = 0;
	var e = document.createElement("canvas");e.width = 0;e.height = 0;
	var r = document.createElement("canvas");r.width = 0;r.height = 0;
	
	divObj.append(b);//嶺뚳옙��떋占쎌삕占쎌럥由썲뜝�몄궡異�div�좎룞�숋옙怨뺣뼺�좎룞�쇿뜝占�
/*	divObj.append(c);
	divObj.append(d);
	divObj.append(e);*/
	var  mChart = new MbaseChart(b,c,d,e,r);
	mChart.drawChart(a,optionx);
	return mChart;
}

function setChartByName(a,b,c,d,e,optionx,r){
	var  mChart = new MbaseChart(b,c,d,e,r);
	mChart.drawChart(a,optionx);
	return mChart;
}



MbaseChart.prototype.reset = function(_obj) {
	var charto = charts[_obj.chartName];

	var arr = new Array();
	
	
	for(var i=1; i < _obj.series.length +1 ; i++){
		var tmp = _obj.series[i-1];
		var flag = false;
		var o = _obj.seriesChk[tmp.s_name];
		if(o == null){
			arr.push(tmp);
		}else if(o._chk){
			arr.push(tmp);
		}
	}

	
	charts[_obj.chartName].series = arr;
	starts();
}


MbaseChart.prototype.resetData = function(_obj) {

	var charto = charts[_obj.chartName];
	charto.series = _obj.arr;
	starts();
	charto.initView();
	
	charto.draw();
}

function winresize(){
	starts();
}
$(window).resize( winresize );