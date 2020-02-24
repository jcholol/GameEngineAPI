/* 
 * File: Cell.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Represents a cell in a grid.
 * @constructor
 * @param {int} x - x-axis position in grid.
 * @param {int} y - y-axis position in grid.
 * @param {int} width - Width of the cell.
 * @param {int} height - Height of the cell.
 * @param {Grid} gridParent - Parent that cell is bounded to.
 * @returns {Cell}
 */
function Cell(x, y, width, height, gridParent) {
    this.mGridParent = gridParent;
    this.mXform = new Transform();
    this.mObject = null;
    this.mCellWidth = 1;
    this.mCellHeight = 1;
    this.mCellGridXPos = 0;
    this.mCellGridYPos = 0;
    
    // Converts x and y if any of them are null or undefined
    if (x === null || x === undefined) {
        x = 0;
    }
    if (y === null || y === undefined) {
        y = 0;
    }
    
    // Converts width and height if any of them are null or undefined
    if (width === null || width === undefined) {
        width = 1;
    }
    if (height === null || height === undefined) {
        height = 1;
    }
    
    this.initialize(x, y, width, height);
}

Cell.prototype.initialize = function (x, y, width, height) {
    this.setCellPositionInGrid(x, y);
    this.setCellWidth();
    this.setCellHeight();
};

/**
 * Updates the cell's state.
 * @returns {void}
 */
Cell.prototype.update = function () {
    
};

/**
 * Draws the cell's state.
 * @returns {void}
 */
Cell.prototype.draw = function () {
    
};

Cell.prototype.setObject = function (obj) {
    this.mObject = obj;
};

Cell.prototype.getObject = function () {
    return this.mObject;
};

Cell.setCellPositionInGrid = function (x, y) {
    this.mCellGridXPos = x;
    this.mCellGridYPos = y;
};

Cell.getCellPositionInGrid = function (x, y) {
    var pos = {x, y};
    return pos;
};

Cell.setCellWidth = function (width) {
    this.mCellWidth = width;
};

Cell.setCellHeight = function (height) {
    this.mCellHeight = height;
};

/**
 * Gets the transform of the current cell object.
 * @returns {Transform} Transform of the cell object.
 */
Cell.prototype.getXform = function () {
    return this.mXform;
};


