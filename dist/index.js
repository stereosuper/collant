(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("collant", [], factory);
	else if(typeof exports === 'object')
		exports["collant"] = factory();
	else
		root["collant"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var throttle = __webpack_require__(1);
var requestAnimFrame = __webpack_require__(2);

module.exports = function (stickyElt, givenPosition) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$unit = _ref.unit,
        unit = _ref$unit === undefined ? 'px' : _ref$unit,
        _ref$updateHeightOnSc = _ref.updateHeightOnScroll,
        updateHeightOnScroll = _ref$updateHeightOnSc === undefined ? false : _ref$updateHeightOnSc,
        _ref$wrapper = _ref.wrapper,
        wrapper = _ref$wrapper === undefined ? true : _ref$wrapper,
        _ref$minimumWidth = _ref.minimumWidth,
        minimumWidth = _ref$minimumWidth === undefined ? false : _ref$minimumWidth,
        _ref$bottom = _ref.bottom,
        bottom = _ref$bottom === undefined ? false : _ref$bottom;

    if (typeof stickyElt == 'undefined' || stickyElt == null) return;

    var position = void 0,
        eltHeight = void 0,
        posTop = void 0,
        belowWidth = void 0,
        offset = void 0;
    var windowHeight = window.innerHeight;
    var windowWidth = window.outerWidth;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var wrapperSticky = void 0;

    var checkWindowHeight = function checkWindowHeight() {
        windowHeight = window.innerHeight;
        windowWidth = window.outerWidth;

        if (unit === 'vh') {
            eltHeight = stickyElt.offsetHeight;
            position = windowHeight / (100 / givenPosition) - eltHeight / 2;
        } else {
            position = givenPosition;
        }
    };

    var scrollHandler = function scrollHandler() {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (updateHeightOnScroll && stickyElt.classList.contains('collant')) stickyElt.dataset.height = stickyElt.offsetHeight;

        if (bottom) {

            if (scrollTop + windowHeight >= parseFloat(stickyElt.dataset.offsetBottom, 10) + position) {
                stickyElt.classList.remove('collant');
                stickyElt.style.bottom = parseFloat(stickyElt.dataset.initialPos, 10);
            } else {
                stickyElt.classList.add('collant');
                stickyElt.style.bottom = position + 'px';
            }

            if (minimumWidth && belowWidth) {
                stickyElt.classList.remove('collant', 'collant-stuck');
                stickyElt.style.top = '';
                stickyElt.style.bottom = parseFloat(stickyElt.dataset.initialPos, 10);
            }
        } else {

            posTop = stickyElt.dataset.initialPos === 'auto' ? 0 : parseFloat(stickyElt.dataset.initialPos, 10);

            if (scrollTop >= parseFloat(stickyElt.dataset.offsetTop, 10) - position + posTop) {
                stickyElt.classList.add('collant');
                stickyElt.style.top = position + 'px';

                if (scrollTop + position + parseFloat(stickyElt.dataset.height, 10) >= parseFloat(stickyElt.dataset.offsetBottom, 10)) {
                    stickyElt.classList.remove('collant');
                    stickyElt.classList.add('collant-stuck');
                    stickyElt.style.top = 'auto';
                    stickyElt.style.bottom = '0';
                } else {
                    stickyElt.classList.add('collant');
                    stickyElt.classList.remove('collant-stuck');
                    stickyElt.style.top = position + 'px';
                    stickyElt.style.bottom = '';
                }
            } else {
                stickyElt.classList.remove('collant');
                stickyElt.style.top = parseFloat(stickyElt.dataset.initialPos, 10);
            }

            if (minimumWidth && belowWidth) {
                stickyElt.classList.remove('collant', 'collant-stuck');
                stickyElt.style.top = parseFloat(stickyElt.dataset.initialPos, 10);
                stickyElt.style.bottom = '';
            }
        }
    };

    var setDatas = function setDatas() {
        offset = wrapperSticky.getBoundingClientRect();
        belowWidth = minimumWidth && windowWidth <= minimumWidth;

        stickyElt.dataset.offsetTop = wrapper ? offset.top + scrollTop : 0;

        stickyElt.dataset.offsetBottom = offset.top + scrollTop + wrapperSticky.offsetHeight;
        stickyElt.dataset.height = stickyElt.offsetHeight;
    };

    var resizeHandler = function resizeHandler() {
        checkWindowHeight();
        setDatas();
        scrollHandler();
    };

    wrapperSticky = stickyElt.dataset.collant ? document.querySelector('.wrapper-collant[data-collant="' + stickyElt.dataset.collant + '"]') : document.querySelector('.wrapper-collant');

    setDatas();
    stickyElt.dataset.initialPos = bottom ? getComputedStyle(stickyElt)['bottom'] : getComputedStyle(stickyElt)['top'];

    checkWindowHeight();
    scrollHandler();

    document.addEventListener('scroll', throttle(function () {
        requestAnimFrame(scrollHandler);
    }, 10), false);

    window.addEventListener('resize', throttle(function () {
        requestAnimFrame(resizeHandler);
    }, 10));
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (callback, delay) {
    var last, timer;
    return function () {
        var context = this,
            now = +new Date(),
            args = arguments;
        if (last && now < last + delay) {
            // le délai n'est pas écoulé on reset le timer
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                callback.apply(context, args);
            }, delay);
        } else {
            last = now;
            callback.apply(context, args);
        }
    };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
       return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
              window.setTimeout(callback, 1000 / 60);
       };
}();

/***/ })
/******/ ]);
});