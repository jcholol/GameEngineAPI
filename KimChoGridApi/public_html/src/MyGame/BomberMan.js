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
   this.mGrid = null;
   
   this.mHero = null;
   
   // TileMap File
   this.kJSON = "assets/data.json";
   
   // Sprite File Container
    this.kSprites = [];
}
gEngine.Core.inheritPrototype(BomberMan, Scene);

BomberMan.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kJSON);
    
    for (var i = 0; i <= 89; i++) {
        var kName = "assets/bomberman/backyard_" + i + ".png";
        this.kSprites[i] = kName;
    }
    
    for (var i = 0; i < this.kSprites.length; i++) {
        gEngine.Textures.loadTexture(this.kSprites[i]);
    }
};

BomberMan.prototype.unloadScene = function () {
    gEngine.TextFileLoader.unloadTextFile(this.kJSON);
    
    for (var i = 0; i < this.kSprites.length; i++) {
        gEngine.Textures.unloadTexture(this.kSprites[i]);
    }
};

BomberMan.prototype.initialize = function () {
   // Step A: set up the cameras
   this.mCamera = new Camera(
      vec2.fromValues(0, 0), // position of the camera
      10, // width of camera
      [0, 0, 600, 600]           // viewport (orgX, orgY, width, height)
   );
   this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

   this.mTileMap = new TileMap(10, 10, 1, 1);
   
   this.initializeHero();
   this.initializeMap();
};

BomberMan.prototype.initializeHero = function () {
    var tempRenderable = new Renderable();
    tempRenderable.setColor([1, 0, 0, 1]);
    tempRenderable.getXform().setSize(0.75, 0.75);
    this.mHero = new BomberHero(tempRenderable);
};

BomberMan.prototype.initializeMap = function () {
    this.mTileMap.initializeFromJSON(gEngine.ResourceMap.retrieveAsset(this.kJSON));
};

BomberMan.prototype.draw = function () {
   // Step A: clear the canvas
   gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

   this.mCamera.setupViewProjection();

   this.mTileMap.draw(this.mCamera);
   
   this.mHero.draw(this.mCamera);
};

BomberMan.prototype.update = function () {
   this.mTileMap.update();
   this.handleInput();
};

BomberMan.prototype.handleInput = function () {
    var speed = 0.05;
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if (this.mHero.getXform().getXPos() - speed > -5) {
            this.mHero.getXform().incXPosBy(-speed);
        }
    } else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (this.mHero.getXform().getXPos() + speed < 5) {
            this.mHero.getXform().incXPosBy(speed);
        }
    } else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (this.mHero.getXform().getYPos() - speed > -5) {
            this.mHero.getXform().incYPosBy(-speed);
        }
    } else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if (this.mHero.getXform().getYPos() + speed < 5) {
            this.mHero.getXform().incYPosBy(speed);
        }
    }
};


