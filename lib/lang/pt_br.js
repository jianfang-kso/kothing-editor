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
    code: 'pt_br',
    toolbar: {
      "default": 'Padrão',
      save: 'Salvar',
      font: 'Fonte',
      formats: 'Formatos',
      fontSize: 'Tamanho',
      bold: 'Negrito',
      underline: 'Sublinhado',
      italic: 'Itálico',
      strike: 'Riscado',
      subscript: 'Subescrito',
      superscript: 'Sobrescrito',
      removeFormat: 'Remover Formatação',
      fontColor: 'Cor da Fonte',
      hiliteColor: 'Cor de destaque',
      indent: 'Recuo',
      outdent: 'Avançar',
      align: 'Alinhar',
      alignLeft: 'Alinhar à esquerda',
      alignRight: 'Alinhar à direita',
      alignCenter: 'Alinhar ao centro',
      alignJustify: 'Alinhat justificado',
      list: 'Lista',
      orderList: 'Lista ordenada',
      unorderList: 'Lista desordenada',
      horizontalRule: 'Linha horizontal',
      hr_solid: 'solida',
      hr_dotted: 'pontilhada',
      hr_dashed: 'tracejada',
      table: 'Tabela',
      link: 'Link',
      math: 'Matemática',
      image: 'Imagem',
      video: 'Vídeo',
      audio: 'Áudio',
      fullScreen: 'Tela cheia',
      showBlocks: 'Mostrar blocos',
      codeView: 'Mostrar códigos',
      undo: 'Voltar',
      redo: 'Refazer',
      preview: 'Prever',
      print: 'imprimir',
      tag_p: 'Paragráfo',
      tag_div: '(DIV) Normal',
      tag_h: 'Cabeçalho',
      tag_blockquote: 'Citar',
      tag_pre: 'Código',
      template: 'Modelo',
      lineHeight: 'Altura da linha',
      paragraphStyle: 'Estilo do parágrafo',
      textStyle: 'Estilo do texto',
      imageGallery: 'Galeria de imagens'
    },
    dialogBox: {
      linkBox: {
        title: 'Inserir link',
        url: 'URL para link',
        text: 'Texto à mostrar',
        newWindowCheck: 'Abrir em nova guia'
      },
      mathBox: {
        title: 'Matemática',
        inputLabel: 'Notação matemática',
        fontSizeLabel: 'Tamanho',
        previewLabel: 'Prever'
      },
      imageBox: {
        title: 'Inserir imagens',
        file: 'Selecionar arquivos',
        url: 'URL da imagem',
        altText: 'Texto alternativo'
      },
      videoBox: {
        title: 'Inserir vídeo',
        file: 'Selecionar arquivos',
        url: 'URL do YouTube/Vimeo'
      },
      audioBox: {
        title: 'Inserir audio',
        file: 'Selecionar arquivos',
        url: 'URL da audio'
      },
      browser: {
        tags: 'Tag',
        search: 'Procurar'
      },
      caption: 'Inserir descrição',
      close: 'Fechar',
      submitButton: 'Enviar',
      revertButton: 'Reverter',
      proportion: 'restringir proporções',
      basic: 'Básico',
      left: 'Esquerda',
      right: 'Direita',
      center: 'Centro',
      width: 'Largura',
      height: 'Altura',
      size: 'Tamanho',
      ratio: 'Proporções'
    },
    controller: {
      edit: 'Editar',
      unlink: 'Retirar link',
      remove: 'Remover',
      insertRowAbove: 'Inserir linha acima',
      insertRowBelow: 'Inserir linha abaixo',
      deleteRow: 'Deletar linha',
      insertColumnBefore: 'Inserir coluna antes',
      insertColumnAfter: 'Inserir coluna depois',
      deleteColumn: 'Deletar coluna',
      fixedColumnWidth: 'Largura fixa da coluna',
      resize100: 'Redimensionar para 100%',
      resize75: 'Redimensionar para 75%',
      resize50: 'Redimensionar para 50%',
      resize25: 'Redimensionar para 25%',
      autoSize: 'Tamanho automático',
      mirrorHorizontal: 'Espelho, Horizontal',
      mirrorVertical: 'Espelho, Vertical',
      rotateLeft: 'Girar para esquerda',
      rotateRight: 'Girar para direita',
      maxSize: 'Tam max',
      minSize: 'Tam min',
      tableHeader: 'Cabeçalho da tabela',
      mergeCells: 'Mesclar células',
      splitCells: 'Dividir células',
      HorizontalSplit: 'Divisão horizontal',
      VerticalSplit: 'Divisão vertical'
    },
    menu: {
      spaced: 'Espaçado',
      bordered: 'Com borda',
      neon: 'Néon',
      translucent: 'Translúcido',
      shadow: 'Sombreado',
      code: 'Código'
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

    Object.defineProperty(window.KothingEditor_Lang, 'pt_br', {
      enumerable: true,
      writable: true,
      configurable: true,
      value: lang
    });
  }

  return lang;
});