/*
 * File: AnimationView.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
 TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
 FontRenderable: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AnimationView(spriteSource) {
    this.mSpriteCamera = null;
    this.mSpriteSource = null;
    this.mAnimateRenderable = null;
    this.mInteractiveBound = null;
    
    this.mMaxHeight = 300;
    this.mMaxWidth = 400;
    this.wcMaxWidth = 100;
    this.wcMaxheight = (this.wcMaxWidth * 4) / 3;

    this.initialize(spriteSource);
}
;

AnimationView.prototype.initialize = function (spriteSource) {
    this.mSpriteCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            100, // width of camera
            [500, 0, 300, 400]           // viewport (orgX, orgY, width, height)
            );
    this.mSpriteCamera.setBackgroundColor([0.7, 0.7, 0.7, 1]);

    this.setSpriteSource(spriteSource);
};

AnimationView.prototype.setSpriteSource = function (spriteSource) {
    this.mSpriteSource = spriteSource;
    this.setAnimateRenderable();
};

AnimationView.prototype.setAnimateRenderable = function () {
    this.mAnimateRenderable = new SpriteAnimateRenderable(this.mSpriteSource.getTexture());
    //this.mAnimateRenderable.getXform().setSize(this.wcMaxWidth * this.mAnimateRenderable.getWidth(), this.wcMaxheight * this.mAnimateRenderable.getHeight() * this.mSpriteSource.getHeightRatio());
    
    this.mAnimateRenderable.setSpriteSequence(512, 0, // first element pixel position: top-left 512 is top of image, 0 is left of image
            204, 164, // widthxheight in pixels
            5, // number of elements in this sequence
            0);         // horizontal padding in between
    this.mAnimateRenderable.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mAnimateRenderable.setAnimationSpeed(60);
};

AnimationView.prototype.getAnimateRenderable = function () {
    return this.mAnimateRenderable;
};

AnimationView.prototype.draw = function () {
    this.mSpriteCamera.setupViewProjection();

    this.mAnimateRenderable.draw(this.mSpriteCamera.getVPMatrix());
};

AnimationView.prototype.update = function () {
    this.mAnimateRenderable.updateAnimation();
    this.syncBounds();
    this.handleInput();
    
    var hRatio = this.mSpriteSource.getHeightRatio();
    
    var x1 = this.wcMaxWidth;
    
    var y1 = this.wcMaxWidth * (this.mInteractiveBound.getXform().getHeight() / this.mInteractiveBound.getXform().getWidth());
    
    this.mAnimateRenderable.getXform().setSize(x1, y1);
    
    if (y1 > this.mSpriteCamera.getWCWidth()) {
        this.mSpriteCamera.setWCWidth(this.mSpriteCamera.getWCWidth() + (y1 - this.mSpriteCamera.getWCWidth()));
    } else if (y1 < this.mSpriteCamera.getWCWidth() && y1 > x1) {
        this.mSpriteCamera.setWCWidth(this.mSpriteCamera.getWCWidth() - (this.mSpriteCamera.getWCWidth() - y1));
    }
};

AnimationView.prototype.handleInput = function () {
    var deltaX = 0.01;
    var deltaY = 0.01;
    //var viewPortArr = this.mSpriteCamera.getViewport();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
        deltaX = deltaX / 100;
        deltaY = deltaY / 100;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        this.mAnimateRenderable.incYSpriteSequence(deltaY);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        this.mAnimateRenderable.incYSpriteSequence(-deltaY);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.mAnimateRenderable.incXSpriteSequence(deltaX);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.mAnimateRenderable.incXSpriteSequence(-deltaX);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.mAnimateRenderable.incHeight(-deltaY);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mAnimateRenderable.incHeight(deltaY);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mAnimateRenderable.incWidth(deltaX);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mAnimateRenderable.incWidth(-deltaX);
    }
};

AnimationView.prototype.syncBounds = function () {
    var xform = this.mInteractiveBound.getXform();
    var xOffset = xform.getWidth() / 2;
    var yOffset = xform.getHeight() / 2;
    var cWidth = this.mSpriteSource.getXform().getWidth();
    var hRatio = this.mSpriteSource.getHeightRatio();
    
    xform.setSize(cWidth * this.mAnimateRenderable.getWidth(),
                  cWidth * this.mAnimateRenderable.getHeight() * hRatio);
    xform.setPosition(this.mAnimateRenderable.getLeft() * cWidth + xOffset - (cWidth / 2), 
    (this.mAnimateRenderable.getTop() * hRatio) * cWidth - yOffset - (cWidth * hRatio) / 2);
};

AnimationView.prototype.connectInteractiveBound = function (interactiveBound) {
    this.mInteractiveBound = interactiveBound;
};
