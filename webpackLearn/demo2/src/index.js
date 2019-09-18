// import _ from 'lodash';
import './style.css';
import Icon from './9a1200ca423f14cd2415109a3a75287f.jpg';
import {cube} from './math.js';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

var printMe;

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

import(/* webpackChunkName: "print" */'./print').then(function (data) {
    printMe = data.default;
    document.body.appendChild(component());
    console.log('import complete');
})


console.log(1112);