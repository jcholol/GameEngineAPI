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
    this.kBlackPawns = "assets/chess/black_pawn.png";
    this.kBlackBishop = "assets/chess/black_bishop.png";
    this.kBlackRook = "assets/chess/black_rook.png";
    this.kBlackKnight = "assets/chess/black_knight.png";
    this.kBlackKing = "assets/chess/black_king.png";
    this.kBlackQueen = "assets/chess/black_queen.png";

    this.kWhitePawns = "assets/chess/white_pawn.png";
    this.kWhiteBishop = "assets/chess/white_bishop.png";
    this.kWhiteRook = "assets/chess/white_rook.png";
    this.kWhiteKnight = "assets/chess/white_knight.png";
    this.kWhiteKing = "assets/chess/white_king.png";
    this.kWhiteQueen = "assets/chess/white_queen.png";

    this.mBlackPawns = null;
    this.mBlackBishop = null;
    this.mBlackRook = null;
    this.mBlackKnight = null;
    this.mBlackKing = null;
    this.mBlackQueen = null;

    this.mWhitePawns = null;
    this.mWhiteBishop = null;
    this.mWhiteRook = null;
    this.mWhiteKnight = null;
    this.mWhiteKing = null;
    this.mWhiteQueen = null;

    this.mCamera = null;
    this.mTileMap = null;
    this.mGrid = null;

    this.mHoldRenderableState = null;
    this.mIsClicked = false;

    this.mTopBlackPieces = [];
    this.mTopWhitePieces = [];
    this.mBottomBlackPieces = [];
    this.mBottomWhitePieces = [];
}
gEngine.Core.inheritPrototype(Chess, Scene);

Chess.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBlackPawns);
    gEngine.Textures.loadTexture(this.kBlackBishop);
    gEngine.Textures.loadTexture(this.kBlackRook);
    gEngine.Textures.loadTexture(this.kBlackKnight);
    gEngine.Textures.loadTexture(this.kBlackKing);
    gEngine.Textures.loadTexture(this.kBlackQueen);

    gEngine.Textures.loadTexture(this.kWhitePawns);
    gEngine.Textures.loadTexture(this.kWhiteBishop);
    gEngine.Textures.loadTexture(this.kWhiteRook);
    gEngine.Textures.loadTexture(this.kWhiteKnight);
    gEngine.Textures.loadTexture(this.kWhiteKing);
    gEngine.Textures.loadTexture(this.kWhiteQueen);

};

Chess.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBlackPawns);
    gEngine.Textures.unloadTexture(this.kBlackBishop);
    gEngine.Textures.unloadTexture(this.kBlackRook);
    gEngine.Textures.unloadTexture(this.kBlackKnight);
    gEngine.Textures.unloadTexture(this.kBlackKing);
    gEngine.Textures.unloadTexture(this.kBlackQueen);

    gEngine.Textures.unloadTexture(this.kWhitePawns);
    gEngine.Textures.unloadTexture(this.kWhiteBishop);
    gEngine.Textures.unloadTexture(this.kWhiteRook);
    gEngine.Textures.unloadTexture(this.kWhiteKnight);
    gEngine.Textures.unloadTexture(this.kWhiteKing);
    gEngine.Textures.unloadTexture(this.kWhiteQueen);
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
    //initializing black pieces
    for (var i = 0; i < this.mGrid.getGridHeight(); i++)
    {
        for (var j = this.mGrid.getGridLength() - 2; j < this.mGrid.getGridLength() - 1; j++)
        {
            var tempPawn = new TextureRenderable(this.kBlackPawns);
            this.mBlackPawns = new ChessPiece(tempPawn);
            this.mGrid.setObjectAtIndex(i, j, this.mBlackPawns);
            this.mBottomBlackPieces.push(this.mBlackPawns);
        }
    }

    var blackLeftRook = new TextureRenderable(this.kBlackRook);
    var blackRightRook = new TextureRenderable(this.kBlackRook);
    var blackKing = new TextureRenderable(this.kBlackKing);
    var blackLeftKnight = new TextureRenderable(this.kBlackKnight);
    var blackRightKnight = new TextureRenderable(this.kBlackKnight);
    var blackLeftBishop = new TextureRenderable(this.kBlackBishop);
    var blackRightBishop = new TextureRenderable(this.kBlackBishop);
    var blackQueen = new TextureRenderable(this.kBlackQueen);

    this.mGrid.setObjectAtIndex(0, 7, blackLeftRook);
    this.mTopBlackPieces.push(blackLeftRook);
    this.mGrid.setObjectAtIndex(1, 7, blackLeftKnight);
    this.mTopBlackPieces.push(blackLeftKnight);
    this.mGrid.setObjectAtIndex(2, 7, blackLeftBishop);
    this.mTopBlackPieces.push(blackLeftBishop);
    this.mGrid.setObjectAtIndex(3, 7, blackKing);
    this.mTopBlackPieces.push(blackKing);
    this.mGrid.setObjectAtIndex(4, 7, blackQueen);
    this.mTopBlackPieces.push(blackQueen);
    this.mGrid.setObjectAtIndex(5, 7, blackRightBishop);
    this.mTopBlackPieces.push(blackRightBishop);
    this.mGrid.setObjectAtIndex(6, 7, blackRightKnight);
    this.mTopBlackPieces.push(blackRightKnight);
    this.mGrid.setObjectAtIndex(7, 7, blackRightRook);
    this.mTopBlackPieces.push(blackRightRook);

    //initializing white pieces
    for (var i = 0; i < this.mGrid.getGridHeight(); i++)
    {
        for (var j = 1; j < 2; j++)
        {
            var whitePawns = new TextureRenderable(this.kWhitePawns);
            this.mGrid.setObjectAtIndex(i, j, whitePawns);
            this.mTopWhitePieces.push(whitePawns);
        }
    }

    var whiteLeftRook = new TextureRenderable(this.kWhiteRook);
    var whiteRightRook = new TextureRenderable(this.kWhiteRook);
    var whiteKing = new TextureRenderable(this.kWhiteKing);
    var whiteLeftKnight = new TextureRenderable(this.kWhiteKnight);
    var whiteRightKnight = new TextureRenderable(this.kWhiteKnight);
    var whiteLeftBishop = new TextureRenderable(this.kWhiteBishop);
    var whiteRightBishop = new TextureRenderable(this.kWhiteBishop);
    var whiteQueen = new TextureRenderable(this.kWhiteQueen);

    this.mGrid.setObjectAtIndex(0, 0, whiteLeftRook);
    this.mBottomWhitePieces.push(whiteLeftRook);
    this.mGrid.setObjectAtIndex(1, 0, whiteLeftKnight);
    this.mBottomWhitePieces.push(whiteLeftKnight);
    this.mGrid.setObjectAtIndex(2, 0, whiteLeftBishop);
    this.mBottomWhitePieces.push(whiteLeftBishop);
    this.mGrid.setObjectAtIndex(3, 0, whiteKing);
    this.mBottomWhitePieces.push(whiteKing);
    this.mGrid.setObjectAtIndex(4, 0, whiteQueen);
    this.mBottomWhitePieces.push(whiteQueen);
    this.mGrid.setObjectAtIndex(5, 0, whiteRightBishop);
    this.mBottomWhitePieces.push(whiteRightBishop);
    this.mGrid.setObjectAtIndex(6, 0, whiteRightKnight);
    this.mBottomWhitePieces.push(whiteRightKnight);
    this.mGrid.setObjectAtIndex(7, 0, whiteRightRook);
    this.mBottomWhitePieces.push(whiteRightRook);
};



Chess.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mTileMap.draw(this.mCamera);
    this.drawPieces();

};

Chess.prototype.drawPieces = function () {
    this.mTopBlackPieces.forEach(blackPawn => {
        blackPawn.draw(this.mCamera);
    });
    this.mBottomBlackPieces.forEach(blackPiece => {
        blackPiece.draw(this.mCamera);
    });

    this.mTopWhitePieces.forEach(whitePawns => {
        whitePawns.draw(this.mCamera);
    });
    this.mBottomWhitePieces.forEach(whitePiece => {
        whitePiece.draw(this.mCamera);
    });
};

Chess.prototype.update = function () {
    this.mTileMap.update();
    this.mGrid.update();
    this.handleInput();
};

Chess.prototype.handleInput = function () {
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        if (this.mIsClicked)
        {
            var wc = vec2.fromValues(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
            var newPosition = this.mGrid._getIndexFromWC(wc);
            this.mGrid.setObjectAtIndex(newPosition[0], newPosition[1], this.mTopBlackPieces[newPosition[0]]);
            this.mIsClicked = false;
        } else {
            var wc = vec2.fromValues(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
            var position = this.mGrid._getIndexFromWC(wc);
            //console.log("pos: " + position);
            if (position === null || position === undefined) {
                return;
            }
            var temp3 = this.mBottomBlackPieces[position[0]].getXform().getPosition();
            this.setRenderableState(temp3);
            //console.log(temp3);
            this.mIsClicked = true;
        }

    }
};

Chess.prototype.setRenderableState = function (state) {
    this.mHoldRenderableState = vec2.fromValues(state[0], state[1]);
};

Chess.prototype.getRenderableState = function () {
    return this.mHoldRenderableState;
};