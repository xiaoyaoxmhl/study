webpackJsonp([3],{

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);

console.log(__WEBPACK_IMPORTED_MODULE_0_vue__["default"]);


document.getElementById('aBtn').onclick = function(){
	// 异步的加载A.js
	__webpack_require__.e/* require.ensure */(0).then((function(){
		var A  = __webpack_require__(8);
		alert(A.data);

	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
};


document.getElementById('bBtn').onclick = function(){
	// 异步的加载B.js
	__webpack_require__.e/* require.ensure */(1).then((function(){
		var B = __webpack_require__(3);
		alert(B.data);
		
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
};

/***/ })

},[4]);