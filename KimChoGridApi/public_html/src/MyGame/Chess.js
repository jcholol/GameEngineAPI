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
    this.mGrid = null;

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
    this.initializeMap();

    this.mGrid = new Grid(8, 8, 1, 1);
    this.mGrid.setDrawLines(true);
    this.mGrid.setGridLineThickness(0.05);
    this.initailizePieces();
};

Chess.prototype.initializeMap = function () {
    for (var i = 0; i < this.mTileMap.getGridHeight(); i++)
    {
        for (var j = 0; j < this.mTileMap.getGridLength(); j++)
        {
            if (((i + j) % 2) === 0) {
                var burlywood = new Renderable();
                burlywood.setColor([222 / 255, 184 / 255, 135 / 255, 1]);
                this.mTileMap.setObjectAtIndex(i, j, burlywood);

            } else {
                var brown = new Renderable();
                brown.setColor([(139 / 255), (69 / 255), (19 / 255), 1]);
                this.mTileMap.setObjectAtIndex(i, j, brown);
            }
        }
    }
};

Chess.prototype.initailizePieces = function () {
    for (var i = 0; i < this.mGrid.getGridHeight(); i++)
    {
        for (var j = this.mGrid.getGridLength() - 2; j < this.mGrid.getGridLength(); j++)
        {
            var blackPawns = new Renderable();
            blackPawns.setColor([0, 0, 0, 1]);
            this.mGrid.setObjectAtIndex(i, j, blackPawns);
            this.mBlackPieces.push(blackPawns);
        }
    }

    for (var i = 0; i < this.mGrid.getGridHeight(); i++)
    {
        for (var j = 0; j < 2; j++)
        {
            var whitePawns = new Renderable();
            whitePawns.setColor([1, 1, 1, 1]);
            this.mGrid.setObjectAtIndex(i, j, whitePawns);
            this.mWhitePieces.push(whitePawns);
        }
    }
};

Chess.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mTileMap.draw(this.mCamera);
    this.drawPawns();

};

Chess.prototype.drawPawns = function () {
    this.mBlackPieces.forEach(blackPawn => {
        blackPawn.draw(this.mCamera);
    });
    
    this.mWhitePieces.forEach(whitePawns => {
        whitePawns.draw(this.mCamera);
    });

};


Chess.prototype.update = function () {
    this.mTileMap.update();
    this.mGrid.update();
    this.handleInput();
};

Chess.prototype.handleInput = function () {
};


