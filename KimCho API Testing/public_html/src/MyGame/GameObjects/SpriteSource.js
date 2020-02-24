/*
 * File: SpriteSource.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function SpriteSource(myTexture, width) {
    TextureRenderable.call(this, myTexture);
    
    // Sprite Source Corner Squares
    this.mSquareTopLeft = null;
    this.mSquareTopRight = null;
    this.mSquareBottomLeft = null;
    this.mSquareBottomRight = null;
    
    // Sprite Source Border Lines
    this.mTopLine = null;
    this.mBottomLine = null;
    this.mLeftLine = null;
    this.mRightLine = null;
    
    this.initialize(width);
};
gEngine.Core.inheritPrototype(SpriteSource, TextureRenderable);

SpriteSource.prototype.initialize = function (width) {
    this.setScaledSize(width);
    this.initializeCornerSquares();
    this.initializeLines();
};

SpriteSource.prototype.initializeCornerSquares = function () {
    var topLeftPosition = this.getTopLeftPosition();
    var bottomLeftPosition = this.getBottomLeftPosition();
    var topRightPosition = this.getTopRightPosition();
    var bottomRightPosition = this.getBottomRightPosition();
    
    //Top Left Square
    this.mSquareTopLeft = new Renderable();
    this.mSquareTopLeft.setColor([0, 0.5, 1, 1]);
    this.mSquareTopLeft.getXform().setSize(4, 4);
    this.mSquareTopLeft.getXform().setPosition(topLeftPosition[0], topLeftPosition[1]);
    
    //Bottom Left Square
    this.mSquareBottomLeft = new Renderable();
    this.mSquareBottomLeft.setColor([0, 0.5, 0, 1]);
    this.mSquareBottomLeft.getXform().setSize(4, 4);
    this.mSquareBottomLeft.getXform().setPosition(bottomLeftPosition[0], bottomLeftPosition[1]);
    
    //Top Right Square
    this.mSquareTopRight = new Renderable();
    this.mSquareTopRight.setColor([1, 0, 0.5, 1]);
    this.mSquareTopRight.getXform().setSize(4, 4);
    this.mSquareTopRight.getXform().setPosition(topRightPosition[0], topRightPosition[1]);
    
    //Bottom Right Square
    this.mSquareBottomRight = new Renderable();
    this.mSquareBottomRight.setColor([1, 0.5, 0, 1]);
    this.mSquareBottomRight.getXform().setSize(4, 4);
    this.mSquareBottomRight.getXform().setPosition(bottomRightPosition[0], bottomRightPosition[1]);
};

SpriteSource.prototype.initializeLines = function () {
    var middleTop = this.getTopMiddlePosition();
    var middleBottom = this.getBottomMiddlePosition();
    var middleLeft = this.getLeftMiddlePosition();
    var middleRight = this.getRightMiddlePosition();
    
    //Top Line
    this.mTopLine = new Renderable();
    this.mTopLine.setColor([0.5, 0.5, 0.5, 1]);
    this.mTopLine.getXform().setSize(this.getDistanceApart(this.mSquareTopLeft, this.mSquareTopRight), 0.2);
    this.mTopLine.getXform().setPosition(middleTop[0], middleTop[1]);
    
    //Bottom Line
    this.mBottomLine = new Renderable();
    this.mBottomLine.setColor([0.5, 0.5, 0.5, 1]);
    this.mBottomLine.getXform().setSize(this.getDistanceApart(this.mSquareTopLeft, this.mSquareTopRight), 0.2);
    this.mBottomLine.getXform().setPosition(middleBottom[0], middleBottom[1]);
    
    //Left Line
    this.mLeftLine = new Renderable();
    this.mLeftLine.setColor([0.5, 0.5, 0.5, 1]);
    this.mLeftLine.getXform().setSize(0.2, this.getDistanceApart(this.mSquareTopLeft, this.mSquareBottomLeft));
    this.mLeftLine.getXform().setPosition(middleLeft[0], middleLeft[1]);
    
    //Right Line
    this.mRightLine = new Renderable();
    this.mRightLine.setColor([0.5, 0.5, 0.5, 1]);
    this.mRightLine.getXform().setSize(0.2, this.getDistanceApart(this.mSquareTopLeft, this.mSquareBottomLeft));
    this.mRightLine.getXform().setPosition(middleRight[0], middleRight[1]);
};

SpriteSource.prototype.getDistanceApart = function (squareOne, squareTwo) {
    var sq1x = squareOne.getXform().getPosition()[0];
    var sq1y = squareOne.getXform().getPosition()[1];
    var sq2x = squareTwo.getXform().getPosition()[0];
    var sq2y = squareTwo.getXform().getPosition()[1];
    
    var width = Math.sqrt(((sq2x - sq1x) * (sq2x - sq1x)) + ((sq2y - sq1y) * (sq2y - sq1y)));
    
    return width;
};

SpriteSource.prototype.getTopMiddlePosition = function () {
   var xform = this.getXform();
   var position = [];

   position.push(xform.getPosition()[0]);
   position.push(xform.getPosition()[1] + (xform.getHeight() / 2));

   return position;
};

SpriteSource.prototype.getBottomMiddlePosition = function () {
   var xform = this.getXform();
   var position = [];

   position.push(xform.getPosition()[0]);
   position.push(xform.getPosition()[1] - (xform.getHeight() / 2));

   return position;
};

SpriteSource.prototype.getLeftMiddlePosition = function () {
   var xform = this.getXform();
   var position = [];

   position.push(xform.getPosition()[0] - (xform.getWidth() / 2));
   position.push(xform.getPosition()[1]);

   return position;
};

SpriteSource.prototype.getRightMiddlePosition = function () {
   var xform = this.getXform();
   var position = [];

   position.push(xform.getPosition()[0] + (xform.getWidth() / 2));
   position.push(xform.getPosition()[1]);

   return position;
};

SpriteSource.prototype.getTopLeftPosition = function () {
   var xform = this.getXform();
   var position = [];

   position.push(xform.getPosition()[0] - (xform.getWidth() / 2));
   position.push(xform.getPosition()[1] + (xform.getHeight() / 2));

   return position;
};

SpriteSource.prototype.getBottomLeftPosition = function () {
   var xform = this.getXform();
   var position = [];

   position.push(xform.getPosition()[0] - (xform.getWidth() / 2));
   position.push(xform.getPosition()[1] - (xform.getHeight() / 2));

   return position;
};

SpriteSource.prototype.getTopRightPosition = function () {
   var xform = this.getXform();
   var position = [];

   position.push(xform.getPosition()[0] + (xform.getWidth() / 2));
   position.push(xform.getPosition()[1] + (xform.getHeight() / 2));

   return position;
};

SpriteSource.prototype.getBottomRightPosition = function () {
   var xform = this.getXform();
   var position = [];

   position.push(xform.getPosition()[0] + (xform.getWidth() / 2));
   position.push(xform.getPosition()[1] - (xform.getHeight() / 2));

   return position;
};

SpriteSource.prototype.draw = function (vpMatrix) {
    TextureRenderable.prototype.draw.call(this, vpMatrix);
    
    this.mTopLine.draw(vpMatrix);
    this.mBottomLine.draw(vpMatrix);
    this.mLeftLine.draw(vpMatrix);
    this.mRightLine.draw(vpMatrix);
    
    this.mSquareTopLeft.draw(vpMatrix);
    this.mSquareBottomLeft.draw(vpMatrix);
    this.mSquareTopRight.draw(vpMatrix);
    this.mSquareBottomRight.draw(vpMatrix);
};

SpriteSource.prototype.update = function () {
};

SpriteSource.prototype.setScaledSize = function (width) {
    var xform = this.getXform();
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
    var hRatio = texInfo.mHeight / texInfo.mWidth;
    
    xform.setSize(width, width * hRatio);
};

/*
SpriteSource.prototype.adjustScale = function () {
    var xform = this.getXform();
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
    var hRatio = texInfo.mHeight / texInfo.mWidth;
    
    xform.setSize(xform.getWidth(), xform.getHeight() * hRatio);
};
 */