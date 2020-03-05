/* File: DyePack.js 
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox, gEngine: false, GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function DyePack() {
    this.mSprite = new SpriteRenderable("assets/SpriteSheet.png");
    this.mLifeSpan = 5;
    this.mBirthTime = 0;
    this.mElapsedTime = 0;
    
    // Toggle Variables
    this.mStartDeceleration = false;
    this.mTerminate = false;
    
    // GameObject State
    this.mShake = null;
    this.mSavedStatePosition = null;
    this.mInterpolate = null;
    
    this.mHitBox = null;
    
    GameObject.call(this, this.mSprite);
    
    this.initialize();
}

gEngine.Core.inheritPrototype(DyePack, GameObject);

DyePack.prototype.initialize = function () {
    this.getRenderable().setElementUVCoordinate(0.48, 0.585, 0, 0.3);
    this.getRenderable().getXform().setRotationInDegree(90);
    this.getRenderable().getXform().setSize(2, 3.25);
    
    this.setSpeed(2);
    this.setCurrentFrontDir([1, 0]);
    
    this.mBirthTime = Date.now();
    this.mElapsedTime = Date.now();
    
    this.mHitBox = this.getBBox();
};

DyePack.prototype.getTerminateBoolean = function () {
    return this.mTerminate;
};

DyePack.prototype.startDeceleration = function () {
    this.mStartDeceleration = true;
};

DyePack.prototype._handleDeceleration = function () {
    if (this.getSpeed() <= 0) {
        this.mTerminate = true;
        return;
    }
    
    if (this.mStartDeceleration) {
        this.incSpeedBy(-0.1);
    }
};

DyePack.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this._handleDeceleration();
    this._handleTime();
    this._handleOutOfBounds();
    this._snapHitBox();
};

DyePack.prototype._handleTime = function () {
    this.mElapsedTime = Date.now();
    
    if (this.mElapsedTime - this.mBirthTime >= this.mLifeSpan * 1000) {
        this.mTerminate = true;
    }
};

DyePack.prototype._handleOutOfBounds = function () {
    var x = this.getXform().getPosition()[0];
    var y = this.getXform().getPosition()[1];
    
    if (x >= 100 || x <= -100 || y >= 75 || y <= -75) {
        this.mTerminate = true;
    }
};

DyePack.prototype._snapHitBox = function () {
    this.mHitBox.setBounds(this.getXform().getPosition(), this.mHitBox.getWidth(), this.mHitBox.getHeight());
};

DyePack.prototype.startShake = function (xDelta, yDelta, shakeFrequency, shakeDuration) {
    this.mSavedStatePosition = vec2.clone(this.getXform().getPosition());
    
    this.mInterpolate = new InterpolateVec2(this.getXform(), 300, 0.1);

    this.mShake = new ShakePosition(xDelta, yDelta, shakeFrequency, shakeDuration);
    
    this.mStartDeceleration = false;
    
    this.mHitBox.setActive(false);
};

DyePack.prototype.shake = function () {
    if (this.mShake !== null && this.mShake !== undefined) {
        var temp = vec2.clone(this.mSavedStatePosition);
        vec2.add(this.getXform().getPosition(), this.mSavedStatePosition, this.mShake.getShakeResults());
        this.mInterpolate.setFinalValue(temp);
        this.mInterpolate.updateInterpolation();
        
        if (this.mShake.shakeDone()) {
            this.mSavedStatePosition = null;
            this.mShake = null;
        }
    }
};

DyePack.prototype.getShake = function () {
    return this.mShake;
};

DyePack.prototype.getHitBox = function () {
    return this.mHitBox;
};