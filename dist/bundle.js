'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var objectAssign = _interopDefault(require('object-assign'));
var domPlane = require('dom-plane');

var windowPoint = null;

function getPointState(el){
    return pointState(el);
}

function getGlobalPointState(){
    if(windowPoint === null){
        windowPoint = pointState(window);
    }
    return windowPoint;
}

function pointState(element){

    var point = {},
        pointCB = domPlane.createPointCB(point),
        down = false,
        alive = true;

    element.addEventListener('mousemove', pointCB, false);
    element.addEventListener('touchmove', pointCB, false);
    element.addEventListener('mousedown', onDown, false);
    element.addEventListener('touchstart', onDown, false);
    element.addEventListener('mouseup', onUp, false);
    element.addEventListener('touchend', onUp, false);

    function onDown(){
        down = true;
    }

    function onUp(){
        down = false;
    }

    Object.defineProperty(point, 0, {
        get: function get(){ return point.x; },
        enumerable: true
    });

    Object.defineProperty(point, 1, {
        get: function get(){ return point.y; },
        enumerable: true
    });

    Object.defineProperty(point, 'length', {
        value: 2,
        enumerable: true
    });

    return objectAssign(point, {
        get down(){
            return down;
        },
        get up(){
            return !down;
        },
        inside: function inside(el){
            return domPlane.pointInside(point, el);
        },
        destroy: function destroy(){
            alive = false;
            element.removeEventListener('mousemove', pointCB, false);
            element.removeEventListener('touchmove', pointCB, false);
            element.removeEventListener('mousedown', onDown, false);
            element.removeEventListener('touchstart', onDown, false);
            element.removeEventListener('mouseup', onUp, false);
            element.removeEventListener('touchend', onUp, false);
        },
        get alive(){
            return alive;
        }
    });
}

exports.getPointState = getPointState;
exports.getGlobalPointState = getGlobalPointState;
//# sourceMappingURL=bundle.js.map
