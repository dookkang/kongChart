/**
 * This is kimsaechang chart libs.
 */

KimsChartLib = function(container) {
	this.container = container;
	this.sp = new SurfacePlotLib(this.container);
}

KimsChartLib.prototype.init = function(numRows, numCols, titles, labels, colours,_canvas) {
	this.data = {};
	this.options = {};
	this.basicPlotOptions = {};
	this.glOptions = {};
	this.titles = titles;
	this.labels = labels;
	this.colours = colours;
	this.canvas = _canvas;

	this.data = {
        nRows: numRows,
        nCols: numCols,
        formattedValues: new Array()
    };

	var chartOrigin = {
        x: 0,
        y: 0
    };
	this.options = {
        xPos: 0,
        yPos: 0,
        width: $(this.container).width()+100,
        height: $(this.container).height(),
        colourGradient: this.colours,
        xTitle: this.titles.x,
        yTitle: this.titles.y,
        zTitle: this.titles.z,
        backColour: '#ffffff',
        axisTextColour: '#000000',
        hideFlatMinPolygons: true,
        origin: chartOrigin
    };

	this.basicPlotOptions = {
        fillPolygons: false,
        tooltips: new Array(),
        renderPoints: false
    }

	this.glOptions = {
        xLabels: this.labels.x,
        yLabels: this.labels.y,
        zLabels: this.labels.z,
        chkControlId: '',//element's id
        autoCalcZScale: true,
        animate: false
    };
}

KimsChartLib.prototype.draw = function() {
	this.sp.draw(this.data, this.options, this.basicPlotOptions, this.glOptions,this.canvas);
}

KimsChartLib.prototype.update = function(values) {
	if(!stop){
		this.data.formattedValues = values;
	    this.data.nRows = values.length;
		this.draw();
	}
}


