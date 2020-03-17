/* 
 * File: Grid.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Represents a grid.
 * @constructor
 * @param {int} gridLength - Number of cells along the x-axis.
 * @param {int} gridHeight - Number of cells along the y-axis.
 * @param {int} cellWidth - The width of the cells in the grid.
 * @param {int} cellHeight - The height of the cells in the grid.
 * @returns {Grid}
 */
function Grid(gridLength, gridHeight, cellWidth, cellHeight) {
    this.mGridArray = [];
    this.mXform = new Transform(); // transform that moves this object around
    this.mGridLength = 0; // Number of cells in the x-axis
    this.mGridHeight = 0; // Number of cells in the y-axis
    this.mCellWidth = 1;
    this.mCellHeight = 1;
    
    this.mGridMap = null;
    
    // Debug Draw Lines
    this.mGridLineThickness = 1;
    this.mDrawLines = false;
    this.mGridLinesX = [];
    this.mGridLinesY = [];

    this.mShader = gEngine.DefaultResources.getConstColorShader();  // this is the default

    // Converts x and y if any of them are null or undefined
    if (gridLength === null || gridLength === undefined) {
        gridLength = 0;
    }
    if (gridHeight === null || gridHeight === undefined) {
        gridHeight = 0;
    }

    // Converts cellWidth and cellHeight if any of them are null or undefined
    if (cellWidth === null || cellWidth === undefined) {
        cellWidth = 1;
    }
    if (cellHeight === null || cellHeight === undefined) {
        cellHeight = 1;
    }

    this.initialize(gridLength, gridHeight, cellWidth, cellHeight);
}

/**
 * Initializes the grid.
 * @param {int} gridLength - Number of cells along the x-axis.
 * @param {int} gridHeight - Number of cells along the y-axis.
 * @param {int} cellWidth - The width of the cells in the grid.
 * @param {int} cellHeight - The height of the cells in the grid.
 * @returns {void}
 */
Grid.prototype.initialize = function (gridLength, gridHeight, cellWidth, cellHeight) {
    this.setGridLength(gridLength);
    this.setGridHeight(gridHeight);
    this.setCellWidth(cellWidth);
    this.setCellHeight(cellHeight);
    
    this.mGridArray = [];
    this.mGridLinesX = [];
    this.mGridLinesY = [];
    
    for (var i = 0; i < this.mGridLength; i++) {
        var yArray = [];
        for (var j = 0; j < this.mGridHeight; j++) {
            yArray[j] = new Cell(i, j, this.mCellWidth, this.mCellHeight, this);
        }
        this.mGridArray.push(yArray);
    }
    
    this._updateLines();
};

/**
 * Updates the grid's state.
 * @returns {void}
 */
Grid.prototype.update = function () {
    this._updateLines();
};

/**
 * Draws the grid and its state.
 * @param {Camera} aCamera - Camera to draw to.
 * @returns {void}
 */
Grid.prototype.draw = function (aCamera) {
    if (this.mDrawLines) {
        this.drawLines(aCamera);
    }
};

/**
 * Helper function for updating the grid line state.
 * @returns {void}
 */
Grid.prototype._updateLines = function () {
    var totalGridWidth = this.mGridLength * this.mCellWidth;
    var totalGridHeight = this.mGridHeight * this.mCellHeight;
    var startXPos = this.mXform.getXPos() - (totalGridWidth / 2);
    var startYPos = this.mXform.getYPos() - (totalGridHeight / 2);
    
    for (var i = 0; i <= this.mGridLength; i++) {
        var temp = new Renderable();
        temp.getXform().setPosition(startXPos + (i * this.mCellWidth), this.mXform.getYPos());
        temp.getXform().setWidth(this.mGridLineThickness);
        temp.getXform().setHeight(totalGridHeight);
        this.mGridLinesX[i] = temp;
    }
    
    for (var j = 0; j <= this.mGridHeight; j++) {
        var temp = new Renderable();
        temp.getXform().setPosition(this.mXform.getXPos(), startYPos + (j * this.mCellHeight));
        temp.getXform().setWidth(totalGridWidth);
        temp.getXform().setHeight(this.mGridLineThickness);
        this.mGridLinesY[j] = temp;
    }
};

/**
 * Draws the lines for the grid.
 * @param {Camera} aCamera - Camera to draw to.
 * @returns {void}
 */
Grid.prototype.drawLines = function (aCamera) {
    for (var i = 0; i < this.mGridLinesX.length; i++) {
        this.mGridLinesX[i].draw(aCamera);
    }
    
    for (var j = 0; j < this.mGridLinesY.length; j++) {
        this.mGridLinesY[j].draw(aCamera);
    }
};

/**
 * Will toggle between drawing and not drawing the grid lines.
 * @param {boolean} bool - Boolean to determine whether or not to draw the grid lines.
 * @returns {void}
 */
Grid.prototype.setDrawLines = function (bool) {
    this.mDrawLines = bool;
};

/**
 * Will set the thickness of the grid lines.
 * @param {int} thickness - The thickness of the grid lines.
 * @returns {void}
 */
Grid.prototype.setGridLineThickness = function (thickness) {
    this.mGridLineThickness = thickness;
};

/**
 * Will set the width of each cell in the grid.
 * @param {int} width - Represents a number to set the grid cell width.
 * @returns {void}
 */
Grid.prototype.setCellWidth = function (width) {
    this.mCellWidth = width;
    
    for (var i = 0; i < this.mGridArray.length; i++) {
        for (var j = 0; j < this.mGridArray[i].length; j++) {
            this.mGridArray[i][j].setCellWidth(this.mCellWidth);
        }
    }
};

/**
 * Will get the current set width for the grid cells.
 * @returns {int} Returns an int representing the grid cell width. 
 */
Grid.prototype.getCellWidth = function () {
    return this.mCellWidth;
};

/**
 * Will set the height of each cell in the grid.
 * @param {int} height - Represents a number to set the grid cell height.
 * @returns {void}
 */
Grid.prototype.setCellHeight = function (height) {
    this.mCellHeight = height;
    
    for (var i = 0; i < this.mGridArray.length; i++) {
        for (var j = 0; j < this.mGridArray[i].length; j++) {
            this.mGridArray[i][j].setCellHeight(this.mCellHeight);
        }
    }
};

/**
 * Will get the current set height for the grid cells.
 * @returns {int} Returns an int representing the grid cell height. 
 */
Grid.prototype.getCellHeight = function () {
    return this.mCellHeight;
};

/**
 * Will set the number of cells along the x-axis.
 * @param {int} length - The number of cells on the x-axis.
 * @returns {void}
 */
Grid.prototype.setGridLength = function (length) {
    this.mGridLength = length;
};

/**
 * Returns the number of cells on the x-axis.
 * @returns {Number|int} The number of cells on the x-axis.
 */
Grid.prototype.getGridLength = function () {
    return this.mGridLength;
};

/**
 * Will set the number of cells along the y-axis.
 * @param {int} height - The number of cells on the y-axis.
 * @returns {void} 
 */
Grid.prototype.setGridHeight = function (height) {
    this.mGridHeight = height;
};

/**
 * Returns the number of cells on the y-axis.
 * @returns {Number|int} The number of cells on the y-axis.
 */
Grid.prototype.getGridHeight = function () {
    return this.mGridHeight;
};

/**
 * Sets the object at the specified cell position.
 * @param {int} x - The x-coordinate.
 * @param {int} y - The y-coordinate.
 * @param {Object} obj - The object you want to put into the grid cell.
 * @returns {void}
 */
Grid.prototype.setObjectAtWC = function (x, y, obj) {
    var wc = vec2.fromValues(x, y);
    var cellWC = this.cellToWorld(wc);
    
    if (cellWC === null || cellWC === undefined
            || obj === null || obj === undefined) {
        return;
    }
    
    obj.getXform().setPosition(cellWC[0], cellWC[1]);
};

/**
 * Sets the object at the specified grid index.
 * @param {int} x - The x index
 * @param {int} y - The y index
 * @param {Renderable} obj - The object you want to put into the grid cell.
 * @returns {void}
 */
Grid.prototype.setObjectAtIndex = function (x, y, obj) {
    var cellWC = this._getWCFromIndex(x, y);
    obj.getXform().setPosition(cellWC[0], cellWC[1]);
};

/**
 * Gets the world coordinate position of the cell at the specified world coordinate position.
 * @param {vec2} wc - The world coordinate
 * @returns {vec2} position of the cell to world coordinate.
 */
Grid.prototype.cellToWorld = function (wc) {
    var positionInGrid = this._getIndexFromWC(wc);
    
    if (positionInGrid === null || positionInGrid === undefined) {
        return;
    }
    
    return this.mGridArray[positionInGrid[0]][positionInGrid[1]].cellToWorld();
};

/**
 * Converts a world coordinate position into a cell index coordinate.
 * @param {vec2} wc - World position to convert.
 * @returns {Array|int} Index coordinate of the cell.
 */
Grid.prototype.worldToCell = function (wc) {
    return this._getIndexFromWC(wc);
};

/**
 * Gets the transform of the current grid object.
 * @returns {Transform} Transform of the grid object.
 */
Grid.prototype.getXform = function () {
    return this.mXform;
};



// Private Methods
Grid.prototype._getIndexFromWC = function (wc) {
    var localizedX = wc[0] - ((this.getXform().getXPos()) - ((this.getGridLength() * this.getCellWidth()) / 2));
    var localizedY =  + wc[1] - (this.getXform().getYPos() - ((this.getGridHeight() * this.getCellHeight()) / 2));
    
    // Checks if point is within the grid
    if (localizedX < 0 || localizedX > this.getGridLength() * this.getCellWidth() ||
        localizedY < 0 || localizedY > this.getGridHeight() * this.getCellHeight()) {
        //console.log("out of bounds");
        return;
    }
    
    var xIndex = Math.floor(localizedX / this.getCellWidth());
    var yIndex = Math.floor(localizedY / this.getCellHeight());
    
    return [xIndex, yIndex];
};

Grid.prototype._getWCFromIndex = function (x, y) {
    return this.mGridArray[x][y].cellToWorld();
};