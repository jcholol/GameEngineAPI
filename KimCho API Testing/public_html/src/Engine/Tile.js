/* 
 * File: Tile.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, mat4: false, vec3: false, vec2: false, Cell */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

function Tile(x, y, width, height, gridParent) {
    this.mRenderable = null;
    
    Cell.call(this, x, y, width, height, gridParent);
}

gEngine.Core.inheritPrototype(Tile, Cell);

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

Tile.prototype._adjustRenderablePosition = function () {
    var cellWC = this.cellToWorld();
    
    if (this.mRenderable !== null && this.mRenderable !== undefined) {
        this.mRenderable.getXform().setPosition(cellWC[0], cellWC[1]);
    }
};

Tile.prototype.setRenderable = function (renderable) {
    this.mRenderable = renderable;
    console.log(this.mRenderable);
};

Tile.prototype.hasRenderable = function () {
    return this.mRenderable !== null && this.mRenderable !== undefined;
}