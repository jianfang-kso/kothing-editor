"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./assets/css/editor.css");

require("./assets/css/editor-contents.css");

var _plugins = _interopRequireDefault(require("./plugins"));

var _editor2 = _interopRequireDefault(require("./editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Object.defineProperty(window, 'KothingEditor', {
  enumerable: true,
  writable: false,
  configurable: false,
  value: _editor2["default"].init({
    plugins: _plugins["default"]
  })
});
var _default = _editor2["default"];
exports["default"] = _default;