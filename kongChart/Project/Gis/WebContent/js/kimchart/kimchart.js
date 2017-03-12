/**
 * This is kimsaechang chart libs.
 */

KimsChart = function(container) {
	this.container = container;
	this.sp = new SurfacePlot(this.container);
}

KimsChart.prototype.init = function(numRows, numCols, titles, labels, colours,_canvas) {
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
        width: $(this.container).width(),
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

KimsChart.prototype.draw = function() {
	this.sp.draw(this.data, this.options, this.basicPlotOptions, this.glOptions,this.canvas);
}

KimsChart.prototype.update = function(values) {
		this.data.formattedValues = values;
	    this.data.nRows = values.length;
		this.draw();

}


