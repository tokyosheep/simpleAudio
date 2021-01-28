/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main/index.ts":
/*!***********************!*\
  !*** ./main/index.ts ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ipcCmmut__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ipcCmmut */ "./main/ipcCmmut.ts");


var app = (electron__WEBPACK_IMPORTED_MODULE_0___default().app);
var BrowserWindow = (electron__WEBPACK_IMPORTED_MODULE_0___default().BrowserWindow);
var mainWindow;
var debug = true;
(0,_ipcCmmut__WEBPACK_IMPORTED_MODULE_1__.initIpcEvent)();
app.on("ready", function () {
  mainWindow = new BrowserWindow({
    width: 800 + (debug ? 200 : 0),
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadURL("file://".concat(__dirname, "/index.html"));
  if (debug) mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
});

/***/ }),

/***/ "./main/ipcCmmut.ts":
/*!**************************!*\
  !*** ./main/ipcCmmut.ts ***!
  \**************************/
/*! namespace exports */
/*! export initIpcEvent [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initIpcEvent": () => /* binding */ initIpcEvent
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);



var app = (electron__WEBPACK_IMPORTED_MODULE_0___default().app); //const DataStore = require("nedb");

var initIpcEvent = function initIpcEvent() {
  electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle("getDirectoryPath", function (event) {
    var folder = electron__WEBPACK_IMPORTED_MODULE_0__.dialog.showOpenDialog({
      properties: ["openDirectory"]
    });
    return folder;
  });
  electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle("getImagePath", function (event) {
    var image = electron__WEBPACK_IMPORTED_MODULE_0__.dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{
        name: "image",
        extensions: ["jpg", "jpeg", "png"]
      }]
    });
    return image;
  });
  electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle("getVideoPath", function (event) {
    var video = electron__WEBPACK_IMPORTED_MODULE_0__.dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{
        name: "image",
        extensions: ["mp4", "mov", "avi"]
      }]
    });
    return video;
  });
  electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.on("getAppPath", function (event) {
    event.returnValue = app.getAppPath();
  });
};

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("electron");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./main/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=index.js.map