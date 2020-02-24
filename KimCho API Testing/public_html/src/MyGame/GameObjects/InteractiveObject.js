/*
 * File: InteractiveObject.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
 TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
 FontRenderable: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function InteractiveObject(myTexture) {
    TextureRenderable.call(this, myTexture);

    this.mLeftSquare = null;
    this.mRightSquare = null;
    this.mTopSquare = null;
    this.mBottomSquare = null;

    this.mAnimateRenderable = null;
    this.mSpriteSource = null;

    this.mBoundArray = [];
    this.mNumElems = 0;
    this.mBoolean = false;

    this.initialize();
}
gEngine.Core.inheritPrototype(InteractiveObject, TextureRenderable);

InteractiveObject.prototype.initialize = function () {
    this.initializeSquares();
};

InteractiveObject.prototype.setAnimateRenderable = function (animateRenderable) {
    if (animateRenderable !== null && animateRenderable !== undefined) {
        this.mAnimateRenderable = animateRenderable;
    }

    this.mBoundArray = [];
    var positionX = this.getXform().getPosition()[0] - (this.getXform().getWidth() / 2);
    var oof = positionX - this.mSpriteSource.getLeftMiddlePosition()[0];
    
    this.mNumElems = Math.floor((this.mSpriteSource.getXform().getWidth() - oof) / this.getXform().getWidth());
    this.mAnimateRenderable.setElmCount(this.mNumElems);

    for (var i = 0; i < this.mAnimateRenderable.getElmCount(); i++) {
        this.mBoundArray.push(new TextureRenderable(this.getTexture()));
    }
};

InteractiveObject.prototype.setSpriteSource = function (spriteSource) {
    this.mSpriteSource = spriteSource;
};

InteractiveObject.prototype.draw = function (vpMatrix) {
    TextureRenderable.prototype.draw.call(this, vpMatrix);

    this.mTopSquare.draw(vpMatrix);
    this.mBottomSquare.draw(vpMatrix);
    this.mLeftSquare.draw(vpMatrix);
    this.mRightSquare.draw(vpMatrix);

    if (this.mBoolean) {
        for (var i = 0; i < this.mBoundArray.length; i++) {
            TextureRenderable.prototype.draw.call(this.mBoundArray[i], vpMatrix);
        }
    }
};

InteractiveObject.prototype.update = function () {
    this.updateSquares();

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        if (this.mBoolean === false) {
            this.mBoolean = true;
        } else {
            this.mBoolean = false;
        }
    }

    var firstElmPosition = this.getXform().getPosition();

    if (this.mBoolean) {
        this.setAnimateRenderable();
        
        for (var i = 1; i <= this.mBoundArray.length; i++) {
            var posX = firstElmPosition[0] + i * (this.getXform().getWidth());
            var arr = this.mSpriteSource.getRightMiddlePosition();
            if (posX < arr[0] - (this.getXform().getWidth() / 2)) {
                this.mBoundArray[i - 1].getXform().setPosition(posX, firstElmPosition[1]);
                this.mBoundArray[i - 1].getXform().setSize(this.getXform().getWidth(), this.getXform().getHeight());
            }
        }
    } else {
        this.mAnimateRenderable.setElmCount(0);
    }
};

InteractiveObject.prototype.initializeSquares = function () {
    var middleTop = this.getTopMiddlePosition();
    var middleBottom = this.getBottomMiddlePosition();
    var middleLeft = this.getLeftMiddlePosition();
    var middleRight = this.getRightMiddlePosition();

    //Top Square
    this.mTopSquare = new Renderable();
    this.mTopSquare.setColor([0, 0.5, 1, 1]);
    this.mTopSquare.getXform().setSize(2, 2);
    this.mTopSquare.getXform().setPosition(middleTop[0], middleTop[1]);

    //Bottom Square
    this.mBottomSquare = new Renderable();
    this.mBottomSquare.setColor([0, 0.5, 0, 1]);
    this.mBottomSquare.getXform().setSize(2, 2);
    this.mBottomSquare.getXform().setPosition(middleBottom[0], middleBottom[1]);

    //Left Square
    this.mLeftSquare = new Renderable();
    this.mLeftSquare.setColor([1, 0, 0.5, 1]);
    this.mLeftSquare.getXform().setSize(2, 2);
    this.mLeftSquare.getXform().setPosition(middleLeft[0], middleLeft[1]);

    //Right Square
    this.mRightSquare = new Renderable();
    this.mRightSquare.setColor([1, 0.5, 0, 1]);
    this.mRightSquare.getXform().setSize(2, 2);
    this.mRightSquare.getXform().setPosition(middleRight[0], middleRight[1]);
};

InteractiveObject.prototype.updateSquares = function () {
    var middleTop = this.getTopMiddlePosition();
    var middleBottom = this.getBottomMiddlePosition();
    var middleLeft = this.getLeftMiddlePosition();
    var middleRight = this.getRightMiddlePosition();

    this.mTopSquare.getXform().setPosition(middleTop[0], middleTop[1]);
    this.mBottomSquare.getXform().setPosition(middleBottom[0], middleBottom[1]);
    this.mLeftSquare.getXform().setPosition(middleLeft[0], middleLeft[1]);
    this.mRightSquare.getXform().setPosition(middleRight[0], middleRight[1]);
};

InteractiveObject.prototype.getTopMiddlePosition = function () {
    var xform = this.getXform();
    var position = [];

    position.push(xform.getPosition()[0]);
    position.push(xform.getPosition()[1] + (xform.getHeight() / 2));

    return position;
};

InteractiveObject.prototype.getBottomMiddlePosition = function () {
    var xform = this.getXform();
    var position = [];

    position.push(xform.getPosition()[0]);
    position.push(xform.getPosition()[1] - (xform.getHeight() / 2));

    return position;
};

InteractiveObject.prototype.getLeftMiddlePosition = function () {
    var xform = this.getXform();
    var position = [];

    position.push(xform.getPosition()[0] - (xform.getWidth() / 2));
    position.push(xform.getPosition()[1]);

    return position;
};

InteractiveObject.prototype.getRightMiddlePosition = function () {
    var xform = this.getXform();
    var position = [];

    position.push(xform.getPosition()[0] + (xform.getWidth() / 2));
    position.push(xform.getPosition()[1]);

    return position;
};

