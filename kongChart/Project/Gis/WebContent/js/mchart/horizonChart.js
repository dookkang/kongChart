/*
 * coding rule
 * 	variable : camel
 * 	option : underbar
 */
HChart = function(_container) {
	this.container = _container;
	this.mainCanvas = document.createElement("canvas");
	this.container.append(this.mainCanvas);
	this.defaultOption = {
		background_color:'rgba(0,0,0,1)',
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
		top_margin:20,
		right_margin:40,
		mark_width:5,
		mark_then_gep:2,
		x_mark_cnt:11,/*주어진숫자보다 1작은 mark가 생김 -2(상,하간격)빼고 0번째는 +1되므로)*/
		min:-100,
		max:100,
		xmin:0,
		xmax:10000
	};
	this.option = {};
};

HChart.prototype.init = function(_option) {
	this.mainCanvasCtx = this.mainCanvas.getContext("2d");
	this.setOption(_option);
	this.resize();
	this.option['font'] = this.option['font_weight']+ ' ' +this.option['font_size']+'px '+this.option['font_name'];
	this.mainCanvasCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);
	this.mainCanvasCtx.font = this.option['font'];
	this.o()['leftLabelMaxWidth']  		= this.mainCanvasCtx.measureText(this.o()['minmax']['xLabelMax']).width;
	this.o()['fontHeight'] 				= this.o()['font_size'];
	this.o()['leftLabelMaxHeight'] 		= this.o()['fontHeight'];
	this.o()['bottomLabelMaxWidth']  	= this.mainCanvasCtx.measureText(this.comma(this.o()['minmax']['max'])).width;
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
	var cw = this.container.width();
	var ch = this.container.height();
	this.mainCanvas.width = cw;
	this.mainCanvas.height = ch;
};

HChart.prototype.redraw = function(_option) {
	this.resize();
	this.init(_option);
	this.draw();
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
						console.dir(e);
					}
				}
		}else{
			OPTOBJ.option[key] = value;
		}
	});
	OPTOBJ.setMinMax();
	console.dir('[OPTION]------------------------------------');
	console.dir(this.o());
};
HChart.prototype.o = function() {
	return this.option;
};

HChart.prototype.createOption = function() {
	return jQuery.extend(true, {}, this.getDefaultOption());
};

HChart.prototype.draw = function(_option) {
	this.drawBackground();
	this.drawYAxis();
	this.drawXAxis();
};
HChart.prototype.drawBackground = function() {
	this.mainCanvasCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
	this.mainCanvasCtx.fillStyle = this.o()['background_color'];
	this.mainCanvasCtx.fillRect(0,0,this.mainCanvas.width, this.mainCanvas.height);
};
HChart.prototype.drawXAxis = function() {
	var pmode  = this.o()['pivot_mode'];
	if(pmode == 'XY'){
		this.mainCanvasCtx.strokeStyle = this.o()['axis_stroke_color'];
		this.mainCanvasCtx.moveTo(0,10);
		this.mainCanvasCtx.lineTo(100,10);
		this.mainCanvasCtx.stroke();
	}else{
		var x = this.getLeftAxisWidth();

		this.drawLine(this.o()['axis_stroke_color'],1,x,this.o()['top_margin'],x,this.o()['top_margin']+this.getLeftAxisHeight());
		var xCntMax = this.o()['minmax']['xCntMax'];
		var markCount = this.getMarkCountLeft(xCntMax,this.o()['leftLabelMaxHeight']);
		var data = this.o()['series'][this.o()['minmax']['xCntMaxSIndex']].s_data;
		//var xgep = parseFloat(this.getLeftAxisHeight())/parseFloat(xCntMax+markCount);//xCntMax에 markCount만큼을 추가하여 첫눈금을 gep만큼 띄우고 시작해도 눈금이 넘치지않도록 함
		var xgep = parseFloat(this.getLeftAxisHeight())/parseFloat(markCount);
		var viewCnt = Math.ceil(data.length/(markCount-2));
		//for(var i= 0,y =(this.getLeftAxisHeight()-(xgep*markCount)); i < data.length; i++,y-=xgep){//-(xgep*markCount) 추가하여 첫눈금을 gep만큼 띄우고 시작한다.
		
		//무조건 xmin,xmax로 축을 그림
		var xgep_default = (this.o()['xmax']-this.o()['xmin'])/this.o()['x_mark_cnt'];
		for(var i= this.o()['xmin']; i < this.o()['xmax']+0.0000000001; i+=xgep_default){
			//if(i%viewCnt == 0 || i == data.length-1){
				var p_y = this.toPhysicalVal_L(i);//+this.o()['top_margin']
				var i_label = this.comma(i);
				this.drawLine(this.o()['axis_stroke_color'],1,x-this.o()['mark_width'],p_y,x,p_y);
				
				this.mainCanvasCtx.fillStyle = this.o()['color'];
				this.mainCanvasCtx.fillText(i_label,
						x-this.o()['mark_width']-this.mainCanvasCtx.measureText(i).width,
						p_y+this.o()['leftLabelMaxHeight']/2);
						
			//}

		}	
		/*
		for(var i= 0,y =(this.getLeftAxisHeight()-(xgep)); i < data.length; i++){
			if(i%viewCnt == 0 || i == data.length-1){
				this.drawLine(this.o()['axis_stroke_color'],1,x-this.o()['mark_width'],y,x,y);
				this.mainCanvasCtx.fillStyle = this.o()['color'];
				this.mainCanvasCtx.fillText(this.comma(data[i][0]),
						x-this.o()['mark_width']-this.mainCanvasCtx.measureText(this.comma(data[i][0])).width,
						y+this.o()['leftLabelMaxHeight']/2);
				y-=xgep
			}
		}*/
	}
};
HChart.prototype.drawYAxis = function() {
	var pmode  = this.o()['pivot_mode'];
	if(pmode == 'XY'){
		this.mainCanvasCtx.strokeStyle = this.o()['axis_stroke_color'];
		this.mainCanvasCtx.moveTo(0,10);
		this.mainCanvasCtx.lineTo(100,10);
		this.mainCanvasCtx.stroke();
	}else{
		var startx_axis = this.getLeftAxisWidth();
		var starty = this.getLeftAxisHeight()+this.o()['top_margin'];
		var endx_axis = this.getBottomAxisWidthStart()+this.getBottomAxisWidth();
		var endy = starty;
		
		var startx = this.getBottomAxisMarkStart();
		var endx = this.getBottomAxisMarkEnd();
		this.drawLine(this.o()['axis_stroke_color'],1,
				startx_axis,starty,endx_axis,endy);
		var mx = this.getBottomAxisMarkEnd();
		var mn = this.getBottomAxisMarkStart();
		var markGep = this.getMarkGepBottom();

		for(var i=0; i < mx+markGep+1; i+=markGep){
			var x = startx+i;
			var y = starty;
			
			var x_val = this.toLogicalVal_B(x).toFixed(2);
			var x_label = this.comma(x_val+'');
			//if(x_val < this.o()['minmax']['max']+markGep+1){
				this.drawLine(this.o()['axis_stroke_color'],1,x,starty,x,starty+this.o()['mark_width']);
				
				this.mainCanvasCtx.fillStyle = this.o()['color'];
				this.mainCanvasCtx.fillText(x_label,
						x-this.mainCanvasCtx.measureText(x_label).width/2,
						y+this.o()['mark_width']+this.o()['mark_then_gep']+this.o()['leftLabelMaxHeight']);
			//}else{
				
				//console.log('x_label:'+x_label);
			//}
		}
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
HChart.prototype.drawLine = function(_color,_lineWidth,_x1,_y1,_x2,_y2) {
	this.mainCanvasCtx.strokeStyle = _color;
	this.mainCanvasCtx.beginPath();
	try{
		this.mainCanvasCtx.translate(0.5, 0.5);
		this.mainCanvasCtx.lineWidth = _lineWidth;
	}catch(e){
		console.dir(e);
	}
	this.mainCanvasCtx.moveTo(_x1,_y1);
	this.mainCanvasCtx.lineTo(_x2,_y2);
	this.mainCanvasCtx.stroke();
	try{
		this.mainCanvasCtx.translate(-0.5, -0.5);
	}catch(e){
		console.dir(e);
	}
	this.mainCanvasCtx.closePath();
};
HChart.prototype.getLeftAxisHeight = function() {
	return this.mainCanvas.height 
	- this.o()['bottomLabelMaxHeight']
	- this.o()['bottom_legend_box_height']
	- this.o()['bottom_legend_box_top_margin']
	- this.o()['bottom_legend_box_bottom_margin']
	- this.o()['top_margin'];
};

HChart.prototype.getLeftAxisWidth = function() {
	return this.o()['leftLabelMaxWidth']
	+ 	this.o()['left_legend_box_width']
	+ 	this.o()['left_legend_box_left_margin']
	+ 	this.o()['left_legend_box_right_margin']
};
HChart.prototype.getBottomAxisHeight = function() {
	return this.mainCanvas.height 
	- this.getLeftAxisHeight();
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
HChart.prototype.getBottomAxisMarkStart = function() {
	return this.getLeftAxisWidth()+this.getMarkGepBottom();
};
HChart.prototype.getBottomAxisMarkEnd = function() {
	return this.mainCanvas.width-this.getMarkGepBottom(); 
};
HChart.prototype.getMarkCountLeft = function(_xCntMax,_leftLabelMaxHeight) {
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
};
HChart.prototype.getMarkCountBottom = function() {
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

};
HChart.prototype.getMarkGepBottom = function() {
	var targetWidth = this.getBottomAxisWidthEnd()-this.getBottomAxisWidthStart();
	var gep = targetWidth/this.getMarkCountBottom();
	return gep;
};
HChart.prototype.toPhysicalVal_L = function(_LogicalVal) {
	var max = this.o()['xmax']
	var min = this.o()['xmin']
	return ((this.o()['top_margin']+this.getLeftAxisHeight())-(((_LogicalVal-min)/(max-min)))*this.getLeftAxisHeight());
};
HChart.prototype.toLogicalVal_L = function(_PhysicalVal) {
	var max = this.o()['xmax']
	var min = this.o()['xmin']
	return (min+(((_PhysicalVal-this.getBottomAxisMarkStart())/(this.getBottomAxisMarkEnd()-this.getBottomAxisMarkStart())))*(max-min));
};

HChart.prototype.toPhysicalVal_B = function(_LogicalVal) {
	var max = this.o()['minmax']['max'];
	var min = this.o()['minmax']['min'];
	return (this.getBottomAxisMarkStart()+(((_LogicalVal-min)/(max-min)))*(this.getBottomAxisMarkEnd()-this.getBottomAxisMarkStart()));
};
HChart.prototype.toLogicalVal_B = function(_PhysicalVal) {
	var max = this.o()['minmax']['max'];
	var min = this.o()['minmax']['min'];
	return (min+(((_PhysicalVal-this.getBottomAxisMarkStart())/(this.getBottomAxisMarkEnd()-this.getBottomAxisMarkStart())))*(max-min));
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



