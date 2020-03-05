/* File: PatrolSet.js 
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox, gEngine: false, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PatrolSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(PatrolSet, GameObjectSet);

PatrolSet.prototype.update = function () {
    GameObjectSet.prototype.update.call(this);
    this.terminate();
    this.updateBBox();
};

PatrolSet.prototype.pushAll = function () {
    for (var i = 0; i < this.mSet.length; i++) {
        this.mSet[i].pushHead();
    }
};

PatrolSet.prototype.terminate = function () {
    for (var i = 0; i < this.mSet.length; i++) {
        if (this.mSet[i].getTerminateBoolean()) {
            this.mSet.splice(i, 1);
        }
    } 
};

PatrolSet.prototype.updateBBox = function () {
    for (var i = 0; i < this.mSet.length; i++)
    {
        this.mSet[i].updateBBox();
    }
};