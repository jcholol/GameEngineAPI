/* 
 * File: Tile.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false, vec2: false, Cell */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/**
 * Represents a tile in a tile map.
 * @constructor
 * @param {int} x - x-axis position in tile map.
 * @param {int} y - y-axis position in tile map.
 * @param {int} width - Width of the tile.
 * @param {int} height - Height of the tile.
 * @param {Grid} gridParent - Parent that tile is bounded to.
 * @returns {Tile}
 */
function Tile(x, y, width, height, gridParent) {
    this.mRenderable = null;
    
    Cell.call(this, x, y, width, height, gridParent);
}
gEngine.Core.inheritPrototype(Tile, Cell);

/**
 * This method will draw the tile to the camera.
 * @param {Camera} aCamera - Camera to draw to.
 * @returns {void}
 */
Tile.prototype.draw = function (aCamera) {
    if (this.mRenderable !== null && this.mRenderable !== undefined) {
        this.mRenderable.draw(aCamera);
    }
};

/**
 * Sets the width of the tile.
 * @param {double} width
 * @returns {void}
 */
Tile.prototype.setCellWidth = function (width) {
    Cell.prototype.setCellWidth.call(this, width);
    
    this._adjustRenderablePosition();
};

/**
 * Sets the height of the tile.
 * @param {double} height
 * @returns {void}
 */
Tile.prototype.setCellHeight = function (height) {
    Cell.prototype.setCellHeight.call(this, height);
    
    this._adjustRenderablePosition();
};

/**
 * This method will attach a reference to the tile to a specified renderable.
 * @param {Renderable} renderable - The renderable to assign to tile.
 * @returns {void}
 */
Tile.prototype.setRenderable = function (renderable) {
    this.mRenderable = renderable;
    //console.log(this.mRenderable);
};

/**
 * This method will remove a reference to the tile to a specified renderable.
 * @returns {null}
 */
Tile.prototype.removeRenderable = function () {
    this.mRenderable = null;
};

/**
 * Checks to see if the current tile has a reference to a renderable.
 * @returns {Boolean}
 */
Tile.prototype.hasRenderable = function () {
    return this.mRenderable !== null && this.mRenderable !== undefined;
};

// Private Methods
Tile.prototype._adjustRenderablePosition = function () {
    var cellWC = this.cellToWorld();
    
    if (this.mRenderable !== null && this.mRenderable !== undefined) {
        this.mRenderable.getXform().setPosition(cellWC[0], cellWC[1]);
    }
};