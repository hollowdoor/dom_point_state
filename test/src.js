import {getGlobalPointStateFactory} from '../';
const getGlobalPointState = getGlobalPointStateFactory();
let point = getGlobalPointState();
let showx = document.querySelector('#showx');
let showy = document.querySelector('#showy');

window.addEventListener('mousemove', e=>{
    console.log(point);
    showx.textContent = point.x;
    showy.textContent = point.y;
});
