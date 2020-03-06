/* File: Hero.js 
 *
 * Abstracts a game object's behavior and apparance
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, gEngine: false, GameObject*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero() {
    this.mSprite = new SpriteRenderable("assets/SpriteSheet.png");
    this.mCamera = null;
    this.mDyePackSet = null;
    this.mHitAmplitude = null;
    this.mHitInterpolation = null;
    this.mHitBoolean = false;
    this.mOrgSize = null;
    
    GameObject.call(this, this.mSprite);
    this.initialize();
}

gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.initialize = function () {
    this.getRenderable().setElementPixelPositions(0, 120, 0, 180);
    this.getRenderable().getXform().setSize(9, 12);
    this.mInterpolate = new InterpolateVec2(this.getXform().getPosition(), 120, 0.05);
    this.mHitInterpolation = new InterpolateVec2(this.getXform().getSize(), 100, 0.1);
    this.mHitAmplitude = new ShakePosition(4.5, 6, 4, 60);
    this.mOrgSize = vec2.clone(this.getXform().getSize());
    
    this.mDyePackSet = new DyePackSet();
};

Hero.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mDyePackSet.update();
    this._handleInput();
    this._followMouse();
    this._handleHitBehavior();
    
    for (var i = 0; i < this.mDyePackSet.size(); i++) {
        this.mDyePackSet.getObjectAt(i).shake();
    }
};

Hero.prototype.draw = function (mCamera) {
    GameObject.prototype.draw.call(this, mCamera);
    this.mDyePackSet.draw(mCamera);
};

Hero.prototype._handleInput = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var temp = new DyePack();
        var x = this.getXform().getXPos();
        var y = this.getXform().getYPos();
        temp.getXform().setPosition(x, y);
        this.mDyePackSet.addToSet(temp);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        for (var i = 0; i < this.mDyePackSet.size(); i++) {
            this.mDyePackSet.getObjectAt(i).startDeceleration();
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        console.log(this.mDyePackSet.size());
        for (var i = 0; i < this.mDyePackSet.size(); i++) {
            this.mDyePackSet.getObjectAt(i).startShake(4, 0.2, 20, 300);
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.triggerHitBehavior();
    }
};

Hero.prototype.triggerHitBehavior = function () {
    this.mHitBoolean = true;
};

Hero.prototype._handleHitBehavior = function () {
    if (this.mHitBoolean) {
        var temp = vec2.clone(this.mOrgSize);
        
        vec2.add(temp, temp, this.mHitAmplitude.getHitResults());
        this.mHitInterpolation.setFinalValue(temp);
        this.mHitInterpolation.updateInterpolation();
    }
    
    if (this.mHitAmplitude.shakeDone()) {
        this.getXform().setSize(this.mOrgSize[0], this.mOrgSize[1]);
        this.mHitBoolean = false;
        this.mHitAmplitude = new ShakePosition(4.5 * (this.mOrgSize[0] / 2), 6 * (this.mOrgSize[1] / 2), 4, 60);
    }
};

Hero.prototype._followMouse = function (){
    if (this.mCamera === null || this.mCamera === undefined){
        return;
    }
    var x = this.mCamera.mouseWCX();
    var y = this.mCamera.mouseWCY();
    if (x >= 100 || x <= -100 || y >= 75 || y <= -75) {
        return;
    }
    this.lerpToPosition(x, y);
};

Hero.prototype.attachCamera = function (mCamera){
    this.mCamera = mCamera;
};

Hero.prototype.lerpToPosition = function (x, y) {
    var temp = vec2.fromValues(x, y); 
    this.mInterpolate.setFinalValue(temp);
    this.mInterpolate.updateInterpolation();
};

Hero.prototype.getDyePackSet = function () {
    return this.mDyePackSet;
};

Hero.prototype.getHitBoolean = function () {
    return this.mHitBoolean;
};

Hero.prototype.getLerpPosition = function () {
    return this.mInterpolate.getValue();
};