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

TileMap.prototype.initializeFromJSON = function (jsonString) {
    var json = JSON.parse(jsonString);
    var length = json.GridLength;
    var height = json.GridHeight;
    var cellWidth = json.CellWidth;
    var cellHeight = json.CellHeight;
    var gridArray = json.GridArray;
    
    this.setGridLength(length);
    this.setGridHeight(height);
    this.setCellWidth(cellWidth);
    this.setCellHeight(cellHeight);

    this.mGridArray = [];
    this.mGridLinesX = [];
    this.mGridLinesY = [];

    for (var i = 0; i < length; i++) {
        var yArray = [];
        for (var j = 0; j < height; j++) {
            yArray[j] = new Tile(gridArray[i][j].cellXPos, gridArray[i][j].cellYPos, gridArray[i][j].cellWidth, gridArray[i][j].cellHeight, this);
            if (gridArray[i][j].renderable !== null && gridArray[i][j].renderable !== undefined) {
                var tempRenderable = new Renderable();
                if (gridArray[i][j].renderable.mTexture !== null && gridArray[i][j].renderable.mTexture !== undefined) {
                    tempRenderable = new TextureRenderable(gridArray[i][j].renderable.mTexture);
                } else {
                    tempRenderable.setColor(gridArray[i][j].renderable.mColor);
                }
                tempRenderable.getXform().setPosition(gridArray[i][j].renderable.mXform.mPosition[0], gridArray[i][j].renderable.mXform.mPosition[1]);
                
                yArray[j].setRenderable(tempRenderable);
            }
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
TileMap.prototype.setObjectAtWC = function (x, y, obj) {
    Grid.prototype.setObjectAtWC.call(this, x, y, obj);
    var wc = vec2.fromValues(x, y);
    var cellIndex = this._getIndexFromWC(wc);

    if (cellIndex === null || cellIndex === undefined) {
        return;
    }

    this.mGridArray[cellIndex[0]][cellIndex[1]].setRenderable(obj);
};

/**
 * Sets the object at the specified grid index.
 * @param {int} x - The x index
 * @param {int} y - The y index
 * @param {Renderable} obj - The object you want to put into the grid cell.
 * @returns {void}
 */
TileMap.prototype.setObjectAtIndex = function (x, y, obj) {
    Grid.prototype.setObjectAtIndex.call(this, x, y, obj);
    this.mGridArray[x][y].setRenderable(obj);
};

/**
 * Removes the object at the specified cell position.
 * @param {int} x - The x-coordinate.
 * @param {int} y - The y-coordinate.
 * @returns {void}
 */
TileMap.prototype.removeObjectAtWC = function (x, y) {
    var wc = vec2.fromValues(x, y);
    var cellIndex = this._getIndexFromWC(wc);

    this.mGridArray[cellIndex[0]][cellIndex[1]].removeRenderable();
};

/**
 * Removes the object at the specified grid index.
 * @param {int} x - The x index
 * @param {int} y - The y index
 * @returns {void}
 */
TileMap.prototype.removeObjectAtIndex = function (x, y) {
    this.mGridArray[x][y].removeRenderable();
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

TileMap.prototype.resize = function (gridLength, gridHeight, cellWidth, cellHeight) {
    if (cellWidth === null || cellWidth === undefined) {
        cellWidth = 1;
    }
    if (cellHeight === null || cellHeight === undefined) {
        cellHeight = 1;
    }

    if (this.mGridLength !== gridLength || this.mGridHeight !== gridHeight) {
        this.resizeHelper(gridLength, gridHeight, cellWidth, cellHeight);
    } else if (this.mCellWidth !== cellWidth || this.mCellHeight !== cellHeight) {
        this.setCellWidth(cellWidth);
        this.setCellHeight(cellHeight);
    }
};

TileMap.prototype.exportToJSON = function () {
    var jsonObj = {
        "GridLength": this.mGridLength,
        "GridHeight": this.mGridHeight,
        "CellWidth": this.mCellWidth,
        "CellHeight": this.mCellHeight,
        "GridArray": this.mGridArray
    };

    return jsonObj;
};

// Private Methods
TileMap.prototype.resizeHelper = function (gridLength, gridHeight, cellWidth, cellHeight) {
    this.setGridLength(gridLength);
    this.setGridHeight(gridHeight);
    this.setCellWidth(cellWidth);
    this.setCellHeight(cellHeight);

    this.mGridLinesX = [];
    this.mGridLinesY = [];

    var newArray = [];

    for (var i = 0; i < gridLength; i++) {
        var yArray = [];
        for (var j = 0; j < gridHeight; j++) {
            if (this.mGridArray[i] === null || this.mGridArray[i] === undefined) {
                yArray[j] = new Tile(i, j, this.mCellWidth, this.mCellHeight, this);
            } else if (this.mGridArray[i][j] === null || this.mGridArray[i][j] === undefined) {
                yArray[j] = new Tile(i, j, this.mCellWidth, this.mCellHeight, this);
            } else {
                yArray[j] = this.mGridArray[i][j];
            }
        }
        newArray.push(yArray);
    }

    this.mGridArray = newArray;

    this._updateLines();
};