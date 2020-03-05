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

function MyGame() {
    // The camera to view the scene
    this.mCamera = null;
    this.mGrid = null;
    
    this.mMoveCameraOrigin = [0, 0];
    
    this.mRenderables = [];
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
};

MyGame.prototype.unloadScene = function () {
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            10, // width of camera
            [0, 0, 600, 600]           // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mGrid = new Grid(10, 10, 1, 1);
    this.mGrid.getXform().setPosition(0, 0);
    this.mGrid.setGridLineThickness(0.05);
};

MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mGrid.draw(this.mCamera);
    
    this.mRenderables.forEach(item => {
       item.draw(this.mCamera); 
    });
};

MyGame.prototype.update = function () {
    this.handleInput();
    this.mGrid.update();
    this.mGrid.setDrawLines(true);
    //console.log(this.mGrid.cellToWorld(vec2.fromValues(0, 0)));
};

MyGame.prototype.handleInput = function () {
    var xDelta = 0.05;
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mGrid.setCellWidth(this.mGrid.getCellWidth() - xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mGrid.setCellWidth(this.mGrid.getCellWidth() + xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mGrid.setCellHeight(this.mGrid.getCellHeight() - xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.mGrid.setCellHeight(this.mGrid.getCellHeight() + xDelta);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() - (xDelta) * 10);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() + (xDelta) * 10);
    }
    
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        var temp = new Renderable();
        this.mGrid.setObjectAt(this.mCamera.mouseWCX(), this.mCamera.mouseWCY(), temp);
        this.mRenderables.push(temp);
    }
    
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Right)) {
        this.mMoveCameraOrigin = [this.mCamera.mouseWCX(), this.mCamera.mouseWCY()];
    }
    
    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Right)) {
        var x = this.mCamera.getWCCenter()[0] + (this.mMoveCameraOrigin[0] - this.mCamera.mouseWCX()) * 10;
        var y = this.mCamera.getWCCenter()[1] + (this.mMoveCameraOrigin[1] - this.mCamera.mouseWCY()) * 10;
        
        this.mCamera.setWCCenter(x, y);
        this.mCamera.update();
        
        this.mMoveCameraOrigin[0] = this.mCamera.mouseWCX();
        this.mMoveCameraOrigin[1] = this.mCamera.mouseWCY();
    }
};