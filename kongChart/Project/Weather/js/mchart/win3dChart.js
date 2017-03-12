/*
 * coding rule
 * 	variable : camel
 * 	option : underbar
 */
HChart = function(_container) {
	var M = this;
	this.container = _container;
	this.mainCanvas = document.createElement("canvas");
	this.mainCanvasBuffer = document.createElement("canvas");
	this.mainCanvasMidBuffer = document.createElement("canvas");

	this.container.append(this.mainCanvas);
	//if( navigator.userAgent.match(/Android/i) ) {
		///this.mainCanvas.addEventListener('touchstart'	, 	function(event) {HChart.prototype.drawCrossLinesMobile(M,event);}, false);
		//this.mainCanvas.addEventListener('touchmove'	, 	function(event) {HChart.prototype.drawCrossLinesMobile(M,event);}, false);
		///this.mainCanvas.addEventListener('touchend'		, 	function(event) {HChart.prototype.drawCrossLinesMobile(M,event);}, false);
	//}else{
		/*
		if (this.mainCanvas.addEventListener) {
			this.mainCanvas.addEventListener('mousemove'	, 	function(event) {HChart.prototype.drawCrossLinesPc(M,event);}, false);
		}
		else {
			this.mainCanvas.attachEvent("mousemove", function(event) {HChart.prototype.drawCrossLinesPc(M,event);});
		}*/
	//}
		
	this.defaultColours = [
		                {red: 210,green: 206,blue: 233},
		                {red: 185,green: 176,blue: 239},
		                {red: 168,green: 148,blue: 217},
		                {red: 142,green: 123,blue: 202},
		                {red: 122,green: 77,blue: 255},
		                {red: 101,green: 62,blue: 189},
		                {red: 76,green: 28,blue: 228},
		                {red: 49,green: 5,blue: 206}
		                ];//작은숫자 밝게 위컬러, 큰숫자 어둡게 아래컬러
		
		
		
		
	this.defaultOption = {
		background_color:'rgba(255,255,0,1)',
		center_fill_color:'rgba(255,255,255,1)',
		color:'rgba(1,1,1,1)',
		pivot_mode:'XY'/* bottom:left*/,
		font_size:8,
		font_name:'Arial',
		font_color:'rgba(192,97,69,1)',
		font_weight:50,
		bottom_legend_box_height:40,
		bottom_legend_box_top_margin:5,
		bottom_legend_box_bottom_margin:5,
		left_legend_box_width:60,
		left_legend_box_left_margin:5,
		left_legend_box_right_margin:5,
		top_margin:0,
		right_margin:0,
		mark_width:5,
		mark_then_gep:2,
		gep_space:3,
		/*x_mark_cnt:11,//주어진숫자보다 1작은 mark가 생김 -2(상,하간격)빼고 0번째는 +1되므로)*/
		x_mark_cnt:10,
		y_mark_cnt:10,
		min:-100,
		max:100,
		xmin:0,
		xmax:10000,
		gradientBoxWidth:20,
		gradientBoxHeight:30,
		colours:this.defaultColours,
		unitLabel_3thVal:' ',
		gradientLegendShow:false
	};
	this.option = {};
	this.drawBarMap = {};
	var colorMax = 4;
};
HChart.prototype.drawCrossLinesPc = function(M,_event) {
	HChart.prototype.drawCrossLines(M,_event);
	_event.preventDefault();
	_event.stopPropagation();
	_event.stopImmediatePropagation();
	return false;
}

HChart.prototype.drawCrossLinesMobile = function(M,_touchEvent) {
	//
	HChart.prototype.drawCrossLines(M,_touchEvent.targetTouches[0]);
	_touchEvent.preventDefault();
	_touchEvent.stopPropagation();
	_touchEvent.stopImmediatePropagation();
	return false;
};
HChart.prototype.drawCrossLines = function(M,_event) {
	var lastX = (_event.offsetX || (_event.pageX - M.mainCanvas.offsetLeft));
	var lastY = _event.offsetY || (_event.pageY - M.mainCanvas.offsetTop);	
	
	M.mainCanvasMidBufferCtx.clearRect(0, 0, M.mainCanvasMidBuffer.width, M.mainCanvasMidBuffer.height);
	M.mainCanvasMidBufferCtx.drawImage(M.mainCanvasBuffer,0,0);
	if(M.o()['pivot_mode'] == 'XY'){
		//vertical draw!
		if(M.getLeftAxisWidth() < lastX && lastX < (M.getLeftAxisWidth()+M.getBottomAxisWidth())){
			var ex = lastX;
			var point = M.getMagneticX(ex);
			if(point != null){
				var mx = point['physical'];
				M.drawLine(M.o()['axis_stroke_color'],1,M.f(mx),M.f(M.o()['top_margin']),M.f(mx),M.f(M.o()['top_margin']+M.getLeftAxisHeight()),M.mainCanvasMidBufferCtx);
			}
		}
		//horizontal draw!
		if(M.o()['top_margin'] < lastY && lastY < (M.o()['top_margin']+M.getLeftAxisHeight())){
			M.drawLine(M.o()['axis_stroke_color'],1,M.f(M.getLeftAxisWidth()),M.f(lastY),M.f(M.getLeftAxisWidth()+M.getBottomAxisWidth()),M.f(lastY),M.mainCanvasMidBufferCtx);
		}
		
		var coord = {'x':'','y':''};
		if(typeof point != 'undefined' && point != null){
			//coord['x'] = M.f(point['logical']);
			//coord['y'] = lastY;
			coord['x'] = point['logical'];
			coord['y'] = M.toLogicalVal_L_Y(lastY,M.o()['series'][M.o()['minmax']['xCntMaxSIndex']]['s_min'],M.o()['series'][M.o()['minmax']['xCntMaxSIndex']]['s_max']).toFixed(2);	
			
			coord_text = '[ '+coord['x']+" ("+point['label']+") , "+coord['y'] +' ('+point['value']+') ]';
		}else{
			coord_text = '';
		}
		
		M.mainCanvasMidBufferCtx.fillStyle = M.o()['color'];
		M.mainCanvasMidBufferCtx.fillText(coord_text,
				M.f(M.getLeftAxisWidth()),
				M.o()['top_margin']-M.o()['mark_then_gep']
				);			
		M.mainCanvasCtx.clearRect(0, 0, M.mainCanvas.width, M.mainCanvas.height);
		M.mainCanvasCtx.drawImage(M.mainCanvasMidBuffer,0,0);
	}else{
		//vertical draw!
		if(M.o()['top_margin'] < lastY && lastY < (M.o()['top_margin']+M.getLeftAxisHeight())){
			var ex = lastY;
			var point = M.getMagneticX(ex);
			if(point != null){
				var mx = point['physical'];
				M.drawLine(M.o()['axis_stroke_color'],1,M.f(M.getLeftAxisWidth()),M.f(mx),M.f(M.getLeftAxisWidth()+M.getBottomAxisWidth()),M.f(mx),M.mainCanvasMidBufferCtx);
			}
		}
		if(M.getLeftAxisWidth() < _event.pageX && _event.pageX < (M.getLeftAxisWidth()+M.getBottomAxisWidth())){
			if(mx != null)
				M.drawLine(M.o()['axis_stroke_color'],1,M.f(lastX),M.f(M.o()['top_margin']),M.f(lastX),M.f(M.o()['top_margin']+M.getLeftAxisHeight()),M.mainCanvasMidBufferCtx);
						
		}
		var coord = {'x':'','y':''};
		var coord_text = '';
		if(typeof point != 'undefined' && point != null){
			coord['x'] = parseInt(M.f(point['logical']));
			coord['y'] = M.toLogicalVal_B(lastX).toFixed(2);			
			coord_text = '( '+coord['x']+" , "+coord['y']+' )';
		}else{
			coord_text = '';
		}
		M.mainCanvasMidBufferCtx.fillStyle = M.o()['color'];
		M.mainCanvasMidBufferCtx.fillText(coord_text,
				M.f(M.getLeftAxisWidth()),
				M.o()['top_margin']-M.o()['mark_then_gep']
				);			
		M.mainCanvasCtx.clearRect(0, 0, M.mainCanvas.width, M.mainCanvas.height);
		M.mainCanvasCtx.drawImage(M.mainCanvasMidBuffer,0,0);	
		
	}		
};
HChart.prototype.getMagneticX = function(_ex) {
	var reObj = {};
	var ex_logical;
	if(this.o()['pivot_mode'] == 'XY'){
		ex_logical = this.toLogicalVal_B_X(_ex);
	}else{
		ex_logical = this.toLogicalVal_L(_ex);
	}
	
	for(var i=0;i< this.o()['series'].length; i++){
		var s_data 			= this.o()['series'][i].s_data;
		for(var j=0;j < s_data.length; j++){
			var x 		= s_data[j][0];
			var x_label = s_data[j][2];
			var y_value = s_data[j][1];
			var x_1;
			var x_1_label;
			var y_1_yalue;
			if(j == (s_data.length-1)){
				x_1 	= x*2;
				x_1_label 	= s_data[j][2];
				y_1_yalue 	= s_data[j][1];
			}else{
				x_1 	= s_data[j+1][0];	
				x_1_label 	= s_data[j+1][2];
				y_1_yalue 	= s_data[j+1][1];
			}
			var x_val_mid = ((x+x_1)/2);
			var x_mid 	= x_val_mid;
			/* plus xAxis */
			if(
					((x < ex_logical || x == ex_logical) && (ex_logical < x_1))
			
			){
				var physic;
				if(
						 (ex_logical < x_mid || ex_logical == x_mid)
				){
					if(this.o()['pivot_mode'] == 'XY'){
						physic = this.toPhysicalVal_B_X(x);
					}else{
						physic = this.toPhysicalVal_L(x);
					}
					reObj['logical'] = x;
					reObj['label'] = x_label;
					reObj['value'] = y_value;
				}else{
					if(this.o()['pivot_mode'] == 'XY'){
						physic = this.toPhysicalVal_B_X(x_1);
					}else{
						physic = this.toPhysicalVal_L(x_1);
					}		
					reObj['logical'] = x_1;
					reObj['label'] = x_1_label;
					reObj['value'] = y_1_yalue;
				}	
				
				reObj['physical'] = physic;
				return reObj;
			}else 			if(
					((x > ex_logical || x == ex_logical) && (ex_logical > x_1))				
			
			){
				/* minus xAxis */
				var physic;
				if(
						 (ex_logical > x_mid || ex_logical == x_mid)
				){
					if(this.o()['pivot_mode'] == 'XY'){
						physic = this.toPhysicalVal_B_X(x);
					}else{
						physic = this.toPhysicalVal_L(x);
					}
					reObj['logical'] = x;
				}else{
					if(this.o()['pivot_mode'] == 'XY'){
						physic = this.toPhysicalVal_B_X(x_1);
					}else{
						physic = this.toPhysicalVal_L(x_1);
					}		
					reObj['logical'] = x_1;
				}	
				
				reObj['physical'] = physic;
				return reObj;
			}
		}
	}
	return null;
};
HChart.prototype.init = function(_option) {
	this.mainCanvasCtx = this.mainCanvas.getContext("2d");
	this.mainCanvasBufferCtx = this.mainCanvasBuffer.getContext("2d");
	this.mainCanvasMidBufferCtx = this.mainCanvasMidBuffer.getContext("2d");
	this.setOption(_option);
	this.resize();
	this.option['font'] = this.option['font_weight']+ ' ' +this.option['font_size']+'px '+this.option['font_name'];
	this.mainCanvasBufferCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);
	this.mainCanvasBufferCtx.font = this.option['font'];
	this.o()['leftLabelMaxWidth']  		= this.mainCanvasBufferCtx.measureText(this.o()['minmax']['xLabelMax']).width;
	this.o()['fontHeight'] 				= this.o()['font_size'];
	this.o()['leftLabelMaxHeight'] 		= this.o()['fontHeight'];
	this.o()['bottomLabelMaxWidth']  	= this.mainCanvasBufferCtx.measureText(this.comma(this.o()['minmax']['max'])).width;
	this.o()['bottomLabelMaxHeight']  	= this.o()['fontHeight'];
	this.o()['leftAxisWidth'] 			= this.o()['leftLabelMaxWidth'];
										+ 	this.o()['left_legend_box_width']
										+ 	this.o()['left_legend_box_left_margin']
										+ 	this.o()['left_legend_box_right_margin'];
	
	this.o()['bottomAxisHeight'] 		= this.o()['bottomLabelMaxHeight']
										+ 	this.o()['bottom_legend_box_height']
										+ 	this.o()['bottom_legend_box_top_margin']
										+ 	this.o()['bottom_legend_box_bottom_margin'];
};

HChart.prototype.resize = function() {
	var M = this;
	var cw = this.container.width();
	var ch = this.container.height();
	this.mainCanvas.width = cw;
	this.mainCanvas.height = ch;
	this.mainCanvasBuffer.width = this.mainCanvas.width;
	this.mainCanvasBuffer.height = this.mainCanvas.height;
	this.mainCanvasMidBuffer.width = this.mainCanvas.width;
	this.mainCanvasMidBuffer.height = this.mainCanvas.height;
};

HChart.prototype.redraw = function(_option) {
	this.resize();
	this.init(_option);

    var ctx=this.mainCanvasBufferCtx;
    var img = new Image();
    var m = this;
    img.onload=function(){
		ctx.globalAlpha = m.o()['globalAlpha'];
        ctx.drawImage(img,0,0,img.width,img.height,0,0,m.mainCanvas.width,m.mainCanvas.height);
		ctx.globalAlpha = 1;
        m.draw();
    	m.mainCanvasMidBufferCtx.clearRect(0, 0, m.mainCanvasMidBuffer.width, m.mainCanvasMidBuffer.height);
    	m.mainCanvasMidBufferCtx.drawImage(m.mainCanvasBuffer,0,0);
    	m.mainCanvasCtx.clearRect(0, 0, m.mainCanvas.width,m.mainCanvas.height);
    	m.mainCanvasCtx.drawImage(m.mainCanvasMidBuffer,0,0);        
    };
    img.src="http://chart.nanuminet.co.kr/Project/Weather/doc/3d_img.jpg";
		
	
	

	
};

HChart.prototype.getDefaultOption = function() {
	return this.defaultOption;
};
HChart.prototype.setDefaultOption = function(_defaultOption) {
	this.defaultOption = _defaultOption;
};
HChart.prototype.setOption = function(_option) {
	var OPTOBJ = this;
	$.each( _option, function( key, value ) {
		if(typeof value != 'object'){
				if(typeof value == 'undefined'){
				}else{
					try{
						if(typeof value == 'string'){
							OPTOBJ.option[key] = value;
						}else if(typeof value == 'number'){
							OPTOBJ.option[key] = value;
						}else if(typeof value == 'boolean'){
							//this.use_right_axis_only
							OPTOBJ.option[key] = JSON.parse(value);
						}
					}catch(e){
						alert('option error!');
						if(window.console != null) console.dir(e);
					}
				}
		}else{
			OPTOBJ.option[key] = value;
		}
	});
	OPTOBJ.setMinMax();
	if(window.console != null) console.dir('[OPTION]------------------------------------');
	if(window.console != null) console.dir(this.o());
};
HChart.prototype.o = function() {
	return this.option;
};

HChart.prototype.createOption = function() {
	return jQuery.extend(true, {}, this.getDefaultOption());
};

HChart.prototype.draw = function(_option) {
	/*
	this.drawBackground();
	*/
	this.drawMainTitle();	
	
	//this.drawYAxis();//_	
	
	//this.drawXAxis();//|
	
	this.draw3dBar();
	this.drawSeries();

	
	//this.drawArcs();
	
    
};


HChart.prototype.drawMainTitle = function(_option) {
	this.mainCanvasBufferCtx.fillStyle = this.o()['color'];
	this.mainCanvasBufferCtx.fillText(this.o()['chartTitle'],
			this.f((this.getBottomAxisWidthStart()+this.getBottomAxisWidth()/2)-this.mainCanvasBufferCtx.measureText(this.o()['chartTitle']).width/2),
			this.o()['top_margin']-this.o()['fontHeight']-this.o()['mark_then_gep']
			);	
};
HChart.prototype.drawGradient = function(_option) {
	var colours = this.o()['colours'];
	var zmin = this.o()['zmin'];
	var zmax = this.o()['zmax'];
	var gep = (zmax - zmin)/colours.length;
	var i=0;
	for(i=0;i < colours.length; i++){
		
		var color = colours[i];
		var boxWidth  = this.o()['gradientBoxWidth'];
		var boxHeight = this.o()['gradientBoxHeight'];
		var colorText = 'rgba('+color.red+','+color.green+','+color.blue+',1)';
		this.fillRect(
				colorText,
				1,
				this.getBottomAxisWidthEnd(),
				((this.getLeftAxisHeight()+this.o()['top_margin'])-boxHeight*i)-boxHeight,
				20,
				boxHeight
				);
		if(i != (colours.length-1) ){
			this.mainCanvasBufferCtx.fillStyle = 'rgba(0,0,0,1)';
			this.mainCanvasBufferCtx.fillText((zmin+(gep*(i+1))).toFixed(this.o()['toFixedY']),
					this.getBottomAxisWidthEnd()+boxWidth+2,
					((this.getLeftAxisHeight()+this.o()['top_margin'])-boxHeight*i)-boxHeight
					);			
		}

	}
	this.mainCanvasBufferCtx.fillStyle = 'rgba(0,0,0,1)';
	this.mainCanvasBufferCtx.fillText(this.o()['unitLabel_3thVal'],
			this.getBottomAxisWidthEnd()+3,
			((this.getLeftAxisHeight()+this.o()['top_margin'])-boxHeight*(i))-5
			);	
	

};

HChart.prototype.boxPosition = function(_boxsize,_min,_max,_nowHeight) {
	//(logical)_max-_min : _nowHeight  = _boxsize : x
	var x = (_nowHeight/(_max-_min))*_boxsize;
	return x;
};


HChart.prototype.drawSeries = function() {
	var pmode  = this.o()['pivot_mode'];
	if(pmode == 'XY'){
		//전체사각그리기에 포함되므로 여기선 생략
		//this.drawLine(this.o()['axis_stroke_color'],1,x,this.o()['top_margin'],x,this.o()['top_margin']+this.getLeftAxisHeight());
		var xCntMax = this.o()['minmax']['xCntMax'];
		//var markCount = this.getMarkCountLeft(xCntMax,this.o()['leftLabelMaxHeight']);
		var markCount = this.getMarkCountLeft();
		for(var i=0;i< this.o()['series'].length; i++){
			var s_data 			= this.o()['series'][i].s_data;
			var s_color 		= this.o()['series'][i].s_color;
			var s_lineWidth 	= this.o()['series'][i].s_lineWidth; 
			var s_shape 		= this.o()['series'][i].s_shape;
			var s_sizeDefault 	= this.o()['series'][i].s_sizeDefault;
			var s_shapeColor 	= this.o()['series'][i].s_shapeColor;
			var s_chartType 	= this.o()['series'][i].s_chartType;
			
			if(s_chartType == 'spline'){
				var prePonit = {};
				for(var j=0;j < s_data.length; j++){
					var x = s_data[j][0];
					var y = s_data[j][1];
					var px = this.toPhysicalVal_B_X(x);
					var py = this.toPhysicalVal_L_Y(y,this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max']);
					//this.drawLine(this.o()['axis_stroke_color'],1,prePonit['x'],prePonit['y'],py,px);
					if(j > 1 && j < s_data.length-1){
						this.CatmullRomSplines(s_color,s_lineWidth,
								{'_x':this.toPhysicalVal_B_X(s_data[j-2][0]),'_y':this.toPhysicalVal_L_Y(s_data[j-2][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j-1][0]),'_y':this.toPhysicalVal_L_Y(s_data[j-1][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j][0]),'_y':this.toPhysicalVal_L_Y(s_data[j][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j+1][0]),'_y':this.toPhysicalVal_L_Y(s_data[j+1][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])}
								);
					}else if(j == 1){
						this.CatmullRomSplines(s_color,s_lineWidth,
								{'_x':this.toPhysicalVal_B_X(s_data[j-1][0]),'_y':this.toPhysicalVal_L_Y(s_data[j-1][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j-1][0]),'_y':this.toPhysicalVal_L_Y(s_data[j-1][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j][0]),'_y':this.toPhysicalVal_L_Y(s_data[j][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j+1][0]),'_y':this.toPhysicalVal_L_Y(s_data[j+1][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])}
								);
					}else if(j == s_data.length-1){
						this.CatmullRomSplines(s_color,s_lineWidth,
								{'_x':this.toPhysicalVal_B_X(s_data[j-2][0]),'_y':this.toPhysicalVal_L_Y(s_data[j-2][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j-1][0]),'_y':this.toPhysicalVal_L_Y(s_data[j-1][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j][0]),'_y':this.toPhysicalVal_L_Y(s_data[j][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])},
								{'_x':this.toPhysicalVal_B_X(s_data[j][0]),'_y':this.toPhysicalVal_L_Y(s_data[j][1],this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max'])}
								);
					}
					

					prePonit['_x'] = py;
					prePonit['_y'] = px;
				}
			}else if(s_chartType == 'dot3d'){					
					for(var j=0;j < s_data.length; j++){
						var heightLevel = s_data[j][1];//고도
						var x = s_data[j][4]-5;//u x축 -5는 축보정값
						var y = s_data[j][5]+5;//v y축
						var degree = s_data[j][6];//풍향
						var speed = s_data[j][7];//풍속
						var areaName = s_data[j][8];//지역명
/*						x = 0-5;
						y = 0+5;*/
						var px = this.toPhysicalVal_B_X(x);
						var py = this.toPhysicalVal_L_Y(y,this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max']);
						
						if(s_shape == 'circle'){
							this.drawArc(
									s_shapeColor,
									1,
									px,
									py,
									s_sizeDefault);	
							
						}else if(s_shape == 'rectangle'){
							var boxHeight = Math.abs(100-s_sizeDefault*(py/5)/3);
							var hl = this.boxPosition(boxHeight,this.o()['barmin'],this.o()['barmax'],heightLevel);
							
							if(degree != null && speed != null){
								this.drawWindflag(px,py-hl,degree,10,20,this.o()['windFlagColor'],speed,'ms');
							}						
						}

						startx_axis = px; 
						starty = py;						
	
					}
				/*}*/	
			}else if(s_chartType == 'line' || s_chartType == 'dot'){
					
/*
				for(var i=0;i< this.o()['series'].length; i++){
					var startx_axis;
					var starty;					
					var s_data = this.o()['series'][i].s_data;
					var s_color = this.o()['series'][i].s_color;
					var s_lineWidth = this.o()['series'][i].s_lineWidth; 
					var s_shape = this.o()['series'][i].s_shape;
					var s_sizeDefault = this.o()['series'][i].s_sizeDefault;
					var s_shapeColor = this.o()['series'][i].s_shapeColor;
					if(window.console != null) console.log(s_color);
					var prePonit = {};*/
					for(var j=0;j < s_data.length; j++){
						var x = s_data[j][4]-5;//u x축 -5는 축보정값
						var y = s_data[j][5]+5;//v y축
/*						x = 0-5;
						y = 0+5;*/
						var px = this.toPhysicalVal_B_X(x);
						var py = this.toPhysicalVal_L_Y(y,this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max']);
						
						if(s_shape == 'circle'){
							this.drawArc(
									s_shapeColor,
									1,
									px,
									py,
									s_sizeDefault);	
							
						}else if(s_shape == 'rectangle'){
							this.fillRect(
									s_shapeColor,
									1,
									px-s_sizeDefault/2,
									py-s_sizeDefault/2,
									s_sizeDefault,
									s_sizeDefault
									);
						}

						
						if(j != 0 && s_chartType != 'dot'){
							this.drawLine(s_color,1,
									startx_axis,starty,px,py);	
						}
						startx_axis = px; 
						starty = py;						
	
					}
				/*}*/
			}else if(s_chartType == 'metrix'){
					var startx_axis;
					var starty;					
					var s_data 			= this.o()['series'][i].s_data;
					var s_color 		= this.o()['series'][i].s_color;
					var s_lineWidth 	= this.o()['series'][i].s_lineWidth; 
					var s_shape 		= this.o()['series'][i].s_shape;
					var s_sizeDefault 	= this.o()['series'][i].s_sizeDefault;
					var s_shapeColor 	= this.o()['series'][i].s_shapeColor;
					//if(window.console != null) console.log(s_color);
					var prePonit = {};
					for(var j=0;j < s_data.length; j++){
						var x = s_data[j][0];
						var y = s_data[j][3];
						var y1 = s_data[j][4];
						var y2 = s_data[j][5];//풍속
						var px = this.toPhysicalVal_B_X(x);
						var py = this.toPhysicalVal_L_Y(y,this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max']);
						

						if(s_shape == 'arrow'){
							var color = this.o()['colorObj'].getColour(y2);
							var colorText = 'rgba('+color.red+','+color.green+','+color.blue+',1)';
							if(typeof y1 != 'undefined'){
								this.drawArrow(px,py,y,5,8,colorText);//화살표의키,화살표의폭
							}
						}else if(s_shape == 'windflag'){
								//var color = this.o()['colorObj'].getColour(y2);
								var colorText = 'rgba(62,52,192,1)';
								if(typeof y2 != 'undefined'){
									this.drawWindflag(px,py,y,10,30,colorText,y2,this.o()['windflag_unit']);//y2:풍속
								}
						}else if(s_shape == 'circle'){
							var color = this.o()['colorObj'].getColour(y1);
							var colorText = 'rgba('+color.red+','+color.green+','+color.blue+',3)';
							if(typeof y1 != 'undefined'){
								this.drawArc(
										colorText,
										1,
										px,
										py,
										s_sizeDefault);		
							}
						}else if(s_shape == 'rectangle'){
							/*							
							 * 					
							 * Array[6]
							0: "-53.83"
							1: 0.565
							2: "2016-02-08 06:40:00"
							3: 250
							4: 0.565
							5: undefined
							length: 6
							__proto__: Array[0]*/
							var color = this.o()['colorObj'].getColour(y1);
							var colorText = 'rgba('+color.red+','+color.green+','+color.blue+',1)';
							var starty = this.getLeftAxisHeight()+this.o()['top_margin'];
							if((py-s_sizeDefault/2 + s_sizeDefault*24) < starty ){
								if(typeof y1 != 'undefined'){
									this.fillRect(
											colorText,
											1,
											px-s_sizeDefault/2,
											py-s_sizeDefault/2,
											s_sizeDefault*2,
											s_sizeDefault*24
											);	
								}
							}

						}

						startx_axis = px; 
						starty = py;						
	
					}
				
			}
				
		}

		
		
		
	}else{
		//전체사각그리기에 포함되므로 여기선 생략
		//this.drawLine(this.o()['axis_stroke_color'],1,x,this.o()['top_margin'],x,this.o()['top_margin']+this.getLeftAxisHeight());
		var xCntMax = this.o()['minmax']['xCntMax'];
		//var markCount = this.getMarkCountLeft(xCntMax,this.o()['leftLabelMaxHeight']);
		var markCount = this.getMarkCountLeft();
		
		for(var i=0;i< this.o()['series'].length; i++){
			var s_data 			= this.o()['series'][i].s_data;
			var s_color 		= this.o()['series'][i].s_color;
			var s_lineWidth 	= this.o()['series'][i].s_lineWidth; 
			var s_shape 		= this.o()['series'][i].s_shape;
			var s_sizeDefault 	= this.o()['series'][i].s_sizeDefault;
			var s_shapeColor 	= this.o()['series'][i].s_shapeColor;
			var prePonit = {};
			for(var j=0;j < s_data.length; j++){
				var x = s_data[j][0];
				var y = s_data[j][1];

				var py = this.toPhysicalVal_B(y);
				var px = this.toPhysicalVal_L(x);
				//this.drawLine(this.o()['axis_stroke_color'],1,prePonit['x'],prePonit['y'],py,px);
				if(j > 1 && j < s_data.length-1){
					this.CatmullRomSplines(s_color,s_lineWidth,
							{'_x':this.toPhysicalVal_B(s_data[j-2][1]),'_y':this.toPhysicalVal_L(s_data[j-2][0])},
							{'_x':this.toPhysicalVal_B(s_data[j-1][1]),'_y':this.toPhysicalVal_L(s_data[j-1][0])},
							{'_x':this.toPhysicalVal_B(s_data[j][1]),'_y':this.toPhysicalVal_L(s_data[j][0])},
							{'_x':this.toPhysicalVal_B(s_data[j+1][1]),'_y':this.toPhysicalVal_L(s_data[j+1][0])}
							);
				}else if(j == 1){
					this.CatmullRomSplines(s_color,s_lineWidth,
							{'_x':this.toPhysicalVal_B(s_data[j-1][1]),'_y':this.toPhysicalVal_L(s_data[j-1][0])},
							{'_x':this.toPhysicalVal_B(s_data[j-1][1]),'_y':this.toPhysicalVal_L(s_data[j-1][0])},
							{'_x':this.toPhysicalVal_B(s_data[j][1]),'_y':this.toPhysicalVal_L(s_data[j][0])},
							{'_x':this.toPhysicalVal_B(s_data[j+1][1]),'_y':this.toPhysicalVal_L(s_data[j+1][0])}
							);
				}else if(j == s_data.length-1){
					this.CatmullRomSplines(s_color,s_lineWidth,
							{'_x':this.toPhysicalVal_B(s_data[j-2][1]),'_y':this.toPhysicalVal_L(s_data[j-2][0])},
							{'_x':this.toPhysicalVal_B(s_data[j-1][1]),'_y':this.toPhysicalVal_L(s_data[j-1][0])},
							{'_x':this.toPhysicalVal_B(s_data[j][1]),'_y':this.toPhysicalVal_L(s_data[j][0])},
							{'_x':this.toPhysicalVal_B(s_data[j][1]),'_y':this.toPhysicalVal_L(s_data[j][0])}
							);
				}
				

				prePonit['_x'] = py;
				prePonit['_y'] = px;

			}
		}
		
		
		for(var i=0;i< this.o()['series'].length; i++){
			var s_data = this.o()['series'][i].s_data;
			var s_color = this.o()['series'][i].s_color;
			var s_lineWidth = this.o()['series'][i].s_lineWidth; 
			var s_shape = this.o()['series'][i].s_shape;
			var s_sizeDefault = this.o()['series'][i].s_sizeDefault;
			var s_shapeColor = this.o()['series'][i].s_shapeColor;
			var prePonit = {};
			for(var j=0;j < s_data.length; j++){
				var x = s_data[j][0];
				var y = s_data[j][1];

				var py = this.toPhysicalVal_B(y);
				var px = this.toPhysicalVal_L(x);

				if(s_shape == 'circle'){
					this.drawArc(
							s_shapeColor,
							1,
							py,
							px,
							s_sizeDefault);	
					
				}else if(s_shape == 'rectangle'){
					this.fillRect(
							s_shapeColor,
							1,
							py-s_sizeDefault/2,
							px-s_sizeDefault/2,
							s_sizeDefault,
							s_sizeDefault
							);
				}

			}
		}
		
		
		
		
		
		

	}
};


HChart.prototype.draw3dBar = function() {
	var pmode  = this.o()['pivot_mode'];
	if(pmode == 'XY'){
		var xCntMax = this.o()['minmax']['xCntMax'];
		var markCount = this.getMarkCountLeft();
		for(var i=0;i< this.o()['series'].length; i++){
			var s_data 			= this.o()['series'][i].s_data;
			var s_color 		= this.o()['series'][i].s_color;
			var s_lineWidth 	= this.o()['series'][i].s_lineWidth; 
			var s_shape 		= this.o()['series'][i].s_shape;
			var s_sizeDefault 	= this.o()['series'][i].s_sizeDefault;
			var s_shapeColor 	= this.o()['series'][i].s_shapeColor;
			var s_chartType 	= this.o()['series'][i].s_chartType;
			
			if(s_chartType == 'dot3d'){
					for(var j=0;j < s_data.length; j++){
						var heightLevel = s_data[j][1];//고도
						var x = s_data[j][4]-5;//u x축 -5는 축보정값
						var y = s_data[j][5]+5;//v y축
						var areaName = s_data[j][8];//지역명
						var px = this.toPhysicalVal_B_X(x);
						var py = this.toPhysicalVal_L_Y(y,this.o()['series'][i]['s_min'],this.o()['series'][i]['s_max']);
						var boxHeight = Math.abs(100-s_sizeDefault*(py/5)/3);
						var s_shapeColorR = s_shapeColor.replace(/rgba\(([0-9]*),([0-9]*),([0-9]*),([0-9]*)\)/g,'$1');
						var s_shapeColorG = s_shapeColor.replace(/rgba\(([0-9]*),([0-9]*),([0-9]*),([0-9]*)\)/g,'$2');
						var s_shapeColorB = s_shapeColor.replace(/rgba\(([0-9]*),([0-9]*),([0-9]*),([0-9]*)\)/g,'$3');
						
						var s_shapeColorTmp = s_shapeColor.replace(/rgba\(([0-9]*),([0-9]*),([0-9]*),([0-9]*)\)/g,'$4');
						var s_shapeColorNum = parseFloat(s_shapeColorTmp);
						var alpha = s_shapeColorNum-(s_shapeColorNum/((s_data.length-j)+2))-0.3;
						
						var colorText = 'rgba('+s_shapeColorR+','+s_shapeColorG+','+s_shapeColorB+','+alpha+')';
						var barWidth = null;
						if(this.o()['barWidth'] == null){
							barWidth = 20-s_sizeDefault;								
						}else{
							barWidth = this.o()['barWidth'];								
						}
						this.fillRect(
								colorText,
								1,
								px-barWidth/2,
								py-(boxHeight),
								barWidth,
								boxHeight
								);	
						this.drawBarMap[areaName] = areaName;				
						startx_axis = px; 
						starty = py;						
					}
			}
				
		}

		
		
		
	}else{
		//전체사각그리기에 포함되므로 여기선 생략
		//this.drawLine(this.o()['axis_stroke_color'],1,x,this.o()['top_margin'],x,this.o()['top_margin']+this.getLeftAxisHeight());
		var xCntMax = this.o()['minmax']['xCntMax'];
		//var markCount = this.getMarkCountLeft(xCntMax,this.o()['leftLabelMaxHeight']);
		var markCount = this.getMarkCountLeft();
		
		for(var i=0;i< this.o()['series'].length; i++){
			var s_data 			= this.o()['series'][i].s_data;
			var s_color 		= this.o()['series'][i].s_color;
			var s_lineWidth 	= this.o()['series'][i].s_lineWidth; 
			var s_shape 		= this.o()['series'][i].s_shape;
			var s_sizeDefault 	= this.o()['series'][i].s_sizeDefault;
			var s_shapeColor 	= this.o()['series'][i].s_shapeColor;
			var prePonit = {};
			for(var j=0;j < s_data.length; j++){
				var x = s_data[j][0];
				var y = s_data[j][1];

				var py = this.toPhysicalVal_B(y);
				var px = this.toPhysicalVal_L(x);
				//this.drawLine(this.o()['axis_stroke_color'],1,prePonit['x'],prePonit['y'],py,px);
				if(j > 1 && j < s_data.length-1){
					this.CatmullRomSplines(s_color,s_lineWidth,
							{'_x':this.toPhysicalVal_B(s_data[j-2][1]),'_y':this.toPhysicalVal_L(s_data[j-2][0])},
							{'_x':this.toPhysicalVal_B(s_data[j-1][1]),'_y':this.toPhysicalVal_L(s_data[j-1][0])},
							{'_x':this.toPhysicalVal_B(s_data[j][1]),'_y':this.toPhysicalVal_L(s_data[j][0])},
							{'_x':this.toPhysicalVal_B(s_data[j+1][1]),'_y':this.toPhysicalVal_L(s_data[j+1][0])}
							);
				}else if(j == 1){
					this.CatmullRomSplines(s_color,s_lineWidth,
							{'_x':this.toPhysicalVal_B(s_data[j-1][1]),'_y':this.toPhysicalVal_L(s_data[j-1][0])},
							{'_x':this.toPhysicalVal_B(s_data[j-1][1]),'_y':this.toPhysicalVal_L(s_data[j-1][0])},
							{'_x':this.toPhysicalVal_B(s_data[j][1]),'_y':this.toPhysicalVal_L(s_data[j][0])},
							{'_x':this.toPhysicalVal_B(s_data[j+1][1]),'_y':this.toPhysicalVal_L(s_data[j+1][0])}
							);
				}else if(j == s_data.length-1){
					this.CatmullRomSplines(s_color,s_lineWidth,
							{'_x':this.toPhysicalVal_B(s_data[j-2][1]),'_y':this.toPhysicalVal_L(s_data[j-2][0])},
							{'_x':this.toPhysicalVal_B(s_data[j-1][1]),'_y':this.toPhysicalVal_L(s_data[j-1][0])},
							{'_x':this.toPhysicalVal_B(s_data[j][1]),'_y':this.toPhysicalVal_L(s_data[j][0])},
							{'_x':this.toPhysicalVal_B(s_data[j][1]),'_y':this.toPhysicalVal_L(s_data[j][0])}
							);
				}
				

				prePonit['_x'] = py;
				prePonit['_y'] = px;

			}
		}
		
		
		for(var i=0;i< this.o()['series'].length; i++){
			var s_data = this.o()['series'][i].s_data;
			var s_color = this.o()['series'][i].s_color;
			var s_lineWidth = this.o()['series'][i].s_lineWidth; 
			var s_shape = this.o()['series'][i].s_shape;
			var s_sizeDefault = this.o()['series'][i].s_sizeDefault;
			var s_shapeColor = this.o()['series'][i].s_shapeColor;
			var prePonit = {};
			for(var j=0;j < s_data.length; j++){
				var x = s_data[j][0];
				var y = s_data[j][1];

				var py = this.toPhysicalVal_B(y);
				var px = this.toPhysicalVal_L(x);

				if(s_shape == 'circle'){
					this.drawArc(
							s_shapeColor,
							1,
							py,
							px,
							s_sizeDefault);	
					
				}else if(s_shape == 'rectangle'){
					this.fillRect(
							s_shapeColor,
							1,
							py-s_sizeDefault/2,
							px-s_sizeDefault/2,
							s_sizeDefault,
							s_sizeDefault
							);
				}

			}
		}
		
		
		
		
		
		

	}
};


HChart.prototype.drawBackground = function() {
	this.mainCanvasBufferCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
	this.mainCanvasBufferCtx.fillStyle = this.o()['background_color'];
	this.mainCanvasBufferCtx.fillRect(0,0,this.mainCanvas.width, this.mainCanvas.height);
	
};
HChart.prototype.drawXAxis = function() {
	/*
	this.mainCanvasBufferCtx.fillStyle = this.o()['color'];
	this.mainCanvasBufferCtx.fillText(this.o()['unitLabel_Hori'],
			this.f((this.getBottomAxisWidthStart()+this.getBottomAxisWidth())-this.mainCanvasBufferCtx.measureText(this.o()['unitLabel_Hori']).width/2),
			this.getLeftAxisHeight()+this.o()['top_margin']+this.o()['fontHeight']+this.o()['mark_then_gep']
			);
	*/
	
	var pmode  = this.o()['pivot_mode'];
	if(pmode == 'XY'){
		var startx_axis = this.getLeftAxisWidth();
		var starty = this.getLeftAxisHeight()+this.o()['top_margin'];
		var endx_axis = this.getBottomAxisWidthStart()+this.getBottomAxisWidth();
		var endy = starty;
		
		var startx 	= this.getBottomAxisMarkStart();
		var endx 	= this.getBottomAxisMarkEnd();
		this.drawLine(this.o()['axis_stroke_color'],1,
				startx_axis,starty,endx_axis,endy);
		var markGep = this.getMarkGepBottom();
		
		//x
		this.drawLine(this.o()['axis_stroke_color'],1,this.f(startx_axis),this.f(this.o()['top_margin']+this.getLeftAxisHeight()/2),this.f(startx_axis+this.getBottomAxisWidth()),this.f(this.o()['top_margin']+this.getLeftAxisHeight()/2));

		for(var i=startx-markGep/2; i < endx+1; i+=markGep) {
			var x = i;
			var y = starty;
			var x_val = 0;
			
			if(this.o()['toFixedX'] != 0){
				x_val = this.toLogicalVal_B_X(x+markGep/2).toFixed(this.o()['toFixedY']);
			}else{
				x_val = this.toLogicalVal_B_X(x+markGep/2);
			};
			
			var xval = this.f(x_val);
			var x_label = this.comma(xval+'');
			this.drawLine(this.o()['axis_stroke_color'],1,this.f(x),starty-this.getLeftAxisHeight()/2-this.o()['mark_width']/2,this.f(x),this.f(starty-this.getLeftAxisHeight()/2+this.o()['mark_width']/2));
			if(x_val != 0){
				
				this.drawDLine_V(this.o()['axis_stroke_color'],1,this.f(x),starty,this.f(x),this.f(starty-this.getLeftAxisHeight()),2);
				
				this.mainCanvasBufferCtx.fillStyle = this.o()['color'];
				this.mainCanvasBufferCtx.fillText(x_label,
						this.f(x-this.mainCanvasBufferCtx.measureText(x_label).width/2),
						this.f(starty-this.getLeftAxisHeight()/2+this.o()['mark_width']/2)
						);		
				
			}

					
			/*
			if(typeof this.o()['startDateTime'] != 'undefined' && this.o()['startDateTime'] != null){
				var calcStrObj = this.calcDate(this.o()['startDateTime'],xval);
				var calcStr = calcStrObj['day']+' '+calcStrObj['hour']+':'+calcStrObj['min'];
				this.mainCanvasBufferCtx.fillText(calcStr,
						this.f(x-this.mainCanvasBufferCtx.measureText(calcStr).width/2),
						this.f(y+this.o()['mark_width']+(this.o()['mark_then_gep']+this.o()['leftLabelMaxHeight'])*2)
						);		
			}
			*/				
		}
	}else{		
	
	}
};
HChart.prototype.drawArcs = function() {
	var markGepx = this.getMarkGepBottom();
	var markGepy = this.getMarkGepLeft();	
	var orix = this.f(this.getLeftAxisWidth()+this.getBottomAxisWidth()/2);
	var oriy = this.f(this.o()['top_margin']+this.getLeftAxisHeight()/2);
	
	var loop = this.o()['y_mark_cnt']/2+1;
	for(var z=0; z < loop; z++){
		this.drawArcNofill(
				this.o()['hodo_circle_color'],
				1,
				orix,
				oriy,
				markGepx*z,
				markGepy*z);		
	}
};

//점선그리기
HChart.prototype.drawDLine_H = function(_color,_lineWidth,_x1,_y1,_x2,_y2,_depth) {
	for(var i=_x1; i < _x2; i=i+_depth*2 ){
		this.drawLine(_color,_lineWidth,i,_y1,i+_depth,_y2);	
	}
}
//점선그리기
HChart.prototype.drawDLine_V = function(_color,_lineWidth,_x1,_y1,_x2,_y2,_depth) {
	for(var i=_y1; i > _y2+_depth; i=i-_depth*2 ){
		this.drawLine(_color,_lineWidth,_x1,i,_x2,i-_depth);	
	}
}

HChart.prototype.drawYAxis = function() {
	/*
	this.mainCanvasBufferCtx.fillStyle = this.o()['color'];
	this.mainCanvasBufferCtx.fillText(this.o()['unitLabel_Verti'],
			this.getLeftAxisWidth()-this.mainCanvasBufferCtx.measureText(this.o()['unitLabel_Verti']).width-this.o()['gep_space'],
			this.o()['top_margin']+this.o()['fontHeight']);	
	*/
	
	var pmode  = this.o()['pivot_mode'];
	if(pmode == 'XY'){
		var _x1 = this.getLeftAxisWidth();
		var _y1 = this.o()['top_margin'];
		var _width1 = this.getBottomAxisWidth();
		var _height1 = this.getLeftAxisHeight();
		this.drawRect(
				this.o()['axis_stroke_color'],
				1,_x1,_y1,_width1,_height1);
		/*
		this.fillRect(
				this.o()['center_fill_color'],
				1,_x1,_y1,_width1,_height1);			
		*/
		//y		
		this.drawLine(this.o()['axis_stroke_color'],1,this.f(_x1+_width1/2),this.f(_y1),this.f(_x1+_width1/2),this.f(_y1+_height1));	

		var axisLeng = 1;
		if(this.o()['multiYAxis']){
			axisLeng = this.o()['series'].length;
		}else{
			axisLeng = 1;
		}
		for(var k=0;k<axisLeng;k++){			
			//전체사각그리기에 포함되므로 여기선 생략
			var xCntMax = this.o()['minmax']['xCntMax'];
			var markCount = this.getMarkCountLeft();
			var data;
			if(this.o()['multiYAxis']){
			//if(false){
				data = this.o()['series'][k].s_data;
			}else{
				data = this.o()['series'][this.o()['minmax']['xCntMaxSIndex']].s_data;
			}
			//var xgep = parseFloat(this.getLeftAxisHeight())/parseFloat(markCount);
			//var viewCnt = Math.ceil(data.length/(markCount-2));
			//무조건 xmin,xmax로 축을 그림(+1마지막 눈금추가)
			
			var endx 	= this.getLeftAxisMarkEnd();
			var markGep = this.getMarkGepLeft();	
			var startx 	= this.getLeftAxisMarkStart();			
			var x 		= this.getLeftAxisWidth()-k*this.getLeftAxisWidthPerAxis()+_width1/2;
			var j=0;
			var y;			
			
			startx -= markGep/2;
			for(var i= 0; (y = ((startx)-(i*markGep))) > endx-(markGep/2)-1; i++) {
					//y = ((startx)-(i*markGep));
					var p_y = this.toLogicalVal_L_Y(y+(markGep/2),this.o()['series'][k]['s_min'],this.o()['series'][k]['s_max']);
					var i_label;
					if(this.o()['toFixedY'] != 0){
						i_label = this.comma(p_y.toFixed(this.o()['toFixedY']));
					}else{
						i_label = this.comma(p_y);
					};
					
					this.drawLine(this.o()['axis_stroke_color'],1,this.f(x+this.o()['mark_width']/2),this.f(y),this.f(x-this.o()['mark_width']/2),this.f(y));
					
					if(p_y != 0){
						if(k == 0){
							this.drawDLine_H(this.o()['axis_stroke_color'],1,
									this.f(x-this.getBottomAxisWidth()/2),
									this.f(y),
									this.f(x+this.getBottomAxisWidth()/2),
									this.f(y),
									2);
						}
	
						
						this.mainCanvasBufferCtx.fillStyle = this.o()['color'];
						this.mainCanvasBufferCtx.fillText(i_label,
								x-this.o()['mark_width']-(this.mainCanvasBufferCtx.measureText(i_label).width+this.o()['gep_space']),
								y+this.o()['leftLabelMaxHeight']/2);	
					}
					j++;
					
			}
						
			
		}

	}else{

	}
};
HChart.prototype.setMinMax = function() {
	var minmaxObj = this.o()['minmax'];
	//if(minmaxObj == null){
		var series = this.o()['series'];
		var min;
		var max;
		var xCntMin;
		var xCntMax;
		var xCntMaxSIndex;
		var xLabelMax='';
		for(var i=0; i < series.length; i++){
			if(i == 0){
				xCntMin 		= series[i].s_data.length;
				xCntMax 		= xCntMin;
				xCntMaxSIndex 	= i;
			}else{
				if(xCntMin >  series[i].s_data.length){
					min =  series[i].s_data.length;	
				}else if(xCntMax <  series[i].s_data.length){
					max =  series[i].s_data.length;	
					xCntMaxSIndex 	= i;
				}			
			}
			for(var j=0; j < series[i].s_data.length; j++){
				if(i == 0 && j == 0){
					min 			= series[i].s_data[j][1];
					max 			= min;
					xLabelMax 		= series[i].s_data[j][0]+'';
				}else{
					if(min >  series[i].s_data[j][1]){
						min =  series[i].s_data[j][1];	
					}else if(max <  series[i].s_data[j][1]){
						max =  series[i].s_data[j][1];				
					}
					if(xLabelMax.length < (series[i].s_data[j][0]+'').length){
						xLabelMax = (series[i].s_data[j][0]+'');
					}
				}
			}
		}
		if(this.o()['max'] != null){
			max = this.o()['max'];
		}
		if(this.o()['min'] != null){
			min = this.o()['min'];
		}
		var reMinMaxObj = {
				'min':min,/*y데이터의 최소값*/
				'max':max,/*y데이터의 최대값*/
				'xCntMin':xCntMin,/*시리즈중 데이터개수가 가장 적은 놈의 데이터개수*/
				'xCntMax':xCntMax,/*시리즈중 데이터개수가 가장 많은 놈의 데이터개수*/
				'xCntMaxSIndex':xCntMaxSIndex,/*최대수를가진시리즈index*/
				'xLabelMax':xLabelMax/*xLabel중 가장 길이가 긴것*/
				};
		this.o()['minmax'] = reMinMaxObj;
	//}
	return this.o()['minmax'];
};
HChart.prototype.comma = function(n) {
	var k = parseFloat(n);
	if(n == k){
		var reg = /(^[+-]?\d+)(\d{3})/;   
		n += '';                          

		while (reg.test(n))
	    n = n.replace(reg, '$1' + ',' + '$2');
	}
	return n;
};
HChart.prototype.getTextHeightObj = function(font) {
	  var text = $('<span>Hg</span>').css({ fontFamily: font });
	  var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');
	  var div = $('<div></div>');
	  div.append(text, block);
	  var body = $('body');
	  body.append(div);
	  try {
	    var result = {};
	    block.css({ verticalAlign: 'baseline' });
	    result.ascent = block.offset().top - text.offset().top;
	    block.css({ verticalAlign: 'bottom' });
	    result.height = block.offset().top - text.offset().top;
	    result.descent = result.height - result.ascent;
	  } finally {
	    div.remove();
	  }
	  return result;
};

HChart.prototype.drawLine = function(_color,_lineWidth,_x1,_y1,_x2,_y2,_ctx) {
	if(_ctx == null){
		_ctx = this.mainCanvasBufferCtx;
	}
	_ctx.strokeStyle = _color;
	_ctx.beginPath();
	try{
		_ctx.translate(0.5, 0.5);
		_ctx.lineWidth = _lineWidth;
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	_ctx.moveTo(_x1,_y1);
	_ctx.lineTo(_x2,_y2);
	_ctx.stroke();
	try{
		_ctx.translate(-0.5, -0.5);
	}catch(e){
		console.dir(e);
	}
	_ctx.closePath();
};
HChart.prototype.drawArc = function(_color,_lineWidth,_x1,_y1,_r) {
	
	this.mainCanvasBufferCtx.strokeStyle = _color;
	this.mainCanvasBufferCtx.beginPath();
	try{
		this.mainCanvasBufferCtx.translate(0.5, 0.5);
		this.mainCanvasBufferCtx.lineWidth = _lineWidth;
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	this.mainCanvasBufferCtx.arc(_x1, _y1,_r, 0, 2 * Math.PI, false);
	this.mainCanvasBufferCtx.fill();
	try{
		this.mainCanvasBufferCtx.translate(-0.5, -0.5);
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	this.mainCanvasBufferCtx.stroke();
	this.mainCanvasBufferCtx.closePath();
};

HChart.prototype.drawArcNofill = function(_color,_lineWidth,_x1,_y1,_r,_r2) {
	
	this.mainCanvasBufferCtx.strokeStyle = _color;
	this.mainCanvasBufferCtx.beginPath();
	try{
		this.mainCanvasBufferCtx.translate(0.5, 0.5);
		this.mainCanvasBufferCtx.lineWidth = _lineWidth;
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	var x = _x1-_r;
	var y = _y1-_r2;
	var w = _r*2;
	var h = _r2*2;
	var ctx = this.mainCanvasBufferCtx;

		  var kappa = .5522848;

		      ox = (w / 2) * kappa, // control point offset horizontal

		      oy = (h / 2) * kappa, // control point offset vertical

		      xe = x + w,           // x-end

		      ye = y + h,           // y-end

		      xm = x + w / 2,       // x-middle

		      ym = y + h / 2;       // y-middle



		  ctx.moveTo(x, ym);

		  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);

		  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);

		  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);

		  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);



	
	
	//this.mainCanvasBufferCtx.fill();
	try{
		this.mainCanvasBufferCtx.translate(-0.5, -0.5);
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	this.mainCanvasBufferCtx.stroke();
	this.mainCanvasBufferCtx.closePath();
};


HChart.prototype.drawRect = function(_color,_lineWidth,_x1,_y1,_x2,_y2) {
	this.mainCanvasBufferCtx.strokeStyle = _color;
	this.mainCanvasBufferCtx.beginPath();
	try{
		this.mainCanvasBufferCtx.translate(0.5, 0.5);
		this.mainCanvasBufferCtx.lineWidth = _lineWidth;
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	this.mainCanvasBufferCtx.strokeRect(_x1,_y1,_x2,_y2);
	try{
		this.mainCanvasBufferCtx.translate(-0.5, -0.5);
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	this.mainCanvasBufferCtx.closePath();
};
HChart.prototype.fillRect = function(_fill_color,_lineWidth,_x1,_y1,_x2,_y2) {
	this.mainCanvasBufferCtx.fillStyle = _fill_color;
	this.mainCanvasBufferCtx.beginPath();
	try{
		this.mainCanvasBufferCtx.translate(0.5, 0.5);
		this.mainCanvasBufferCtx.lineWidth = _lineWidth;
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	this.mainCanvasBufferCtx.fillRect(_x1,_y1,_x2,_y2);
	try{
		this.mainCanvasBufferCtx.translate(-0.5, -0.5);
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	this.mainCanvasBufferCtx.closePath();
};
HChart.prototype.getLeftAxisHeight = function() {
	return this.mainCanvas.height;
	/*
	- this.o()['bottomLabelMaxHeight']
	- this.o()['bottom_legend_box_height']
	- this.o()['bottom_legend_box_top_margin']
	- this.o()['bottom_legend_box_bottom_margin']
	- this.o()['top_margin'];
	*/
};

HChart.prototype.getLeftAxisHeightMaxVal = function() {
	return (this.getMarkCountLeft())*this.getMarkGepLeft();
};

HChart.prototype.getLeftAxisWidth = function() {
	var lWidth;
	if(this.o()['pivot_mode'] == 'XY'){
		lWidth = this.getLeftAxisWidthPerAxis();
		
		if(this.o()['multiYAxis']){
			lWidth *= this.o()['series'].length;
		}else{
			lWidth *= 1;
		}		
		
	}else{
		lWidth = this.getLeftAxisWidthPerSeries();	
	}
	return 0;
};

HChart.prototype.getLeftAxisWidthPerSeries = function() {
	var lWidth = (this.o()['leftLabelMaxWidth']
	+ 	this.o()['left_legend_box_width']
	+ 	this.o()['left_legend_box_left_margin']
	+ 	this.o()['left_legend_box_right_margin']
	+ 	this.o()['gep_space']);
	
	return lWidth;
};

HChart.prototype.getLeftAxisWidthPerAxis = function() {
	var lWidth = (
	this.o()['leftLabelMaxWidth']
	)	
	;
	
	return lWidth;
};

HChart.prototype.getBottomAxisHeight = function() {
	return this.mainCanvas.height 
	- this.mainCanvas.height;
};
HChart.prototype.getBottomAxisWidth = function() {
	return this.getBottomAxisWidthEnd()
	- this.getBottomAxisWidthStart();
};

HChart.prototype.getBottomAxisWidthStart = function() {
	return this.getLeftAxisWidth();
};
HChart.prototype.getBottomAxisWidthEnd = function() {
	return this.mainCanvas.width- this.o()['right_margin']; 
};
HChart.prototype.getLeftAxisWidthEnd = function() {
	return this.mainCanvas.width- this.o()['right_margin']; 
};

HChart.prototype.getBottomAxisMarkStart = function() {
	return this.getLeftAxisWidth()+this.getMarkGepBottom();
};
HChart.prototype.getBottomAxisMarkEnd = function() {
	//return this.mainCanvas.width-this.getMarkGepBottom(); 
	return	this.getBottomAxisMarkStart()+this.getMarkGepBottom()*this.getMarkCountLeft(); 
};
/*
HChart.prototype.getLeftAxisMarkStart = function() {
	return this.getLeftAxisWidth()+this.getMarkGepLeft();
};
*/


HChart.prototype.getLeftAxisMarkStart = function() {
	return this.getLeftAxisHeight()+this.o()['top_margin'];
};
HChart.prototype.getLeftAxisMarkEnd = function() {
	return	this.getLeftAxisMarkStart()-this.f(this.getLeftAxisHeightMaxVal());
};


HChart.prototype.getMarkCountLeft = function(_xCntMax,_leftLabelMaxHeight) {
	/*
	var lah = this.getLeftAxisHeight();
	var _h = _leftLabelMaxHeight*1.2;
	if(_xCntMax*_h > lah){
		//return Math.ceil((_xCntMax*_leftLabelMaxHeight)/lah);//너무 딱맞아 여유공간이없다. 2를 곱하여 라벨높이만큼의 여백을 확보하자.
		//return Math.ceil((_xCntMax*_h)/lah)*2; 
		//return Math.ceil(_xCntMax/_h)+2;//시작점,끝점 2개을 올려서 시작해야하므로 +2추가
		return this.o()['x_mark_cnt'];
	}else{
		return _xCntMax+2;//시작점,끝점 2개을 올려서 시작해야하므로 +2추가
	}
	*/

	if(this.o()['pivot_mode'] == 'XY'){
		return this.o()['y_mark_cnt'];
	}else{
		return this.o()['x_mark_cnt'];
	}
	
};
HChart.prototype.getMarkCountBottom = function() {
	/*자동계산*/
	/*
		var targetWidth = this.getBottomAxisWidth();
		//var lmw = this.o()['bottomLabelMaxWidth']+25;//.00정도 더 붙인길이로 대충줌
		var lmw = this.o()['bottomLabelMaxWidth'];
		var cnt = parseInt(targetWidth/(lmw*4));
		cnt = cnt+2;//시작mark의 여유간격을 위해 +1함,마무리의 여유간격을 위해 +1추가하여 +2
		var cnt_length = this.o()['minmax']['xCntMax']+2;//시작mark의 여유간격을 위해 +1함,마무리의 여유간격을 위해 +1추가하여 +2
	
		if(cnt_length < cnt ){
			return cnt_length;
		}else{
			return cnt;	
		}
	*/
	/*수동계산*/
	
	if(this.o()['pivot_mode'] == 'XY'){
		return this.o()['x_mark_cnt'];
	}else{
		return this.o()['y_mark_cnt'];
	}
	
	
	
	
};
HChart.prototype.getMarkCountLeft = function() {
	
	
	if(this.o()['pivot_mode'] == 'XY'){
		return this.o()['y_mark_cnt'];
	}else{
		return this.o()['x_mark_cnt'];
	}

	
	
};
HChart.prototype.getMarkGepBottom = function() {
	/*
	var targetWidth = this.getBottomAxisWidthEnd()-this.getBottomAxisWidthStart();
	//시작을 1gep지나서 시작해야함(+1),끝도 +1
	var gep = targetWidth/(this.getMarkCountBottom()+2);
	*/
	var targetWidth = this.getBottomAxisWidthEnd()-this.getBottomAxisWidthStart();
	//시작을 1gep지나서 시작해야함(+1),끝도 +1
	var gep = targetWidth/(this.getMarkCountLeft()+1);
	
	return gep;
};

HChart.prototype.getMarkGepLeft = function() {
	var targetWidth = this.getLeftAxisHeightStart() - this.getLeftAxisHeightEnd();
	//시작은 0부터 시작해야함(+1),끝도 +1
	var gep = targetWidth/(this.getMarkCountLeft()+1);
	return gep;
};
HChart.prototype.getLeftAxisHeightEnd = function() {
	return this.o()['top_margin'];
};
HChart.prototype.getLeftAxisHeightStart = function() {
	return this.getLeftAxisHeight()+this.o()['top_margin'];
};
HChart.prototype.toPhysicalVal_L = function(_LogicalVal) {
	var max = this.o()['xmax'];
	var min = this.o()['xmin'];
	
	return ((this.f(this.o()['top_margin']+this.getMarkGepLeft())+this.f(this.getLeftAxisHeightMaxVal()))-(this.f(_LogicalVal-min)/this.f(max-min))*this.f(this.getLeftAxisHeightMaxVal()));
};
HChart.prototype.toPhysicalVal_L_Y = function(_LogicalVal,_min,_max) {
	var max;	
	var min;
	if(_min == null){
		min = this.o()['minmax']['min'];
	}else{
		min = _min;
	}
	if(_max == null){
		max = this.o()['minmax']['max'];
	}else{
		max = _max;
	}
	return (((this.o()['top_margin']+this.getMarkGepLeft())+(this.getLeftAxisHeightMaxVal()))-((_LogicalVal-min)/this.f(max-min))*(this.getLeftAxisHeightMaxVal()));
};
HChart.prototype.toLogicalVal_L = function(_PhysicalVal) {
	var max = this.o()['xmax'];
	var min = this.o()['xmin'];
	
	return this.f(min+this.f(this.f(this.f(this.getLeftAxisMarkStart()-_PhysicalVal)/this.f(this.getLeftAxisMarkStart()-this.getLeftAxisMarkEnd())))*(max-min));
};
HChart.prototype.toLogicalVal_L_Y = function(_PhysicalVal,_min,_max) {
	var max;	
	var min;
	if(_min == null){
		min = this.o()['minmax']['min'];
	}else{
		min = _min;
	}
	if(_max == null){
		max = this.o()['minmax']['max'];
	}else{
		max = _max;
	}
	return this.f(min+(((this.getLeftAxisMarkStart()-_PhysicalVal)/(this.getLeftAxisMarkStart()-this.getLeftAxisMarkEnd())))*(max-min));
};

HChart.prototype.drawArrow = function(x,y,_degree,width,height,_color) {
	this.mainCanvasBufferCtx.fillStyle = _color;
	//this.mainCanvasBufferCtx.strokeStyle = _color;
    this.mainCanvasBufferCtx.translate(x,y);
	this.mainCanvasBufferCtx.lineWidth = 1;
    this.mainCanvasBufferCtx.rotate(_degree*Math.PI/180);
	this.mainCanvasBufferCtx.beginPath();
	this.mainCanvasBufferCtx.moveTo(0, 0);
	this.mainCanvasBufferCtx.lineTo(0 + width / 2, 0 + height);
	this.mainCanvasBufferCtx.lineTo(0.5, 0 + height);
	this.mainCanvasBufferCtx.lineTo(0.5, 0 + height*2);
	this.mainCanvasBufferCtx.lineTo(-0.5, 0 + height*2);
	this.mainCanvasBufferCtx.lineTo(-0.5, 0 + height);
	this.mainCanvasBufferCtx.lineTo(0 - width / 2, 0 + height);
	this.mainCanvasBufferCtx.closePath();
	
	//this.mainCanvasBufferCtx.beginPath();
	//this.mainCanvasBufferCtx.moveTo(0, 0);
	//this.mainCanvasBufferCtx.lineTo(0, 0 + height*2);
	//this.drawLine(_color,1,0,0,0,height*2,this.mainCanvasBufferCtx);
	//this.mainCanvasBufferCtx.closePath();
	
	
		
	
    this.mainCanvasBufferCtx.rotate(-_degree*Math.PI/180);
    this.mainCanvasBufferCtx.translate(-x, -y);
    this.mainCanvasBufferCtx.fill();
	
}

HChart.prototype.fillTri = function(_x,_y,_gep,_slope,_fillColor,_strokeColor) {
	if(_fillColor != null){
		this.mainCanvasBufferCtx.fillStyle = _fillColor; 	
	}else{
		this.mainCanvasBufferCtx.fillStyle = this.o()['windFlagColor']; 
	}
	if(_strokeColor != null){
		this.mainCanvasBufferCtx.strokeStyle = _strokeColor; 	
	}else{
		this.mainCanvasBufferCtx.strokeStyle = this.o()['windFlagColor']; 
	}
	this.mainCanvasBufferCtx.lineTo(0,_y);
	this.mainCanvasBufferCtx.lineTo(0 + _x, _y + (_gep-_slope));//기울기(subLeng)를 줌
	this.mainCanvasBufferCtx.lineTo(0, _y + _gep*2);
	this.mainCanvasBufferCtx.fill();
}

HChart.prototype.drawWindflag = function(x,y,_degree,width,height,_color,windspeed,_flag) {
	var fval = 0;
	var fval2 = 0; 
	var v1 = 0;
	var v2 = 0;
	var v3 = 0;
	//풍속은 ms와 kt가 있다.
	if(_flag == 'ms'){
		fval = 3;//표시변경간격
		fval2 = 2;//짧은표시변경간격
		v1 = 25;//1개 삼각
		v2 = 50;//2개 삼각
		v3 = 75;//3개 삼각
	}else{
		fval = 5;
		v3 = 48;
		v2 = 98;
		v1 = 148;			
	}
	
	
	var subLeng = width/2;//짧은선의 길이(반토막선)
    this.mainCanvasBufferCtx.translate(x,y);
	this.mainCanvasBufferCtx.lineWidth = 1;
    this.mainCanvasBufferCtx.rotate(_degree*(Math.PI/180));
		this.mainCanvasBufferCtx.beginPath();
			var flag_gep = parseFloat(height/16);
			var base_height = (0 - height);
			this.mainCanvasBufferCtx.fillStyle = _color;
			this.mainCanvasBufferCtx.strokeStyle = _color;

			this.mainCanvasBufferCtx.moveTo(0, 0);
			this.mainCanvasBufferCtx.lineTo(0, base_height);
			this.mainCanvasBufferCtx.stroke();	
			
			var restVal = 0;
			if(parseInt(windspeed/v3) == 1){
				this.fillTri(width,base_height,flag_gep,subLeng);
				base_height += flag_gep*2;
				this.fillTri(width,base_height,flag_gep,subLeng);
				base_height += flag_gep*2;
				this.fillTri(width,base_height,flag_gep,subLeng);
				base_height += flag_gep*2;			
				restVal = windspeed%v3;
			}else if(parseInt(windspeed/v2) == 1){
				this.fillTri(width,base_height,flag_gep,subLeng);
				base_height += flag_gep*2;
				this.fillTri(width,base_height,flag_gep,subLeng);
				base_height += flag_gep*2;	
				restVal = windspeed%v2;
			}else if(parseInt(windspeed/v1) == 1){
				this.fillTri(width,base_height,flag_gep,subLeng);
				base_height += flag_gep*2;	
				restVal = windspeed%v1;
			}else{
				restVal = windspeed%v1;				
			}
			var start_ms_value = 2;
			for(var i=start_ms_value,j=0; i < restVal+1;j++){
					if(j%2 == 0 ){
						base_height += flag_gep*2;//선은 두께가 없으므로 2배로 띄움							
					}										
					this.mainCanvasBufferCtx.moveTo(0, base_height);
					if(j%2==0){
						this.mainCanvasBufferCtx.lineTo(0+width/2, base_height-subLeng/2);//width/2은 반토막선,subLeng은 기울기처럼사용
					}else{
						this.mainCanvasBufferCtx.lineTo(0+width, base_height-subLeng);//위에 반토막선을 덮어쓰기함
					}
					this.mainCanvasBufferCtx.stroke();
					if(j%2==0){
						 i+=fval2;
					}else{
						 i+=fval;
					}
			}
		this.mainCanvasBufferCtx.closePath();
    this.mainCanvasBufferCtx.rotate(-_degree*(Math.PI/180));
    this.mainCanvasBufferCtx.translate(-x, -y);
}
HChart.prototype.toPhysicalVal_B = function(_LogicalVal) {
	var max = this.o()['minmax']['max'];
	var min = this.o()['minmax']['min'];
	return (this.getBottomAxisMarkStart()+(((_LogicalVal-min)/(max-min)))*(this.getBottomAxisMarkEnd()-this.getBottomAxisMarkStart()));
};
HChart.prototype.toPhysicalVal_B_X = function(_LogicalVal) {
	var max = this.o()['xmax'];
	var min = this.o()['xmin'];
	return (this.getBottomAxisMarkStart()+(((_LogicalVal-min)/(max-min)))*(this.getBottomAxisMarkEnd()-this.getBottomAxisMarkStart()));
};
HChart.prototype.toLogicalVal_B = function(_PhysicalVal) {
	var max = this.o()['minmax']['max'];
	var min = this.o()['minmax']['min'];
	return this.f(min+((this.f(_PhysicalVal-this.getBottomAxisMarkStart())/this.f(this.getBottomAxisMarkEnd()-this.getBottomAxisMarkStart())))*this.f(max-min));
};
HChart.prototype.toLogicalVal_B_X = function(_PhysicalVal) {
	var max = this.o()['xmax'];
	var min = this.o()['xmin'];
	return this.f(min+((_PhysicalVal-this.getBottomAxisMarkStart())/(this.getBottomAxisMarkEnd()-this.getBottomAxisMarkStart()))*(max-min));
};

HChart.prototype.comma = function(n) {
	var k = parseFloat(n);
	if(n == k){
		var reg = /(^[+-]?\d+)(\d{3})/;   
		n += '';                          

		while (reg.test(n))
	    n = n.replace(reg, '$1' + ',' + '$2');
	}
	return n;
};

var T=Number('1e'+10);
HChart.prototype.f = function(_n) {
	return (Math.round((_n)*T)/T);
};
HChart.prototype.calcDate = function(reDate,_hgep) {
	var reDate2 = {};  		
  	var dt=new Date(reDate['year'],reDate['month'],reDate['day'],reDate['hour'],reDate['min'],reDate['second']);
  	dt.setHours(dt.getHours() + parseInt(_hgep));  
  	
    var year 		= dt.getFullYear();
    var month 		= dt.getMonth();
    var day 		= dt.getDate();
    var hour 		= dt.getHours();
    var min 		= dt.getMinutes();
    var second 		= dt.getSeconds();
    var millisecond = dt.getMilliseconds();
	    
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
  
HChart.prototype.CatmullRomSplines = function(_color,_lineWidth,p0, p1, p2, p3) {
	this.mainCanvasBufferCtx.strokeStyle = _color;
    if (p0 == null) {
            p0x = 0;
            p0y = 0;
    } else {
            p0x = p0._x;
            p0y = p0._y;
    }
    if(p3 == null){
            p3x = 0
            p3y = 0;
    }else{
            p3x = p3._x;
            p3y = p3._y;
    }

    p2x = p2._x;
    p2y = p2._y;
    p1x = p1._x;
    p1y = p1._y;


    var d = 5;
	this.mainCanvasBufferCtx.beginPath();
	try{
		this.mainCanvasBufferCtx.translate(0.5, 0.5);
		this.mainCanvasBufferCtx.lineWidth = _lineWidth;
	}catch(e){
		if(window.console != null) console.dir(e);
	}
    this.mainCanvasBufferCtx.moveTo(p1x, p1y);
    for (var i = 0; i<=d; i++) {
            var t = i/d;
            var t2 = t*t;
            var t3 = t2*t;
            var px = 0.5*((2*p1x)+(-p0x+p2x)*t+(2*p0x-5*p1x+4*p2x-p3x)*t2+(-p0x+3*p1x-3*p2x+p3x)*t3);
            var py = 0.5*((2*p1y)+(-p0y+p2y)*t+(2*p0y-5*p1y+4*p2y-p3y)*t2+(-p0y+3*p1y-3*p2y+p3y)*t3);
            this.mainCanvasBufferCtx.lineTo(px, py);
    }
	try{
		this.mainCanvasBufferCtx.translate(-0.5, -0.5);
	}catch(e){
		if(window.console != null) console.dir(e);
	}
	this.mainCanvasBufferCtx.stroke();
	this.mainCanvasBufferCtx.closePath(); 
    
}
function getSampleData(min,inc,cnt,_isFullData){
	this.arr = [];
	var r = Math.random();
	var save = min;
	for(var i=0; i < cnt; i++){
		var tmp = Math.floor(Math.random() * (save));
		var result;
		//if(tmp%3 == 0){
		//	result = save- Math.floor(Math.random() * (save*0.5)) + 1;
		//}else{
			result = save+ inc;
		//}
		
		var v = Math.floor(Math.random() * 8)+1;
		if(!_isFullData && i%parseInt(cnt/v) != 0){
			arr[i] = [i,result,0];
		}else{
			arr[i] = [i,result,1];
		}
		
		save = result;
	}
	return arr;
}  




