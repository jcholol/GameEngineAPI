/* File: ZoomCam.js 
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox, gEngine: false, GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ZoomCam() {
    this.mCameras = [];
    this.mHeroCamera = null;
    this.mSecCam = null;
    this.mThirdCam = null;
    this.mFourthCam = null;
    
    this.mHeroDrawBool = false;
    this.mSecCamDrawBool = false;
    this.mThirdCamDrawBool = false;
    this.mFourthCamDrawBool = false;
    
    this.mHeroReference = null;
    this.mDyePackBuffer = [];
    
    this.initialize();
}

ZoomCam.prototype.initialize = function () {
    this.mHeroCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            15, // width of camera
            [0, 600, 200, 200]           // viewport (orgX, orgY, width, height)
            );
    this.mHeroCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.mSecCam = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            6, // width of camera
            [200, 600, 200, 200]           // viewport (orgX, orgY, width, height)
            );
    this.mSecCam.setBackgroundColor([1, 1, 1, 1]);
    
    this.mThirdCam = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            6, // width of camera
            [400, 600, 200, 200]           // viewport (orgX, orgY, width, height)
            );
    this.mThirdCam.setBackgroundColor([1, 1, 1, 1]);
    
    this.mFourthCam = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            6, // width of camera
            [600, 600, 200, 200]           // viewport (orgX, orgY, width, height)
            );
    this.mFourthCam.setBackgroundColor([1, 1, 1, 1]);
    
    this.mCameras.push(this.mHeroCamera);
    this.mCameras.push(this.mSecCam);
    this.mCameras.push(this.mThirdCam);
    this.mCameras.push(this.mFourthCam);
};

ZoomCam.prototype.update = function () {
    if (this.mHeroReference !== null && this.mHeroReference !== undefined) {
        this.mHeroCamera.setWCCenter(this.mHeroReference.getLerpPosition()[0], this.mHeroReference.getLerpPosition()[1]);
        this.mHeroCamera.update();
    }
    
    if (this.mDyePackBuffer[0] !== null && this.mDyePackBuffer[0] !== undefined) {
        this.mSecCamDrawBool = true;
        this.mSecCam.setWCCenter(this.mDyePackBuffer[0].getXform().getXPos(), this.mDyePackBuffer[0].getXform().getYPos());
        this.mSecCam.update();
        
        if (this.mDyePackBuffer[0].getTerminateBoolean()) {
            this.mDyePackBuffer.shift();
        }
    } else {
        this.mSecCamDrawBool = false;
    }
    
    if (this.mDyePackBuffer[1] !== null && this.mDyePackBuffer[1] !== undefined) {
        this.mThirdCamDrawBool = true;
        this.mThirdCam.setWCCenter(this.mDyePackBuffer[1].getXform().getXPos(), this.mDyePackBuffer[1].getXform().getYPos());
        this.mThirdCam.update();
        
        if (this.mDyePackBuffer[1].getTerminateBoolean()) {
            this.mDyePackBuffer.shift();
        }
    } else {
        this.mThirdCamDrawBool = false;
    }
    
    if (this.mDyePackBuffer[2] !== null && this.mDyePackBuffer[2] !== undefined) {
        this.mFourthCamDrawBool = true;
        this.mFourthCam.setWCCenter(this.mDyePackBuffer[2].getXform().getXPos(), this.mDyePackBuffer[2].getXform().getYPos());
        this.mFourthCam.update();
        
        if (this.mDyePackBuffer[2].getTerminateBoolean()) {
            this.mDyePackBuffer.shift();
        }
    } else {
        this.mFourthCamDrawBool = false;
    }
};

ZoomCam.prototype.draw = function () {
    //this.mHeroCamera.setupViewProjection();
};

ZoomCam.prototype.addToBuffer = function (dyePack) {
    this.mDyePackBuffer.push(dyePack);
};

ZoomCam.prototype.drawToCams = function (renderable, index) {
    switch (index) {
        case 0 :
            if (this.mHeroReference.getHitBoolean()) {
                renderable.draw(this.mCameras[index]);
            }
            break;
        case 1 :
            if (this.mSecCamDrawBool) {
                renderable.draw(this.mCameras[index]);
            }
            break;
        case 2 :
            if (this.mThirdCamDrawBool) {
                renderable.draw(this.mCameras[index]);
            }
            break;
        case 3 :
            if (this.mFourthCamDrawBool) {
                renderable.draw(this.mCameras[index]);
            }
            break;
    }
};

ZoomCam.prototype.setHeroRef = function (heroReference) {
    this.mHeroReference = heroReference;
};

ZoomCam.prototype.setupHeroView = function () {
    this.mHeroCamera.setupViewProjection();
};

ZoomCam.prototype.setupSecView = function () {
    this.mSecCam.setupViewProjection();
};

ZoomCam.prototype.setupThirdView = function () {
    this.mThirdCam.setupViewProjection();
};

ZoomCam.prototype.setupFourthView = function () {
    this.mFourthCam.setupViewProjection();
};
