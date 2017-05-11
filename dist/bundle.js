'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var objectAssign = _interopDefault(require('object-assign'));
var domPlane = require('dom-plane');

function getPointState(el){
    return pointState(el);
}

function getGlobalPointStateFactory(){
    var windowPoint = null;
    return function getGlobalPointState(){
        if(windowPoint === null){
            windowPoint = pointState(window);
        }
        return windowPoint;
    };
}

function pointState(element){

    var point = {},
        pointCB = domPlane.createPointCB(point),
        down = false,
        alive = true,
        insideThis = false;

    element.addEventListener('mousemove', pointCB, false);
    element.addEventListener('touchmove', pointCB, false);
    element.addEventListener('mousedown', onDown, false);
    element.addEventListener('touchstart', onDown, false);
    element.addEventListener('mouseup', onUp, false);
    element.addEventListener('touchend', onUp, false);
    element.addEventListener('mouseleave', onMouseOut, false);
    element.addEventListener('mouseover', onMouseOver, false);

    function onDown(){
        down = true;
    }

    function onUp(){
        down = false;
    }

    function onMouseOut(){
        insideThis = false;
    }

    function onMouseOver(){
        insideThis = true;
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

    Object.defineProperty(point, 'down', {
        get: function get(){
            return down;
        },
        enumerable: true
    });

    Object.defineProperty(point, 'up', {
        get: function get(){
            return !down;
        },
        enumerable: true
    });

    Object.defineProperty(point, 'alive', {
        get: function get(){
            return alive;
        },
        enumerable: true
    });

    return objectAssign(point, {
        inside: function inside(el){
            if(el === element){
                return insideThis;
            }
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
            element.removeEventListener('mouseleave', onMouseOut, false);
            element.removeEventListener('mouseover', onMouseOver, false);
        }
    });
}

exports.getPointState = getPointState;
exports.getGlobalPointStateFactory = getGlobalPointStateFactory;
//# sourceMappingURL=bundle.js.map
