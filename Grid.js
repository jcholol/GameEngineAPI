/* 
 * File: Grid.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false */
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

    for (var i = 0; i < this.mGridLength; i++) {
        var yArray = [];
        for (var j = 0; j < this.mGridHeight; j++) {
            yArray[j] = new Cell(i, j, this.mCellWidth, this.mCellHeight);
        }
        this.mGridArray.push(yArray);
    }
    
    this.updateLines();
};

/**
 * Updates the grid's state.
 * @returns {void}
 */
Grid.prototype.update = function () {
    this.updateLines();
};

/**
 * Draws the grid and its state.
 * @param {mat4} vpMatrix - Viewport Matrix
 * @returns {void}
 */
Grid.prototype.draw = function (vpMatrix) {
    if (this.mDrawLines) {
        this.drawLines(vpMatrix);
    }
};

/**
 * Helper function for updating the grid line state.
 * @returns {void}
 */
Grid.prototype.updateLines = function () {
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
 * @param {mat4} vpMatrix - Viewport Matrix
 * @returns {void}
 */
Grid.prototype.drawLines = function (vpMatrix) {
    for (var i = 0; i < this.mGridLinesX.length; i++) {
        this.mGridLinesX[i].draw(vpMatrix);
    }
    
    for (var j = 0; j < this.mGridLinesY.length; j++) {
        this.mGridLinesY[j].draw(vpMatrix);
    }
};

/**
 * Will toggle between drawing and not drawing the grid lines.
 * @param {boolean} bool
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
 * Sets the object at the specified cell coordinate.
 * @param {int} x - The x-coordinate.
 * @param {int} y - The y-coordinate.
 * @param {Object} obj - The object you want to put into the grid cell.
 * @returns {void}
 */
Grid.prototype.setObjectAt = function (x, y, obj) {
    
};

/**
 * Gets the object at the specified cell coordinate.
 * @param {int} x - The x-coordinate.
 * @param {int} y - The y-coordinate.
 * @returns {Object} The object at the specified cell coordinate.
 */
Grid.prototype.getObjectAt = function (x, y) {
    
};

/**
 * Will look through the grid to see if a specified object exists.
 * @param {Object} obj - The object to check for.
 * @returns {boolean}
 */
Grid.prototype.contains = function (obj) {
    
};

/**
 * Gets the transform of the current grid object.
 * @returns {Transform} Transform of the grid object.
 */
Grid.prototype.getXform = function () {
    return this.mXform;
};