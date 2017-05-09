dom-point-state
===============

Install
-------

`npm install --save dom-point-state`

Example
-------

```javascript
import {getGlobalPointState} from 'dom-point-state';

let point = getGlobalPointState();
//Show the x/y coordinates of the pointer
let showx = document.querySelector('#showx');
let showy = document.querySelector('#showy');

window.addEventListener('mousemove', e=>{
    showx.textContent = point.x;
    showy.textContent = point.y;
});
```

API
---

### getGlobalPointState()

Get the window point.

The window point returned from `getGlobalPointState()` is a singleton. You'll still have access to the `destroy` method, but make sure you really do want to use `destroy`. A destroyed window point will be destroyed for all references to it.

Use the side effects of the window point singleton to manage memory usage. For some things you might not want side effects. If so use `getPointState(element)` instead.

### getPointState(element)

Get a point for a specific element. `point.x`, and `point.y` will still be relative to the window view port.

Point methods
---------------

### point.destroy()

Clean up the a point you don't want to use any more.

### point.inside(element)

Check if the point is inside an element. Especially child elements of the element the point belongs to.

Point properties
----------------

### point.x, point.y

The `x`, and `y` integer coordinates of the point.

### point.down, point.up

Is the point down, or up. This refers to the input device (mouse, touch).

The values of `up`, and `down` are boolean.

### point.alive

Has the `destroy` method been called. If so `point.alive` returns `false`.

### point[0], point[1], point.length

The point simulates an array. `point[0]` is equal to `point.x`, and `point[1]` is equal to `point.y`. `point.length` will always be equal to 2.

About
-----

This libarary is optimized for usage on many elements. Use `getGlobalPointState()` for optimal memory, and event usage.

`dom-point-state` is meant for low level management of pointer position.

There are many properties on a point instance. Many aren't shown here. Print the object to see more.

x/y coordinates are retrieved from `mousemove`, and `touchmove` events. And `dom-point-state` is cross browser.
