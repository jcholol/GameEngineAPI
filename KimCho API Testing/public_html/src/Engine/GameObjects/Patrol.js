/* File: Patrol.js 
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox, gEngine: false, GameObject, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Patrol() {
    this.kSpriteSheet = "assets/SpriteSheet.png";
    this.mLeader = null;
    this.mTopWing = null;
    this.mBottomWing = null;

    this.mInterpolateTopWing = null;
    this.mInterpolateBottomWing = null;

    this.BBox = null;
    this.mLeaderBox = null;
    this.mTopWingBox = null;
    this.mBottomWingBox = null;

    // Booleans
    this.mTerminate = false;
    this.mDrawBox = false;

    //Bounding box visual
    this.topBound = null;
    this.leftBound = null;
    this.rightBound = null;
    this.bottomBound = null;

    this.leaderTopBound = null;
    this.leaderLeftBound = null;
    this.leaderRightBound = null;
    this.leaderBottomBound = null;

    this.topWingTopBound = null;
    this.topWingLeftBound = null;
    this.topWingRightBound = null;
    this.topWingBottomBound = null;

    this.bottomWingTopBound = null;
    this.bottomWingLeftBound = null;
    this.bottomWingRightBound = null;
    this.bottomWingBottomBound = null;

    this.centerBoxPos = [];

    GameObject.call(this, new SpriteRenderable(this.kSpriteSheet));

    this.initialize();
}
gEngine.Core.inheritPrototype(Patrol, GameObject);

Patrol.prototype.initialize = function () {
    this.mLeader = new GameObject(new SpriteRenderable(this.kSpriteSheet));
    this.mTopWing = new GameObject(new SpriteAnimateRenderable(this.kSpriteSheet));
    this.mBottomWing = new GameObject(new SpriteAnimateRenderable(this.kSpriteSheet));

    this.mLeader.getRenderable().setColor([1, 1, 1, 0]);
    this.mLeader.getRenderable().getXform().setSize(7.5, 7.5);
    this.mLeader.getRenderable().setElementPixelPositions(130, 310, 0, 180);

    this.mTopWing.getRenderable().setColor([1, 1, 1, 0]);
    this.mTopWing.getRenderable().getXform().setSize(10, 8);
    this.mTopWing.getRenderable().setSpriteSequence(512, 0, 204, 164, 5, 0);
    this.mTopWing.getRenderable().setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mTopWing.getRenderable().setAnimationSpeed(20);
    this.mInterpolateTopWing = new InterpolateVec2(this.mTopWing.getRenderable().getXform().getPosition(), 120, 0.05);

    this.mBottomWing.getRenderable().setColor([1, 1, 1, 0]);
    this.mBottomWing.getRenderable().getXform().setSize(10, 8);
    this.mBottomWing.getRenderable().setSpriteSequence(512, 0, 204, 164, 5, 0);
    this.mBottomWing.getRenderable().setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mBottomWing.getRenderable().setAnimationSpeed(20);
    this.mInterpolateBottomWing = new InterpolateVec2(this.mBottomWing.getRenderable().getXform().getPosition(), 120, 0.05);

    this.BBox = this.getBBox();
    this.mLeaderBox = this.mLeader.getBBox();
    this.mTopWingBox = this.mTopWing.getBBox();
    this.mBottomWingBox = this.mBottomWing.getBBox();

    this.topBound = new Renderable();
    this.leftBound = new Renderable();
    this.rightBound = new Renderable();
    this.bottomBound = new Renderable();

    this.leaderTopBound = new Renderable();
    this.leaderLeftBound = new Renderable();
    this.leaderRightBound = new Renderable();
    this.leaderBottomBound = new Renderable();

    this.topWingTopBound = new Renderable();
    this.topWingLeftBound = new Renderable();
    this.topWingRightBound = new Renderable();
    this.topWingBottomBound = new Renderable();

    this.bottomWingTopBound = new Renderable();
    this.bottomWingLeftBound = new Renderable();
    this.bottomWingRightBound = new Renderable();
    this.bottomWingBottomBound = new Renderable();

};

Patrol.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.updateAnimation();
    this.followLeader();
    this.mLeader.getXform().setPosition(this.getXform().getXPos(), this.getXform().getYPos());
    this._handleBoundary();
    this._handleInput();
    this.updateBounds();
    
    this.updateBBox();
};

Patrol.prototype.draw = function (mCamera) {
    //GameObject.prototype.draw.call(this, mCamera);

    this.mLeader.draw(mCamera);
    this.mTopWing.draw(mCamera);
    this.mBottomWing.draw(mCamera);

    if (this.mDrawBox)
    {
        this.topBound.draw(mCamera);
        this.leftBound.draw(mCamera);
        this.rightBound.draw(mCamera);
        this.bottomBound.draw(mCamera);

        this.leaderTopBound.draw(mCamera);
        this.leaderLeftBound.draw(mCamera);
        this.leaderRightBound.draw(mCamera);
        this.leaderBottomBound.draw(mCamera);

        this.topWingTopBound.draw(mCamera);
        this.topWingLeftBound.draw(mCamera);
        this.topWingRightBound.draw(mCamera);
        this.topWingBottomBound.draw(mCamera);

        this.bottomWingTopBound.draw(mCamera);
        this.bottomWingLeftBound.draw(mCamera);
        this.bottomWingRightBound.draw(mCamera);
        this.bottomWingBottomBound.draw(mCamera);
    }

};

Patrol.prototype.updateAnimation = function () {
    this.mTopWing.getRenderable().updateAnimation();
    this.mBottomWing.getRenderable().updateAnimation();
};

Patrol.prototype.followLeader = function () {
    var xPos = this.mLeader.getRenderable().getXform().getXPos() + 10;
    var topWingYPos = this.mLeader.getRenderable().getXform().getYPos() + 6;
    var bottomWingYPos = this.mLeader.getRenderable().getXform().getYPos() - 6;

    this._lerpToPosition(this.mInterpolateTopWing, xPos, topWingYPos);
    this._lerpToPosition(this.mInterpolateBottomWing, xPos, bottomWingYPos);
};

Patrol.prototype._lerpToPosition = function (interpolate, x, y) {
    var temp = vec2.fromValues(x, y);
    interpolate.setFinalValue(temp);
    interpolate.updateInterpolation();
};

Patrol.prototype._handleInput = function () { 
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.mDrawBox = !this.mDrawBox;
    }
};

Patrol.prototype._handleBoundary = function () {
    if (this.BBox.minX() >= 100) {
        this.mTerminate = true;
    }

    if (this.BBox.minX() <= -100) {
        var reverse = [Math.abs(this.getCurrentFrontDir()[0]), this.getCurrentFrontDir()[1]];
        this.setCurrentFrontDir(reverse);
    }

    if (this.BBox.maxY() >= 75) {
        var reverse = [this.getCurrentFrontDir()[0], Math.abs(this.getCurrentFrontDir()[1]) * -1];
        this.setCurrentFrontDir(reverse);
    }

    if (this.BBox.minY() <= -75) {
        var reverse = [this.getCurrentFrontDir()[0], Math.abs(this.getCurrentFrontDir()[1])];
        this.setCurrentFrontDir(reverse);
    }
};

Patrol.prototype.getTerminateBoolean = function () {
    return this.mTerminate;
};

Patrol.prototype.setPosition = function (x, y) {
    this.getXform().setPosition(x, y);
    this.mLeader.getRenderable().getXform().setPosition(x, y);
    this.mTopWing.getRenderable().getXform().setPosition(x, y);
    this.mBottomWing.getRenderable().getXform().setPosition(x, y);
};

Patrol.prototype.updateBounds = function () {
    this.mLeaderBox.setBounds(this.mLeader.getXform().getPosition(),
            this.mLeader.getXform().getWidth(), this.mLeader.getXform().getHeight());

    this.mTopWingBox.setBounds(this.mTopWing.getXform().getPosition(),
            this.mTopWing.getXform().getWidth(), this.mTopWing.getXform().getHeight());

    this.mBottomWingBox.setBounds(this.mBottomWing.getXform().getPosition(),
            this.mBottomWing.getXform().getWidth(), this.mBottomWing.getXform().getHeight());

    var width = this.mBottomWingBox.maxX() - this.mLeaderBox.minX();
    var height = ((this.mTopWingBox.maxY() - this.mBottomWingBox.minY()) * 1.5);

    var lowerX = this.mLeaderBox.minX();
    var lowY = this.mBottomWingBox.maxY();

    var centerX = (width / 2) + lowerX;
    var centerY = (height / 4.3 + lowY);
    this.centerBoxPos = [centerX, centerY];

    this.BBox.setBounds(this.centerBoxPos, width, height);
};

Patrol.prototype.pushHead = function () {
    this.getXform().incXPosBy(5);
};

Patrol.prototype.changeTopWingAlpha = function () {
    this.mTopWing.getRenderable().incAlpha(0.2);
    if (this.mTopWing.getRenderable().getAlpha() >= 1){
        this.mTerminate = true;
    }
};

Patrol.prototype.changeBottomWingAlpha = function () {
    this.mBottomWing.getRenderable().incAlpha(0.2);
    if (this.mBottomWing.getRenderable().getAlpha() >= 1){
        this.mTerminate = true;
    }
};

Patrol.prototype.getLeaderBox = function () {
    return this.mLeaderBox;
};

Patrol.prototype.getEntireBBox = function (){
    return this.BBox;
};

Patrol.prototype.getTopBBox = function (){
    return this.mTopWingBox;
};

Patrol.prototype.getBottomBBox = function (){
    return this.mBottomWingBox;
};

// Should not be updating state in draw method
// Need to change
Patrol.prototype.updateBBox = function () {
    this.topBound.getXform().setSize(this.BBox.getWidth(), 0.5);
    this.leftBound.getXform().setSize(0.5, this.BBox.getHeight());
    this.rightBound.getXform().setSize(0.5, this.BBox.getHeight());
    this.bottomBound.getXform().setSize(this.BBox.getWidth(), 0.5);

    this.leaderTopBound.getXform().setSize(this.mLeaderBox.getWidth(), 0.5);
    this.leaderLeftBound.getXform().setSize(0.5, this.mLeaderBox.getHeight());
    this.leaderRightBound.getXform().setSize(0.5, this.mLeaderBox.getHeight());
    this.leaderBottomBound.getXform().setSize(this.mLeaderBox.getWidth(), 0.5);

    this.topWingTopBound.getXform().setSize(this.mTopWingBox.getWidth(), 0.5);
    this.topWingLeftBound.getXform().setSize(0.5, this.mTopWingBox.getHeight());
    this.topWingRightBound.getXform().setSize(0.5, this.mTopWingBox.getHeight());
    this.topWingBottomBound.getXform().setSize(this.mTopWingBox.getWidth(), 0.5);

    this.bottomWingTopBound.getXform().setSize(this.mBottomWingBox.getWidth(), 0.5);
    this.bottomWingLeftBound.getXform().setSize(0.5, this.mBottomWingBox.getHeight());
    this.bottomWingRightBound.getXform().setSize(0.5, this.mBottomWingBox.getHeight());
    this.bottomWingBottomBound.getXform().setSize(this.mBottomWingBox.getWidth(), 0.5);

    this.topBound.getXform().setPosition(this.centerBoxPos[0], this.BBox.maxY());
    this.leftBound.getXform().setPosition(this.BBox.minX(), this.centerBoxPos[1]);
    this.rightBound.getXform().setPosition(this.BBox.maxX(), this.centerBoxPos[1]);
    this.bottomBound.getXform().setPosition(this.centerBoxPos[0], this.BBox.minY());

    this.leaderTopBound.getXform().setPosition(this.mLeader.getXform().getXPos(), this.mLeaderBox.maxY());
    this.leaderLeftBound.getXform().setPosition(this.mLeaderBox.minX(), this.mLeader.getXform().getYPos());
    this.leaderRightBound.getXform().setPosition(this.mLeaderBox.maxX(), this.mLeader.getXform().getYPos());
    this.leaderBottomBound.getXform().setPosition(this.mLeader.getXform().getXPos(), this.mLeaderBox.minY());

    this.topWingTopBound.getXform().setPosition(this.mTopWing.getXform().getXPos(), this.mTopWingBox.maxY());
    this.topWingLeftBound.getXform().setPosition(this.mTopWingBox.minX(), this.mTopWing.getXform().getYPos());
    this.topWingRightBound.getXform().setPosition(this.mTopWingBox.maxX(), this.mTopWing.getXform().getYPos());
    this.topWingBottomBound.getXform().setPosition(this.mTopWing.getXform().getXPos(), this.mTopWingBox.minY());

    this.bottomWingTopBound.getXform().setPosition(this.mBottomWing.getXform().getXPos(), this.mBottomWingBox.maxY());
    this.bottomWingLeftBound.getXform().setPosition(this.mBottomWingBox.minX(), this.mBottomWing.getXform().getYPos());
    this.bottomWingRightBound.getXform().setPosition(this.mBottomWingBox.maxX(), this.mBottomWing.getXform().getYPos());
    this.bottomWingBottomBound.getXform().setPosition(this.mBottomWing.getXform().getXPos(), this.mBottomWingBox.minY());
};

Patrol.prototype.getDrawBBoxBoolean = function () {
    return this.mDrawBox;
};

Patrol.prototype.setDrawBBoxBoolean = function (mDrawBox) {
    this.mDrawBox = mDrawBox;
};

