(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["imports-imports-module"],{

/***/ "./node_modules/dhx-spreadsheet/codebase/spreadsheet.js":
/*!**************************************************************!*\
  !*** ./node_modules/dhx-spreadsheet/codebase/spreadsheet.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
@license

dhtmlxSpreadsheet v.3.1.2 GPL

This software is covered by GPL license.
To use it in non-GPL project, you need obtain Commercial or Enterprise license
Please contact sales@dhtmlx.com. Usage without proper license is prohibited.
(c) Dinamenta, UAB.

*/
if (window.dhx){ window.dhx_legacy = dhx; delete window.dhx; }(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/codebase/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom = __webpack_require__(56);
exports.el = dom.defineElement;
exports.sv = dom.defineSvgElement;
exports.view = dom.defineView;
exports.create = dom.createView;
exports.inject = dom.injectView;
function disableHelp() {
    dom.DEVMODE.mutations = false;
    dom.DEVMODE.warnings = false;
    dom.DEVMODE.verbose = false;
    dom.DEVMODE.UNKEYED_INPUT = false;
}
exports.disableHelp = disableHelp;
function resizer(handler) {
    return exports.el("iframe", {
        _hooks: {
            didInsert: function (node) {
                var activeHandler = function () {
                    var height = node.el.offsetHeight;
                    var width = node.el.offsetWidth;
                    handler(width, height);
                };
                node.el.contentWindow.onresize = activeHandler;
                activeHandler();
            }
        },
        style: "position:absolute;left:0;top:-100%;width:100%;height:100%;margin:1px 0 0;border:none;opacity:0;visibility:hidden;pointer-events:none;",
    });
}
exports.resizer = resizer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
function getLetterFromNumber(num) {
    if (!num) {
        return "";
    }
    num = --num;
    var numeric = num % 26;
    var letter = String.fromCharCode(65 + numeric);
    var group = Math.floor(num / 26);
    if (group > 0) {
        return getLetterFromNumber(group) + letter;
    }
    return letter;
}
exports.getLetterFromNumber = getLetterFromNumber;
function getNumberFromLetter(str) {
    if (!str) {
        return -1;
    }
    str = str.toUpperCase();
    var letters = str.split("");
    return letters.reduce(function (total, item, i, arr) {
        var num = item.charCodeAt(0) - 64;
        var pow = Math.pow(26, arr.length - (i + 1));
        total += num * pow;
        return total;
    }, 0);
}
exports.getNumberFromLetter = getNumberFromLetter;
function getCellIds(grid, cell) {
    if (!cell) {
        return {};
    }
    var match = cell.match(/([a-zA-Z]*\d*):([a-zA-Z]*\d*)/);
    if (match) {
        return {
            start: getCellIds(grid, match[1]),
            end: getCellIds(grid, match[2])
        };
    }
    var index = getCellIndex(cell);
    if (!index) {
        return {};
    }
    var rowId = grid.data.getId(index.row);
    var col = grid.config.columns[index.col];
    if (!rowId || !col || !col.id) {
        return {};
    }
    return {
        col: col.id,
        row: rowId
    };
}
exports.getCellIds = getCellIds;
function getCellIndex(cell) {
    var match = cell.match(/([a-zA-Z]*)(\d*)/);
    if (!match || !match[1] || !match[2]) {
        return;
    }
    return {
        col: getNumberFromLetter(match[1]),
        row: parseInt(match[2], 10) - 1
    };
}
exports.getCellIndex = getCellIndex;
function getCellNameByIndex(rowIndex, colIndex) {
    return "" + getLetterFromNumber(colIndex) + (rowIndex + 1);
}
exports.getCellNameByIndex = getCellNameByIndex;
function getCellNameById(grid, row, col) {
    if (!row) {
        return "";
    }
    var rowId = grid.data.getIndex(row) + 1;
    var colId = core_1.findIndex(grid.config.columns, function (item) { return col === item.id; });
    if (rowId < 0 || colId < 0) {
        return;
    }
    return "" + getLetterFromNumber(colId) + rowId;
}
exports.getCellNameById = getCellNameById;
function getCellInfo(grid, cell) {
    var cellId = getCellIds(grid, cell);
    if (cellId.start) {
        cellId = cellId.start;
    }
    if (!cellId || !cell) {
        return {
            locked: false
        };
    }
    var item = grid.data.getItem(cellId.row);
    if (!item) {
        return {};
    }
    if (!item.$info) {
        item.$info = {};
    }
    if (!item.$info[cellId.col]) {
        item.$info[cellId.col] = {};
    }
    return grid.data.getItem(cellId.row).$info[cellId.col];
}
exports.getCellInfo = getCellInfo;
function updateCellInfo(grid, cell, obj) {
    var cellId = getCellIds(grid, cell);
    var item = grid.data.getItem(cellId.row);
    if (!item) {
        return {};
    }
    if (!item.$info) {
        item.$info = {};
    }
    if (!item.$info[cellId.col]) {
        item.$info[cellId.col] = {};
    }
    core_1.extend(item.$info[cellId.col], obj);
}
exports.updateCellInfo = updateCellInfo;
function isRangeId(id) {
    return new RegExp(/([A-Z]+\d+:[A-Z]+\d+)|(?:,)([A-Z]+\d+)/).test(id);
}
exports.isRangeId = isRangeId;
function getRangeIndexes(range) {
    var cells = range.split(":").map(function (item) { return getCellIndex(item); });
    var res = {
        start: {
            row: Math.min(cells[0].row, cells[1].row),
            col: Math.min(cells[0].col, cells[1].col)
        },
        end: {
            row: Math.max(cells[0].row, cells[1].row),
            col: Math.max(cells[0].col, cells[1].col)
        }
    };
    return res;
}
exports.getRangeIndexes = getRangeIndexes;
function getRangeArray(range, dir) {
    if (dir === void 0) { dir = "row"; }
    var arr = [];
    var opp = dir === "row" ? "col" : "row";
    if (range) {
        var _a = getRangeIndexes(range), start = _a.start, end = _a.end;
        for (var i = start[dir]; i <= end[dir]; i++) {
            for (var k = start[opp]; k <= end[opp]; k++) {
                var cell = dir === "row" ? getCellNameByIndex(i, k) : getCellNameByIndex(k, i);
                arr.push(cell);
            }
        }
    }
    return arr;
}
exports.getRangeArray = getRangeArray;
function getRangeMatrix(range, dir) {
    if (dir === void 0) { dir = "row"; }
    var arr = [];
    var opp = dir === "row" ? "col" : "row";
    if (range) {
        var _a = getRangeIndexes(range), start = _a.start, end = _a.end;
        for (var i = start[dir]; i <= end[dir]; i++) {
            var f = [];
            for (var k = start[opp]; k <= end[opp]; k++) {
                var cell = dir === "row" ? getCellNameByIndex(i, k) : getCellNameByIndex(k, i);
                f.push(cell);
            }
            arr.push(f);
        }
    }
    return arr;
}
exports.getRangeMatrix = getRangeMatrix;
function getNextRangeCell(range, current, dir) {
    if (dir === void 0) { dir = "row"; }
    var rangeArr = getRangeArray(range, dir);
    return rangeArr[rangeArr.indexOf(current) + 1] || rangeArr[0];
}
exports.getNextRangeCell = getNextRangeCell;
function getPrevRangeCell(range, current, dir) {
    if (dir === void 0) { dir = "row"; }
    var rangeArr = getRangeArray(range, dir);
    return rangeArr[rangeArr.indexOf(current) - 1] || rangeArr[rangeArr.length - 1];
}
exports.getPrevRangeCell = getPrevRangeCell;
function getCellsArray(cells) {
    if (!cells) {
        return;
    }
    var arr = cells.split(",");
    return arr.reduce(function (total, cell) {
        cell = cell.toUpperCase();
        if (isRangeId(cell)) {
            total = total.concat(getRangeArray(cell));
        }
        else {
            total.push(cell);
        }
        return total;
    }, []);
}
exports.getCellsArray = getCellsArray;
function extendConfig(target, source, deep) {
    if (target === void 0) { target = {}; }
    if (source === void 0) { source = {}; }
    if (deep === void 0) { deep = true; }
    for (var key in target) {
        var sobj = source[key];
        var tobj = target[key];
        if (tobj && "validate" in tobj) {
            source[key] = tobj.validate(sobj) ? sobj : tobj.default;
            target[key] = tobj.default;
        }
    }
    return core_1.extend(target, source, deep);
}
exports.extendConfig = extendConfig;
function isWasmSupported() {
    try {
        if (typeof WebAssembly === "object"
            && typeof WebAssembly.instantiate === "function") {
            var module_1 = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module_1 instanceof WebAssembly.Module) {
                return new WebAssembly.Instance(module_1) instanceof WebAssembly.Instance;
            }
        }
    }
    catch (e) {
        return false;
    }
    return false;
}
exports.isWasmSupported = isWasmSupported;
function fetchFile(url, method, responseType) {
    return new Promise(function (res, rej) {
        var req = new XMLHttpRequest();
        req.open(method, url, true);
        req.responseType = responseType;
        req.onload = function () {
            var response = req.response;
            if (response) {
                res(response);
            }
            else {
                rej(req);
            }
        };
        req.onerror = function () { return rej(req); };
        req.send(null);
    });
}
exports.fetchFile = fetchFile;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var counter = (new Date()).valueOf();
function uid() {
    return "u" + (counter++);
}
exports.uid = uid;
function extend(target, source, deep) {
    if (deep === void 0) { deep = true; }
    if (source) {
        for (var key in source) {
            var sobj = source[key];
            var tobj = target[key];
            if (deep && typeof tobj === "object" && !(tobj instanceof Date) && !(tobj instanceof Array)) {
                extend(tobj, sobj);
            }
            else {
                target[key] = sobj;
            }
        }
    }
    return target;
}
exports.extend = extend;
function copy(source) {
    var result = {};
    for (var key in source) {
        result[key] = source[key];
    }
    return result;
}
exports.copy = copy;
function naturalSort(arr) {
    return arr.sort(function (a, b) {
        var nn = typeof a === "string" ? a.localeCompare(b) : a - b;
        return nn;
    });
}
exports.naturalSort = naturalSort;
function findIndex(arr, predicate) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (predicate(arr[i])) {
            return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function isEqualString(from, to) {
    if (from.length > to.length) {
        return false;
    }
    for (var i = 0; i < from.length; i++) {
        if (from[i].toLowerCase() !== to[i].toLowerCase()) {
            return false;
        }
    }
    return true;
}
exports.isEqualString = isEqualString;
function singleOuterClick(fn) {
    var click = function (e) {
        if (fn(e)) {
            document.removeEventListener("click", click);
        }
    };
    document.addEventListener("click", click);
}
exports.singleOuterClick = singleOuterClick;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(44);
function toNode(node) {
    if (typeof node === "string") {
        node = (document.getElementById(node) || document.querySelector(node));
    }
    return node || document.body;
}
exports.toNode = toNode;
function eventHandler(prepare, hash) {
    var keys = Object.keys(hash);
    return function (ev) {
        var data = prepare(ev);
        var node = ev.target;
        while (node) {
            var cssstring = node.getAttribute ? (node.getAttribute("class") || "") : "";
            if (cssstring.length) {
                var css = cssstring.split(" ");
                for (var j = 0; j < keys.length; j++) {
                    if (css.indexOf(keys[j]) > -1) {
                        return hash[keys[j]](ev, data);
                    }
                }
            }
            node = node.parentNode;
        }
        return true;
    };
}
exports.eventHandler = eventHandler;
function locate(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    var node = locateNode(target, attr);
    return node ? node.getAttribute(attr) : "";
}
exports.locate = locate;
function locateNode(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    if (target instanceof Event) {
        target = target.target;
    }
    while (target) {
        if (target.getAttribute && target.getAttribute(attr)) {
            return target;
        }
        target = target.parentNode;
    }
}
exports.locateNode = locateNode;
function getBox(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var scrollTop = window.pageYOffset || body.scrollTop;
    var scrollLeft = window.pageXOffset || body.scrollLeft;
    var top = box.top + scrollTop;
    var left = box.left + scrollLeft;
    var right = body.offsetWidth - box.right;
    var bottom = body.offsetHeight - box.bottom;
    var width = box.right - box.left;
    var height = box.bottom - box.top;
    return { top: top, left: left, right: right, bottom: bottom, width: width, height: height };
}
exports.getBox = getBox;
var scrollWidth = -1;
function getScrollbarWidth() {
    if (scrollWidth > -1) {
        return scrollWidth;
    }
    var scrollDiv = document.createElement("div");
    document.body.appendChild(scrollDiv);
    scrollDiv.style.cssText = "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;";
    scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollWidth;
}
exports.getScrollbarWidth = getScrollbarWidth;
function fitPosition(node, config) {
    return calculatePosition(getRealPosition(node), config);
}
exports.fitPosition = fitPosition;
function isIE() {
    var ua = window.navigator.userAgent;
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
}
exports.isIE = isIE;
function getRealPosition(node) {
    var rects = node.getBoundingClientRect();
    return {
        left: rects.left + window.pageXOffset,
        right: rects.right + window.pageXOffset,
        top: rects.top + window.pageYOffset,
        bottom: rects.bottom + window.pageYOffset
    };
}
exports.getRealPosition = getRealPosition;
var Position;
(function (Position) {
    Position["left"] = "left";
    Position["right"] = "right";
    Position["bottom"] = "bottom";
    Position["top"] = "top";
})(Position = exports.Position || (exports.Position = {}));
function calculatePosition(pos, config) {
    var _a = config.mode === Position.bottom || config.mode === Position.top ?
        placeBottomOrTop(pos, config) :
        placeRightOrLeft(pos, config), left = _a.left, top = _a.top;
    return {
        left: left + "px",
        top: top + "px",
        minWidth: config.width + "px",
        position: "absolute"
    };
}
exports.calculatePosition = calculatePosition;
function getWindowBorders() {
    return {
        rightBorder: window.pageXOffset + window.innerWidth,
        bottomBorder: window.pageYOffset + window.innerHeight
    };
}
function horizontalCentering(pos, width, rightBorder) {
    var nodeWidth = pos.right - pos.left;
    var diff = (width - nodeWidth) / 2;
    var left = pos.left - diff;
    var right = pos.right + diff;
    if (left >= 0 && right <= rightBorder) {
        return left;
    }
    if (left < 0) {
        return 0;
    }
    return rightBorder - width;
}
function verticalCentering(pos, height, bottomBorder) {
    var nodeHeight = pos.bottom - pos.top;
    var diff = (height - nodeHeight) / 2;
    var top = pos.top - diff;
    var bottom = pos.bottom + diff;
    if (top >= 0 && bottom <= bottomBorder) {
        return top;
    }
    if (top < 0) {
        return 0;
    }
    return bottomBorder - height;
}
function placeBottomOrTop(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var bottomDiff = bottomBorder - pos.bottom - config.height;
    var topDiff = pos.top - config.height;
    if (config.mode === Position.bottom) {
        if (bottomDiff >= 0) {
            top = pos.bottom;
        }
        else if (topDiff >= 0) {
            top = topDiff;
        }
    }
    else {
        if (topDiff >= 0) {
            top = topDiff;
        }
        else if (bottomDiff >= 0) {
            top = pos.bottom;
        }
    }
    if (bottomDiff < 0 && topDiff < 0) {
        if (config.auto) {
            return placeRightOrLeft(pos, __assign({}, config, { mode: Position.right, auto: false }));
        }
        top = bottomDiff > topDiff ? pos.bottom : topDiff;
    }
    if (config.centering) {
        left = horizontalCentering(pos, config.width, rightBorder);
    }
    else {
        var leftDiff = rightBorder - pos.left - config.width;
        var rightDiff = pos.right - config.width;
        if (leftDiff >= 0) {
            left = pos.left;
        }
        else if (rightDiff >= 0) {
            left = rightDiff;
        }
        else {
            left = rightDiff > leftDiff ? pos.left : rightDiff;
        }
    }
    return { left: left, top: top };
}
function placeRightOrLeft(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var rightDiff = rightBorder - pos.right - config.width;
    var leftDiff = pos.left - config.width;
    if (config.mode === Position.right) {
        if (rightDiff >= 0) {
            left = pos.right;
        }
        else if (leftDiff >= 0) {
            left = leftDiff;
        }
    }
    else {
        if (leftDiff >= 0) {
            left = leftDiff;
        }
        else if (rightDiff >= 0) {
            left = pos.right;
        }
    }
    if (leftDiff < 0 && rightDiff < 0) {
        if (config.auto) {
            return placeRightOrLeft(pos, __assign({}, config, { mode: Position.bottom, auto: false }));
        }
        left = leftDiff > rightDiff ? leftDiff : pos.right;
    }
    if (config.centering) {
        top = verticalCentering(pos, config.width, rightBorder);
    }
    else {
        var bottomDiff = pos.bottom - config.height;
        var topDiff = bottomBorder - pos.top - config.height;
        if (topDiff >= 0) {
            top = pos.top;
        }
        else if (bottomDiff > 0) {
            top = bottomDiff;
        }
        else {
            top = bottomDiff > topDiff ? bottomDiff : pos.top;
        }
    }
    return { left: left, top: top };
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SpreadsheetEvents;
(function (SpreadsheetEvents) {
    SpreadsheetEvents["beforeValueChange"] = "beforeValueChange";
    SpreadsheetEvents["afterValueChange"] = "afterValueChange";
    SpreadsheetEvents["beforeStyleChange"] = "beforeStyleChange";
    SpreadsheetEvents["afterStyleChange"] = "afterStyleChange";
    SpreadsheetEvents["beforeFormatChange"] = "beforeFormatChange";
    SpreadsheetEvents["afterFormatChange"] = "afterFormatChange";
    SpreadsheetEvents["beforeSelectionSet"] = "beforeSelectionSet";
    SpreadsheetEvents["afterSelectionSet"] = "afterSelectionSet";
    SpreadsheetEvents["beforeRowAdd"] = "beforeRowAdd";
    SpreadsheetEvents["afterRowAdd"] = "afterRowAdd";
    SpreadsheetEvents["beforeRowDelete"] = "beforeRowDelete";
    SpreadsheetEvents["afterRowDelete"] = "afterRowDelete";
    SpreadsheetEvents["beforeColumnAdd"] = "beforeColumnAdd";
    SpreadsheetEvents["afterColumnAdd"] = "afterColumnAdd";
    SpreadsheetEvents["beforeColumnDelete"] = "beforeColumnDelete";
    SpreadsheetEvents["afterColumnDelete"] = "afterColumnDelete";
    SpreadsheetEvents["beforeFocusSet"] = "beforeFocusSet";
    SpreadsheetEvents["afterFocusSet"] = "afterFocusSet";
    SpreadsheetEvents["beforeEditStart"] = "beforeEditStart";
    SpreadsheetEvents["afterEditStart"] = "afterEditStart";
    SpreadsheetEvents["beforeEditEnd"] = "beforeEditEnd";
    SpreadsheetEvents["afterEditEnd"] = "afterEditEnd";
    SpreadsheetEvents["groupFill"] = "groupFill";
    // private
    SpreadsheetEvents["editLineInput"] = "editLineInput";
    SpreadsheetEvents["editLineFocus"] = "editLineFocus";
    SpreadsheetEvents["editLineBlur"] = "editLineBlur";
    SpreadsheetEvents["cellInput"] = "cellInput";
    SpreadsheetEvents["gridRedraw"] = "gridRedraw";
})(SpreadsheetEvents = exports.SpreadsheetEvents || (exports.SpreadsheetEvents = {}));
var Actions;
(function (Actions) {
    Actions["setCellStyle"] = "setCellStyle";
    Actions["setCellValue"] = "setCellValue";
    Actions["setCellFormat"] = "setCellFormat";
    Actions["removeCellStyles"] = "removeCellStyles";
    Actions["lockCell"] = "lockCell";
    Actions["deleteRow"] = "deleteRow";
    Actions["addRow"] = "addRow";
    Actions["deleteColumn"] = "deleteColumn";
    Actions["addColumn"] = "addColumn";
    Actions["groupAction"] = "groupAction";
    Actions["groupRowAction"] = "groupRowAction";
    Actions["groupColAction"] = "groupColAction";
})(Actions = exports.Actions || (exports.Actions = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(9);
function getCss(item) {
    var className = "";
    if (item.type !== types_1.ItemType.button && item.size) {
        className += " " + item.size;
    }
    if (item.active) {
        className += " active";
    }
    if (item.$disabled) {
        className += " disabled";
    }
    if (item.css) {
        className += " " + item.css;
    }
    return className;
}
exports.getCss = getCss;
function getButtonCss(item) {
    var className = " ";
    className += item.name === "link" ? "dhx_btn--link" : "dhx_btn--flat";
    className += item.size === "large" ? " dhx_btn--large" : " dhx_btn--small";
    switch (item.usage) {
        case "danger":
            className += " dhx_btn--danger";
            break;
        case "secondary":
            className += " dhx_btn--secondary";
            break;
        case "success":
            className += " dhx_btn--success";
            break;
        case "primary":
        default:
            break;
    }
    return className;
}
exports.getButtonCss = getButtonCss;
function counter(item) {
    if (item.count) {
        return dom_1.el(".counter", item.count);
    }
}
exports.counter = counter;
function icon(iconName) {
    if (iconName === void 0) { iconName = ""; }
    var className = "dhx-icon-block ";
    if (iconName.slice(0, 3) === "dxi") {
        className += "dxi ";
    }
    return dom_1.el("div", {
        class: className + iconName
    });
}
exports.icon = icon;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en = {
    undo: "Undo",
    redo: "Redo",
    textColor: "Text color",
    backgroundColor: "Background color",
    bold: "Bold",
    italic: "Italic",
    lockCell: "Lock cell",
    unlockCell: "Unlock cell",
    format: "Format",
    edit: "Edit",
    clear: "Clear",
    clearValue: "Clear value",
    clearStyles: "Clear styles",
    clearAll: "Clear all",
    insert: "Insert",
    columns: "Columns",
    rows: "Rows",
    addColumn: "Add column",
    removeColumn: "Remove column",
    addRow: "Add row",
    removeRow: "Remove row",
    underline: "Underline",
    align: "Align",
    left: "Left",
    right: "Right",
    center: "Center",
    help: "Help",
    common: "common",
    number: "number",
    currency: "currency",
    percent: "percent",
    downloadAs: "Download as...",
    importAs: "Import as...",
    import: "Import",
    export: "Export",
    file: "File",
    numberFormat: "Number format"
};
exports.default = en;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventSystem = /** @class */ (function () {
    function EventSystem(context) {
        this.events = {};
        this.context = context || this;
    }
    EventSystem.prototype.on = function (name, callback, context) {
        var event = name.toLowerCase();
        this.events[event] = this.events[event] || [];
        this.events[event].push({ callback: callback, context: context || this.context });
    };
    EventSystem.prototype.detach = function (name, context) {
        var event = name.toLowerCase();
        var eStack = this.events[event];
        if (context) {
            for (var i = eStack.length - 1; i >= 0; i--) {
                if (eStack[i].context === context) {
                    eStack.splice(i, 1);
                }
            }
        }
        else {
            this.events[event] = [];
        }
    };
    EventSystem.prototype.fire = function (name, args) {
        if (typeof args === "undefined") {
            args = [];
        }
        var event = name.toLowerCase();
        if (this.events[event]) {
            var res = this.events[event].map(function (e) { return e.callback.apply(e.context, args); });
            return res.indexOf(false) < 0;
        }
        return true;
    };
    return EventSystem;
}());
exports.EventSystem = EventSystem;
function EventsMixin(obj) {
    obj = obj || {};
    var eventSystem = new EventSystem(obj);
    obj.detachEvent = eventSystem.detach.bind(eventSystem);
    obj.attachEvent = eventSystem.on.bind(eventSystem);
    obj.callEvent = eventSystem.fire.bind(eventSystem);
}
exports.EventsMixin = EventsMixin;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var html_1 = __webpack_require__(3);
var View = /** @class */ (function () {
    function View(_container, config) {
        this._uid = core_1.uid();
        this.config = config || {};
    }
    View.prototype.mount = function (container, vnode) {
        if (vnode) {
            this._view = vnode;
        }
        if (container && this._view && this._view.mount) {
            // init view inside of HTML container
            this._container = html_1.toNode(container);
            if (this._container.tagName) {
                this._view.mount(this._container);
            }
            else if (this._container.attach) {
                this._container.attach(this);
            }
        }
    };
    View.prototype.getRootView = function () {
        return this._view;
    };
    View.prototype.paint = function () {
        if (this._view && ( // was mounted
        this._view.node || // already rendered node
            this._container)) { // not rendered, but has container
            this._doNotRepaint = false;
            this._view.redraw();
        }
    };
    return View;
}());
exports.View = View;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(17);
exports.DataEvents = types_1.DataEvents;
var ItemType;
(function (ItemType) {
    ItemType["button"] = "button";
    ItemType["input"] = "input";
    ItemType["separator"] = "separator";
    ItemType["text"] = "text";
    ItemType["iconButton"] = "iconButton";
    ItemType["imageButton"] = "imageButton";
    ItemType["spacer"] = "spacer";
    ItemType["menuItem"] = "menuItem";
    ItemType["imageButtonText"] = "imageButtonText";
    ItemType["block"] = "block";
    ItemType["customHTMLButton"] = "customButton";
    ItemType["selectButton"] = "selectButton";
    ItemType["dhxButton"] = "dhx-button";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
var ToolbarEvents;
(function (ToolbarEvents) {
    ToolbarEvents["inputCreated"] = "inputcreated";
    ToolbarEvents["click"] = "click";
    ToolbarEvents["openMenu"] = "openMenu";
})(ToolbarEvents = exports.ToolbarEvents || (exports.ToolbarEvents = {}));
var NavigationType;
(function (NavigationType) {
    NavigationType["pointer"] = "pointer";
    NavigationType["click"] = "click";
})(NavigationType = exports.NavigationType || (exports.NavigationType = {}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {(function () {
  global = this

  var queueId = 1
  var queue = {}
  var isRunningTask = false

  if (!global.setImmediate)
    global.addEventListener('message', function (e) {
      if (e.source == global){
        if (isRunningTask)
          nextTick(queue[e.data])
        else {
          isRunningTask = true
          try {
            queue[e.data]()
          } catch (e) {}

          delete queue[e.data]
          isRunningTask = false
        }
      }
    })

  function nextTick(fn) {
    if (global.setImmediate) setImmediate(fn)
    // if inside of web worker
    else if (global.importScripts) setTimeout(fn)
    else {
      queueId++
      queue[queueId] = fn
      global.postMessage(queueId, '*')
    }
  }

  Deferred.resolve = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    if (value instanceof Deferred)
      return value

    return new Deferred(function (resolve) {
        resolve(value)
    })
  }

  Deferred.reject = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    return new Deferred(function (resolve, reject) {
        reject(value)
    })
  }

  Deferred.all = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            arr[i] = r
            done()
            return r
          }, done)
      })
    }

    done()

    return d
  }

  Deferred.race = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    if (arr.length == 0)
      return new Deferred()

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            done(null, r)
          }, done)
      })
    }

    done()

    return d
  }

  Deferred._d = 1


  /**
   * @constructor
   */
  function Deferred(resolver) {
    'use strict'
    if (typeof resolver != 'function' && resolver != undefined)
      throw TypeError()

    if (typeof this != 'object' || (this && this.then))
      throw TypeError()

    // states
    // 0: pending
    // 1: resolving
    // 2: rejecting
    // 3: resolved
    // 4: rejected
    var self = this,
      state = 0,
      val = 0,
      next = [],
      fn, er;

    self['promise'] = self

    self['resolve'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 1

        nextTick(fire)
      }
      return self
    }

    self['reject'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 2

        nextTick(fire)

      }
      return self
    }

    self['_d'] = 1

    self['then'] = function (_fn, _er) {
      if (!(this._d == 1))
        throw TypeError()

      var d = new Deferred()

      d.fn = _fn
      d.er = _er
      if (state == 3) {
        d.resolve(val)
      }
      else if (state == 4) {
        d.reject(val)
      }
      else {
        next.push(d)
      }

      return d
    }

    self['catch'] = function (_er) {
      return self['then'](null, _er)
    }

    var finish = function (type) {
      state = type || 4
      next.map(function (p) {
        state == 3 && p.resolve(val) || p.reject(val)
      })
    }

    try {
      if (typeof resolver == 'function')
        resolver(self['resolve'], self['reject'])
    } catch (e) {
      self['reject'](e)
    }

    return self

    // ref : reference to 'then' function
    // cb, ec, cn : successCallback, failureCallback, notThennableCallback
    function thennable (ref, cb, ec, cn) {
      // Promises can be rejected with other promises, which should pass through
      if (state == 2) {
        return cn()
      }
      if ((typeof val == 'object' || typeof val == 'function') && typeof ref == 'function') {
        try {

          // cnt protects against abuse calls from spec checker
          var cnt = 0
          ref.call(val, function (v) {
            if (cnt++) return
            val = v
            cb()
          }, function (v) {
            if (cnt++) return
            val = v
            ec()
          })
        } catch (e) {
          val = e
          ec()
        }
      } else {
        cn()
      }
    };

    function fire() {

      // check if it's a thenable
      var ref;
      try {
        ref = val && val.then
      } catch (e) {
        val = e
        state = 2
        return fire()
      }

      thennable(ref, function () {
        state = 1
        fire()
      }, function () {
        state = 2
        fire()
      }, function () {
        try {
          if (state == 1 && typeof fn == 'function') {
            val = fn(val)
          }

          else if (state == 2 && typeof er == 'function') {
            val = er(val)
            state = 1
          }
        } catch (e) {
          val = e
          return finish()
        }

        if (val == self) {
          val = TypeError()
          finish()
        } else thennable(ref, function () {
            finish(3)
          }, finish, function () {
            finish(state == 1 && 3)
          })

      })
    }


  }

  // Export our library object, either for node.js or as a globally scoped variable
  if (true) {
    module['exports'] = Deferred
  } else {}
})()

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(29), __webpack_require__(46).setImmediate))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(12));
__export(__webpack_require__(33));
__export(__webpack_require__(36));
__export(__webpack_require__(63));
__export(__webpack_require__(18));
__export(__webpack_require__(13));
__export(__webpack_require__(34));
__export(__webpack_require__(35));
__export(__webpack_require__(65));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(17);
exports.DataEvents = types_1.DataEvents;
exports.DragBehaviour = types_1.DragBehaviour;
exports.DragMode = types_1.DragMode;
var TreeFilterType;
(function (TreeFilterType) {
    TreeFilterType[TreeFilterType["all"] = 1] = "all";
    TreeFilterType[TreeFilterType["specific"] = 2] = "specific";
    TreeFilterType[TreeFilterType["leafs"] = 3] = "leafs";
})(TreeFilterType = exports.TreeFilterType || (exports.TreeFilterType = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataproxy_1 = __webpack_require__(18);
var CsvDriver_1 = __webpack_require__(34);
var JsonDriver_1 = __webpack_require__(35);
function isEqualObj(a, b) {
    for (var key in a) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
exports.isEqualObj = isEqualObj;
function naturalCompare(a, b) {
    var ax = [];
    var bx = [];
    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]); });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]); });
    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) {
            return nn;
        }
    }
    return ax.length - bx.length;
}
exports.naturalCompare = naturalCompare;
function findByConf(item, conf) {
    if (typeof conf === "function") {
        if (conf.call(this, item)) {
            return item;
        }
    }
    else if (conf.by && conf.match) {
        if (item[conf.by] === conf.match) {
            return item;
        }
    }
}
exports.findByConf = findByConf;
function isDebug() {
    var dhx = window.dhx;
    if (typeof dhx !== "undefined") {
        return typeof (dhx.debug) !== "undefined" && dhx.debug;
    }
    // return typeof DHX_DEBUG_MODE !== "undefined" && DHX_DEBUG_MODE;
}
exports.isDebug = isDebug;
function dhxWarning(msg) {
    // tslint:disable-next-line:no-console
    console.warn(msg);
}
exports.dhxWarning = dhxWarning;
function dhxError(msg) {
    throw new Error(msg);
}
exports.dhxError = dhxError;
function toProxy(proxy) {
    var type = typeof proxy;
    if (type === "string") {
        return new dataproxy_1.DataProxy(proxy);
    }
    else if (type === "object") {
        return proxy;
    }
}
exports.toProxy = toProxy;
function toDataDriver(driver) {
    var type = typeof driver;
    if (type === "string") {
        switch (driver) {
            case "csv":
                return new CsvDriver_1.CsvDriver();
            case "json":
                return new JsonDriver_1.JsonDriver();
            default:
                // tslint:disable-next-line:no-console
                console.warn("incorrect driver type", driver);
                break;
        }
    }
    else if (typeof driver === "object") {
        return driver;
    }
}
exports.toDataDriver = toDataDriver;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function insert(node, newone) {
    if (typeof newone === "string") {
        node.insertAdjacentHTML("beforeend", newone);
        return node.lastChild;
    }
    else {
        node.appendChild(newone);
        return newone;
    }
}
//[todo]
function rgbToHex(color) {
    if (color.substr(0, 1) === "#") {
        return color;
    }
    var digits = /(.*?)rgb[a]?\((\d+), *(\d+), *(\d+),* *([\d]*)\)/.exec(color);
    if (!digits) {
        return "";
    }
    var red = parseInt(digits[2], 10).toString(16);
    var green = parseInt(digits[3], 10).toString(16);
    var blue = parseInt(digits[4], 10).toString(16);
    return "#" + red + green + blue;
}
exports.rgbToHex = rgbToHex;
function transpose(arr, transform) {
    var columns = [];
    for (var i = 0; i < arr.length; i++) {
        var row = arr[i];
        for (var cellInd = 0; cellInd < row.length; cellInd++) {
            columns[cellInd] = columns[cellInd] || [];
            var cell = transform ? transform(row[cellInd]) : row[cellInd];
            columns[cellInd].push(cell);
        }
    }
    return columns;
}
exports.transpose = transpose;
function getStrWidth(str, font) {
    if (font === void 0) { font = "14px Arial"; }
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = font;
    return Math.round(ctx.measureText(str).width);
}
exports.getStrWidth = getStrWidth;
function getStyleByClass(cssClass, container, targetClass, def) {
    var cont = container.querySelector("." + targetClass);
    var testDiv = insert(cont, "<div class=\"" + cssClass + "\"></div>");
    var styles = window.getComputedStyle(testDiv);
    var result = {
        color: styles.color === "rgb(0, 0, 0)" ? def.color : rgbToHex(styles.color),
        background: styles.backgroundColor === "rgba(0, 0, 0, 0)" ? def.background : rgbToHex(styles.backgroundColor),
        fontSize: parseFloat(styles.fontSize)
    };
    cont.removeChild(testDiv);
    // [dirty]
    if (result.color === def.color
        && result.background === def.background
        && result.fontSize === def.fontSize) {
        return null;
    }
    return result;
}
exports.getStyleByClass = getStyleByClass;
function removeHTMLTags(str) {
    return ("" + (str || "")).replace(/<[^>]*>/g, "").replace(/[\"]/g, "&quot;").trim();
}
exports.removeHTMLTags = removeHTMLTags;
function isCssSupport(property, value) {
    try {
        return CSS.supports(property, value);
    }
    catch (err) {
        var el = document.createElement("div");
        el.style[property] = value;
        return el.style[property] === value;
    }
}
exports.isCssSupport = isCssSupport;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
function getHeaderCell(letter, index) {
    return "<div class=\"dhx_custom_header_cell\">" + letter + "\n\t<div class=\"dhx_resizer_grip_wrap\">\n\t\t\t<div class=\"dhx_resizer_grip\" dhx_id=" + index + ">\n\t\t\t\t<div class=\"dhx_resizer_grip_line\"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t</div>";
}
exports.getHeaderCell = getHeaderCell;
function updateColumns(config) {
    var columns = config.columns;
    var totalWidth = 0;
    columns.map(function (col, i) {
        col.width = col.width || 120;
        totalWidth += col.width;
        if (col.id !== "$index") {
            var letter = main_1.getLetterFromNumber(i);
            col.header = [{
                    text: getHeaderCell(letter, i),
                    css: ""
                }];
            col.$letter = letter;
        }
    });
    config.$totalWidth = totalWidth;
}
exports.updateColumns = updateColumns;
function updateRowsIndex(data) {
    data.map(function (row, i) {
        row.$index = i + 1;
    });
}
exports.updateRowsIndex = updateRowsIndex;
function removeRowsCss(grid) {
    grid.data.map(function (row) {
        grid.removeRowCss(row.id, "dhx_selected_row");
    });
}
exports.removeRowsCss = removeRowsCss;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var en_1 = __webpack_require__(6);
var config = {};
var defaultFormats = [];
var separators = { decimal: ".", thousands: "," };
var currency = "$";
function initFormat(spreadsheet) {
    config = spreadsheet.config;
    defaultFormats = [
        { name: en_1.default.common, id: "common", mask: "", example: "2702.31" },
        { name: en_1.default.number, id: "number", mask: "#,##0.00", example: "2702.31" },
        { name: en_1.default.percent, id: "percent", mask: "#,##0.00%", example: "27.0231" },
        { name: en_1.default.currency, id: "currency", mask: "$#,##0.00", example: "2702.31" }
    ];
    config.formats.forEach(function (f) {
        var ind = core_1.findIndex(defaultFormats, function (df) { return df.id === f.id; });
        if (ind >= 0) {
            defaultFormats[ind] = f;
        }
        else {
            defaultFormats.push(f);
        }
    });
    var numberFormatRule = getFormatRule(getFormat("number").mask);
    separators = { decimal: numberFormatRule.decimalSeparator, thousands: numberFormatRule.thousandsSeparator };
    var currencyFormatRule = getFormatRule(getFormat("currency").mask);
    currency = currencyFormatRule.currency || currency;
    config.formats = defaultFormats;
    setDefaultFormats();
}
exports.initFormat = initFormat;
function getDefaultFormats() {
    return defaultFormats;
}
exports.getDefaultFormats = getDefaultFormats;
function getFormat(id) {
    return defaultFormats[core_1.findIndex(defaultFormats, function (f) { return f.id === id; })];
}
exports.getFormat = getFormat;
function getDefaultFormatsMap() {
    return defaultFormats.reduce(function (acc, f) {
        acc[f.mask] = f.id;
        return acc;
    }, {});
}
exports.getDefaultFormatsMap = getDefaultFormatsMap;
function isNumeric(val) {
    return !isNaN(val - parseFloat(val));
}
exports.isNumeric = isNumeric;
function getPureNumber(val) {
    var isPercent = typeof val === "string" && val.indexOf("%") > -1;
    var num = parseFloat(("" + val).replace(/[^.\d]/g, ""));
    return isPercent ? num / 100 : num;
}
exports.getPureNumber = getPureNumber;
function getCleanValue(val) {
    var separatorsObj = getSeparators();
    var cur = getCurrencySymbol();
    return ("" + val)
        .replace(new RegExp("[" + separatorsObj.thousands + cur + "%s ]", "g"), "")
        .replace(new RegExp("[" + separatorsObj.decimal + "]", "g"), ".");
}
exports.getCleanValue = getCleanValue;
function getCurrencySymbol() {
    return "$";
}
function getSeparators() {
    return separators;
}
function getUnformattedValue(val, format) {
    if (format === "common") {
        return val;
    }
    var clean = getCleanValue(val);
    if (format === "percent") {
        return (parseFloat(clean) / 100).toFixed(4);
    }
    return clean;
}
exports.getUnformattedValue = getUnformattedValue;
function detectCellFormat(val) {
    var currencySymbol = getCurrencySymbol();
    var isNumber = isNumeric(getCleanValue(val));
    if (!isNumber) {
        return "";
    }
    var stringVal = "" + val;
    var percentInd = stringVal.indexOf("%");
    var currInd = stringVal.indexOf(currencySymbol);
    var isPercent = percentInd === 0 || percentInd === stringVal.length - 1;
    var isCurrency = currInd === 0;
    if (isPercent) {
        return getFormat("percent").mask;
    }
    if (isCurrency) {
        return getFormat("currency").mask;
    }
    return getFormat("number").mask;
}
exports.detectCellFormat = detectCellFormat;
var currencyRegex = "(\\[\\$[\\w\\W]*?\\]|[\\$]{0,1})";
var pureCurrency = "\\[\\$([\\w\\W]*?)\\]|(\\$)"; // custom currency - [$EUR]#,##0.00
var sep = "([,. ]{0,1})";
var percent = "([%]{0,1})";
var allDigits = "([#0]*)";
var formatRegex = new RegExp("" + currencyRegex + allDigits + sep + allDigits + sep + allDigits + percent + currencyRegex);
var pureCurrencyRegex = new RegExp(pureCurrency);
function _partsToObj(parts) {
    return {
        currencyBefore: parts[1],
        digits: parts[2],
        thousandsSeparator: parts[3],
        optionalDigits: parts[4],
        decimalSeparator: parts[5],
        decimalDigits: parts[6],
        percent: parts[7],
        currencyAfter: parts[8],
        decimalLength: 0
    };
}
var formats = {};
function getFormatRule(format) {
    if (!format || typeof format !== "string") {
        return;
    }
    if (formats[format]) {
        return formats[format];
    }
    var parts = format.match(formatRegex);
    var rule = _partsToObj(parts);
    if (!rule.decimalSeparator && rule.thousandsSeparator) {
        rule.decimalSeparator = rule.thousandsSeparator;
        rule.decimalDigits = rule.optionalDigits;
        rule.thousandsSeparator = "";
        rule.optionalDigits = "";
    }
    if (rule.currencyBefore) {
        var m = rule.currencyBefore.match(pureCurrencyRegex);
        rule.currencyBefore = m[1] || m[2];
    }
    if (rule.currencyAfter) {
        var m = rule.currencyAfter.match(pureCurrencyRegex);
        rule.currencyAfter = m[1] || m[2];
    }
    if (rule.percent) {
        rule.currencyBefore = "";
        rule.currencyAfter = "";
    }
    rule.decimalLength = rule.decimalDigits ? rule.decimalDigits.split("0").length - 1 : rule.decimalLength;
    formats[format] = rule;
    return rule;
}
function setDefaultFormats() {
    defaultFormats.forEach(function (format) {
        getFormatRule(format.mask);
    });
}
function getFormattedValue(val, format) {
    if (!format) {
        return val;
    }
    var rule = getFormatRule(format);
    return formatByRule(val, rule);
}
exports.getFormattedValue = getFormattedValue;
function formatByRule(val, rule) {
    if (!rule) {
        return val;
    }
    if (!isNumeric(val)) {
        return val;
    }
    var formattedVal = "";
    if (rule.currencyBefore) {
        formattedVal += rule.currencyBefore;
    }
    var num = parseFloat(val);
    var isNegative = num < 0;
    if (isNegative) {
        num = Math.abs(num);
    }
    if (rule.percent) {
        num *= 100;
    }
    formattedVal += numberWithSeparators(num.toFixed(rule.decimalLength), rule.thousandsSeparator, rule.decimalSeparator);
    formattedVal += rule.percent;
    if (rule.currencyAfter) {
        formattedVal += rule.currencyAfter;
    }
    if (isNegative) {
        formattedVal = "-" + formattedVal;
    }
    return formattedVal;
}
function numberWithSeparators(val, thousand, decimal) {
    if (thousand === void 0) { thousand = ""; }
    var parts = val.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
    return parts.join(decimal);
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataEvents;
(function (DataEvents) {
    DataEvents["afterAdd"] = "afteradd";
    DataEvents["beforeAdd"] = "beforeadd";
    DataEvents["removeAll"] = "removeall";
    DataEvents["beforeRemove"] = "beforeremove";
    DataEvents["afterRemove"] = "afterremove";
    DataEvents["change"] = "change";
    DataEvents["load"] = "load";
})(DataEvents = exports.DataEvents || (exports.DataEvents = {}));
var DragEvents;
(function (DragEvents) {
    DragEvents["beforeDrag"] = "beforedrag";
    DragEvents["beforeDrop"] = "beforeDrop";
    DragEvents["dragStart"] = "dragstart";
    DragEvents["dragEnd"] = "dragend";
    DragEvents["canDrop"] = "candrop";
    DragEvents["cancelDrop"] = "canceldrop";
    DragEvents["dropComplete"] = "dropcomplete";
    DragEvents["dragOut"] = "dragOut";
    DragEvents["dragIn"] = "dragIn";
})(DragEvents = exports.DragEvents || (exports.DragEvents = {}));
var DragMode;
(function (DragMode) {
    DragMode["target"] = "target";
    DragMode["both"] = "both";
    DragMode["source"] = "source";
})(DragMode = exports.DragMode || (exports.DragMode = {}));
var DragBehaviour;
(function (DragBehaviour) {
    DragBehaviour["child"] = "child";
    DragBehaviour["sibling"] = "sibling";
    DragBehaviour["complex"] = "complex";
})(DragBehaviour = exports.DragBehaviour || (exports.DragBehaviour = {}));
var SelectionEvents;
(function (SelectionEvents) {
    SelectionEvents["beforeUnSelect"] = "beforeunselect";
    SelectionEvents["afterUnSelect"] = "afterunselect";
    SelectionEvents["beforeSelect"] = "beforeselect";
    SelectionEvents["afterSelect"] = "afterselect";
})(SelectionEvents = exports.SelectionEvents || (exports.SelectionEvents = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var DataProxy = /** @class */ (function () {
    function DataProxy(url) {
        this.url = url;
    }
    DataProxy.prototype.load = function () {
        return this._ajax(this.url);
    };
    DataProxy.prototype.save = function (data, mode) {
        var modes = {
            insert: "POST",
            delete: "DELETE",
            update: "POST"
        };
        return this._ajax(this.url, data, modes[mode] || "POST");
    };
    DataProxy.prototype._ajax = function (url, data, method) {
        if (method === void 0) { method = "GET"; }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response || xhr.responseText);
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");
            switch (method) {
                case "POST":
                case "DELETE":
                case "PUT":
                    xhr.send(JSON.stringify(data));
                    break;
                case "GET":
                    xhr.send();
                    break;
                default:
                    xhr.send();
                    break;
            }
        });
    };
    return DataProxy;
}());
exports.DataProxy = DataProxy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GridEvents;
(function (GridEvents) {
    GridEvents["sort"] = "sort";
    GridEvents["expand"] = "expand";
    GridEvents["headerInput"] = "headerInput";
    GridEvents["cellClick"] = "cellClick";
    GridEvents["cellRightClick"] = "cellRightClick";
    GridEvents["cellMouseOver"] = "cellMouseOver";
    GridEvents["cellMouseDown"] = "cellMouseDown";
    GridEvents["cellDblClick"] = "cellDblClick";
    GridEvents["headerCellClick"] = "headerCellClick";
    GridEvents["footerCellClick"] = "footerCellClick";
    GridEvents["headerCellMouseOver"] = "headerCellMouseOver";
    GridEvents["footerCellMouseOver"] = "footerCellMouseOver";
    GridEvents["headerCellMouseDown"] = "headerCellMouseDown";
    GridEvents["footerCellMouseDown"] = "footerCellMouseDown";
    GridEvents["headerCellDblClick"] = "headerCellDblClick";
    GridEvents["footerCellDblClick"] = "footerCellDblClick";
})(GridEvents = exports.GridEvents || (exports.GridEvents = {}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(40));
__export(__webpack_require__(87));
__export(__webpack_require__(88));
__export(__webpack_require__(89));
__export(__webpack_require__(24));
__export(__webpack_require__(9));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getRealPosition(node) {
    var rects = node.getBoundingClientRect();
    return {
        left: rects.left + window.pageXOffset,
        right: rects.right + window.pageXOffset,
        top: rects.top + window.pageYOffset,
        bottom: rects.bottom + window.pageYOffset
    };
}
exports.getRealPosition = getRealPosition;
function calculatePosition(pos, config) {
    var rightBorder = window.pageXOffset + window.innerWidth;
    var bottomBorder = window.pageYOffset + window.innerHeight;
    var style = {
        left: null,
        top: null,
        minWidth: config.width + "px",
        position: "absolute"
    };
    if (config.mode === "bottom") {
        if (pos.left + config.width > rightBorder) {
            style.left = pos.left - config.width + "px";
        }
        else {
            style.left = pos.left + "px";
        }
        if (pos.bottom + config.height > bottomBorder) {
            style.top = pos.top - config.height + "px";
        }
        else {
            style.top = pos.bottom + "px";
        }
    }
    else {
        if (pos.right + config.width > rightBorder) {
            style.left = pos.left - config.width + "px";
        }
        else {
            style.left = pos.right + "px";
        }
        if (pos.top + config.height > bottomBorder) {
            style.top = pos.bottom - config.height + "px";
        }
        else {
            style.top = pos.top + "px";
        }
    }
    return style;
}
exports.calculatePosition = calculatePosition;
function addInGroups(groups, item) {
    if (groups[item.group]) {
        if (item.active) {
            groups[item.group].active = item.id;
        }
        groups[item.group].elements.push(item.id);
    }
    else {
        groups[item.group] = {
            active: item.active ? item.id : null,
            elements: [item.id]
        };
    }
}
exports.addInGroups = addInGroups;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var AddColumn_1 = __webpack_require__(90);
var AddRow_1 = __webpack_require__(91);
var DeleteColumn_1 = __webpack_require__(92);
var DeleteRow_1 = __webpack_require__(93);
var GroupAction_1 = __webpack_require__(94);
var GroupColAction_1 = __webpack_require__(95);
var GroupRowAction_1 = __webpack_require__(96);
var LockCell_1 = __webpack_require__(97);
var RemoveCellStyles_1 = __webpack_require__(98);
var SetCellFormat_1 = __webpack_require__(99);
var SetCellStyle_1 = __webpack_require__(100);
var SetCellValue_1 = __webpack_require__(101);
exports.actions = {
    setCellStyle: SetCellStyle_1.SetCellStyle,
    setCellValue: SetCellValue_1.SetCellValue,
    setCellFormat: SetCellFormat_1.SetCellFormat,
    removeCellStyles: RemoveCellStyles_1.RemoveCellStyles,
    lockCell: LockCell_1.LockCell,
    deleteRow: DeleteRow_1.DeleteRow,
    addRow: AddRow_1.AddRow,
    deleteColumn: DeleteColumn_1.DeleteColumn,
    addColumn: AddColumn_1.AddColumn,
    groupAction: GroupAction_1.GroupAction,
    groupRowAction: GroupRowAction_1.GroupRowAction,
    groupColAction: GroupColAction_1.GroupColAction
};
function getActionsPack(commandsPack, baseConfig) {
    var actionsPack = commandsPack.map(function (config) {
        var action = config.groupAction || config.action;
        if (action) {
            return new exports.actions[action](__assign({}, config, baseConfig));
        }
    });
    return {
        do: function () {
            actionsPack.map(function (action) { return action.do(); });
        },
        undo: function () {
            actionsPack.map(function (action) { return action.undo(); });
        }
    };
}
var ActionsManager = /** @class */ (function () {
    function ActionsManager(config) {
        this._config = config;
        this._actions = [];
        this._redoActions = [];
    }
    ActionsManager.prototype.execute = function (command, config) {
        if (Array.isArray(command)) {
            var actionsPack = getActionsPack(command, this._config);
            actionsPack.do();
            this._actions.push(actionsPack);
            return;
        }
        core_1.extend(config, this._config);
        if (exports.actions[command]) {
            var action = new exports.actions[command](config);
            action.do();
            this._actions.push(action);
        }
    };
    ActionsManager.prototype.undo = function () {
        var action = this._actions.pop();
        if (action) {
            action.undo();
            this._redoActions.push(action);
        }
    };
    ActionsManager.prototype.redo = function () {
        var action = this._redoActions.pop();
        if (action) {
            action.do();
            this._actions.push(action);
        }
    };
    return ActionsManager;
}());
exports.ActionsManager = ActionsManager;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_toolbar_1 = __webpack_require__(20);
var en_1 = __webpack_require__(6);
var format_1 = __webpack_require__(16);
var main_1 = __webpack_require__(1);
function getColorpickerTemplate(color, type) {
    return "<div class=\"dxi dhx_button__icon dxi-format-color-" + type + " dhx_spreadsheet_colorpicker\" style=\"border-color: " + color + "\"></div>";
}
exports.getColorpickerTemplate = getColorpickerTemplate;
function updateToolbar(toolbar, cellInfo) {
    cellInfo = __assign({ locked: false, format: "common" }, cellInfo);
    var styles = __assign({ "color": "#4C4C4C", "background": "#FFF", "text-align": "left", "font-style": "", "font-weight": "", "text-decoration": "" }, dhx.css.get(cellInfo.css));
    var updateStyles = function (css) {
        for (var key in css) {
            switch (key) {
                case "color":
                    toolbar.data.update(key, {
                        html: getColorpickerTemplate(css[key] || "#4C4C4C", "text")
                    });
                    break;
                case "background":
                    toolbar.data.update(key, {
                        html: getColorpickerTemplate(css[key] || "#FFF", "fill")
                    });
                    break;
                case "text-align":
                    toolbar.data.update("align-left", { active: css[key] === "left" });
                    toolbar.data.update("align-right", { active: css[key] === "right" });
                    toolbar.data.update("align-center", { active: css[key] === "center" });
                    break;
                case "font-weight":
                    toolbar.data.update("font-weight-bold", { active: css[key] === "bold" });
                    break;
                case "font-style":
                    toolbar.data.update("font-style-italic", { active: css[key] === "italic" });
                    break;
                case "text-decoration":
                    toolbar.data.update("text-decoration-underline", { active: css[key] === "underline" });
                    break;
                default:
                    break;
            }
        }
    };
    updateStyles(styles);
    // reset format menu state
    var formatItem = toolbar.data.getItem("format");
    if (formatItem) {
        formatItem.childs.map(function (item) { return item.active = false; });
    }
    for (var key in cellInfo) {
        switch (key) {
            case "locked":
                if (toolbar.data.getItem("lock")) {
                    toolbar.data.update("lock", {
                        active: cellInfo[key]
                    });
                }
                break;
            case "format":
                var id = format_1.getDefaultFormatsMap()[cellInfo[key]] || "common";
                var format = format_1.getFormat(id);
                toolbar.data.update("format", {
                    value: format.name || id
                });
                if (toolbar.data.getItem(id)) {
                    toolbar.data.update(id, {
                        active: true
                    });
                }
                break;
            default:
                break;
        }
    }
}
exports.updateToolbar = updateToolbar;
function getToggledValue(grid, cell, name, value) {
    var info = main_1.getCellInfo(grid, cell);
    var css = dhx.css.get(info.css) || {};
    return css[name] ? "" : value;
}
exports.getToggledValue = getToggledValue;
function getFormatItem(name, mask, example) {
    if (example === void 0) { example = "2702.31"; }
    var val = format_1.getFormattedValue(example, mask);
    return "<div class=\"dhx_format-item\"><span class=\"dhx_format-name\">" + (en_1.default[name] || name) + " </span><span class=\"dhx_format-helper\">(" + val + ")</span></div>";
}
exports.getFormatItem = getFormatItem;
function getFormatsDropdown(config) {
    var formats = config.formats;
    return formats.map(function (format) { return ({
        id: format.id,
        type: ts_toolbar_1.ItemType.customHTMLButton,
        css: "dhx_format-name-wrap",
        html: getFormatItem(format.name, format.mask, format.example)
    }); });
}
exports.getFormatsDropdown = getFormatsDropdown;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(75);
var customHTMLButton_1 = __webpack_require__(76);
var dhx_button_1 = __webpack_require__(77);
var iconButton_1 = __webpack_require__(78);
var imageButton_1 = __webpack_require__(79);
var imageButtonText_1 = __webpack_require__(80);
var input_1 = __webpack_require__(81);
var menuItem_1 = __webpack_require__(82);
var separator_1 = __webpack_require__(83);
var spacer_1 = __webpack_require__(84);
var text_1 = __webpack_require__(85);
var types_1 = __webpack_require__(9);
function itemfactory(item, events) {
    if (item.$hidden) {
        return null;
    }
    switch (item.type) {
        case types_1.ItemType.button:
            return button_1.button(item);
        case types_1.ItemType.text:
            return text_1.text(item);
        case types_1.ItemType.separator:
            return separator_1.separator(item);
        case types_1.ItemType.spacer:
            return spacer_1.spacer(item);
        case types_1.ItemType.input:
            return input_1.input(item, events);
        case types_1.ItemType.imageButton:
            return imageButton_1.imageButton(item);
        case types_1.ItemType.iconButton:
            return iconButton_1.iconButton(item);
        case types_1.ItemType.selectButton:
        case types_1.ItemType.menuItem:
            return menuItem_1.menuItem(item);
        case types_1.ItemType.imageButtonText:
            return imageButtonText_1.imageButtonText(item);
        case types_1.ItemType.customHTMLButton:
            return customHTMLButton_1.customHTMLButton(item);
        case types_1.ItemType.dhxButton:
            return dhx_button_1.dhx_button(item);
        case types_1.ItemType.block:
        default:
            throw new Error("unknown item type");
    }
}
exports.itemfactory = itemfactory;
function createFactory(defaultType, forbiddenTypes) {
    if (forbiddenTypes === void 0) { forbiddenTypes = []; }
    var forbidden = {};
    forbiddenTypes.forEach(function (type) { return forbidden[type] = true; });
    return function (item, events) {
        item.type = item.type || defaultType;
        if (forbidden[item.type]) {
            item.type = defaultType;
        }
        return itemfactory(item, events);
    };
}
exports.createFactory = createFactory;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var hotkeys_1 = __webpack_require__(86);
var html_1 = __webpack_require__(3);
var view_1 = __webpack_require__(8);
var ts_data_1 = __webpack_require__(11);
var helper_1 = __webpack_require__(21);
var itemfactory_1 = __webpack_require__(24);
var types_1 = __webpack_require__(9);
var MenuBase = /** @class */ (function (_super) {
    __extends(MenuBase, _super);
    function MenuBase(element, config) {
        var _this = _super.call(this, element, core_1.extend({
            popupWidth: 175,
            popupHeight: 36
        }, config)) || this;
        _this._isContextMenu = false;
        _this._documentHaveListener = false;
        _this.events = new events_1.EventSystem();
        _this.data = new ts_data_1.TreeCollection({}, _this.events);
        _this._documentClick = function (e) {
            if (html_1.locate(e, "dhx_widget_id") !== _this._uid && _this._documentHaveListener) {
                document.removeEventListener("click", _this._documentClick);
                _this._documentHaveListener = false;
                _this._close();
            }
        };
        _this._currentRoot = _this.data.getRoot();
        _this._factory = itemfactory_1.createFactory(types_1.ItemType.menuItem);
        _this._init();
        _this._initHandlers();
        _this._initEvents();
        return _this;
    }
    MenuBase.prototype.paint = function () {
        _super.prototype.paint.call(this);
        this._vpopups.redraw();
    };
    MenuBase.prototype.disable = function (ids) {
        this._setProp(ids, "$disabled", true);
    };
    MenuBase.prototype.enable = function (ids) {
        this._setProp(ids, "$disabled", false);
    };
    MenuBase.prototype.show = function (ids) {
        this._setProp(ids, "$hidden", false);
    };
    MenuBase.prototype.hide = function (ids) {
        this._setProp(ids, "$hidden", true);
    };
    MenuBase.prototype.destructor = function () {
        hotkeys_1.keyManager.removeHotKey(null, this);
    };
    MenuBase.prototype._close = function () {
        if (this.config.navigationType === types_1.NavigationType.click) {
            this._isActive = false;
        }
        clearTimeout(this._currentTimeout);
        this._activeMenu = null;
        this.paint();
    };
    MenuBase.prototype._init = function () {
        var _this = this;
        var render = function () { return dom_1.el("div", __assign({ dhx_widget_id: _this._uid, class: "menu-popups" + (_this._isContextMenu ? " context-menu" : "") }, _this._handlers), _this._drawPopups()); };
        this._vpopups = dom_1.create({
            render: render
        });
        this._vpopups.mount(document.body);
    };
    MenuBase.prototype._initHandlers = function () {
        var _this = this;
        /*
            for navigation type click:
            first click open menu, _isActive = true
            after navigation use mousemove
            can be closed after outer click or menu leaf item click
        */
        this._isActive = this.config.navigationType !== types_1.NavigationType.click;
        this._handlers = {
            onmousemove: function (e) {
                if (!_this._isActive) {
                    return;
                }
                var elem = html_1.locateNode(e);
                if (!elem) {
                    _this._activeItemChange(null);
                    return;
                }
                var id = elem.getAttribute("dhx_id");
                if (_this._activeMenu !== id) {
                    _this._activeMenu = id;
                    if (_this.data.haveChilds(id)) {
                        var position = helper_1.getRealPosition(elem);
                        _this.data.update(id, { $position: position }, false);
                    }
                    _this._activeItemChange(id);
                }
            },
            onmouseleave: function () {
                if (_this.config.navigationType !== types_1.NavigationType.click) { // maybe all time when mouse leave close menu
                    _this._activeItemChange(null);
                }
            },
            onclick: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                switch (item.type) {
                    case types_1.ItemType.selectButton:
                    case types_1.ItemType.menuItem:
                        if (id === _this._currentRoot) {
                            _this._close();
                            return;
                        }
                        if (!_this._isActive) {
                            _this._isActive = true;
                        }
                        _this._setRoot(id);
                        _this._activeMenu = id;
                        if (_this.data.haveChilds(id)) {
                            var position = helper_1.getRealPosition(element);
                            _this.data.update(id, { $position: position }, false);
                            _this._activeItemChange(id);
                        }
                        else {
                            _this._onMenuItemClick(id, e);
                        }
                        break;
                    case types_1.ItemType.dhxButton:
                    case types_1.ItemType.imageButtonText:
                    case types_1.ItemType.iconButton:
                    case types_1.ItemType.imageButton:
                    case types_1.ItemType.button:
                    case types_1.ItemType.customHTMLButton:
                        _this._onMenuItemClick(id, e);
                        break;
                    case types_1.ItemType.separator:
                    case types_1.ItemType.input:
                    case types_1.ItemType.text:
                    case types_1.ItemType.spacer:
                        _this._close();
                    default:
                        return;
                }
            }
        };
    };
    MenuBase.prototype._initEvents = function () {
        var _this = this;
        var timeout = null;
        this.data.events.on(types_1.DataEvents.change, function () {
            _this.paint();
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                _this._normalizeData();
                _this._resetHotkeys();
                timeout = null;
                _this.paint();
            }, 100);
        });
        this.events.on(types_1.ToolbarEvents.click, function (id) {
            var item = _this.data.getItem(id);
            var parent = _this.data.getItem(item.parent);
            if (parent && parent.type === types_1.ItemType.selectButton) {
                _this.data.update(item.parent, { value: item.value, icon: item.icon });
            }
            if (item.group) {
                var group = _this._groups[item.group];
                if (group.active) {
                    _this.data.update(group.active, { active: false });
                }
                group.active = item.id;
                _this.data.update(item.id, { active: true });
            }
        });
    };
    MenuBase.prototype._drawPopups = function () {
        var _this = this;
        var id = this._activeMenu;
        if (!this._isContextMenu && !id) {
            return null;
        }
        var root = this._currentRoot;
        if (this._isContextMenu && !this._activePosition) {
            return null;
        }
        var parentIds = this._getParents(id, root);
        return parentIds.map(function (itemId) {
            if (!_this.data.haveChilds(itemId)) {
                return null;
            }
            var item = _this.data.getItem(itemId) || {}; // for root item
            var count = 0;
            var separators = 0;
            _this.data.eachChild(itemId, function (child) {
                if (child.$hidden) {
                    return;
                }
                if (child.type === "separator" || child.separator) {
                    separators++;
                }
                else {
                    count++;
                }
            }, false);
            var width = item.width || _this.config.popupWidth;
            var position;
            var height;
            if (_this._isContextMenu && _this._activePosition && itemId === root) {
                position = _this._activePosition;
                height = _this.config.popupHeight * count + separators * 5;
            }
            else {
                position = item.$position;
                height = (position.bottom - position.top) * count + separators * 5; // separator 5px
            }
            var mode = _this._getMode(item, root, position === _this._activePosition);
            return dom_1.el("div", {
                class: "dhx_widget menu-popup",
                style: helper_1.calculatePosition(position, { mode: mode, width: width, height: height })
            }, _this._drawMenuItems(itemId));
        }).reverse();
    };
    MenuBase.prototype._onMenuItemClick = function (id, e) {
        var item = this.data.getItem(id);
        if (item.$disabled) {
            return;
        }
        if (item.twoState) {
            this.data.update(item.id, { active: !item.active });
        }
        this.events.fire(types_1.ToolbarEvents.click, [id, e]);
        this._close();
    };
    MenuBase.prototype._activeItemChange = function (id) {
        var _this = this;
        if (id && !this._documentHaveListener) {
            this._listenOuterClick();
        }
        if (id && this.data.haveChilds(id)) {
            this.events.fire(types_1.ToolbarEvents.openMenu);
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this.paint();
        }
        else {
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this._currentTimeout = setTimeout(function () { return _this.paint(); }, 400);
        }
    };
    MenuBase.prototype._resetHotkeys = function () {
        var _this = this;
        hotkeys_1.keyManager.removeHotKey(null, this);
        this.data.map(function (item) {
            if (item.hotkey) {
                hotkeys_1.keyManager.addHotKey(item.hotkey, function () { return _this._onMenuItemClick(item.id, null); }, _this);
            }
        });
    };
    MenuBase.prototype._listenOuterClick = function () {
        document.addEventListener("click", this._documentClick);
        this._documentHaveListener = true;
    };
    MenuBase.prototype._getMode = function (item, root, _active) {
        if (_active === void 0) { _active = false; }
        return item.parent === root ? "bottom" : "right";
    };
    MenuBase.prototype._drawMenuItems = function (id) {
        var _this = this;
        return this.data.map(function (item) { return _this._factory(item, _this.events); }, id, false);
    };
    MenuBase.prototype._normalizeData = function () {
        var _this = this;
        var root = this.data.getRoot();
        var groups = {};
        this.data.eachChild(root, function (item) {
            if (_this.data.haveChilds(item.id) && item.parent !== _this.data.getRoot()) {
                item.$openIcon = "right";
            }
            if (item.group) {
                helper_1.addInGroups(groups, item);
            }
        }, true);
        this._groups = groups;
    };
    MenuBase.prototype._setRoot = function (_id) {
        return; // need only for toolbar
    };
    MenuBase.prototype._getParents = function (id, root) {
        var parentIds = [];
        var afterRoot = false;
        var currentItem = this.data.getItem(id);
        var disabled = currentItem && currentItem.$disabled;
        this.data.eachParent(id, function (item) {
            if (item.id === root) {
                parentIds.push(item.id);
                afterRoot = true;
            }
            else if (!afterRoot) {
                parentIds.push(item.id);
            }
        }, !disabled);
        if (this._isContextMenu && this._activePosition) {
            parentIds.push(root);
        }
        return parentIds;
    };
    MenuBase.prototype._setProp = function (id, key, value) {
        var _this = this;
        var _a;
        if (Array.isArray(id)) {
            id.forEach(function (itemId) {
                var _a;
                return _this.data.update(itemId, (_a = {}, _a[key] = value, _a));
            });
        }
        else {
            this.data.update(id, (_a = {}, _a[key] = value, _a));
        }
    };
    return MenuBase;
}(view_1.View));
exports.MenuBase = MenuBase;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(27));
__export(__webpack_require__(45));
__export(__webpack_require__(28));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(3);
var tooltip_1 = __webpack_require__(28);
var Position;
(function (Position) {
    Position["right"] = "right";
    Position["bottom"] = "bottom";
    Position["center"] = "center";
})(Position = exports.Position || (exports.Position = {}));
var nodeTimeout = new WeakMap();
var messageStack = [];
var messageContainer = document.createElement("div");
messageContainer.className = "dhx-message-container";
function onExpire(node, fromClick) {
    if (fromClick) {
        clearTimeout(nodeTimeout.get(node));
    }
    var index = messageStack.indexOf(node);
    if (index < 0) { // node in body
        document.body.removeChild(node);
        return;
    }
    messageContainer.removeChild(node);
    messageStack.splice(index, 1);
    if (messageStack.length === 0) {
        document.body.removeChild(messageContainer);
    }
}
function message(props) {
    if (typeof props === "string") {
        props = { text: props };
    }
    var messageBox = document.createElement("div");
    messageBox.className = "dhx-message " + (props.css || "");
    messageBox.innerHTML = "<span class=\"message-text\">" + props.text + "</span> <div class=\"dxi " + props.icon + "\"></div>";
    if (props.at) {
        messageBox.style.position = "absolute";
        var _a = props.at, node = _a.node, position = _a.position;
        var elem = html_1.toNode(node);
        var rects = elem.getBoundingClientRect();
        document.body.appendChild(messageBox); // for calc bounings
        var _b = messageBox.getBoundingClientRect(), width = _b.width, height = _b.height;
        var _c = tooltip_1.findPosition(rects, position, width, height), left = _c.left, top_1 = _c.top, pos = _c.pos;
        messageBox.className += " " + pos;
        messageBox.style.left = left + "px";
        messageBox.style.top = top_1 + "px";
    }
    else {
        if (messageStack.length === 0) {
            document.body.appendChild(messageContainer);
        }
        messageStack.push(messageBox);
        messageContainer.appendChild(messageBox);
    }
    if (props.expire) {
        var timeout = setTimeout(function () { return onExpire(messageBox); }, props.expire);
        nodeTimeout.set(messageBox, timeout);
    }
    messageBox.onclick = function () { return onExpire(messageBox, true); };
}
exports.message = message;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(3);
var message_1 = __webpack_require__(27);
var RealPosition;
(function (RealPosition) {
    RealPosition["left"] = "left";
    RealPosition["right"] = "right";
    RealPosition["top"] = "top";
    RealPosition["bottom"] = "bottom";
    RealPosition["center"] = "center";
})(RealPosition = exports.RealPosition || (exports.RealPosition = {}));
function findPosition(targetRect, position, width, height) {
    var margin = 8; // margin top/bot, left/right
    var pos;
    var left;
    var top;
    switch (position) {
        case message_1.Position.center:
            left = targetRect.left + window.pageXOffset + (targetRect.width - width) / 2;
            if (left + margin < window.pageXOffset) {
                left = targetRect.left + window.pageXOffset;
            }
            top = targetRect.top + window.pageYOffset + (targetRect.height - height) / 2;
            pos = RealPosition.center;
            return { left: left, top: top, pos: pos };
        case message_1.Position.right:
            pos = RealPosition.right;
            left = targetRect.right + window.pageXOffset;
            if (left + width + margin > window.innerWidth + window.pageXOffset) { // set left
                left = window.pageXOffset + targetRect.left - width;
                pos = RealPosition.left;
            }
            top = window.pageYOffset + targetRect.top + (targetRect.height - height) / 2;
            return { left: left, top: top, pos: pos };
        case message_1.Position.bottom:
            left = window.pageXOffset + targetRect.left + (targetRect.width - width) / 2;
            if (left < window.pageXOffset) {
                left = window.pageXOffset + targetRect.left;
            }
            pos = RealPosition.bottom;
            top = window.pageYOffset + targetRect.bottom;
            if (top + height + margin > window.innerHeight + window.pageYOffset) { // set top
                top = window.pageYOffset + targetRect.top - height;
                pos = RealPosition.top;
            }
            return { left: left, top: top, pos: pos };
    }
}
exports.findPosition = findPosition;
// tooltip init
var tooltipBox = document.createElement("div");
var tooltipText = document.createElement("span");
tooltipText.className = "tooltip-text";
tooltipBox.appendChild(tooltipText);
tooltipBox.style.position = "absolute";
var timeoutId = null;
var lastNode = null;
var isActive = false;
var hideTimeout = null;
function showTooltip(node, text, position, css, force) {
    if (force === void 0) { force = false; }
    var rects = node.getBoundingClientRect();
    tooltipText.textContent = text;
    document.body.appendChild(tooltipBox);
    tooltipBox.className = "dhx-tooltip" + (force ? " forced" : "");
    var _a = tooltipBox.getBoundingClientRect(), width = _a.width, height = _a.height;
    var _b = findPosition(rects, position, width, height), left = _b.left, top = _b.top, pos = _b.pos;
    switch (pos) {
        case RealPosition.bottom:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case RealPosition.top:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case RealPosition.left:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case RealPosition.right:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case RealPosition.center:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
    }
    tooltipBox.className += " " + pos + " " + (css || "");
    isActive = true;
    if (!force) {
        setTimeout(function () {
            tooltipBox.className += " animate-tooltip";
        });
    }
}
function hideTooltip() {
    if (lastNode) {
        hideTimeout = setTimeout(function () {
            document.body.removeChild(tooltipBox);
            isActive = false;
            hideTimeout = null;
        }, 200);
    }
}
function addListners(node, text, position, css, force) {
    if (force === void 0) { force = false; }
    var mousemove = function () {
        if (isActive) {
            return;
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            showTooltip(node, text, position, css);
        }, 750);
    };
    var mouseout = function () {
        if (isActive) {
            hideTooltip();
        }
        clearTimeout(timeoutId);
        if (!force) {
            document.removeEventListener("mousemove", mousemove);
        }
        document.removeEventListener("mouseout", mouseout);
        document.removeEventListener("click", mouseout);
        lastNode = null;
    };
    if (force) {
        showTooltip(node, text, position, css, force);
    }
    else {
        document.addEventListener("mousemove", mousemove);
    }
    document.addEventListener("mouseout", mouseout);
    document.addEventListener("click", mouseout);
}
// default
function tooltip(text, at) {
    var node = html_1.toNode(at.node);
    if (node === lastNode) {
        return;
    }
    lastNode = node;
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
        addListners(node, text, at.position, at.css, true);
    }
    else {
        addListners(node, text, at.position || message_1.Position.bottom, at.css);
    }
}
exports.tooltip = tooltip;
function enableTooltip() {
    document.addEventListener("mousemove", _mousemove);
}
exports.enableTooltip = enableTooltip;
function disableTooltip() {
    document.removeEventListener("mousemove", _mousemove);
}
exports.disableTooltip = disableTooltip;
function _mousemove(e) {
    var node = html_1.locateNode(e, "dhx_tooltip_text");
    if (!node) {
        return;
    }
    tooltip(node.getAttribute("dhx_tooltip_text"), {
        position: node.getAttribute("dhx_tooltip_position") || message_1.Position.bottom,
        node: node
    });
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PopupEvents;
(function (PopupEvents) {
    PopupEvents["beforeHide"] = "beforehide";
    PopupEvents["beforeShow"] = "beforeshow";
    PopupEvents["afterHide"] = "afterhide";
    PopupEvents["afterShow"] = "aftershow";
})(PopupEvents = exports.PopupEvents || (exports.PopupEvents = {}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(8);
var Wrapper = /** @class */ (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper(config) {
        var _this = _super.call(this, null, config) || this;
        var popup = _this._popup = document.createElement("div");
        popup.className = "dhx-popup dhx_widget";
        popup.style.position = "absolute";
        _this._initHandlers();
        _this.mount(popup, dom_1.create({
            render: function () { return _this.toVDOM(); }
        }));
        return _this;
    }
    Wrapper.prototype.attach = function (name, config) {
        this._html = null;
        if (typeof name === "object") {
            this._ui = name;
        }
        else if (typeof name === "string") {
            this._ui = new window.dhx[name](null, config);
        }
        else if (typeof name === "function") {
            if (name.prototype instanceof view_1.View) {
                this._ui = new name(null, config);
            }
            else {
                this._ui = {
                    getRootView: function () {
                        return name(config);
                    }
                };
            }
        }
        this.paint();
        return this._ui;
    };
    Wrapper.prototype.attachHTML = function (html) {
        this._html = html;
        this.paint();
    };
    Wrapper.prototype.getWidget = function () {
        return this._ui;
    };
    Wrapper.prototype.toVDOM = function () {
        if (this._html) {
            return dom_1.el(".inner-html-content", {
                ".innerHTML": this._html
            });
        }
        var view = this._ui ? this._ui.getRootView() : null;
        if (view && view.render) {
            view = dom_1.inject(view);
        }
        return view;
    };
    return Wrapper;
}(view_1.View));
exports.Wrapper = Wrapper;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColorpickerEvents;
(function (ColorpickerEvents) {
    ColorpickerEvents["colorChange"] = "colorChange";
})(ColorpickerEvents = exports.ColorpickerEvents || (exports.ColorpickerEvents = {}));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(7);
var loader_1 = __webpack_require__(61);
var sort_1 = __webpack_require__(62);
var dataproxy_1 = __webpack_require__(18);
var helpers_1 = __webpack_require__(13);
var types_1 = __webpack_require__(12);
var core_1 = __webpack_require__(2);
var DataCollection = /** @class */ (function () {
    function DataCollection(config, events) {
        this.config = config || {};
        this._order = [];
        this._pull = {};
        this._changes = { order: [] };
        this._initOrder = null;
        this._sort = new sort_1.Sort();
        this._loader = new loader_1.Loader(this, this._changes);
        this.events = events || new events_1.EventSystem(this);
    }
    DataCollection.prototype.add = function (obj, index) {
        if (!this.events.fire(types_1.DataEvents.beforeAdd, [obj])) {
            return;
        }
        var id = this._addCore(obj, index);
        this._onChange("add", obj.id, obj);
        this.events.fire(types_1.DataEvents.afterAdd, [obj]);
        return id;
    };
    DataCollection.prototype.remove = function (id) {
        var obj = this._pull[id];
        if (obj) {
            if (!this.events.fire(types_1.DataEvents.beforeRemove, [obj])) {
                return;
            }
            this._removeCore(obj.id);
            this._onChange("remove", id, obj);
        }
        this.events.fire(types_1.DataEvents.afterRemove, [obj]);
    };
    DataCollection.prototype.removeAll = function () {
        this._removeAll();
        this.events.fire(types_1.DataEvents.removeAll);
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.exists = function (id) {
        return !!this._pull[id];
    };
    DataCollection.prototype.getNearId = function (id) {
        var item = this._pull[id];
        if (!item) {
            return this._order[0].id || "";
        }
    };
    DataCollection.prototype.getItem = function (id) {
        return this._pull[id];
    };
    DataCollection.prototype.update = function (id, obj, silent) {
        var item = this.getItem(id);
        if (item) {
            if (helpers_1.isEqualObj(obj, item)) {
                return;
            }
            if (obj.id && id !== obj.id) {
                helpers_1.dhxWarning("this method doesn't allow change id");
                if (helpers_1.isDebug()) {
                    // tslint:disable-next-line:no-debugger
                    debugger;
                }
            }
            else {
                core_1.extend(this._pull[id], obj, false);
                if (this.config.update) {
                    this.config.update(this._pull[id]);
                }
                if (!silent) {
                    this._onChange("update", id, this._pull[id]);
                }
            }
        }
        else {
            helpers_1.dhxWarning("item not found");
        }
    };
    DataCollection.prototype.getIndex = function (id) {
        var res = core_1.findIndex(this._order, function (item) { return item.id === id; });
        if (this._pull[id] && res >= 0) {
            return res;
        }
        return -1;
    };
    DataCollection.prototype.getId = function (index) {
        if (!this._order[index]) {
            return;
        }
        return this._order[index].id;
    };
    DataCollection.prototype.getLength = function () {
        return this._order.length;
    };
    DataCollection.prototype.filter = function (rule, config) {
        var _this = this;
        config = core_1.extend({
            add: false,
            multiple: true
        }, config);
        if (!config.add) {
            this._order = this._initOrder || this._order;
            this._initOrder = null;
        }
        this._filters = this._filters || {};
        if (!config.multiple || !rule) {
            this._filters = {};
        }
        if (rule) {
            if (typeof rule === "function") {
                var f = "_";
                this._filters[f] = {
                    match: f,
                    compare: rule
                };
            }
            else {
                if (!rule.match) {
                    delete this._filters[rule.by];
                }
                else {
                    rule.compare = rule.compare || (function (val, match) { return val === match; });
                    this._filters[rule.by] = rule;
                }
            }
            var fOrder = this._order.filter(function (item) {
                return Object.keys(_this._filters).every(function (key) {
                    return item[key] ?
                        _this._filters[key].compare(item[key], _this._filters[key].match, item)
                        : _this._filters[key].compare(item);
                });
            });
            if (!this._initOrder) {
                this._initOrder = this._order;
                this._order = fOrder;
            }
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.find = function (conf) {
        for (var key in this._pull) {
            var res = helpers_1.findByConf(this._pull[key], conf);
            if (res) {
                return res;
            }
        }
        return null;
    };
    DataCollection.prototype.findAll = function (conf) {
        var res = [];
        for (var key in this._pull) {
            var item = helpers_1.findByConf(this._pull[key], conf);
            if (item) {
                res.push(item);
            }
        }
        return res;
    };
    DataCollection.prototype.sort = function (by) {
        this._sort.sort(this._order, by);
        if (this._initOrder && this._initOrder.length) {
            this._sort.sort(this._initOrder, by);
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.copy = function (id, index, target, targetId) {
        if (!this.exists(id)) {
            return null;
        }
        var newid = core_1.uid();
        if (target) {
            if (targetId) {
                target.add(__assign({}, this.getItem(id)), index, targetId);
                return;
            }
            if (target.exists(id)) {
                target.add(__assign({}, this.getItem(id), { id: newid }), index);
                return newid;
            }
            else {
                target.add(this.getItem(id), index);
                return id;
            }
        }
        this.add(__assign({}, this.getItem(id), { id: newid }), index);
        return newid;
    };
    DataCollection.prototype.move = function (id, index, target, targetId) {
        if (target && target !== this && this.exists(id)) {
            var item = this.getItem(id);
            if (target.exists(id)) {
                item.id = core_1.uid();
            }
            if (targetId) {
                item.parent = targetId;
            }
            target.add(item, index);
            // remove data from original collection
            this.remove(item.id);
            return item.id;
        }
        if (this.getIndex(id) === index) {
            return null;
        }
        // move other elements
        var spliced = this._order.splice(this.getIndex(id), 1)[0];
        if (index === -1) {
            index = this._order.length;
        }
        this._order.splice(index, 0, spliced);
        this.events.fire(types_1.DataEvents.change); // if target not this, it trigger add and remove
        return id;
    };
    DataCollection.prototype.load = function (url, driver) {
        if (typeof url === "string") {
            url = new dataproxy_1.DataProxy(url);
        }
        return this._loader.load(url, driver);
    };
    DataCollection.prototype.parse = function (data, driver) {
        this._removeAll();
        return this._loader.parse(data, driver);
    };
    DataCollection.prototype.$parse = function (data) {
        var apx = this.config.approximate;
        if (apx) {
            data = this._approximate(data, apx.value, apx.maxNum);
        }
        this._parse_data(data);
        this.events.fire(types_1.DataEvents.change);
        this.events.fire(types_1.DataEvents.load);
    };
    DataCollection.prototype.save = function (url) {
        this._loader.save(url);
    };
    // todo: loop through the array and check saved statuses
    DataCollection.prototype.isSaved = function () {
        return !this._changes.order.length; // todo: bad solution, errors and holded elments are missed...
    };
    DataCollection.prototype.map = function (cb) {
        var result = [];
        for (var i = 0; i < this._order.length; i++) {
            result.push(cb.call(this, this._order[i], i));
        }
        return result;
    };
    DataCollection.prototype.reduce = function (cb, acc) {
        for (var i = 0; i < this._order.length; i++) {
            acc = cb.call(this, acc, this._order[i], i);
        }
        return acc;
    };
    DataCollection.prototype.serialize = function () {
        return this.map(function (item) {
            var newItem = __assign({}, item);
            Object.keys(newItem).forEach(function (key) {
                if (key[0] === "$") {
                    delete newItem[key];
                }
            });
            return newItem;
        });
    };
    DataCollection.prototype.getInitialData = function () {
        return this._initOrder;
    };
    DataCollection.prototype._removeAll = function () {
        this._pull = {};
        this._order = [];
        this._changes.order = [];
        this._initOrder = null;
    };
    DataCollection.prototype._addCore = function (obj, index) {
        if (this.config.init) {
            obj = this.config.init(obj);
        }
        obj.id = obj.id ? obj.id.toString() : core_1.uid();
        if (this._pull[obj.id]) {
            helpers_1.dhxError("Item already exist");
        }
        // todo: not ideal solution
        if (this._initOrder && this._initOrder.length) {
            this._addToOrder(this._initOrder, obj, index);
        }
        this._addToOrder(this._order, obj, index);
        return obj.id;
    };
    DataCollection.prototype._removeCore = function (id) {
        if (this.getIndex(id) >= 0) {
            this._order = this._order.filter(function (el) { return el.id !== id; });
            delete this._pull[id];
        }
        if (this._initOrder && this._initOrder.length) {
            this._initOrder = this._initOrder.filter(function (el) { return el.id !== id; });
        }
    };
    DataCollection.prototype._parse_data = function (data) {
        var index = this._order.length;
        if (this.config.prep) {
            data = this.config.prep(data);
        }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            obj.id = obj.id || core_1.uid();
            this._pull[obj.id] = obj;
            this._order[index++] = obj;
        }
    };
    DataCollection.prototype._approximate = function (data, values, maxNum) {
        var len = data.length;
        var vlen = values.length;
        var rlen = Math.floor(len / maxNum);
        var newData = Array(Math.ceil(len / rlen));
        var index = 0;
        for (var i = 0; i < len; i += rlen) {
            var newItem = core_1.copy(data[i]);
            var end = Math.min(len, i + rlen);
            for (var j = 0; j < vlen; j++) {
                var sum = 0;
                for (var z = i; z < end; z++) {
                    sum += data[z][values[j]];
                }
                newItem[values[j]] = sum / (end - i);
            }
            newData[index++] = newItem;
        }
        return newData;
    };
    DataCollection.prototype._onChange = function (status, id, obj) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var item = _a[_i];
            // update pending item if previous state is "saving" or if item not saved yet
            if (item.id === id && !item.saving) {
                // update item
                if (item.error) {
                    item.error = false;
                }
                item = __assign({}, item, { obj: obj, status: status });
                this.events.fire(types_1.DataEvents.change, [id, status, obj]);
                return;
            }
        }
        this._changes.order.push({ id: id, status: status, obj: __assign({}, obj), saving: false });
        this.events.fire(types_1.DataEvents.change, [id, status, obj]);
    };
    DataCollection.prototype._addToOrder = function (array, obj, index) {
        if (index >= 0 && array[index]) {
            this._pull[obj.id] = obj;
            array.splice(index, 0, obj);
        }
        else {
            this._pull[obj.id] = obj;
            array.push(obj);
        }
    };
    return DataCollection;
}());
exports.DataCollection = DataCollection;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CsvDriver = /** @class */ (function () {
    function CsvDriver(config) {
        if (config === void 0) { config = {}; }
        var initConfig = {
            skipHeader: 0,
            nameByHeader: false,
            row: "\n",
            column: ",",
        };
        this.config = __assign({}, initConfig, config);
        if (this.config.nameByHeader) {
            this.config.skipHeader = 1;
        }
    }
    CsvDriver.prototype.getFields = function (row, headers) {
        var parts = row.trim().split(this.config.column);
        var obj = {};
        for (var i = 0; i < parts.length; i++) {
            obj[headers ? headers[i] : i + 1] = parts[i];
        }
        return obj;
    };
    CsvDriver.prototype.getRows = function (data) {
        return data.trim().split(this.config.row);
    };
    CsvDriver.prototype.toJsonArray = function (data) {
        var _this = this;
        var rows = this.getRows(data);
        var names = this.config.names;
        if (this.config.skipHeader) {
            var top_1 = rows.splice(0, this.config.skipHeader);
            if (this.config.nameByHeader) {
                names = top_1[0].trim().split(this.config.column);
            }
        }
        return rows.map(function (row) { return _this.getFields(row, names); });
    };
    return CsvDriver;
}());
exports.CsvDriver = CsvDriver;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonDriver = /** @class */ (function () {
    function JsonDriver() {
    }
    JsonDriver.prototype.toJsonArray = function (data) {
        return this.getRows(data);
    };
    JsonDriver.prototype.getFields = function (row) {
        return row;
    };
    JsonDriver.prototype.getRows = function (data) {
        return typeof data === "string" ? JSON.parse(data) : data;
    };
    return JsonDriver;
}());
exports.JsonDriver = JsonDriver;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var datacollection_1 = __webpack_require__(33);
var dataproxy_1 = __webpack_require__(18);
var helpers_1 = __webpack_require__(13);
var types_1 = __webpack_require__(12);
function addToOrder(store, obj, parent, index) {
    if (index !== undefined && index !== -1 && store[parent] && store[parent][index]) {
        store[parent].splice(index, 0, obj);
    }
    else {
        if (!store[parent]) {
            store[parent] = [];
        }
        store[parent].push(obj);
    }
}
var TreeCollection = /** @class */ (function (_super) {
    __extends(TreeCollection, _super);
    function TreeCollection(config, events) {
        var _a;
        var _this = _super.call(this, config, events) || this;
        var root = _this._root = "_ROOT_" + core_1.uid();
        _this._childs = (_a = {}, _a[root] = [], _a);
        _this._initChilds = null;
        return _this;
    }
    TreeCollection.prototype.add = function (obj, index, parent) {
        if (index === void 0) { index = -1; }
        if (parent === void 0) { parent = this._root; }
        if (typeof obj !== "object") {
            obj = {
                value: obj
            };
        }
        obj.parent = obj.parent ? obj.parent.toString() : parent;
        var id = _super.prototype.add.call(this, obj, index);
        if (Array.isArray(obj.childs)) {
            for (var _i = 0, _a = obj.childs; _i < _a.length; _i++) {
                var clild = _a[_i];
                this.add(clild, -1, obj.id);
            }
        }
        return id;
    };
    TreeCollection.prototype.getRoot = function () {
        return this._root;
    };
    TreeCollection.prototype.getParent = function (id, asObj) {
        if (asObj === void 0) { asObj = false; }
        if (!this._pull[id]) {
            return null;
        }
        var parent = this._pull[id].parent;
        return asObj ? this._pull[parent] : parent;
    };
    TreeCollection.prototype.getChilds = function (id) {
        if (this._childs && this._childs[id]) {
            return this._childs[id];
        }
        return [];
    };
    TreeCollection.prototype.getLength = function (id) {
        if (id === void 0) { id = this._root; }
        if (!this._childs[id]) {
            return null;
        }
        return this._childs[id].length;
    };
    TreeCollection.prototype.removeAll = function (id) {
        var _a;
        if (id) {
            var childs = this._childs[id].slice();
            for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                var child = childs_1[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype.removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype.getIndex = function (id) {
        var parent = this.getParent(id);
        if (!parent || !this._childs[parent]) {
            return -1;
        }
        return core_1.findIndex(this._childs[parent], function (item) { return item.id === id; });
    };
    TreeCollection.prototype.sort = function (conf) {
        var childs = this._childs;
        for (var key in childs) {
            this._sort.sort(childs[key], conf);
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.map = function (cb, parent, direct) {
        if (parent === void 0) { parent = this._root; }
        if (direct === void 0) { direct = true; }
        var result = [];
        if (!this.haveChilds(parent)) {
            return result;
        }
        for (var i = 0; i < this._childs[parent].length; i++) {
            result.push(cb.call(this, this._childs[parent][i], i));
            if (direct) {
                var childResult = this.map(cb, this._childs[parent][i].id, direct);
                result = result.concat(childResult);
            }
        }
        return result;
    };
    TreeCollection.prototype.filter = function (conf) {
        if (!conf) {
            this.restoreOrder();
            return;
        }
        if (!this._initChilds) {
            this._initChilds = this._childs;
        }
        conf.type = conf.type || types_1.TreeFilterType.all;
        var newChilds = {};
        this._recursiveFilter(conf, this._root, 0, newChilds);
        this._childs = newChilds;
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.restoreOrder = function () {
        if (this._initChilds) {
            this._childs = this._initChilds;
            this._initChilds = null;
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.copy = function (id, index, target, targetId) {
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (!this.exists(id)) {
            return null;
        }
        var childs = __assign({}, this._childs);
        var currentChilds = childs[id];
        if (target === this && !this.canCopy(id, targetId)) {
            return null;
        }
        if (!(target instanceof TreeCollection)) { // copy to datacollection
            target.add(this._pull[id]);
            return;
        }
        if (this.exists(id)) {
            var item = __assign({}, this.getItem(id));
            if (target.exists(id)) {
                item.id = core_1.uid();
            }
            else {
                item.id = id;
            }
            item.parent = targetId;
            target.add(item, index);
            id = item.id;
        }
        if (currentChilds) {
            for (var _i = 0, currentChilds_1 = currentChilds; _i < currentChilds_1.length; _i++) {
                var child = currentChilds_1[_i];
                var childId = child.id;
                var childIndex = this.getIndex(childId);
                this.copy(childId, childIndex, target, id);
            }
        }
        return id;
    };
    TreeCollection.prototype.move = function (id, index, target, targetId) {
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (!this.exists(id)) {
            return null;
        }
        if (target !== this) {
            if (!(target instanceof TreeCollection)) { // move to datacollection
                target.add(this._pull[id]);
                this.remove(id);
                return;
            }
            var returnId = this.copy(id, index, target, targetId);
            this.remove(id);
            return returnId;
        }
        // move inside
        if (!this.canCopy(id, targetId)) {
            return null;
        }
        var parent = this.getParent(id);
        var parentIndex = this.getIndex(id);
        // get item from parent array and move to target array
        var spliced = this._childs[parent].splice(parentIndex, 1)[0];
        spliced.parent = targetId; // need for next moving, ... not best solution, may be full method for get item
        if (!this._childs[parent].length) {
            delete this._childs[parent];
        }
        if (!this.haveChilds(targetId)) {
            this._childs[targetId] = [];
        }
        if (index === -1) {
            index = this._childs[targetId].push(spliced);
        }
        else {
            this._childs[targetId].splice(index, 0, spliced);
        }
        this.events.fire(types_1.DataEvents.change);
        return id;
    };
    TreeCollection.prototype.eachChild = function (id, cb, direct, checkItem) {
        if (direct === void 0) { direct = true; }
        if (checkItem === void 0) { checkItem = function () { return true; }; }
        if (!this.haveChilds(id)) {
            return;
        }
        for (var i = 0; i < this._childs[id].length; i++) {
            cb.call(this, this._childs[id][i], i);
            if (direct && checkItem(this._childs[id][i])) {
                this.eachChild(this._childs[id][i].id, cb, direct, checkItem);
            }
        }
    };
    TreeCollection.prototype.getNearId = function (id) {
        return id; // for selection
    };
    TreeCollection.prototype.loadChilds = function (id, driver) {
        var _this = this;
        if (driver === void 0) { driver = "json"; }
        var url = this.config.autoload + "?id=" + id;
        var proxy = new dataproxy_1.DataProxy(url);
        proxy.load().then(function (data) {
            driver = helpers_1.toDataDriver(driver);
            data = driver.toJsonArray(data);
            _this._parse_data(data, id);
            _this.events.fire(types_1.DataEvents.change);
        });
    };
    TreeCollection.prototype.refreshChilds = function (id, driver) {
        if (driver === void 0) { driver = "json"; }
        this.removeAll(id);
        this.loadChilds(id, driver);
    };
    TreeCollection.prototype.eachParent = function (id, cb, self) {
        if (self === void 0) { self = false; }
        var item = this.getItem(id);
        if (!item) {
            return;
        }
        if (self) {
            cb.call(this, item);
        }
        if (item.parent === this._root) {
            return;
        }
        var parent = this.getItem(item.parent);
        cb.call(this, parent);
        this.eachParent(item.parent, cb);
    };
    TreeCollection.prototype.haveChilds = function (id) {
        return id in this._childs;
    };
    TreeCollection.prototype.canCopy = function (id, target) {
        if (id === target) {
            return false;
        }
        var canCopy = true;
        this.eachParent(target, function (item) { return item.id === id ? canCopy = false : null; }); // locate return string
        return canCopy;
    };
    TreeCollection.prototype.serialize = function (fn) {
        return this._serialize(this._root, fn);
    };
    TreeCollection.prototype.getId = function (index, parent) {
        if (parent === void 0) { parent = this._root; }
        if (!this._childs[parent] || !this._childs[parent][index]) {
            return;
        }
        return this._childs[parent][index].id;
    };
    TreeCollection.prototype._removeAll = function (id) {
        var _a;
        if (id) {
            var childs = this._childs[id].slice();
            for (var _i = 0, childs_2 = childs; _i < childs_2.length; _i++) {
                var child = childs_2[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype._removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype._removeCore = function (id) {
        if (this._pull[id]) {
            var parent_1 = this.getParent(id);
            this._childs[parent_1] = this._childs[parent_1].filter(function (item) { return item.id !== id; });
            if (parent_1 !== this._root && !this._childs[parent_1].length) {
                delete this._childs[parent_1];
            }
            if (this._initChilds && this._initChilds[parent_1]) {
                this._initChilds[parent_1] = this._initChilds[parent_1].filter(function (item) { return item.id !== id; });
                if (parent_1 !== this._root && !this._initChilds[parent_1].length) {
                    delete this._initChilds[parent_1];
                }
            }
            this._fastDeleteChilds(this._childs, id);
            if (this._initChilds) {
                this._fastDeleteChilds(this._initChilds, id);
            }
        }
    };
    TreeCollection.prototype._addToOrder = function (_order, obj, index) {
        var childs = this._childs;
        var initChilds = this._initChilds;
        var parent = obj.parent;
        this._pull[obj.id] = obj;
        addToOrder(childs, obj, parent, index);
        if (initChilds) {
            addToOrder(initChilds, obj, parent, index);
        }
    };
    TreeCollection.prototype._parse_data = function (data, parent) {
        if (parent === void 0) { parent = this._root; }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            if (typeof obj !== "object") {
                obj = {
                    value: obj
                };
            }
            obj.id = obj.id ? obj.id.toString() : core_1.uid();
            obj.parent = obj.parent ? obj.parent.toString() : parent;
            this._pull[obj.id] = obj;
            if (!this._childs[obj.parent]) {
                this._childs[obj.parent] = [];
            }
            this._childs[obj.parent].push(obj);
            if (obj.childs && obj.childs instanceof Object) {
                this._parse_data(obj.childs, obj.id);
            }
        }
    };
    TreeCollection.prototype._fastDeleteChilds = function (target, id) {
        if (this._pull[id]) {
            delete this._pull[id];
        }
        if (!target[id]) {
            return;
        }
        for (var i = 0; i < target[id].length; i++) {
            this._fastDeleteChilds(target, target[id][i].id);
        }
        delete target[id];
    };
    TreeCollection.prototype._recursiveFilter = function (conf, current, level, newChilds) {
        var _this = this;
        var childs = this._childs[current];
        if (!childs) {
            return;
        }
        var condition = function (item) {
            switch (conf.type) {
                case types_1.TreeFilterType.all: {
                    return true;
                }
                case types_1.TreeFilterType.specific: {
                    return level === conf.specific;
                }
                case types_1.TreeFilterType.leafs: {
                    return !_this.haveChilds(item.id);
                }
            }
        };
        if (conf.by && conf.match) {
            var customRule = function (item) { return !condition(item) || item[conf.by].toString().toLowerCase().indexOf(conf.match.toString().toLowerCase()) !== -1; };
            newChilds[current] = childs.filter(customRule);
        }
        else if (conf.rule && typeof conf.rule === "function") {
            var customRule = function (item) { return !condition(item) || conf.rule(item); };
            var filtered = childs.filter(customRule);
            if (filtered.length) {
                newChilds[current] = filtered;
            }
        }
        for (var _i = 0, childs_3 = childs; _i < childs_3.length; _i++) {
            var child = childs_3[_i];
            this._recursiveFilter(conf, child.id, level + 1, newChilds);
        }
    };
    TreeCollection.prototype._serialize = function (parent, fn) {
        var _this = this;
        if (parent === void 0) { parent = this._root; }
        return this.map(function (item) {
            var itemCopy = {};
            for (var key in item) {
                if (key === "parent" || key === "childs") {
                    continue;
                }
                itemCopy[key] = item[key];
            }
            if (fn) {
                itemCopy = fn(itemCopy);
            }
            if (_this.haveChilds(item.id)) {
                itemCopy.childs = _this._serialize(item.id, fn);
            }
            return itemCopy;
        }, parent, false);
    };
    return TreeCollection;
}(datacollection_1.DataCollection));
exports.TreeCollection = TreeCollection;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(66));
__export(__webpack_require__(19));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function normalizeArray(obj, name) {
    if (!obj[name]) {
        return;
    }
    if (typeof obj[name] === "string") {
        obj[name] = [{
                text: "" + obj[name]
            }];
    }
    else {
        obj[name] = obj[name].map(function (el) {
            if (typeof el === "string") {
                el = { text: el };
            }
            return el;
        });
    }
}
function normalizeColumns(columns) {
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var col = columns_1[_i];
        col.$cellCss = col.$cellCss || {};
        normalizeArray(col, "header");
        normalizeArray(col, "footer");
        col.width = col.width || 100;
    }
}
exports.normalizeColumns = normalizeColumns;
function countColumns(config, columns) {
    var headerRowsCount = 0;
    var totalWidth = 0;
    var colspans = false;
    var rowsHeadersCount = 0;
    var footer = false;
    columns.map(function (col) {
        headerRowsCount = Math.max(headerRowsCount, col.header.length);
        totalWidth += col.width;
        if (col.footer && !footer) {
            footer = true;
        }
        if (!colspans) {
            for (var _i = 0, _a = col.header; _i < _a.length; _i++) {
                var head = _a[_i];
                if (head.colspan) {
                    colspans = true;
                    return;
                }
            }
        }
    });
    // fill missing cells
    columns.map(function (col) {
        if (col.header.length < headerRowsCount) {
            for (var i = 0; i < headerRowsCount; i++) {
                col.header[i] = col.header[i] || { text: "" };
            }
        }
        col.header.map(function (head) {
            head.css = head.css || "";
            if (!head.text && !/dhx_cell_empty/.test(head.css)) {
                head.css += " dhx_cell_empty";
            }
        });
        // find header columns indexes
        if (col.header[0].text === "") {
            rowsHeadersCount++;
        }
    });
    config.$totalWidth = totalWidth;
    config.$headerLevel = headerRowsCount;
    config.$colspans = colspans;
    config.$footer = footer;
    return rowsHeadersCount;
}
exports.countColumns = countColumns;
function calculatePositions(width, height, scroll, conf) {
    var avrColWidth = conf.$totalWidth / conf.columns.length;
    var colPerPage = Math.round(width / avrColWidth);
    var rowPerPage = Math.round(height / conf.rowHeight);
    var reserve = 1;
    var y = Math.round(scroll.top / conf.rowHeight) || 0;
    var yStart = y - reserve >= 0 ? y - reserve : 0;
    var yEnd = y + rowPerPage + reserve;
    var x = 0;
    var scrollLeft = scroll.left;
    for (var i = 0; i < conf.columns.length; i++) {
        var col = conf.columns[i];
        scrollLeft = scrollLeft - col.width;
        if (scrollLeft + (avrColWidth / 2) > 0) {
            x++;
        }
        else {
            break;
        }
    }
    var xStart = x - reserve >= 0 ? x - reserve : 0;
    var xEnd = x + colPerPage + reserve;
    return {
        xStart: xStart,
        xEnd: xEnd,
        yStart: yStart,
        yEnd: yEnd
    };
}
exports.calculatePositions = calculatePositions;
function getUnique(arr, name) {
    return arr
        .filter(function (item, index, array) {
        return index === array.reduce(function (acc, t, i) { return (acc = t[name] === item[name] ? i : acc); }, -1);
    })
        .sort(function (a, b) { return a[name] > b[name] ? 1 : -1; });
}
exports.getUnique = getUnique;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(19);
function onInput(eventSystem, colId, filter, e) {
    eventSystem.fire(types_1.GridEvents.headerInput, [e.target.value, colId, filter]);
}
function applyMathMethod(column, config, method) {
    var id = column.id;
    var columnData = config.data.map(function (item) { return parseFloat(item[id]) || 0; });
    var roots = columnData;
    if (config.type === "tree") {
        roots = config.data.reduce(function (total, item) {
            if (item.$level === 0) {
                total.push((parseFloat(item[id]) || 0));
            }
            return total;
        }, []);
    }
    return method(columnData, roots);
}
exports.content = {
    inputFilter: {
        toHtml: function (column, config) { return dom_1.el("input", {
            type: "text",
            class: "dhx_grid_filter",
            oninput: [onInput, config.events, column.id, "inputFilter"],
            style: {
                width: column.width - 20
            },
            _key: column.id
        }); },
        match: function (value, match) { return new RegExp("^" + match, "i").test(value); }
    },
    selectFilter: {
        toHtml: function (column, config) { return dom_1.el("select", {
            type: "text",
            class: "dhx_grid_filter",
            oninput: [onInput, config.events, column.id, "selectFilter"],
            style: {
                width: column.width - 20
            },
            _key: column.id
        }, [
            dom_1.el("option", { value: "" }, "")
        ].concat(column.$uniqueData.map(function (col) { return dom_1.el("option", { value: col[column.id] }, col[column.id]); }))); },
        match: function (value, match) { return value === match; }
    },
    sum: {
        calculate: function (_col, roots) { return roots.reduce(function (sum, c) { return sum += parseFloat(c) || 0; }, 0).toFixed(3); },
        toHtml: function (column, config) { return applyMathMethod(column, config, this.calculate); }
    },
    avg: {
        calculate: function (_col, roots) { return (roots.reduce(function (sum, c) { return sum += c; }, 0) / _col.length).toFixed(3); },
        toHtml: function (column, config) { return applyMathMethod(column, config, this.calculate); }
    },
    min: {
        calculate: function (col) { return Math.min.apply(Math, col).toFixed(3); },
        toHtml: function (column, config) { return applyMathMethod(column, config, this.calculate); }
    },
    max: {
        calculate: function (col) { return Math.max.apply(Math, col).toFixed(3); },
        toHtml: function (column, config) { return applyMathMethod(column, config, this.calculate); }
    },
    count: {
        calculate: function (_col, roots) { return roots.reduce(function (count, c) { return count += c; }, 0); },
        toHtml: function (column, config) { return applyMathMethod(column, config, this.calculate); }
    }
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(0);
var html_1 = __webpack_require__(3);
var ts_message_1 = __webpack_require__(26);
var types_1 = __webpack_require__(9);
var helper_1 = __webpack_require__(21);
var itemfactory_1 = __webpack_require__(24);
var MenuBase_1 = __webpack_require__(25);
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(element, config) {
        var _this = _super.call(this, element, core_1.extend({
            navigationType: "click"
        }, config)) || this;
        _this._currentRoot = null;
        _this._factory = itemfactory_1.createFactory(types_1.ItemType.button);
        var render = function () { return _this._draw(); };
        _this.mount(element, dom_1.create({ render: render }));
        return _this;
    }
    Toolbar.prototype.getValues = function () {
        var state = {};
        this.data.eachChild(this.data.getRoot(), function (item) {
            if (item.twoState) {
                state[item.id] = item.active;
            }
            else if (item.type === types_1.ItemType.input) {
                state[item.id] = item.value;
            }
        }, false);
        for (var key in this._groups) {
            if (this._groups[key].active) {
                state[key] = this._groups[key].active;
            }
        }
        return state;
    };
    Toolbar.prototype.setValues = function (state) {
        for (var key in state) {
            if (this._groups[key]) {
                if (this._groups[key].active) {
                    this.data.update(this._groups[key].active, { active: false });
                    this._groups[key].active = state[key];
                    this.data.update(state[key], { active: true });
                }
            }
            else {
                var item = this.data.getItem(key);
                if (item.type === types_1.ItemType.input) {
                    this.data.update(key, { value: state[key] });
                }
                else {
                    this.data.update(key, { active: state[key] });
                }
            }
        }
    };
    Toolbar.prototype._initHandlers = function () {
        var _this = this;
        _super.prototype._initHandlers.call(this);
        this._onInput = function (e) {
            var id = html_1.locate(e);
            _this.data.update(id, { value: e.target.value });
        };
        this._showTooltip = function (e) {
            var elem = html_1.locateNode(e);
            if (!elem) {
                return;
            }
            var id = elem.getAttribute("dhx_id");
            var item = _this.data.getItem(id);
            if (item.tooltip) {
                ts_message_1.tooltip(item.tooltip, {
                    node: elem,
                    position: ts_message_1.Position.bottom
                });
            }
        };
    };
    Toolbar.prototype._draw = function () {
        var _this = this;
        return dom_1.el(".toolbar.dhx_widget" + (this.config.css ? "." + this.config.css : ""), {
            dhx_widget_id: this._uid,
            onclick: this._handlers.onclick,
            oninput: this._onInput,
            onmouseover: this._showTooltip
        }, this.data.map(function (item) { return _this._factory(item, _this.events); }, this.data.getRoot(), false));
    };
    Toolbar.prototype._getMode = function (item, root) {
        return item.id === root ? "bottom" : "right";
    };
    Toolbar.prototype._close = function () {
        this._activeMenu = null;
        this._activePosition = null;
        this._currentRoot = null;
        this.paint();
    };
    Toolbar.prototype._normalizeData = function () {
        var _this = this;
        var root = this.data.getRoot();
        var groups = {};
        this.data.eachChild(root, function (item) {
            if (item.type === types_1.ItemType.menuItem || item.type === types_1.ItemType.selectButton) {
                if (_this.data.haveChilds(item.id)) {
                    _this.data.eachChild(item.id, function (child) { return child.type = child.type || types_1.ItemType.menuItem; }, false);
                    if (item.parent !== root) {
                        item.$openIcon = "right";
                    }
                    else {
                        item.$openIcon = "bot";
                    }
                }
            }
            if (item.group) {
                helper_1.addInGroups(groups, item);
            }
        }, true);
        this._groups = groups;
    };
    Toolbar.prototype._setRoot = function (id) {
        if (this.data.getParent(id) === this.data.getRoot()) { // if we clicked on item which not belong root, we cant set it as root item
            this._currentRoot = id;
        }
    };
    return Toolbar;
}(MenuBase_1.MenuBase));
exports.Toolbar = Toolbar;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __webpack_require__(16);
var main_1 = __webpack_require__(1);
function getLastCopyingCell(firstCell, lastCell) {
    var isRangeLargeByX;
    var isRange = main_1.isRangeId(firstCell);
    if (isRange) {
        var _a = firstCell.split(":"), first = _a[0], last = _a[1];
        isRangeLargeByX = getCellsDiff(first, last).isLargerByX;
        firstCell = last;
    }
    var firstCellIndex = main_1.getCellIndex(firstCell);
    var _b = getCellsDiff(firstCell, lastCell), x = _b.x, y = _b.y, isLargerByX = _b.isLargerByX;
    var nextY = firstCellIndex.row + y;
    var nextX = firstCellIndex.col + x;
    var col = isLargerByX ? nextX : firstCellIndex.col;
    var row = isLargerByX ? firstCellIndex.row : nextY;
    return main_1.getCellNameByIndex(row, col);
}
exports.getLastCopyingCell = getLastCopyingCell;
function getCellsDiff(firstCell, lastCell) {
    var firstCellIndex = main_1.getCellIndex(firstCell);
    var lastCellIndex = main_1.getCellIndex(lastCell);
    var x = lastCellIndex.col - firstCellIndex.col;
    var y = lastCellIndex.row - firstCellIndex.row;
    return {
        x: x,
        y: y,
        isLargerByX: Math.abs(x) > Math.abs(y)
    };
}
exports.getCellsDiff = getCellsDiff;
function getProgressionStep(progression) {
    var items = progression.map(function (item) { return parseFloat(item); });
    var sum = items.reduce(function (total, elem) { return total + elem; }, 0);
    var len = items.length;
    return (2 * (sum / len) - 2 * items[0]) / (len - 1);
}
exports.getProgressionStep = getProgressionStep;
function getAutoFilledCells(values, focused, selected) {
    var numbers = values.filter(function (item) { return format_1.isNumeric(item); });
    if (numbers.length === 1) {
        numbers.push(+numbers[0] + 1);
    }
    var focusedCellsArr = main_1.getCellsArray(focused);
    var step = getProgressionStep(numbers);
    var isCellGreater = function (a, b) {
        var aa = main_1.getCellIndex(a);
        var bb = main_1.getCellIndex(b);
        if (aa.row === bb.row) {
            return aa.col > bb.col;
        }
        else {
            return aa.row > bb.row;
        }
    };
    var last = parseFloat(numbers[numbers.length - 1]);
    var current = 0;
    var focusedFirst = focused.split(":")[0];
    var selectedFirst = selected.split(":")[0];
    var negativeDir = isCellGreater(focusedFirst, selectedFirst);
    if (negativeDir) {
        step = -step;
        last = parseFloat(numbers[0]);
        current = numbers.length - 1;
    }
    var targetCells = main_1.getCellsArray(selected).filter(function (c) { return focusedCellsArr.indexOf(c) === -1; });
    var res = targetCells.map(function () {
        var newVal = values[current];
        if (format_1.isNumeric(values[current])) {
            last = last + step;
            newVal = last.toFixed(5);
        }
        if (negativeDir) {
            current = values[current - 1] !== undefined ? current - 1 : numbers.length - 1;
        }
        else {
            current = values[current + 1] !== undefined ? current + 1 : 0;
        }
        return newVal;
    });
    if (negativeDir) {
        res = res.reverse();
    }
    return {
        cells: targetCells[0] + ":" + targetCells[targetCells.length - 1],
        value: res
    };
}
exports.getAutoFilledCells = getAutoFilledCells;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CssManager_1 = __webpack_require__(43);
exports.css = CssManager_1.cssManager;
var en_1 = __webpack_require__(6);
var ts_message_1 = __webpack_require__(26);
exports.message = ts_message_1.message;
var d = window.dhx = window.dhx || {};
exports.i18n = d.i18n || {};
exports.i18n.setLocale = function (component, value) {
    var target = exports.i18n[component];
    for (var key in value) {
        target[key] = value[key];
    }
};
exports.i18n.spreadsheet = exports.i18n.spreadsheet || en_1.default;
d.css = d.css || CssManager_1.cssManager;
__webpack_require__(50);
var Spreadsheet_1 = __webpack_require__(53);
exports.Spreadsheet = Spreadsheet_1.Spreadsheet;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var CssManager = /** @class */ (function () {
    function CssManager() {
        this._classes = {};
        var styles = document.createElement("style");
        styles.id = "dhx_generated_styles";
        this._styleCont = document.head.appendChild(styles);
    }
    CssManager.prototype.update = function () {
        // move style element to the bottom of head
        document.head.appendChild(this._styleCont);
        this._styleCont.innerHTML = this._generateCss();
    };
    CssManager.prototype.remove = function (className) {
        delete this._classes[className];
        this.update();
    };
    CssManager.prototype.add = function (cssList, customId, silent) {
        if (silent === void 0) { silent = false; }
        var cssString = this._toCssString(cssList);
        var id = this._findSameClassId(cssString);
        if (id && customId && customId !== id) {
            this._classes[customId] = this._classes[id];
            return customId;
        }
        if (id) {
            return id;
        }
        return this._addNewClass(cssString, customId, silent);
    };
    CssManager.prototype.get = function (className) {
        if (this._classes[className]) {
            var props = {};
            var css = this._classes[className].split(";");
            for (var _i = 0, css_1 = css; _i < css_1.length; _i++) {
                var item = css_1[_i];
                if (item) {
                    var prop = item.split(":");
                    props[prop[0]] = prop[1];
                }
            }
            return props;
        }
        return null;
    };
    CssManager.prototype._findSameClassId = function (cssString) {
        for (var key in this._classes) {
            if (cssString === this._classes[key]) {
                return key;
            }
        }
        return null;
    };
    CssManager.prototype._addNewClass = function (cssString, customId, silent) {
        var id = customId || "dhx_generated_class_" + core_1.uid();
        this._classes[id] = cssString;
        if (!silent) {
            this.update();
        }
        return id;
    };
    CssManager.prototype._toCssString = function (cssList) {
        var cssString = "";
        for (var key in cssList) {
            var prop = cssList[key];
            var name_1 = key.replace(/[A-Z]{1}/g, function (letter) { return "-" + letter.toLowerCase(); });
            cssString += name_1 + ":" + prop + ";";
        }
        return cssString;
    };
    CssManager.prototype._generateCss = function () {
        var result = "";
        for (var key in this._classes) {
            var cssProps = this._classes[key];
            result += "." + key + "{" + cssProps + "}\n";
        }
        return result;
    };
    return CssManager;
}());
exports.CssManager = CssManager;
exports.cssManager = new CssManager();


/***/ }),
/* 44 */
/***/ (function(module, exports) {

if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(49);
function blockKeys(e) {
    var active = document.activeElement;
    if (!active.classList.contains("apply-button") && !active.classList.contains("reject-button")) {
        e.preventDefault();
    }
}
function blockScreen(css) {
    var blocker = document.createElement("div");
    blocker.className = "dhx-blocker " + (css || "");
    document.body.appendChild(blocker);
    document.addEventListener("keydown", blockKeys);
    return function () {
        document.body.removeChild(blocker);
        document.removeEventListener("keydown", blockKeys);
    };
}
exports.blockScreen = blockScreen;
function alert(props) {
    var apply = props.buttons && props.buttons[0] ? props.buttons[0] : en_1.default.apply;
    var unblock = blockScreen(props.blockerCss);
    return new Promise(function (res) {
        var alertBox = document.createElement("div");
        alertBox.className = "dhx-alert " + (props.css || "");
        alertBox.innerHTML = "\n\t\t\t<div class=\"message-box-header\">\n\t\t\t\t<div class=\"mesage-box-title\">" + props.header + "</div>\n\t\t\t</div>\n\t\t\t<div class=\"alert-message\">" + props.text + "</div>\n\t\t\t<div class=\"action-button " + (props.buttonsAlignment ? props.buttonsAlignment : "") + "\">\n\t\t\t\t<button class=\"apply-button alert-btn dhx_btn dhx_btn--flat\">" + apply + "</button>\n\t\t\t</div>";
        document.body.appendChild(alertBox);
        alertBox.querySelector(".apply-button").focus();
        alertBox.querySelector("button").addEventListener("click", function () {
            unblock();
            document.body.removeChild(alertBox);
            res(true);
        });
    });
}
exports.alert = alert;
function confirm(props) {
    var apply = props.buttons && props.buttons[1] ? props.buttons[1] : en_1.default.apply;
    var reject = props.buttons && props.buttons[0] ? props.buttons[0] : en_1.default.reject;
    var unblock = blockScreen(props.blockerCss);
    return new Promise(function (res) {
        var answer = function (val) {
            unblock();
            confirmBox.removeEventListener("click", clickHandler);
            document.body.removeChild(confirmBox);
            res(val);
        };
        var confirmBox = document.createElement("div");
        confirmBox.className = "dhx-confirm " + (props.css || "");
        confirmBox.innerHTML = "\n\t\t\t<div class=\"message-box-header\">\n\t\t\t\t<div class=\"mesage-box-title\">" + props.header + "</div>\n\t\t\t</div>\n\t\t\t<div class=\"confirm-message\">" + props.text + "</div>\n\t\t\t<div class=\"action-button " + (props.buttonsAlignment ? props.buttonsAlignment : "") + "\">\n\t\t\t\t<button class=\"reject-button dhx_btn dhx_btn--link\">" + reject + "</button>\n\t\t\t\t<button class=\"apply-button dhx_btn dhx_btn--flat\">" + apply + "</button>\n\t\t\t</div>";
        document.body.appendChild(confirmBox);
        confirmBox.querySelector(".reject-button").focus();
        var clickHandler = function (e) {
            if (e.target.tagName === "BUTTON") {
                answer(e.target.classList.contains("apply-button"));
            }
        };
        confirmBox.addEventListener("click", clickHandler);
    });
}
exports.confirm = confirm;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(47);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(29), __webpack_require__(48)))

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    apply: "apply",
    reject: "reject"
};
exports.default = locale;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts_colorpicker_1 = __webpack_require__(54);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var html_1 = __webpack_require__(3);
var view_1 = __webpack_require__(8);
var ts_data_1 = __webpack_require__(11);
var ts_grid_1 = __webpack_require__(37);
var ts_layout_1 = __webpack_require__(72);
var ts_toolbar_1 = __webpack_require__(20);
var ActionsManager_1 = __webpack_require__(22);
var context_1 = __webpack_require__(102);
var menu_1 = __webpack_require__(103);
var toolbar_1 = __webpack_require__(104);
var EditLine_1 = __webpack_require__(105);
var actions_1 = __webpack_require__(15);
var buffer_1 = __webpack_require__(106);
var CustomCsvDriver_1 = __webpack_require__(107);
var format_1 = __webpack_require__(16);
var main_1 = __webpack_require__(1);
var selection_1 = __webpack_require__(41);
var toolbar_2 = __webpack_require__(23);
var hotkeys_1 = __webpack_require__(108);
var en_1 = __webpack_require__(6);
var Selection_1 = __webpack_require__(111);
var types_1 = __webpack_require__(4);
var core_1 = __webpack_require__(2);
var Exporter_1 = __webpack_require__(113);
var XlsxDriver_1 = __webpack_require__(114);
var XlsxProxy_1 = __webpack_require__(115);
var Spreadsheet = /** @class */ (function (_super) {
    __extends(Spreadsheet, _super);
    function Spreadsheet(container, config) {
        var _this = _super.call(this, container, config) || this;
        _this.container = html_1.toNode(container);
        _this._sizes = {
            rowsCount: 1000,
            colsCount: 200
        };
        _this.config = main_1.extendConfig({
            rowsCount: { validate: function (val) { return val >= 0; }, default: 1000 },
            colsCount: { validate: function (val) { return val >= 0; }, default: 25 },
            menu: { validate: function (val) { return typeof val === "boolean"; }, default: false },
            editLine: { validate: function (val) { return typeof val === "boolean"; }, default: true },
            readonly: { validate: function (val) { return typeof val === "boolean"; }, default: false },
            autoFormat: { validate: function (val) { return typeof val === "boolean"; }, default: true },
            importModulePath: { validate: function (val) { return typeof val === "string"; }, default: "https://cdn.dhtmlx.com/libs/excel2json/1.0/worker.js" },
            exportModulePath: { validate: function (val) { return typeof val === "string"; }, default: "https://cdn.dhtmlx.com/libs/json2excel/1.0/worker.js" },
            formats: { validate: function (val) { return val instanceof Array; }, default: [] },
        }, _this.config);
        _this.events = new events_1.EventSystem();
        format_1.initFormat(_this);
        _this._initLayout();
        _this._colorPicker = new ts_colorpicker_1.Colorpicker();
        _this._setEventsHandlers();
        _this._actionsManager = new ActionsManager_1.ActionsManager({
            spreadsheet: _this,
            editLine: _this._editLine,
            grid: _this._grid
        });
        _this._buffer = new buffer_1.BufferManager(_this, _this._grid, _this._callAction);
        _this.selection = new Selection_1.Selection(_this, _this._grid, _this._buffer);
        var gridRoot = _this._grid.getRootView();
        gridRoot.hooks = gridRoot.hooks || {};
        gridRoot.hooks.didMount = function (vm) {
            if (!_this.config.readonly) {
                vm.node.el.addEventListener("contextmenu", function (e) {
                    _this.contextMenu.data.update("lock", {
                        value: _this.isLocked(_this.selection.getSelectedCell()) ? en_1.default.unlockCell : en_1.default.lockCell
                    });
                    _this.contextMenu.showAt(e);
                    e.preventDefault();
                });
            }
            gridRoot.hooks.didRedraw = function (view) {
                _this.events.fire(types_1.SpreadsheetEvents.gridRedraw, [view]);
            };
        };
        _this._generateGridStruct();
        hotkeys_1.initHotkeys(_this, _this._grid, _this._buffer);
        _this.selection.setSelectedCell("A1");
        _this.export = new Exporter_1.Exporter(_this, _this._grid);
        return _this;
    }
    Spreadsheet.prototype.destructor = function () {
        this._layout.getRootView().unmount();
        this.contextMenu.destructor();
        this.menu.destructor();
        this.toolbar.destructor();
    };
    Spreadsheet.prototype.paint = function () {
        if (this.config.rowsCount !== this._sizes.rowsCount ||
            this.config.colsCount !== this._sizes.colsCount) {
            this._generateGridStruct();
        }
        this._layout.paint();
        this._grid.paint();
    };
    Spreadsheet.prototype.load = function (url, type) {
        var _this = this;
        // [todo]
        if (type === "xlsx") {
            if (!main_1.isWasmSupported()) {
                throw new Error("WebAssembly is not supported by your browser");
            }
            this._xlsxProxy = this._xlsxProxy || new XlsxProxy_1.XlsxProxy(this);
            return this._xlsxProxy.load(url).then(function (data) {
                _this.parse(data, type);
            });
        }
        var proxy = ts_data_1.toProxy(url);
        return proxy.load().then(function (data) { _this.parse(data, type); });
    };
    Spreadsheet.prototype.parse = function (data, type) {
        var _a;
        if (type === "csv") {
            type = new CustomCsvDriver_1.CustomCsvDriver();
        }
        if (type === "xlsx") {
            type = new XlsxDriver_1.XlsxDriver();
        }
        var driver = ts_data_1.toDataDriver(type || "json");
        data = driver.toJsonArray(data, this, this._grid);
        this._grid.data.map(function (item) {
            for (var key in item) {
                if (key !== "id" && key !== "$index") {
                    item[key] = "";
                }
            }
        });
        this._grid.config.columns.map(function (col) {
            col.$cellCss = {};
        });
        if ("styles" in data) {
            var styles = data.styles;
            for (var key in styles) {
                var css = styles[key];
                dhx.css.add(css, key);
            }
            data = data.data;
            dhx.css.update();
        }
        this._updateGridSizes(data);
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var id = main_1.getCellIds(this._grid, item.cell);
            var clean = format_1.getCleanValue(item.value);
            var isNumber = format_1.isNumeric(clean);
            var value = void 0;
            var format = void 0;
            if (isNumber) {
                format = item.format || (this.config.autoFormat ? format_1.detectCellFormat(item.value) : "");
                if (this.config.autoFormat && format.indexOf("%") > -1) {
                    value = (parseFloat(clean) / 100).toFixed(4);
                }
                else {
                    value = clean;
                }
            }
            else {
                value = item.value;
            }
            this._grid.data.update(id.row, (_a = {},
                _a[id.col] = value,
                _a), true);
            if (item.css) {
                this._grid.addCellCss(id.row, id.col, item.css);
                main_1.updateCellInfo(this._grid, item.cell.toUpperCase(), {
                    css: item.css
                });
            }
            main_1.updateCellInfo(this._grid, item.cell.toUpperCase(), {
                format: format
            });
        }
        this._grid.data.events.fire(ts_data_1.DataEvents.change);
        this.selection.setSelectedCell("A1");
    };
    Spreadsheet.prototype.serialize = function () {
        var _this = this;
        var data = [];
        var styles = {};
        this._grid.data.map(function (item) {
            for (var key in item) {
                if (key !== "id" && key !== "$index") {
                    var cell = main_1.getCellNameById(_this._grid, item.id, key);
                    var value = item[key];
                    var cellObj = { cell: cell };
                    if (item.$info && item.$info[key] && item.$info[key].css) {
                        cellObj.css = item.$info[key].css;
                        styles[cellObj.css] = dhx.css.get(cellObj.css);
                    }
                    if (item.$info && item.$info[key] && item.$info[key].format !== undefined) {
                        var formatObj = format_1.getFormat(format_1.getDefaultFormatsMap()[item.$info[key].format]);
                        cellObj.format = (formatObj && formatObj.id) || item.$info[key].format;
                    }
                    if (value) {
                        cellObj.value = value;
                    }
                    if (cell && (cellObj.value || cellObj.css)) {
                        data.push(cellObj);
                    }
                }
            }
        });
        var columns = this._grid.config.columns.reduce(function (sizes, col, i) {
            if (i !== 0 && col.width !== 120) {
                sizes[i] = { width: col.width };
            }
            return sizes;
        }, {});
        if (Object.keys(styles).length > 0) {
            return {
                data: data,
                styles: styles,
                columns: columns,
                formats: this.config.formats
            };
        }
        return data;
    };
    Spreadsheet.prototype.setValue = function (cell, value) {
        if (!cell) {
            return;
        }
        this._checkForMissedCells(cell);
        if (!this.events.fire(types_1.SpreadsheetEvents.beforeValueChange, [cell, value])) {
            return;
        }
        var id = main_1.getCellIds(this._grid, cell);
        this._callAction({
            row: id.row,
            col: id.col,
            cell: cell,
            val: value,
            action: types_1.Actions.setCellValue,
            groupAction: types_1.Actions.groupAction
        });
        this._grid.paint();
        this.events.fire(types_1.SpreadsheetEvents.afterValueChange, [cell, value]);
    };
    Spreadsheet.prototype.getValue = function (cell) {
        if (!cell) {
            return;
        }
        cell = cell.toUpperCase();
        if (main_1.isRangeId(cell)) {
            var values_1 = [];
            this.eachCell(function (_c, v) {
                values_1.push(v);
            }, cell);
            return values_1;
        }
        var id = main_1.getCellIds(this._grid, cell);
        var item = this._grid.data.getItem(id.row);
        if (item) {
            return item[id.col];
        }
    };
    Spreadsheet.prototype.eachCell = function (cb, range) {
        range = range || this.selection.getSelectedCell();
        var cells = main_1.getCellsArray(range);
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var cell = cells_1[_i];
            var _a = main_1.getCellIds(this._grid, cell), row = _a.row, col = _a.col;
            var rowObj = this._grid.data.getItem(row);
            var val = rowObj ? rowObj[col] : null;
            if (val !== undefined) {
                cb(cell, val);
            }
        }
    };
    Spreadsheet.prototype.getStyle = function (cell) {
        var _this = this;
        if (!cell) {
            return;
        }
        if (main_1.isRangeId(cell)) {
            var styles_1 = [];
            this.eachCell(function (c) {
                styles_1.push(_this.getStyle(c) || {});
            }, cell);
            return styles_1;
        }
        var info = main_1.getCellInfo(this._grid, cell);
        return dhx.css.get(info.css);
    };
    Spreadsheet.prototype.setStyle = function (cell, style) {
        if (!cell || !style) {
            return;
        }
        if (!this.events.fire(types_1.SpreadsheetEvents.beforeStyleChange, [cell, style])) {
            return;
        }
        var _a = main_1.getCellIds(this._grid, cell), row = _a.row, col = _a.col;
        if (!Object.keys(style).length) {
            this._callAction({
                row: row,
                col: col,
                cell: cell,
                action: types_1.Actions.removeCellStyles,
                groupAction: types_1.Actions.groupAction
            });
            return;
        }
        this._callAction({
            val: style,
            row: row,
            col: col,
            cell: cell,
            action: types_1.Actions.setCellStyle,
            groupAction: types_1.Actions.groupAction
        });
    };
    Spreadsheet.prototype.getFormat = function (cell) {
        var _this = this;
        if (main_1.isRangeId(cell)) {
            var formats_1 = [];
            this.eachCell(function (c) {
                formats_1.push(main_1.getCellInfo(_this._grid, c).format || "");
            }, cell);
            return formats_1;
        }
        var formatMask = main_1.getCellInfo(this._grid, cell).format;
        var formatAlias = format_1.getDefaultFormatsMap()[formatMask];
        return formatAlias || formatMask;
    };
    Spreadsheet.prototype.setFormat = function (cell, format) {
        this._callAction({
            val: format,
            cell: cell,
            action: types_1.Actions.setCellFormat,
            groupAction: types_1.Actions.groupAction
        });
    };
    Spreadsheet.prototype.isLocked = function (cell) {
        var _this = this;
        var id = main_1.getCellIds(this._grid, cell);
        if ("start" in id) {
            var locked_1 = false;
            this.eachCell(function (cellId) {
                if (!locked_1) {
                    var info = main_1.getCellInfo(_this._grid, cellId).locked;
                    locked_1 = info;
                }
            }, cell);
            return locked_1;
        }
        var isLocked = main_1.getCellInfo(this._grid, cell).locked;
        return !!isLocked;
    };
    Spreadsheet.prototype.lock = function (cell) {
        var id = main_1.getCellIds(this._grid, cell);
        this._callAction({
            row: id.row,
            col: id.col,
            val: true,
            cell: cell,
            action: types_1.Actions.lockCell,
            groupAction: types_1.Actions.groupAction
        });
        this._grid.paint();
    };
    Spreadsheet.prototype.unlock = function (cell) {
        var id = main_1.getCellIds(this._grid, cell);
        this._callAction({
            row: id.row,
            col: id.col,
            val: false,
            cell: cell,
            action: types_1.Actions.lockCell,
            groupAction: types_1.Actions.groupAction
        });
        this._grid.paint();
    };
    Spreadsheet.prototype.addRow = function (cell) {
        if (!this.events.fire(types_1.SpreadsheetEvents.beforeRowAdd, [cell])) {
            return;
        }
        this._callAction({
            cell: cell,
            action: types_1.Actions.addRow,
            groupAction: types_1.Actions.groupRowAction
        });
        this.events.fire(types_1.SpreadsheetEvents.afterRowAdd, [cell]);
    };
    Spreadsheet.prototype.deleteRow = function (cell) {
        if (!this.events.fire(types_1.SpreadsheetEvents.beforeRowDelete, [cell])) {
            return;
        }
        var id = main_1.getCellIds(this._grid, cell);
        this._callAction({
            row: id.row,
            col: id.col,
            cell: cell,
            action: types_1.Actions.deleteRow,
            groupAction: types_1.Actions.groupRowAction
        });
        this.events.fire(types_1.SpreadsheetEvents.afterRowDelete, [cell]);
    };
    Spreadsheet.prototype.addColumn = function (cell) {
        if (!this.events.fire(types_1.SpreadsheetEvents.beforeColumnAdd, [cell])) {
            return;
        }
        this._callAction({
            cell: cell,
            action: types_1.Actions.addColumn,
            groupAction: types_1.Actions.groupColAction
        });
        this.events.fire(types_1.SpreadsheetEvents.afterColumnAdd, [cell]);
    };
    Spreadsheet.prototype.deleteColumn = function (cell) {
        if (!this.events.fire(types_1.SpreadsheetEvents.beforeColumnDelete, [cell])) {
            return;
        }
        this._callAction({
            cell: cell,
            action: types_1.Actions.deleteColumn,
            groupAction: types_1.Actions.groupColAction
        });
        this.events.fire(types_1.SpreadsheetEvents.afterColumnDelete, [cell]);
    };
    Spreadsheet.prototype.undo = function () {
        this._actionsManager.undo();
    };
    Spreadsheet.prototype.redo = function () {
        this._actionsManager.redo();
    };
    Spreadsheet.prototype.startEdit = function (cell, initialValue) {
        if (this.config.readonly) {
            return;
        }
        var focused = this.selection.getFocusedCell();
        if (!cell) {
            cell = focused;
        }
        cell = cell.toUpperCase();
        this._checkForMissedCells(cell);
        if (!this.events.fire(types_1.SpreadsheetEvents.beforeEditStart, [cell, initialValue])) {
            return;
        }
        if (this.isLocked(cell)) {
            return;
        }
        if (focused !== cell) {
            this.endEdit(true);
            this.selection.setSelectedCell(cell);
        }
        var cellInfo = main_1.getCellInfo(this._grid, cell);
        if (!cellInfo.edited) {
            main_1.updateCellInfo(this._grid, cell, { edited: true, nextValue: initialValue });
            this.events.fire(types_1.SpreadsheetEvents.afterEditStart, [cell, initialValue]);
        }
    };
    Spreadsheet.prototype.endEdit = function (withoutSave) {
        var focused = this.selection.getFocusedCell();
        var cellInfo = main_1.getCellInfo(this._grid, focused);
        if (cellInfo.edited) {
            if (!this.events.fire(types_1.SpreadsheetEvents.beforeEditEnd, [focused, cellInfo.nextValue])) {
                return;
            }
            if (!withoutSave && cellInfo.nextValue !== undefined) {
                this.setValue(focused, cellInfo.nextValue);
            }
            cellInfo.edited = false;
            cellInfo.nextValue = undefined;
            this._editLine.setValue(this.getValue(focused));
            this._editLine.blur();
            this.events.fire(types_1.SpreadsheetEvents.afterEditEnd, [focused, cellInfo.nextValue]);
        }
    };
    Spreadsheet.prototype._callAction = function (config) {
        if (!config || this.config.readonly) {
            return;
        }
        if (Array.isArray(config)) {
            this._actionsManager.execute(config);
            return;
        }
        if (main_1.isRangeId(config.cell)) {
            this._actionsManager.execute(config.groupAction, config);
            return;
        }
        this._actionsManager.execute(config.action, config);
    };
    Spreadsheet.prototype._initLayout = function () {
        this._grid = new ts_grid_1.Grid(null, {
            rowHeight: 32,
            width: 100,
            height: 100,
            headerRowHeight: 32,
            disableHeaderSort: true,
            splitAt: 1
        });
        this.menu = new ts_toolbar_1.Menu(null, { navigationType: "click" });
        this.menu.data.parse(menu_1.getMenuStruct(this.config));
        this.toolbar = new ts_toolbar_1.Toolbar();
        var toolbarStruct = toolbar_1.getToolbarStruct(this.config.toolbarBlocks, this.config);
        this.toolbar.data.parse(toolbarStruct);
        this.contextMenu = new ts_toolbar_1.ContextMenu();
        this.contextMenu.data.parse(context_1.getContextMenuStruct());
        this._editLine = new EditLine_1.EditLine(null, { events: this.events });
        var layout = this._layout = new ts_layout_1.Layout(this.container, {
            height: "100%", rows: [
                { id: "menu", css: "menu_wrapper" },
                { id: "toolbar", css: "toolbar_wrapper" },
                { id: "editLine", css: "editLine_wrapper" },
                { id: "grid", css: "dhx-spreadsheet-grid" },
            ],
            css: "dhx-spreadsheet"
        });
        layout.cell("menu").attach(this.menu, this);
        layout.cell("toolbar").attach(this.toolbar, this);
        layout.cell("grid").attach(this._grid, this);
        layout.cell("editLine").attach(this._editLine, this);
        if (!this.config.editLine || this.config.readonly) {
            layout.cell("editLine").hide();
        }
        if (!this.config.menu || this.config.readonly) {
            layout.cell("menu").hide();
        }
        if (this.config.readonly || !toolbarStruct || !toolbarStruct.length) {
            layout.cell("toolbar").hide();
        }
        this.mount(null, this._layout.getRootView());
    };
    Spreadsheet.prototype._generateGridStruct = function () {
        var _this = this;
        var values = this.serialize();
        var _a = this.config, rowsCount = _a.rowsCount, colsCount = _a.colsCount;
        if (rowsCount > 70000 || colsCount > 200) {
            this.config.rowsCount = Math.min(this.config.rowsCount, 70000);
            this.config.colsCount = Math.min(this.config.colsCount, 200);
        }
        var rows = [];
        for (var i = 1; i <= rowsCount; i++) {
            var row = { id: "" + i, $index: i };
            for (var k = 1; k <= colsCount; k++) {
                row[k] = "";
            }
            rows.push(row);
        }
        var cols = [
            {
                id: "$index",
                width: 40,
                header: [{ text: "" }],
                template: function (_val, row) { return _this._grid.data.getIndex(row.id) + 1; }
            }
        ];
        var inputVisible = false;
        var blurHandler = function (e) {
            requestAnimationFrame(function () {
                if (!inputVisible) {
                    return;
                }
                _this._restoreFocus(e);
            });
        };
        var inserted = function (node) {
            var input = node.el;
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
            input.addEventListener("blur", blurHandler);
            _this._editLine.setValue(input.value);
            inputVisible = true;
        };
        var removed = function () {
            inputVisible = false;
            document.removeEventListener("blur", blurHandler);
        };
        var onInput = function (cell, e) {
            if (inputVisible) {
                _this.events.fire(types_1.SpreadsheetEvents.cellInput, [cell, e.target.value]);
            }
        };
        var selected;
        this.events.on(types_1.SpreadsheetEvents.gridRedraw, function () {
            selected = null;
        });
        var template = function (val, row, col) {
            if (!selected) {
                selected = _this.selection.getFocusedCell();
            }
            var getProp = function (prop) { return row.$info && row.$info[col.id] && row.$info[col.id][prop]; };
            var isLocked = getProp("locked");
            var isEdit = getProp("edited");
            var nextValue = getProp("nextValue");
            var css = getProp("css");
            var styles = dhx.css.get(css);
            var format = getProp("format") || "";
            var cell = col.$letter + row.$index;
            var cellValue = (nextValue === undefined || nextValue === null) ? val : nextValue;
            if (selected && isEdit) {
                return dom_1.el("input.dhx_cell_input", {
                    oninput: [onInput, cell],
                    _hooks: {
                        didInsert: inserted,
                        didRemove: removed
                    },
                    class: css,
                    _key: "selection_input",
                    dhx_id: "cell_input",
                    value: cellValue
                });
            }
            var typedCellValue = format ?
                format_1.getFormattedValue(cellValue, format)
                : cellValue;
            // [dirty]
            var cellFloat = (styles && styles["text-align"] === "right") ? "right" : "none";
            return dom_1.el(".dhx_spreadsheet_cell.dhx_noselect", {
                style: {
                    float: cellFloat
                }
            }, [
                isLocked && dom_1.el(".dhx_lock_icon.dxi.dxi-key"),
                typedCellValue
            ]);
        };
        for (var i = 1; i <= colsCount; i++) {
            var letter = main_1.getLetterFromNumber(i);
            cols.push({
                id: "" + i,
                width: 120,
                $letter: letter,
                header: [{
                        text: actions_1.getHeaderCell(letter, i)
                    }],
                template: template
            });
        }
        this._grid.setHeader(cols);
        this._grid.data.parse(rows);
        this.parse(values);
        this._sizes.rowsCount = this.config.rowsCount;
        this._sizes.colsCount = this.config.colsCount;
    };
    Spreadsheet.prototype._checkForMissedCells = function (cell) {
        var index = main_1.isRangeId(cell) ? main_1.getRangeIndexes(cell).end : main_1.getCellIndex(cell);
        if (index.row > this.config.rowsCount || index.col > this.config.colsCount) {
            this.config.rowsCount = Math.max(this.config.rowsCount, index.row + 1);
            this.config.colsCount = Math.max(this.config.colsCount, index.col);
            this._generateGridStruct();
        }
    };
    Spreadsheet.prototype._updateGridSizes = function (data) {
        var dimensions = data.reduce(function (total, item) {
            var index = main_1.getCellIndex(item.cell);
            total.row = Math.max(total.row, index.row + 1);
            total.col = Math.max(total.col, index.col);
            return total;
        }, { row: this.config.rowsCount, col: this.config.colsCount });
        if (dimensions.row > this.config.rowsCount || dimensions.col > this.config.colsCount) {
            this.config.rowsCount = Math.max(dimensions.row + 1, this.config.rowsCount);
            this.config.colsCount = Math.max(dimensions.col + 1, this.config.colsCount);
            this._generateGridStruct();
        }
    };
    Spreadsheet.prototype._updateToolbar = function (cell) {
        if (cell !== this.selection.getFocusedCell()) {
            return;
        }
        var info = main_1.getCellInfo(this._grid, cell);
        toolbar_2.updateToolbar(this.toolbar, info);
    };
    Spreadsheet.prototype._setEventsHandlers = function () {
        var _this = this;
        this.events.on(types_1.SpreadsheetEvents.editLineInput, function (val) {
            var cell = _this.selection.getFocusedCell();
            _this.events.fire(types_1.SpreadsheetEvents.cellInput, [cell, val]);
        });
        this.events.on(types_1.SpreadsheetEvents.editLineFocus, function () {
            var cell = _this.selection.getFocusedCell();
            _this.startEdit(cell);
            requestAnimationFrame(function () {
                _this._editLine.focus();
            });
        });
        this.events.on(types_1.SpreadsheetEvents.cellInput, function (cell, val) {
            if (_this.isLocked(cell)) {
                return;
            }
            main_1.updateCellInfo(_this._grid, cell, {
                nextValue: val
            });
            _this._grid.paint();
        });
        this._grid.events.on(ts_grid_1.GridEvents.cellMouseDown, function () {
            _this.contextMenu._close();
        });
        this.events.on(types_1.SpreadsheetEvents.beforeSelectionSet, function () {
            if (_this.config.readonly) {
                return false;
            }
            _this.endEdit();
        });
        this.events.on(types_1.SpreadsheetEvents.afterSelectionSet, function () {
            _this._grid.paint();
        });
        this.events.on(types_1.SpreadsheetEvents.afterFocusSet, function (cell) {
            var val = _this.getValue(cell);
            var info = main_1.getCellInfo(_this._grid, cell);
            toolbar_2.updateToolbar(_this.toolbar, info);
            _this._editLine.setValue(val);
            if (info.locked) {
                _this._editLine.lock();
            }
            _this._grid.paint();
        });
        this.events.on(types_1.SpreadsheetEvents.afterStyleChange, function (cell) {
            _this._updateToolbar(cell);
        });
        this.events.on(types_1.SpreadsheetEvents.afterFormatChange, function (cell) {
            _this._updateToolbar(cell);
        });
        this.events.on(types_1.SpreadsheetEvents.afterEditStart, function () {
            _this._grid.paint();
        });
        this.events.on(types_1.SpreadsheetEvents.afterEditEnd, function () {
            _this._grid.paint();
        });
        this.toolbar.events.on(ts_toolbar_1.ToolbarEvents.click, function (id, e) {
            _this._handleAction(id, e);
        });
        this.contextMenu.events.on(ts_toolbar_1.ToolbarEvents.click, function (id, e) {
            _this._handleAction(id, e);
        });
        this.menu.events.on(ts_toolbar_1.ToolbarEvents.click, function (id, e) {
            _this._handleAction(id, e);
        });
        this._colorPicker.events.on(ts_colorpicker_1.ColorpickerEvents.colorChange, function (color) {
            var _a;
            var selected = _this.selection.getSelectedCell();
            _this.setStyle(selected, (_a = {}, _a[_this._colorpickerTarget] = color, _a));
            // restore widget focus
            requestAnimationFrame(function () {
                _this._colorpickerTarget = null;
                hotkeys_1.focusHandler.setFocusState(true);
                if (_this._activeInput) {
                    _this._activeInput.focus();
                    _this._activeInput = null;
                }
            });
        });
        this.events.on(types_1.SpreadsheetEvents.editLineBlur, function (_val, e) {
            _this._restoreFocus(e);
        });
        this.events.on(types_1.SpreadsheetEvents.groupFill, function (focused, selected) {
            _this._fillCells(focused, selected);
        });
    };
    Spreadsheet.prototype._handleAction = function (action, e) {
        var _a;
        var selected = this.selection.getSelectedCell();
        // restore widget focus
        requestAnimationFrame(function () {
            hotkeys_1.focusHandler.setFocusState(true);
        });
        // [dirty]
        var format = "";
        var formatIndex = core_1.findIndex(this.config.formats, function (f) { return f.id === action; });
        if (formatIndex !== -1) {
            format = action;
            action = "format";
        }
        switch (action) {
            case "undo":
                this._actionsManager.undo();
                break;
            case "redo":
                this._actionsManager.redo();
                break;
            case "color":
            case "background":
                this._colorpickerTarget = action;
                var info = main_1.getCellInfo(this._grid, selected);
                var css = dhx.css.get(info.css) || {};
                var def = {
                    background: "#FFFFFF",
                    color: "#4C4C4C"
                };
                var color = css[action] || def[action];
                this._colorPicker.setValue(color);
                var btn = html_1.locateNode(e, "dhx_id");
                this._colorPicker.show(btn);
                break;
            case "align-left":
            case "align-right":
            case "align-center":
            case "align-justify":
                var align = action.split("-")[1];
                this.setStyle(selected, { "text-align": align });
                break;
            case "font-weight-bold":
            case "font-style-italic":
            case "text-decoration-underline":
                var idArr = action.split("-");
                var val = idArr.pop();
                var key = idArr.join("-");
                val = toolbar_2.getToggledValue(this._grid, selected, key, val);
                this.setStyle(selected, (_a = {}, _a[key] = val, _a));
                break;
            case "clear-value":
                this.setValue(selected, "");
                break;
            case "clear-styles":
                this.setStyle(selected, {});
                break;
            case "clear-all":
                this._callAction([
                    {
                        cell: selected,
                        action: types_1.Actions.setCellStyle,
                        groupAction: main_1.isRangeId(selected) ? types_1.Actions.groupAction : null,
                        val: ""
                    },
                    {
                        cell: selected,
                        action: types_1.Actions.setCellValue,
                        groupAction: main_1.isRangeId(selected) ? types_1.Actions.groupAction : null,
                        val: ""
                    }
                ]);
                break;
            case "lock":
                if (this.isLocked(selected)) {
                    this.unlock(selected);
                    return;
                }
                this.lock(selected);
                break;
            case "remove-row":
                this.deleteRow(selected);
                break;
            case "add-row":
                this.addRow(selected);
                break;
            case "remove-col":
                this.deleteColumn(selected);
                break;
            case "add-col":
                this.addColumn(selected);
                break;
            case "help":
                window.open("https://dhtmlx-docs.gitbook.io/spreadsheet-user-guide/");
                break;
            case "format":
                this.setFormat(selected, format);
                this.paint();
                break;
            case "export-xlsx":
                this.export.xlsx();
                break;
            case "import-xlsx":
                this.load("", "xlsx");
                break;
            default:
                break;
        }
    };
    Spreadsheet.prototype._fillCells = function (focused, selected) {
        var _this = this;
        var focusedCells = [focused];
        var selectedCells = [selected];
        if (main_1.isRangeId(focused)) {
            var largerByX = selection_1.getCellsDiff(focused.split(":")[1], selected.split(":")[1]).isLargerByX;
            var dir = largerByX ? "row" : "col";
            var matrix = main_1.getRangeMatrix(focused, dir);
            focusedCells = matrix.map(function (row) {
                return row.length > 1 ? row[0] + ":" + row[row.length - 1] : row[0];
            });
            selectedCells = main_1.getRangeMatrix(selected, dir).map(function (row) {
                return row.length > 1 ? row[0] + ":" + row[row.length - 1] : row[0];
            });
        }
        var actions = focusedCells.reduce(function (acc, row, i) {
            var value = _this.getValue(row);
            var cells = selectedCells[i];
            if (Array.isArray(value)) {
                if (row === cells) {
                    return acc;
                }
                var filled = selection_1.getAutoFilledCells(value, row, cells);
                cells = filled.cells;
                value = filled.value;
            }
            var styles = _this.getStyle(row);
            var format = _this.getFormat(row);
            acc.push({
                cell: cells,
                action: types_1.Actions.setCellFormat,
                groupAction: main_1.isRangeId(cells) ? types_1.Actions.groupAction : null,
                val: format
            }, {
                cell: cells,
                action: types_1.Actions.setCellStyle,
                groupAction: main_1.isRangeId(cells) ? types_1.Actions.groupAction : null,
                val: styles
            }, {
                cell: cells,
                action: types_1.Actions.setCellValue,
                groupAction: main_1.isRangeId(cells) ? types_1.Actions.groupAction : null,
                val: value
            });
            return acc;
        }, []);
        this._callAction(actions);
        this.selection.setSelectedCell(selected);
    };
    Spreadsheet.prototype._restoreFocus = function (e) {
        var editLineContainer = this._editLine.getRootView().node.el;
        var focusedCell = this.selection.getFocusedCell();
        if (focusedCell && !main_1.getCellInfo(this._grid, focusedCell).edited) {
            return;
        }
        if (!hotkeys_1.focusHandler.getFocusState()) {
            if (this._colorpickerTarget) {
                this._activeInput = e.target;
                return;
            }
            this.endEdit();
            return;
        }
        var target = e.target;
        var relatedTarget = e.relatedTarget;
        if (editLineContainer.contains(relatedTarget)) {
            return;
        }
        if (editLineContainer.contains(target)
            && relatedTarget
            && relatedTarget.getAttribute("dhx_id") === "cell_input") {
            return;
        }
        var input = target;
        input.focus();
        // [dirty]
        setTimeout(function () {
            input.setSelectionRange(input.value.length, input.value.length);
        }, 100);
    };
    return Spreadsheet;
}(view_1.View));
exports.Spreadsheet = Spreadsheet;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(55));
__export(__webpack_require__(32));


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var html_1 = __webpack_require__(3);
var view_1 = __webpack_require__(8);
var ts_popup_1 = __webpack_require__(57);
var colorHelpers_1 = __webpack_require__(59);
var colors_1 = __webpack_require__(60);
var types_1 = __webpack_require__(32);
var Colorpicker = /** @class */ (function (_super) {
    __extends(Colorpicker, _super);
    function Colorpicker(config) {
        if (config === void 0) { config = { css: "" }; }
        var _this = _super.call(this, null, config) || this;
        _this._handleGripMove = function (e) {
            var paletteRect = _this.getRootView().refs.picker_palette.el.getBoundingClientRect();
            var top = e.clientY - paletteRect.top;
            var left = e.clientX - paletteRect.left;
            _this._calculatePaletteGrip(top, left);
            _this.paint();
        };
        _this._handleRangeMove = function (e) {
            var rangeRect = _this.getRootView().refs.hue_range.el.getBoundingClientRect();
            var rangeGripWidth = 3;
            var left = e.clientX - rangeRect.left - rangeGripWidth;
            _this._calculateRangeGrip(left);
            _this.paint();
        };
        _this._popup = new ts_popup_1.Popup({
            css: " dhx_colorpicker_popup " + _this.config.css
        });
        _this.events = new events_1.EventSystem(_this);
        _this._pickerState = {
            hsv: { h: 0, s: 1, v: 1 },
            currentView: "palette",
            customColors: [],
            customHex: ""
        };
        _this._handlers = {
            click: {
                ".dhx_palette_cell": _this._onColorClick.bind(_this)
            },
            mousedown: function (e) {
                var name = html_1.locate(e);
                _this._pickerState.customHex = "";
                var target = _this.getRootView().refs[name].el.getBoundingClientRect();
                if (name === "picker_palette") {
                    _this._calculatePaletteGrip(e.clientY - target.top, e.clientX - target.left);
                }
                else {
                    _this._calculateRangeGrip(e.clientX - target.left);
                }
                var handler = name === "picker_palette" ? _this._handleGripMove : _this._handleRangeMove;
                document.addEventListener("mousemove", handler);
                document.addEventListener("mouseup", function () {
                    document.removeEventListener("mousemove", handler);
                });
                _this.paint();
            },
            buttonsClick: function (button) {
                _this._pickerState.currentView = "palette";
                _this.paint();
                if (button === "cancel") {
                    return;
                }
                if (button === "apply" && _this._pickerState.customColors.indexOf(_this._pickerState.background) === -1) {
                    _this._pickerState.customColors.push(_this._pickerState.background);
                }
                _this._selected = _this._pickerState.background;
                _this.events.fire(types_1.ColorpickerEvents.colorChange, [_this._selected]);
                setTimeout(function () {
                    _this._popup.hide();
                }, 1);
            },
            customColorClick: function () {
                _this._pickerState.currentView = "picker";
                _this.paint();
            },
            oninput: function (e) {
                if (_this._inputTimeout) {
                    clearTimeout(_this._inputTimeout);
                }
                _this._inputTimeout = setTimeout(function () {
                    var val = e.target.value;
                    if (val.indexOf("#") === -1) {
                        val = "#" + val;
                    }
                    _this._pickerState.customHex = val;
                    if (colorHelpers_1.isHex(val)) {
                        _this._pickerState.hsv = colorHelpers_1.HexToHSV(val);
                        _this.paint();
                    }
                }, 100);
            },
            contextmenu: {
                ".dhx_palette_cell": function (e, node) {
                    e.preventDefault();
                    var color = _this._pickerState.customColors.indexOf(node.data.color);
                    if (color !== -1) {
                        _this._pickerState.customColors.splice(color, 1);
                    }
                    _this.paint();
                    return;
                }
            }
        };
        var view = dom_1.create({ render: function () { return _this._getContent(); } });
        _this.mount(_this._popup, view);
        return _this;
    }
    Colorpicker.prototype.setValue = function (value) {
        this._selected = value || null;
    };
    Colorpicker.prototype.show = function (node, side) {
        if (side === void 0) { side = "bottom"; }
        this._popup.show(html_1.toNode(node), { mode: side, centering: true });
    };
    Colorpicker.prototype.hide = function () {
        this._popup.hide();
    };
    Colorpicker.prototype._calculatePaletteGrip = function (top, left) {
        var paletteRect = this.getRootView().refs.picker_palette.el.getBoundingClientRect();
        var bottom = paletteRect.height;
        var right = paletteRect.width;
        top = top < 0 ? 0 : top > bottom ? bottom : top;
        left = left < 0 ? 0 : left > right ? right : left;
        var pLeft = Math.round(left / (right / 100));
        var pTop = 100 - Math.round(top / (bottom / 100));
        this._pickerState.hsv.s = pLeft / 100;
        this._pickerState.hsv.v = pTop / 100;
    };
    Colorpicker.prototype._calculateRangeGrip = function (left) {
        var rangeBox = this.getRootView().refs.hue_range.el.getBoundingClientRect();
        var right = rangeBox.width;
        left = left < 0 ? 0 : left > right ? right : left;
        this._pickerState.rangeLeft = left;
        this._pickerState.hsv.h = Math.round(360 * (left / right));
    };
    Colorpicker.prototype._getCells = function (colors, cellClass) {
        var _this = this;
        if (cellClass === void 0) { cellClass = ""; }
        return colors.reduce(function (cells, color) {
            var selected = _this._selected === color ? "dhx_selected" : "";
            cells.push(dom_1.el(".dhx_palette_cell", {
                class: selected + " " + cellClass,
                _data: { color: color },
                style: "background:" + color
            }));
            return cells;
        }, []);
    };
    Colorpicker.prototype._onColorClick = function (_ev, node) {
        this._selected = node.data.color;
        this.events.fire(types_1.ColorpickerEvents.colorChange, [this._selected]);
        this._popup.hide();
    };
    Colorpicker.prototype._getGrayShades = function () {
        return dom_1.el(".dhx_palette_row", this._getCells(colors_1.grayShades));
    };
    Colorpicker.prototype._getPalette = function () {
        var _this = this;
        return colors_1.palette.reduce(function (total, row) {
            total.push(dom_1.el(".dhx_palette_col", _this._getCells(row.colors)));
            return total;
        }, []);
    };
    Colorpicker.prototype._getPicker = function () {
        var rgb = colorHelpers_1.HSVtoRGB(this._pickerState.hsv);
        this._pickerState.background = colorHelpers_1.RGBToHex(rgb);
        var currentBackground = colorHelpers_1.RGBToHex(colorHelpers_1.HSVtoRGB({ h: this._pickerState.hsv.h, s: 1, v: 1 }));
        var root = this.getRootView();
        var box = root.refs ?
            root.refs.picker_palette.el.getBoundingClientRect()
            : { height: 200, width: 218, x: 0, y: 0 };
        var height = box.height - 2;
        var width = box.width - 2;
        var gripTop = (height - this._pickerState.hsv.v * height) - 4;
        var gripLeft = (this._pickerState.hsv.s * width) - 4;
        var rangeWidth = box.width - 6;
        var rangeGripLeft = rangeWidth - ((360 - this._pickerState.hsv.h) / 360) * rangeWidth;
        var inputValue = this._pickerState.customHex ?
            this._pickerState.customHex.replace("#", "")
            : this._pickerState.background.replace("#", "");
        return dom_1.el(".picker_wrap", {}, [
            dom_1.el(".dhx_picker_palette", {
                style: {
                    height: 132,
                    background: currentBackground
                },
                onmousedown: this._handlers.mousedown,
                dhx_id: "picker_palette",
                _ref: "picker_palette"
            }, [
                dom_1.el(".dhx_palette_grip", {
                    style: {
                        top: gripTop,
                        left: gripLeft
                    }
                })
            ]),
            dom_1.el(".dhx_hue_range", {
                style: { height: 16 },
                onmousedown: this._handlers.mousedown,
                dhx_id: "hue_range",
                _key: "hue_range",
                _ref: "hue_range"
            }, [
                dom_1.el(".dhx_range_grip", { style: { left: rangeGripLeft } })
            ]),
            dom_1.el(".dhx_color_value", [
                dom_1.el(".dhx_current_color", { style: { background: this._pickerState.background } }),
                dom_1.el(".dhx_hex_input_wrap", [
                    dom_1.el("input", { class: "dhx_hex_input", value: inputValue, oninput: this._handlers.oninput, maxlength: "7", _key: "hex_input" })
                ])
            ]),
            dom_1.el(".dhx_picker_buttons", [
                dom_1.el("button", { class: "dhx_btn dhx_btn--link dhx_cancel", onclick: [this._handlers.buttonsClick, "cancel"] }, "cancel"),
                dom_1.el("button", { class: "dhx_btn dhx_btn--flat dhx_apply", onclick: [this._handlers.buttonsClick, "apply"] }, "apply")
            ])
        ]);
    };
    Colorpicker.prototype._getContent = function () {
        var view = this._pickerState.currentView === "palette" ? [
            this._getGrayShades()
        ].concat((this._getPalette()), [
            dom_1.el(".dhx_custom_colors", [
                dom_1.el(".dhx_custom_colors_header", ["Custom colors", dom_1.el("span.hint", " (Right click to delete)")]),
                dom_1.el(".dhx_custom_palette.dhx_palette_row", this._getCells(this._pickerState.customColors, "custom_color_cell").concat([
                    dom_1.el(".dhx_show_picker", { class: "dxi dxi-plus", onclick: this._handlers.customColorClick })
                ]))
            ]),
        ]) :
            [this._getPicker()];
        return dom_1.el(".dhx_colorpicker_wrap", [
            dom_1.el(".dhx_palette", {
                onclick: this._handlers.click,
                oncontextmenu: this._handlers.contextmenu
            }, view)
        ]);
    };
    return Colorpicker;
}(view_1.View));
exports.Colorpicker = Colorpicker;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/**
* Copyright (c) 2017, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* domvm.js (DOM ViewModel)
* A thin, fast, dependency-free vdom view layer
* @preserve https://github.com/leeoniya/domvm (v3.2.6, micro build)
*/

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

// NOTE: if adding a new *VNode* type, make it < COMMENT and renumber rest.
// There are some places that test <= COMMENT to assert if node is a VNode

// VNode types
var ELEMENT	= 1;
var TEXT		= 2;
var COMMENT	= 3;

// placeholder types
var VVIEW		= 4;
var VMODEL		= 5;

var ENV_DOM = typeof window !== "undefined";
var win = ENV_DOM ? window : {};
var rAF = win.requestAnimationFrame;

var emptyObj = {};

function noop() {}

var isArr = Array.isArray;

function isSet(val) {
	return val != null;
}

function isPlainObj(val) {
	return val != null && val.constructor === Object;		//  && typeof val === "object"
}

function insertArr(targ, arr, pos, rem) {
	targ.splice.apply(targ, [pos, rem].concat(arr));
}

function isVal(val) {
	var t = typeof val;
	return t === "string" || t === "number";
}

function isFunc(val) {
	return typeof val === "function";
}

function isProm(val) {
	return typeof val === "object" && isFunc(val.then);
}



function assignObj(targ) {
	var args = arguments;

	for (var i = 1; i < args.length; i++)
		{ for (var k in args[i])
			{ targ[k] = args[i][k]; } }

	return targ;
}

// export const defProp = Object.defineProperty;

function deepSet(targ, path, val) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			{ targ[seg] = val; }
		else
			{ targ[seg] = targ = targ[seg] || {}; }
	}
}

/*
export function deepUnset(targ, path) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			targ[seg] = val;
		else
			targ[seg] = targ = targ[seg] || {};
	}
}
*/

function sliceArgs(args, offs) {
	var arr = [];
	for (var i = offs; i < args.length; i++)
		{ arr.push(args[i]); }
	return arr;
}

function cmpObj(a, b) {
	for (var i in a)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

function cmpArr(a, b) {
	var alen = a.length;

	if (b.length !== alen)
		{ return false; }

	for (var i = 0; i < alen; i++)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

// https://github.com/darsain/raft
// rAF throttler, aggregates multiple repeated redraw calls within single animframe
function raft(fn) {
	if (!rAF)
		{ return fn; }

	var id, ctx, args;

	function call() {
		id = 0;
		fn.apply(ctx, args);
	}

	return function() {
		ctx = this;
		args = arguments;
		if (!id) { id = rAF(call); }
	};
}

function curry(fn, args, ctx) {
	return function() {
		return fn.apply(ctx, args);
	};
}

/*
export function prop(val, cb, ctx, args) {
	return function(newVal, execCb) {
		if (newVal !== undefined && newVal !== val) {
			val = newVal;
			execCb !== false && isFunc(cb) && cb.apply(ctx, args);
		}

		return val;
	};
}
*/

/*
// adapted from https://github.com/Olical/binary-search
export function binaryKeySearch(list, item) {
    var min = 0;
    var max = list.length - 1;
    var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

    return -1;
}
*/

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
// impl borrowed from https://github.com/ivijs/ivi
function longestIncreasingSubsequence(a) {
	var p = a.slice();
	var result = [];
	result.push(0);
	var u;
	var v;

	for (var i = 0, il = a.length; i < il; ++i) {
		var j = result[result.length - 1];
		if (a[j] < a[i]) {
			p[i] = j;
			result.push(i);
			continue;
		}

		u = 0;
		v = result.length - 1;

		while (u < v) {
			var c = ((u + v) / 2) | 0;
			if (a[result[c]] < a[i]) {
				u = c + 1;
			} else {
				v = c;
			}
		}

		if (a[i] < a[result[u]]) {
			if (u > 0) {
				p[i] = result[u - 1];
			}
			result[u] = i;
		}
	}

	u = result.length;
	v = result[u - 1];

	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}

	return result;
}

// based on https://github.com/Olical/binary-search
function binaryFindLarger(item, list) {
	var min = 0;
	var max = list.length - 1;
	var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

	return (min == list.length) ? null : min;

//	return -1;
}

function isEvProp(name) {
	return name[0] === "o" && name[1] === "n";
}

function isSplProp(name) {
	return name[0] === "_";
}

function isStyleProp(name) {
	return name === "style";
}

function repaint(node) {
	node && node.el && node.el.offsetHeight;
}

function isHydrated(vm) {
	return vm.node != null && vm.node.el != null;
}

// tests interactive props where real val should be compared
function isDynProp(tag, attr) {
//	switch (tag) {
//		case "input":
//		case "textarea":
//		case "select":
//		case "option":
			switch (attr) {
				case "value":
				case "checked":
				case "selected":
//				case "selectedIndex":
					return true;
			}
//	}

	return false;
}

function getVm(n) {
	n = n || emptyObj;
	while (n.vm == null && n.parent)
		{ n = n.parent; }
	return n.vm;
}

function VNode() {}

var VNodeProto = VNode.prototype = {
	constructor: VNode,

	type:	null,

	vm:		null,

	// all this stuff can just live in attrs (as defined) just have getters here for it
	key:	null,
	ref:	null,
	data:	null,
	hooks:	null,
	ns:		null,

	el:		null,

	tag:	null,
	attrs:	null,
	body:	null,

	flags:	0,

	_class:	null,
	_diff:	null,

	// pending removal on promise resolution
	_dead:	false,
	// part of longest increasing subsequence?
	_lis:	false,

	idx:	null,
	parent:	null,

	/*
	// break out into optional fluent module
	key:	function(val) { this.key	= val; return this; },
	ref:	function(val) { this.ref	= val; return this; },		// deep refs
	data:	function(val) { this.data	= val; return this; },
	hooks:	function(val) { this.hooks	= val; return this; },		// h("div").hooks()
	html:	function(val) { this.html	= true; return this.body(val); },

	body:	function(val) { this.body	= val; return this; },
	*/
};

function defineText(body) {
	var node = new VNode;
	node.type = TEXT;
	node.body = body;
	return node;
}

// creates a one-shot self-ending stream that redraws target vm
// TODO: if it's already registered by any parent vm, then ignore to avoid simultaneous parent & child refresh

var tagCache = {};

var RE_ATTRS = /\[(\w+)(?:=(\w+))?\]/g;

function cssTag(raw) {
	{
		var cached = tagCache[raw];

		if (cached == null) {
			var tag, id, cls, attr;

			tagCache[raw] = cached = {
				tag:	(tag	= raw.match( /^[-\w]+/))		?	tag[0]						: "div",
				id:		(id		= raw.match( /#([-\w]+)/))		? 	id[1]						: null,
				class:	(cls	= raw.match(/\.([-\w.]+)/))		?	cls[1].replace(/\./g, " ")	: null,
				attrs:	null,
			};

			while (attr = RE_ATTRS.exec(raw)) {
				if (cached.attrs == null)
					{ cached.attrs = {}; }
				cached.attrs[attr[1]] = attr[2] || "";
			}
		}

		return cached;
	}
}

// (de)optimization flags

// forces slow bottom-up removeChild to fire deep willRemove/willUnmount hooks,
var DEEP_REMOVE = 1;
// prevents inserting/removing/reordering of children
var FIXED_BODY = 2;
// enables fast keyed lookup of children via binary search, expects homogeneous keyed body
var KEYED_LIST = 4;
// indicates an vnode match/diff/recycler function for body
var LAZY_LIST = 8;

function initElementNode(tag, attrs, body, flags) {
	var node = new VNode;

	node.type = ELEMENT;

	if (isSet(flags))
		{ node.flags = flags; }

	node.attrs = attrs;

	var parsed = cssTag(tag);

	node.tag = parsed.tag;

	// meh, weak assertion, will fail for id=0, etc.
	if (parsed.id || parsed.class || parsed.attrs) {
		var p = node.attrs || {};

		if (parsed.id && !isSet(p.id))
			{ p.id = parsed.id; }

		if (parsed.class) {
			node._class = parsed.class;		// static class
			p.class = parsed.class + (isSet(p.class) ? (" " + p.class) : "");
		}
		if (parsed.attrs) {
			for (var key in parsed.attrs)
				{ if (!isSet(p[key]))
					{ p[key] = parsed.attrs[key]; } }
		}

//		if (node.attrs !== p)
			node.attrs = p;
	}

	var mergedAttrs = node.attrs;

	if (isSet(mergedAttrs)) {
		if (isSet(mergedAttrs._key))
			{ node.key = mergedAttrs._key; }

		if (isSet(mergedAttrs._ref))
			{ node.ref = mergedAttrs._ref; }

		if (isSet(mergedAttrs._hooks))
			{ node.hooks = mergedAttrs._hooks; }

		if (isSet(mergedAttrs._data))
			{ node.data = mergedAttrs._data; }

		if (isSet(mergedAttrs._flags))
			{ node.flags = mergedAttrs._flags; }

		if (!isSet(node.key)) {
			if (isSet(node.ref))
				{ node.key = node.ref; }
			else if (isSet(mergedAttrs.id))
				{ node.key = mergedAttrs.id; }
			else if (isSet(mergedAttrs.name))
				{ node.key = mergedAttrs.name + (mergedAttrs.type === "radio" || mergedAttrs.type === "checkbox" ? mergedAttrs.value : ""); }
		}
	}

	if (body != null)
		{ node.body = body; }

	return node;
}

function setRef(vm, name, node) {
	var path = ["refs"].concat(name.split("."));
	deepSet(vm, path, node);
}

function setDeepRemove(node) {
	while (node = node.parent)
		{ node.flags |= DEEP_REMOVE; }
}

// vnew, vold
function preProc(vnew, parent, idx, ownVm) {
	if (vnew.type === VMODEL || vnew.type === VVIEW)
		{ return; }

	vnew.parent = parent;
	vnew.idx = idx;
	vnew.vm = ownVm;

	if (vnew.ref != null)
		{ setRef(getVm(vnew), vnew.ref, vnew); }

	var nh = vnew.hooks,
		vh = ownVm && ownVm.hooks;

	if (nh && (nh.willRemove || nh.didRemove) ||
		vh && (vh.willUnmount || vh.didUnmount))
		{ setDeepRemove(vnew); }

	if (isArr(vnew.body))
		{ preProcBody(vnew); }
	else {}
}

function preProcBody(vnew) {
	var body = vnew.body;

	for (var i = 0; i < body.length; i++) {
		var node2 = body[i];

		// remove false/null/undefined
		if (node2 === false || node2 == null)
			{ body.splice(i--, 1); }
		// flatten arrays
		else if (isArr(node2)) {
			insertArr(body, node2, i--, 1);
		}
		else {
			if (node2.type == null)
				{ body[i] = node2 = defineText(""+node2); }

			if (node2.type === TEXT) {
				// remove empty text nodes
				if (node2.body == null || node2.body === "")
					{ body.splice(i--, 1); }
				// merge with previous text node
				else if (i > 0 && body[i-1].type === TEXT) {
					body[i-1].body += node2.body;
					body.splice(i--, 1);
				}
				else
					{ preProc(node2, vnew, i, null); }
			}
			else
				{ preProc(node2, vnew, i, null); }
		}
	}
}

var unitlessProps = {
	animationIterationCount: true,
	boxFlex: true,
	boxFlexGroup: true,
	boxOrdinalGroup: true,
	columnCount: true,
	flex: true,
	flexGrow: true,
	flexPositive: true,
	flexShrink: true,
	flexNegative: true,
	flexOrder: true,
	gridRow: true,
	gridColumn: true,
	order: true,
	lineClamp: true,

	borderImageOutset: true,
	borderImageSlice: true,
	borderImageWidth: true,
	fontWeight: true,
	lineHeight: true,
	opacity: true,
	orphans: true,
	tabSize: true,
	widows: true,
	zIndex: true,
	zoom: true,

	fillOpacity: true,
	floodOpacity: true,
	stopOpacity: true,
	strokeDasharray: true,
	strokeDashoffset: true,
	strokeMiterlimit: true,
	strokeOpacity: true,
	strokeWidth: true
};

function autoPx(name, val) {
	{
		// typeof val === 'number' is faster but fails for numeric strings
		return !isNaN(val) && !unitlessProps[name] ? (val + "px") : val;
	}
}

// assumes if styles exist both are objects or both are strings
function patchStyle(n, o) {
	var ns =     (n.attrs || emptyObj).style;
	var os = o ? (o.attrs || emptyObj).style : null;

	// replace or remove in full
	if (ns == null || isVal(ns))
		{ n.el.style.cssText = ns; }
	else {
		for (var nn in ns) {
			var nv = ns[nn];

			if (os == null || nv != null && nv !== os[nn])
				{ n.el.style[nn] = autoPx(nn, nv); }
		}

		// clean old
		if (os) {
			for (var on in os) {
				if (ns[on] == null)
					{ n.el.style[on] = ""; }
			}
		}
	}
}

var didQueue = [];

function fireHook(hooks, name, o, n, immediate) {
	if (hooks != null) {
		var fn = o.hooks[name];

		if (fn) {
			if (name[0] === "d" && name[1] === "i" && name[2] === "d") {	// did*
				//	console.log(name + " should queue till repaint", o, n);
				immediate ? repaint(o.parent) && fn(o, n) : didQueue.push([fn, o, n]);
			}
			else {		// will*
				//	console.log(name + " may delay by promise", o, n);
				return fn(o, n);		// or pass  done() resolver
			}
		}
	}
}

function drainDidHooks(vm) {
	if (didQueue.length) {
		repaint(vm.node);

		var item;
		while (item = didQueue.shift())
			{ item[0](item[1], item[2]); }
	}
}

var doc = ENV_DOM ? document : null;

function closestVNode(el) {
	while (el._node == null)
		{ el = el.parentNode; }
	return el._node;
}

function createElement(tag, ns) {
	if (ns != null)
		{ return doc.createElementNS(ns, tag); }
	return doc.createElement(tag);
}

function createTextNode(body) {
	return doc.createTextNode(body);
}

function createComment(body) {
	return doc.createComment(body);
}

// ? removes if !recycled
function nextSib(sib) {
	return sib.nextSibling;
}

// ? removes if !recycled
function prevSib(sib) {
	return sib.previousSibling;
}

// TODO: this should collect all deep proms from all hooks and return Promise.all()
function deepNotifyRemove(node) {
	var vm = node.vm;

	var wuRes = vm != null && fireHook(vm.hooks, "willUnmount", vm, vm.data);

	var wrRes = fireHook(node.hooks, "willRemove", node);

	if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE && isArr(node.body)) {
		for (var i = 0; i < node.body.length; i++)
			{ deepNotifyRemove(node.body[i]); }
	}

	return wuRes || wrRes;
}

function _removeChild(parEl, el, immediate) {
	var node = el._node, vm = node.vm;

	if (isArr(node.body)) {
		if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE) {
			for (var i = 0; i < node.body.length; i++)
				{ _removeChild(el, node.body[i].el); }
		}
		else
			{ deepUnref(node); }
	}

	delete el._node;

	parEl.removeChild(el);

	fireHook(node.hooks, "didRemove", node, null, immediate);

	if (vm != null) {
		fireHook(vm.hooks, "didUnmount", vm, vm.data, immediate);
		vm.node = null;
	}
}

// todo: should delay parent unmount() by returning res prom?
function removeChild(parEl, el) {
	var node = el._node;

	// already marked for removal
	if (node._dead) { return; }

	var res = deepNotifyRemove(node);

	if (res != null && isProm(res)) {
		node._dead = true;
		res.then(curry(_removeChild, [parEl, el, true]));
	}
	else
		{ _removeChild(parEl, el); }
}

function deepUnref(node) {
	var obody = node.body;

	for (var i = 0; i < obody.length; i++) {
		var o2 = obody[i];
		delete o2.el._node;

		if (o2.vm != null)
			{ o2.vm.node = null; }

		if (isArr(o2.body))
			{ deepUnref(o2); }
	}
}

function clearChildren(parent) {
	var parEl = parent.el;

	if ((parent.flags & DEEP_REMOVE) === 0) {
		isArr(parent.body) && deepUnref(parent);
		parEl.textContent = null;
	}
	else {
		var el = parEl.firstChild;

		do {
			var next = nextSib(el);
			removeChild(parEl, el);
		} while (el = next);
	}
}

// todo: hooks
function insertBefore(parEl, el, refEl) {
	var node = el._node, inDom = el.parentNode != null;

	// el === refEl is asserted as a no-op insert called to fire hooks
	var vm = (el === refEl || !inDom) ? node.vm : null;

	if (vm != null)
		{ fireHook(vm.hooks, "willMount", vm, vm.data); }

	fireHook(node.hooks, inDom ? "willReinsert" : "willInsert", node);
	parEl.insertBefore(el, refEl);
	fireHook(node.hooks, inDom ? "didReinsert" : "didInsert", node);

	if (vm != null)
		{ fireHook(vm.hooks, "didMount", vm, vm.data); }
}

function insertAfter(parEl, el, refEl) {
	insertBefore(parEl, el, refEl ? nextSib(refEl) : null);
}

var onemit = {};

function emitCfg(cfg) {
	assignObj(onemit, cfg);
}

function emit(evName) {
	var targ = this,
		src = targ;

	var args = sliceArgs(arguments, 1).concat(src, src.data);

	do {
		var evs = targ.onemit;
		var fn = evs ? evs[evName] : null;

		if (fn) {
			fn.apply(targ, args);
			break;
		}
	} while (targ = targ.parent());

	if (onemit[evName])
		{ onemit[evName].apply(targ, args); }
}

var onevent = noop;

function config(newCfg) {
	onevent = newCfg.onevent || onevent;

	{
		if (newCfg.onemit)
			{ emitCfg(newCfg.onemit); }
	}

	
}

function bindEv(el, type, fn) {
	el[type] = fn;
}

function exec(fn, args, e, node, vm) {
	var out = fn.apply(vm, args.concat([e, node, vm, vm.data]));

	// should these respect out === false?
	vm.onevent(e, node, vm, vm.data, args);
	onevent.call(null, e, node, vm, vm.data, args);

	if (out === false) {
		e.preventDefault();
		e.stopPropagation();
	}
}

function handle(e) {
	var node = closestVNode(e.target);
	var vm = getVm(node);

	var evDef = e.currentTarget._node.attrs["on" + e.type], fn, args;

	if (isArr(evDef)) {
		fn = evDef[0];
		args = evDef.slice(1);
		exec(fn, args, e, node, vm);
	}
	else {
		for (var sel in evDef) {
			if (e.target.matches(sel)) {
				var evDef2 = evDef[sel];

				if (isArr(evDef2)) {
					fn = evDef2[0];
					args = evDef2.slice(1);
				}
				else {
					fn = evDef2;
					args = [];
				}

				exec(fn, args, e, node, vm);
			}
		}
	}
}

function patchEvent(node, name, nval, oval) {
	if (nval === oval)
		{ return; }

	var el = node.el;

	if (nval == null || isFunc(nval))
		{ bindEv(el, name, nval); }
	else if (oval == null)
		{ bindEv(el, name, handle); }
}

function remAttr(node, name, asProp) {
	if (name[0] === ".") {
		name = name.substr(1);
		asProp = true;
	}

	if (asProp)
		{ node.el[name] = ""; }
	else
		{ node.el.removeAttribute(name); }
}

// setAttr
// diff, ".", "on*", bool vals, skip _*, value/checked/selected selectedIndex
function setAttr(node, name, val, asProp, initial) {
	var el = node.el;

	if (val == null)
		{ !initial && remAttr(node, name, false); }		// will also removeAttr of style: null
	else if (node.ns != null)
		{ el.setAttribute(name, val); }
	else if (name === "class")
		{ el.className = val; }
	else if (name === "id" || typeof val === "boolean" || asProp)
		{ el[name] = val; }
	else if (name[0] === ".")
		{ el[name.substr(1)] = val; }
	else
		{ el.setAttribute(name, val); }
}

function patchAttrs(vnode, donor, initial) {
	var nattrs = vnode.attrs || emptyObj;
	var oattrs = donor.attrs || emptyObj;

	if (nattrs === oattrs) {
		
	}
	else {
		for (var key in nattrs) {
			var nval = nattrs[key];
			var isDyn = isDynProp(vnode.tag, key);
			var oval = isDyn ? vnode.el[key] : oattrs[key];

			if (nval === oval) {}
			else if (isStyleProp(key))
				{ patchStyle(vnode, donor); }
			else if (isSplProp(key)) {}
			else if (isEvProp(key))
				{ patchEvent(vnode, key, nval, oval); }
			else
				{ setAttr(vnode, key, nval, isDyn, initial); }
		}

		// TODO: bench style.cssText = "" vs removeAttribute("style")
		for (var key in oattrs) {
			!(key in nattrs) &&
			!isSplProp(key) &&
			remAttr(vnode, key, isDynProp(vnode.tag, key) || isEvProp(key));
		}
	}
}

function createView(view, data, key, opts) {
	if (view.type === VVIEW) {
		data	= view.data;
		key		= view.key;
		opts	= view.opts;
		view	= view.view;
	}

	return new ViewModel(view, data, key, opts);
}

//import { XML_NS, XLINK_NS } from './defineSvgElement';
function hydrateBody(vnode) {
	for (var i = 0; i < vnode.body.length; i++) {
		var vnode2 = vnode.body[i];
		var type2 = vnode2.type;

		// ELEMENT,TEXT,COMMENT
		if (type2 <= COMMENT)
			{ insertBefore(vnode.el, hydrate(vnode2)); }		// vnode.el.appendChild(hydrate(vnode2))
		else if (type2 === VVIEW) {
			var vm = createView(vnode2.view, vnode2.data, vnode2.key, vnode2.opts)._redraw(vnode, i, false);		// todo: handle new data updates
			type2 = vm.node.type;
			insertBefore(vnode.el, hydrate(vm.node));
		}
		else if (type2 === VMODEL) {
			var vm = vnode2.vm;
			vm._redraw(vnode, i);					// , false
			type2 = vm.node.type;
			insertBefore(vnode.el, vm.node.el);		// , hydrate(vm.node)
		}
	}
}

//  TODO: DRY this out. reusing normal patch here negatively affects V8's JIT
function hydrate(vnode, withEl) {
	if (vnode.el == null) {
		if (vnode.type === ELEMENT) {
			vnode.el = withEl || createElement(vnode.tag, vnode.ns);

		//	if (vnode.tag === "svg")
		//		vnode.el.setAttributeNS(XML_NS, 'xmlns:xlink', XLINK_NS);

			if (vnode.attrs != null)
				{ patchAttrs(vnode, emptyObj, true); }

			if ((vnode.flags & LAZY_LIST) === LAZY_LIST)	// vnode.body instanceof LazyList
				{ vnode.body.body(vnode); }

			if (isArr(vnode.body))
				{ hydrateBody(vnode); }
			else if (vnode.body != null && vnode.body !== "")
				{ vnode.el.textContent = vnode.body; }
		}
		else if (vnode.type === TEXT)
			{ vnode.el = withEl || createTextNode(vnode.body); }
		else if (vnode.type === COMMENT)
			{ vnode.el = withEl || createComment(vnode.body); }
	}

	vnode.el._node = vnode;

	return vnode.el;
}

// prevent GCC from inlining some large funcs (which negatively affects Chrome's JIT)
//window.syncChildren = syncChildren;
window.lisMove = lisMove;

function nextNode(node, body) {
	return body[node.idx + 1];
}

function prevNode(node, body) {
	return body[node.idx - 1];
}

function parentNode(node) {
	return node.parent;
}

var BREAK = 1;
var BREAK_ALL = 2;

function syncDir(advSib, advNode, insert, sibName, nodeName, invSibName, invNodeName, invInsert) {
	return function(node, parEl, body, state, convTest, lis) {
		var sibNode, tmpSib;

		if (state[sibName] != null) {
			// skip dom elements not created by domvm
			if ((sibNode = state[sibName]._node) == null) {
				state[sibName] = advSib(state[sibName]);
				return;
			}

			if (parentNode(sibNode) !== node) {
				tmpSib = advSib(state[sibName]);
				sibNode.vm != null ? sibNode.vm.unmount(true) : removeChild(parEl, state[sibName]);
				state[sibName] = tmpSib;
				return;
			}
		}

		if (state[nodeName] == convTest)
			{ return BREAK_ALL; }
		else if (state[nodeName].el == null) {
			insert(parEl, hydrate(state[nodeName]), state[sibName]);	// should lis be updated here?
			state[nodeName] = advNode(state[nodeName], body);		// also need to advance sib?
		}
		else if (state[nodeName].el === state[sibName]) {
			state[nodeName] = advNode(state[nodeName], body);
			state[sibName] = advSib(state[sibName]);
		}
		// head->tail or tail->head
		else if (!lis && sibNode === state[invNodeName]) {
			tmpSib = state[sibName];
			state[sibName] = advSib(tmpSib);
			invInsert(parEl, tmpSib, state[invSibName]);
			state[invSibName] = tmpSib;
		}
		else {
			if (lis && state[sibName] != null)
				{ return lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state); }

			return BREAK;
		}
	};
}

function lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state) {
	if (sibNode._lis) {
		insert(parEl, state[nodeName].el, state[sibName]);
		state[nodeName] = advNode(state[nodeName], body);
	}
	else {
		// find closest tomb
		var t = binaryFindLarger(sibNode.idx, state.tombs);
		sibNode._lis = true;
		var tmpSib = advSib(state[sibName]);
		insert(parEl, state[sibName], t != null ? body[state.tombs[t]].el : t);

		if (t == null)
			{ state.tombs.push(sibNode.idx); }
		else
			{ state.tombs.splice(t, 0, sibNode.idx); }

		state[sibName] = tmpSib;
	}
}

var syncLft = syncDir(nextSib, nextNode, insertBefore, "lftSib", "lftNode", "rgtSib", "rgtNode", insertAfter);
var syncRgt = syncDir(prevSib, prevNode, insertAfter, "rgtSib", "rgtNode", "lftSib", "lftNode", insertBefore);

function syncChildren(node, donor) {
	var obody	= donor.body,
		parEl	= node.el,
		body	= node.body,
		state = {
			lftNode:	body[0],
			rgtNode:	body[body.length - 1],
			lftSib:		((obody)[0] || emptyObj).el,
			rgtSib:		(obody[obody.length - 1] || emptyObj).el,
		};

	converge:
	while (1) {
//		from_left:
		while (1) {
			var l = syncLft(node, parEl, body, state, null, false);
			if (l === BREAK) { break; }
			if (l === BREAK_ALL) { break converge; }
		}

//		from_right:
		while (1) {
			var r = syncRgt(node, parEl, body, state, state.lftNode, false);
			if (r === BREAK) { break; }
			if (r === BREAK_ALL) { break converge; }
		}

		sortDOM(node, parEl, body, state);
		break;
	}
}

// TODO: also use the state.rgtSib and state.rgtNode bounds, plus reduce LIS range
function sortDOM(node, parEl, body, state) {
	var kids = Array.prototype.slice.call(parEl.childNodes);
	var domIdxs = [];

	for (var k = 0; k < kids.length; k++) {
		var n = kids[k]._node;

		if (n.parent === node)
			{ domIdxs.push(n.idx); }
	}

	// list of non-movable vnode indices (already in correct order in old dom)
	var tombs = longestIncreasingSubsequence(domIdxs).map(function (i) { return domIdxs[i]; });

	for (var i = 0; i < tombs.length; i++)
		{ body[tombs[i]]._lis = true; }

	state.tombs = tombs;

	while (1) {
		var r = syncLft(node, parEl, body, state, null, true);
		if (r === BREAK_ALL) { break; }
	}
}

function alreadyAdopted(vnode) {
	return vnode.el._node.parent !== vnode.parent;
}

function takeSeqIndex(n, obody, fromIdx) {
	return obody[fromIdx];
}

function findSeqThorough(n, obody, fromIdx) {		// pre-tested isView?
	for (; fromIdx < obody.length; fromIdx++) {
		var o = obody[fromIdx];

		if (o.vm != null) {
			// match by key & viewFn || vm
			if (n.type === VVIEW && o.vm.view === n.view && o.vm.key === n.key || n.type === VMODEL && o.vm === n.vm)
				{ return o; }
		}
		else if (!alreadyAdopted(o) && n.tag === o.tag && n.type === o.type && n.key === o.key && (n.flags & ~DEEP_REMOVE) === (o.flags & ~DEEP_REMOVE))
			{ return o; }
	}

	return null;
}

function findHashKeyed(n, obody, fromIdx) {
	return obody[obody._keys[n.key]];
}

/*
// list must be a sorted list of vnodes by key
function findBinKeyed(n, list) {
	var idx = binaryKeySearch(list, n.key);
	return idx > -1 ? list[idx] : null;
}
*/

// have it handle initial hydrate? !donor?
// types (and tags if ELEM) are assumed the same, and donor exists
function patch(vnode, donor) {
	fireHook(donor.hooks, "willRecycle", donor, vnode);

	var el = vnode.el = donor.el;

	var obody = donor.body;
	var nbody = vnode.body;

	el._node = vnode;

	// "" => ""
	if (vnode.type === TEXT && nbody !== obody) {
		el.nodeValue = nbody;
		return;
	}

	if (vnode.attrs != null || donor.attrs != null)
		{ patchAttrs(vnode, donor, false); }

	// patch events

	var oldIsArr = isArr(obody);
	var newIsArr = isArr(nbody);
	var lazyList = (vnode.flags & LAZY_LIST) === LAZY_LIST;

//	var nonEqNewBody = nbody != null && nbody !== obody;

	if (oldIsArr) {
		// [] => []
		if (newIsArr || lazyList)
			{ patchChildren(vnode, donor); }
		// [] => "" | null
		else if (nbody !== obody) {
			if (nbody != null)
				{ el.textContent = nbody; }
			else
				{ clearChildren(donor); }
		}
	}
	else {
		// "" | null => []
		if (newIsArr) {
			clearChildren(donor);
			hydrateBody(vnode);
		}
		// "" | null => "" | null
		else if (nbody !== obody) {
			if (el.firstChild)
				{ el.firstChild.nodeValue = nbody; }
			else
				{ el.textContent = nbody; }
		}
	}

	fireHook(donor.hooks, "didRecycle", donor, vnode);
}

// larger qtys of KEYED_LIST children will use binary search
//const SEQ_FAILS_MAX = 100;

// TODO: modify vtree matcher to work similar to dom reconciler for keyed from left -> from right -> head/tail -> binary
// fall back to binary if after failing nri - nli > SEQ_FAILS_MAX
// while-advance non-keyed fromIdx
// [] => []
function patchChildren(vnode, donor) {
	var nbody		= vnode.body,
		nlen		= nbody.length,
		obody		= donor.body,
		olen		= obody.length,
		isLazy		= (vnode.flags & LAZY_LIST) === LAZY_LIST,
		isFixed		= (vnode.flags & FIXED_BODY) === FIXED_BODY,
		isKeyed		= (vnode.flags & KEYED_LIST) === KEYED_LIST,
		domSync		= !isFixed && vnode.type === ELEMENT,
		doFind		= true,
		find		= (
			isKeyed ? findHashKeyed :				// keyed lists/lazyLists
			isFixed || isLazy ? takeSeqIndex :		// unkeyed lazyLists and FIXED_BODY
			findSeqThorough							// more complex stuff
		);

	if (isKeyed) {
		var keys = {};
		for (var i = 0; i < obody.length; i++)
			{ keys[obody[i].key] = i; }
		obody._keys = keys;
	}

	if (domSync && nlen === 0) {
		clearChildren(donor);
		if (isLazy)
			{ vnode.body = []; }	// nbody.tpl(all);
		return;
	}

	var donor2,
		node2,
		foundIdx,
		patched = 0,
		everNonseq = false,
		fromIdx = 0;		// first unrecycled node (search head)

	if (isLazy) {
		var fnode2 = {key: null};
		var nbodyNew = Array(nlen);
	}

	for (var i = 0; i < nlen; i++) {
		if (isLazy) {
			var remake = false;
			var diffRes = null;

			if (doFind) {
				if (isKeyed)
					{ fnode2.key = nbody.key(i); }

				donor2 = find(fnode2, obody, fromIdx);
			}

			if (donor2 != null) {
                foundIdx = donor2.idx;
				diffRes = nbody.diff(i, donor2);

				// diff returns same, so cheaply adopt vnode without patching
				if (diffRes === true) {
					node2 = donor2;
					node2.parent = vnode;
					node2.idx = i;
					node2._lis = false;
				}
				// diff returns new diffVals, so generate new vnode & patch
				else
					{ remake = true; }
			}
			else
				{ remake = true; }

			if (remake) {
				node2 = nbody.tpl(i);			// what if this is a VVIEW, VMODEL, injected element?
				preProc(node2, vnode, i);

				node2._diff = diffRes != null ? diffRes : nbody.diff(i);

				if (donor2 != null)
					{ patch(node2, donor2); }
			}
			else {
				// TODO: flag tmp FIXED_BODY on unchanged nodes?

				// domSync = true;		if any idx changes or new nodes added/removed
			}

			nbodyNew[i] = node2;
		}
		else {
			var node2 = nbody[i];
			var type2 = node2.type;

			// ELEMENT,TEXT,COMMENT
			if (type2 <= COMMENT) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {
					patch(node2, donor2);
					foundIdx = donor2.idx;
				}
			}
			else if (type2 === VVIEW) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {		// update/moveTo
					foundIdx = donor2.idx;
					var vm = donor2.vm._update(node2.data, vnode, i);		// withDOM
				}
				else
					{ var vm = createView(node2.view, node2.data, node2.key, node2.opts)._redraw(vnode, i, false); }	// createView, no dom (will be handled by sync below)

				type2 = vm.node.type;
			}
			else if (type2 === VMODEL) {
				// if the injected vm has never been rendered, this vm._update() serves as the
				// initial vtree creator, but must avoid hydrating (creating .el) because syncChildren()
				// which is responsible for mounting below (and optionally hydrating), tests .el presence
				// to determine if hydration & mounting are needed
				var withDOM = isHydrated(node2.vm);

				var vm = node2.vm._update(node2.data, vnode, i, withDOM);
				type2 = vm.node.type;
			}
		}

		// found donor & during a sequential search ...at search head
		if (!isKeyed && donor2 != null) {
			if (foundIdx === fromIdx) {
				// advance head
				fromIdx++;
				// if all old vnodes adopted and more exist, stop searching
				if (fromIdx === olen && nlen > olen) {
					// short-circuit find, allow loop just create/init rest
					donor2 = null;
					doFind = false;
				}
			}
			else
				{ everNonseq = true; }

			if (olen > 100 && everNonseq && ++patched % 10 === 0)
				{ while (fromIdx < olen && alreadyAdopted(obody[fromIdx]))
					{ fromIdx++; } }
		}
	}

	// replace List w/ new body
	if (isLazy)
		{ vnode.body = nbodyNew; }

	domSync && syncChildren(vnode, donor);
}

// view + key serve as the vm's unique identity
function ViewModel(view, data, key, opts) {
	var vm = this;

	vm.view = view;
	vm.data = data;
	vm.key = key;

	if (opts) {
		vm.opts = opts;
		vm.config(opts);
	}

	var out = isPlainObj(view) ? view : view.call(vm, vm, data, key, opts);

	if (isFunc(out))
		{ vm.render = out; }
	else {
		vm.render = out.render;
		vm.config(out);
	}

	// these must be wrapped here since they're debounced per view
	vm._redrawAsync = raft(function (_) { return vm.redraw(true); });
	vm._updateAsync = raft(function (newData) { return vm.update(newData, true); });

	vm.init && vm.init.call(vm, vm, vm.data, vm.key, opts);
}

var ViewModelProto = ViewModel.prototype = {
	constructor: ViewModel,

	_diff:	null,	// diff cache

	init:	null,
	view:	null,
	key:	null,
	data:	null,
	state:	null,
	api:	null,
	opts:	null,
	node:	null,
	hooks:	null,
	onevent: noop,
	refs:	null,
	render:	null,

	mount: mount,
	unmount: unmount,
	config: function(opts) {
		var t = this;

		if (opts.init)
			{ t.init = opts.init; }
		if (opts.diff)
			{ t.diff = opts.diff; }
		if (opts.onevent)
			{ t.onevent = opts.onevent; }

		// maybe invert assignment order?
		if (opts.hooks)
			{ t.hooks = assignObj(t.hooks || {}, opts.hooks); }

		{
			if (opts.onemit)
				{ t.onemit = assignObj(t.onemit || {}, opts.onemit); }
		}
	},
	parent: function() {
		return getVm(this.node.parent);
	},
	root: function() {
		var p = this.node;

		while (p.parent)
			{ p = p.parent; }

		return p.vm;
	},
	redraw: function(sync) {
		var vm = this;
		sync ? vm._redraw(null, null, isHydrated(vm)) : vm._redrawAsync();
		return vm;
	},
	update: function(newData, sync) {
		var vm = this;
		sync ? vm._update(newData, null, null, isHydrated(vm)) : vm._updateAsync(newData);
		return vm;
	},

	_update: updateSync,
	_redraw: redrawSync,
	_redrawAsync: null,
	_updateAsync: null,
};

function mount(el, isRoot) {
	var vm = this;

	if (isRoot) {
		clearChildren({el: el, flags: 0});

		vm._redraw(null, null, false);

		// if placeholder node doesnt match root tag
		if (el.nodeName.toLowerCase() !== vm.node.tag) {
			hydrate(vm.node);
			insertBefore(el.parentNode, vm.node.el, el);
			el.parentNode.removeChild(el);
		}
		else
			{ insertBefore(el.parentNode, hydrate(vm.node, el), el); }
	}
	else {
		vm._redraw(null, null);

		if (el)
			{ insertBefore(el, vm.node.el); }
	}

	if (el)
		{ drainDidHooks(vm); }

	return vm;
}

// asSub means this was called from a sub-routine, so don't drain did* hook queue
function unmount(asSub) {
	var vm = this;

	var node = vm.node;
	var parEl = node.el.parentNode;

	// edge bug: this could also be willRemove promise-delayed; should .then() or something to make sure hooks fire in order
	removeChild(parEl, node.el);

	if (!asSub)
		{ drainDidHooks(vm); }
}

function reParent(vm, vold, newParent, newIdx) {
	if (newParent != null) {
		newParent.body[newIdx] = vold;
		vold.idx = newIdx;
		vold.parent = newParent;
		vold._lis = false;
	}
	return vm;
}

function redrawSync(newParent, newIdx, withDOM) {
	var isRedrawRoot = newParent == null;
	var vm = this;
	var isMounted = vm.node && vm.node.el && vm.node.el.parentNode;

	var vold = vm.node, oldDiff, newDiff;

	if (vm.diff != null) {
		oldDiff = vm._diff;
		vm._diff = newDiff = vm.diff(vm, vm.data);

		if (vold != null) {
			var cmpFn = isArr(oldDiff) ? cmpArr : cmpObj;
			var isSame = oldDiff === newDiff || cmpFn(oldDiff, newDiff);

			if (isSame)
				{ return reParent(vm, vold, newParent, newIdx); }
		}
	}

	isMounted && fireHook(vm.hooks, "willRedraw", vm, vm.data);

	var vnew = vm.render.call(vm, vm, vm.data, oldDiff, newDiff);

	if (vnew === vold)
		{ return reParent(vm, vold, newParent, newIdx); }

	// todo: test result of willRedraw hooks before clearing refs
	vm.refs = null;

	// always assign vm key to root vnode (this is a de-opt)
	if (vm.key != null && vnew.key !== vm.key)
		{ vnew.key = vm.key; }

	vm.node = vnew;

	if (newParent) {
		preProc(vnew, newParent, newIdx, vm);
		newParent.body[newIdx] = vnew;
	}
	else if (vold && vold.parent) {
		preProc(vnew, vold.parent, vold.idx, vm);
		vold.parent.body[vold.idx] = vnew;
	}
	else
		{ preProc(vnew, null, null, vm); }

	if (withDOM !== false) {
		if (vold) {
			// root node replacement
			if (vold.tag !== vnew.tag || vold.key !== vnew.key) {
				// hack to prevent the replacement from triggering mount/unmount
				vold.vm = vnew.vm = null;

				var parEl = vold.el.parentNode;
				var refEl = nextSib(vold.el);
				removeChild(parEl, vold.el);
				insertBefore(parEl, hydrate(vnew), refEl);

				// another hack that allows any higher-level syncChildren to set
				// reconciliation bounds using a live node
				vold.el = vnew.el;

				// restore
				vnew.vm = vm;
			}
			else
				{ patch(vnew, vold); }
		}
		else
			{ hydrate(vnew); }
	}

	isMounted && fireHook(vm.hooks, "didRedraw", vm, vm.data);

	if (isRedrawRoot && isMounted)
		{ drainDidHooks(vm); }

	return vm;
}

// this also doubles as moveTo
// TODO? @withRedraw (prevent redraw from firing)
function updateSync(newData, newParent, newIdx, withDOM) {
	var vm = this;

	if (newData != null) {
		if (vm.data !== newData) {
			fireHook(vm.hooks, "willUpdate", vm, newData);
			vm.data = newData;

			
		}
	}

	return vm._redraw(newParent, newIdx, withDOM);
}

function defineElement(tag, arg1, arg2, flags) {
	var attrs, body;

	if (arg2 == null) {
		if (isPlainObj(arg1))
			{ attrs = arg1; }
		else
			{ body = arg1; }
	}
	else {
		attrs = arg1;
		body = arg2;
	}

	return initElementNode(tag, attrs, body, flags);
}

//export const XML_NS = "http://www.w3.org/2000/xmlns/";
var SVG_NS = "http://www.w3.org/2000/svg";

function defineSvgElement(tag, arg1, arg2, flags) {
	var n = defineElement(tag, arg1, arg2, flags);
	n.ns = SVG_NS;
	return n;
}

function defineComment(body) {
	var node = new VNode;
	node.type = COMMENT;
	node.body = body;
	return node;
}

// placeholder for declared views
function VView(view, data, key, opts) {
	this.view = view;
	this.data = data;
	this.key = key;
	this.opts = opts;
}

VView.prototype = {
	constructor: VView,

	type: VVIEW,
	view: null,
	data: null,
	key: null,
	opts: null,
};

function defineView(view, data, key, opts) {
	return new VView(view, data, key, opts);
}

// placeholder for injected ViewModels
function VModel(vm) {
	this.vm = vm;
}

VModel.prototype = {
	constructor: VModel,

	type: VMODEL,
	vm: null,
};

function injectView(vm) {
//	if (vm.node == null)
//		vm._redraw(null, null, false);

//	return vm.node;

	return new VModel(vm);
}

function injectElement(el) {
	var node = new VNode;
	node.type = ELEMENT;
	node.el = node.key = el;
	return node;
}

function lazyList(items, cfg) {
	var len = items.length;

	var self = {
		items: items,
		length: len,
		// defaults to returning item identity (or position?)
		key: function(i) {
			return cfg.key(items[i], i);
		},
		// default returns 0?
		diff: function(i, donor) {
			var newVals = cfg.diff(items[i], i);
			if (donor == null)
				{ return newVals; }
			var oldVals = donor._diff;
			var same = newVals === oldVals || isArr(oldVals) ? cmpArr(newVals, oldVals) : cmpObj(newVals, oldVals);
			return same || newVals;
		},
		tpl: function(i) {
			return cfg.tpl(items[i], i);
		},
		map: function(tpl) {
			cfg.tpl = tpl;
			return self;
		},
		body: function(vnode) {
			var nbody = Array(len);

			for (var i = 0; i < len; i++) {
				var vnode2 = self.tpl(i);

			//	if ((vnode.flags & KEYED_LIST) === KEYED_LIST && self. != null)
			//		vnode2.key = getKey(item);

				vnode2._diff = self.diff(i);			// holds oldVals for cmp

				nbody[i] = vnode2;

				// run preproc pass (should this be just preProc in above loop?) bench
				preProc(vnode2, vnode, i);
			}

			// replace List with generated body
			vnode.body = nbody;
		}
	};

	return self;
}

var nano = {
	config: config,

	ViewModel: ViewModel,
	VNode: VNode,

	createView: createView,

	defineElement: defineElement,
	defineSvgElement: defineSvgElement,
	defineText: defineText,
	defineComment: defineComment,
	defineView: defineView,

	injectView: injectView,
	injectElement: injectElement,

	lazyList: lazyList,

	FIXED_BODY: FIXED_BODY,
	DEEP_REMOVE: DEEP_REMOVE,
	KEYED_LIST: KEYED_LIST,
	LAZY_LIST: LAZY_LIST,
};

function protoPatch(n, doRepaint) {
	patch$1(this, n, doRepaint);
}

// newNode can be either {class: style: } or full new VNode
// will/didPatch hooks?
function patch$1(o, n, doRepaint) {
	if (n.type != null) {
		// no full patching of view roots, just use redraw!
		if (o.vm != null)
			{ return; }

		preProc(n, o.parent, o.idx, null);
		o.parent.body[o.idx] = n;
		patch(n, o);
		doRepaint && repaint(n);
		drainDidHooks(getVm(n));
	}
	else {
		// TODO: re-establish refs

		// shallow-clone target
		var donor = Object.create(o);
		// fixate orig attrs
		donor.attrs = assignObj({}, o.attrs);
		// assign new attrs into live targ node
		var oattrs = assignObj(o.attrs, n);
		// prepend any fixed shorthand class
		if (o._class != null) {
			var aclass = oattrs.class;
			oattrs.class = aclass != null && aclass !== "" ? o._class + " " + aclass : o._class;
		}

		patchAttrs(o, donor);

		doRepaint && repaint(o);
	}
}

VNodeProto.patch = protoPatch;

function nextSubVms(n, accum) {
	var body = n.body;

	if (isArr(body)) {
		for (var i = 0; i < body.length; i++) {
			var n2 = body[i];

			if (n2.vm != null)
				{ accum.push(n2.vm); }
			else
				{ nextSubVms(n2, accum); }
		}
	}

	return accum;
}

function defineElementSpread(tag) {
	var args = arguments;
	var len = args.length;
	var body, attrs;

	if (len > 1) {
		var bodyIdx = 1;

		if (isPlainObj(args[1])) {
			attrs = args[1];
			bodyIdx = 2;
		}

		if (len === bodyIdx + 1 && (isVal(args[bodyIdx]) || isArr(args[bodyIdx]) || attrs && (attrs._flags & LAZY_LIST) === LAZY_LIST))
			{ body = args[bodyIdx]; }
		else
			{ body = sliceArgs(args, bodyIdx); }
	}

	return initElementNode(tag, attrs, body);
}

function defineSvgElementSpread() {
	var n = defineElementSpread.apply(null, arguments);
	n.ns = SVG_NS;
	return n;
}

ViewModelProto.emit = emit;
ViewModelProto.onemit = null;

ViewModelProto.body = function() {
	return nextSubVms(this.node, []);
};

nano.defineElementSpread = defineElementSpread;
nano.defineSvgElementSpread = defineSvgElementSpread;

return nano;

})));
//# sourceMappingURL=domvm.micro.js.map


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(58));
__export(__webpack_require__(31));
__export(__webpack_require__(30));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var html_1 = __webpack_require__(3);
var types_1 = __webpack_require__(30);
var Wrapper_1 = __webpack_require__(31);
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, core_1.extend({}, config)) || this;
        _this.events = config.events || new events_1.EventSystem();
        _this._isActive = false;
        return _this;
    }
    Popup.prototype.show = function (node, config, attached) {
        var _this = this;
        if (config === void 0) { config = {}; }
        if (this.events.fire(types_1.PopupEvents.beforeShow) === false) {
            return;
        }
        if (this._isActive) {
            this.hide();
        }
        if (attached) {
            this.attach(attached);
        }
        setTimeout(function () {
            document.body.appendChild(_this._popup);
            var _a = _this._popup.getBoundingClientRect(), width = _a.width, height = _a.height;
            var _b = html_1.fitPosition(node, __assign({}, config, { width: width, height: height })), left = _b.left, top = _b.top;
            _this._popup.style.left = left;
            _this._popup.style.top = top;
            _this._isActive = true;
            _this.events.fire(types_1.PopupEvents.afterShow);
            _this._outerClickDestructor = _this._detectOuterClick(node);
        });
    };
    Popup.prototype.hide = function () {
        this._hide(false);
    };
    Popup.prototype.isVisible = function () {
        return this._isActive;
    };
    Popup.prototype.toVDOM = function () {
        return dom_1.el("div", {
            class: "dhx-popup-content " + (this.config.css || ""),
            _key: this._uid
        }, [
            _super.prototype.toVDOM.call(this)
        ]);
    };
    Popup.prototype._initHandlers = function () {
        this._handlers = {};
    };
    Popup.prototype._detectOuterClick = function (node) {
        var _this = this;
        var outerClick = function (e) {
            var target = e.target;
            while (target) {
                if (target === node || target === _this._popup) {
                    return;
                }
                target = target.parentNode;
            }
            if (_this._hide(true)) {
                document.removeEventListener("click", outerClick);
            }
        };
        document.addEventListener("click", outerClick);
        return function () { return document.removeEventListener("click", outerClick); };
    };
    Popup.prototype._hide = function (fromOuterClick) {
        if (this._isActive) {
            if (this.events.fire(types_1.PopupEvents.beforeHide, [fromOuterClick]) === false) {
                return false;
            }
            document.body.removeChild(this._popup);
            this._isActive = false;
            if (this._outerClickDestructor) {
                this._outerClickDestructor();
                this._outerClickDestructor = null;
            }
            this.events.fire(types_1.PopupEvents.afterHide);
            return true;
        }
    };
    return Popup;
}(Wrapper_1.Wrapper));
exports.Popup = Popup;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function HSVtoRGB(hsv) {
    var rgb = { r: 0, g: 0, b: 0 };
    var h = hsv.h / 60;
    var s = hsv.s;
    var v = hsv.v;
    var i = Math.floor(h) % 6;
    var f = h - Math.floor(h);
    var p = 255 * v * (1 - s);
    var q = 255 * v * (1 - (s * f));
    var t = 255 * v * (1 - (s * (1 - f)));
    v *= 255;
    switch (i) {
        case 0:
            rgb.r = v;
            rgb.g = t;
            rgb.b = p;
            break;
        case 1:
            rgb.r = q;
            rgb.g = v;
            rgb.b = p;
            break;
        case 2:
            rgb.r = p;
            rgb.g = v;
            rgb.b = t;
            break;
        case 3:
            rgb.r = p;
            rgb.g = q;
            rgb.b = v;
            break;
        case 4:
            rgb.r = t;
            rgb.g = p;
            rgb.b = v;
            break;
        case 5:
            rgb.r = v;
            rgb.g = p;
            rgb.b = q;
            break;
    }
    for (var key in rgb) {
        rgb[key] = Math.round(rgb[key]);
    }
    return rgb;
}
exports.HSVtoRGB = HSVtoRGB;
function RGBToHex(rgb) {
    return Object.keys(rgb).reduce(function (hex, c) {
        var h = rgb[c].toString(16).toUpperCase();
        h = h.length === 1 ? "0" + h : h;
        return hex += h;
    }, "#");
}
exports.RGBToHex = RGBToHex;
function HexToRGB(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
exports.HexToRGB = HexToRGB;
function RGBToHSV(rgb) {
    var h;
    var s;
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;
    var v = Math.max(r, g, b);
    var diff = v - Math.min(r, g, b);
    var diffc = function (c) {
        return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
        h = s = 0;
    }
    else {
        s = diff / v;
        var rdif = diffc(r);
        var gdif = diffc(g);
        var bdif = diffc(b);
        if (r === v) {
            h = bdif - gdif;
        }
        else if (g === v) {
            h = (1 / 3) + rdif - bdif;
        }
        else if (b === v) {
            h = (2 / 3) + gdif - rdif;
        }
        if (h < 0) {
            h += 1;
        }
        else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.floor(h * 360),
        s: s,
        v: v
    };
}
exports.RGBToHSV = RGBToHSV;
function HexToHSV(hex) {
    return RGBToHSV(HexToRGB(hex));
}
exports.HexToHSV = HexToHSV;
function isHex(hex) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}
exports.isHex = isHex;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.grayShades = [
    "#000000",
    "#4C4C4C",
    "#666666",
    "#808080",
    "#999999",
    "#B3B3B3",
    "#CCCCCC",
    "#E6E6E6",
    "#F2F2F2",
    "#FFFFFF"
];
exports.palette = [{
        colors: [
            "#D4DAE4",
            "#B0B8CD",
            "#949DB1",
            "#727A8C",
            "#5E6677",
            "#3F4757",
            "#1D2534"
        ]
    },
    {
        colors: [
            "#FFCDD2",
            "#FE9998",
            "#F35C4E",
            "#E94633",
            "#D73C2D",
            "#CA3626",
            "#BB2B1A"
        ]
    },
    {
        colors: [
            "#F9E6AD",
            "#F4D679",
            "#EDB90F",
            "#EAA100",
            "#EA8F00",
            "#EA7E00",
            "#EA5D00"
        ]
    },
    {
        colors: [
            "#BCE4CE",
            "#90D2AF",
            "#33B579",
            "#36955F",
            "#247346",
            "#1D5B38",
            "#17492D"
        ]
    },
    {
        colors: [
            "#BDF0E9",
            "#92E7DC",
            "#02D7C5",
            "#11B3A5",
            "#018B80",
            "#026B60",
            "#024F43"
        ]
    },
    {
        colors: [
            "#B3E5FC",
            "#81D4FA",
            "#29B6F6",
            "#039BE5",
            "#0288D1",
            "#0277BD",
            "#01579B"
        ]
    },
    {
        colors: [
            "#AEC1FF",
            "#88A3F9",
            "#5874CD",
            "#2349AE",
            "#163FA2",
            "#083596",
            "#002381"
        ]
    },
    {
        colors: [
            "#C5C0DA",
            "#9F97C1",
            "#7E6BAD",
            "#584A8F",
            "#4F4083",
            "#473776",
            "#3A265F"
        ]
    },
    {
        colors: [
            "#D6BDCC",
            "#C492AC",
            "#A9537C",
            "#963A64",
            "#81355A",
            "#6E3051",
            "#4C2640"
        ]
    },
    {
        colors: [
            "#D2C5C1",
            "#B4A09A",
            "#826358",
            "#624339",
            "#5D4037",
            "#4E342E",
            "#3E2723"
        ]
    }
];


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(13);
var Loader = /** @class */ (function () {
    function Loader(parent, changes) {
        this._parent = parent;
        this._changes = changes; // todo: [dirty] mutation
    }
    Loader.prototype.load = function (url, driver) {
        var _this = this;
        return this._parent.loadData = url.load().then(function (data) {
            _this._parent.removeAll();
            _this.parse(data, driver);
        });
    };
    Loader.prototype.parse = function (data, driver) {
        if (driver === void 0) { driver = "json"; }
        driver = helpers_1.toDataDriver(driver);
        data = driver.toJsonArray(data);
        this._parent.$parse(data);
    };
    Loader.prototype.save = function (url) {
        var _this = this;
        var _loop_1 = function (el) {
            if (el.saving || el.pending) {
                helpers_1.dhxWarning("item is saving");
            }
            else {
                var prevEl_1 = this_1._findPrevState(el.id);
                if (prevEl_1 && prevEl_1.saving) {
                    var pending = new Promise(function (res, rej) {
                        prevEl_1.promise.then(function () {
                            el.pending = false;
                            res(_this._setPromise(el, url));
                        }).catch(function (err) {
                            _this._removeFromOrder(prevEl_1);
                            _this._setPromise(el, url);
                            helpers_1.dhxWarning(err);
                            rej(err);
                        });
                    });
                    this_1._addToChain(pending);
                    el.pending = true;
                }
                else {
                    this_1._setPromise(el, url);
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            _loop_1(el);
        }
        this._parent.saveData.then(function () {
            _this._saving = false;
        });
    };
    Loader.prototype._setPromise = function (el, url) {
        var _this = this;
        el.promise = url.save(el.obj, el.status);
        el.promise.then(function () {
            _this._removeFromOrder(el);
        }).catch(function (err) {
            el.saving = false;
            el.error = true;
            helpers_1.dhxError(err);
        });
        el.saving = true;
        this._saving = true;
        this._addToChain(el.promise);
        return el.promise;
    };
    Loader.prototype._addToChain = function (promise) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (this._parent.saveData && this._saving) {
            this._parent.saveData = this._parent.saveData.then(function () { return promise; });
        }
        else {
            this._parent.saveData = promise;
        }
    };
    Loader.prototype._findPrevState = function (id) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.id === id) {
                return el;
            }
        }
        return null;
    };
    Loader.prototype._removeFromOrder = function (el) {
        this._changes.order = this._changes.order.filter(function (item) { return !helpers_1.isEqualObj(item, el); });
    };
    return Loader;
}());
exports.Loader = Loader;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(13);
var Sort = /** @class */ (function () {
    function Sort() {
    }
    Sort.prototype.sort = function (array, by) {
        var _this = this;
        if (by.rule && typeof by.rule === "function") {
            this._sort(array, by);
        }
        else if (by.by) {
            by.rule = function (a, b) {
                var aa = _this._checkVal(by.as, a[by.by]);
                var bb = _this._checkVal(by.as, b[by.by]);
                return helpers_1.naturalCompare(aa.toString(), bb.toString()); // didnt work with numbers
            };
            this._sort(array, by);
        }
    };
    Sort.prototype._checkVal = function (method, val) {
        return method ? method.call(this, val) : val;
    };
    Sort.prototype._sort = function (arr, conf) {
        var _this = this;
        var dir = {
            asc: 1,
            desc: -1
        };
        return arr.sort(function (a, b) {
            return conf.rule.call(_this, a, b) * (dir[conf.dir] || dir.asc);
        });
    };
    return Sort;
}());
exports.Sort = Sort;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(3);
var types_1 = __webpack_require__(17);
var CollectionStore_1 = __webpack_require__(64);
var treecollection_1 = __webpack_require__(36);
var types_2 = __webpack_require__(12);
var DropPosition;
(function (DropPosition) {
    DropPosition[DropPosition["top"] = 0] = "top";
    DropPosition[DropPosition["bot"] = 1] = "bot";
    DropPosition[DropPosition["in"] = 2] = "in";
})(DropPosition || (DropPosition = {}));
function getParentElement(target) {
    if (target instanceof Event) {
        target = target.target;
    }
    while (target && target.getAttribute) {
        var id = target.getAttribute("dhx_id");
        if (id) {
            return target;
        }
        target = target.parentNode;
    }
}
function getPosition(ev) {
    var y = ev.y;
    var element = getParentElement(ev); // may be use domvm refs
    if (!element) {
        return null;
    }
    var treeLine = element.childNodes[0];
    var _a = treeLine.getBoundingClientRect(), top = _a.top, height = _a.height;
    return (y - top) / height;
}
function dragEventContent(item) {
    var ghost = document.createElement("div");
    ghost.textContent = item.value || item.text;
    ghost.className = "drag-ghost"; // need pointer-events: none
    return ghost;
}
var DragManager = /** @class */ (function () {
    function DragManager() {
        var _this = this;
        this._transferData = {};
        this._canMove = true;
        this._ghostTopPadding = -17;
        this._onMouseMove = function (e) {
            if (!_this._transferData.id) {
                return;
            }
            var pageX = e.pageX, pageY = e.pageY;
            if (!_this._transferData.ghost) {
                if (Math.abs(_this._transferData.x - pageX) < 3 && Math.abs(_this._transferData.y - pageY) < 3) {
                    return;
                }
                else {
                    var ghost = _this._onDragStart(_this._transferData.id, _this._transferData.targetId);
                    if (!ghost) {
                        _this._endDrop();
                        return;
                    }
                    else {
                        _this._transferData.ghost = ghost;
                        document.body.appendChild(_this._transferData.ghost);
                    }
                }
            }
            _this._moveGhost(pageX, pageY);
            _this._onDrag(e);
        };
        this._onMouseUp = function () {
            if (!_this._transferData.x) {
                return;
            }
            if (_this._transferData.ghost) {
                _this._removeGhost();
                _this._onDrop();
            }
            else {
                _this._endDrop();
            }
            document.removeEventListener("mousemove", _this._onMouseMove);
            document.removeEventListener("mouseup", _this._onMouseUp);
        };
    }
    DragManager.prototype.setItem = function (id, item, config) {
        // const collection = document.querySelector(`[dhx_collection_id=${id}]`); // use it for add onmousedown here
        CollectionStore_1.collectionStore.setItem(id, item, config);
    };
    DragManager.prototype.onMouseDown = function (e) {
        if (e.which !== 1) {
            return;
        }
        document.addEventListener("mousemove", this._onMouseMove);
        document.addEventListener("mouseup", this._onMouseUp);
        var id = html_1.locate(e, "dhx_id");
        var targetId = html_1.locate(e, "dhx_collection_id");
        if (id && targetId) {
            this._transferData.x = e.x;
            this._transferData.y = e.y;
            this._transferData.targetId = targetId;
            this._transferData.id = id;
        }
    };
    DragManager.prototype._moveGhost = function (x, y) {
        if (this._transferData.ghost) {
            var width = this._transferData.ghost.offsetWidth / 2;
            this._transferData.ghost.style.left = x - width + "px";
            this._transferData.ghost.style.top = y + this._ghostTopPadding + "px";
        }
    };
    DragManager.prototype._removeGhost = function () {
        document.body.removeChild(this._transferData.ghost);
    };
    DragManager.prototype._onDrop = function () {
        if (!this._canMove) {
            this._endDrop();
            return;
        }
        var target = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        var config = CollectionStore_1.collectionStore.getItemConfig(this._lastCollectionId);
        if (!target || config.mode === types_2.DragMode.source) {
            this._endDrop();
            return;
        }
        var to = {
            id: this._lastId,
            target: target
        };
        var from = {
            id: this._transferData.id,
            target: this._transferData.target
        };
        if (from.target.events.fire(types_1.DragEvents.beforeDrop, [from, to])) {
            this._move(from, to);
            to.target.events.fire(types_1.DragEvents.dropComplete, [to.id, this._transferData.dropPosition]);
        }
        this._endDrop();
    };
    DragManager.prototype._onDragStart = function (id, targetId) {
        var target = CollectionStore_1.collectionStore.getItem(targetId);
        var config = CollectionStore_1.collectionStore.getItemConfig(targetId);
        if (config.dragMode === types_2.DragMode.target) {
            return null;
        }
        var item = target.data.getItem(id);
        target.events.fire(types_1.DragEvents.dragStart); // we need it for cancel selection
        var ghost = dragEventContent(item);
        var ans = target.events.fire(types_1.DragEvents.beforeDrag, [item, ghost]);
        if (!ans || !id) {
            return null;
        }
        this._toggleTextSelection(true);
        this._transferData.target = target;
        this._transferData.dragConfig = config;
        return ghost;
    };
    DragManager.prototype._onDrag = function (e) {
        var x = e.x, y = e.y;
        var element = document.elementFromPoint(x, y);
        var id = html_1.locate(element, "dhx_id");
        if (!id) {
            this._cancelCanDrop();
            return;
        }
        var collectionId = html_1.locate(element, "dhx_collection_id");
        if (this._transferData.dragConfig.behaviour === types_2.DragBehaviour.complex) {
            var pos = getPosition(e);
            if (pos <= 0.25) {
                this._transferData.dropPosition = DropPosition.top;
            }
            else if (pos >= 0.75) {
                this._transferData.dropPosition = DropPosition.bot;
            }
            else {
                this._transferData.dropPosition = DropPosition.in;
            }
        }
        else if (this._lastId === id && this._lastCollectionId === collectionId) {
            return;
        }
        var eventArgs;
        var from;
        var targetTo;
        if ((!id || !collectionId) && this._canMove) {
            this._cancelCanDrop();
            return;
        }
        else {
            from = {
                id: this._transferData.id,
                target: this._transferData.target
            };
            targetTo = CollectionStore_1.collectionStore.getItem(collectionId);
            eventArgs = [from, {
                    id: id,
                    target: targetTo
                }];
            from.target.events.fire(types_1.DragEvents.dragOut, eventArgs);
        }
        if (collectionId !== this._transferData.targetId || !(from.target.data instanceof treecollection_1.TreeCollection) ||
            (from.target.data instanceof treecollection_1.TreeCollection && from.target.data.canCopy(from.id, id))) {
            // handle cursor or something, can drop
            this._cancelCanDrop(); // clear last
            this._lastId = id;
            this._lastCollectionId = collectionId;
            eventArgs.push(this._transferData.dropPosition);
            var canMove = from.target.events.fire(types_1.DragEvents.dragIn, eventArgs);
            if (canMove) {
                this._canDrop();
            }
        }
        else {
            this._cancelCanDrop();
        }
    };
    DragManager.prototype._move = function (from, to) {
        var fromData = from.target.data;
        var toData = to.target.data;
        var index = 0;
        var targetId = to.id;
        var behaviour = this._transferData.dragConfig.behaviour;
        switch (behaviour) {
            case types_2.DragBehaviour.child:
                break;
            case types_2.DragBehaviour.sibling:
                targetId = toData.getParent(targetId);
                index = toData.getIndex(to.id) + 1;
                break;
            case types_2.DragBehaviour.complex:
                var dropPosition = this._transferData.dropPosition;
                if (dropPosition === DropPosition.top) {
                    targetId = toData.getParent(targetId);
                    index = toData.getIndex(to.id);
                }
                else if (dropPosition === DropPosition.bot) {
                    targetId = toData.getParent(targetId);
                    index = toData.getIndex(to.id) + 1;
                }
                break;
        }
        if (this._transferData.dragConfig.copy) {
            fromData.copy(from.id, index, toData, targetId);
        }
        else {
            fromData.move(from.id, index, toData, targetId);
        }
    };
    DragManager.prototype._endDrop = function () {
        this._toggleTextSelection(false);
        if (this._transferData.target) {
            this._transferData.target.events.fire(types_1.DragEvents.dragEnd);
        }
        this._cancelCanDrop();
        this._canMove = true;
        this._transferData = {};
        this._lastId = null;
        this._lastCollectionId = null;
    };
    DragManager.prototype._cancelCanDrop = function () {
        this._canMove = false;
        var collection = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        if (collection && this._lastId) {
            collection.events.fire(types_1.DragEvents.cancelDrop, [this._lastId]);
        }
    };
    DragManager.prototype._canDrop = function () {
        this._canMove = true;
        var collection = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        if (collection && this._lastId) {
            collection.events.fire(types_1.DragEvents.canDrop, [this._lastId, this._transferData.dropPosition]);
        }
    };
    DragManager.prototype._toggleTextSelection = function (add) {
        if (add) {
            document.body.classList.add("dhx-no-select");
        }
        else {
            document.body.classList.remove("dhx-no-select");
        }
    };
    return DragManager;
}());
exports.dragManager = new DragManager();


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollectionStore = /** @class */ (function () {
    function CollectionStore() {
        this._store = {};
    }
    CollectionStore.prototype.setItem = function (id, target, config) {
        this._store[id] = {
            target: target,
            config: config
        };
    };
    CollectionStore.prototype.getItem = function (id) {
        if (!this._store[id]) {
            return null;
        }
        return this._store[id].target;
    };
    CollectionStore.prototype.getItemConfig = function (id) {
        if (!this._store[id]) {
            return null;
        }
        return this._store[id].config;
    };
    return CollectionStore;
}());
exports.collectionStore = new CollectionStore();


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(7);
var types_1 = __webpack_require__(17);
var types_2 = __webpack_require__(12);
var Selection = /** @class */ (function () {
    function Selection(_config, data, events) {
        var _this = this;
        this.events = events || (new events_1.EventSystem());
        this._data = data;
        this._data.events.on(types_2.DataEvents.removeAll, function () {
            _this._selected = null;
        });
        this._data.events.on(types_2.DataEvents.change, function () {
            if (_this._selected) {
                var near = _this._data.getNearId(_this._selected);
                if (near !== _this._selected) {
                    _this._selected = null;
                    if (near) {
                        _this.add(near);
                    }
                }
            }
        });
    }
    Selection.prototype.getId = function () {
        return this._selected;
    };
    Selection.prototype.getItem = function () {
        if (this._selected) {
            return this._data.getItem(this._selected);
        }
        return null;
    };
    Selection.prototype.remove = function (id) {
        id = id || this._selected;
        if (!id) {
            return true;
        }
        if (this.events.fire(types_1.SelectionEvents.beforeUnSelect, [id])) {
            this._data.update(id, { $selected: false });
            this._selected = null;
            this.events.fire(types_1.SelectionEvents.afterUnSelect, [id]);
            return true;
        }
        return false;
    };
    Selection.prototype.add = function (id) {
        if (this._selected === id) {
            return;
        }
        this.remove();
        if (this.events.fire(types_1.SelectionEvents.beforeSelect, [id])) {
            this._selected = id;
            this._data.update(id, { $selected: true });
            this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
        }
    };
    return Selection;
}());
exports.Selection = Selection;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(7);
var html_1 = __webpack_require__(3);
var view_1 = __webpack_require__(8);
var ts_data_1 = __webpack_require__(11);
var dataHelpers_1 = __webpack_require__(38);
var Exporter_1 = __webpack_require__(67);
var helpers_1 = __webpack_require__(14);
var templates_1 = __webpack_require__(68);
var TreeGridCollection_1 = __webpack_require__(71);
var types_1 = __webpack_require__(19);
var core_1 = __webpack_require__(2);
var content_1 = __webpack_require__(39);
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(container, config) {
        var _this = _super.call(this, container, config) || this;
        _this._defConfig = {
            rowHeight: 40,
            headerRowHeight: 40,
            columns: [],
            data: []
        };
        _this.content = content_1.content;
        _this.config = __assign({}, _this._defConfig, config);
        _this._scroll = {
            top: 0,
            left: 0
        };
        _this._htmlEvents = {
            onclick: html_1.eventHandler(function (ev) { return html_1.locate(ev); }, {
                dhx_grid_header_cell: function (_ev, item) {
                    if (!_this.config.disableHeaderSort) {
                        _this.events.fire(types_1.GridEvents.sort, [item]);
                    }
                },
                dhx_grid_expand_cell: function (_ev, item) { return _this.events.fire(types_1.GridEvents.expand, [item]); }
            }),
            onscroll: function (e) {
                _this._scroll = {
                    top: e.target.scrollTop,
                    left: e.target.scrollLeft
                };
                _this.paint();
            }
        };
        _this._init();
        if (_this.config.columns) {
            _this._parseColumns();
        }
        if (_this.config.data && _this.config.columns) {
            _this.data.parse(_this.config.data);
        }
        var view = dom_1.create({
            render: function (vm, obj) {
                return templates_1.render(vm, obj, _this._currentData);
            }
        }, _this);
        _this.mount(container, view);
        return _this;
    }
    Grid.prototype.destructor = function () {
        this.getRootView().unmount();
    };
    Grid.prototype.setHeader = function (columns) {
        this.config.columns = columns;
        this._parseColumns();
    };
    Grid.prototype.sort = function (by, dir) {
        if (!dir) {
            if (this._sortBy === by) {
                this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
            }
            else {
                this._sortDir = "desc";
            }
        }
        else {
            this._sortDir = dir;
        }
        this._sortBy = by;
        this.data.sort({
            by: by,
            dir: this._sortDir,
            as: function (el) { return "" + el; }
        });
    };
    Grid.prototype.addRowCss = function (id, css) {
        var item = this.data.getItem(id);
        var styles = item.$css || "";
        if (!styles.match(new RegExp(css, "g"))) {
            item.$css = styles + (" " + css);
            // [todo]
            var index = core_1.findIndex(this._currentData, function (row) { return row.id === item.id; });
            if (index >= 0) {
                this._currentData[index].$css = item.$css;
            }
            this.paint();
        }
    };
    Grid.prototype.removeRowCss = function (id, css) {
        var item = this.data.getItem(id);
        var styles = item.$css ? item.$css.replace(css, "") : "";
        item.$css = styles;
    };
    Grid.prototype.addCellCss = function (row, col, css) {
        var column = this._getColumn(col);
        if (column) {
            if (column.$cellCss[row]) {
                column.$cellCss[row] += column.$cellCss[row].match(new RegExp(css, "g")) ? "" : " " + css;
            }
            else if (this.data.getItem(row)) {
                column.$cellCss[row] = css + " ";
            }
            this.paint();
        }
    };
    Grid.prototype.removeCellCss = function (row, col, css) {
        var column = this._getColumn(col);
        if (column) {
            if (column.$cellCss[row]) {
                column.$cellCss[row] = column.$cellCss[row].replace(css, "");
                this.paint();
            }
            else if (this.data.getItem(row)) {
                column.$cellCss[row] = "";
            }
        }
    };
    Grid.prototype.getScrollState = function () {
        return {
            x: this._scroll.left,
            y: this._scroll.top
        };
    };
    Grid.prototype.scroll = function (x, y) {
        var gridBody = this.getRootView().refs.grid_body.el;
        gridBody.scrollLeft = typeof x === "number" ? x : gridBody.scrollLeft;
        gridBody.scrollTop = typeof y === "number" ? y : gridBody.scrollTop;
    };
    Grid.prototype.scrollTo = function (row, col) {
        var colInd = core_1.findIndex(this.config.columns, function (obj) { return obj.id === col; });
        var fixedColsWidth = this.config.splitAt ?
            this.config.columns.slice(0, this.config.splitAt).reduce(function (total, c) { return total += c.width; }, 0)
            : 0;
        var x = this.config.columns.slice(0, colInd).reduce(function (total, c) { return total += c.width; }, 0) - fixedColsWidth;
        var y = this.data.getIndex(row) * this.config.rowHeight;
        var scrollState = this.getScrollState();
        var gridRight = this.config.width + scrollState.x;
        var gridBottom = this.config.height + scrollState.y - (this.config.headerRowHeight * this.config.$headerLevel);
        var cellTop = y - scrollState.y - this.config.rowHeight;
        var cellLeft = x - scrollState.x - this.config.columns[colInd].width;
        var cellBottom = y + (this.config.rowHeight * 2) + 17 - gridBottom;
        var cellRight = x + (this.config.columns[colInd].width * 2) + 17 - gridRight;
        var scrollTop = (cellTop > 0 && cellBottom < 0) ? 0 : cellTop < 0 ? cellTop : cellBottom;
        var scrollLeft = (cellLeft > 0 && cellRight < 0) ? 0 : cellLeft < 0 ? cellLeft : cellRight;
        this.scroll(scrollLeft + scrollState.x, scrollTop + scrollState.y);
    };
    Grid.prototype.adjustColumnWidth = function (id) {
        var index = core_1.findIndex(this.config.columns, function (с) { return с.id === id; });
        var col = this.config.columns[index];
        this.data.map(function (row) {
            col.maxWidth = col.maxWidth || col.width;
            col.maxWidth = Math.max(helpers_1.getStrWidth(helpers_1.removeHTMLTags(row[col.id])) + 20, col.maxWidth);
        });
        this.config.$totalWidth = this.config.columns.reduce(function (t, column) {
            column.width = column.maxWidth || column.width;
            return t += column.width;
        }, 0);
        this.paint();
    };
    Grid.prototype._getColumn = function (id) {
        for (var _i = 0, _a = this.config.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.id === id) {
                return col;
            }
        }
    };
    Grid.prototype._init = function () {
        var _this = this;
        this.events = new events_1.EventSystem(this);
        this._attachDataCollection();
        this.data.events.on(ts_data_1.DataEvents.load, function () {
            _this._parseData();
        });
        this.data.events.on(ts_data_1.DataEvents.change, function () {
            _this._currentData = _this.data.map(function (el) { return el; }) || [];
            _this._checkMarks();
            // set auto width to all columns
            if (_this.config.columnsAutoWidth) {
                if (typeof _this.config.columnsAutoWidth === "number") {
                    _this._setAutoWidth(_this.config.columnsAutoWidth);
                }
                else {
                    _this._setAutoWidth();
                }
            }
            _this._render();
        });
        this.export = new Exporter_1.Exporter(this);
        this._setEventHandlers();
    };
    Grid.prototype._setEventHandlers = function () {
        var _this = this;
        this.events.on(types_1.GridEvents.sort, function (id) { return _this.sort(id); });
        this.events.on(types_1.GridEvents.expand, function (id) {
            var item = _this.data.getItem(id);
            _this.data.update(id, { $opened: !item.$opened });
        });
        this.events.on(types_1.GridEvents.headerInput, function (val, colId, filter) {
            _this.data.filter({
                by: colId,
                match: val,
                compare: _this.content[filter].match
            }, {
                multiple: true
            });
        });
    };
    Grid.prototype._attachDataCollection = function () {
        var _this = this;
        var prep = function (data) {
            if (data.spans) {
                _this.config.spans = data.spans;
                data = data.data;
            }
            return data;
        };
        if (this.config.type === "tree") {
            this.data = new TreeGridCollection_1.TreeGridCollection({
                prep: prep
            }, this.events);
        }
        else {
            this.data = new ts_data_1.DataCollection({
                prep: prep
            }, this.events);
        }
    };
    Grid.prototype._setMarks = function (col, func) {
        var colCells = this.data.map(function (row) { return ({ id: row.id, data: row[col.id], row: row }); });
        var colCellsData = this.data.map(function (row) { return row[col.id]; });
        var _loop_1 = function (cell) {
            var css = func(cell.data, colCellsData, cell.row, col);
            if (css) {
                col.$cellCss = col.$cellCss || {};
                var cellCss_1 = (col.$cellCss[cell.id] || "").split(" ");
                css.split(" ").map(function (item) {
                    if (cellCss_1.indexOf(item) === -1) {
                        cellCss_1.push(item);
                    }
                });
                col.$cellCss[cell.id] = cellCss_1.join(" ");
            }
        };
        for (var _i = 0, colCells_1 = colCells; _i < colCells_1.length; _i++) {
            var cell = colCells_1[_i];
            _loop_1(cell);
        }
    };
    Grid.prototype._checkMarks = function () {
        var _this = this;
        this.config.columns.map(function (col) {
            var mark = col.mark;
            if (mark) {
                if (typeof mark === "function") {
                    _this._setMarks(col, mark);
                }
                else {
                    _this._setMarks(col, function (el, c) {
                        var data = c.filter(function (item) { return item !== null; });
                        var min = Math.min.apply(Math, data);
                        var max = Math.max.apply(Math, data);
                        if (mark.max && max === parseFloat(el)) {
                            return mark.max;
                        }
                        if (mark.min && min === parseFloat(el)) {
                            return mark.min;
                        }
                        return false;
                    });
                }
            }
        });
    };
    Grid.prototype._parseColumns = function () {
        var columns = this.config.columns;
        dataHelpers_1.normalizeColumns(columns);
        dataHelpers_1.countColumns(this.config, columns);
        if (this.config.type === "tree" && columns.length) {
            this._getTreeHeadersWidth();
        }
    };
    // [todo] use adjustColumnWidth
    Grid.prototype._setAutoWidth = function (colsCount) {
        var _this = this;
        this.data.map(function (row) {
            _this.config.columns.map(function (col, i) {
                if (colsCount && colsCount <= i) {
                    return col;
                }
                col.maxWidth = col.maxWidth || col.width;
                col.maxWidth = Math.max(helpers_1.getStrWidth(helpers_1.removeHTMLTags(row[col.id])) + 20, col.maxWidth);
            });
        });
        this.config.$totalWidth = this.config.columns.reduce(function (t, col) {
            col.width = col.maxWidth || col.width;
            return t += col.width;
        }, 0);
    };
    // [todo] make more smart type detection
    Grid.prototype._detectColsTypes = function () {
        var firstRow = this.data.getItem(this.data.getId(0));
        this.config.columns = this.config.columns.map(function (col) {
            if (col.type) {
                return col;
            }
            var v = parseFloat(firstRow[col.id]);
            var val = isNaN(v) ? firstRow[col.id] : v;
            col.type = typeof val;
            return col;
        });
    };
    Grid.prototype._parseData = function () {
        var firstItem = this.data.getId(0);
        if (firstItem) {
            if (this.config.columns.length) {
                this._detectColsTypes();
                if (this.config.type === "tree") {
                    this._getTreeHeadersWidth();
                }
            }
            this._currentData = this.data.serialize() || [];
        }
        this._checkFilters();
        this._checkMarks();
        this._render();
    };
    Grid.prototype._checkFilters = function () {
        var data = this._currentData;
        this.config.columns.map(function (col) {
            col.header.map(function (cell) {
                if (cell.content) {
                    col.$uniqueData = dataHelpers_1.getUnique(data, col.id);
                }
            });
        });
    };
    Grid.prototype._getTreeHeadersWidth = function () {
        if ("getMaxLevel" in this.data) {
            var maxLevel = this.data.getMaxLevel();
            var firstCol_1 = this.config.columns[0];
            var DEFAULT_PADDING = 10;
            var ICON_WIDTH = 35;
            var paddings = maxLevel * (DEFAULT_PADDING + ICON_WIDTH);
            var firstColWidth_1 = 0;
            this.data.map(function (el) {
                firstColWidth_1 = Math.max(helpers_1.getStrWidth(helpers_1.removeHTMLTags("" + el[firstCol_1.id])), firstColWidth_1);
            });
            var newWidth = Math.max(firstColWidth_1 + paddings, firstCol_1.width);
            this.config.$totalWidth = this.config.$totalWidth - firstCol_1.width + newWidth;
            this.config.columns[0].width = newWidth;
        }
    };
    Grid.prototype._render = function () {
        this.paint();
    };
    return Grid;
}(view_1.View));
exports.Grid = Grid;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(14);
var Exporter = /** @class */ (function () {
    function Exporter(_view) {
        this._view = _view;
    }
    Exporter.prototype.xls = function (config) {
        return this._export(config);
    };
    Exporter.prototype._export = function (config) {
        if (config === void 0) { config = {}; }
        var configCols = this._view.config.columns;
        var rowsIndexMap = {};
        var headers = helpers_1.transpose(this._view.config.columns.map(function (col) {
            return col.header.map(function (level) { return level.text || " "; });
        }));
        var columns = [];
        var uniqStyles = {
            default: {
                color: "#000000",
                background: "#FFFFFF",
                fontSize: 14
            }
        };
        var cells = [];
        var columnsIndexMap = {};
        var data = this._view.data.serialize().map(function (row, i) {
            rowsIndexMap[row.id] = i;
            var rowData = configCols.map(function (col, k) {
                columnsIndexMap[col.id] = k;
                return helpers_1.removeHTMLTags(row[col.id]);
            });
            return rowData;
        });
        for (var _i = 0, configCols_1 = configCols; _i < configCols_1.length; _i++) {
            var col = configCols_1[_i];
            columns.push({ width: col.width });
            for (var key in col.$cellCss) {
                var colStyle = col.$cellCss[key];
                var colStyleHash = colStyle
                    .split("")
                    .reduce(function (h, letter) {
                    // tslint:disable-next-line:no-bitwise
                    var hh = ((h << 5) - h) + letter.charCodeAt(0);
                    return Math.abs(hh & hh);
                }, 0).toString();
                if (!uniqStyles[colStyleHash]) {
                    var cont = document.body;
                    var css = helpers_1.getStyleByClass(colStyle, cont, "dhx_grid_row", uniqStyles.default);
                    if (css) {
                        uniqStyles[colStyleHash] = css;
                    }
                }
                if (uniqStyles[colStyleHash]) {
                    cells.push([rowsIndexMap[key], col.id, colStyleHash]);
                }
            }
        }
        var exportData = {
            name: (config.name || "data"),
            columns: columns,
            header: headers,
            data: data,
            styles: {
                cells: cells,
                css: uniqStyles
            }
        };
        if (config.url) {
            var form_1 = document.createElement("form");
            form_1.setAttribute("target", "_blank");
            form_1.setAttribute("action", config.url);
            form_1.setAttribute("method", "POST");
            form_1.style.visibility = "hidden";
            var input = document.createElement("textarea");
            input.setAttribute("name", "data");
            input.value = JSON.stringify(exportData);
            form_1.appendChild(input);
            document.body.appendChild(form_1);
            form_1.submit();
            setTimeout(function () {
                form_1.parentNode.removeChild(form_1);
            }, 100);
        }
        return exportData;
    };
    return Exporter;
}());
exports.Exporter = Exporter;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var html_1 = __webpack_require__(3);
var dataHelpers_1 = __webpack_require__(38);
var helpers_1 = __webpack_require__(14);
var Cells_1 = __webpack_require__(69);
var FixedRows_1 = __webpack_require__(70);
function getFixedCols(config) {
    var columns = config.columns.slice(0, config.splitAt);
    config.fixedColumnsWidth = columns.reduce(function (total, item) { return total += item.width || 100; }, 0);
    return Cells_1.getContent(__assign({}, config, { columns: columns, positions: __assign({}, config.positions, { xStart: 0, xEnd: config.splitAt }) }));
}
function getRenderConfig(obj, data, wrapperSizes) {
    var config = obj.config;
    var positions = dataHelpers_1.calculatePositions(wrapperSizes.width, wrapperSizes.height, obj._scroll, config);
    return __assign({}, config, { data: data, scroll: obj._scroll, positions: positions, headerHeight: config.$headerLevel * config.headerRowHeight, footerHeight: 40, firstColId: config.columns[0].id, events: obj.events, currentColumns: config.columns.slice(positions.xStart, positions.xEnd), sortBy: obj._sortBy, sortDir: obj._sortDir });
}
function render(vm, obj, data) {
    // if grid placed inside another component, it will fit to its container
    if (vm && vm.node && vm.node.parent && vm.node.parent.el) {
        var parentNode = vm.node.parent.el;
        obj.config.width = parentNode.clientWidth || 1;
        obj.config.height = parentNode.clientHeight || 1;
    }
    var config = obj.config;
    if (!obj.data || !config.columns.length) {
        return dom_1.el(".dhx_grid");
    }
    config.$totalHeight = data.length * config.rowHeight;
    var wrapperSizes = {
        width: (config.width ? config.width : obj._container.clientWidth),
        height: config.height ? config.height : obj._container.clientHeight
    };
    var renderConfig = getRenderConfig(obj, data, wrapperSizes);
    var shifts = Cells_1.getShifts(renderConfig);
    var content = Cells_1.getContent(renderConfig);
    var contentSpans = Cells_1.getContentSpans(renderConfig);
    var fixedCols = renderConfig.splitAt >= 0 && getFixedCols(renderConfig);
    var BORDERS = 2;
    var isSticky = helpers_1.isCssSupport("position", "sticky");
    var contentHeight = wrapperSizes.height - BORDERS;
    contentHeight = isSticky ? contentHeight : contentHeight - renderConfig.headerHeight;
    var isFooter = renderConfig.$footer;
    // [dirty]
    contentHeight = isFooter ? isSticky ? contentHeight : contentHeight - renderConfig.footerHeight : contentHeight;
    var header = getFixedRows(renderConfig, { wrapper: wrapperSizes, sticky: isSticky, shifts: shifts, name: "header", position: "top" });
    var footer = isFooter ? getFixedRows(renderConfig, { wrapper: wrapperSizes, sticky: isSticky, shifts: shifts, name: "footer", position: "bottom" }) : null;
    var scrollBarWidth = config.$totalWidth <= wrapperSizes.width ? 0 : html_1.getScrollbarWidth();
    var fixedColsHeight = (isSticky ? contentHeight : contentHeight + renderConfig.headerHeight) - scrollBarWidth;
    return dom_1.el(".dhx_grid", [
        dom_1.resizer(function () { return obj.paint(); }),
        dom_1.el(".dhx_grid_content", { style: __assign({}, wrapperSizes), onclick: obj._htmlEvents.onclick }, [
            isSticky ? null : header,
            dom_1.el(".dhx_grid_body", {
                style: {
                    height: contentHeight,
                    width: wrapperSizes.width - BORDERS,
                },
                onscroll: obj._htmlEvents.onscroll,
                _ref: "grid_body"
            }, [
                isSticky ? header : null,
                dom_1.el(".dhx_data_wrap", {
                    style: {
                        "height": config.$totalHeight,
                        "width": config.$totalWidth,
                        "padding-left": shifts.x,
                        "padding-top": shifts.y,
                    }
                }, [
                    dom_1.el(".dhx_grid_data", content),
                    dom_1.el(".dhx_grid_spans", contentSpans),
                    dom_1.el(".dhx_grid_selection", { _ref: "selection" })
                ]),
                isSticky ? footer : null
            ]),
            fixedCols && dom_1.el(".dhx_grid_fixed_cols_wrap", {
                style: {
                    height: fixedColsHeight,
                    paddingTop: renderConfig.headerHeight,
                    overflow: "hidden",
                    width: renderConfig.fixedColumnsWidth
                }
            }, [
                dom_1.el(".dhx_grid_fixed_cols", {
                    style: {
                        top: -renderConfig.scroll.top + renderConfig.headerHeight + "px",
                        paddingTop: shifts.y,
                        height: config.$totalHeight,
                        position: "absolute"
                    }
                }, fixedCols)
            ]),
            isSticky ? null : footer
        ])
    ]);
}
exports.render = render;
function getFixedRows(config, rowsConfig) {
    var _a;
    var mainCells = FixedRows_1.getRows(config, rowsConfig);
    var spans = FixedRows_1.getSpans(config, rowsConfig);
    var fixedCols = config.splitAt >= 0 && FixedRows_1.getRows(__assign({}, config, { currentColumns: config.columns.slice(0, config.splitAt), positions: __assign({}, config.positions, { xStart: 0, xEnd: config.splitAt }) }), rowsConfig);
    var styles = (_a = {
            position: "sticky"
        },
        _a[rowsConfig.position] = 0,
        _a);
    var left;
    if (!rowsConfig.sticky) {
        styles.left = -config.scroll.left;
        left = -config.scroll.left;
        styles.position = "relative";
    }
    return dom_1.el(".dhx_" + rowsConfig.name + "_wrapper", {
        class: rowsConfig.sticky ? "" : "dhx_compatible_" + rowsConfig.name,
        style: __assign({}, styles, { left: rowsConfig.sticky ? left : 0, height: config[rowsConfig.name + "Height"], width: rowsConfig.sticky ? config.$totalWidth : rowsConfig.wrapper.width - 2, zIndex: 9999 })
    }, [
        dom_1.el(".dhx_grid_" + rowsConfig.name, {
            style: {
                height: config[rowsConfig.name + "Height"],
                left: left,
                paddingLeft: rowsConfig.shifts.x,
                width: config.$totalWidth,
            }
        }, mainCells.concat([
            dom_1.el(".dhx_" + rowsConfig.name + "_spans", {
                style: {
                    marginLeft: -rowsConfig.shifts.x
                }
            }, spans),
            fixedCols && dom_1.el(".dhx_" + rowsConfig.name + "_fixed_cols", {
                style: {
                    position: "absolute",
                    top: 0,
                    left: config.scroll.left + "px",
                    height: "100%"
                }
            }, fixedCols)
        ])),
        dom_1.el("div", { style: { width: config.$totalWidth } })
    ]);
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(14);
var types_1 = __webpack_require__(19);
function onCellClick(row, col, conf, e) {
    conf.events.fire(types_1.GridEvents.cellClick, [row, col, e]);
}
function onMouseDown(row, col, conf, e) {
    conf.events.fire(types_1.GridEvents.cellMouseDown, [row, col, e]);
}
function onRightClick(row, col, conf, e) {
    conf.events.fire(types_1.GridEvents.cellRightClick, [row, col, e]);
}
function onMouseOver(row, col, conf, e) {
    conf.events.fire(types_1.GridEvents.cellMouseOver, [row, col, e]);
}
function onCellDblClick(row, col, conf, e) {
    conf.events.fire(types_1.GridEvents.cellDblClick, [row, col, e]);
}
function getTreeCell(content, row, col, conf) {
    return dom_1.el(".dhx_grid_cell", {
        class: "dhx_tree_cell " + (col.$cellCss[row.id] || "") + " " + (row.$childs ? "dhx_grid_expand_cell" : ""),
        style: {
            width: col.width,
            lineHeight: conf.rowHeight + "px",
            paddingLeft: 24 * row.$level
        },
        dhx_id: row.id
    }, [
        row.$childs ? dom_1.el(".dhx_grid_expand_cell_icon", {
            class: row.$opened ? "dxi dxi-chevron-up" : "dxi dxi-chevron-down",
            dhx_id: row.id,
            style: {
                lineHeight: conf.rowHeight + "px"
            }
        }) : null,
        dom_1.el(".dhx_tree_cell", {
            title: helpers_1.removeHTMLTags(row[col.id]),
            style: {
                width: col.width - row.$level * 10,
                height: "100%",
                textAlign: "left"
            }
        }, [content])
    ]);
}
function getContent(conf) {
    if (!conf.data || !conf.columns) {
        return [];
    }
    var pos = conf.positions;
    var data = conf.data ? conf.data.slice(pos.yStart, pos.yEnd) : [];
    var columns = conf.columns.slice(pos.xStart, pos.xEnd);
    return data.map(function (row) {
        var rowCss = "";
        if (conf.rowCss) {
            rowCss = conf.rowCss(row);
        }
        if (row.$css) {
            rowCss += row.$css;
        }
        return dom_1.el(".dhx_grid_row", {
            style: { height: conf.rowHeight },
            dhx_grid_row: row.id,
            class: rowCss
        }, columns.map(function (col) {
            var t = function (text, _row, _col) { return (text || text === 0) ? text : ""; };
            var template = col.template || t;
            var content = template(row[col.id], row, col);
            // ability to use domvm node as template result
            content = typeof content === "string" ? dom_1.el("div.dhx_cell_content", { ".innerHTML": content }) : content;
            if (conf.type === "tree" && conf.firstColId === col.id) {
                return getTreeCell(content, row, col, conf);
            }
            return dom_1.el(".dhx_grid_cell", {
                class: ((col.$cellCss[row.id] || "") + " dhx_" + col.type + "_cell").replace(/\s+/g, " "),
                style: {
                    width: col.width,
                    lineHeight: conf.rowHeight + "px"
                },
                onclick: [onCellClick, row, col, conf],
                onmousedown: [onMouseDown, row, col, conf],
                oncontextmenu: [onRightClick, row, col, conf],
                ondblclick: [onCellDblClick, row, col, conf],
                onmouseover: [onMouseOver, row, col, conf],
                title: helpers_1.removeHTMLTags(row[col.id])
            }, [content]);
        }));
    });
}
exports.getContent = getContent;
function getContentSpans(conf) {
    var spanCells = [];
    var columns = conf.columns;
    if (!columns.length) {
        return null;
    }
    if (!conf.spans) {
        return null;
    }
    var spans = conf.spans.sort(function (a, b) {
        return (a.row - b.row);
    });
    var cellHeight = conf.rowHeight;
    var _loop_1 = function (i) {
        var row = spans[i].row;
        var col = spans[i].column;
        var spanHeight = spans[i].rowspan;
        if (spanHeight === 1) {
            return "continue";
        }
        var colIndex = core_1.findIndex(columns, function (item) { return item.id === col; });
        var currCol = columns[colIndex];
        var rowIndex = core_1.findIndex(conf.data, function (item) { return item.id === row; });
        var currRow = conf.data[rowIndex];
        var text = currRow[col] === undefined ? "" : currRow[col];
        var top_1 = conf.rowHeight * rowIndex;
        var left = 0;
        for (var s = colIndex - 1; s >= 0; s--) {
            left += columns[s].width;
        }
        var css = currCol.header[0].text ? "dhx_span_cell" : "dhx_span_cell dhx_span_cell--title";
        if (rowIndex === 0) {
            css += " dhx_span_first_row";
        }
        // [dirty]
        if (colIndex === 0) {
            css += " dhx_span_first_col";
        }
        if (colIndex === columns.length - 1) {
            css += " dhx_span_last_col";
        }
        spanCells.push(dom_1.el("div", {
            class: css,
            style: {
                width: currCol.width,
                height: spanHeight * cellHeight,
                top: top_1,
                left: left,
                lineHeight: conf.rowHeight + "px"
            }
        }, text));
    };
    for (var i = 0; i < spans.length; i++) {
        _loop_1(i);
    }
    return spanCells;
}
exports.getContentSpans = getContentSpans;
function getShifts(conf) {
    var columnsLeft = conf.columns.slice(0, conf.positions.xStart);
    return {
        x: columnsLeft.reduce(function (sum, col) { return sum += col.width; }, 0),
        y: conf.positions.yStart * conf.rowHeight
    };
}
exports.getShifts = getShifts;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(14);
var content_1 = __webpack_require__(39);
function getHandlers(column, rowName, config) {
    return {
        onclick: [handleMouse, column, rowName, config],
        onmouseover: [handleMouse, column, rowName, config],
        onmousedown: [handleMouse, column, rowName, config],
        ondblclick: [handleMouse, column, rowName, config],
    };
}
function handleMouse(col, rowType, conf, e) {
    // [todo] use enum here
    conf.events.fire(rowType + "Cell" + e.type, [col, e]);
}
function buildRows(columns, name) {
    var header = columns.map(function (col) { return col[name] || [{}]; });
    return helpers_1.transpose(header);
}
function getCustomContentCell(cell, column, config, rowName, css) {
    if (css === void 0) { css = ""; }
    var rowHeight = config[name + "RowHeight"] || 40;
    return dom_1.el(".dhx_grid_" + rowName + "_cell", __assign({ class: css, style: {
            width: column.width,
            lineHeight: rowHeight + "px"
        } }, getHandlers(column, rowName, config)), [
        content_1.content[cell.content].toHtml(column, config)
    ]);
}
function getRows(config, rowsConfig) {
    if (!config.data || !config.columns) {
        return [];
    }
    var rowName = rowsConfig.name;
    var columns = config.currentColumns;
    var rowHeight = config[rowName + "RowHeight"] || 40;
    var rows = buildRows(columns, rowName);
    return rows.map(function (row, rowInd) { return dom_1.el(".dhx_" + rowName + "_row", { style: { height: rowHeight } }, row.map(function (cell, i) {
        var css = cell.css || "";
        var isLastRow = rowInd === rows.length - 1;
        var column = columns[i];
        if (config.sortBy && "" + column.id === config.sortBy && isLastRow) {
            css += " dhx_sort dhx_sort--" + (config.sortDir || "asc");
        }
        css += " dhx_" + (column.type || "string") + "_cell ";
        if (cell.content) {
            return getCustomContentCell(cell, column, config, rowName, css);
        }
        return dom_1.el(".dhx_grid_" + rowName + "_cell", __assign({ "class": css, "dhx_id": column.id, "_key": i, "style": {
                width: column.width,
                lineHeight: rowHeight + "px"
            } }, getHandlers(column, rowName, config), { "title": helpers_1.removeHTMLTags(cell.text), ".innerHTML": cell.text }));
    })); });
}
exports.getRows = getRows;
// [todo]
function getWidth(columns, colspan, index) {
    return columns.reduce(function (w, c, i) {
        w += (i >= index && i < index + colspan) ? c.width : 0;
        return w;
    }, 0);
}
function getSpans(conf, rowsConfig) {
    var cols = conf.columns;
    var rows = helpers_1.transpose(cols.map(function (col) { return col[rowsConfig.name] || []; }));
    var height = conf[name + "RowHeight"] || 40;
    var leftShift = 0;
    return rows.map(function (row, i) {
        leftShift = 0;
        return dom_1.el(".dhx_span_row", { style: { top: height * i + "px", height: height } }, row.map(function (cell, cellIdx) {
            leftShift += cols[cellIdx].width;
            return cell.colspan ?
                dom_1.el(".dhx_span_cell", {
                    "style": {
                        width: getWidth(conf.columns, cell.colspan, cellIdx),
                        height: height,
                        left: leftShift - cols[cellIdx].width,
                        top: height * i,
                        lineHeight: height + "px"
                    },
                    "title": helpers_1.removeHTMLTags(cell.text),
                    ".innerHTML": cell.text
                })
                : null;
        }).filter(function (cell) { return cell ? true : false; }));
    });
}
exports.getSpans = getSpans;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var ts_data_1 = __webpack_require__(11);
var TreeGridCollection = /** @class */ (function (_super) {
    __extends(TreeGridCollection, _super);
    function TreeGridCollection(config, events) {
        return _super.call(this, config, events) || this;
    }
    TreeGridCollection.prototype.eachChild = function (id, cb, direct, checkItem) {
        if (direct === void 0) { direct = true; }
        checkItem = checkItem || (function (item) { return item.$opened !== false; });
        _super.prototype.eachChild.call(this, id, cb, direct, checkItem);
    };
    TreeGridCollection.prototype.getMaxLevel = function () {
        var _this = this;
        var maxLevel = 1;
        this.map(function (el) {
            var level = _this.getLevel(el.id);
            maxLevel = Math.max(level, maxLevel);
        });
        return maxLevel;
    };
    TreeGridCollection.prototype.getLevel = function (id) {
        var level = 0;
        this.eachParent(id, function () {
            level++;
        });
        return level;
    };
    TreeGridCollection.prototype.serialize = function () {
        var _this = this;
        var data = [];
        this.eachChild(this.getRoot(), function (el) {
            if (!el) {
                return;
            }
            var cell = __assign({}, el, { $level: _this.getLevel(el.id), $childs: _this.haveChilds(el.id) });
            if (_this.haveChilds(el.id) && el.$opened === undefined) {
                el.$opened = cell.$opened = true;
            }
            data.push(cell);
        });
        return data;
    };
    TreeGridCollection.prototype.map = function (cb, parent, direct) {
        if (parent === void 0) { parent = this._root; }
        if (direct === void 0) { direct = true; }
        var result = [];
        if (!this.haveChilds(parent)) {
            return result;
        }
        for (var i = 0; i < this._childs[parent].length; i++) {
            result.push(cb.call(this, this._childs[parent][i], i));
            if (direct) {
                if (this._childs[parent][i].$opened) {
                    var childResult = this.map(cb, this._childs[parent][i].id, direct);
                    result = result.concat(childResult);
                }
            }
        }
        return result;
    };
    // [todo]
    TreeGridCollection.prototype.getId = function (index) {
        return Object.keys(this._pull)[index];
    };
    TreeGridCollection.prototype._parse_data = function (data, parent) {
        if (parent === void 0) { parent = this._root; }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            obj.id = obj.id ? obj.id.toString() : core_1.uid();
            obj.parent = obj.parent ? obj.parent.toString() : parent;
            this._pull[obj.id] = obj;
            if (!this._childs[obj.parent]) {
                this._childs[obj.parent] = [];
            }
            this._childs[obj.parent].push(obj);
            obj.$level = this.getLevel(obj.id);
            if (obj.childs && obj.childs instanceof Object) {
                this._parse_data(obj.childs, obj.id);
            }
        }
        this._checkChilds();
    };
    TreeGridCollection.prototype._checkChilds = function () {
        var _this = this;
        this.eachChild(this._root, function (item) {
            item.$childs = _this.haveChilds(item.id);
        });
    };
    return TreeGridCollection;
}(ts_data_1.TreeCollection));
exports.TreeGridCollection = TreeGridCollection;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(73));


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = __webpack_require__(74);
var dom_1 = __webpack_require__(0);
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(parent, config) {
        var _this = _super.call(this, parent, config) || this;
        // root layout
        _this._root = _this.config.parent || _this;
        _this._all = {};
        _this._parseConfig();
        if (_this.config.views) {
            _this.config.activeView = _this.config.activeView || _this._cells[0].id;
            _this._isViewLayout = true;
        }
        _this._css +=
            (config.parent ? "" : " dhx_widget") +
                (_this._xLayout ? " layout_x" : " layout_y");
        if (!config.parent) {
            var view = dom_1.create({ render: function () { return _this.toVDOM(); } }, _this);
            _this.mount(parent, view);
        }
        return _this;
    }
    Layout.prototype.cell = function (id) {
        // FIXME
        return this._root._all[id];
    };
    Layout.prototype.toVDOM = function () {
        if (this._isViewLayout) {
            var roots = [this.cell(this.config.activeView).toVDOM()];
            return _super.prototype.toVDOM.call(this, roots);
        }
        var nodes = [];
        this._cells.forEach(function (cell) {
            var node = cell.toVDOM();
            if (Array.isArray(node)) {
                nodes.push.apply(nodes, node);
            }
            else {
                nodes.push(node);
            }
        });
        return _super.prototype.toVDOM.call(this, nodes);
    };
    Layout.prototype.removeCell = function (id) {
        var root = (this.config.parent || this);
        if (root !== this) {
            return root.removeCell(id);
        }
        // this === root layout
        var view = this.cell(id);
        if (view) {
            var parent_1 = view.getParent();
            delete this._all[id];
            var cells = parent_1._cells;
            var deleteIndex = -1;
            for (var i = 0; i < cells.length; i++) {
                if (cells[i].id === id) {
                    deleteIndex = i;
                    break;
                }
            }
            if (deleteIndex !== -1) {
                cells.splice(deleteIndex, 1);
            }
            parent_1.paint();
        }
    };
    Layout.prototype.addCell = function (config, index) {
        if (index === void 0) { index = -1; }
        var view = this._createCell(config);
        if (index < 0) {
            index = this._cells.length + index + 1;
        }
        this._cells.splice(index, 0, view);
        this.paint();
    };
    Layout.prototype.getId = function (index) {
        if (index < 0) {
            index = this._cells.length + index;
        }
        return this._cells[index] ? this._cells[index].id : undefined;
    };
    Layout.prototype.getRefs = function (name) {
        return this._root.getRootView().refs[name];
    };
    Layout.prototype._parseConfig = function () {
        var _this = this;
        var config = this.config;
        var cells = config.rows || config.cols || config.views;
        this._xLayout = !config.rows;
        this._cells = cells.map(function (a) { return _this._createCell(a); });
    };
    Layout.prototype._createCell = function (cell) {
        var view;
        if (cell.rows || cell.cols || cell.views) {
            cell.parent = this._root;
            view = new Layout(this, cell);
        }
        else {
            view = new Cell_1.Cell(this, cell);
        }
        // FIxME
        this._root._all[view.id] = view;
        return view;
    };
    return Layout;
}(Cell_1.Cell));
exports.Layout = Layout;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(8);
var resizeMode;
(function (resizeMode) {
    resizeMode[resizeMode["unknown"] = 0] = "unknown";
    resizeMode[resizeMode["percents"] = 1] = "percents";
    resizeMode[resizeMode["pixels"] = 2] = "pixels";
    resizeMode[resizeMode["mixedpx1"] = 3] = "mixedpx1";
    resizeMode[resizeMode["mixedpx2"] = 4] = "mixedpx2";
    resizeMode[resizeMode["mixedperc1"] = 5] = "mixedperc1";
    resizeMode[resizeMode["mixedperc2"] = 6] = "mixedperc2";
})(resizeMode || (resizeMode = {}));
function getResizeMode(dir, conf1, conf2) {
    var field = dir ? "width" : "height";
    var is1perc = conf1[field] && conf1[field].indexOf("%") !== -1;
    var is2perc = conf2[field] && conf2[field].indexOf("%") !== -1;
    var is1px = conf1[field] && conf1[field].indexOf("px") !== -1;
    var is2px = conf2[field] && conf2[field].indexOf("px") !== -1;
    if (is1perc && is2perc) {
        return resizeMode.percents;
    }
    if (is1px && is2px) {
        return resizeMode.pixels;
    }
    if (is1px && !is2px) {
        return resizeMode.mixedpx1;
    }
    if (is2px && !is1px) {
        return resizeMode.mixedpx2;
    }
    if (is1perc) {
        return resizeMode.mixedperc1;
    }
    if (is2perc) {
        return resizeMode.mixedperc2;
    }
    return resizeMode.unknown;
}
function getBlockRange(block1, block2, isXLayout) {
    if (isXLayout === void 0) { isXLayout = true; }
    if (isXLayout) {
        return {
            min: block1.left + window.pageXOffset,
            max: block2.right + window.pageXOffset
        };
    }
    return {
        min: block1.top + window.pageYOffset,
        max: block2.bottom + window.pageYOffset
    };
}
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(parent, config) {
        var _this = _super.call(this, parent, config) || this;
        var p = parent;
        if (p && p.isVisible) {
            _this._parent = p;
        }
        _this._initHandlers();
        _this.id = _this.config.id || core_1.uid();
        _this._css = "";
        return _this;
    }
    Cell.prototype.paint = function () {
        if (this.isVisible()) {
            var view = this.getRootView();
            if (view) {
                view.redraw();
            }
            else {
                this._parent.paint();
            }
        }
    };
    Cell.prototype.isVisible = function () {
        // top level node
        if (!this._parent) {
            if (this._container && this._container.tagName) {
                return true;
            }
            return false;
        }
        // check active view in case of multiview
        var active = this._parent.config.activeView;
        if (active && active !== this.id) {
            return false;
        }
        // check that all parents of the cell are visible as well
        return !this.config.hidden && (!this._parent || this._parent.isVisible());
    };
    Cell.prototype.hide = function () {
        this.config.hidden = true;
        if (this._parent && this._parent.paint) {
            this._parent.paint();
        }
    };
    Cell.prototype.show = function () {
        if (this._parent && this._parent.config.activeView) {
            this._parent.config.activeView = this.id;
        }
        else {
            this.config.hidden = false;
        }
        if (this._parent && !this._parent.isVisible()) {
            this._parent.show();
        }
        this.paint();
    };
    Cell.prototype.getParent = function () {
        return this._parent;
    };
    Cell.prototype.destructor = function () {
        this.config = null;
    };
    Cell.prototype.getWidget = function () {
        return this._ui;
    };
    Cell.prototype.attach = function (name, config) {
        if (typeof name === "object") {
            this._ui = name;
        }
        else if (typeof name === "string") {
            this._ui = new window.dhx[name](null, config);
        }
        else if (typeof name === "function") {
            if (name.prototype instanceof view_1.View) {
                this._ui = new name(null, config);
            }
            else {
                this._ui = {
                    getRootView: function () {
                        return name(config);
                    }
                };
            }
        }
        this.paint();
        return this._ui;
    };
    Cell.prototype.toVDOM = function (nodes) {
        var conf = this.config;
        if (conf.hidden) {
            return;
        }
        var css = this._css + " " + (this.config.css || "");
        var style = this._calculateStyle();
        var kids;
        if (this.config.html) {
            kids = [dom_1.el("div", { ".innerHTML": this.config.html })];
        }
        else if (this._ui) {
            var view = this._ui.getRootView();
            if (view.render) {
                view = dom_1.inject(view);
            }
            kids = [view];
        }
        else {
            kids = nodes || null;
        }
        var resizer = this.config.canResize && !this._isLastCell() ?
            dom_1.el(".resizer." + (this._isXDirection() ? "x" : "y"), __assign({}, this._resizerHandlers, { _ref: "resizer_" + this._uid }), [dom_1.el("div", {
                    class: "dxi " + (this._isXDirection() ? "dxi-dots-vertical" : "dxi-dots-horizontal")
                })]) : null;
        var handlers = {};
        if (this.config.on) {
            for (var key in this.config.on) {
                handlers["on" + key] = this.config.on[key];
            }
        }
        var cell = dom_1.el("div", __assign({ _key: this._uid, style: style, _ref: this._uid }, handlers, { class: "dhx_cell " + css + (this.config.collapsed ? " collapsed" : "") }), [
            this.config.header ? dom_1.el("div", {
                class: "dhx_cell_header",
                onclick: this._handlers.collapse
            }, [
                dom_1.el(".header-text", this.config.header),
                dom_1.el(".header-action-icon", [
                    dom_1.el("div", {
                        class: "dxi " + this.config.headerIcon
                    })
                ])
            ]) : null,
            !this.config.collapsed ? dom_1.el("div", {
                class: "dhx_cell_content"
            }, kids) : null,
            this.config.footer ? dom_1.el("div", {
                class: "dhx_cell_footer",
            }, this.config.footer) : null
        ]);
        return resizer ? [
            cell,
            resizer
        ] : cell;
    };
    Cell.prototype._initHandlers = function () {
        var _this = this;
        var blockOpts = {
            left: null,
            top: null,
            isActive: false,
            range: null,
            xLayout: null,
            nextCell: null,
            size: null,
            resizerLength: null,
            mode: null,
            percentsum: null
        };
        var mouseUp = function () {
            blockOpts.isActive = false;
            document.body.classList.remove("dhx-no-select");
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        };
        var mouseMove = function (e) {
            if (!blockOpts.isActive || blockOpts.mode === resizeMode.unknown) {
                return;
            }
            var newValue = blockOpts.xLayout ? e.x - blockOpts.range.min - window.pageXOffset :
                e.y - blockOpts.range.min - window.pageYOffset;
            var prop = blockOpts.xLayout ? "width" : "height";
            if (newValue < 0) {
                newValue = blockOpts.resizerLength / 2;
            }
            else if (newValue > blockOpts.size) {
                newValue = blockOpts.size - blockOpts.resizerLength;
            }
            switch (blockOpts.mode) {
                case resizeMode.pixels:
                    _this.config[prop] = newValue - blockOpts.resizerLength / 2 + "px";
                    blockOpts.nextCell.config[prop] = blockOpts.size - newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.mixedpx1:
                    _this.config[prop] = newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.mixedpx2:
                    blockOpts.nextCell.config[prop] = blockOpts.size - newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.percents:
                    _this.config[prop] = newValue / blockOpts.size * blockOpts.percentsum + "%";
                    blockOpts.nextCell.config[prop] = (blockOpts.size - newValue) / blockOpts.size * blockOpts.percentsum + "%";
                    break;
                case resizeMode.mixedperc1:
                    _this.config[prop] = newValue / blockOpts.size * blockOpts.percentsum + "%";
                    break;
                case resizeMode.mixedperc2:
                    blockOpts.nextCell.config[prop] = (blockOpts.size - newValue) / blockOpts.size * blockOpts.percentsum + "%";
                    break;
            }
            _this.paint();
        };
        this._handlers = {
            collapse: function () {
                if (!_this.config.canCollapse) {
                    return;
                }
                _this.config.collapsed = !_this.config.collapsed;
                _this.paint();
            }
        };
        this._resizerHandlers = {
            onmousedown: function (e) {
                if (e.which === 3) {
                    return;
                }
                if (blockOpts.isActive) {
                    mouseUp();
                }
                document.body.classList.add("dhx-no-select");
                var block = _this._getCellView();
                var nextCell = _this._getNextCell();
                var nextBlock = nextCell._getCellView();
                var resizerBlock = _this._getResizerView();
                var blockOffsets = block.el.getBoundingClientRect();
                var resizerOffsets = resizerBlock.el.getBoundingClientRect();
                var nextBlockOffsets = nextBlock.el.getBoundingClientRect();
                blockOpts.xLayout = _this._isXDirection();
                blockOpts.left = blockOffsets.left + window.pageXOffset;
                blockOpts.top = blockOffsets.top + window.pageYOffset;
                blockOpts.range = getBlockRange(blockOffsets, nextBlockOffsets, blockOpts.xLayout);
                blockOpts.size = blockOpts.range.max - blockOpts.range.min;
                blockOpts.isActive = true;
                blockOpts.nextCell = nextCell;
                blockOpts.resizerLength = blockOpts.xLayout ? resizerOffsets.width : resizerOffsets.height;
                blockOpts.mode = getResizeMode(blockOpts.xLayout, _this.config, nextCell.config);
                if (blockOpts.mode === resizeMode.percents) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = parseFloat(_this.config[field]) + parseFloat(nextCell.config[field]);
                }
                if (blockOpts.mode === resizeMode.mixedperc1) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = 1 / (blockOffsets[field] / (blockOpts.size - blockOpts.resizerLength)) * parseFloat(_this.config[field]);
                }
                if (blockOpts.mode === resizeMode.mixedperc2) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = 1 / (nextBlockOffsets[field] / (blockOpts.size - blockOpts.resizerLength)) * parseFloat(nextCell.config[field]);
                }
                document.addEventListener("mouseup", mouseUp);
                document.addEventListener("mousemove", mouseMove);
            },
            ondragstart: function (e) { return e.preventDefault(); }
        };
    };
    Cell.prototype._isLastCell = function () {
        var parent = this._parent;
        return parent && parent._cells.indexOf(this) === parent._cells.length - 1;
    };
    Cell.prototype._getNextCell = function () {
        var parent = this._parent;
        var index = parent._cells.indexOf(this);
        return parent._cells[index + 1];
    };
    Cell.prototype._getCellView = function () {
        return this._parent.getRefs(this._uid);
    };
    Cell.prototype._getResizerView = function () {
        return this._parent.getRefs("resizer_" + this._uid);
    };
    Cell.prototype._isXDirection = function () {
        return this._parent && this._parent._xLayout;
    };
    Cell.prototype._calculateStyle = function () {
        var conf = this.config;
        var style = {};
        if (this._isXDirection()) {
            if (this.config.width !== undefined) {
                style.flex = "0 0 " + conf.width;
            }
            if (conf.height !== undefined) {
                style.height = conf.height;
            }
        }
        else {
            if (this.config.height !== undefined) {
                style.flex = "0 0 " + conf.height;
            }
            if (conf.width !== undefined) {
                style.width = conf.width;
            }
        }
        return style;
    };
    return Cell;
}(view_1.View));
exports.Cell = Cell;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(5);
function button(item) {
    return dom_1.el("div", {
        class: "button-container main-btn element" + helpers_1.getCss(item) + (item.value ? "" : " no-text"),
        dhx_id: item.id
    }, [
        helpers_1.counter(item),
        item.icon ? helpers_1.icon(item.icon) : null,
        item.value ? dom_1.el(".button-text", item.value) : null
    ]);
}
exports.button = button;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(5);
function customHTMLButton(item) {
    return dom_1.el("div", {
        class: "button-container custom-html-btn element" + helpers_1.getCss(item),
        dhx_id: item.id
    }, [
        helpers_1.counter(item),
        dom_1.el(".html-content", {
            ".innerHTML": item.html
        }),
        item.value ? dom_1.el(".button-text", item.value) : null
    ]);
}
exports.customHTMLButton = customHTMLButton;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(5);
function dhx_button(item) {
    return dom_1.el("button", {
        class: "dhx_btn" + helpers_1.getCss(item) + helpers_1.getButtonCss(item),
        dhx_id: item.id
    }, [
        item.icon ? helpers_1.icon(item.icon) : null,
        item.value ? dom_1.el(".item-value", item.value) : null
    ]);
}
exports.dhx_button = dhx_button;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(5);
function iconButton(item) {
    return dom_1.el("div", {
        class: "icon-btn element" + helpers_1.getCss(item),
        dhx_id: item.id
    }, [
        helpers_1.counter(item),
        helpers_1.icon(item.icon),
        item.css && item.css.indexOf("ripple") !== -1 ? dom_1.el(".ripple-container-outside") : null
    ]);
}
exports.iconButton = iconButton;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(5);
function imageButton(item) {
    return dom_1.el("div", {
        class: "button-container img-btn element" + helpers_1.getCss(item),
        dhx_id: item.id
    }, [
        helpers_1.counter(item),
        dom_1.el(".img-button-wrapper", [
            dom_1.el("img.img-button", {
                src: item.src
            })
        ])
    ]);
}
exports.imageButton = imageButton;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(5);
function imageButtonText(item) {
    return dom_1.el("div", {
        class: "button-container img-text-btn element" + helpers_1.getCss(item),
        dhx_id: item.id
    }, [
        helpers_1.counter(item),
        dom_1.el("img.img-button", {
            src: item.src
        }),
        dom_1.el(".button-text", item.value)
    ]);
}
exports.imageButtonText = imageButtonText;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(9);
var helpers_1 = __webpack_require__(5);
function input(item, events) {
    return dom_1.el("div", {
        dhx_id: item.id,
        class: "input-container element" + helpers_1.getCss(item)
    }, [
        dom_1.el(".input-wrapper", [
            dom_1.el("input.text-input", {
                placeholder: item.placeholder,
                value: item.value,
                style: {
                    width: item.width ? item.width : null
                },
                _hooks: {
                    didInsert: function (node) {
                        if (events) {
                            events.fire(types_1.ToolbarEvents.inputCreated, [item.id, node.el]);
                        }
                    }
                },
                _key: item.id
            }),
            dom_1.el(".input-animation")
        ]),
        item.icon ? helpers_1.icon(item.icon) : null
    ]);
}
exports.input = input;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(5);
function menuItem(item) {
    return dom_1.el("div", {
        class: "menu-item element" + helpers_1.getCss(item),
        dhx_id: item.id
    }, [
        item.icon ? helpers_1.icon(item.icon) : null,
        item.value ? dom_1.el("span.menu-item-content", item.value) : null,
        item.$openIcon ? dom_1.el(".dhx-icon.sub-menu-opener", [
            dom_1.el(".dxi." + (item.$openIcon === "right" ? ".dxi-menu-right" : ".dxi-menu-down"))
        ]) : null,
        item.hotkey ? dom_1.el(".hotkey", item.hotkey) : null
    ]);
}
exports.menuItem = menuItem;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function separator(_item) {
    return dom_1.el(".separator");
}
exports.separator = separator;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function spacer(_item) {
    return dom_1.el(".spacer");
}
exports.spacer = spacer;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(5);
function text(item) {
    return dom_1.el("div", {
        class: "text element" + helpers_1.getCss(item),
        dhx_id: item.id
    }, item.value);
}
exports.text = text;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getHotKeyCode(code) {
    var matches = code.toLowerCase().match(/\w+/g);
    var comp = 0;
    var key = "";
    for (var i = 0; i < matches.length; i++) {
        var check = matches[i];
        if (check === "ctrl") {
            comp += 4;
        }
        else if (check === "shift") {
            comp += 2;
        }
        else if (check === "alt") {
            comp += 1;
        }
        else {
            key = check;
        }
    }
    return comp + key;
}
var KeyManager = /** @class */ (function () {
    function KeyManager() {
        var _this = this;
        this._keysStorage = {};
        document.addEventListener("keydown", function (e) {
            var comp = (e.ctrlKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0);
            var code = comp + e.key.toLowerCase();
            var action = _this._keysStorage[code];
            if (action) {
                action.handler(e);
            }
        });
    }
    KeyManager.prototype.addHotKey = function (key, handler, scope) {
        var code = getHotKeyCode(key);
        this._keysStorage[code] = {
            handler: handler,
            scope: scope
        };
    };
    KeyManager.prototype.removeHotKey = function (key, scope) {
        var keyStorage = this._keysStorage;
        if (key) {
            var code = getHotKeyCode(key);
            delete keyStorage[code];
        }
        if (scope) {
            for (var code in keyStorage) {
                if (keyStorage[code].scope === scope) {
                    delete keyStorage[code];
                }
            }
        }
    };
    KeyManager.prototype.exist = function (key) {
        var code = getHotKeyCode(key);
        return !!this._keysStorage[code];
    };
    return KeyManager;
}());
exports.keyManager = new KeyManager();


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(3);
var helper_1 = __webpack_require__(21);
var MenuBase_1 = __webpack_require__(25);
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isContextMenu = true;
        return _this;
    }
    ContextMenu.prototype.showAt = function (elem, showAt) {
        if (showAt === void 0) { showAt = "bottom"; }
        if (elem instanceof MouseEvent) {
            this._changeActivePosition({
                left: window.pageXOffset + elem.x + 1,
                right: window.pageXOffset + elem.x + 1,
                top: window.pageYOffset + elem.y,
                bottom: window.pageYOffset + elem.y
            }, showAt);
        }
        else {
            var node = html_1.toNode(elem);
            this._changeActivePosition(helper_1.getRealPosition(node), showAt);
        }
    };
    ContextMenu.prototype._close = function () {
        this._activeMenu = null;
        this._changeActivePosition(null, null);
    };
    ContextMenu.prototype._normalizeData = function () {
        var _this = this;
        var root = this.data.getRoot();
        this.data.eachChild(root, function (item) {
            if (_this.data.haveChilds(item.id)) {
                item.$openIcon = "right";
            }
        }, true);
    };
    ContextMenu.prototype._getMode = function (_item, _root, active) {
        return active ? this._mode : "right";
    };
    ContextMenu.prototype._changeActivePosition = function (position, mode) {
        this._activePosition = position;
        this._mode = mode;
        this._listenOuterClick();
        this.paint();
    };
    return ContextMenu;
}(MenuBase_1.MenuBase));
exports.ContextMenu = ContextMenu;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var MenuBase_1 = __webpack_require__(25);
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(element, config) {
        var _this = _super.call(this, element, config) || this;
        var render = function () { return _this._draw(); };
        _this.mount(element, dom_1.create({ render: render }));
        return _this;
    }
    Menu.prototype._draw = function () {
        return dom_1.el("div", __assign({ dhx_widget_id: this._uid, class: "main-menu" }, this._handlers), this._drawMenuItems(this.data.getRoot()));
    };
    return Menu;
}(MenuBase_1.MenuBase));
exports.Menu = Menu;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helper_1 = __webpack_require__(21);
var Toolbar_1 = __webpack_require__(40);
var types_1 = __webpack_require__(9);
var Ribbon = /** @class */ (function (_super) {
    __extends(Ribbon, _super);
    function Ribbon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ribbon.prototype._draw = function () {
        var _this = this;
        return dom_1.el(".ribbon.dhx_widget", {
            dhx_widget_id: this._uid,
            onclick: this._handlers.onclick
        }, this.data.map(function (block) { return _this._drawBlock(block.id); }, this.data.getRoot(), false));
    };
    Ribbon.prototype._setRoot = function (id) {
        var parentId = this.data.getParent(id);
        if (this.data.getItem(parentId).type === types_1.ItemType.block) {
            this._currentRoot = id;
        }
    };
    Ribbon.prototype._normalizeData = function () {
        var _this = this;
        var root = this.data.getRoot();
        var groups = {};
        this.data.eachChild(root, function (item) {
            if (item.type === types_1.ItemType.menuItem) {
                if (_this.data.haveChilds(item.id)) {
                    _this.data.eachChild(item.id, function (child) { return child.type = child.type || types_1.ItemType.menuItem; }, false);
                    var parentId = _this.data.getParent(item.id);
                    var parent_1 = _this.data.getItem(parentId);
                    item.$openIcon = parent_1.type === types_1.ItemType.block ? "bot" : "right";
                }
            }
            if (item.group) {
                helper_1.addInGroups(groups, item);
            }
        }, true);
        this._groups = groups;
    };
    Ribbon.prototype._drawBlock = function (id) {
        var _this = this;
        var block = this.data.getItem(id);
        if (!block) {
            return null;
        }
        var direction = block.direction === "row" ? " ribbon-row" : " ribbon-cols";
        var childs = this.data.map(function (child) {
            if (child.type === types_1.ItemType.block) {
                return _this._drawBlock(child.id);
            }
            return _this._factory(child);
        }, id, false);
        return dom_1.el("div", {
            class: "ribbon-item-block" + direction
        }, [
            dom_1.el(".block-content", childs),
            block.label ? dom_1.el(".block-label", [dom_1.el("span", block.label)]) : null
        ]);
    };
    return Ribbon;
}(Toolbar_1.Toolbar));
exports.Ribbon = Ribbon;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var actions_1 = __webpack_require__(15);
var main_1 = __webpack_require__(1);
var AddColumn = /** @class */ (function () {
    function AddColumn(config) {
        this.config = config;
    }
    AddColumn.prototype.do = function () {
        var cell = this.config.cell;
        if (!this._index) {
            this._index = main_1.getCellIndex(cell).col;
        }
        var copy = __assign({}, this.config.grid.config.columns[1], { $cellCss: {}, header: [{ text: "" }] });
        copy.id = core_1.uid();
        this.config.grid.data.map(function (item) {
            item[copy.id] = "";
        });
        this.config.grid.config.columns.splice(this._index, 0, copy);
        actions_1.updateColumns(this.config.grid.config);
        this.config.spreadsheet.selection.setSelectedCell(cell);
        this.config.grid.paint();
    };
    AddColumn.prototype.undo = function () {
        this.config.grid.config.columns.splice(this._index, 1);
        actions_1.updateColumns(this.config.grid.config);
        this.config.spreadsheet.selection.setSelectedCell(this.config.cell);
    };
    return AddColumn;
}());
exports.AddColumn = AddColumn;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(15);
var main_1 = __webpack_require__(1);
var AddRow = /** @class */ (function () {
    function AddRow(config) {
        this.config = config;
    }
    AddRow.prototype.do = function () {
        var cell = this.config.cell;
        if (!this._index) {
            this._index = main_1.getCellIndex(cell).row;
        }
        var item = __assign({}, this.config.grid.data.getItem(this.config.grid.data.getId(0)));
        for (var key in item) {
            item[key] = "";
        }
        this.config.grid.data.add(item, this._index);
        actions_1.updateRowsIndex(this.config.grid.data);
        actions_1.removeRowsCss(this.config.grid);
        this.config.spreadsheet.selection.setSelectedCell(cell);
        this.config.grid.paint();
    };
    AddRow.prototype.undo = function () {
        this.config.grid.data.remove(this.config.grid.data.getId(this._index));
        actions_1.updateRowsIndex(this.config.grid.data);
        actions_1.removeRowsCss(this.config.grid);
        this.config.spreadsheet.selection.setSelectedCell(this.config.cell);
    };
    return AddRow;
}());
exports.AddRow = AddRow;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var actions_1 = __webpack_require__(15);
var main_1 = __webpack_require__(1);
var DeleteColumn = /** @class */ (function () {
    function DeleteColumn(config) {
        this.config = config;
    }
    DeleteColumn.prototype.do = function () {
        var cell = this.config.cell;
        if (!this._index) {
            this._index = main_1.getCellIndex(cell).col;
        }
        this._column = this.config.grid.config.columns.splice(this._index, 1)[0];
        // [dirty]
        if (this.config.grid.config.columns.length <= 1) {
            var copy = __assign({}, this._column, { $cellCss: {}, header: [{ text: "" }] });
            copy.id = core_1.uid();
            this.config.grid.config.columns.push(copy);
        }
        actions_1.updateColumns(this.config.grid.config);
        this.config.spreadsheet.selection.setSelectedCell(cell);
        this.config.grid.paint();
    };
    DeleteColumn.prototype.undo = function () {
        this.config.grid.config.columns.splice(this._index, 0, this._column);
        actions_1.updateColumns(this.config.grid.config);
        this.config.spreadsheet.selection.setSelectedCell(this.config.cell);
    };
    return DeleteColumn;
}());
exports.DeleteColumn = DeleteColumn;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(15);
var main_1 = __webpack_require__(1);
var DeleteRow = /** @class */ (function () {
    function DeleteRow(config) {
        this.config = config;
    }
    DeleteRow.prototype.do = function () {
        var _a = this.config, row = _a.row, cell = _a.cell;
        if (!this._item) {
            this._item = __assign({}, this.config.grid.data.getItem(row));
            this._index = main_1.getCellIndex(cell).row;
        }
        this.config.grid.data.remove(row);
        if (!this.config.grid.data.getLength()) {
            var emptyRow = this.config.grid.config.columns.reduce(function (acc, col) {
                acc[col.id] = "";
                return acc;
            }, {});
            this.config.grid.data.add(emptyRow);
        }
        actions_1.updateRowsIndex(this.config.grid.data);
        this.config.spreadsheet.selection.setSelectedCell(cell);
    };
    DeleteRow.prototype.undo = function () {
        this.config.grid.data.add(this._item, this._index);
        actions_1.updateRowsIndex(this.config.grid.data);
        actions_1.removeRowsCss(this.config.grid);
        this.config.spreadsheet.selection.setSelectedCell(this.config.cell);
    };
    return DeleteRow;
}());
exports.DeleteRow = DeleteRow;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
var ActionsManager_1 = __webpack_require__(22);
var GroupAction = /** @class */ (function () {
    function GroupAction(config) {
        this.config = config;
        this._actions = [];
    }
    GroupAction.prototype.do = function () {
        var _this = this;
        if (!this._actions.length) {
            var val_1 = this.config.val;
            var valueIndex_1 = 0;
            if (Array.isArray(val_1)) {
                val_1 = val_1[valueIndex_1];
            }
            this.config.spreadsheet.eachCell(function (cell) {
                var _a = main_1.getCellIds(_this.config.grid, cell), row = _a.row, col = _a.col;
                var action = new ActionsManager_1.actions[_this.config.action](__assign({}, _this.config, { row: row, col: col, cell: cell, val: val_1 }));
                _this._actions.push(action);
                if (Array.isArray(_this.config.val)) {
                    if (valueIndex_1 + 1 >= _this.config.val.length) {
                        valueIndex_1 = 0;
                    }
                    else {
                        valueIndex_1 += 1;
                    }
                    val_1 = _this.config.val[valueIndex_1];
                }
            }, this.config.cell);
        }
        for (var _i = 0, _a = this._actions; _i < _a.length; _i++) {
            var action = _a[_i];
            action.do();
        }
        this.config.spreadsheet.selection.setSelectedCell(this.config.cell);
    };
    GroupAction.prototype.undo = function () {
        for (var _i = 0, _a = this._actions; _i < _a.length; _i++) {
            var action = _a[_i];
            action.undo();
        }
        var firstCell = this.config.cell.split(":")[0];
        this.config.spreadsheet.selection.setSelectedCell(firstCell);
    };
    return GroupAction;
}());
exports.GroupAction = GroupAction;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
var ActionsManager_1 = __webpack_require__(22);
var GroupColAction = /** @class */ (function () {
    function GroupColAction(config) {
        this.config = config;
        this._actions = [];
    }
    GroupColAction.prototype.do = function () {
        var _this = this;
        if (!this._actions.length) {
            var id = main_1.getCellIds(this.config.grid, this.config.cell);
            var startRow_1 = id.start.row;
            var firstCell_1 = this.config.cell.split(":")[0];
            this.config.spreadsheet.eachCell(function (cell) {
                var _a = main_1.getCellIds(_this.config.grid, cell), row = _a.row, col = _a.col;
                if (row === startRow_1) {
                    var action = new ActionsManager_1.actions[_this.config.action](__assign({}, _this.config, { row: row, col: col, cell: firstCell_1 }));
                    _this._actions.push(action);
                }
            }, this.config.cell);
        }
        for (var i = this._actions.length - 1; i >= 0; i--) {
            this._actions[i].do();
        }
    };
    GroupColAction.prototype.undo = function () {
        for (var i = 0; i < this._actions.length; i++) {
            this._actions[i].undo();
        }
    };
    return GroupColAction;
}());
exports.GroupColAction = GroupColAction;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
var ActionsManager_1 = __webpack_require__(22);
var GroupRowAction = /** @class */ (function () {
    function GroupRowAction(config) {
        this.config = config;
        this._actions = [];
    }
    GroupRowAction.prototype.do = function () {
        var _this = this;
        if (!this._actions.length) {
            var id = main_1.getCellIds(this.config.grid, this.config.cell);
            var startCol_1 = id.start.col;
            var firstCell_1 = this.config.cell.split(":")[0];
            this.config.spreadsheet.eachCell(function (cell) {
                var _a = main_1.getCellIds(_this.config.grid, cell), row = _a.row, col = _a.col;
                if (col === startCol_1) {
                    var action = new ActionsManager_1.actions[_this.config.action](__assign({}, _this.config, { row: row, col: col, cell: firstCell_1 }));
                    _this._actions.push(action);
                }
            }, this.config.cell);
        }
        for (var i = this._actions.length - 1; i >= 0; i--) {
            this._actions[i].do();
        }
    };
    GroupRowAction.prototype.undo = function () {
        for (var i = this._actions.length - 1; i >= 0; i--) {
            this._actions[i].undo();
        }
    };
    return GroupRowAction;
}());
exports.GroupRowAction = GroupRowAction;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var LockCell = /** @class */ (function () {
    function LockCell(config) {
        this.config = config;
    }
    LockCell.prototype.do = function () {
        var _a = this.config, val = _a.val, cell = _a.cell;
        var cellInfo = main_1.getCellInfo(this.config.grid, cell);
        cellInfo.locked = val;
        if (val) {
            this.config.editLine.lock();
        }
        else {
            this.config.editLine.unlock();
        }
        this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.afterFocusSet, [cell]);
    };
    LockCell.prototype.undo = function () {
        var _a = this.config, val = _a.val, cell = _a.cell;
        var cellInfo = main_1.getCellInfo(this.config.grid, cell);
        cellInfo.locked = !val;
        this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.afterFocusSet, [cell]);
        if (val) {
            this.config.editLine.unlock();
        }
        else {
            this.config.editLine.lock();
        }
    };
    return LockCell;
}());
exports.LockCell = LockCell;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var RemoveCellStyles = /** @class */ (function () {
    function RemoveCellStyles(config) {
        this.config = config;
    }
    RemoveCellStyles.prototype.do = function () {
        var cell = this.config.cell;
        var _a = main_1.getCellIds(this.config.grid, cell), row = _a.row, col = _a.col;
        var cellInfo = main_1.getCellInfo(this.config.grid, cell);
        if (cellInfo.locked) {
            return;
        }
        this.config.grid.removeCellCss(row, col, cellInfo.css);
        this.config.prev = cellInfo.css;
        main_1.updateCellInfo(this.config.grid, cell, {
            css: ""
        });
        this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.afterSelectionSet, [cell]);
        this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.afterStyleChange, [cell]);
    };
    RemoveCellStyles.prototype.undo = function () {
        var _a = this.config, row = _a.row, col = _a.col, cell = _a.cell;
        var cellInfo = main_1.getCellInfo(this.config.grid, cell);
        if (cellInfo.locked) {
            return;
        }
        main_1.updateCellInfo(this.config.grid, cell, {
            css: this.config.prev
        });
        this.config.grid.addCellCss(row, col, this.config.prev);
        this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.afterStyleChange, [cell]);
    };
    return RemoveCellStyles;
}());
exports.RemoveCellStyles = RemoveCellStyles;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __webpack_require__(16);
var main_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var SetCellFormat = /** @class */ (function () {
    function SetCellFormat(config) {
        this.config = config;
    }
    SetCellFormat.prototype.do = function () {
        var cell = this.config.cell;
        var val = this.config.val;
        var format = format_1.getFormat(val);
        val = (format && format.mask) || val;
        var cellInfo = main_1.getCellInfo(this.config.grid, cell);
        if (cellInfo.locked) {
            return;
        }
        if (!this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.beforeFormatChange, [cell, val])) {
            return;
        }
        this.config.prev = cellInfo.format;
        main_1.updateCellInfo(this.config.grid, cell, {
            format: val || ""
        });
        this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.afterFormatChange, [cell, val]);
        this.config.grid.paint();
    };
    SetCellFormat.prototype.undo = function () {
        var val = this.config.val;
        var prev = this.config.prev;
        this.config.val = prev;
        this.config.prev = val;
        this.do();
        this.config.val = val;
        this.config.prev = prev;
    };
    return SetCellFormat;
}());
exports.SetCellFormat = SetCellFormat;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var SetCellStyle = /** @class */ (function () {
    function SetCellStyle(config) {
        this.config = config;
    }
    SetCellStyle.prototype.do = function () {
        var cell = this.config.cell;
        var _a = main_1.getCellIds(this.config.grid, cell), row = _a.row, col = _a.col;
        var cellInfo = main_1.getCellInfo(this.config.grid, cell);
        if (cellInfo.locked) {
            return;
        }
        if (typeof this.config.val !== "string") {
            var styles = dhx.css.get(cellInfo.css) || {};
            if (Array.isArray(this.config.val)) {
                this.config.val = this.config.val[0];
            }
            var css = dhx.css.add(__assign({}, styles, this.config.val));
            this.config.val = css;
        }
        var val = this.config.val;
        if (!this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.beforeStyleChange, [cell, dhx.css.get(val)])) {
            return;
        }
        this.config.prev = cellInfo.css;
        this.config.grid.removeCellCss(row, col, cellInfo.css);
        main_1.updateCellInfo(this.config.grid, cell, { css: val });
        this.config.grid.addCellCss(row, col, val);
        this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.afterStyleChange, [this.config.cell, dhx.css.get(val)]);
    };
    SetCellStyle.prototype.undo = function () {
        var val = this.config.val;
        var prev = this.config.prev;
        this.config.val = prev || "";
        this.config.prev = val || "";
        this.do();
        this.config.val = val;
        this.config.prev = prev;
    };
    return SetCellStyle;
}());
exports.SetCellStyle = SetCellStyle;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __webpack_require__(16);
var main_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var SetCellValue = /** @class */ (function () {
    function SetCellValue(config) {
        this.config = config;
    }
    SetCellValue.prototype.do = function () {
        var _a;
        var _b = this.config, val = _b.val, cell = _b.cell;
        var _c = main_1.getCellIds(this.config.grid, cell), row = _c.row, col = _c.col;
        if (this.config.spreadsheet.isLocked(cell)) {
            return;
        }
        if (!this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.beforeValueChange, [cell, val])) {
            return;
        }
        var value;
        var cleanValue = format_1.getCleanValue(val);
        var isAutoFormat = this.config.spreadsheet.config.autoFormat;
        if (isAutoFormat && format_1.isNumeric(cleanValue)) {
            var oldFormat = main_1.getCellInfo(this.config.grid, cell).format;
            var format = oldFormat || format_1.detectCellFormat(val);
            if (!oldFormat && format.indexOf("%") > -1) {
                value = (parseFloat(cleanValue) / 100).toFixed(4);
            }
            else {
                value = cleanValue;
            }
            main_1.updateCellInfo(this.config.grid, cell, {
                format: format
            });
        }
        else {
            value = val;
        }
        this.config.prev = this.config.spreadsheet.getValue(cell);
        this.config.grid.data.update(row, (_a = {},
            _a[col] = value,
            _a));
        main_1.updateCellInfo(this.config.grid, cell, {
            nextValue: undefined
        });
        this.config.spreadsheet.selection.setSelectedCell(this.config.cell);
        this.config.spreadsheet.events.fire(types_1.SpreadsheetEvents.afterValueChange, [this.config.cell, cleanValue]);
    };
    SetCellValue.prototype.undo = function () {
        var val = this.config.val;
        var prev = this.config.prev;
        this.config.val = prev;
        this.config.prev = val;
        this.do();
        this.config.val = val;
        this.config.prev = prev;
    };
    return SetCellValue;
}());
exports.SetCellValue = SetCellValue;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(6);
function getContextMenuStruct() {
    return [
        { id: "lock", value: en_1.default.lockCell, icon: "dxi-key" },
        {
            id: "clear", value: en_1.default.clear, icon: "dxi-eraser", childs: [
                {
                    id: "clear-value",
                    value: en_1.default.clearValue
                },
                {
                    id: "clear-styles",
                    value: en_1.default.clearStyles
                },
                {
                    id: "clear-all",
                    value: en_1.default.clearAll
                }
            ]
        },
        {
            id: "columns", value: en_1.default.columns, icon: "dxi-table-column", childs: [
                {
                    id: "add-col",
                    value: en_1.default.addColumn,
                    icon: "dxi-table-column-plus-before"
                },
                {
                    id: "remove-col",
                    value: en_1.default.removeColumn,
                    icon: "dxi-table-column-remove"
                }
            ]
        },
        {
            id: "rows", value: en_1.default.rows, icon: "dxi-table-row", childs: [
                {
                    id: "add-row",
                    value: en_1.default.addRow,
                    icon: "dxi-table-row-plus-after"
                },
                {
                    id: "remove-row",
                    value: en_1.default.removeRow,
                    icon: "dxi-table-row-remove"
                }
            ]
        }
    ];
}
exports.getContextMenuStruct = getContextMenuStruct;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ts_toolbar_1 = __webpack_require__(20);
var toolbar_1 = __webpack_require__(23);
var en_1 = __webpack_require__(6);
function getMenuStruct(config) {
    return [
        {
            id: "file", open: true, value: en_1.default.file, childs: [
                {
                    id: "import",
                    value: en_1.default.importAs,
                    icon: "dxi-file-import",
                    childs: [
                        {
                            id: "import-xlsx",
                            value: "Microsoft Excel(.xlsx)",
                            icon: "dxi-file-excel"
                        }
                    ]
                },
                {
                    id: "download",
                    value: en_1.default.downloadAs,
                    icon: "dxi-file-export",
                    childs: [
                        {
                            id: "export-xlsx",
                            value: "Microsoft Excel(.xlsx)",
                            icon: "dxi-file-excel"
                        }
                    ]
                }
            ]
        },
        {
            id: "edit", value: en_1.default.edit, childs: [
                { id: "undo", value: en_1.default.undo, icon: "dxi-undo" },
                { id: "redo", value: en_1.default.redo, icon: "dxi-redo" },
                { type: ts_toolbar_1.ItemType.separator },
                { id: "lock", value: en_1.default.lockCell, icon: "dxi-key" },
                { type: ts_toolbar_1.ItemType.separator },
                {
                    id: "clear", value: en_1.default.clear, icon: "dxi-eraser", childs: [
                        {
                            id: "clear-value",
                            value: en_1.default.clearValue
                        },
                        {
                            id: "clear-styles",
                            value: en_1.default.clearStyles
                        },
                        {
                            id: "clear-all",
                            value: en_1.default.clearAll
                        }
                    ]
                }
            ]
        },
        {
            id: "insert", value: en_1.default.insert, childs: [
                {
                    id: "columns", value: en_1.default.columns, icon: "dxi-table-column", childs: [
                        {
                            id: "add-col",
                            value: en_1.default.addColumn,
                            icon: "dxi-table-column-plus-before"
                        },
                        {
                            id: "remove-col",
                            value: en_1.default.removeColumn,
                            icon: "dxi-table-column-remove"
                        }
                    ]
                },
                {
                    id: "rows", value: en_1.default.rows, icon: "dxi-table-row", childs: [
                        {
                            id: "add-row",
                            value: en_1.default.addRow,
                            icon: "dxi-table-row-plus-after"
                        },
                        {
                            id: "remove-row",
                            value: en_1.default.removeRow,
                            icon: "dxi-table-row-remove"
                        }
                    ]
                }
            ]
        },
        {
            id: "configuration", value: en_1.default.format, childs: [
                {
                    id: "font-weight-bold",
                    value: en_1.default.bold,
                    icon: "dxi-format-bold"
                },
                {
                    id: "font-style-italic",
                    value: en_1.default.italic,
                    icon: "dxi-format-italic"
                },
                {
                    id: "text-decoration-underline",
                    value: en_1.default.underline,
                    icon: "dxi-format-underline"
                },
                { type: ts_toolbar_1.ItemType.separator },
                {
                    id: "align", value: en_1.default.align, childs: [
                        {
                            id: "align-left",
                            value: en_1.default.left,
                            icon: "dxi-format-align-left"
                        },
                        {
                            id: "align-center",
                            value: en_1.default.center,
                            icon: "dxi-format-align-center"
                        },
                        {
                            id: "align-right",
                            value: en_1.default.right,
                            icon: "dxi-format-align-right"
                        }
                    ]
                },
                {
                    id: "format",
                    type: ts_toolbar_1.ItemType.menuItem,
                    value: en_1.default.numberFormat,
                    childs: toolbar_1.getFormatsDropdown(config)
                }
            ]
        },
        {
            id: "help", value: en_1.default.help
        }
    ];
}
exports.getMenuStruct = getMenuStruct;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ts_toolbar_1 = __webpack_require__(20);
var toolbar_1 = __webpack_require__(23);
var en_1 = __webpack_require__(6);
var hotKeys = {
    undo: "Z",
    redo: "Y",
    bold: "B",
    italic: "I",
    underline: "U"
};
function getHotKey(name) {
    var isMac = navigator.platform.match(/(Mac)/i) ? true : false;
    if (isMac) {
        return "\u2318+" + hotKeys[name];
    }
    return "ctrl+" + hotKeys[name];
}
exports.getHotKey = getHotKey;
function getToolbarStruct(elements, config) {
    var toolbarBlocks = {
        undo: [
            {
                id: "undo",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-undo",
                tooltip: en_1.default.undo + " (" + getHotKey("undo") + ")"
            },
            {
                id: "redo",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-redo",
                tooltip: en_1.default.redo + " (" + getHotKey("redo") + ")"
            },
        ],
        colors: [
            {
                id: "color",
                type: ts_toolbar_1.ItemType.customHTMLButton,
                html: toolbar_1.getColorpickerTemplate("#4C4C4C", "text"),
                tooltip: en_1.default.textColor
            },
            {
                id: "background",
                type: ts_toolbar_1.ItemType.customHTMLButton,
                html: toolbar_1.getColorpickerTemplate("#FFF", "fill"),
                tooltip: en_1.default.backgroundColor
            }
        ],
        lock: [
            {
                id: "lock",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-key",
                tooltip: en_1.default.lockCell
            }
        ],
        file: [
            {
                id: "export",
                type: ts_toolbar_1.ItemType.menuItem,
                icon: "dxi-file-export",
                tooltip: en_1.default.export,
                childs: [
                    {
                        id: "export-xlsx",
                        value: "Microsoft Excel(.xlsx)",
                        icon: "dxi-file-excel"
                    }
                ]
            },
            {
                id: "import",
                type: ts_toolbar_1.ItemType.menuItem,
                icon: "dxi-file-import",
                tooltip: en_1.default.import,
                childs: [
                    {
                        id: "import-xlsx",
                        value: "Microsoft Excel(.xlsx)",
                        icon: "dxi-file-excel"
                    }
                ]
            }
        ],
        columns: [
            {
                id: "add-col",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-table-column-plus-before",
                tooltip: en_1.default.addColumn
            },
            {
                id: "remove-col",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-table-column-remove dxi-flip-h",
                tooltip: en_1.default.removeColumn
            }
        ],
        rows: [
            {
                id: "add-row",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-table-row-plus-after",
                tooltip: en_1.default.addRow
            },
            {
                id: "remove-row",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-table-row-remove",
                tooltip: en_1.default.removeRow
            }
        ],
        clear: [
            {
                type: "menuItem",
                icon: "dxi-eraser",
                id: "clear-group",
                tooltip: en_1.default.clear,
                childs: [
                    {
                        id: "clear-value",
                        value: en_1.default.clearValue
                    },
                    {
                        id: "clear-styles",
                        value: en_1.default.clearStyles
                    },
                    {
                        id: "clear-all",
                        value: en_1.default.clearAll
                    }
                ]
            }
        ],
        align: [
            {
                id: "align-left",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-align-left",
                tooltip: en_1.default.align + " " + en_1.default.left,
            },
            {
                id: "align-center",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-align-center",
                tooltip: en_1.default.align + " " + en_1.default.center
            },
            // {
            // 	id: "align-justify",
            // 	type: ItemType.button,
            // 	icon: "dxi-format-align-justify",
            // 	tooltip: locale.alignJustify
            // },
            {
                id: "align-right",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-align-right",
                tooltip: en_1.default.align + " " + en_1.default.right
            }
        ],
        decoration: [
            {
                id: "font-weight-bold",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-bold",
                tooltip: en_1.default.bold + " (" + getHotKey("bold") + ")"
            },
            {
                id: "font-style-italic",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-italic",
                tooltip: en_1.default.italic + " (" + getHotKey("italic") + ")"
            },
            {
                id: "text-decoration-underline",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-format-underline",
                tooltip: en_1.default.underline + " (" + getHotKey("underline") + ")"
            }
        ],
        help: [{
                id: "help",
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-help-circle-outline",
                tooltip: en_1.default.help
            }],
        format: [
            {
                id: "format",
                type: ts_toolbar_1.ItemType.menuItem,
                tooltip: en_1.default.numberFormat,
                css: "dhx_format-dropdown",
                childs: toolbar_1.getFormatsDropdown(config)
            }
        ]
    };
    var defaultBlocks = ["undo", "colors", "decoration", "align", "format", "help"];
    elements = elements || defaultBlocks;
    var defaultBlockIndex = elements.indexOf("default");
    if (defaultBlockIndex !== -1) {
        elements.splice.apply(elements, [defaultBlockIndex, 1].concat(defaultBlocks));
    }
    elements = elements.filter(function (item, i, arr) { return arr.indexOf(item) === i; });
    return elements.reduce(function (struct, item, i, arr) {
        if (toolbarBlocks[item]) {
            struct.push.apply(struct, toolbarBlocks[item]);
            if (i !== arr.length - 1) {
                struct.push({
                    type: ts_toolbar_1.ItemType.separator,
                });
            }
        }
        return struct;
    }, []);
}
exports.getToolbarStruct = getToolbarStruct;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(8);
var types_1 = __webpack_require__(4);
var EditLine = /** @class */ (function (_super) {
    __extends(EditLine, _super);
    function EditLine(element, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, element, config) || this;
        _this._htmlEvents = {
            oninput: function (e) {
                _this.config.events.fire(types_1.SpreadsheetEvents.editLineInput, [e.target.value]);
            },
            onfocus: function (e) {
                _this.config.events.fire(types_1.SpreadsheetEvents.editLineFocus, [e.target.value, e]);
            },
            onblur: function (e) {
                _this.config.events.fire(types_1.SpreadsheetEvents.editLineBlur, [e.target.value, e]);
            }
        };
        _this.config.events.on(types_1.SpreadsheetEvents.cellInput, function (_cell, val) {
            _this._value = val;
            _this.paint();
        });
        var render = function () { return _this._render(); };
        _this.mount(element, dom_1.create({ render: render }));
        return _this;
    }
    EditLine.prototype.focus = function () {
        this.getRootView().refs.input.el.focus();
    };
    EditLine.prototype.blur = function () {
        this.getRootView().refs.input.el.blur();
    };
    EditLine.prototype.lock = function () {
        this._locked = true;
        this.paint();
    };
    EditLine.prototype.unlock = function () {
        this._locked = false;
        this.paint();
    };
    EditLine.prototype.setValue = function (val) {
        this.unlock();
        this._value = val;
        this.paint();
    };
    EditLine.prototype.clean = function () {
        var _this = this;
        // [dirty]
        setTimeout(function () {
            _this._value = "";
            _this.paint();
        }, 1);
    };
    EditLine.prototype._render = function () {
        return dom_1.el(".dhx_edit_line", {}, [
            // el(".fx", [
            // 	el(".dxi.dxi-function-variant")
            // ]),
            dom_1.el(".input-wrapper", [
                dom_1.el("input.dhx_edit_line_input", {
                    oninput: this._htmlEvents.oninput,
                    onfocus: this._htmlEvents.onfocus,
                    onblur: this._htmlEvents.onblur,
                    value: this._value || "",
                    _ref: "input",
                    disabled: this._locked
                }),
                dom_1.el(".input-animation")
            ])
        ]);
    };
    return EditLine;
}(view_1.View));
exports.EditLine = EditLine;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(4);
var main_1 = __webpack_require__(1);
var BufferManager = /** @class */ (function () {
    function BufferManager(spreadsheet, grid, callAction) {
        this._spreadsheet = spreadsheet;
        this._grid = grid;
        // [dirty]
        this._callAction = callAction.bind(spreadsheet);
        this._buffer = {
            value: "",
            styles: {},
            cell: "",
            cells: "",
            operation: "",
            inserted: false
        };
    }
    BufferManager.prototype.store = function (operation) {
        var cell = this._spreadsheet.selection.getSelectedCell();
        var focus = this._spreadsheet.selection.getFocusedCell();
        var cellInfo = main_1.getCellInfo(this._grid, focus);
        if (cellInfo.edited) {
            return;
        }
        if (main_1.isRangeId(cell) && cell.indexOf(":") === -1) {
            this._buffer.cell = null;
            return;
        }
        this._buffer.value = this._spreadsheet.getValue(cell);
        this._buffer.styles = this._spreadsheet.getStyle(cell);
        this._buffer.cells = cell;
        this._buffer.cell = focus;
        this._buffer.operation = operation;
        this._buffer.inserted = false;
        this._grid.paint();
    };
    BufferManager.prototype.paste = function () {
        if (!this._buffer.cell) {
            return;
        }
        this._buffer.inserted = true;
        var cell = this._spreadsheet.selection.getSelectedCell();
        var format = this._spreadsheet.getFormat(this._buffer.cells);
        var newCell = cell;
        var isRangeCells = false;
        if (main_1.isRangeId(this._buffer.cells)) {
            isRangeCells = true;
            var index = main_1.getRangeIndexes(this._buffer.cells);
            var to = main_1.getCellIndex(cell);
            var diff = { row: index.end.row - index.start.row, col: index.end.col - index.start.col };
            var lastCell = main_1.getCellNameByIndex(to.row + diff.row, to.col + diff.col);
            if (main_1.isRangeId(cell)) {
                var bufferCellsLength = main_1.getCellsArray(this._buffer.cells).length;
                var targetCellsLength = main_1.getCellsArray(cell).length;
                if (bufferCellsLength > targetCellsLength) {
                    newCell = cell.split(":")[0] + ":" + lastCell;
                }
            }
            else {
                newCell += ":" + lastCell;
            }
        }
        var isRangeTarget = main_1.isRangeId(newCell);
        var styles = Array.isArray(this._buffer.styles) ?
            this._buffer.styles.map(function (obj) { return dhx.css.add(obj); })
            : dhx.css.add(this._buffer.styles);
        var actionsGroup = [];
        if (this._buffer.operation === "cut") {
            actionsGroup.push({
                cell: this._buffer.cells,
                action: types_1.Actions.setCellFormat,
                groupAction: isRangeTarget ? types_1.Actions.groupAction : null,
                val: ""
            }, {
                cell: this._buffer.cells,
                action: types_1.Actions.setCellValue,
                val: "",
                groupAction: isRangeCells ? types_1.Actions.groupAction : null
            }, {
                cell: this._buffer.cells,
                action: types_1.Actions.setCellStyle,
                val: "",
                groupAction: isRangeCells ? types_1.Actions.groupAction : null
            });
            this._buffer.operation = "copy";
        }
        actionsGroup.push({
            cell: newCell,
            action: types_1.Actions.setCellFormat,
            groupAction: isRangeTarget ? types_1.Actions.groupAction : null,
            val: format
        }, {
            cell: newCell,
            action: types_1.Actions.setCellValue,
            val: this._buffer.value,
            groupAction: isRangeTarget ? types_1.Actions.groupAction : null
        }, {
            cell: newCell,
            action: types_1.Actions.setCellStyle,
            val: styles,
            groupAction: isRangeTarget ? types_1.Actions.groupAction : null
        });
        this._callAction(actionsGroup);
    };
    BufferManager.prototype.getStruct = function () {
        return this._buffer;
    };
    return BufferManager;
}());
exports.BufferManager = BufferManager;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts_data_1 = __webpack_require__(11);
var main_1 = __webpack_require__(1);
var CustomCsvDriver = /** @class */ (function (_super) {
    __extends(CustomCsvDriver, _super);
    function CustomCsvDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomCsvDriver.prototype.toJsonArray = function (data) {
        var dataArr = _super.prototype.toJsonArray.call(this, data);
        var d = dataArr.reduce(function (total, item, i) {
            for (var key in item) {
                total.push({
                    value: item[key],
                    cell: main_1.getCellNameByIndex(i, parseFloat(key))
                });
            }
            return total;
        }, []);
        return d;
    };
    return CustomCsvDriver;
}(ts_data_1.CsvDriver));
exports.CustomCsvDriver = CustomCsvDriver;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Keymanager_1 = __webpack_require__(109);
var hotkeys_1 = __webpack_require__(110);
var main_1 = __webpack_require__(1);
var toolbar_1 = __webpack_require__(23);
var types_1 = __webpack_require__(4);
exports.focusHandler = {
    inFocus: null,
    getFocusState: function () { return _this.inFocus; },
    setFocusState: function (state) { return _this.inFocus = state; }
};
function initHotkeys(spreadsheet, grid, bufferManager) {
    var editedCell;
    // [dirty] move to keyManager
    var focusableKeyManager = {
        addHotKey: function (key, handler) {
            Keymanager_1.keyManager.addHotKey(key, function (e) {
                if (exports.focusHandler.getFocusState()) {
                    handler(e);
                }
            });
        }
    };
    spreadsheet.events.on(types_1.SpreadsheetEvents.afterEditStart, function (cell) {
        editedCell = cell;
    });
    spreadsheet.events.on(types_1.SpreadsheetEvents.afterEditEnd, function () {
        editedCell = null;
    });
    var isChild = function (parent, child) {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    document.addEventListener("mousedown", function (e) {
        var target = e.target;
        exports.focusHandler.setFocusState(isChild(spreadsheet.container, target)
            || target.isEqualNode(spreadsheet.container));
    });
    spreadsheet.container.addEventListener("mouseenter", function (e) {
        if (exports.focusHandler.getFocusState() === null) {
            exports.focusHandler.setFocusState(true);
        }
    });
    document.addEventListener("keydown", function (e) {
        if (!exports.focusHandler.getFocusState()) {
            return;
        }
        if (hotkeys_1.isPrintableKey(e)) {
            var focused = spreadsheet.selection.getFocusedCell();
            if (focused && focused !== editedCell) {
                e.preventDefault();
                spreadsheet.startEdit(focused, e.key);
            }
        }
    });
    focusableKeyManager.addHotKey("escape", function () {
        var selected = spreadsheet.selection.getSelectedCell();
        var id = main_1.getCellIds(grid, selected);
        var prevValue = grid.data.getItem(id.row)[id.col];
        if (selected) {
            main_1.updateCellInfo(grid, selected, {
                nextValue: prevValue
            });
            spreadsheet.endEdit();
            grid.paint();
        }
    });
    focusableKeyManager.addHotKey("delete", function () {
        if (editedCell) {
            return;
        }
        var selected = spreadsheet.selection.getSelectedCell();
        if (selected) {
            spreadsheet.setValue(selected, "");
        }
        grid.paint();
    });
    var pasteFromClipboard = function (data) {
        var buffer = bufferManager.getStruct();
        if (data === JSON.stringify(buffer.value)) {
            bufferManager.paste();
            return;
        }
        bufferManager.store("copy");
        buffer.value = data;
        bufferManager.paste();
    };
    // only for IE
    if (window.clipboardData) {
        focusableKeyManager.addHotKey("ctrl+c", function () {
            if (exports.focusHandler.getFocusState() && !editedCell) {
                bufferManager.store("copy");
                if (window.clipboardData) {
                    window.clipboardData.setData("text/html", hotkeys_1.getHtmlData(spreadsheet));
                    window.clipboardData.setData("text", JSON.stringify(spreadsheet.getValue(spreadsheet.selection.getSelectedCell())));
                }
            }
        });
        focusableKeyManager.addHotKey("ctrl+x", function () {
            if (exports.focusHandler.getFocusState() && !editedCell) {
                bufferManager.store("cut");
                if (window.clipboardData) {
                    window.clipboardData.setData("text/html", hotkeys_1.getHtmlData(spreadsheet));
                    window.clipboardData.setData("text", JSON.stringify(spreadsheet.getValue(spreadsheet.selection.getSelectedCell())));
                }
            }
        });
        focusableKeyManager.addHotKey("ctrl+v", function () {
            if (exports.focusHandler.getFocusState() && !editedCell) {
                if (window.clipboardData) {
                    var data = window.clipboardData.getData("text");
                    pasteFromClipboard(data);
                }
            }
        });
    }
    else {
        document.addEventListener("cut", function (e) {
            if (exports.focusHandler.getFocusState() && !editedCell) {
                bufferManager.store("cut");
                e.clipboardData.setData("text/html", hotkeys_1.getHtmlData(spreadsheet));
                e.clipboardData.setData("text/plain", JSON.stringify(spreadsheet.getValue(spreadsheet.selection.getSelectedCell())));
                e.preventDefault();
            }
        });
        document.addEventListener("copy", function (e) {
            if (exports.focusHandler.getFocusState() && !editedCell) {
                bufferManager.store("copy");
                e.clipboardData.setData("text/html", hotkeys_1.getHtmlData(spreadsheet));
                e.clipboardData.setData("text/plain", JSON.stringify(spreadsheet.getValue(spreadsheet.selection.getSelectedCell())));
                e.preventDefault();
            }
        });
        document.addEventListener("paste", function (e) {
            if (exports.focusHandler.getFocusState() && !editedCell) {
                var data = e.clipboardData.getData("text");
                pasteFromClipboard(data);
                e.preventDefault();
            }
        });
    }
    focusableKeyManager.addHotKey("enter", function () {
        var selected = spreadsheet.selection.getSelectedCell();
        var focused = spreadsheet.selection.getFocusedCell();
        if (editedCell) {
            var index = main_1.getCellIndex(editedCell);
            index.row = index.row + 1 === grid.data.getLength() ? index.row : index.row + 1;
            spreadsheet.selection.setSelectedCell(main_1.getCellNameByIndex(index.row, index.col));
            editedCell = "";
            if (main_1.isRangeId(selected)) {
                spreadsheet.selection.setSelectedCell(selected);
                spreadsheet.selection.setFocusedCell(main_1.getNextRangeCell(selected, focused, "col"));
            }
        }
        else {
            if (main_1.isRangeId(selected)) {
                spreadsheet.endEdit();
                spreadsheet.selection.setSelectedCell(selected);
                spreadsheet.selection.setFocusedCell(main_1.getNextRangeCell(selected, focused, "col"));
                return;
            }
            spreadsheet.startEdit(selected);
        }
    });
    focusableKeyManager.addHotKey("f2", function () {
        spreadsheet.startEdit(spreadsheet.selection.getSelectedCell());
    });
    focusableKeyManager.addHotKey("pageUp", function (e) {
        e.preventDefault();
        var body = grid.getRootView().refs.grid_body;
        body.el.scrollTop -= body.el.clientHeight;
    });
    focusableKeyManager.addHotKey("pageDown", function (e) {
        e.preventDefault();
        var body = grid.getRootView().refs.grid_body;
        body.el.scrollTop += body.el.clientHeight - grid.config.rowHeight;
    });
    focusableKeyManager.addHotKey("ctrl+a", function (e) {
        if (exports.focusHandler.getFocusState() && !editedCell) {
            e.preventDefault();
            var first = main_1.getCellNameByIndex(0, 1);
            var last = main_1.getCellNameByIndex(grid.data.getLength() - 1, grid.config.columns.length - 1);
            spreadsheet.selection.setSelectedCell(first + ":" + last);
        }
    });
    focusableKeyManager.addHotKey("shift+arrowLeft", function () {
        setSelection(spreadsheet, grid, -1, "col");
    });
    focusableKeyManager.addHotKey("shift+arrowRight", function () {
        setSelection(spreadsheet, grid, 1, "col");
    });
    focusableKeyManager.addHotKey("shift+arrowDown", function () {
        setSelection(spreadsheet, grid, 1, "row");
    });
    focusableKeyManager.addHotKey("shift+arrowUp", function () {
        setSelection(spreadsheet, grid, -1, "row");
    });
    focusableKeyManager.addHotKey("ctrl+enter", function () {
        spreadsheet.endEdit();
    });
    focusableKeyManager.addHotKey("shift+enter", function () {
        var selected = spreadsheet.selection.getSelectedCell();
        if (main_1.isRangeId(selected)) {
            var focused = spreadsheet.selection.getFocusedCell();
            spreadsheet.endEdit();
            spreadsheet.selection.setSelectedCell(selected);
            spreadsheet.selection.setFocusedCell(main_1.getPrevRangeCell(selected, focused, "col"));
            return;
        }
        setCell(spreadsheet, grid, null, -1, "row");
    });
    focusableKeyManager.addHotKey("tab", function (e) {
        e.preventDefault();
        var selected = spreadsheet.selection.getSelectedCell();
        if (main_1.isRangeId(selected)) {
            var focused = spreadsheet.selection.getFocusedCell();
            spreadsheet.endEdit();
            spreadsheet.selection.setSelectedCell(selected);
            spreadsheet.selection.setFocusedCell(main_1.getNextRangeCell(selected, focused));
            return;
        }
        setCell(spreadsheet, grid, null, 1, "col");
    });
    focusableKeyManager.addHotKey("shift+tab", function (e) {
        e.preventDefault();
        var selected = spreadsheet.selection.getSelectedCell();
        if (main_1.isRangeId(selected)) {
            var focused = spreadsheet.selection.getFocusedCell();
            spreadsheet.endEdit();
            spreadsheet.selection.setSelectedCell(selected);
            spreadsheet.selection.setFocusedCell(main_1.getPrevRangeCell(selected, focused));
            return;
        }
        setCell(spreadsheet, grid, null, -1, "col");
    });
    focusableKeyManager.addHotKey("arrowLeft", function (e) {
        if (editedCell) {
            return;
        }
        e.preventDefault();
        setCell(spreadsheet, grid, null, -1, "col");
    });
    focusableKeyManager.addHotKey("arrowRight", function (e) {
        if (editedCell) {
            return;
        }
        e.preventDefault();
        setCell(spreadsheet, grid, null, 1, "col");
    });
    focusableKeyManager.addHotKey("arrowDown", function (e) {
        if (editedCell) {
            return;
        }
        e.preventDefault();
        setCell(spreadsheet, grid, null, 1, "row");
    });
    focusableKeyManager.addHotKey("arrowUp", function (e) {
        if (editedCell) {
            return;
        }
        e.preventDefault();
        setCell(spreadsheet, grid, null, -1, "row");
    });
    focusableKeyManager.addHotKey("ctrl+arrowLeft", function () {
        setCell(spreadsheet, grid, 1, null, "col");
    });
    focusableKeyManager.addHotKey("ctrl+arrowRight", function () {
        setCell(spreadsheet, grid, grid.config.columns.length - 1, null, "col");
    });
    focusableKeyManager.addHotKey("ctrl+arrowDown", function () {
        setCell(spreadsheet, grid, grid.data.getLength() - 1, null, "row");
    });
    focusableKeyManager.addHotKey("ctrl+arrowUp", function () {
        setCell(spreadsheet, grid, 0, null, "row");
    });
    focusableKeyManager.addHotKey("home", function (e) {
        e.preventDefault();
        setCell(spreadsheet, grid, 1, null, "col");
    });
    focusableKeyManager.addHotKey("end", function (e) {
        e.preventDefault();
        setCell(spreadsheet, grid, grid.config.columns.length - 1, null, "col");
    });
    focusableKeyManager.addHotKey("ctrl+home", function () {
        setCell(spreadsheet, grid, 0, null, "row");
        setCell(spreadsheet, grid, 1, null, "col");
    });
    focusableKeyManager.addHotKey("ctrl+end", function () {
        setCell(spreadsheet, grid, grid.data.getLength() - 1, null, "row");
        setCell(spreadsheet, grid, grid.config.columns.length - 1, null, "col");
    });
    focusableKeyManager.addHotKey("ctrl+z", function () {
        spreadsheet.undo();
    });
    focusableKeyManager.addHotKey("ctrl+y", function (e) {
        e.preventDefault();
        spreadsheet.redo();
    });
    focusableKeyManager.addHotKey("ctrl+shift+z", function () {
        spreadsheet.redo();
    });
    focusableKeyManager.addHotKey("ctrl+b", function () {
        var cell = spreadsheet.selection.getSelectedCell();
        var val = toolbar_1.getToggledValue(grid, cell, "font-weight", "bold");
        spreadsheet.setStyle(spreadsheet.selection.getSelectedCell(), { "font-weight": val });
    });
    focusableKeyManager.addHotKey("ctrl+i", function () {
        var cell = spreadsheet.selection.getSelectedCell();
        var val = toolbar_1.getToggledValue(grid, cell, "font-style", "italic");
        spreadsheet.setStyle(spreadsheet.selection.getSelectedCell(), { "font-style": val });
    });
    focusableKeyManager.addHotKey("ctrl+u", function (e) {
        e.preventDefault();
        var cell = spreadsheet.selection.getSelectedCell();
        var val = toolbar_1.getToggledValue(grid, cell, "text-decoration", "underline");
        spreadsheet.setStyle(spreadsheet.selection.getSelectedCell(), { "text-decoration": val });
    });
    focusableKeyManager.addHotKey("backspace", function () {
        if (editedCell) {
            return;
        }
        spreadsheet.setValue(spreadsheet.selection.getSelectedCell(), "");
    });
}
exports.initHotkeys = initHotkeys;
function setCell(spreadsheet, grid, set, add, dir) {
    var info = main_1.getCellInfo(grid, spreadsheet.selection.getFocusedCell());
    if (info.edited) {
        return;
    }
    var index = main_1.getCellIndex(spreadsheet.selection.getFocusedCell());
    var length = getLength(grid, dir);
    var nextVal = add ? index[dir] + add : set;
    if (nextVal >= length.min && nextVal <= length.max) {
        index[dir] = nextVal;
    }
    var cell = main_1.getCellNameByIndex(index.row, index.col);
    spreadsheet.selection.setSelectedCell(cell);
    var id = main_1.getCellIds(grid, cell);
    grid.scrollTo(id.row, id.col);
}
function setSelection(spreadsheet, grid, step, dir) {
    var focused = spreadsheet.selection.getFocusedCell();
    var info = main_1.getCellInfo(grid, focused);
    if (info.edited) {
        return;
    }
    var selectedIndex = main_1.getCellIndex(focused);
    var lastSelected = spreadsheet.selection.getSelectedCell().split(",")[0];
    var index;
    var end;
    if (lastSelected.indexOf(":") === -1) {
        index = __assign({}, selectedIndex);
        end = selectedIndex;
    }
    else {
        var range = main_1.getRangeIndexes(lastSelected);
        if (range.end[dir] > selectedIndex[dir]) {
            index = __assign({}, range.end);
            end = range.start;
        }
        else {
            index = __assign({}, range.start);
            end = range.end;
        }
    }
    var length = getLength(grid, dir);
    if (index[dir] + step >= length.min && index[dir] + step <= length.max) {
        index[dir] += step;
        var start = main_1.getCellNameByIndex(index.row, index.col);
        end = main_1.getCellNameByIndex(end.row, end.col);
        if (start === end) {
            spreadsheet.selection.setSelectedCell(start);
            return;
        }
        spreadsheet.selection.setSelectedCell(start + ":" + end);
        spreadsheet.selection.setFocusedCell(focused);
    }
}
function getLength(grid, dir) {
    if (dir === "row") {
        return {
            min: 0,
            max: grid.data.getLength() - 1
        };
    }
    return {
        min: 1,
        max: grid.config.columns.length - 1
    };
}


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getHotKeyCode(code) {
    var matches = code.toLowerCase().match(/\w+/g);
    var comp = 0;
    var key = "";
    for (var i = 0; i < matches.length; i++) {
        var check = matches[i];
        if (check === "ctrl") {
            comp += 4;
        }
        else if (check === "shift") {
            comp += 2;
        }
        else if (check === "alt") {
            comp += 1;
        }
        else {
            key = check;
        }
    }
    return comp + key;
}
var KeyManager = /** @class */ (function () {
    function KeyManager() {
        var _this = this;
        this._keysStorage = {};
        document.addEventListener("keydown", function (e) {
            var comp = (e.ctrlKey || e.metaKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0);
            var key;
            if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90)) { // A-Z 0-9
                key = String.fromCharCode(e.which);
            }
            else {
                key = e.key;
            }
            var code = comp + key.toLowerCase();
            var actions = _this._keysStorage[code];
            if (actions) {
                for (var i = 0; i < actions.length; i++) {
                    actions[i].handler(e);
                }
            }
        });
    }
    KeyManager.prototype.addHotKey = function (key, handler, scope) {
        var code = getHotKeyCode(key);
        if (!this._keysStorage[code]) {
            this._keysStorage[code] = [];
        }
        this._keysStorage[code].push({
            handler: handler,
            scope: scope
        });
    };
    KeyManager.prototype.removeHotKey = function (key, scope) {
        var keyStorage = this._keysStorage;
        if (key) {
            var code = getHotKeyCode(key);
            delete keyStorage[code];
        }
        if (scope) {
            for (var code in keyStorage) {
                var toDelete = []; // items index to delete
                for (var i = 0; i < keyStorage[code].length; i++) {
                    if (keyStorage[code][i].scope === scope) {
                        toDelete.push(i);
                    }
                }
                if (keyStorage[code].length === toDelete.length) {
                    delete keyStorage[code];
                }
                else {
                    for (var i = toDelete.length - 1; i >= 0; i--) { // begin from last coz splice change other index
                        keyStorage[code].splice(toDelete[i], 1);
                    }
                }
            }
        }
    };
    KeyManager.prototype.exist = function (key) {
        var code = getHotKeyCode(key);
        return !!this._keysStorage[code];
    };
    return KeyManager;
}());
exports.keyManager = new KeyManager();


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
function isPrintableKey(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
    }
    var keyCode = e.which || e.keyCode;
    var symbols = {
        32: " ",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    };
    var isLetter = keyCode >= 65 && keyCode <= 90;
    var isNumber = keyCode >= 48 && keyCode <= 57;
    var isNumpadNumber = keyCode >= 96 && keyCode <= 105;
    var isSymbol = !!symbols[keyCode];
    return isLetter || isNumber || isNumpadNumber || isSymbol || false;
}
exports.isPrintableKey = isPrintableKey;
function getHtmlData(spreadsheet) {
    var selected = spreadsheet.selection.getSelectedCell();
    if (!main_1.isRangeId(selected)) {
        return spreadsheet.getValue(selected);
    }
    var matrix = main_1.getRangeMatrix(spreadsheet.selection.getSelectedCell());
    var values = matrix.reduce(function (total, row) {
        var rowValues = row.reduce(function (t, cell) {
            var val = spreadsheet.getValue(cell);
            var stylesObj = spreadsheet.getStyle(cell) || {};
            var styles = Object.keys(stylesObj).reduce(function (totalStyles, key) { return "" + totalStyles + key + ":" + stylesObj[key] + ";"; }, "");
            return t + " <th style=\"" + styles + "\">\n\t\t\t" + val + "</th>";
        }, "");
        return total + "<tr style=\"box-sizing: inherit;\">" + rowValues + "</tr>";
    }, "");
    return "\n\t<!--StartFragment-->\n\t\t<table id=\"customers\">\n\t\t\t<tbody style=\"box-sizing: inherit;\">\n\t\t\t\t" + values + "\n\t\t\t</tbody>\n\t\t</table>\n\t<!--EndFragment-->";
}
exports.getHtmlData = getHtmlData;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(0);
var ts_grid_1 = __webpack_require__(37);
var columnsResizer_1 = __webpack_require__(112);
var main_1 = __webpack_require__(1);
var selection_1 = __webpack_require__(41);
var types_1 = __webpack_require__(4);
var Selection = /** @class */ (function () {
    function Selection(spreadsheet, grid, bufferManager) {
        this._spreadsheet = spreadsheet;
        this._grid = grid;
        this._bufferManager = bufferManager;
        this._selected = [];
        this._focusedCell = {
            row: "",
            col: "",
            cell: ""
        };
        this._events = spreadsheet.events;
        this._setHandlers();
    }
    Selection.prototype.setSelectedCell = function (cell) {
        if (!cell) {
            return;
        }
        if (!this._events.fire(types_1.SpreadsheetEvents.beforeSelectionSet, [cell])) {
            return;
        }
        this._removeHeadersCss();
        var cells = cell.split(",");
        this._selected = cells;
        var nextFocused = this._selected[this._selected.length - 1];
        if (main_1.isRangeId(nextFocused)) {
            nextFocused = nextFocused.split(":")[0];
        }
        this.setFocusedCell(nextFocused);
        this._setHeadersCss();
        if (!this._mousePressed) {
            this._events.fire(types_1.SpreadsheetEvents.afterSelectionSet, [this.getSelectedCell()]);
        }
        else {
            this._grid.paint();
        }
    };
    Selection.prototype.getSelectedCell = function () {
        if (this._selected.length) {
            return this._selected.join(",");
        }
    };
    Selection.prototype.getFocusedCell = function () {
        if (this._focusedCell && this._focusedCell.cell) {
            return this._focusedCell.cell;
        }
    };
    Selection.prototype.setFocusedCell = function (cell) {
        cell = cell.toUpperCase();
        if (!this._events.fire(types_1.SpreadsheetEvents.beforeFocusSet, [cell])) {
            return;
        }
        var _a = main_1.getCellIds(this._grid, cell), row = _a.row, col = _a.col;
        this._focusedCell = {
            row: row,
            col: col,
            cell: cell,
            edit: false
        };
        this._events.fire(types_1.SpreadsheetEvents.afterFocusSet, [cell]);
    };
    Selection.prototype._isInRange = function (cell, range) {
        if (!range || !cell || range.indexOf(":") === -1) {
            return false;
        }
        var _a = main_1.getCellIndex(cell), row = _a.row, col = _a.col;
        var _b = main_1.getRangeIndexes(range), start = _b.start, end = _b.end;
        var between = function (x, min, max) {
            return ((x - min) * (x - max) <= 0);
        };
        if (start && end) {
            return between(row, start.row, end.row)
                && between(col, start.col, end.col);
        }
        return false;
    };
    Selection.prototype._removeHeadersCss = function () {
        var _this = this;
        var selected = this.getSelectedCell();
        if (selected) {
            this._spreadsheet.eachCell(function (cellName) {
                var index = main_1.getCellIndex(cellName);
                var row = _this._grid.data.getId(index.row);
                if (row !== undefined) {
                    _this._grid.removeRowCss(row, "dhx_selected_row");
                }
                var col = _this._grid.config.columns[index.col];
                if (col !== undefined) {
                    col.header[0].css = col.header[0].css.replace(" dhx_selected_header", "");
                }
            });
            if (this._grid.data.exists(this._focusedCell.row)) {
                this._grid.removeRowCss(this._focusedCell.row, "dhx_selected_row");
            }
        }
    };
    Selection.prototype._setHeadersCss = function () {
        var _this = this;
        var selected = this.getSelectedCell();
        if (selected) {
            this._spreadsheet.eachCell(function (cellName) {
                var index = main_1.getCellIndex(cellName);
                var row = _this._grid.data.getId(index.row);
                if (row !== undefined) {
                    _this._grid.addRowCss(row, "dhx_selected_row");
                }
                var col = _this._grid.config.columns[index.col];
                if (col !== undefined && !RegExp(/dhx_selected_header/).test(col.header[0].css)) {
                    col.header[0].css += " dhx_selected_header";
                }
            });
        }
    };
    Selection.prototype._selectRow = function (row) {
        var firsCol = this._grid.config.columns[1];
        var lastCol = this._grid.config.columns[this._grid.config.columns.length - 1];
        this.setSelectedCell(main_1.getCellNameById(this._grid, row.id, firsCol.id) + ":" + main_1.getCellNameById(this._grid, row.id, lastCol.id));
    };
    Selection.prototype._selectColumn = function (col) {
        var firstRowId = this._grid.data.getId(0);
        var lastRowId = this._grid.data.getId(this._grid.data.getLength() - 1);
        var firstRow = this._grid.data.getItem(firstRowId);
        var lastRow = this._grid.data.getItem(lastRowId);
        this.setSelectedCell(main_1.getCellNameById(this._grid, firstRow.id, col.id) + ":" + main_1.getCellNameById(this._grid, lastRow.id, col.id));
    };
    Selection.prototype._setGroupSelectionHandlers = function () {
        var _this = this;
        this._grid.events.on(ts_grid_1.GridEvents.cellMouseOver, function (row, col) {
            if (main_1.getCellInfo(_this._grid, _this.getFocusedCell()).edited) {
                return;
            }
            if (_this._mousePressed) {
                if (_this._pressedArea !== "index" && col.id === "$index") {
                    return;
                }
                if (_this._pressedArea === "header" && col.id !== "$index") {
                    var lastRowId = _this._grid.data.getId(_this._grid.data.getLength() - 1);
                    var lastRow = _this._grid.data.getItem(lastRowId);
                    _this.setSelectedCell(_this._focusedCell.cell + ":" + main_1.getCellNameById(_this._grid, lastRow.id, col.id));
                    return;
                }
                var lastCol = _this._grid.config.columns[_this._grid.config.columns.length - 1];
                var lastCell = main_1.getCellNameById(_this._grid, row.id, _this._pressedArea === "index" ? lastCol.id : col.id);
                var focused = _this._focusedCell.cell;
                var selected = _this._selected.slice();
                if (_this._focusedCell.cell !== lastCell) {
                    if (_this._pressedArea === "fillHandle") {
                        lastCell = selection_1.getLastCopyingCell(_this._cellsToCopy, lastCell);
                        var lastCellInRange = _this._isInRange(lastCell, _this._cellsToCopy);
                        if ((lastCell === focused) || lastCellInRange) {
                            lastCell = _this._cellsToCopy.split(":")[1];
                        }
                    }
                    var range = focused + ":" + lastCell;
                    selected[selected.length - 1] = range;
                    var prevFocusedCell = _this.getFocusedCell();
                    _this.setSelectedCell(selected.join(","));
                    _this.setFocusedCell(prevFocusedCell);
                }
            }
        });
        this._grid.events.on(ts_grid_1.GridEvents.headerCellMouseOver, function (col) {
            if (_this._pressedArea === "cell") {
                return;
            }
            if (_this._mousePressed && _this._pressedArea === "header" && col.id !== "$index") {
                var lastRowId = _this._grid.data.getId(_this._grid.data.getLength() - 1);
                var lastRow = _this._grid.data.getItem(lastRowId);
                _this.setSelectedCell(_this._focusedCell.cell + ":" + main_1.getCellNameById(_this._grid, lastRow.id, col.id));
            }
        });
    };
    Selection.prototype._setHandlers = function () {
        var _this = this;
        var gridRect;
        var reCallTimer;
        document.addEventListener("mouseup", function () {
            if (_this._mousePressed) {
                _this._mousePressed = false;
                if (_this._pressedArea === "fillHandle") {
                    var selected = _this.getSelectedCell();
                    if (selected !== _this._cellsToCopy) {
                        _this._events.fire(types_1.SpreadsheetEvents.groupFill, [_this._cellsToCopy, selected]);
                    }
                    _this._cellsToCopy = "";
                }
                _this._pressedArea = null;
                document.removeEventListener("mousemove", moveHandler);
                if (reCallTimer) {
                    clearTimeout(reCallTimer);
                }
                if (_this._selected.length) {
                    _this._events.fire(types_1.SpreadsheetEvents.afterSelectionSet, [_this.getSelectedCell()]);
                }
                _this._grid.paint();
            }
        });
        var moveHandler = function (e) {
            if (reCallTimer) {
                clearTimeout(reCallTimer);
            }
            var scrollState = _this._grid.getScrollState();
            if (e.clientX > gridRect.width + gridRect.left - 50) {
                _this._grid.scroll(scrollState.x + 50, scrollState.y);
            }
            if (e.clientX < gridRect.left + 50) {
                _this._grid.scroll(scrollState.x - 50, scrollState.y);
            }
            if (e.clientY > gridRect.height + gridRect.top - 50) {
                _this._grid.scroll(scrollState.x, scrollState.y + 50);
            }
            if (e.clientY < gridRect.top + 50) {
                _this._grid.scroll(scrollState.x, scrollState.y - 50);
            }
            reCallTimer = setTimeout(function () {
                moveHandler(e);
            }, 100);
        };
        this._grid.events.on(ts_grid_1.GridEvents.cellMouseDown, function (row, col, e) {
            _this._mousePressed = true;
            gridRect = _this._grid.getRootView().node.el.getBoundingClientRect();
            document.addEventListener("mousemove", moveHandler);
            if (col.id === "$index") {
                _this._pressedArea = "index";
                _this._selectRow(row);
                return;
            }
            _this._pressedArea = "cell";
            var cell = main_1.getCellNameById(_this._grid, row.id, col.id);
            var cellInfo = main_1.getCellInfo(_this._grid, cell);
            if (e.which === 3 && _this._isInRange(cell, _this._selected[_this._selected.length - 1])) {
                return;
            }
            if (cellInfo.edited) {
                return;
            }
            if (e.shiftKey) {
                _this.setSelectedCell(_this._focusedCell.cell + ":" + main_1.getCellNameById(_this._grid, row.id, col.id));
                return;
            }
            if (e.ctrlKey || e.metaKey) {
                var selectedCells = _this.getSelectedCell();
                if (selectedCells) {
                    _this.setSelectedCell(selectedCells + "," + cell);
                }
                return;
            }
            _this.setSelectedCell(cell);
        });
        this._grid.events.on(ts_grid_1.GridEvents.headerCellMouseDown, function (col, e) {
            var resizedColumn = e.target.getAttribute("dhx_id");
            // not select when click on column resize grip [todo] make more stable check
            if (!resizedColumn) {
                _this._pressedArea = "header";
                _this._selectColumn(col);
                _this._mousePressed = true;
            }
            else {
                if (resizedColumn === "$index") {
                    // select all cells
                    var first = main_1.getCellNameByIndex(0, 1);
                    var last = main_1.getCellNameByIndex(_this._grid.data.getLength() - 1, _this._grid.config.columns.length - 1);
                    _this.setSelectedCell(first + ":" + last);
                    return;
                }
                _this._resizedColumn = _this._grid.config.columns[resizedColumn].id;
                columnsResizer_1.startResize(_this._grid, _this._resizedColumn, e, function () {
                    _this._resizedColumn = null;
                    _this._grid.paint();
                });
            }
        });
        this._setGroupSelectionHandlers();
        this._grid.events.on(ts_grid_1.GridEvents.cellDblClick, function (row, col) {
            if (col.id !== "$index") {
                _this._spreadsheet.startEdit(main_1.getCellNameById(_this._grid, row.id, col.id));
            }
        });
        this._grid.events.on(ts_grid_1.GridEvents.headerCellDblClick, function (col, e) {
            var resizeGrip = e.target.getAttribute("dhx_id");
            if (resizeGrip) {
                _this._grid.adjustColumnWidth(col.id);
            }
        });
        this._events.on(types_1.SpreadsheetEvents.gridRedraw, function (vm) {
            var selected = _this.getSelectedCell();
            var focused = _this.getFocusedCell();
            if (!selected || !focused) {
                return;
            }
            var getCellCoords = function (index) {
                var BORDER = 1;
                return {
                    x: _this._grid.config.columns.slice(0, index.col).reduce(function (total, c) { return total += c.width; }, 0),
                    y: index.row * _this._grid.config.rowHeight,
                    width: _this._grid.config.columns[index.col].width + BORDER,
                    height: _this._grid.config.rowHeight + BORDER
                };
            };
            var getGroupCoords = function (rangeIndex) {
                var start = getCellCoords(rangeIndex.start);
                var end = getCellCoords(rangeIndex.end);
                return {
                    x: start.x,
                    y: start.y,
                    width: end.x - start.x + end.width,
                    height: end.y - start.y + end.height,
                };
            };
            var selectedCells = _this._selected.map(function (cell) {
                if (main_1.isRangeId(cell)) {
                    var coords = getGroupCoords(main_1.getRangeIndexes(cell));
                    return dom_1.el(".dhx_group_selection", {
                        style: {
                            top: coords.y,
                            left: coords.x,
                            width: coords.width,
                            height: coords.height
                        }
                    });
                }
                else {
                    if (_this._selected.length === 1) {
                        return;
                    }
                    var _a = getCellCoords(main_1.getCellIndex(cell)), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                    return dom_1.el(".dhx_group_selection", {
                        style: {
                            width: width,
                            height: height,
                            top: y,
                            left: x,
                            position: "absolute",
                            pointerEvents: "none"
                        }
                    });
                }
            });
            var focusedCoords = getCellCoords(main_1.getCellIndex(focused));
            var focusedCell = dom_1.el(".dhx_selected_cell", {
                style: {
                    width: focusedCoords.width,
                    height: focusedCoords.height,
                    top: focusedCoords.y,
                    left: focusedCoords.x,
                    position: "absolute",
                    pointerEvents: "none"
                }
            });
            var copySelection;
            var buffer = _this._bufferManager.getStruct();
            if (buffer.cell && !buffer.inserted) {
                var cellsArr = main_1.getCellsArray(buffer.cells);
                var start = main_1.getCellIndex(cellsArr[0]);
                var end = main_1.getCellIndex(cellsArr[cellsArr.length - 1]);
                var coords = getGroupCoords({ start: start, end: end });
                copySelection = dom_1.el(".dhx_copy_selection", {
                    style: {
                        top: coords.y,
                        left: coords.x,
                        width: coords.width,
                        height: coords.height
                    }
                });
            }
            var resizedLine;
            if (_this._resizedColumn) {
                var colIndex = core_1.findIndex(_this._grid.config.columns, function (col) {
                    return col.id === _this._resizedColumn;
                });
                var firstCell = getCellCoords({ row: 0, col: colIndex });
                var totalHeight = _this._grid.config.$totalHeight;
                var lineCenter = 1.5;
                resizedLine = dom_1.el(".resize_line", {
                    style: {
                        top: firstCell.y,
                        left: firstCell.x + firstCell.width - lineCenter,
                        height: totalHeight
                    }
                });
            }
            var lastSelectedCell = _this._selected[_this._selected.length - 1];
            if (main_1.isRangeId(lastSelectedCell)) {
                var rangeArray = main_1.getRangeArray(lastSelectedCell);
                lastSelectedCell = rangeArray[rangeArray.length - 1];
            }
            var lastCellCoords = getCellCoords(main_1.getCellIndex(lastSelectedCell));
            var selectionGrip;
            if (!main_1.getCellInfo(_this._grid, _this.getFocusedCell()).edited) {
                selectionGrip = dom_1.el(".dhx_selection_grip", {
                    dhx_id: "selection_grip",
                    style: {
                        position: "absolute",
                        left: lastCellCoords.x + lastCellCoords.width - 6,
                        top: lastCellCoords.y + lastCellCoords.height - 6
                    },
                    onmousedown: function () {
                        _this._mousePressed = true;
                        document.addEventListener("mousemove", moveHandler);
                        _this._pressedArea = "fillHandle";
                        _this._cellsToCopy = _this.getSelectedCell();
                    }
                });
            }
            vm.refs.selection.patch(dom_1.el(".dhx_grid_selection", [
                copySelection,
                focusedCell
            ].concat(selectedCells, [
                resizedLine,
                selectionGrip
            ])));
        });
    };
    return Selection;
}());
exports.Selection = Selection;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
function startResize(grid, column, ev, cb) {
    var initX = ev.clientX;
    var initWidth = 0;
    var moveHandler = function (e) {
        var i = core_1.findIndex(grid.config.columns, function (obj) {
            return obj.id === column;
        });
        initWidth = initWidth || grid.config.columns[i].width;
        var move = e.clientX - initX;
        var cols = grid.config.columns.slice();
        var size = initWidth + move;
        cols[i].width = size <= 20 ? 20 : size;
        grid.setHeader(cols);
        grid.paint();
    };
    var upHandler = function () {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);
        cb();
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
    grid.paint();
}
exports.startResize = startResize;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var main_1 = __webpack_require__(1);
var Exporter = /** @class */ (function () {
    function Exporter(spreadsheet, grid) {
        this._spreadsheet = spreadsheet;
        this._grid = grid;
    }
    Exporter.prototype.xlsx = function () {
        if (!main_1.isWasmSupported()) {
            throw new Error("WebAssembly is not supported by your browser");
        }
        var cells = [];
        var styles = [
            { id: "" }
        ];
        this._grid.data.map(function (row, i) {
            Object.keys(row).map(function (cell) {
                if (cell === "id" || cell === "$info" || cell === "$index" || cell === "$css") {
                    return;
                }
                var styleInd = null;
                if (row.$info && row.$info[cell]) {
                    var info = row.$info[cell];
                    var format = info.format || "";
                    var css = info.css || "";
                    var styleId_1 = format + css;
                    styleInd = core_1.findIndex(styles, function (s) { return s.id === styleId_1; });
                    if (styleInd === -1) {
                        var propsMap_1 = {
                            "text-align": "align",
                            "font-size": "fontSize",
                            "font-weight": "fontWeight",
                            "font-style": "fontStyle",
                            "text-decoration": "textDecoration"
                        };
                        var cssStyles_1 = dhx.css.get(css) || {};
                        var exportStyles = Object.keys(cssStyles_1).reduce(function (newStyles, key) {
                            newStyles[propsMap_1[key] || key] = cssStyles_1[key];
                            return newStyles;
                        }, {});
                        styles.push(__assign({ format: format }, exportStyles, { id: styleId_1 }));
                        styleInd = styles.length - 1;
                    }
                }
                cells[i] = cells[i] || [];
                var emptyCellWithStyle = !row[cell] && styleInd;
                var cellValue = (row[cell] || emptyCellWithStyle) ? {
                    v: "" + row[cell],
                    s: styleInd
                } : null;
                cells[i].push(cellValue);
            });
        });
        var cols = this._grid.config.columns.map(function (col) { return ({ width: col.width }); }).splice(1);
        var exportData = {
            data: [
                {
                    cells: cells,
                    cols: cols
                }
            ],
            styles: styles
        };
        var path = this._spreadsheet.config.exportModulePath;
        var xlsxWorker = this._getXlsxWorker(path);
        xlsxWorker.postMessage({
            type: "convert",
            data: exportData
        });
    };
    Exporter.prototype._getXlsxWorker = function (path) {
        if (!this._xlsxWorker) {
            var url = window.URL.createObjectURL(new Blob([
                "importScripts('" + path + "');"
            ], { type: "text/javascript" }));
            this._xlsxWorker = new Worker(url);
            this._xlsxWorker.addEventListener("message", function (e) {
                if (e.data.type === "ready") {
                    var a = document.createElement("a");
                    a.href = URL.createObjectURL(e.data.blob);
                    a.download = "data.xlsx";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
        }
        return this._xlsxWorker;
    };
    return Exporter;
}());
exports.Exporter = Exporter;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
var XlsxDriver = /** @class */ (function () {
    function XlsxDriver() {
    }
    XlsxDriver.prototype.toJsonArray = function (data, _spreadsheet, grid) {
        var cells = [];
        var formats = [];
        var styles = {};
        data.styles.forEach(function (style, i) {
            var allowedProps = [
                "background",
                "color",
                "textAlign",
                "textDecoration",
                "fontWeight",
                "fontStyle"
            ];
            var css = allowedProps.reduce(function (acc, prop) {
                if (style[prop]) {
                    acc[prop] = style[prop];
                }
                return acc;
            }, {});
            formats.push(style.format);
            styles["imported_class" + i] = css;
        });
        // [dirty]
        data.data[0].cols.forEach(function (col, i) {
            var c = grid.config.columns[i + 1];
            if (c) {
                c.width = col.width;
            }
        });
        data.data[0].cells.forEach(function (row, rowInd) {
            row.forEach(function (col, colInd) {
                var cell = {
                    cell: main_1.getCellNameByIndex(rowInd, colInd + 1),
                    value: col.v,
                    css: ["imported_class" + col.s],
                    format: formats[col.s]
                };
                cells.push(cell);
            });
        });
        return {
            data: cells,
            styles: styles
        };
    };
    return XlsxDriver;
}());
exports.XlsxDriver = XlsxDriver;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(1);
var XlsxProxy = /** @class */ (function () {
    function XlsxProxy(spreadsheet) {
        this._spreadsheet = spreadsheet;
    }
    XlsxProxy.prototype.load = function (url) {
        var _this = this;
        return new Promise(function (res) {
            _this._getFile(url).then(function (file) {
                var path = _this._spreadsheet.config.importModulePath;
                var xlsxWorker = _this._getXlsxWorker(path);
                xlsxWorker.postMessage({
                    type: "convert",
                    data: file
                });
                xlsxWorker.onmessage = function (e) {
                    if (e.data.type === "ready") {
                        res(e.data);
                    }
                };
            });
        });
    };
    XlsxProxy.prototype._getXlsxWorker = function (path) {
        if (!this._xlsxWorker) {
            var url = window.URL.createObjectURL(new Blob([
                "importScripts('" + path + "');"
            ], { type: "text/javascript" }));
            this._xlsxWorker = new Worker(url);
        }
        return this._xlsxWorker;
    };
    XlsxProxy.prototype._getFile = function (url) {
        return new Promise(function (res) {
            if (url) {
                return main_1.fetchFile(url, "GET", "arraybuffer").then(function (data) {
                    res(data);
                });
            }
            else {
                var input = document.createElement("input");
                input.type = "file";
                input.accept = ".xlsx";
                input.click();
                input.addEventListener("change", function (e) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var arrayBuffer = reader.result;
                        var array = new Uint8Array(arrayBuffer);
                        res(array);
                    };
                    reader.readAsArrayBuffer(e.target.files[0]);
                });
            }
        });
    };
    return XlsxProxy;
}());
exports.XlsxProxy = XlsxProxy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ })
/******/ ]);
});if (window.dhx_legacy) { if (window.dhx){ for (var key in dhx) dhx_legacy[key] = dhx[key]; } window.dhx = dhx_legacy; delete window.dhx_legacy; }

/***/ }),

/***/ "./src/app/imports/bottom-sheets/confirm-agent-code.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/imports/bottom-sheets/confirm-agent-code.component.ts ***!
  \***********************************************************************/
/*! exports provided: ConfirmAgentBottomSheetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmAgentBottomSheetComponent", function() { return ConfirmAgentBottomSheetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/bottom-sheet */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/bottom-sheet.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/list.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/core.es5.js");






var _c0 = ["mat-list-item", "", 3, "click"];
var _c1 = ["mat-line", ""];
var _c2 = ["mat-line", "", 1, "text-black-50"];
var ConfirmAgentBottomSheetComponent = /** @class */ (function () {
    function ConfirmAgentBottomSheetComponent(_bottomSheetRef) {
        this._bottomSheetRef = _bottomSheetRef;
    }
    ConfirmAgentBottomSheetComponent.prototype.ngOnInit = function () { };
    ConfirmAgentBottomSheetComponent.prototype.useCode = function () {
        console.log('USE CODE!');
        this._bottomSheetRef.dismiss(true);
    };
    ConfirmAgentBottomSheetComponent.prototype.confirmNoCode = function () {
        this._bottomSheetRef.dismiss();
    };
    ConfirmAgentBottomSheetComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ConfirmAgentBottomSheetComponent, selectors: [["vs-confirm-agent-bs"]], factory: function ConfirmAgentBottomSheetComponent_Factory(t) { return new (t || ConfirmAgentBottomSheetComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_1__["MatBottomSheetRef"])); }, consts: 13, vars: 0, template: function ConfirmAgentBottomSheetComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h5");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Please confirm how we should try to match sales to your agents.\n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-action-list");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", _c0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmAgentBottomSheetComponent_Template_button_click_3_listener($event) { return ctx.useCode(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", _c1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Use Sales Code");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", _c2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Better matching probability");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", _c0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmAgentBottomSheetComponent_Template_button_click_8_listener($event) { return ctx.confirmNoCode(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", _c1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Use Agent Name");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", _c2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "I don't have their sales codes entered into the system");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_2__["MatList"], _angular_material_list__WEBPACK_IMPORTED_MODULE_2__["MatListItem"], _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatLine"]], encapsulation: 2 });
    return ConfirmAgentBottomSheetComponent;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConfirmAgentBottomSheetComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                templateUrl: './confirm-agent-code.component.html',
                styles: [],
                selector: 'vs-confirm-agent-bs'
            }]
    }], function () { return [{ type: _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_1__["MatBottomSheetRef"] }]; }, null);


/***/ }),

/***/ "./src/app/imports/dialogs/edit-import-model/edit-import-model.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/imports/dialogs/edit-import-model/edit-import-model.component.ts ***!
  \**********************************************************************************/
/*! exports provided: EditImportModelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditImportModelComponent", function() { return EditImportModelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _app_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/models */ "./src/app/models/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/bottom-sheet */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/bottom-sheet.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/dialog.es5.js");
/* harmony import */ var _app_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/session.service */ "./src/app/session.service.ts");
/* harmony import */ var _app_imports_imports_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/imports/imports.service */ "./src/app/imports/imports.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _app_imports_bottom_sheets_confirm_agent_code_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @app/imports/bottom-sheets/confirm-agent-code.component */ "./src/app/imports/bottom-sheets/confirm-agent-code.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/button.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/icon.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/input.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/select.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/checkbox.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/divider.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/core.es5.js");


























var _c0 = ["keyInputs"];
var _c1 = ["mat-dialog-title", "", 1, "d-flex", "justify-content-between"];
var _c2 = ["type", "button", "mat-icon-button", "", 3, "click"];
var _c3 = [1, "pb-2"];
var _c4 = [1, "mb-2", 3, "formGroup"];
var _c5 = [3, "hideRequiredMarker"];
var _c6 = ["type", "text", "matInput", "", "formControlName", "shortDesc", "placeholder", "Model Name", "required", ""];
var _c7 = [4, "ngIf"];
var _c8 = [1, "wp-100"];
var _c9 = ["matNativeControl", "", "matAutosize", "true", "formControlName", "fullDesc", "placeholder", "Description"];
var _c10 = [1, "wp-100", 3, "hideRequiredMarker"];
var _c11 = ["formControlName", "campaignId", "placeholder", "Campaign", "required", ""];
var _c12 = [3, "value", 4, "ngFor", "ngForOf"];
var _c13 = [1, "text-black-50", 3, "checked", "change"];
var _c14 = [1, "text-black-50"];
var _c15 = [1, "text-black-50", "small"];
var _c16 = [3, "routerLink", "click"];
var _c17 = [1, "pb-4"];
var _c18 = ["formArrayName", "map", 2, "overflow", "scroll", "max-height", "25vw"];
var _c19 = [4, "ngFor", "ngForOf"];
var _c20 = [1, "mt-2"];
var _c21 = ["type", "button", "mat-button", "", "color", "primary", 3, "click"];
var _c22 = [1, "d-flex", "justify-content-end"];
var _c23 = ["type", "button", "mat-button", "", 3, "click"];
function EditImportModelComponent_mat_error_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Please enter a model name. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var _c24 = [3, "value"];
function EditImportModelComponent_mat_option_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", _c24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var c_r927 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", c_r927.campaignId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", c_r927.name, " ");
} }
function EditImportModelComponent_mat_error_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Please select a campaign. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var _c25 = [3, "formGroupName"];
var _c26 = [1, "row"];
var _c27 = [1, "col-md-4"];
var _c28 = [1, "pr-1", "wp-100", 3, "hideRequiredMarker"];
var _c29 = ["type", "text", "matInput", "", "formControlName", "key", "placeholder", "Description", "required", ""];
var _c30 = ["keyInputs", ""];
var _c31 = [1, "px-1", "wp-100", 3, "hideRequiredMarker"];
var _c32 = ["type", "text", "matInput", "", "formControlName", "value", "placeholder", "Column Header", "required", ""];
var _c33 = [1, "pl-1", "wp-100"];
var _c34 = ["formControlName", "fieldType", "placeholder", "Field Type", 3, "selectionChange", "keydown"];
function EditImportModelComponent_div_42_mat_error_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Description is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function EditImportModelComponent_div_42_mat_error_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Column Header is required. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function EditImportModelComponent_div_42_mat_option_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", _c24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var j_r936 = ctx.index;
    var ctx_r934 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", j_r936);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r934.fieldDescriptions[j_r936], " ");
} }
var _c35 = function (a0) { return [a0, "key"]; };
var _c36 = function (a0) { return [a0, "value"]; };
function EditImportModelComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    var _r938 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](1, _c25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", _c26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", _c27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-form-field", _c28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", _c29, _c30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, EditImportModelComponent_div_42_mat_error_7_Template, 2, 0, "mat-error", _c7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", _c27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-form-field", _c31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", _c32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, EditImportModelComponent_div_42_mat_error_11_Template, 2, 0, "mat-error", _c7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", _c27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-form-field", _c33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-select", _c34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectionChange", function EditImportModelComponent_div_42_Template_mat_select_selectionChange_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r938); var i_r930 = ctx.index; var ctx_r937 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r937.fieldTypeChanged($event, ctx_r937.map.get([i_r930, "fieldType"])); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function EditImportModelComponent_div_42_Template_mat_select_keydown_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r938); var i_r930 = ctx.index; var ctx_r939 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r939.tabAdd($event, i_r930); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, EditImportModelComponent_div_42_mat_option_15_Template, 2, 2, "mat-option", _c12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var i_r930 = ctx.index;
    var ctx_r926 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroupName", i_r930);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hideRequiredMarker", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r926.map.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c35, i_r930)).hasError);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hideRequiredMarker", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r926.map.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](8, _c36, i_r930)).hasError);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r926.fieldDescriptions);
} }
var _c37 = ["..", "client-information"];
var EditImportModelComponent = /** @class */ (function () {
    function EditImportModelComponent(fb, ref, data, session, service, bs) {
        var _this = this;
        this.fb = fb;
        this.ref = ref;
        this.data = data;
        this.session = session;
        this.service = service;
        this.bs = bs;
        this.form = this.createForm();
        this.tabAdded = false;
        this.fieldTypes = Object.keys(_app_models__WEBPACK_IMPORTED_MODULE_1__["DailySaleMapType"]);
        this.fieldDescriptions = _app_models__WEBPACK_IMPORTED_MODULE_1__["DailySaleFields"];
        this.onNoClick = function () { return _this.ref.close(); };
        this.closeAndSaveModel = function () { return _this.ref.close(_this.prepareModel()); };
        this.model = this.data.importModel;
    }
    Object.defineProperty(EditImportModelComponent.prototype, "map", {
        get: function () {
            return this.form.get('map');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditImportModelComponent.prototype, "matchByAgentCode", {
        get: function () {
            return this.form.value.matchByAgentCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditImportModelComponent.prototype, "splitCustomerName", {
        get: function () {
            return this.form.value.splitCustomerName;
        },
        enumerable: true,
        configurable: true
    });
    EditImportModelComponent.prototype.ngOnInit = function () {
        this.user = this.session.lastUser;
        this.campaigns = this.service.campaigns;
        if (this.model) {
            this.patchForm();
        }
        else {
            this.addMapRow();
        }
    };
    EditImportModelComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.keys.changes
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["startWith"])([]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["delay"])(0))
            .subscribe(function (rows) {
            if (rows.length && !_this.tabAdded) {
                rows.last.nativeElement.focus();
            }
            else {
                _this.tabAdded = false;
            }
        });
    };
    EditImportModelComponent.prototype.setMatchByAgentCode = function (event) {
        this.form.setValue({ matchByAgentCode: event.checked });
    };
    EditImportModelComponent.prototype.setSplitCustomerName = function (event) {
        this.form.setValue({ splitCustomerName: event.checked });
    };
    EditImportModelComponent.prototype.addMapRow = function () {
        this.map.push(this.fb.group({
            key: this.fb.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            value: this.fb.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            fieldType: this.fb.control('')
        }));
    };
    EditImportModelComponent.prototype.saveImportModel = function () {
        var _this = this;
        if (this.form.invalid)
            return;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["forkJoin"])(this.checkMatchByCode(), this.checkForMissingSalesFields()).subscribe(function (results) {
            var missingFields = results[1];
            // TODO: need to handle missing fields communication
        });
        if (!this.form.value.matchByAgentCode) {
            this.bs.open(_app_imports_bottom_sheets_confirm_agent_code_component__WEBPACK_IMPORTED_MODULE_9__["ConfirmAgentBottomSheetComponent"])
                .afterDismissed()
                .subscribe(function (result) {
                if (!result) {
                    _this.closeAndSaveModel();
                }
                else {
                    _this.form.patchValue({ matchByAgentCode: true }, { emitEvent: false });
                    _this.closeAndSaveModel();
                }
            });
        }
        else {
            this.closeAndSaveModel();
        }
    };
    EditImportModelComponent.prototype.checkMatchByCode = function () {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_8__["Observable"].create(function (ob) {
            if (!_this.form.value.matchByAgentCode) {
                _this.bs.open(_app_imports_bottom_sheets_confirm_agent_code_component__WEBPACK_IMPORTED_MODULE_9__["ConfirmAgentBottomSheetComponent"])
                    .afterDismissed()
                    .subscribe(function (result) {
                    if (!result) {
                        ob.complete();
                    }
                    else {
                        _this.form.patchValue({ matchByAgentCode: true }, { emitEvent: false });
                        ob.complete();
                    }
                });
            }
            else {
                ob.complete();
            }
        });
    };
    EditImportModelComponent.prototype.checkForMissingSalesFields = function () {
        return rxjs__WEBPACK_IMPORTED_MODULE_8__["Observable"].create(function (ob) {
            /** TODO: NEED TO RETURN A LIST OF THE FIELDS USER DIDN'T FINISH */
        });
    };
    EditImportModelComponent.prototype.tabAdd = function (event, index) {
        if (event.keyCode == 9 && index == (this.map.length - 1)) {
            this.tabAdded = true;
            this.addMapRow();
        }
    };
    EditImportModelComponent.prototype.fieldTypeChanged = function (event, fieldType) {
        console.dir([event, fieldType]);
    };
    EditImportModelComponent.prototype.prepareModel = function () {
        var importModelId = this.model ? this.model.importModelId : null;
        return {
            importModelId: importModelId,
            userId: this.user.id,
            clientId: this.user.selectedClient.clientId,
            campaignId: this.form.value.campaignId,
            shortDesc: this.form.value.shortDesc,
            fullDesc: this.form.value.fullDesc,
            map: this.map.value,
            matchByAgentCode: this.form.value.matchByAgentCode,
            splitCustomerName: this.form.value.splitCustomerName,
        };
    };
    EditImportModelComponent.prototype.createForm = function () {
        return this.fb.group({
            shortDesc: this.fb.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            fullDesc: this.fb.control(''),
            campaignId: this.fb.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            map: this.fb.array([]),
            matchByAgentCode: this.fb.control(''),
            splitCustomerName: this.fb.control(''),
        });
    };
    EditImportModelComponent.prototype.patchForm = function () {
        var _this = this;
        var map = JSON.parse(this.model.map);
        if (map && map.length > this.map.length) {
            map.forEach(function (m, i, a) {
                _this.map.push(_this.fb.group({
                    key: m.key,
                    value: m.value,
                    fieldType: m.fieldType,
                }));
            });
            this.form.setValue({
                shortDesc: this.model.shortDesc,
                fullDesc: this.model.fullDesc,
                campaignId: this.model.campaignId,
                matchByAgentCode: this.model.matchByAgentCode,
                splitCustomerName: this.model.splitCustomerName,
                map: this.map,
            });
        }
        else {
            this.form.setValue({
                shortDesc: this.model.shortDesc,
                fullDesc: this.model.fullDesc,
                campaignId: this.model.campaignId,
                matchByAgentCode: this.model.matchByAgentCode,
                splitCustomerName: this.model.splitCustomerName,
            });
        }
    };
    EditImportModelComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EditImportModelComponent, selectors: [["vs-edit-import-model"]], factory: function EditImportModelComponent_Factory(t) { return new (t || EditImportModelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_session_service__WEBPACK_IMPORTED_MODULE_5__["SessionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_imports_imports_service__WEBPACK_IMPORTED_MODULE_6__["ImportsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_3__["MatBottomSheet"])); }, viewQuery: function EditImportModelComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        } if (rf & 2) {
            var _t;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"]((_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadViewQuery"]())) && (ctx.keys = _t);
        } }, consts: 57, vars: 12, template: function EditImportModelComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Import Model");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", _c2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditImportModelComponent_Template_button_click_3_listener($event) { return ctx.onNoClick(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "clear");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-dialog-content", _c3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "form", _c4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-form-field", _c5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", _c6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, EditImportModelComponent_mat_error_11_Template, 2, 0, "mat-error", _c7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-form-field", _c8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "textarea", _c9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "                ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-form-field", _c10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-select", _c11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, EditImportModelComponent_mat_option_19_Template, 2, 2, "mat-option", _c12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](20, "async");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, EditImportModelComponent_mat_error_21_Template, 2, 0, "mat-error", _c7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "mat-checkbox", _c13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function EditImportModelComponent_Template_mat_checkbox_change_23_listener($event) { return ctx.setMatchByAgentCode($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Match agents on report by Sales Code");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-checkbox", _c13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function EditImportModelComponent_Template_mat_checkbox_change_26_listener($event) { return ctx.setSplitCustomerName($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Report uses one field for Customer Name");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", _c14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " Please add all columns from your report. The column header needs to match exactly to the column headers on your XSL file. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p", _c15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Column Header - must match exactly with the report column header. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " Description - used for your reference when working with the Import Model. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "p", _c15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " Please make sure that your sales statuses on your import match your ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", _c16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditImportModelComponent_Template_a_click_37_listener($event) { return ctx.onNoClick(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Sale Status Configuration");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " statuses. If they do not, we will be unable to properly set the \"Paid Status\" for your sales and they will default to \"Unpaid\". ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "mat-divider", _c17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", _c18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, EditImportModelComponent_div_42_Template, 16, 10, "div", _c19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", _c20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "button", _c21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditImportModelComponent_Template_button_click_44_listener($event) { return ctx.addMapRow(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "mat-icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "add");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, " Add Column ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "mat-dialog-actions", _c22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "button", _c23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditImportModelComponent_Template_button_click_49_listener($event) { return ctx.onNoClick(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "mat-icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "clear");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, " Cancel ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "button", _c21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditImportModelComponent_Template_button_click_53_listener($event) { return ctx.saveImportModel(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "mat-icon");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "save");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, " Save ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hideRequiredMarker", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.get("shortDesc").hasError);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hideRequiredMarker", true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](20, 10, ctx.campaigns));
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.get("campaignId").hasError);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx.matchByAgentCode);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx.splitCustomerName);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](37);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _c37);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](42);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.map.controls);
        } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogTitle"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIcon"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_z"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["RequiredValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelect"], _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgForOf"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_16__["MatCheckbox"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterLinkWithHref"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_18__["MatDivider"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormArrayName"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogActions"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatError"], _angular_material_core__WEBPACK_IMPORTED_MODULE_19__["MatOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupName"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_14__["AsyncPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ltcG9ydHMvZGlhbG9ncy9lZGl0LWltcG9ydC1tb2RlbC9lZGl0LWltcG9ydC1tb2RlbC5jb21wb25lbnQuc2NzcyJ9 */"] });
    return EditImportModelComponent;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EditImportModelComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'vs-edit-import-model',
                templateUrl: './edit-import-model.component.html',
                styleUrls: ['./edit-import-model.component.scss']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"]]
            }] }, { type: _app_session_service__WEBPACK_IMPORTED_MODULE_5__["SessionService"] }, { type: _app_imports_imports_service__WEBPACK_IMPORTED_MODULE_6__["ImportsService"] }, { type: _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_3__["MatBottomSheet"] }]; }, { keys: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"],
            args: ['keyInputs']
        }] });


/***/ }),

/***/ "./src/app/imports/import-model-selection/import-model-selection.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/imports/import-model-selection/import-model-selection.component.ts ***!
  \************************************************************************************/
/*! exports provided: ImportModelSelectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportModelSelectionComponent", function() { return ImportModelSelectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _imports_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../imports.service */ "./src/app/imports/imports.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/radio.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/select.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/core.es5.js");









var _c0 = ["class", "shadow-none p-3 pb-0 rounded", 4, "ngIf", "ngIfElse"];
var _c1 = ["showDropdown", ""];
var _c2 = [1, "shadow-none", "p-3", "pb-0", "rounded"];
var _c3 = ["aria-label", "Select an import model", 1, "select-import-model", 3, "change"];
var _c4 = [3, "value", 4, "ngFor", "ngForOf"];
var _c5 = [3, "value"];
function ImportModelSelectionComponent_div_0_mat_radio_button_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-radio-button", _c5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var m_r997 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", m_r997);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", m_r997.shortDesc, " ");
} }
function ImportModelSelectionComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    var _r1000 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Choose Import Model:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-radio-group", _c3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ImportModelSelectionComponent_div_0_Template_mat_radio_group_change_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1000); var ctx_r999 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r999.radioChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ImportModelSelectionComponent_div_0_mat_radio_button_4_Template, 2, 2, "mat-radio-button", _c4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r993 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 1, ctx_r993.models));
} }
var _c6 = [3, "selectionChange"];
function ImportModelSelectionComponent_ng_template_2_mat_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", _c5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var m_r1002 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", m_r1002);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", m_r1002.shortDesc, " ");
} }
function ImportModelSelectionComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    var _r1005 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Choose Import Model:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Import Model");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-select", _c6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectionChange", function ImportModelSelectionComponent_ng_template_2_Template_mat_select_selectionChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1005); var ctx_r1004 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1004.changeHandler($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ImportModelSelectionComponent_ng_template_2_mat_option_7_Template, 2, 2, "mat-option", _c4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r995 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](8, 1, ctx_r995.models));
} }
var ImportModelSelectionComponent = /** @class */ (function () {
    function ImportModelSelectionComponent(service) {
        this.service = service;
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ImportModelSelectionComponent.prototype.ngOnInit = function () {
        this.models = this.service.getImportModels();
    };
    ImportModelSelectionComponent.prototype.ngOnDestroy = function () {
    };
    ImportModelSelectionComponent.prototype.changeHandler = function (event) {
        this.change.emit(event.value);
    };
    ImportModelSelectionComponent.prototype.radioChange = function (event) {
        this.change.emit(event.value);
    };
    ImportModelSelectionComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ImportModelSelectionComponent, selectors: [["vs-import-model-selection"]], factory: function ImportModelSelectionComponent_Factory(t) { return new (t || ImportModelSelectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_imports_service__WEBPACK_IMPORTED_MODULE_1__["ImportsService"])); }, outputs: { change: "change" }, consts: 4, vars: 4, template: function ImportModelSelectionComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ImportModelSelectionComponent_div_0_Template, 6, 3, "div", _c0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ImportModelSelectionComponent_ng_template_2_Template, 9, 3, "ng-template", null, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        } if (rf & 2) {
            var _r994 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
            var tmp_0_0 = null;
            var currVal_0 = ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 2, ctx.models)) == null ? null : tmp_0_0.length) <= 4;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", currVal_0)("ngIfElse", _r994);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_3__["MatRadioGroup"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_3__["MatRadioButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelect"], _angular_material_core__WEBPACK_IMPORTED_MODULE_6__["MatOption"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"]], styles: [".select-import-model[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin: 15px; }\n  .select-import-model[_ngcontent-%COMP%]   mat-radio-button[_ngcontent-%COMP%] {\n    margin: 5px; }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcmV3cGF5bWVudC9kZXYvYWN0aXZlL3Zlcm9zdGFjay9yZXNvdXJjZXMvYXNzZXRzL25nL3NyYy9hcHAvaW1wb3J0cy9pbXBvcnQtbW9kZWwtc2VsZWN0aW9uL2ltcG9ydC1tb2RlbC1zZWxlY3Rpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFlBQVksRUFBQTtFQUhoQjtJQU1RLFdBQVcsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2ltcG9ydHMvaW1wb3J0LW1vZGVsLXNlbGVjdGlvbi9pbXBvcnQtbW9kZWwtc2VsZWN0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlbGVjdC1pbXBvcnQtbW9kZWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBtYXJnaW46IDE1cHg7XG5cbiAgICBtYXQtcmFkaW8tYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luOiA1cHg7XG4gICAgfVxufSJdfQ== */"] });
    return ImportModelSelectionComponent;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ImportModelSelectionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'vs-import-model-selection',
                templateUrl: './import-model-selection.component.html',
                styleUrls: ['./import-model-selection.component.scss']
            }]
    }], function () { return [{ type: _imports_service__WEBPACK_IMPORTED_MODULE_1__["ImportsService"] }]; }, { change: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] });


/***/ }),

/***/ "./src/app/imports/import-models/import-models.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/imports/import-models/import-models.component.ts ***!
  \******************************************************************/
/*! exports provided: ImportModelsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportModelsComponent", function() { return ImportModelsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/dialog.es5.js");
/* harmony import */ var _imports_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../imports.service */ "./src/app/imports/imports.service.ts");
/* harmony import */ var _app_session_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/session.service */ "./src/app/session.service.ts");
/* harmony import */ var _dialogs_edit_import_model_edit_import_model_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dialogs/edit-import-model/edit-import-model.component */ "./src/app/imports/dialogs/edit-import-model/edit-import-model.component.ts");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/card.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/table.es5.js");
/* harmony import */ var _app_fab_float_btn_fab_float_btn_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/fab-float-btn/fab-float-btn.component */ "./src/app/fab-float-btn/fab-float-btn.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/button.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/icon.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/checkbox.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");

















var _c0 = [1, "container"];
var _c1 = [1, "row"];
var _c2 = [1, "col-md-12"];
var _c3 = [1, "page-header-accent"];
var _c4 = ["mat-card-title", ""];
var _c5 = [3, "dataSource"];
var _c6 = ["matColumnDef", "detailView"];
var _c7 = [4, "matHeaderCellDef"];
var _c8 = [4, "matCellDef"];
var _c9 = ["matColumnDef", "isActive"];
var _c10 = ["class", "d-flex justify-content-center", 4, "matHeaderCellDef"];
var _c11 = ["class", "d-flex justify-content-center", 4, "matCellDef"];
var _c12 = ["matColumnDef", "shortDesc"];
var _c13 = ["matColumnDef", "modifiedBy"];
var _c14 = ["matColumnDef", "createdAt"];
var _c15 = ["matColumnDef", "updatedAt"];
var _c16 = [4, "matHeaderRowDef"];
var _c17 = [4, "matRowDef", "matRowDefColumns"];
var _c18 = ["mat-icon", "add", "color", "accent", 3, "isOpen", "callback"];
function ImportModelsComponent_mat_header_cell_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var _c19 = ["type", "button", "mat-icon-button", "", 1, "text-muted", 3, "click"];
function ImportModelsComponent_mat_cell_13_Template(rf, ctx) { if (rf & 1) {
    var _r956 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", _c19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ImportModelsComponent_mat_cell_13_Template_button_click_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r956); var item_r954 = ctx.$implicit; var ctx_r955 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r955.editImportModel(item_r954); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "remove_red_eye");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var _c20 = [1, "d-flex", "justify-content-center"];
function ImportModelsComponent_mat_header_cell_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell", _c20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Active");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var _c21 = [3, "checked", "change"];
function ImportModelsComponent_mat_cell_16_Template(rf, ctx) { if (rf & 1) {
    var _r959 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell", _c20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-checkbox", _c21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ImportModelsComponent_mat_cell_16_Template_mat_checkbox_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r959); var ctx_r958 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r958.changeActiveStatus($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var item_r957 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", item_r957.deletedAt == null);
} }
function ImportModelsComponent_mat_header_cell_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ImportModelsComponent_mat_cell_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var item_r960 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r960.shortDesc);
} }
function ImportModelsComponent_mat_header_cell_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Owner");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ImportModelsComponent_mat_cell_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var item_r961 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", item_r961.user == null ? null : item_r961.user.firstName, " ", item_r961.user == null ? null : item_r961.user.lastName, "");
} }
function ImportModelsComponent_mat_header_cell_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Created");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ImportModelsComponent_mat_cell_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var item_r962 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, item_r962.createdAt, "shortDate"));
} }
function ImportModelsComponent_mat_header_cell_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Modified Last");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ImportModelsComponent_mat_cell_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var item_r963 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, item_r963.updatedAt, "shortDate"));
} }
function ImportModelsComponent_mat_header_row_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-header-row");
} }
function ImportModelsComponent_mat_row_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-row");
} }
var _c22 = ["detailView", "isActive", "shortDesc", "modifiedBy", "createdAt", "updatedAt"];
var ImportModelsComponent = /** @class */ (function () {
    function ImportModelsComponent(service, dialog, session) {
        this.service = service;
        this.dialog = dialog;
        this.session = session;
        this.importModels = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.isFabOpen$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
    }
    ImportModelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getImportModels().subscribe(function (models) {
            _this.importModels.next(models);
        });
        this.service.fetchCampaigns();
    };
    ImportModelsComponent.prototype.addImportModel = function () {
        var _this = this;
        this.isFabOpen$.next(true);
        this.dialog.open(_dialogs_edit_import_model_edit_import_model_component__WEBPACK_IMPORTED_MODULE_5__["EditImportModelComponent"], {
            data: {
            // user: this.user,
            },
            width: '50vw',
            autoFocus: false,
        })
            .afterClosed()
            .subscribe(function (model) {
            _this.isFabOpen$.next(false);
            if (!model)
                return;
            _this.session.showLoader();
            _this.service.saveImportModel(model).subscribe(function (res) {
                _this.session.hideLoader();
                var models = _this.importModels.value;
                models.push(res);
                _this.importModels.next(models);
            });
        });
    };
    ImportModelsComponent.prototype.editImportModel = function (model) {
        var _this = this;
        this.isFabOpen$.next(true);
        this.dialog.open(_dialogs_edit_import_model_edit_import_model_component__WEBPACK_IMPORTED_MODULE_5__["EditImportModelComponent"], {
            data: {
                importModel: model,
            },
            width: '50vw',
            autoFocus: false,
        })
            .afterClosed()
            .subscribe(function (model) {
            _this.isFabOpen$.next(false);
            if (!model)
                return;
            console.dir(model);
            _this.session.showLoader();
            _this.service.saveImportModel(model).subscribe(function (res) {
                _this.session.hideLoader();
                var models = _this.importModels.value;
                models.forEach(function (m, i, a) {
                    if (m.importModelId == res.importModelId) {
                        a[i] = res;
                    }
                });
                _this.importModels.next(models);
            });
        });
    };
    ImportModelsComponent.prototype.changeActiveStatus = function (event) {
        console.dir(event);
    };
    ImportModelsComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ImportModelsComponent, selectors: [["vs-import-models"]], factory: function ImportModelsComponent_Factory(t) { return new (t || ImportModelsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_imports_service__WEBPACK_IMPORTED_MODULE_3__["ImportsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_session_service__WEBPACK_IMPORTED_MODULE_4__["SessionService"])); }, consts: 32, vars: 4, template: function ImportModelsComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", _c1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", _c2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card", _c3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3", _c4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Import Models");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-card-content");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Create an Import Model to map the fields from a sales reporting spreadsheet or CSV to a sale in the commission system. In order to do so, add fields and type the exact column header description and then select from the paired dropdown to match it to the corresponding sale field in the commission system. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", _c1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", _c2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-table", _c5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](11, _c6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ImportModelsComponent_mat_header_cell_12_Template, 2, 0, "mat-header-cell", _c7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ImportModelsComponent_mat_cell_13_Template, 4, 0, "mat-cell", _c8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](14, _c9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, ImportModelsComponent_mat_header_cell_15_Template, 2, 0, "mat-header-cell", _c10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ImportModelsComponent_mat_cell_16_Template, 2, 1, "mat-cell", _c11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](17, _c12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, ImportModelsComponent_mat_header_cell_18_Template, 2, 0, "mat-header-cell", _c7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, ImportModelsComponent_mat_cell_19_Template, 2, 1, "mat-cell", _c8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](20, _c13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, ImportModelsComponent_mat_header_cell_21_Template, 2, 0, "mat-header-cell", _c7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, ImportModelsComponent_mat_cell_22_Template, 2, 2, "mat-cell", _c8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](23, _c14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, ImportModelsComponent_mat_header_cell_24_Template, 2, 0, "mat-header-cell", _c7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, ImportModelsComponent_mat_cell_25_Template, 3, 4, "mat-cell", _c8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](26, _c15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, ImportModelsComponent_mat_header_cell_27_Template, 2, 0, "mat-header-cell", _c7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, ImportModelsComponent_mat_cell_28_Template, 3, 4, "mat-cell", _c8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, ImportModelsComponent_mat_header_row_29_Template, 1, 0, "mat-header-row", _c16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, ImportModelsComponent_mat_row_30_Template, 1, 0, "mat-row", _c17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "vs-float-button", _c18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("callback", function ImportModelsComponent_Template_vs_float_button_callback_31_listener($event) { return ctx.addImportModel(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.importModels);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", _c22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", _c22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isOpen", ctx.isFabOpen$);
        } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardContent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatRowDef"], _app_fab_float_btn_fab_float_btn_component__WEBPACK_IMPORTED_MODULE_8__["FabFloatBtnComponent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatCell"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MatCheckbox"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatRow"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_12__["DatePipe"]], styles: ["mat-header-row[_ngcontent-%COMP%] {\n  background-color: #3f51b5; }\n  mat-header-row[_ngcontent-%COMP%]   mat-header-cell[_ngcontent-%COMP%] {\n    vertical-align: middle;\n    font-size: 1.1rem;\n    color: #f1f1f1;\n    text-transform: uppercase;\n    letter-spacing: 0.1rem;\n    font-weight: 400; }\n  mat-header-row[_ngcontent-%COMP%]   mat-header-cell[_ngcontent-%COMP%]     .mat-checkbox .mat-checkbox-frame {\n      border-color: #ffffff; }\n  mat-header-cell.check-column[_ngcontent-%COMP%], mat-cell.check-column[_ngcontent-%COMP%] {\n  flex: 0 0 70px; }\n  mat-checkbox[_ngcontent-%COMP%] {\n  height: 1rem !important; }\n  .mat-column-detailView[_ngcontent-%COMP%] {\n  max-width: 65px; }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcmV3cGF5bWVudC9kZXYvYWN0aXZlL3Zlcm9zdGFjay9yZXNvdXJjZXMvYXNzZXRzL25nL3NyYy9hcHAvaW1wb3J0cy9pbXBvcnQtbW9kZWxzL2ltcG9ydC1tb2RlbHMuY29tcG9uZW50LnNjc3MiLCIvVXNlcnMvZHJld3BheW1lbnQvZGV2L2FjdGl2ZS92ZXJvc3RhY2svcmVzb3VyY2VzL2Fzc2V0cy9uZy9zcmMvc2Nzcy9fY29sb3JzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDQyx5QkNvRHVCLEVBQUE7RURyRHhCO0lBSUUsc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQixjQ1BpQjtJRFFqQix5QkFBeUI7SUFDekIsc0JBQXNCO0lBQ3RCLGdCQUFnQixFQUFBO0VBVGxCO01BWUcscUJDZGUsRUFBQTtFRG1CbEI7RUFHRSxjQUFjLEVBQUE7RUFJaEI7RUFDQyx1QkFBdUIsRUFBQTtFQUd4QjtFQUNDLGVBQWUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2ltcG9ydHMvaW1wb3J0LW1vZGVscy9pbXBvcnQtbW9kZWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vLi4vLi4vc2Nzcy9jb2xvcnMnO1xuXG5tYXQtaGVhZGVyLXJvdyB7XG5cdGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5LWZpbHRlcjtcblxuXHRtYXQtaGVhZGVyLWNlbGwge1xuXHRcdHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG5cdFx0Zm9udC1zaXplOiAxLjFyZW07XG5cdFx0Y29sb3I6ICRvZmYtd2hpdGU7XG5cdFx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcblx0XHRsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA0MDA7XG5cblx0XHQ6Om5nLWRlZXAgLm1hdC1jaGVja2JveCAubWF0LWNoZWNrYm94LWZyYW1lIHtcblx0XHRcdGJvcmRlci1jb2xvcjogJHdoaXRlO1xuXHRcdH1cblx0fVxufVxuXG5tYXQtaGVhZGVyLWNlbGwsIG1hdC1jZWxsIHtcblx0XG5cdCYuY2hlY2stY29sdW1uIHtcblx0XHRmbGV4OiAwIDAgNzBweDtcblx0fVxufVxuXG5tYXQtY2hlY2tib3gge1xuXHRoZWlnaHQ6IDFyZW0gIWltcG9ydGFudDtcbn1cblxuLm1hdC1jb2x1bW4tZGV0YWlsVmlldyB7XG5cdG1heC13aWR0aDogNjVweDtcbn0iLCIkd2hpdGU6ICAgICNmZmZmZmYgIWRlZmF1bHQ7XG4kb2ZmLXdoaXRlOiAjZjFmMWYxICFkZWZhdWx0O1xuJGdyYXktMTAwOiAjZjhmOWZhICFkZWZhdWx0O1xuJGdyYXktMjAwOiAjZTllY2VmICFkZWZhdWx0O1xuJGdyYXktMzAwOiAjZGVlMmU2ICFkZWZhdWx0O1xuJGdyYXktNDAwOiAjY2VkNGRhICFkZWZhdWx0O1xuJGdyYXktNTAwOiAjYWRiNWJkICFkZWZhdWx0O1xuJGdyYXktNjAwOiAjNmM3NTdkICFkZWZhdWx0O1xuJGdyYXktNzAwOiAjNDk1MDU3ICFkZWZhdWx0O1xuJGdyYXktODAwOiAjMzQzYTQwICFkZWZhdWx0O1xuJGdyYXktOTAwOiAjMjEyNTI5ICFkZWZhdWx0O1xuJGJsYWNrOiAgICAjMDAwICFkZWZhdWx0O1xuJGJnLWRhcms6ICMzNDNhNDAgIWRlZmF1bHQ7XG5cbiRncmF5czogKCkgIWRlZmF1bHQ7XG4kZ3JheXM6IG1hcC1tZXJnZSgoXG4gIFwiMTAwXCI6ICRncmF5LTEwMCxcbiAgXCIyMDBcIjogJGdyYXktMjAwLFxuICBcIjMwMFwiOiAkZ3JheS0zMDAsXG4gIFwiNDAwXCI6ICRncmF5LTQwMCxcbiAgXCI1MDBcIjogJGdyYXktNTAwLFxuICBcIjYwMFwiOiAkZ3JheS02MDAsXG4gIFwiNzAwXCI6ICRncmF5LTcwMCxcbiAgXCI4MDBcIjogJGdyYXktODAwLFxuICBcIjkwMFwiOiAkZ3JheS05MDBcbiksICRncmF5cyk7XG5cbiRibHVlOiAgICAjMDA3YmZmICFkZWZhdWx0O1xuJGluZGlnbzogICM2NjEwZjIgIWRlZmF1bHQ7XG4kcHVycGxlOiAgIzZmNDJjMSAhZGVmYXVsdDtcbiRwaW5rOiAgICAjZTgzZThjICFkZWZhdWx0O1xuJHJlZDogICAgICNkYzM1NDUgIWRlZmF1bHQ7XG4kb3JhbmdlOiAgI2ZkN2UxNCAhZGVmYXVsdDtcbiR5ZWxsb3c6ICAjZmZjMTA3ICFkZWZhdWx0O1xuJGdyZWVuOiAgICMyOGE3NDUgIWRlZmF1bHQ7XG4kdGVhbDogICAgIzIwYzk5NyAhZGVmYXVsdDtcbiRjeWFuOiAgICAjMTdhMmI4ICFkZWZhdWx0O1xuXG4kY29sb3JzOiAoKSAhZGVmYXVsdDtcbiRjb2xvcnM6IG1hcC1tZXJnZSgoXG4gIFwiYmx1ZVwiOiAgICAgICAkYmx1ZSxcbiAgXCJpbmRpZ29cIjogICAgICRpbmRpZ28sXG4gIFwicHVycGxlXCI6ICAgICAkcHVycGxlLFxuICBcInBpbmtcIjogICAgICAgJHBpbmssXG4gIFwicmVkXCI6ICAgICAgICAkcmVkLFxuICBcIm9yYW5nZVwiOiAgICAgJG9yYW5nZSxcbiAgXCJ5ZWxsb3dcIjogICAgICR5ZWxsb3csXG4gIFwiZ3JlZW5cIjogICAgICAkZ3JlZW4sXG4gIFwidGVhbFwiOiAgICAgICAkdGVhbCxcbiAgXCJjeWFuXCI6ICAgICAgICRjeWFuLFxuICBcIndoaXRlXCI6ICAgICAgJHdoaXRlLFxuICBcImdyYXlcIjogICAgICAgJGdyYXktNjAwLFxuICBcImdyYXktZGFya1wiOiAgJGdyYXktODAwXG4pLCAkY29sb3JzKTtcblxuJHByaW1hcnktZmlsdGVyOiAjM2Y1MWI1ICFkZWZhdWx0O1xuJHByaW1hcnktZmlsdGVyLWxpZ2h0OiAjYTNiMWZmICFkZWZhdWx0O1xuJHZzLWluZm86ICM1MzZkZmUgIWRlZmF1bHQ7XG4kYmctbXV0ZWQ6ICRncmF5LTYwMCAhZGVmYXVsdDtcbiRtYXQtYWNjZW50OiAjZmY5ODAwICFkZWZhdWx0O1xuJG1hdC1wcmltYXJ5OiAjM2Y1MWI1ICFkZWZhdWx0O1xuJGNoYXJjb2FsOiAkZ3JheS03MDAgIWRlZmF1bHQ7XG4kYm9keS10ZXh0OiAkZ3JheS05MDAgIWRlZmF1bHQ7XG5cbiRwcmltYXJ5OiAgICAgICAkYmx1ZSAhZGVmYXVsdDtcbiRzZWNvbmRhcnk6ICAgICAkZ3JheS02MDAgIWRlZmF1bHQ7XG4kc3VjY2VzczogICAgICAgJGdyZWVuICFkZWZhdWx0O1xuJGluZm86ICAgICAgICAgICR2cy1pbmZvICFkZWZhdWx0O1xuJHdhcm5pbmc6ICAgICAgICR5ZWxsb3cgIWRlZmF1bHQ7XG4kZGFuZ2VyOiAgICAgICAgJHJlZCAhZGVmYXVsdDtcbiRsaWdodDogICAgICAgICAkZ3JheS0xMDAgIWRlZmF1bHQ7XG4kZGFyazogICAgICAgICAgJGdyYXktODAwICFkZWZhdWx0OyJdfQ== */"] });
    return ImportModelsComponent;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ImportModelsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'vs-import-models',
                templateUrl: './import-models.component.html',
                styleUrls: ['./import-models.component.scss']
            }]
    }], function () { return [{ type: _imports_service__WEBPACK_IMPORTED_MODULE_3__["ImportsService"] }, { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }, { type: _app_session_service__WEBPACK_IMPORTED_MODULE_4__["SessionService"] }]; }, null);


/***/ }),

/***/ "./src/app/imports/imports.module.ts":
/*!*******************************************!*\
  !*** ./src/app/imports/imports.module.ts ***!
  \*******************************************/
/*! exports provided: ImportsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportsModule", function() { return ImportsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _app_material_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/pipes/pipes.module */ "./src/app/pipes/pipes.module.ts");
/* harmony import */ var _app_fab_float_btn_fab_float_btn_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/fab-float-btn/fab-float-btn.module */ "./src/app/fab-float-btn/fab-float-btn.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _import_models_import_models_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./import-models/import-models.component */ "./src/app/imports/import-models/import-models.component.ts");
/* harmony import */ var _app_auth_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _dialogs_edit_import_model_edit_import_model_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dialogs/edit-import-model/edit-import-model.component */ "./src/app/imports/dialogs/edit-import-model/edit-import-model.component.ts");
/* harmony import */ var _app_spreadsheet_spreadsheet_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @app/spreadsheet/spreadsheet.module */ "./src/app/spreadsheet/spreadsheet.module.ts");
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/bottom-sheet */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/bottom-sheet.es5.js");
/* harmony import */ var _bottom_sheets_confirm_agent_code_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./bottom-sheets/confirm-agent-code.component */ "./src/app/imports/bottom-sheets/confirm-agent-code.component.ts");
/* harmony import */ var _process_process_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./process/process.component */ "./src/app/imports/process/process.component.ts");
/* harmony import */ var _past_imports_past_imports_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./past-imports/past-imports.component */ "./src/app/imports/past-imports/past-imports.component.ts");
/* harmony import */ var _import_model_selection_import_model_selection_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./import-model-selection/import-model-selection.component */ "./src/app/imports/import-model-selection/import-model-selection.component.ts");
/* harmony import */ var _widgets_campaigns_selection_campaigns_selection_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./widgets/campaigns-selection/campaigns-selection.component */ "./src/app/imports/widgets/campaigns-selection/campaigns-selection.component.ts");
/* harmony import */ var ad_file_upload__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ad-file-upload */ "./node_modules/ad-file-upload/__ivy_ngcc__/fesm5/ad-file-upload.js");




















var routes = [
    { path: '', redirectTo: 'models', pathMatch: 'full' },
    { path: 'process', component: _process_process_component__WEBPACK_IMPORTED_MODULE_13__["ProcessComponent"], canActivate: [_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
    { path: 'models', component: _import_models_import_models_component__WEBPACK_IMPORTED_MODULE_7__["ImportModelsComponent"], canActivate: [_app_auth_guard__WEBPACK_IMPORTED_MODULE_8__["AuthGuard"]] },
];
var ImportsModule = /** @class */ (function () {
    function ImportsModule() {
    }
    ImportsModule.ngModuleDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ImportsModule });
    ImportsModule.ngInjectorDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ImportsModule_Factory(t) { return new (t || ImportsModule)(); }, providers: [
            { provide: _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__["MAT_BOTTOM_SHEET_DEFAULT_OPTIONS"], useValue: { hasBackdrop: false } },
        ], imports: [[
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _app_material_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                _app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_4__["PipesModule"],
                _app_fab_float_btn_fab_float_btn_module__WEBPACK_IMPORTED_MODULE_5__["FabFloatBtnModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _app_spreadsheet_spreadsheet_module__WEBPACK_IMPORTED_MODULE_10__["SpreadsheetModule"],
                ad_file_upload__WEBPACK_IMPORTED_MODULE_17__["AdFileUploadModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
            ]] });
    return ImportsModule;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ImportsModule, { declarations: [_import_models_import_models_component__WEBPACK_IMPORTED_MODULE_7__["ImportModelsComponent"],
        _dialogs_edit_import_model_edit_import_model_component__WEBPACK_IMPORTED_MODULE_9__["EditImportModelComponent"],
        _bottom_sheets_confirm_agent_code_component__WEBPACK_IMPORTED_MODULE_12__["ConfirmAgentBottomSheetComponent"],
        _process_process_component__WEBPACK_IMPORTED_MODULE_13__["ProcessComponent"],
        _past_imports_past_imports_component__WEBPACK_IMPORTED_MODULE_14__["PastImportsComponent"],
        _import_model_selection_import_model_selection_component__WEBPACK_IMPORTED_MODULE_15__["ImportModelSelectionComponent"],
        _widgets_campaigns_selection_campaigns_selection_component__WEBPACK_IMPORTED_MODULE_16__["CampaignsSelectionComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _app_material_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
        _app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_4__["PipesModule"],
        _app_fab_float_btn_fab_float_btn_module__WEBPACK_IMPORTED_MODULE_5__["FabFloatBtnModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _app_spreadsheet_spreadsheet_module__WEBPACK_IMPORTED_MODULE_10__["SpreadsheetModule"],
        ad_file_upload__WEBPACK_IMPORTED_MODULE_17__["AdFileUploadModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] });
/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ImportsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _import_models_import_models_component__WEBPACK_IMPORTED_MODULE_7__["ImportModelsComponent"],
                    _dialogs_edit_import_model_edit_import_model_component__WEBPACK_IMPORTED_MODULE_9__["EditImportModelComponent"],
                    _bottom_sheets_confirm_agent_code_component__WEBPACK_IMPORTED_MODULE_12__["ConfirmAgentBottomSheetComponent"],
                    _process_process_component__WEBPACK_IMPORTED_MODULE_13__["ProcessComponent"],
                    _past_imports_past_imports_component__WEBPACK_IMPORTED_MODULE_14__["PastImportsComponent"],
                    _import_model_selection_import_model_selection_component__WEBPACK_IMPORTED_MODULE_15__["ImportModelSelectionComponent"],
                    _widgets_campaigns_selection_campaigns_selection_component__WEBPACK_IMPORTED_MODULE_16__["CampaignsSelectionComponent"],
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _app_material_material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
                    _app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_4__["PipesModule"],
                    _app_fab_float_btn_fab_float_btn_module__WEBPACK_IMPORTED_MODULE_5__["FabFloatBtnModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                    _app_spreadsheet_spreadsheet_module__WEBPACK_IMPORTED_MODULE_10__["SpreadsheetModule"],
                    ad_file_upload__WEBPACK_IMPORTED_MODULE_17__["AdFileUploadModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
                ],
                entryComponents: [
                    _dialogs_edit_import_model_edit_import_model_component__WEBPACK_IMPORTED_MODULE_9__["EditImportModelComponent"],
                    _bottom_sheets_confirm_agent_code_component__WEBPACK_IMPORTED_MODULE_12__["ConfirmAgentBottomSheetComponent"]
                ],
                providers: [
                    { provide: _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__["MAT_BOTTOM_SHEET_DEFAULT_OPTIONS"], useValue: { hasBackdrop: false } },
                ]
            }]
    }], null, null);


/***/ }),

/***/ "./src/app/imports/imports.service.ts":
/*!********************************************!*\
  !*** ./src/app/imports/imports.service.ts ***!
  \********************************************/
/*! exports provided: ImportsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportsService", function() { return ImportsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _app_session_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/session.service */ "./src/app/session.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");











var ImportsService = /** @class */ (function () {
    function ImportsService(http, session, router) {
        var _this = this;
        this.http = http;
        this.session = session;
        this.router = router;
        this.graphql = _env_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].graphql;
        this.api = _env_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + 'api';
        this.user = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
        this.session.getUserItem().subscribe(function (user) {
            if (!user)
                return;
            _this.user.next(user);
        });
    }
    /**
     * Get all ImportModels.
     */
    ImportsService.prototype.getImportModels = function () {
        var query = ["{ importModels { importModelId client {"];
        query.push("name clientId } shortDesc campaignId matchByAgentCode splitCustomerName ");
        query.push("fullDesc map userId user { id firstName lastName username active } ");
        query.push("campaign { campaignId name utilities { utilityId utilityName } }");
        query.push("createdAt updatedAt }}");
        return this.http.post(this.graphql, {
            // query: `{importModels {importModelId client {name clientId} shortDesc campaignId matchByAgentCode splitCustomerName
            //     fullDesc map userId user{id firstName lastName username active} createdAt updatedAt}}`
            query: query.join('')
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (result) {
            return result.data.importModels;
        }));
    };
    /**
     * Used to save new OR update existing ImportModels.
     */
    ImportsService.prototype.saveImportModel = function (model) {
        var url = this.api + "/import-models";
        return this.http.post(url, model);
    };
    ImportsService.prototype.fetchCampaigns = function () {
        var _this = this;
        var sub = this.user.subscribe(function (user) {
            var clientId = user.selectedClient != null
                ? user.selectedClient.clientId
                : user.sessionUser.sessionClient;
            var url = _this.api + "/campaigns/clients/" + clientId + "/active/true";
            _this.campaigns = _this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
            if (sub)
                sub.unsubscribe();
        });
    };
    ImportsService.prototype.fetchUtilities = function () {
        var _this = this;
        var sub = this.user.subscribe(function (user) {
            var clientId = user.selectedClient != null
                ? user.selectedClient.clientId
                : user.sessionUser.sessionClient;
            var url = _this.api + "/clients/" + clientId + "/utilities";
            _this.utilities = _this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["shareReplay"])(1));
            if (sub)
                sub.unsubscribe();
        });
    };
    ImportsService.prototype.getUtilityByName = function (name) {
        var sb = ['{'];
        sb.push("utilityByName(agent_company_name: \"" + name + "\") {");
        sb.push("utilityId");
        sb.push("}}");
        return this.http.post(this.graphql, {
            query: sb.join('')
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (utils) { return utils.data.utilityName[0]; }));
    };
    ImportsService.prototype.getUtilitiesByCampaign = function (campaignId) {
        var q = "{ utilitiesByCampaign(campaign_id: " + campaignId + ") { utilityId, utilityName } }";
        return this.http.post(this.graphql, { query: q });
    };
    ImportsService.prototype.createContact = function (dto) {
        var sb = ['mutation { createContact('];
        sb.push("client_id: " + dto.clientId + ",");
        sb.push("first_name: \"" + dto.firstName + "\",");
        sb.push("last_name: \"" + dto.lastName + "\",");
        sb.push("street: \"" + dto.street + "\",");
        if (dto.street2)
            sb.push("street2: \"" + dto.street2 + "\",");
        sb.push("city: \"" + dto.city + "\",");
        sb.push("state: \"" + dto.state + "\",");
        sb.push("zip: \"" + dto.zip + "\"");
        sb.push(") { contactId } }");
        return this.http.post(this.graphql, {
            query: sb.join('')
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) { return res.data.createContact; }));
    };
    ImportsService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ImportsService, factory: function ImportsService_Factory(t) { return new (t || ImportsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_app_session_service__WEBPACK_IMPORTED_MODULE_4__["SessionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"])); }, providedIn: 'root' });
    return ImportsService;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ImportsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _app_session_service__WEBPACK_IMPORTED_MODULE_4__["SessionService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }]; }, null);


/***/ }),

/***/ "./src/app/imports/past-imports/past-imports.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/imports/past-imports/past-imports.component.ts ***!
  \****************************************************************/
/*! exports provided: PastImportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PastImportsComponent", function() { return PastImportsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _app_daily_sale_tracker_daily_sale_tracker_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/daily-sale-tracker/daily-sale-tracker.service */ "./src/app/daily-sale-tracker/daily-sale-tracker.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/table.es5.js");






var _c0 = [1, "shadow-none", "p-3", "mb-2", "bg-light", "rounded"];
var _c1 = ["class", "table-container", 4, "ngIf", "ngIfElse"];
var _c2 = ["noImports", ""];
var _c3 = [1, "table-container"];
var _c4 = [3, "dataSource"];
var _c5 = ["matColumnDef", "name"];
var _c6 = [4, "matHeaderCellDef"];
var _c7 = [4, "matCellDef"];
var _c8 = ["matColumnDef", "date"];
var _c9 = ["matColumnDef", "importModel"];
var _c10 = [4, "matHeaderRowDef", "matHeaderRowDefSticky"];
var _c11 = [4, "matRowDef", "matRowDefColumns"];
function PastImportsComponent_div_1_mat_header_cell_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PastImportsComponent_div_1_mat_cell_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var item_r989 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r989.name);
} }
function PastImportsComponent_div_1_mat_header_cell_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PastImportsComponent_div_1_mat_cell_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var item_r990 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, item_r990.updatedAt, "shortDate"));
} }
function PastImportsComponent_div_1_mat_header_cell_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-header-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Model");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PastImportsComponent_div_1_mat_cell_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-cell");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var item_r991 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r991.importModel == null ? null : item_r991.importModel.shortDesc);
} }
function PastImportsComponent_div_1_mat_header_row_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-header-row");
} }
function PastImportsComponent_div_1_mat_row_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-row");
} }
function PastImportsComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-table", _c4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](3, _c5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PastImportsComponent_div_1_mat_header_cell_4_Template, 2, 0, "mat-header-cell", _c6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, PastImportsComponent_div_1_mat_cell_5_Template, 2, 1, "mat-cell", _c7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](6, _c8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, PastImportsComponent_div_1_mat_header_cell_7_Template, 2, 0, "mat-header-cell", _c6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, PastImportsComponent_div_1_mat_cell_8_Template, 3, 4, "mat-cell", _c7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](9, _c9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, PastImportsComponent_div_1_mat_header_cell_10_Template, 2, 0, "mat-header-cell", _c6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, PastImportsComponent_div_1_mat_cell_11_Template, 2, 1, "mat-cell", _c7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, PastImportsComponent_div_1_mat_header_row_12_Template, 1, 0, "mat-header-row", _c10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, PastImportsComponent_div_1_mat_row_13_Template, 1, 0, "mat-row", _c11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r978 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 4, ctx_r978.imports$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx_r978.displayColumns)("matHeaderRowDefSticky", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx_r978.displayColumns);
} }
var _c12 = [1, "font-italic"];
function PastImportsComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", _c12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "No reports have been imported yet!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var PastImportsComponent = /** @class */ (function () {
    function PastImportsComponent(saleService) {
        this.saleService = saleService;
        this.displayColumns = ['name', 'date', 'importModel'];
        this.imports$ = this.saleService.pastImports$.asObservable();
    }
    PastImportsComponent.prototype.ngOnInit = function () {
        // this.saleService.pastImports$.subscribe(imports => this.pastImports = imports);
    };
    PastImportsComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PastImportsComponent, selectors: [["vs-past-imports"]], factory: function PastImportsComponent_Factory(t) { return new (t || PastImportsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_daily_sale_tracker_daily_sale_tracker_service__WEBPACK_IMPORTED_MODULE_1__["DailySaleTrackerService"])); }, consts: 5, vars: 4, template: function PastImportsComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PastImportsComponent_div_1_Template, 14, 6, "div", _c1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, PastImportsComponent_ng_template_3_Template, 2, 0, "ng-template", null, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            var _r979 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
            var tmp_0_0 = null;
            var currVal_0 = (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx.imports$)) == null ? null : tmp_0_0.length;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", currVal_0)("ngIfElse", _r979);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatRow"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]], styles: [".table-container[_ngcontent-%COMP%] {\n  height: 400px;\n  overflow: auto; }\n\n.mat-table[_ngcontent-%COMP%] {\n  width: 100%; }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcmV3cGF5bWVudC9kZXYvYWN0aXZlL3Zlcm9zdGFjay9yZXNvdXJjZXMvYXNzZXRzL25nL3NyYy9hcHAvaW1wb3J0cy9wYXN0LWltcG9ydHMvcGFzdC1pbXBvcnRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksYUFBYTtFQUNiLGNBQWMsRUFBQTs7QUFHbEI7RUFDSSxXQUFXLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9pbXBvcnRzL3Bhc3QtaW1wb3J0cy9wYXN0LWltcG9ydHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi50YWJsZS1jb250YWluZXIge1xuICAgIGhlaWdodDogNDAwcHg7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbi5tYXQtdGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuIl19 */"] });
    return PastImportsComponent;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PastImportsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'vs-past-imports',
                templateUrl: './past-imports.component.html',
                styleUrls: ['./past-imports.component.scss']
            }]
    }], function () { return [{ type: _app_daily_sale_tracker_daily_sale_tracker_service__WEBPACK_IMPORTED_MODULE_1__["DailySaleTrackerService"] }]; }, null);


/***/ }),

/***/ "./src/app/imports/process/process.component.ts":
/*!******************************************************!*\
  !*** ./src/app/imports/process/process.component.ts ***!
  \******************************************************/
/*! exports provided: ProcessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessComponent", function() { return ProcessComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var ad_file_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ad-file-upload */ "./node_modules/ad-file-upload/__ivy_ngcc__/fesm5/ad-file-upload.js");
/* harmony import */ var dhx_spreadsheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dhx-spreadsheet */ "./node_modules/dhx-spreadsheet/codebase/spreadsheet.js");
/* harmony import */ var dhx_spreadsheet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dhx_spreadsheet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/models */ "./src/app/models/index.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _app_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/session.service */ "./src/app/session.service.ts");
/* harmony import */ var _imports_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../imports.service */ "./src/app/imports/imports.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _app_contact_contact_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/contact/contact.service */ "./src/app/contact/contact.service.ts");
/* harmony import */ var _app_daily_sale_tracker_daily_sale_tracker_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @app/daily-sale-tracker/daily-sale-tracker.service */ "./src/app/daily-sale-tracker/daily-sale-tracker.service.ts");
/* harmony import */ var _app_agent_agent_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @app/agent/agent.service */ "./src/app/agent/agent.service.ts");
/* harmony import */ var _app_message_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @app/message.service */ "./src/app/message.service.ts");
/* harmony import */ var _app_sidenav_sidenav_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @app/sidenav/sidenav.service */ "./src/app/sidenav/sidenav.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/card.es5.js");
/* harmony import */ var _import_model_selection_import_model_selection_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../import-model-selection/import-model-selection.component */ "./src/app/imports/import-model-selection/import-model-selection.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/button.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/expansion.es5.js");
/* harmony import */ var _past_imports_past_imports_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../past-imports/past-imports.component */ "./src/app/imports/past-imports/past-imports.component.ts");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/icon.es5.js");
































var _c0 = ["fuRef"];
var _c1 = ["spreadsheet"];
var _c2 = [1, "container"];
var _c3 = [1, "row"];
var _c4 = [1, "col-md-12"];
var _c5 = [1, "page-header-accent"];
var _c6 = ["mat-card-title", ""];
var _c7 = [1, "shadow-none", "p-3", "bg-light", "rounded"];
var _c8 = [1, "font-weight-bold"];
var _c9 = [1, "col-md-2"];
var _c10 = [3, "change"];
var _c11 = [1, "shadow-none", "p-3", "pt-0", "mb-2", "rounded"];
var _c12 = [1, "p-1"];
var _c13 = [4, "ngIf"];
var _c14 = ["type", "button", "mat-stroked-button", "", "color", "primary", 3, "click"];
var _c15 = ["type", "button", "mat-raised-button", "", "color", "primary", 3, "disabled", "click"];
var _c16 = [1, "col-md-10"];
var _c17 = [4, "ngIf", "ngIfElse"];
var _c18 = ["noPreview", ""];
var _c19 = ["mat-stroked-button", "", "color", "primary", "type", "file", "adFileSelect", "", 1, "d-none", 3, "uploader", "onFileSelected"];
var _c20 = ["fuRef", ""];
function ProcessComponent_ng_container_27_Template(rf, ctx) { if (rf & 1) {
    var _r1054 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "input", _c19, _c20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onFileSelected", function ProcessComponent_ng_container_27_Template_input_onFileSelected_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1054); var ctx_r1053 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1053.fileAddedHandler($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    var ctx_r1048 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("uploader", ctx_r1048.fu);
} }
var _c21 = ["mat-raised-button", "", "type", "button", "color", "primary", 3, "click"];
var _c22 = [1, "import-spreadsheet"];
var _c23 = ["spreadsheet", ""];
function ProcessComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    var _r1057 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", _c3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", _c4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", _c21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyling"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProcessComponent_div_34_Template_button_click_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1057); var ctx_r1056 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1056.toggleFullscreen(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyling"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "div", _c22, _c23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1049 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("fs-exit-position", ctx_r1049.isFullscreen);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ml-2", !ctx_r1049.isFullscreen);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mt-2", !ctx_r1049.isFullscreen);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstylingApply"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1049.isFullscreen ? "fullscreen_exit" : "fullscreen");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1049.isFullscreen ? "Exit" : "Fullscreen");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("fullscreen", ctx_r1049.isFullscreen);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstylingApply"]();
} }
var _c24 = [1, "shadow-none", "p-3", "mb-2", "rounded"];
var _c25 = [1, "row", "d-flex", "justify-content-center"];
var _c26 = [1, "col-md-4"];
var _c27 = ["src", "dist/assets/images/add_file.svg", 1, "img-fluid", "clickable", "m-5", 3, "click"];
var _c28 = [1, "text-muted"];
function ProcessComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    var _r1059 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", _c25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", _c26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "img", _c27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProcessComponent_ng_template_35_Template_img_click_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1059); var ctx_r1058 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1058.uploadFile(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", _c28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Import preview will appear here. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var ProcessComponent = /** @class */ (function () {
    function ProcessComponent(cd, session, service, contactService, saleService, agentsService, msg, sidenav, router, location) {
        this.cd = cd;
        this.session = session;
        this.service = service;
        this.contactService = contactService;
        this.saleService = saleService;
        this.agentsService = agentsService;
        this.msg = msg;
        this.sidenav = sidenav;
        this.router = router;
        this.location = location;
        this.fu = new ad_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileUploader"]({
            url: null,
            autoUpload: false,
            allowedFileType: ['csv', 'xsl', 'xslx'],
        });
        this.hasFile = false;
        this.workbooksToReview = [];
        this.saleType = {
            agentId: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].salesAgentId],
            agentName: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].salesAgentName],
            podAccount: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].podAccount],
            utilityName: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].utilityName],
            saleDate: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].saleDate],
            firstName: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].contactFirstName],
            lastName: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].contactLastName],
            businessName: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].contactBusinessName],
            address: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].contactStreet],
            address2: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].contactStreet2],
            city: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].contactCity],
            state: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].contactState],
            zip: _app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"].contactZip]
        };
        this.dtos = [];
        this.isFullscreen = false;
        this.pendingContactQueue = [];
    }
    ProcessComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.getUserItem().subscribe(function (u) { return _this.user = u; });
        this.agentsService.fetchGraphqlAgents();
        this.saleService.fetchReportImports();
        this.saleService.pastImports$.subscribe(function (imports) { return _this.reportImports = imports; });
    };
    ProcessComponent.prototype.ngOnDestroy = function () {
        if (this.contactIdSub)
            this.contactIdSub.unsubscribe();
    };
    ProcessComponent.prototype.toggleFullscreen = function () {
        this.isFullscreen = !this.isFullscreen;
    };
    ProcessComponent.prototype.fileAddedHandler = function (item) {
        var _this = this;
        var file = item.item(0);
        this.reportImportName = file.name.split('.').shift();
        var ext = file.name.split('.').pop();
        if (ext == 'csv' || ext == 'xsl' || ext == 'xlsx') {
            var workerUrl = window.URL.createObjectURL(new Blob([
                'importScripts("https://cdn.dhtmlx.com/libs/excel2json/1.0/worker.js")',
            ], { type: 'text/javascript' }));
            var worker = new Worker(workerUrl);
            worker.postMessage({
                type: 'convert',
                data: file
            });
            worker.addEventListener('message', function (e) {
                if (e.data.type === 'ready') {
                    _this.hasFile = true;
                    _this.cd.detectChanges();
                    _this.workbooksToReview = e.data.data;
                    _this.styles = e.data.styles;
                    _this.currentlyViewedWb = 0;
                    _this.loadWorkbook(_this.workbooksToReview[_this.currentlyViewedWb]);
                }
            });
        }
    };
    ProcessComponent.prototype.loadWorkbook = function (wb) {
        var _this = this;
        this.ss = new dhx_spreadsheet__WEBPACK_IMPORTED_MODULE_2__["Spreadsheet"](this.spreadsheetContainer.nativeElement, {
            menu: true,
            editLine: false,
            rowsCount: wb.rows.length,
            colsCount: wb.cols.length,
            autoFormat: false,
        });
        var data = {
            data: [],
            styles: {}
        };
        wb.cells.forEach(function (row, i) {
            row.forEach(function (col, j) {
                var cellLetters = _this.getCellLetter(j);
                var rowNo = (i + 1);
                var cellDest = "" + cellLetters + rowNo;
                var styleClassName = "spreadsheet-" + cellDest;
                var cellValue = _this.autoFormat(col);
                data.data.push({
                    cell: cellDest,
                    value: cellValue,
                    css: styleClassName,
                });
                if (col) {
                    data.styles[styleClassName] = _this.styles[col.s];
                }
            });
        });
        this.ss.parse(data);
    };
    /**
     * Evaluates the column to check if it's a number attempts to remove any zero-decimals
     * because the spreadsheet library turns integers into doubles and leaves ".0" at the end
     * of all integers.... wrecking formatting of account numbers, etc.
     */
    ProcessComponent.prototype.autoFormat = function (col) {
        // if the col is not null, the value is not null and the value is a number
        if (col && col.v && !isNaN(col.v)) {
            var numSplit = col.v.toString().split('.');
            // the number after the decimal is not '00'
            if (numSplit[numSplit.length - 1] > 0) {
                return col.v;
            }
            else { // this is a number like '##.0' and should be considered an integer
                var formattedDate = this.excelDateToMoment(numSplit[0]);
                if (formattedDate)
                    return formattedDate.format('MM-DD-YYYY');
                return numSplit[0];
            }
        }
        else if (col) {
            return col.v;
        }
        return null;
    };
    ProcessComponent.prototype.excelDateToMoment = function (serial) {
        var utcDays = Math.floor(serial - 25569);
        var utcValue = utcDays * 86400;
        var dateInfo = moment__WEBPACK_IMPORTED_MODULE_4__(utcValue * 1000);
        if (!dateInfo.isValid())
            return null;
        // TODO: Not the best way to do this... there is still a chance that some number converted to a moment date
        if (dateInfo.isBefore(moment__WEBPACK_IMPORTED_MODULE_4__().subtract(1, 'year'), 'day') || dateInfo.isAfter(moment__WEBPACK_IMPORTED_MODULE_4__(), 'day')) {
            return null;
        }
        var fractionalDay = serial - Math.floor(serial) + 0.0000001;
        var totalSeconds = Math.floor(86400 * fractionalDay);
        var seconds = totalSeconds % 60;
        totalSeconds -= seconds;
        var hours = Math.floor(totalSeconds / (60 * 60));
        var minutes = Math.floor(totalSeconds / 60) % 60;
        return dateInfo.hour(hours).minute(minutes).second(seconds);
    };
    ProcessComponent.prototype.getCellLetter = function (index) {
        var adjIdx = index + 1;
        var dict = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z'];
        if (adjIdx > dict.length && ((adjIdx % dict.length) % dict.length)) {
            var firstLetter = Math.floor((index + 1) / dict.length) - 1;
            var secondLetter = (adjIdx % dict.length) % dict.length - 1;
            return "" + dict[firstLetter] + dict[secondLetter];
        }
        else if (adjIdx > dict.length) {
            var firstLetter = adjIdx % dict.length;
            var secondLetter = Math.floor((adjIdx - 1) % dict.length);
            return "" + dict[firstLetter] + dict[secondLetter];
        }
        return "" + dict[index];
    };
    ProcessComponent.prototype.uploadFile = function () {
        var opened = this.sidenav.opened$.getValue();
        if (opened) {
            this.sidenav.close();
        }
        this.fileUploadElement.nativeElement.click();
    };
    ProcessComponent.prototype.importReport = function () {
        var _this = this;
        if (!this.hasFile)
            return;
        var ssData = this.ss.serialize();
        // console.dir(ssData);
        var rowsCount = this.ss._sizes.rowsCount;
        var colsCount = this.ss._sizes.colsCount;
        var map = JSON.parse(this.selectedImportModel.map);
        // get headers
        var headerMap = [];
        var _loop_1 = function (i) {
            var val = ssData.data[i].value;
            var m = map.find(function (x) { return x.value == val; });
            if (m) {
                headerMap.push({
                    colName: m.value,
                    mapName: m.key,
                    value: i.toString(),
                    fieldType: m.fieldType
                });
            }
        };
        for (var i = 0; i < colsCount; i++) {
            _loop_1(i);
        }
        /** CHECK THAT WE HAVE AN ACTUAL HEADER MAP */
        if (!headerMap.length) {
            this.msg.addMessage('We were unable to match your model to the report you chose. Please verify your import model.');
            return;
        }
        var sales = [];
        for (var r = 0; r < rowsCount; r++) {
            var rowStart = (colsCount * r);
            if (rowStart == 0)
                continue;
            var sale = {
                clientId: this.user.sessionUser.sessionClient,
            };
            for (var i = 0; i < headerMap.length; i++) {
                var header = headerMap[i];
                var index = rowStart + +header.value;
                var item = ssData.data[index];
                if (item)
                    sale[_app_models__WEBPACK_IMPORTED_MODULE_3__["DailySaleMapType"][header.fieldType]] = item.value;
            }
            if (Object.keys(sale).length > 1)
                sales.push(sale);
        }
        this.processSales(sales).subscribe(function (res) {
            if (!res)
                return;
            _this.dtos = res;
            _this.clearSpreadsheet();
            _this.msg.addMessage('Your sales have been imported.');
            var importModelId = _this.selectedImportModel.importModelId;
            var dto = {
                importModelId: importModelId,
                name: _this.reportImportName,
                clientId: _this.user.sessionUser.sessionClient
            };
            _this.saleService.saveReportImport(dto).subscribe(function (result) {
                var saved = result.data.saveReportImport;
                var exists = _this.reportImports.findIndex(function (ri) { return ri.reportImportId == saved.reportImportId; });
                if (exists) {
                    _this.reportImports[exists] = saved;
                }
                else {
                    _this.reportImports.push(saved);
                }
                _this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(function () {
                    _this.router.navigate([decodeURI(_this.location.path())], { skipLocationChange: true });
                });
            });
        });
    };
    ProcessComponent.prototype.clearSpreadsheet = function () {
        this.ss.parse([]);
    };
    ProcessComponent.prototype.processSales = function (sales) {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"].create(function (ob) {
            var joins = [];
            sales.forEach(function (s) {
                var d = {};
                joins.push(_this.buildDailySale(s, d));
            });
            Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])(joins).subscribe(function (sales) {
                var dncDtos = _this.pendingContactQueue.map(function (p) {
                    var req = {
                        first_name: p.firstName,
                        last_name: p.lastName,
                        address: p.street,
                        city: p.city,
                        state: p.state,
                        zip: "" + p.zip,
                    };
                    if (p.street2)
                        req.address_cont = p.street2;
                    return req;
                });
                // Save contacts
                Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])(_this.saveContacts(_this.pendingContactQueue), _this.saveDncContacts(dncDtos), _this.getSaleStatuses()).subscribe(function (resp) {
                    var contacts = resp[0];
                    var statuses = resp[2];
                    var sd = [];
                    var agents = _this.agentsService.agents$.getValue();
                    sales.forEach(function (s, i, a) {
                        a[i].contactId = contacts[i].contactId;
                        var selectedAgent = agents.find(function (a) { return a.salesPairings.find(function (sp) { return sp.salesId == "" + s.agentId; }) != null; });
                        if (!selectedAgent)
                            return;
                        sd.push({
                            campaign_id: s.campaignId,
                            utility_id: s.utilityId,
                            agent_id: selectedAgent.agentId,
                            sale_date: moment__WEBPACK_IMPORTED_MODULE_4__(s.saleDate, 'MM-DD-YYYY').format('YYYY-MM-DD HH:mm:ss'),
                            last_touch_date: moment__WEBPACK_IMPORTED_MODULE_4__().format('YYYY-MM-DD HH:mm:ss'),
                            contact_id: contacts[i].contactId,
                            pod_account: s.podAccount,
                            status: _this.guessSaleStatus(statuses, "" + s.saleStatus),
                            paid_status: s.paidStatus || _app_models__WEBPACK_IMPORTED_MODULE_3__["PaidStatusType"].unpaid,
                            has_geo: true
                        });
                    });
                    if (sd.length) {
                        _this.saleService.saveSalesList(sd).subscribe(function (resp) {
                            // this is an error from graphql, but i'm not sure how to customize this yet 
                            if (!resp.data || resp.errors) {
                                _this.msg.addMessage('Failed to save. Make sure you aren\'t trying to duplicate existings sales', 'dismiss', 3500);
                                ob.next([]);
                            }
                            else {
                                var sales_1 = resp.data.saveDailySales;
                                ob.next(sales_1);
                            }
                            ob.complete();
                        });
                    }
                    else {
                        ob.next([]);
                        ob.complete();
                    }
                });
            }, function (err) {
                ob.next([]);
                ob.complete();
            });
        });
    };
    ProcessComponent.prototype.guessSaleStatus = function (statuses, input) {
        statuses.forEach(function (s, i, a) {
            if (input.trim().toLowerCase().includes(s.name.toLowerCase())) {
                return s.saleStatusId;
            }
        });
        var acceptedStatus = statuses.find(function (s) { return s.name.toLowerCase().includes('accept'); });
        if (acceptedStatus)
            return acceptedStatus.saleStatusId;
        // unable to find any similar types, so we are going to return -1.
        return -1;
    };
    ProcessComponent.prototype.getSaleStatuses = function () {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"].create(function (o) {
            _this.saleService.getSaleStatuses().subscribe(function (resp) {
                var statuses = resp.data.saleStatuses;
                o.next(statuses);
                o.complete();
            });
        });
    };
    ProcessComponent.prototype.saveContacts = function (pending) {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"].create(function (o) {
            var dtos = [];
            pending.forEach(function (p, i, a) {
                var dto = {
                    first_name: p.firstName,
                    last_name: p.lastName,
                    contact_type: p.businessName ? _app_models__WEBPACK_IMPORTED_MODULE_3__["ContactType"].business : _app_models__WEBPACK_IMPORTED_MODULE_3__["ContactType"].residential,
                    street: p.street,
                    city: p.city,
                    state: p.state,
                    zip: "" + p.zip,
                };
                if (p.businessName)
                    dto.business_name = p.businessName;
                if (p.street2)
                    dto.street2 = p.street2;
                if (p.dob)
                    dto.dob = p.dob;
                if (p.email)
                    dto.email = p.email;
                if (p.fax)
                    dto.fax = p.fax;
                if (p.phone)
                    dto.phone = p.phone;
                if (p.middleName)
                    dto.middle_name = p.middleName;
                if (p.prefix)
                    dto.prefix = p.prefix;
                if (p.ssn)
                    dto.ssn = p.ssn;
                if (p.suffix)
                    dto.suffix = p.suffix;
                dtos.push(dto);
            });
            if (dtos.length) {
                _this.contactService.saveContactList(dtos)
                    .subscribe(function (resp) {
                    var contacts = resp.data.newContactList;
                    o.next(contacts);
                    o.complete();
                });
            }
            else {
                o.next([]);
                o.complete();
            }
        });
    };
    ProcessComponent.prototype.saveDncContacts = function (dtos) {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"].create(function (ob) {
            var joins = [];
            dtos.forEach(function (d, i, a) {
                var req = {
                    address: d.address,
                    city: d.city,
                    state: d.state
                };
                joins.push(_this.contactService.getGeocoding(req));
            });
            Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])(joins).subscribe(function (geocodingResponseList) {
                geocodingResponseList.forEach(function (g, ii, aa) {
                    dtos[ii].lat = g.results[0].geometry.location.lat;
                    dtos[ii].long = g.results[0].geometry.location.lng;
                    dtos[ii].geocode = JSON.stringify(g.results[0].geometry);
                });
                _this.contactService.saveDncContactList(dtos)
                    .subscribe(function (resp) {
                    var dncs = resp.data.newDncContactList;
                    ob.next(dncs);
                    ob.complete();
                });
            });
        });
    };
    ProcessComponent.prototype.buildDailySale = function (s, d) {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"].create(function (ob) {
            var _loop_2 = function (p) {
                switch (p) {
                    case _this.saleType.agentId:
                        d.agentId = s[p];
                        break;
                    case _this.saleType.podAccount:
                        d.podAccount = s[p];
                        break;
                    case _this.saleType.utilityName:
                        var cmp = _this.selectedImportModel.campaign;
                        if (cmp) {
                            d.campaignId = cmp.campaignId;
                            var ut = cmp.utilities.find(function (u) { return u.utilityName == s[p]; });
                            if (ut)
                                d.utilityId = ut.utilityId;
                        }
                        break;
                    case _this.saleType.saleDate:
                        d.saleDate = s[p];
                        break;
                    case _this.saleType.firstName:
                    case _this.saleType.lastName:
                    case _this.saleType.businessName:
                        _this.addToCreateContactQueue(s);
                        break;
                }
            };
            for (var p in s) {
                _loop_2(p);
            }
            if (_this.contactIdSub) {
                _this.contactIdSub.unsubscribe();
                _this.contactIdSub = null;
            }
            // add has geo
            d.hasGeo = true;
            ob.next(d);
            ob.complete();
        });
    };
    ProcessComponent.prototype.resolveUtilityId = function (campaignId, utilityName) {
        var _this = this;
        return rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"].create(function (ob) {
            _this.service.getUtilitiesByCampaign(campaignId).subscribe(function (resp) {
                var utils = resp.data.utilitiesByCampaign;
                var s = new RegExp("\\b" + utilityName + "\\b", "i");
                var found = utils.find(function (u) { return u.utilityName.search(s) > -1; });
                if (!found)
                    ob.next(null);
                else
                    ob.next(found.utilityId);
                ob.complete();
            });
        });
    };
    ProcessComponent.prototype.importModelChanged = function (value) {
        this.selectedImportModel = value;
    };
    ProcessComponent.prototype.addToCreateContactQueue = function (item) {
        var dto = {};
        dto.clientId = this.user.sessionUser.sessionClient;
        dto.firstName = item[this.saleType.firstName];
        dto.lastName = item[this.saleType.lastName];
        dto.businessName = item[this.saleType.businessName];
        dto.street = item[this.saleType.address];
        dto.street2 = item[this.saleType.address2];
        dto.city = item[this.saleType.city];
        dto.state = item[this.saleType.state];
        dto.zip = item[this.saleType.zip];
        var matches = this.pendingContactQueue
            .find(function (pc) { return pc.firstName == dto.firstName && pc.lastName == dto.lastName; });
        if (!matches)
            this.pendingContactQueue.push(dto);
    };
    ProcessComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProcessComponent, selectors: [["vs-process"]], factory: function ProcessComponent_Factory(t) { return new (t || ProcessComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_session_service__WEBPACK_IMPORTED_MODULE_5__["SessionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_imports_service__WEBPACK_IMPORTED_MODULE_6__["ImportsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_contact_contact_service__WEBPACK_IMPORTED_MODULE_8__["ContactService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_daily_sale_tracker_daily_sale_tracker_service__WEBPACK_IMPORTED_MODULE_9__["DailySaleTrackerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_agent_agent_service__WEBPACK_IMPORTED_MODULE_10__["AgentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_message_service__WEBPACK_IMPORTED_MODULE_11__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_sidenav_sidenav_service__WEBPACK_IMPORTED_MODULE_12__["SidenavService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_14__["Location"])); }, viewQuery: function ProcessComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
        } if (rf & 2) {
            var _t;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"]((_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadViewQuery"]())) && (ctx.fileUploadElement = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"]((_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadViewQuery"]())) && (ctx.spreadsheetContainer = _t.first);
        } }, consts: 43, vars: 6, template: function ProcessComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", _c2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", _c3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", _c4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card", _c5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h2", _c6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Import Reports");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-card-content");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", _c7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h5");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Requirements");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "ul");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Your CSV file should contain columns that match the ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span", _c8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Import Model");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " you select. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " The order of the columns must match exactly the to your Import Model. If they do not, please reorder the columns on your report. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Confirm correct import in the review field after you've imported the file and make any last-minute modifications that you might notice. ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", _c3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", _c9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "vs-import-model-selection", _c10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ProcessComponent_Template_vs_import_model_selection_change_22_listener($event) { return ctx.importModelChanged($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", _c11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Upload CSV file");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", _c12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, ProcessComponent_ng_container_27_Template, 3, 1, "ng-container", _c13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", _c14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProcessComponent_Template_button_click_28_listener($event) { return ctx.uploadFile(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Upload File");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", _c12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "button", _c15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProcessComponent_Template_button_click_31_listener($event) { return ctx.importReport(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Save Report");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", _c16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyling"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, ProcessComponent_div_34_Template, 11, 6, "div", _c17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, ProcessComponent_ng_template_35_Template, 6, 0, "ng-template", null, _c18, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "mat-accordion");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "mat-expansion-panel");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "mat-expansion-panel-header");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "mat-panel-title");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " Past Uploads ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "vs-past-imports");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            var _r1050 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](36);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.fu != null);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.hasFile && !ctx.selectedImportModel);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](33);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("d-flex", !ctx.hasFile);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("justify-content-center", !ctx.hasFile);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstylingApply"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵselect"](34);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.hasFile)("ngIfElse", _r1050);
        } }, directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_15__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_15__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_15__["MatCardContent"], _import_model_selection_import_model_selection_component__WEBPACK_IMPORTED_MODULE_16__["ImportModelSelectionComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_14__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_17__["MatButton"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_18__["MatAccordion"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_18__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_18__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_18__["MatExpansionPanelTitle"], _past_imports_past_imports_component__WEBPACK_IMPORTED_MODULE_19__["PastImportsComponent"], ad_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileSelectDirective"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__["MatIcon"]], styles: [".import-spreadsheet[_ngcontent-%COMP%] {\n  height: 40vh;\n  margin: 1.5rem 0.5rem 1.5rem 0.5rem; }\n\n.fullscreen[_ngcontent-%COMP%] {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  z-index: 10;\n  padding: 70px 1.5rem 2rem 1.5rem; }\n\n.fullscreen[_ngcontent-%COMP%]   .import-spreadsheet[_ngcontent-%COMP%] {\n    height: inherit;\n    margin: 0;\n    width: 100%; }\n\n.fs-exit-position[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 90vw;\n  top: 0;\n  z-index: 11;\n  margin: 80px 0 0 0; }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcmV3cGF5bWVudC9kZXYvYWN0aXZlL3Zlcm9zdGFjay9yZXNvdXJjZXMvYXNzZXRzL25nL3NyYy9hcHAvaW1wb3J0cy9wcm9jZXNzL3Byb2Nlc3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxZQUFZO0VBQ1osbUNBQW1DLEVBQUE7O0FBR3ZDO0VBQ0ksZUFBZTtFQUNmLFdBQVc7RUFDWCxZQUFZO0VBQ1osT0FBTztFQUNQLE1BQU07RUFDTixXQUFXO0VBQ1gsZ0NBQWdDLEVBQUE7O0FBUHBDO0lBVVEsZUFBZTtJQUNmLFNBQVM7SUFDVCxXQUFXLEVBQUE7O0FBSW5CO0VBQ0ksZUFBZTtFQUNmLFVBQVU7RUFDVixNQUFNO0VBQ04sV0FBVztFQUNYLGtCQUFrQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvaW1wb3J0cy9wcm9jZXNzL3Byb2Nlc3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5pbXBvcnQtc3ByZWFkc2hlZXQge1xuICAgIGhlaWdodDogNDB2aDtcbiAgICBtYXJnaW46IDEuNXJlbSAwLjVyZW0gMS41cmVtIDAuNXJlbTtcbn1cblxuLmZ1bGxzY3JlZW4ge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogMTA7XG4gICAgcGFkZGluZzogNzBweCAxLjVyZW0gMnJlbSAxLjVyZW07XG5cbiAgICAuaW1wb3J0LXNwcmVhZHNoZWV0IHtcbiAgICAgICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cblxuLmZzLWV4aXQtcG9zaXRpb24ge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBsZWZ0OiA5MHZ3O1xuICAgIHRvcDogMDtcbiAgICB6LWluZGV4OiAxMTtcbiAgICBtYXJnaW46IDgwcHggMCAwIDA7XG59Il19 */"] });
    return ProcessComponent;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProcessComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'vs-process',
                templateUrl: './process.component.html',
                styleUrls: ['./process.component.scss']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _app_session_service__WEBPACK_IMPORTED_MODULE_5__["SessionService"] }, { type: _imports_service__WEBPACK_IMPORTED_MODULE_6__["ImportsService"] }, { type: _app_contact_contact_service__WEBPACK_IMPORTED_MODULE_8__["ContactService"] }, { type: _app_daily_sale_tracker_daily_sale_tracker_service__WEBPACK_IMPORTED_MODULE_9__["DailySaleTrackerService"] }, { type: _app_agent_agent_service__WEBPACK_IMPORTED_MODULE_10__["AgentService"] }, { type: _app_message_service__WEBPACK_IMPORTED_MODULE_11__["MessageService"] }, { type: _app_sidenav_sidenav_service__WEBPACK_IMPORTED_MODULE_12__["SidenavService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__["Router"] }, { type: _angular_common__WEBPACK_IMPORTED_MODULE_14__["Location"] }]; }, { fileUploadElement: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['fuRef', { static: false }]
        }], spreadsheetContainer: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['spreadsheet', { static: false }]
        }] });


/***/ }),

/***/ "./src/app/imports/widgets/campaigns-selection/campaigns-selection.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/imports/widgets/campaigns-selection/campaigns-selection.component.ts ***!
  \**************************************************************************************/
/*! exports provided: CampaignsSelectionComponent, getMatSelectDynamicMultipleError, getMatSelectNonArrayValueError, getMatSelectNonFunctionValueError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignsSelectionComponent", function() { return CampaignsSelectionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatSelectDynamicMultipleError", function() { return getMatSelectDynamicMultipleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatSelectNonArrayValueError", function() { return getMatSelectNonArrayValueError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatSelectNonFunctionValueError", function() { return getMatSelectNonFunctionValueError; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _app_imports_imports_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/imports/imports.service */ "./src/app/imports/imports.service.ts");
/* harmony import */ var _app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/utils */ "./src/app/utils/index.ts");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/core.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/__ivy_ngcc__/esm5/select.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/__ivy_ngcc__/esm5/bidi.es5.js");













var CampaignsSelectionComponent = /** @class */ (function () {
    function CampaignsSelectionComponent(service, ngControl, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _parentFormField) {
        this.service = service;
        this.ngControl = ngControl;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._parentFormField = _parentFormField;
        this._required = false;
        this._compareWith = function (o1, o2) { return o1 === o2; };
        /** Aria label of the select. If not specified, the placeholder will be used as label. */
        this.ariaLabel = '';
    }
    Object.defineProperty(CampaignsSelectionComponent.prototype, "required", {
        /**
         * INPUT CONTROLS
         */
        get: function () { return this._required; },
        set: function (value) {
            this._required = Object(_app_utils__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignsSelectionComponent.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: function () { return this._placeholder; },
        set: function (value) {
            this._placeholder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignsSelectionComponent.prototype, "multiple", {
        /** Whether the user should be allowed to select multiple options. */
        get: function () { return this._multiple; },
        set: function (value) {
            if (this._selectionModel) {
                throw getMatSelectDynamicMultipleError();
            }
            this._multiple = Object(_app_utils__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignsSelectionComponent.prototype, "disableOptionCentering", {
        /** Whether to center the active option over the trigger. */
        get: function () { return this._disableOptionCentering; },
        set: function (value) {
            this._disableOptionCentering = Object(_app_utils__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignsSelectionComponent.prototype, "compareWith", {
        /**
         * Function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         */
        get: function () { return this._compareWith; },
        set: function (fn) {
            if (typeof fn !== 'function') {
                throw getMatSelectNonFunctionValueError();
            }
            this._compareWith = fn;
            if (this._selectionModel) {
                // A different comparator means the selection could change.
                this._initializeSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignsSelectionComponent.prototype, "value", {
        /** Value of the select control. */
        get: function () { return this._value; },
        set: function (newValue) {
            if (newValue !== this._value) {
                this.writeValue(newValue);
                this._value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CampaignsSelectionComponent.prototype, "id", {
        /** Unique id of the element. */
        get: function () { return this._id; },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    CampaignsSelectionComponent.prototype.ngOnInit = function () {
        this.campaigns = this.service.campaigns;
        this.service.fetchCampaigns();
    };
    /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
    CampaignsSelectionComponent.prototype.writeValue = function (value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    };
    CampaignsSelectionComponent.prototype._initializeSelection = function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(function () {
            if (_this.ngControl || _this._value) {
                _this._setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value);
            }
        });
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    CampaignsSelectionComponent.prototype._setSelectionByValue = function (value) {
        var _this = this;
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw getMatSelectNonArrayValueError();
            }
            this._selectionModel.clear();
            value.forEach(function (currentValue) { return _this._selectValue(currentValue); });
            this._sortValues();
        }
        else {
            this._selectionModel.clear();
            var correspondingOption = this._selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this._keyManager.setActiveItem(correspondingOption);
            }
        }
        this._changeDetectorRef.markForCheck();
    };
    /** Sorts the selected values in the selected based on their order in the panel. */
    CampaignsSelectionComponent.prototype._sortValues = function () {
        var _this = this;
        if (this.multiple) {
            var options_1 = this.options.toArray();
            this._selectionModel.sort(function (a, b) {
                return _this.sortComparator ? _this.sortComparator(a, b, options_1) :
                    options_1.indexOf(a) - options_1.indexOf(b);
            });
        }
    };
    /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
    CampaignsSelectionComponent.prototype._selectValue = function (value) {
        var _this = this;
        var correspondingOption = this.options.find(function (option) {
            try {
                // Treat null as a special reset value.
                return option.value != null && _this._compareWith(option.value, value);
            }
            catch (error) {
                // if (isDevMode()) {
                // Notify developers of errors in their comparator.
                console.warn(error);
                // }
                return false;
            }
        });
        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    };
    CampaignsSelectionComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CampaignsSelectionComponent, selectors: [["vs-campaigns-selection"]], factory: function CampaignsSelectionComponent_Factory(t) { return new (t || CampaignsSelectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_imports_imports_service__WEBPACK_IMPORTED_MODULE_1__["ImportsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__["Directionality"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroupDirective"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], 8)); }, contentQueries: function CampaignsSelectionComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticContentQuery"](dirIndex, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectTrigger"], true);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"], true);
        } if (rf & 2) {
            var _t;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"]((_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadContentQuery"]())) && (ctx.customTrigger = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"]((_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadContentQuery"]())) && (ctx.options = _t);
        } }, inputs: { required: "required", panelClass: "panelClass", placeholder: "placeholder", multiple: "multiple", disableOptionCentering: "disableOptionCentering", compareWith: "compareWith", value: "value", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], errorStateMatcher: "errorStateMatcher", typeaheadDebounceInterval: "typeaheadDebounceInterval", sortComparator: "sortComparator", id: "id" }, consts: 0, vars: 0, template: function CampaignsSelectionComponent_Template(rf, ctx) { }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ltcG9ydHMvd2lkZ2V0cy9jYW1wYWlnbnMtc2VsZWN0aW9uL2NhbXBhaWducy1zZWxlY3Rpb24uY29tcG9uZW50LnNjc3MifQ== */"] });
    return CampaignsSelectionComponent;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CampaignsSelectionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'vs-campaigns-selection',
                templateUrl: './campaigns-selection.component.html',
                styleUrls: ['./campaigns-selection.component.scss']
            }]
    }], function () { return [{ type: _app_imports_imports_service__WEBPACK_IMPORTED_MODULE_1__["ImportsService"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_7__["Directionality"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroupDirective"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }]; }, { options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"],
            args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"], { descendants: true }]
        }], required: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], panelClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], customTrigger: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
            args: [_angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectTrigger"], { static: true }]
        }], placeholder: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], multiple: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], disableOptionCentering: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], compareWith: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], ariaLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['aria-label']
        }], ariaLabelledby: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['aria-labelledby']
        }], errorStateMatcher: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], typeaheadDebounceInterval: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], sortComparator: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], id: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] });
function getMatSelectDynamicMultipleError() {
    return Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * @docs-private
 */
function getMatSelectNonArrayValueError() {
    return Error('Value must be an array in multiple-selection mode.');
}
/**
 * Returns an exception to be thrown when assigning a non-function value to the comparator
 * used to determine if a value corresponds to an option. Note that whether the function
 * actually takes two values and returns a boolean is not checked.
 */
function getMatSelectNonFunctionValueError() {
    return Error('`compareWith` must be a function.');
}


/***/ }),

/***/ "./src/app/spreadsheet/spreadsheet.component.ts":
/*!******************************************************!*\
  !*** ./src/app/spreadsheet/spreadsheet.component.ts ***!
  \******************************************************/
/*! exports provided: SpreadsheetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpreadsheetComponent", function() { return SpreadsheetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var dhx_spreadsheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dhx-spreadsheet */ "./node_modules/dhx-spreadsheet/codebase/spreadsheet.js");
/* harmony import */ var dhx_spreadsheet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dhx_spreadsheet__WEBPACK_IMPORTED_MODULE_1__);



var _c0 = ["widget"];
var _c1 = [1, "widget-box-wide"];
var _c2 = ["widget", ""];
var SpreadsheetComponent = /** @class */ (function () {
    function SpreadsheetComponent() {
    }
    SpreadsheetComponent.prototype.ngOnInit = function () {
        this.spreadsheet = new dhx_spreadsheet__WEBPACK_IMPORTED_MODULE_1__["Spreadsheet"](this.container.nativeElement, {
            toolbar: this.toolbar,
            menu: this.menu,
            editLine: this.editLine,
            rowsCount: this.rowsCount,
            colsCount: this.colsCount,
        });
    };
    SpreadsheetComponent.prototype.ngOnDestroy = function () {
        this.spreadsheet.destructor();
    };
    SpreadsheetComponent.ngComponentDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SpreadsheetComponent, selectors: [["vs-spreadsheet"]], factory: function SpreadsheetComponent_Factory(t) { return new (t || SpreadsheetComponent)(); }, viewQuery: function SpreadsheetComponent_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        } if (rf & 2) {
            var _t;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"]((_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadViewQuery"]())) && (ctx.container = _t.first);
        } }, inputs: { toolbar: "toolbar", menu: "menu", editLine: "editLine", rowsCount: "rowsCount", colsCount: "colsCount" }, consts: 2, vars: 0, template: function SpreadsheetComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", _c1, _c2);
        } }, styles: [".widget-box-wide[_ngcontent-%COMP%] {\n  width: 90vw;\n  height: 50vh;\n  padding: 1rem; }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kcmV3cGF5bWVudC9kZXYvYWN0aXZlL3Zlcm9zdGFjay9yZXNvdXJjZXMvYXNzZXRzL25nL3NyYy9hcHAvc3ByZWFkc2hlZXQvc3ByZWFkc2hlZXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGFBQWEsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NwcmVhZHNoZWV0L3NwcmVhZHNoZWV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ud2lkZ2V0LWJveC13aWRlIHtcbiAgICB3aWR0aDogOTB2dztcbiAgICBoZWlnaHQ6IDUwdmg7XG4gICAgcGFkZGluZzogMXJlbTtcbn0iXX0= */"] });
    return SpreadsheetComponent;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpreadsheetComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'vs-spreadsheet',
                templateUrl: './spreadsheet.component.html',
                styleUrls: ['./spreadsheet.component.scss']
            }]
    }], function () { return []; }, { container: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['widget', { static: false }]
        }], toolbar: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], menu: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], editLine: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], rowsCount: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], colsCount: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] });


/***/ }),

/***/ "./src/app/spreadsheet/spreadsheet.module.ts":
/*!***************************************************!*\
  !*** ./src/app/spreadsheet/spreadsheet.module.ts ***!
  \***************************************************/
/*! exports provided: SpreadsheetModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpreadsheetModule", function() { return SpreadsheetModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _spreadsheet_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spreadsheet.component */ "./src/app/spreadsheet/spreadsheet.component.ts");



var SpreadsheetModule = /** @class */ (function () {
    function SpreadsheetModule() {
    }
    SpreadsheetModule.ngModuleDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SpreadsheetModule });
    SpreadsheetModule.ngInjectorDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function SpreadsheetModule_Factory(t) { return new (t || SpreadsheetModule)(); } });
    return SpreadsheetModule;
}());

/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SpreadsheetModule, { declarations: [_spreadsheet_component__WEBPACK_IMPORTED_MODULE_1__["SpreadsheetComponent"]], exports: [_spreadsheet_component__WEBPACK_IMPORTED_MODULE_1__["SpreadsheetComponent"]] });
/*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpreadsheetModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _spreadsheet_component__WEBPACK_IMPORTED_MODULE_1__["SpreadsheetComponent"],
                ],
                exports: [
                    _spreadsheet_component__WEBPACK_IMPORTED_MODULE_1__["SpreadsheetComponent"],
                ]
            }]
    }], null, null);


/***/ })

}]);
//# sourceMappingURL=imports-imports-module.js.map