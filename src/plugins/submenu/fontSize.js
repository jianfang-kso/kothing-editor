/*
 * Rich Text Editor
 *
 * kothing-ditor.js
 * Copyright Kothing.
 * MIT license.
 */

export default {
  name: 'fontSize',
  display: 'submenu',
  add: function(core, targetElement) {
    const context = core.context;
    context.fontSize = {
      targetText: targetElement.querySelector('.txt'),
      _sizeList: null,
      currentSize: '',
    };

    /** set submenu */
    let listDiv = this.setSubmenu.call(core);
    let listUl = listDiv.querySelector('ul');

    /** add event listeners */
    listUl.addEventListener('click', this.pickup.bind(core));
    context.fontSize._sizeList = listUl.querySelectorAll('li button');

    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, listDiv);

    /** empty memory */
    listDiv = null;
    listUl = null;
  },

  setSubmenu: function() {
    const option = this.context.option;
    const lang = this.lang;
    const listDiv = this.util.createElement('DIV');

    listDiv.className = 'ke-submenu ke-list-layer ke-list-font-size';

    const sizeList = !option.fontSize
      ? [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
      : option.fontSize;

    let list =
      '<div class="ke-list-inner">' +
      '<ul class="ke-list-basic">' +
      '<li><button type="button" class="default_value ke-btn-list" title="' +
      lang.toolbar.default +
      '">(' +
      lang.toolbar.default +
      ')</button></li>';
    for (let i = 0, unit = option.fontSizeUnit, len = sizeList.length, size; i < len; i++) {
      size = sizeList[i];
      list +=
        '<li><button type="button" class="ke-btn-list" data-value="' +
        size +
        unit +
        '" title="' +
        size +
        unit +
        '" style="font-size:' +
        size +
        unit +
        ';">' +
        size +
        '</button></li>';
    }
    list += '</ul></div>';

    listDiv.innerHTML = list;

    return listDiv;
  },

  /**
   * @Override core
   */
  active: function(element) {
    if (!element) {
      this.util.changeTxt(this.context.fontSize.targetText, this.lang.toolbar.fontSize);
    } else if (element.style && element.style.fontSize.length > 0) {
      this.util.changeTxt(this.context.fontSize.targetText, element.style.fontSize);
      return true;
    }

    return false;
  },

  /**
   * @Override submenu
   */
  on: function() {
    const fontSizeContext = this.context.fontSize;
    const sizeList = fontSizeContext._sizeList;
    const currentSize = fontSizeContext.targetText.textContent;

    if (currentSize !== fontSizeContext.currentSize) {
      for (let i = 0, len = sizeList.length; i < len; i++) {
        if (currentSize === sizeList[i].getAttribute('data-value')) {
          this.util.addClass(sizeList[i], 'active');
        } else {
          this.util.removeClass(sizeList[i], 'active');
        }
      }

      fontSizeContext.currentSize = currentSize;
    }
  },

  pickup: function(e) {
    if (!/^BUTTON$/i.test(e.target.tagName)) return false;

    e.preventDefault();
    e.stopPropagation();

    const value = e.target.getAttribute('data-value');

    if (value) {
      const newNode = this.util.createElement('SPAN');
      newNode.style.fontSize = value;
      this.nodeChange(newNode, ['font-size'], null, null);
    } else {
      this.nodeChange(null, ['font-size'], ['span'], true);
    }

    this.submenuOff();
  },
};
