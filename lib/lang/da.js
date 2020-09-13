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
    code: 'da',
    toolbar: {
      "default": 'Default',
      save: 'Gem',
      font: 'Skrifttype',
      formats: 'Format',
      fontSize: 'Skriftstørrelse',
      bold: 'Fed',
      underline: 'Understreget',
      italic: 'Skråskrift',
      strike: 'Overstreget',
      subscript: 'Sænket skrift',
      superscript: 'Hævet skrift',
      removeFormat: 'Fjern formatering',
      fontColor: 'Skriftfarve',
      hiliteColor: 'Baggrundsfarve',
      indent: 'Ryk ind',
      outdent: 'Ryk ud',
      align: 'Justering',
      alignLeft: 'Venstrejustering',
      alignRight: 'Højrejustering',
      alignCenter: 'Midterjustering',
      alignJustify: 'Tilpas margin',
      list: 'Lister',
      orderList: 'Nummereret liste',
      unorderList: 'Uordnet liste',
      horizontalRule: 'Horisontal linie',
      hr_solid: 'Almindelig',
      hr_dotted: 'Punkteret',
      hr_dashed: 'Streget',
      table: 'Tabel',
      link: 'Link',
      math: 'Math',
      image: 'Billede',
      video: 'Video',
      audio: 'Audio',
      fullScreen: 'Fuld skærm',
      showBlocks: 'Vis blokke',
      codeView: 'Vis koder',
      undo: 'Undo',
      redo: 'Redo',
      preview: 'Preview',
      print: 'Print',
      tag_p: 'Paragraph',
      tag_div: 'Normal (DIV)',
      tag_h: 'Overskrift',
      tag_blockquote: 'Citer',
      tag_pre: 'Code',
      template: 'Schablone',
      lineHeight: 'Linjehøjde',
      paragraphStyle: 'Afsnitstil',
      textStyle: 'Tekststil',
      imageGallery: 'Billedgalleri'
    },
    dialogBox: {
      linkBox: {
        title: 'Indsæt link',
        url: 'URL til link',
        text: 'Tekst for link',
        newWindowCheck: 'Åben i nyt faneblad'
      },
      mathBox: {
        title: 'Math',
        inputLabel: 'Matematisk notation',
        fontSizeLabel: 'Skriftstørrelse',
        previewLabel: 'Preview'
      },
      imageBox: {
        title: 'Indsæt billede',
        file: 'Indsæt fra fil',
        url: 'Indsæt fra URL',
        altText: 'Alternativ tekst'
      },
      videoBox: {
        title: 'Indsæt Video',
        file: 'Indsæt fra fil',
        url: 'Indlejr video / YouTube,Vimeo'
      },
      audioBox: {
        title: 'Indsæt Audio',
        file: 'Indsæt fra fil',
        url: 'Indsæt fra URL'
      },
      browser: {
        tags: 'Tags',
        search: 'Søg'
      },
      caption: 'Indsæt beskrivelse',
      close: 'Luk',
      submitButton: 'Gennemfør',
      revertButton: 'Gendan',
      proportion: 'Bevar proportioner',
      basic: 'Basis',
      left: 'Venstre',
      right: 'Højre',
      center: 'Center',
      width: 'Bredde',
      height: 'Højde',
      size: 'Størrelse',
      ratio: 'Forhold'
    },
    controller: {
      edit: 'Rediger',
      unlink: 'Fjern link',
      remove: 'Fjern',
      insertRowAbove: 'Indsæt række foroven',
      insertRowBelow: 'Indsæt række nedenfor',
      deleteRow: 'Slet række',
      insertColumnBefore: 'Indsæt kolonne før',
      insertColumnAfter: 'Indsæt kolonne efter',
      deleteColumn: 'Slet kolonne',
      fixedColumnWidth: 'Fast søjlebredde',
      resize100: 'Forstør 100%',
      resize75: 'Forstør 75%',
      resize50: 'Forstør 50%',
      resize25: 'Forstør 25%',
      autoSize: 'Auto størrelse',
      mirrorHorizontal: 'Spejling, horisontal',
      mirrorVertical: 'Spejling, vertikal',
      rotateLeft: 'Roter til venstre',
      rotateRight: 'Toter til højre',
      maxSize: 'Max størrelse',
      minSize: 'Min størrelse',
      tableHeader: 'Tabel overskrift',
      mergeCells: 'Sammenlæg celler (merge)',
      splitCells: 'Opdel celler',
      HorizontalSplit: 'Opdel horisontalt',
      VerticalSplit: 'Opdel vertikalt'
    },
    menu: {
      spaced: 'Brev Afstand',
      bordered: 'Afgrænsningslinje',
      neon: 'Neon',
      translucent: 'Gennemsigtig',
      shadow: 'Skygge',
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

    Object.defineProperty(window.KothingEditor_Lang, 'da', {
      enumerable: true,
      writable: true,
      configurable: true,
      value: lang
    });
  }

  return lang;
});