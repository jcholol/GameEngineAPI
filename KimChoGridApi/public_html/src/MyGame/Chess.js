/*
 * File: Chess.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2, TileMap
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Chess() {
   gEngine.Core.initializeEngineCore('GLCanvas', this);

   this.mCamera = null;
   this.mTileMap = null;

   this.mBlock = null;
   
   this.mBlackPieces = [];
   this.mWhitePieces = [];
}
gEngine.Core.inheritPrototype(Chess, Scene);

Chess.prototype.loadScene = function () {
};

Chess.prototype.unloadScene = function () {
};

Chess.prototype.initialize = function () {
   // Step A: set up the cameras
   this.mCamera = new Camera(
      vec2.fromValues(0, 0), // position of the camera
      8, // width of camera
      [0, 0, 600, 600]           // viewport (orgX, orgY, width, height)
   );
   this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

   this.mTileMap = new TileMap(8, 8, 1, 1);
   this.mTileMap.setDrawLines(true);
   this.mTileMap.setGridLineThickness(0.05);
   
   this.mGrid = new Grid(8, 8, 1, 1);
   this.mGrid.setDrawLines(true);
   this.mGrid.setGridLineThickness(0.05);
};

Chess.prototype.initializeMap = function () {
    for (var i = 0; i < this.mTileMap.length; i++) {
        for (var j = 0; j < this.mTileMap[i].length; j++) {
        }
    }
};

Chess.prototype.draw = function () {
   // Step A: clear the canvas
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

   this.mCamera.setupViewProjection();

   this.mTileMap.draw(this.mCamera);
};

Chess.prototype.update = function () {
   this.mTileMap.update();
   this.handleInput();
};

Chess.prototype.handleInput = function () {
    
};


