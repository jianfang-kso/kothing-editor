"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dialog = _interopRequireDefault(require("../modules/dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * Rich Text Editor
 *
 * kothing-ditor.js
 * Copyright Kothing.
 * MIT license.
 */
var _default = {
  name: 'link',
  display: 'dialog',
  add: function add(core) {
    core.addModule([_dialog["default"]]);
    var context = core.context;
    context.link = {
      focusElement: null,
      linkNewWindowCheck: null,
      linkAnchorText: null,
      _linkAnchor: null,
      _linkValue: ''
    };
    /** link dialog */

    var link_dialog = this.setDialog.call(core);
    context.link.modal = link_dialog;
    context.link.focusElement = link_dialog.querySelector('._ke_link_url');
    context.link.linkAnchorText = link_dialog.querySelector('._ke_link_text');
    context.link.linkNewWindowCheck = link_dialog.querySelector('._ke_link_check');
    context.link.preview = link_dialog.querySelector('.ke-link-preview');
    /** link controller */

    var link_controller = this.setController_LinkButton.call(core);
    context.link.linkController = link_controller;
    context.link._linkAnchor = null;
    link_controller.addEventListener('mousedown', core.eventStop);
    /** add event listeners */

    link_dialog.querySelector('.ke-btn-primary').addEventListener('click', this.submit.bind(core));
    link_controller.addEventListener('click', this.onClick_linkController.bind(core));
    context.link.focusElement.addEventListener('input', this._onLinkPreview.bind(context.link.preview, context.link, context.options.linkProtocol));
    /** append html */

    context.dialog.modal.appendChild(link_dialog);
    /** append controller */

    context.element.relative.appendChild(link_controller);
    /** empty memory */

    link_dialog = null;
    link_controller = null;
  },

  /** dialog */
  setDialog: function setDialog() {
    var lang = this.lang;
    var dialog = this.util.createElement('DIV');
    dialog.className = 'ke-dialog-content';
    dialog.style.display = 'none';
    dialog.innerHTML = '' + '<form class="editor_link">' + '<div class="ke-dialog-header">' + '<button type="button" data-command="close" class="ke-btn ke-dialog-close" aria-label="Close" title="' + lang.dialogBox.close + '">' + this.icons.cancel + '</button>' + '<span class="ke-modal-title">' + lang.dialogBox.linkBox.title + '</span>' + '</div>' + '<div class="ke-dialog-body">' + '<div class="ke-dialog-form">' + '<label>' + lang.dialogBox.linkBox.url + '</label>' + '<input class="ke-input-form _ke_link_url" type="text" />' + '<pre class="ke-link-preview"></pre>' + '</div>' + '<div class="ke-dialog-form">' + '<label>' + lang.dialogBox.linkBox.text + '</label><input class="ke-input-form _ke_link_text" type="text" />' + '</div>' + '<div class="ke-dialog-form-footer">' + '<label><input type="checkbox" class="ke-dialog-btn-check _ke_link_check" />&nbsp;' + lang.dialogBox.linkBox.newWindowCheck + '</label>' + '</div>' + '</div>' + '<div class="ke-dialog-footer">' + '<button type="submit" class="ke-btn-primary" title="' + lang.dialogBox.submitButton + '"><span>' + lang.dialogBox.submitButton + '</span></button>' + '</div>' + '</form>';
    return dialog;
  },

  /** modify controller button */
  setController_LinkButton: function setController_LinkButton() {
    var lang = this.lang;
    var icons = this.icons;
    var link_btn = this.util.createElement('DIV');
    link_btn.className = 'ke-controller ke-controller-link';
    link_btn.innerHTML = '' + '<div class="ke-arrow ke-arrow-up"></div>' + '<div class="link-content"><span><a target="_blank" href=""></a>&nbsp;</span>' + '<div class="ke-btn-group">' + '<button type="button" data-command="update" tabindex="-1" class="ke-btn ke-tooltip">' + icons.edit + '<span class="ke-tooltip-inner"><span class="ke-tooltip-text">' + lang.controller.edit + '</span></span>' + '</button>' + '<button type="button" data-command="unlink" tabindex="-1" class="ke-btn ke-tooltip">' + icons.unlink + '<span class="ke-tooltip-inner"><span class="ke-tooltip-text">' + lang.controller.unlink + '</span></span>' + '</button>' + '<button type="button" data-command="delete" tabindex="-1" class="ke-btn ke-tooltip">' + icons["delete"] + '<span class="ke-tooltip-inner"><span class="ke-tooltip-text">' + lang.controller.remove + '</span></span>' + '</button>' + '</div>' + '</div>';
    return link_btn;
  },

  /**
   * @Override dialog
   */
  open: function open() {
    this.plugins.dialog.open.call(this, 'link', this.currentControllerName === 'link');
  },
  _onLinkPreview: function _onLinkPreview(context, protocol, e) {
    var value = e.target.value.trim();
    context._linkValue = this.textContent = !value ? '' : protocol && value.indexOf('://') === -1 && value.indexOf('#') !== 0 ? protocol + value : value.indexOf('://') === -1 ? '/' + value : value;
  },
  submit: function submit(e) {
    this.showLoading();
    e.preventDefault();
    e.stopPropagation();

    var submitAction = function () {
      var contextLink = this.context.link;

      if (contextLink._linkValue.length === 0) {
        return false;
      }

      var url = contextLink._linkValue;
      var anchor = contextLink.linkAnchorText;
      var anchorText = anchor.value.length === 0 ? url : anchor.value;

      if (!this.context.dialog.updateModal) {
        var oA = this.util.createElement('A');
        oA.href = url;
        oA.textContent = anchorText;
        oA.target = contextLink.linkNewWindowCheck.checked ? '_blank' : '';
        var selectedFormats = this.getSelectedElements();

        if (selectedFormats.length > 1) {
          var oFormat = this.util.createElement(selectedFormats[0].nodeName);
          oFormat.appendChild(oA);

          if (!this.insertNode(oFormat, null, true)) {
            return;
          }
        } else {
          if (!this.insertNode(oA, null, true)) {
            return;
          }
        }

        this.setRange(oA.childNodes[0], 0, oA.childNodes[0], oA.textContent.length);
      } else {
        contextLink._linkAnchor.href = url;
        contextLink._linkAnchor.textContent = anchorText;
        contextLink._linkAnchor.target = contextLink.linkNewWindowCheck.checked ? '_blank' : ''; // set range

        var textNode = contextLink._linkAnchor.childNodes[0];
        this.setRange(textNode, 0, textNode, textNode.textContent.length);
      }

      contextLink._linkValue = contextLink.preview.textContent = contextLink.focusElement.value = contextLink.linkAnchorText.value = '';
    }.bind(this);

    try {
      submitAction();
    } finally {
      this.plugins.dialog.close.call(this);
      this.closeLoading(); // history stack

      this.history.push(false);
    }

    return false;
  },

  /**
   * @Override core
   */
  active: function active(element) {
    if (!element) {
      if (this.controllerArray.indexOf(this.context.link.linkController) > -1) {
        this.controllersOff();
      }
    } else if (this.util.isAnchor(element) && element.getAttribute('data-image-link') === null) {
      if (this.controllerArray.indexOf(this.context.link.linkController) < 0) {
        this.plugins.link.call_controller.call(this, element);
      }

      return true;
    }

    return false;
  },

  /**
   * @Override dialog
   */
  on: function on(update) {
    var contextLink = this.context.link;

    if (!update) {
      this.plugins.link.init.call(this);
      contextLink.linkAnchorText.value = this.getSelection().toString();
    } else if (contextLink._linkAnchor) {
      this.context.dialog.updateModal = true;
      contextLink._linkValue = contextLink.preview.textContent = contextLink.focusElement.value = contextLink._linkAnchor.href;
      contextLink.linkAnchorText.value = contextLink._linkAnchor.textContent;
      contextLink.linkNewWindowCheck.checked = !!/_blank/i.test(contextLink._linkAnchor.target);
    }
  },
  call_controller: function call_controller(selectionATag) {
    this.editLink = this.context.link._linkAnchor = selectionATag;
    var linkBtn = this.context.link.linkController;
    var link = linkBtn.querySelector('a');
    link.href = selectionATag.href;
    link.title = selectionATag.textContent;
    link.textContent = selectionATag.textContent;
    var offset = this.util.getOffset(selectionATag, this.context.element.wysiwygFrame);
    linkBtn.style.top = offset.top + selectionATag.offsetHeight + 10 + 'px';
    linkBtn.style.left = offset.left - this.context.element.wysiwygFrame.scrollLeft + 'px';
    linkBtn.style.display = 'block';
    var overLeft = this.context.element.wysiwygFrame.offsetWidth - (linkBtn.offsetLeft + linkBtn.offsetWidth);

    if (overLeft < 0) {
      linkBtn.style.left = linkBtn.offsetLeft + overLeft + 'px';
      linkBtn.firstElementChild.style.left = 20 - overLeft + 'px';
    } else {
      linkBtn.firstElementChild.style.left = '20px';
    }

    this.controllersOn(linkBtn, selectionATag, 'link');
  },
  onClick_linkController: function onClick_linkController(e) {
    e.stopPropagation();
    var command = e.target.getAttribute('data-command') || e.target.parentNode.getAttribute('data-command');

    if (!command) {
      return;
    }

    e.preventDefault();

    if (/update/.test(command)) {
      var contextLink = this.context.link;
      contextLink._linkValue = contextLink.preview.textContent = contextLink.focusElement.value = contextLink._linkAnchor.href;
      contextLink.linkAnchorText.value = contextLink._linkAnchor.textContent;
      contextLink.linkNewWindowCheck.checked = !!/_blank/i.test(contextLink._linkAnchor.target);
      this.plugins.dialog.open.call(this, 'link', true);
    } else if (/unlink/.test(command)) {
      var sc = this.util.getChildElement(this.context.link._linkAnchor, function (current) {
        return current.childNodes.length === 0 || current.nodeType === 3;
      }, false);
      var ec = this.util.getChildElement(this.context.link._linkAnchor, function (current) {
        return current.childNodes.length === 0 || current.nodeType === 3;
      }, true);
      this.setRange(sc, 0, ec, ec.textContent.length);
      this.nodeChange(null, null, ['A'], false);
    } else {
      /** delete */
      this.util.removeItem(this.context.link._linkAnchor);
      this.context.link._linkAnchor = null;
      this.focus(); // history stack

      this.history.push(false);
    }

    this.controllersOff();
  },

  /**
   * @Override dialog
   */
  init: function init() {
    var contextLink = this.context.link;
    contextLink.linkController.style.display = 'none';
    contextLink._linkAnchor = null;
    contextLink._linkValue = contextLink.preview.textContent = contextLink.focusElement.value = '';
    contextLink.linkAnchorText.value = '';
    contextLink.linkNewWindowCheck.checked = false;
  }
};
exports["default"] = _default;