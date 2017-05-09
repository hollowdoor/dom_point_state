import objectAssign from 'object-assign';

import {
    createPointCB,
    pointInside
} from 'dom-plane';

let windowPoint = null;

export function getPointState(el){
    return pointState(el);
}

export function getGlobalPointState(){
    if(windowPoint === null){
        windowPoint = pointState(window);
    }
    return windowPoint;
}

function pointState(element){

    let point = {},
        pointCB = createPointCB(point),
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
        get(){ return point.x; },
        enumerable: true
    });

    Object.defineProperty(point, 1, {
        get(){ return point.y; },
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
        inside(el){
            if(el === element){
                return insideThis;
            }
            return pointInside(point, el);
        },
        destroy(){
            alive = false;
            element.removeEventListener('mousemove', pointCB, false);
            element.removeEventListener('touchmove', pointCB, false);
            element.removeEventListener('mousedown', onDown, false);
            element.removeEventListener('touchstart', onDown, false);
            element.removeEventListener('mouseup', onUp, false);
            element.removeEventListener('touchend', onUp, false);
            element.removeEventListener('mouseleave', onMouseOut, false);
            element.removeEventListener('mouseover', onMouseOver, false);
        },
        get alive(){
            return alive;
        }
    });
}
