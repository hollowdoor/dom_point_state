import objectAssign from 'object-assign';
import { createPointCB, pointInside } from 'dom-plane';

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
        pointCB = createPointCB(point),
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
            return pointInside(point, el);
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

export { getPointState, getGlobalPointState };
//# sourceMappingURL=bundle.es.js.map
