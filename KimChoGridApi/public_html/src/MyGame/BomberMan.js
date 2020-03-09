/*
 * File: BomberMan.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2, TileMap
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BomberMan() {
   gEngine.Core.initializeEngineCore('GLCanvas', this);

   this.mCamera = null;
   this.mTileMap = null;

   // Assets
   this.kTile0 = "assets/bomberman/backyard_00.png";
   this.kTile1 = "assets/bomberman/backyard_01.png";
}
gEngine.Core.inheritPrototype(BomberMan, Scene);

BomberMan.prototype.loadScene = function () {
   gEngine.Textures.loadTexture(this.kTile0);
};

BomberMan.prototype.unloadScene = function () {
   gEngine.Textures.unloadTexture(this.kTile0);
};

BomberMan.prototype.initialize = function () {
   // Step A: set up the cameras
   this.mCamera = new Camera(
      vec2.fromValues(0, 0), // position of the camera
      20, // width of camera
      [0, 0, 600, 600]           // viewport (orgX, orgY, width, height)
   );
   this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

   this.mTileMap = new TileMap(10, 10, 1, 1);
   this.mTileMap.setDrawLines(true);
   this.mTileMap.setGridLineThickness(0.05);
};

BomberMan.prototype.initializeMap = function () {
    for (var i = 0; i < this.mTileMap.length; i++) {
        for (var j = 0; j < this.mTileMap[i].length; j++) {
            
        }
    }
};

BomberMan.prototype.draw = function () {
   // Step A: clear the canvas
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

   this.mCamera.setupViewProjection();

   this.mTileMap.draw(this.mCamera);
};

BomberMan.prototype.update = function () {
   this.mTileMap.update();
   this.handleInput();
};

BomberMan.prototype.handleInput = function () {
    
};


