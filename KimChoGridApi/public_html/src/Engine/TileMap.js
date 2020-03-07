/* 
 * File: TileMap.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false, vec2: false, Grid */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Represents a tile map.
 * @constructor
 * @param {int} gridLength - Number of cells along the x-axis.
 * @param {int} gridHeight - Number of cells along the y-axis.
 * @param {int} cellWidth - The width of the cells in the grid.
 * @param {int} cellHeight - The height of the cells in the grid.
 * @returns {TileMap}
 */
function TileMap(gridLength, gridHeight, cellWidth, cellHeight) {
    Grid.call(this, gridLength, gridHeight, cellWidth, cellHeight);
}
gEngine.Core.inheritPrototype(TileMap, Grid);

/**
 * This method will draw the tile map to a camera.
 * @param {Camera} aCamera - Camera to draw to.
 * @returns {void}
 */
TileMap.prototype.draw = function (aCamera) {
    Grid.prototype.draw.call(this, aCamera);
    
    this.mGridArray.forEach(grid => {
       grid.forEach(tile => {
           tile.draw(aCamera);
       }); 
    });
};

/**
 * Initializes the grid.
 * @param {int} gridLength - Number of cells along the x-axis.
 * @param {int} gridHeight - Number of cells along the y-axis.
 * @param {int} cellWidth - The width of the cells in the grid.
 * @param {int} cellHeight - The height of the cells in the grid.
 * @returns {void}
 */
TileMap.prototype.initialize = function (gridLength, gridHeight, cellWidth, cellHeight) {
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
            yArray[j] = new Tile(i, j, this.mCellWidth, this.mCellHeight, this);
        }
        this.mGridArray.push(yArray);
    }
    
    this._updateLines();
};

/**
 * Sets the object at the specified cell position.
 * @param {int} x - The x-coordinate.
 * @param {int} y - The y-coordinate.
 * @param {Object} obj - The object you want to put into the grid cell.
 * @returns {void}
 */
TileMap.prototype.setObjectAt = function (x, y, obj) {
    Grid.prototype.setObjectAt.call(this, x, y, obj);
    var wc = vec2.fromValues(x, y);
    var cellIndex = this._getIndexFromWC(wc);
    
    if (cellIndex === null || cellIndex === undefined) {
        return;
    }
    
    this.mGridArray[cellIndex[0]][cellIndex[1]].setRenderable(obj);
};

/**
 * This method will check to see if a renderable exists in a tile.
 * @param {float} x - World coordinate x position
 * @param {float} y - World coordinate y position
 * @returns {boolean} Returns true or false depending on if the specified tile position contains a renderable
 */
TileMap.prototype.tileHasRenderable = function (x, y) {
    var wc = vec2.fromValues(x, y);
    var position = this._getIndexFromWC(wc);
    
    if (position === null || position === undefined) {
        return;
    }
    
    return this.mGridArray[position[0]][position[1]].hasRenderable();
};