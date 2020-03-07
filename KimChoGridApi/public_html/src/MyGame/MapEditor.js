/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapEditor() {
    gEngine.Core.initializeEngineCore('GLCanvas', this);
    
    this.mInputGridWidth = null;
    this.mInputGridHeight = null;
    
    this.mCamera = null;
    this.mGrid = null;
    this.mTileMap = null;

    this.mMoveCameraOrigin = [0, 0];
}
gEngine.Core.inheritPrototype(MapEditor, Scene);

MapEditor.prototype.loadScene = function () {
};

MapEditor.prototype.unloadScene = function () {
};

MapEditor.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            10, // width of camera
            [0, 0, 600, 600]           // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mInputGridWidth = document.getElementById('GridWidth');
    this.mInputGridHeight = document.getElementById('GridHeight');

    this.mTileMap = new TileMap(10, 10, 1, 1);
    this.mTileMap.getXform().setPosition(0, 0);
    this.mTileMap.setGridLineThickness(0.05);
};

MapEditor.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mTileMap.draw(this.mCamera);
};

MapEditor.prototype.update = function () {
    this.handleInput();
    this.mTileMap.update();
    this.mTileMap.setDrawLines(true);
    this.mCamera.update();
    
    this.mTileMap.resize(this.mInputGridWidth.value, this.mInputGridHeight.value, 1, 1);
};

MapEditor.prototype.handleInput = function () {
    var xDelta = 0.05;

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mTileMap.setCellWidth(this.mTileMap.getCellWidth() - xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mTileMap.setCellWidth(this.mTileMap.getCellWidth() + xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mTileMap.setCellHeight(this.mTileMap.getCellHeight() - xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.mTileMap.setCellHeight(this.mTileMap.getCellHeight() + xDelta);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() - (xDelta) * 10);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() + (xDelta) * 10);
    }

    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
        if (!this.mTileMap.tileHasRenderable(this.mCamera.mouseWCX(), this.mCamera.mouseWCY())) {
            var temp = new Renderable();
            this.mTileMap.setObjectAt(this.mCamera.mouseWCX(), this.mCamera.mouseWCY(), temp);
        }
    }

    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Right)) {
        this.mMoveCameraOrigin = [this.mCamera.mouseWCX(), this.mCamera.mouseWCY()];
    }

    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Right)) {
        var x = this.mCamera.getWCCenter()[0] + (this.mMoveCameraOrigin[0] - this.mCamera.mouseWCX()) * 10;
        var y = this.mCamera.getWCCenter()[1] + (this.mMoveCameraOrigin[1] - this.mCamera.mouseWCY()) * 10;
        
        this.mCamera.setWCCenter(x, y);
        //this.mMoveCameraOrigin[0] = this.mCamera.mouseWCX();
        //this.mMoveCameraOrigin[1] = this.mCamera.mouseWCY();
    }
    
    if (gEngine.Input.isScrolled()) {
        var deltaY = gEngine.Input.getScrollAmount() / 10;
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() + deltaY);
    }
};