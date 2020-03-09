/* File: BomberHero.js 
 *
 * Abstracts a game object's behavior and apparance
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BomberHero(renderable) {
    GameObject.call(this, renderable);
};
gEngine.Core.inheritPrototype(BomberHero, GameObject);