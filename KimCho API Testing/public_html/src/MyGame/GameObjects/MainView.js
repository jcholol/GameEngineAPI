/*
 * File: MainView.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
 TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
 FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainView() {
    // textures: 
    this.kFontImage = "assets/Consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kBound = "assets/Bound.png";

    // the fonts
    this.kFontCon16 = "assets/fonts/Consolas-16";  // notice font names do not need extensions!
    this.kFontCon24 = "assets/fonts/Consolas-24";
    this.kFontCon32 = "assets/fonts/Consolas-32";  // this is also the default system font
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.kFontSeg96 = "assets/fonts/Segment7-96";

    // The camera to view the scene
    this.mCamera = null;
    this.mGrid = null;
}
gEngine.Core.inheritPrototype(MainView, Scene);

MainView.prototype.loadScene = function () {
    // Step A: loads the textures    
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBound);

    // Step B: loads all the fonts
    gEngine.Fonts.loadFont(this.kFontCon16);
    gEngine.Fonts.loadFont(this.kFontCon24);
    gEngine.Fonts.loadFont(this.kFontCon32);
    gEngine.Fonts.loadFont(this.kFontCon72);
    gEngine.Fonts.loadFont(this.kFontSeg96);
};

MainView.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBound);

    // unload the fonts
    gEngine.Fonts.unloadFont(this.kFontCon16);
    gEngine.Fonts.unloadFont(this.kFontCon24);
    gEngine.Fonts.unloadFont(this.kFontCon32);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.Fonts.unloadFont(this.kFontSeg96);

    // Step B: starts the next level
    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MainView.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            10, // width of camera
            [0, 0, 500, 400]           // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mGrid = new Grid(5, 5, 1, 1);
    this.mGrid.getXform().setPosition(0, 0);
    this.mGrid.setGridLineThickness(0.05);
    
    this.mGrid.getXform().setPosition(0, 0);
};

MainView.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MainView.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    
    this.mGrid.draw(this.mCamera.getVPMatrix());
};

// The 
//  function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MainView.prototype.update = function () {
    this.handleInput();
    this.mGrid.update();
    this.mGrid.setDrawLines(true);
    console.log(this.mGrid.cellToWorld(vec2.fromValues(0, 0)));
};

MainView.prototype.handleInput = function () {
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
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.mGrid.getXform().incXPosBy(-xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.mGrid.getXform().incXPosBy(xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        this.mGrid.getXform().incYPosBy(-xDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        this.mGrid.getXform().incYPosBy(xDelta);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() - (xDelta) * 10);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() + (xDelta) * 10);
    }
};

