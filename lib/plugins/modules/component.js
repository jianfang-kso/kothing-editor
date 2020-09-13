"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Rich Text Editor
 *
 * kothing-ditor.js
 * Copyright Kothing.
 * MIT license.
 */
(function (global, factory) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error('KothingEditor_Modules a window with a document');
      }

      return factory(w);
    };
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : void 0, function (window, noGlobal) {
  var component = {
    name: 'component',

    /**
     * @description Create a container for the resizing component and insert the element.
     * @param {Element} cover Cover element (FIGURE)
     * @param {String} className Class name of container (fixed: ke-component)
     * @returns {Element} Created container element
     */
    set_container: function set_container(cover, className) {
      var container = this.util.createElement('DIV');
      container.className = 'ke-component ' + className;
      container.setAttribute('contenteditable', false);
      container.appendChild(cover);
      return container;
    },

    /**
     * @description Cover the target element with a FIGURE element.
     * @param {Element} element Target element
     */
    set_cover: function set_cover(element) {
      var cover = this.util.createElement('FIGURE');
      cover.appendChild(element);
      return cover;
    },

    /**
     * @description Return HTML string of caption(FIGCAPTION) element
     * @returns {String}
     */
    create_caption: function create_caption() {
      var caption = this.util.createElement('FIGCAPTION');
      caption.setAttribute('contenteditable', true);
      caption.innerHTML = '<div>' + this.lang.dialogBox.caption + '</div>';
      return caption;
    }
  };

  if (_typeof(noGlobal) === (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
    if (!window.KothingEditor_Modules) {
      Object.defineProperty(window, 'KothingEditor_Modules', {
        enumerable: true,
        writable: false,
        configurable: false,
        value: {}
      });
    }

    Object.defineProperty(window.KothingEditor_Modules, 'component', {
      enumerable: true,
      writable: false,
      configurable: false,
      value: component
    });
  }

  return component;
});