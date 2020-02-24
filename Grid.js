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
 * @param {int} x - Number of cells along the x-axis.
 * @param {int} y - Number of cells along the y-axis.
 * @param {int} cellWidth - The width of the cells in the grid.
 * @param {int} cellHeight - The height of the cells in the grid.
 * @returns {Grid}
 */
function Grid(x, y, cellWidth, cellHeight) {
    this.mGridArray = [];
    this.mXform = new Transform(); // transform that moves this object around
    this.mGridLength = 0; // Number of cells in the x-axis
    this.mGridHeight = 0; // Number of cells in the y-axis
    this.mCellWidth = 1;
    this.mCellHeight = 1;
    
    this.mShader = gEngine.DefaultResources.getConstColorShader();  // this is the default
    
    // Converts x and y if any of them are null or undefined
    if (x === null || x === undefined) {
        x = 0;
    }
    if (y === null || y === undefined) {
        y = 0;
    }
    
    // Converts cellWidth and cellHeight if any of them are null or undefined
    if (cellWidth === null || cellWidth === undefined) {
        cellWidth = 1;
    }
    if (cellHeight === null || cellHeight === undefined) {
        cellHeight = 1;
    }
    
    this.initialize(x, y, cellWidth, cellHeight);
}

/**
 * Initializes the grid.
 * @param {int} x - Number of cells along the x-axis.
 * @param {int} y - Number of cells along the y-axis.
 * @param {int} cellWidth - The width of the cells in the grid.
 * @param {int} cellHeight - The height of the cells in the grid.
 * @returns {void}
 */
Grid.prototype.initialize = function (x, y, cellWidth, cellHeight) {
    this.setGridLength(x);
    this.setGridHeight(y);
    this.setCellWidth(cellWidth);
    this.setCellHeight(cellHeight);
    
    for (var i = 0; i < this.mGridLength; i++) {
        var yArray = [];
        for (var j = 0; j < this.mGridHeight; j++) {
            yArray[j] = new Cell(i, j, this.mCellWidth, this.mCellHeight);
        }
        this.mGridArray.push(yArray);
    }
};

/**
 * Updates the grid's state.
 * @returns {void}
 */
Grid.prototype.update = function () {
    
};

/**
 * Draws the grid and its state.
 * @returns {void}
 */
Grid.prototype.draw = function () {
    
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
 * @param {int} xLength - The number of cells on the x-axis.
 * @returns {void}
 */
Grid.prototype.setGridLength = function (xLength) {
    this.mGridLength = xLength;
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
 * @param {int} yLength - The number of cells on the y-axis.
 * @returns {void} 
 */
Grid.prototype.setGridHeight = function (yLength) {
    this.mGridHeight = yLength;
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
 * @returns {void}
 */
Grid.prototype.setObjectAt = function (x, y) {
    
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
 * Gets the transform of the current grid object.
 * @returns {Transform} Transform of the grid object.
 */
Grid.prototype.getXform = function () {
    return this.mXform;
};