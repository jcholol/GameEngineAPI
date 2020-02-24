/* 
 * File: Grid.js
 * Encapsulates the user define WC and Viewport functionality
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
 */
function Grid(x, y) {
    this.mShader = gEngine.DefaultResources.getConstColorShader();  // this is the default
    this.mXform = new Transform(); // transform that moves this object around
    this.mHorizontalLength = 0; // Number of cells in the x-axis
    this.mVerticalLength = 0; // Number of cells in the y-axis
    this.mCellWidth = 1;
    this.mCellHeight = 1;
    
    // Converts x and y if any of them are null or undefined
    if (x === null || x === undefined) {
        x = 0;
    }
    if (y === null || y === undefined) {
        y = 0;
    }
    
    this.initialize(x, y);
}

/**
 * Initializes the grid.
 * @param {int} x - Number of cells along the x-axis.
 * @param {int} y - Number of cells along the y-axis.
 */
Grid.prototype.initialize = function (x, y) {
    this.setHorizontalLength(x);
    this.setVerticalLength(y);
};

/**
 * Updates the grid state.
 */
Grid.prototype.update = function () {
    
};

/**
 * Draws the grid and its state.
 */
Grid.prototype.draw = function () {
    
};

/**
 * Will set the width of each cell in the grid.
 * @param {int} width - Represents a number to set the grid cell width.
 */
Grid.prototype.setCellWidth = function (width) {
    this.mCellWidth = width;
};

/**
 * Will get the current set width for the grid cells.
 * @returns {int} - Returns an int representing the grid cell width. 
 */
Grid.prototype.getCellWidth = function () {
    return this.mCellWidth;
};

/**
 * Will set the height of each cell in the grid.
 * @param {int} height - Represents a number to set the grid cell height.
 */
Grid.prototype.setCellHeight = function (height) {
    this.mCellHeight = height;
};

/**
 * Will get the current set height for the grid cells.
 * @returns {int} - Returns an int representing the grid cell height. 
 */
Grid.prototype.getCellHeight = function () {
    return this.mCellHeight;
};

/**
 * Will set the number of cells along the x-axis.
 * @param {int} xLength - The number of cells on the x-axis.
 */
Grid.prototype.setHorizontalLength = function (xLength) {
    this.mHorizontalLength = xLength;
};

/**
 * Returns the number of cells on the x-axis.
 * @returns {Number|int} - The number of cells on the x-axis.
 */
Grid.prototype.getHorizontalLength = function () {
    return this.mHorizontalLength;
};

/**
 * Will set the number of cells along the y-axis.
 * @param {int} yLength - The number of cells on the y-axis.
 */
Grid.prototype.setVerticalLength = function (yLength) {
    this.mVerticalLength = yLength;
};

/**
 * Returns the number of cells on the y-axis.
 * @returns {Number|int} - The number of cells on the y-axis.
 */
Grid.prototype.getVerticalLength = function () {
    return this.mVerticalLength;
};

/**
 * Sets the object at the specified cell coordinate.
 * @param {int} x - The x-coordinate.
 * @param {int} y - The y-coordinate.
 */
Grid.prototype.setObjectAt = function (x, y) {
    
};

/**
 * Gets the object at the specified cell coordinate.
 * @param {int} x - The x-coordinate.
 * @param {int} y - The y-coordinate.
 * @returns {Object} - The object at the specified cell coordinate.
 */
Grid.prototype.getObjectAt = function (x, y) {
    
};

/**
 * Gets the transform of the current grid object.
 * @returns {Transform} - Transform of the grid object.
 */
Grid.prototype.getXform = function () {
    return this.mXform;
};