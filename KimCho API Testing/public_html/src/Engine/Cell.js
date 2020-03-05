/* 
 * File: Cell.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false, vec2: false */
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
 
/**
 * Will initialize the cell.
 * @param {int} x - x-axis position in grid.
 * @param {int} y - y-axis position in grid.
 * @param {int} width - Width of the cell.
 * @param {int} height - Height of the cell.
 * @returns {void}
 */
Cell.prototype.initialize = function (x, y, width, height) {
    this.setCellIndexInGrid(x, y);
    this.setCellWidth(width);
    this.setCellHeight(height);
};

/**
 * Updates the cell's state.
 * @returns {void}
 */
Cell.prototype.update = function () {
    
};

/**
 * Sets the cells indexed position in the grid.
 * @param {int} x
 * @param {int} y
 * @returns {void}
 */
Cell.prototype.setCellIndexInGrid = function (x, y) {
    this.mCellGridXPos = x;
    this.mCellGridYPos = y;
};

/**
 * Gets the cell's indexed position in the grid.
 * @returns {array}
 */
Cell.prototype.getCellIndexInGrid = function () {
    var pos = [this.mCellGridXPos, this.mCellGridYPos];
    return pos;
};

/**
 * Sets the width of the cell.
 * @param {double} width
 * @returns {undefined}
 */
Cell.prototype.setCellWidth = function (width) {
    this.mCellWidth = width;
};

/**
 * Sets the height of the cell.
 * @param {double} height
 * @returns {void}
 */
Cell.prototype.setCellHeight = function (height) {
    this.mCellHeight = height;
};

/**
 * Gets the cells world position
 * @returns {vec2} World position of the cell position
 */
Cell.prototype.cellToWorld = function () {
    var xForm = this.mGridParent.getXform();
    var xOffset = (this.mGridParent.getGridLength() * this.mGridParent.getCellWidth()) / 2;
    var yOffset = (this.mGridParent.getGridHeight() * this.mGridParent.getCellHeight()) / 2;
    var xPos = (xForm.getXPos() - xOffset) + (this.mGridParent.getCellWidth() * this.mCellGridXPos) + (this.mGridParent.getCellWidth() / 2);
    var yPos = (xForm.getYPos() - yOffset) + (this.mGridParent.getCellHeight() * this.mCellGridYPos) + (this.mGridParent.getCellHeight() / 2);
    
    var worldPos = vec2.fromValues(xPos, yPos);
    return worldPos;
};