// import _ from 'lodash';
import './style.css';
import Icon from './9a1200ca423f14cd2415109a3a75287f.jpg';
import printMe from './print.js';
import { cube } from './math.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    // Lodash, now imported by this script
    element.innerHTML = 1122;
    element.classList.add('hello');

    // 将图像添加到我们现有的 div。
    var myIcon = new Image();
    myIcon.src = Icon;

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    console.log(cube(5));

    return element;
}

document.body.appendChild(component());

console.log(1112);