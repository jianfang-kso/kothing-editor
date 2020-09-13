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
        throw new Error('KothingEditor_Lang a window with a document');
      }

      return factory(w);
    };
  } else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : void 0, function (window, noGlobal) {
  var lang = {
    code: 'en',
    toolbar: {
      "default": 'Default',
      save: 'Save',
      font: 'Font',
      formats: 'Formats',
      fontSize: 'Size',
      bold: 'Bold',
      underline: 'Underline',
      italic: 'Italic',
      strike: 'Strike',
      subscript: 'Subscript',
      superscript: 'Superscript',
      removeFormat: 'Remove Format',
      fontColor: 'Font Color',
      hiliteColor: 'Highlight Color',
      indent: 'Indent',
      outdent: 'Outdent',
      align: 'Align',
      alignLeft: 'Align left',
      alignRight: 'Align right',
      alignCenter: 'Align center',
      alignJustify: 'Align justify',
      list: 'List',
      orderList: 'Ordered list',
      unorderList: 'Unordered list',
      horizontalRule: 'Horizontal line',
      hr_solid: 'Solid',
      hr_dotted: 'Dotted',
      hr_dashed: 'Dashed',
      table: 'Table',
      link: 'Link',
      math: 'Math',
      image: 'Image',
      video: 'Video',
      audio: 'Audio',
      fullScreen: 'Full screen',
      showBlocks: 'Show blocks',
      codeView: 'Code view',
      undo: 'Undo',
      redo: 'Redo',
      preview: 'Preview',
      print: 'print',
      tag_p: 'Paragraph',
      tag_div: 'Normal (DIV)',
      tag_h: 'Header',
      tag_blockquote: 'Quote',
      tag_pre: 'Code',
      template: 'Template',
      lineHeight: 'Line height',
      paragraphStyle: 'Paragraph style',
      textStyle: 'Text style',
      imageGallery: 'Image gallery'
    },
    dialogBox: {
      linkBox: {
        title: 'Insert Link',
        url: 'URL to link',
        text: 'Text to display',
        newWindowCheck: 'Open in new window'
      },
      mathBox: {
        title: 'Math',
        inputLabel: 'Mathematical Notation',
        fontSizeLabel: 'Font Size',
        previewLabel: 'Preview'
      },
      imageBox: {
        title: 'Insert image',
        file: 'Select from files',
        url: 'Image URL',
        altText: 'Alternative text'
      },
      videoBox: {
        title: 'Insert Video',
        file: 'Select from files',
        url: 'Media embed URL, YouTube/Vimeo'
      },
      audioBox: {
        title: 'Insert Audio',
        file: 'Select from files',
        url: 'Audio URL'
      },
      browser: {
        tags: 'Tags',
        search: 'Search'
      },
      caption: 'Insert description',
      close: 'Close',
      submitButton: 'Submit',
      revertButton: 'Revert',
      proportion: 'Constrain proportions',
      basic: 'Basic',
      left: 'Left',
      right: 'Right',
      center: 'Center',
      width: 'Width',
      height: 'Height',
      size: 'Size',
      ratio: 'Ratio'
    },
    controller: {
      edit: 'Edit',
      unlink: 'Unlink',
      remove: 'Remove',
      insertRowAbove: 'Insert row above',
      insertRowBelow: 'Insert row below',
      deleteRow: 'Delete row',
      insertColumnBefore: 'Insert column before',
      insertColumnAfter: 'Insert column after',
      deleteColumn: 'Delete column',
      fixedColumnWidth: 'Fixed column width',
      resize100: 'Resize 100%',
      resize75: 'Resize 75%',
      resize50: 'Resize 50%',
      resize25: 'Resize 25%',
      autoSize: 'Auto size',
      mirrorHorizontal: 'Mirror, Horizontal',
      mirrorVertical: 'Mirror, Vertical',
      rotateLeft: 'Rotate left',
      rotateRight: 'Rotate right',
      maxSize: 'Max size',
      minSize: 'Min size',
      tableHeader: 'Table header',
      mergeCells: 'Merge cells',
      splitCells: 'Split Cells',
      HorizontalSplit: 'Horizontal split',
      VerticalSplit: 'Vertical split'
    },
    menu: {
      spaced: 'Spaced',
      bordered: 'Bordered',
      neon: 'Neon',
      translucent: 'Translucent',
      shadow: 'Shadow',
      code: 'Code'
    }
  };

  if (_typeof(noGlobal) === (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
    if (!window.KothingEditor_Lang) {
      Object.defineProperty(window, 'KothingEditor_Lang', {
        enumerable: true,
        writable: false,
        configurable: false,
        value: {}
      });
    }

    Object.defineProperty(window.KothingEditor_Lang, 'en', {
      enumerable: true,
      writable: true,
      configurable: true,
      value: lang
    });
  }

  return lang;
});