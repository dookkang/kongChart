var imgDir = 'images/';

var mainMap = {
};
var chartMap = {
};
function winresize(){
	$.each(mainMap,function(key,val){
		if(mainMap[key] != null){
			mainMap[key].redraw(chartMap[key]);
		}
	});
};
function createChart(_id){
	if(mainMap[_id] == null){
		mainMap[_id]  = new HChart($('#'+_id));
		chartMap[_id] = null;
	}

	return mainMap[_id];
};
function createOption(_chart,_chartId){
	chartMap[_chartId] = _chart.createOption();
	chartMap[_chartId].series = [];
	return chartMap[_chartId];
};
function createSeries(_s_name,_s_chartType,_data,
		_max,_min,_divNum){
	var fObj1 = null;

	if(Array.isArray(_data)){
		fObj1 = chartUtil.formatData_profile2(_data,false,_max,_min,_divNum);

	}else{
		fObj1 = _data;

	}
	

	var a = {
		s_name:_s_name,
		s_data:fObj1['reArr'],
		s_color:'rgba(255,201,14,1)',
		s_lineWidth:'1',
		s_sizeMin:1,
		s_sizeDefault:3,
		s_chartType:_s_chartType,
		s_shape:'rect',
		s_shapeColor:'rgba(0,128,192,1)',
		s_draw:true,
		s_min:fObj1['miny'],
		s_max:fObj1['maxy'],
		s_y_mark_cnt:fObj1['y_mark_cnt'],
		s_axis:'L',
		s_unit:'건123'				 	    
	};

	return a;
};

	var colours = [{red: 0,green: 0,blue: 0},
	                {red: 1,green: 97,blue: 183},
	                {red: 12,green: 171,blue: 193},
	                {red: 10,green: 187,blue: 35},
	                {red: 113,green: 198,blue: 7},
	                {red: 232,green: 244,blue: 20},
	                {red: 255,green: 167,blue: 33},
	                {red: 234,green: 101,blue: 0},
	                {red: 255,green: 255,blue: 255}
	                ];
	                
		var lineColours = [
			{red: 86,green: 148,blue: 216},
			{red: 255,green: 128,blue: 0},
			{red: 150,green: 150,blue: 150},
			{red: 10,green: 187,blue: 35},
			{red: 231,green: 158,blue: 228},
			{red: 223,green: 219,blue: 166},
			{red: 231,green: 168,blue: 158},
			{red: 173,green: 216,blue: 216},
			{red: 0,green: 128,blue: 128}
		];
		var lineStyles = ['dash',
	                'common',
	                'common',
	                'dash',
	                'common',
	                'common',
	                'dash',
	                'common',
	                'common'
	                ];	                
		var lineDeeps = ['1',
	                '3',
	                '1',
	                '2',
	                '2',
	                '2',
	                '3',
	                '3',
	                '3'
	                ];	  
$(window).resize(winresize);






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function chart1(){
			var chartId = 'chart1';
			var chart1 = createChart(chartId);			
			var option = createOption(chart1,chartId);			
			var aSeries = createSeries('any sereis','bar',data1);			
			option.series.push(aSeries);

			option.unitLabel_Hori			= '<년>';
			option.unitLabel_Verti			= '        [발생건수]            ';
			option.chartTitle				= '[기수행된 사후평가 노선 km당 민원발생 현황]';

			var colours = [
			                {red: 242,green: 159,blue: 6},
			                {red: 254,green: 240,blue: 216}
			                ];					
			option.colours			= colours;
			var colourGradientObject = new ColourGradient(0,option.series[0]['s_data'].length, colours);
			option.colorObj			= colourGradientObject;
			option.gradientColorUse = true;
			chart1.redraw(option);
	};
	function chart2(){
			var chartId = 'chart2';
			var chart2 = createChart(chartId);			
			var option = createOption(chart2,chartId);					
			option.xrange_axis				= true;//x축이 범위형축
			option.xmin						= 0;//x축이 범위형축으로 구성될때 x축의 최소값
			option.xmax						= 10000;//x축이 범위형축으로 구성될때 x축의 최대값
			option.xrange_count				= 10;//x축이 범위형축으로 구성될때 x축의눈금개수	
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함			
			
			var aSeries 	= createSeries('any sereis','scatter',data2);//3번,4번param->max=null,min=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 3;//점의 크기
			aSeries.s_shape='circle';//점의 모양
			aSeries.s_color='rgba(0,128,192,1)';//시리즈의 색상, (0,128,192)색은 블루

			option.series.push(aSeries);			
			chart2.redraw(option);
	};	
	function chart3(){
			var chartId = 'chart3';
			var chart3 = createChart(chartId);			
			var option = createOption(chart3,chartId);						
			option.xrange_axis				= false;//x축이 범위형축		
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함			
			
			var aSeries 	= createSeries('any sereis','line',data3);//3번,4번param->max=null,min=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 3;//점의 크기
			aSeries.s_shape='circle';//점의 모양
			aSeries.s_color='rgba(0,128,192,1)';//시리즈의 색상, (0,128,192)색은 블루

			option.series.push(aSeries);			
			chart3.redraw(option);
	};
	function chart4(){
			var chartId = 'chart4';
			var chart4 = createChart(chartId);			
			var option = createOption(chart4,chartId);							
			option.xrange_axis				= false;//x축이 범위형축		
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함			
			option.randomColorUse           = true;
			
			var aSeries 	= createSeries('any sereis','bar',data4);//3번,4번param->max=null,min=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 3;//점의 크기
			aSeries.s_shape='circle';//점의 모양
			aSeries.s_color='rgba(0,128,192,1)';//시리즈의 색상, (0,128,192)색은 블루

			option.series.push(aSeries);			
			chart4.redraw(option);
	};		
	function chart5(){
			var chartId = 'chart5';
			var chart5 = createChart(chartId);			
			var option = createOption(chart5,chartId);						
			option.xrange_axis				= false;//x축이 범위형축		
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함
			//option.yAxisCalcMethod			= 'manual';
			//var divNum = 6;
			//option.y_mark_cnt = divNum; 
			
			//var yMax = 5000;var yMin = -1000;//시리즈가 여러개일경우 자동 min,max 구하기가 부하가 걸릴수있으므로 명시적으로 지정하여 퍼포먼스를 향상시킴			
			/* 1번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries 	= createSeries('any sereis1','line',chartUtil.formatData_profile2(data5_1,false,null,null,null));//3번,4번argu->max=null,min=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 1;//점의 크기
			aSeries.s_shape='circle';//점의 모양
			aSeries.s_color='rgba(86,148,216,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries.s_shapeColor='rgba(86,148,216,1)';
			aSeries.s_lineWidth=1;

			option.series.push(aSeries);			
			
			/* 2번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries 	= createSeries('any sereis2','line',chartUtil.formatData_profile2(data5_2,false,null,null,null));//3번,4번argu->max=null,min=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 2;//점의 크기
			aSeries.s_shape='rect';//점의 모양
			aSeries.s_color='rgba(231,158,228,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries.s_shapeColor='rgba(231,158,228,1)';
			aSeries.s_lineWidth=2;

			option.series.push(aSeries);

			/* 3번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries 	= createSeries('any sereis3','line',chartUtil.formatData_profile2(data5_3,false,null,null,null));//3번,4번argu->max=null,min=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 3;//점의 크기
			aSeries.s_shape='circle';//점의 모양
			aSeries.s_color='rgba(173,216,216,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries.s_shapeColor='rgba(173,216,216,1)';
			aSeries.s_lineWidth=3;
			option.series.push(aSeries);		
			
			
			chart5.redraw(option);
	};	
	function chart6(){
			var chartId = 'chart6';
			var chart6 = createChart(chartId);			
			var option = createOption(chart6,chartId);				
			option.xrange_axis				= false;//x축이 범위형축		
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			//중요
			option.unitLabel_Verti_R		= '명[인원수]';
			
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함
			option.bothYAxis				= true;//오른쪽축과 왼쪽축을 함께사용함
			option.right_margin				= 60;//오른쪽 축사용을 위해 지정함
			option.toFixedY					= 2;//Y1,Y2양쪽축 모두함께 적용 표시할 표수점자리수		
			option.bottom_title_align		= 'center';//x축 타이틀 위치
			
			option.min = 0;////////////////////////////////////왼쪽Y축의 min값
			option.min_R = 0;//////////////////////////////////오른쪽Y축의 min값
			/* 1번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries 	= createSeries('any sereis A','bar',data6_1);//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 1;//점의 크기
			aSeries.s_shape='circle';//점의 모양
			aSeries.s_color='rgba(86,148,216,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries.s_lineWidth=1;
			option.series.push(aSeries);			
			
			
			/* 2번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries2 	= createSeries('any sereis B','line',data6_2);//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries2.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries2.s_sizeDefault = 2;//점의 크기
			aSeries2.s_shape='rect';//점의 모양
			aSeries2.s_color='rgba(231,158,228,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries2.s_lineWidth=2;
			aSeries2.s_axis = 'R';

			
			option.series.push(aSeries2);


			
			chart6.redraw(option);
	};		
	function chart7(){
			var chartId = 'chart7';
			var chart7 = createChart(chartId);			
			var option = createOption(chart7,chartId);						
			option.xrange_axis				= false;//x축이 범위형축		
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함
			option.bothYAxis				= true;//오른쪽축과 왼쪽축을 함께사용함
			option.toFixedY					= 2;//Y1,Y2양쪽축 모두함께 적용 표시할 표수점자리수		
			

			/* 1번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries 	= createSeries('any sereis A','bar',data7_1);//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 1;//점의 크기
			aSeries.s_shape='circle';//점의 모양
			aSeries.s_color='rgba(86,148,216,1)';//시리즈의 색상, (0,128,192)색은 블루
			option.series.push(aSeries);			
			
			
			/* 2번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries 	= createSeries('any sereis B','bar',data7_2);//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 2;//점의 크기
			aSeries.s_shape='rect';//점의 모양
			aSeries.s_color='rgba(231,158,228,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries.s_unit='%';
			option.series.push(aSeries);

			
			/* 3번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries 	= createSeries('any sereis C','bar',data7_2);//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries.s_sizeDefault = 2;//점의 크기
			aSeries.s_shape='rect';//점의 모양
			aSeries.s_color='rgba(173,216,216,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries.s_unit='%';
			option.series.push(aSeries);			

			
			chart7.redraw(option);
	};
	function chart8(){
			var chartId = 'chart8';
			var chart8 = createChart(chartId);			
			var option = createOption(chart8,chartId);					
			option.x_label_extension		= true;
			option.unitLabel_Hori			= '<년>';
			option.unitLabel_Verti			= '    [관람자수]     ';
			option.chartTitle				= '[개봉영화 흥행순위]';
			option.chartTitleAlign			= 'left';
			

			var aSeries = createSeries('any sereis','bar',data8);			
			option.series.push(aSeries);
			
			chart8.redraw(option);
	};		
	function chart9(){
			var chartId = 'chart9';
			var chart9 = createChart(chartId);			
			var option = createOption(chart9,chartId);						
			option.xrange_axis				= false;//x축이 범위형축		
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함
			option.min 						= 0;
			

			/* 1번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries1 	= createSeries('any sereis A','bar',data9_1);//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries1.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries1.s_sizeDefault = 1;//점의 크기
			aSeries1.s_shape='circle';//점의 모양
			aSeries1.s_color='rgba(100,128,0,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries1.s_lineWidth=1;
			option.series.push(aSeries1);			
			

			/* 2번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries2 	= createSeries('any sereis B','line',data9_2);//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries2.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries2.s_sizeDefault = 2;//점의 크기
			aSeries2.s_shape='circle';//점의 모양
			aSeries2.s_shapeColor='rgba(255,255,255,1)';//점의색상
			aSeries2.s_color='rgba(231,158,228,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries2.s_lineWidth=2;
			aSeries2.s_unit='%';
			aSeries2.s_max = aSeries1.s_max;
			aSeries2.s_min = aSeries1.s_min;
			option.series.push(aSeries2);


			
			chart9.redraw(option);
	};
	function chart10(){
			var chartId = 'chart10';
			var chart10 = createChart(chartId);			
			var option = createOption(chart10,chartId);	

			option.type= 'pie';
			//option.chartTitle= '> 주요지적사항';
			option.crossLineShow = false;
			var series =
				 [
	 		 	    {s_name:'A상',s_data:data10
			 	    ,s_color:'rgba(55,101,114,1)',s_lineWidth:'1',s_sizeMin:1,s_sizeDefault:5
			 	    ,s_chartType:'line',s_shape:'rectangle',s_shapeColor:'rgba(100,128,0,1)'
			 	    ,s_draw:true,s_min:-50,s_max:50
			 	    ,s_unit:'건'}	 	   		 	     	    
				 ];
			option.series = series;
			chart10.redraw(option);
	};	
	function chart11(){
			var chartId = 'chart11';
			var chart11 = createChart(chartId);			
			var option = createOption(chart11,chartId);						
			option.xrange_axis				= false;//x축이 범위형축		
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함
			option.toFixedY					= 2;//Y1,Y2양쪽축 모두함께 적용 표시할 표수점자리수	
			option.barVertical				= true;

			
			var maxSum;
			var min;
			/* 1번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries1 	= createSeries('any sereis A','bar',chartUtil.formatData_profile2(data11_1,false,null,null,null));//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries1.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries1.s_sizeDefault = 1;//점의 크기
			aSeries1.s_shape='circle';//점의 모양
			aSeries1.s_color='rgba(86,148,216,1)';//시리즈의 색상, (0,128,192)색은 블루
			option.series.push(aSeries1);			
			maxSum = aSeries1.s_max;
			min = aSeries1.s_min;
			
			/* 2번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			var aSeries2 	= createSeries('any sereis B','bar',chartUtil.formatData_profile2(data11_2,false,null,null,null));//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries2.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries2.s_sizeDefault = 2;//점의 크기
			aSeries2.s_shape='rect';//점의 모양
			aSeries2.s_color='rgba(231,158,228,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries2.s_unit='%';
			option.series.push(aSeries2);
			maxSum += aSeries2.s_max;
			min = aSeries2.s_min;
			
			/* 3번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*/
			
			var aSeries3 	= createSeries('any sereis C','bar',chartUtil.formatData_profile2(data11_3,false,null,null,null));//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries3.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries3.s_sizeDefault = 2;//점의 크기
			aSeries3.s_shape='rect';//점의 모양
			aSeries3.s_color='rgba(173,216,216,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries3.s_unit='%';
			option.series.push(aSeries3);			
			maxSum += aSeries3.s_max;
			min = aSeries3.s_min;
			
			
			aSeries1.s_max = maxSum;
			aSeries2.s_max = maxSum;
			aSeries3.s_max = maxSum;
			aSeries1.s_min = min;
			aSeries2.s_min = min;
			aSeries3.s_min = min;		
			chart11.redraw(option);
	};
	function chart12(){
			var fObj = chartUtil.formatDataHodo(data12);//*4는1일, *8은2일
			var chartId = 'chart12';
			var chart12 = createChart(chartId);			
			var option = createOption(chart12,chartId);	
			option.type						= 'doughnut';
			option.colorType = 'dark';
			option.crossLineShow = false;
			var series =
				 [
	 		 	    {s_name:'A상',s_data:fObj['reArr']
			 	    ,s_color:'rgba(55,101,114,1)',s_lineWidth:'1',s_sizeMin:1,s_sizeDefault:5
			 	    ,s_chartType:'line',s_shape:'rectangle',s_shapeColor:'rgba(100,128,0,1)',s_draw:true,s_min:-50,s_max:50
			 	    ,s_unit:'건'}	 	   		 	     	    
				 ];
			option.series = series;
			chart12.redraw(option);

	};	
	function chart13(){
			var chartId = 'chart13';
			var chart13 = createChart(chartId);			
			var option = createOption(chart13,chartId);						
				
			option.xunit					= '년';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= '[년도]';
			option.unitLabel_Verti			= '[감가율]';
			//option.chartTitle				= 'Sales Of Beer & Ice-cream';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함
			var _xmin =0;
			var _xmax =80;		
			option.xrange_axis				= true;//x축이 범위형축	
			option.xmin						= _xmin;
			option.xmax						= _xmax;			
			option.xrange_count             = (_xmax-_xmin)/5;	
			option.legendPosition			= 'top';//'top','bottom'

			var _min = 0;
			var _max = 50;
			option.y_mark_cnt					= 4;
			
			var seriesArr = data13;
			for(var g=0;g<seriesArr.length; g++){
					var data = chartUtil.formatData_profile2(seriesArr[g]);
					var _s_name = '';
					if(data['reArr'][0][3] != null){
						_s_name = data['reArr'][0][3];
					}
					var aSeries 	= createSeries(_s_name,'line',data);
					aSeries.s_unit	='개';//툴팁에 표시될 Y값의단위
					aSeries.s_sizeDefault = lineDeeps[g];//점의 크기
					aSeries.s_shape='circle';//점의 모양
					aSeries.s_color='rgba('+lineColours[g]['red']+','+lineColours[g]['green']+','+lineColours[g]['blue']+',1)';//시리즈의 색상
					aSeries.s_lineType=lineStyles[g];
					aSeries.s_lineWidth=lineDeeps[g];
					aSeries.s_shapeColor=aSeries.s_color;
					aSeries.s_lineLinkable=true;
					aSeries.s_min=_min;
					aSeries.s_max=_max;
					aSeries.s_y_mark_cnt=option.y_mark_cnt;

					option.series.push(aSeries);
			}			
			chart13.redraw(option);
	};	
	function chart14(){
			var chartId = 'chart14';
			var chart14 = createChart(chartId);			
			var option = createOption(chart14,chartId);				
				
			option.xunit					= '년';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= '[년도]';
			option.unitLabel_Verti			= '[감가율]';
			//option.chartTitle				= 'Sales Of Beer & Ice-cream';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함
			var _xmin =0;
			var _xmax =80;		
			option.xrange_axis				= true;//x축이 범위형축
			option.xrange_axis_label_mapping= true;//범위형 x축에 해당범위값에 라벨을 맵핑해서 보여준다.
			option.xrange_axis_label_map    = {0:'A01',10:'A02',25:'K03',50:'Z04',70:'P05'};//범위형 x축에 해당범위값에 라벨을 맵핑해서 보여줄 대상 맵 오브젝트			
			option.xmin						= _xmin;
			option.xmax						= _xmax;			
			option.xrange_count             = (_xmax-_xmin)/5;	
			option.legendPosition			= 'top';//'top','bottom'

			var _min = 0;
			var _max = 50;
			option.y_mark_cnt					= 4;
			
			var seriesArr = data14;
			for(var g=0;g<seriesArr.length; g++){
					var data = chartUtil.formatData_profile2(seriesArr[g]);

					var _s_name = '';
					if(data['reArr'][0][3] != null){
						_s_name = data['reArr'][0][3];
					}
					var aSeries 	= createSeries(_s_name,'line',data);
					aSeries.s_unit	='';//툴팁에 표시될 Y값의단위
					aSeries.s_sizeDefault = lineDeeps[g];//점의 크기
					aSeries.s_shape='circle';//점의 모양
					aSeries.s_color='rgba('+lineColours[g]['red']+','+lineColours[g]['green']+','+lineColours[g]['blue']+',1)';//시리즈의 색상
					aSeries.s_lineType=lineStyles[g];
					aSeries.s_lineWidth=lineDeeps[g];
					aSeries.s_shapeColor=aSeries.s_color;
					aSeries.s_lineLinkable=true;
					aSeries.s_min=_min;
					aSeries.s_max=_max;
					aSeries.s_y_mark_cnt=option.y_mark_cnt;

					option.series.push(aSeries);
			}			
			chart14.redraw(option);
	};	
	function chart15(){
			//chart의 최소사이즈 height:150px;width:350px 로 설정했을때 최적환경
			var chart15 		= createChart('chart15');			
			var option 		= createOption(chart15,'chart15');						
				
			option.xunit					= '년';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= '[년도]';
			option.unitLabel_Verti			= '[감가율]';
			
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함
	
			option.xrange_axis				= true;//x축이 범위형축
			option.xrange_axis_label_mapping= true;//범위형 x축에 해당범위값에 라벨을 맵핑해서 보여준다.
			option.xrange_axis_label_map    = {0:'A01',1:'A02',2:'K03',3:'Z04',4:'P05',5:'P06'};//범위형 x축에 해당범위값에 라벨을 맵핑해서 보여줄 대상 맵 오브젝트			

			option.legendPosition			= 'top';//'top','bottom'
			////////////////////////////////////////////////////////////////////////////////////////////////////
			option.legendMaxCount			= 10;  //범례박스표시최대개수
			option.right_margin					= 6;//오른쪽여백 최소크기일땐 30셋팅할것 표준:40
			option.top_margin					= 16;//최소크기일땐 16셋팅할것 표준:40
			option.bottom_legend_box_height     = 24;//바닥여백 최소크기일땐 0셋팅할것 표준:30
			option.valueShow				= true;//각 value포인터에 값도함께 표시하기	
			option.showTopBorder = true;
			option.showLeftBorder = false;
			option.showRightBorder = false;
			option.chartTitle				= '';//타이틀제거
			option.gridShowH					= true;
			option.gridShowV					= false;	
			////////////////////////////////////////////////////////////////////////////////////////////////////			
				
			var _xmin =0;
			var _xmax =5;
			//var _min = 999999;//비율이므로 0%로 고정
			var _min = 0;
			var _max = 1.3;	
			//option.y_mark_cnt					= 4;
			option.min							= _min;
			option.max							= _max;
			option.xmin							= _xmin;
			option.xmax							= _xmax;	
			option.xrange_count             = (_xmax-_xmin);
			
			var seriesArr = data15;
			for(var g=0;g<seriesArr.length; g++){
					var data = chartUtil.formatData_profile2(seriesArr[g]);
					var _s_name = '';
					if(data['reArr'][0][3] != null){
						_s_name = data['reArr'][0][3];
					}
					var aSeries 	= createSeries(_s_name,'line',data);
					aSeries.s_unit	='';//툴팁에 표시될 Y값의단위
					aSeries.s_sizeDefault = 1;//점의 크기
					aSeries.s_shape='circle';//점의 모양
					aSeries.s_color='rgba('+lineColours[g]['red']+','+lineColours[g]['green']+','+lineColours[g]['blue']+',1)';//시리즈의 색상
					aSeries.s_lineType=lineStyles[g];
					aSeries.s_lineWidth=1;
					aSeries.s_shapeColor=aSeries.s_color;
					aSeries.s_lineLinkable=true;
					aSeries.s_min=_min;
					aSeries.s_max=_max;
					//aSeries.s_y_mark_cnt=option.y_mark_cnt;

					option.series.push(aSeries);
			}			
			chart15.redraw(option);
	};

	function chart16(){
			var chartId = 'chart16';
			var chart16 = createChart(chartId);			
			var option = createOption(chart16,chartId);	

			option.type						= 'radial';

			
			option.bottomLabelMaxHeight = 0;//11
			option.bottom_legend_box_height = 0;//40
			//option.bottom_legend_box_top_margin = 0;//5
			option.bottom_legend_box_bottom_margin = 0;//5
			option.top_margin = 20;

			option.yAxisCalcMethod			= 'manual';//min,max,mark_cnt를 자동계산하지않는다.!!!!
			option.y_mark_cnt				= 9;//눈금개수//option.yAxisCalcMethod			= 'manual';
			
			var series =
				 [
	 		 	    {
					s_name:'A상',
					s_data:data16,
			 	    s_color:'rgba(55,101,114,0.5)',
					s_lineWidth:'1',
					s_sizeMin:1,
					s_sizeDefault:1,
			 	    s_chartType:'radial',
					s_shape:'rectangle',
					s_shapeColor:'rgba(100,128,0,1)',
					s_min:-90,//option.yAxisCalcMethod			= 'manual';
					s_max:90,//option.yAxisCalcMethod			= 'manual';
			 	    s_unit:'건',
					s_draw:true,
					}	 	   		 	     	    
				 ];
			option.series = series;
			chart16.redraw(option);
	};	
	function chart18(){
			var chartId = 'chart18';
			var chart18 = createChart(chartId);			
			var option = createOption(chart18,chartId);						
			option.xrange_axis				= false;//x축이 범위형축		
			option.xunit					= 'ºC';//툴팁에 표시되는 X값의단위
			option.unitLabel_Hori			= 'Temprature';
			option.unitLabel_Verti			= 'Sales(In Usd)';
			option.chartTitle				= '[Sales Of Beer & Ice-cream]';	
			option.crossLineShow_hori		= false;//실시간선택라인 수평선 사용안함


			

			/* 1번 시리즈 [주의 : createSeries사용시 이름이 반드시 달라야함!!!]*///BAR가 간격을 잡아주므로 series구성시 line보다 반드시 먼저와야함.
			var aSeries1 	= createSeries('any sereis A','bar',data18_1_4);//3번,4번argu->max=null,min=null,divNum=null주면 동적으로 구함
			aSeries1.s_unit	='개';//툴팁에 표시될 Y값의단위
			aSeries1.s_sizeDefault = 1;//점의 크기
			aSeries1.s_shape='circle';//점의 모양
			aSeries1.s_color='rgba(100,128,0,1)';//시리즈의 색상, (0,128,192)색은 블루
			aSeries1.s_lineWidth=1;
			option.series.push(aSeries1);			
			

			
			chart18.redraw(option);
	};	