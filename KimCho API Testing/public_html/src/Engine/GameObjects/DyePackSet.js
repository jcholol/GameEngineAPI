/* File: DyePackSet.js 
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox, gEngine: false, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePackSet() {
    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(DyePackSet, GameObjectSet);

DyePackSet.prototype.update = function () {
    GameObjectSet.prototype.update.call(this);
    for (var i = 0; i < this.mSet.length; i++) {
        if (this.mSet[i].getTerminateBoolean()) {
            this.mSet.splice(i, 1);
        }
    }
};
