/* File: ChessPiece.js 
 */

/*jslint node: true, vars: true */
/*global vec2, vec3, BoundingBox, gEngine: false, GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function ChessPiece(renderable) {
    GameObject.call(this, renderable);

}
gEngine.Core.inheritPrototype(ChessPiece, GameObject);
