/*
 * Rich Text Editor
 *
 * kothing-ditor.js
 * Copyright Kothing.
 * MIT license.
 */

import dialog from "../modules/dialog";

export default {
  name: "link",
  display: "dialog",
  add: function (core) {
    core.addModule([dialog]);

    const context = core.context;
    context.link = {
      focusElement: null,
      linkNewWindowCheck: null,
      linkAnchorText: null,
      _linkAnchor: null,
      _linkValue: "",
    };

    /** link dialog */
    let link_dialog = this.setDialog.call(core);
    context.link.modal = link_dialog;
    context.link.focusElement = link_dialog.querySelector("._ke_link_url");
    context.link.linkAnchorText = link_dialog.querySelector("._ke_link_text");
    context.link.linkNewWindowCheck = link_dialog.querySelector(
      "._ke_link_check"
    );
    context.link.preview = link_dialog.querySelector(".ke-link-preview");

    /** link controller */
    let link_controller = this.setController_LinkButton.call(core);
    context.link.linkController = link_controller;
    context.link._linkAnchor = null;
    link_controller.addEventListener("mousedown", core.eventStop);

    /** add event listeners */
    link_dialog
      .querySelector(".ke-btn-primary")
      .addEventListener("click", this.submit.bind(core));
    link_controller.addEventListener(
      "click",
      this.onClick_linkController.bind(core)
    );
    context.link.focusElement.addEventListener(
      "input",
      this._onLinkPreview.bind(
        context.link.preview,
        context.link,
        context.options.linkProtocol
      )
    );

    /** append html */
    context.dialog.modal.appendChild(link_dialog);

    /** append controller */
    context.element.relative.appendChild(link_controller);

    /** empty memory */
    link_dialog = null;
    link_controller = null;
  },

  /** dialog */
  setDialog: function () {
    const lang = this.lang;
    const dialog = this.util.createElement("DIV");

    dialog.className = "ke-dialog-content";
    dialog.style.display = "none";
    dialog.innerHTML = `
      <form class="editor_link">
        <div class="ke-dialog-header">
          <button type="button" data-command="close" class="ke-btn ke-dialog-close" aria-label="Close" title="${lang.dialogBox.close}">
            ${this.icons.cancel}
          </button>
          <span class="ke-modal-title">
            ${lang.dialogBox.linkBox.title}
          </span>
        </div>
        <div class="ke-dialog-body">
          <div class="ke-dialog-form">
            <label>${lang.dialogBox.linkBox.url}</label>
            <input class="ke-input-form _ke_link_url" type="text" />
            <pre class="ke-link-preview"></pre>
          </div>
          <div class="ke-dialog-form">
            <label>${lang.dialogBox.linkBox.text}</label>
            <input class="ke-input-form _ke_link_text" type="text" />
          </div>
          <div class="ke-dialog-form">
            <label>
              <input type="checkbox" class="ke-dialog-btn-check _ke_link_check" /> ${lang.dialogBox.linkBox.newWindowCheck}
            </label>
          </div>
        </div>
        <div class="ke-dialog-footer">
          <button type="submit" class="ke-btn-primary" title="${lang.dialogBox.submitButton}">
            <span>
              ${lang.dialogBox.submitButton}
            </span>
          </button>
        </div>
      </form>`;

    return dialog;
  },

  /** modify controller button */
  setController_LinkButton: function () {
    const lang = this.lang;
    const icons = this.icons;
    const link_btn = this.util.createElement("DIV");

    link_btn.className = "ke-controller ke-controller-link";
    link_btn.innerHTML = `
      <div class="ke-arrow ke-arrow-up"></div>
      <div class="link-content">
        <span><a target="_blank" href=""></a>&nbsp;</span>
        <div class="ke-btn-group">
          <button type="button" data-command="update" data-tooltip="${lang.controller.edit}" tabindex="-1" class="ke-btn">
            ${icons.edit}
          </button>
          <button type="button" data-command="unlink" data-tooltip="${lang.controller.unlink}" tabindex="-1" class="ke-btn">
            ${icons.unlink}
          </button>
          <button type="button" data-command="delete" data-tooltip="${lang.controller.remove}" tabindex="-1" class="ke-btn">
            ${icons.delete}
          </button>
        </div>
      </div>`;

    return link_btn;
  },

  /**
   * @Override dialog
   */
  open: function () {
    this.plugins.dialog.open.call(
      this,
      "link",
      this.currentControllerName === "link"
    );
  },

  _onLinkPreview: function (context, protocol, e) {
    const value = e.target.value.trim();
    context._linkValue = !value
      ? ""
      : protocol && value.indexOf("://") === -1 && value.indexOf("#") !== 0
      ? protocol + value
      : value.indexOf("://") === -1
      ? "/" + value
      : value;
    this.textContent = !value
      ? ""
      : protocol && value.indexOf("://") === -1 && value.indexOf("#") !== 0
      ? protocol + value
      : value.indexOf("://") === -1
      ? "/" + value
      : value;
  },

  submit: function (e) {
    this.showLoading();

    e.preventDefault();
    e.stopPropagation();

    const submitAction = function () {
      const contextLink = this.context.link;
      if (contextLink._linkValue.length === 0) {
        return false;
      }

      const url = contextLink._linkValue;
      const anchor = contextLink.linkAnchorText;
      const anchorText = anchor.value.length === 0 ? url : anchor.value;

      if (!this.context.dialog.updateModal) {
        const oA = this.util.createElement("A");
        oA.href = url;
        oA.textContent = anchorText;
        oA.target = contextLink.linkNewWindowCheck.checked ? "_blank" : "";

        const selectedFormats = this.getSelectedElements();
        if (selectedFormats.length > 1) {
          const oFormat = this.util.createElement(selectedFormats[0].nodeName);
          oFormat.appendChild(oA);
          if (!this.insertNode(oFormat, null, true)) {
            return;
          }
        } else {
          if (!this.insertNode(oA, null, true)) {
            return;
          }
        }

        this.setRange(
          oA.childNodes[0],
          0,
          oA.childNodes[0],
          oA.textContent.length
        );
      } else {
        contextLink._linkAnchor.href = url;
        contextLink._linkAnchor.textContent = anchorText;
        contextLink._linkAnchor.target = contextLink.linkNewWindowCheck.checked
          ? "_blank"
          : "";

        // set range
        const textNode = contextLink._linkAnchor.childNodes[0];
        this.setRange(textNode, 0, textNode, textNode.textContent.length);
      }

      contextLink._linkValue = "";
      contextLink.preview.textContent = "";
      contextLink.focusElement.value = "";
      contextLink.linkAnchorText.value = "";
    }.bind(this);

    try {
      submitAction();
    } finally {
      this.plugins.dialog.close.call(this);
      this.closeLoading();
      // history stack
      this.history.push(false);
    }

    return false;
  },

  /**
   * @Override core
   */
  active: function (element) {
    if (!element) {
      if (this.controllerArray.indexOf(this.context.link.linkController) > -1) {
        this.controllersOff();
      }
    } else if (
      this.util.isAnchor(element) &&
      element.getAttribute("data-image-link") === null
    ) {
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
  on: function (update) {
    const contextLink = this.context.link;
    if (!update) {
      this.plugins.link.init.call(this);
      contextLink.linkAnchorText.value = this.getSelection().toString();
    } else if (contextLink._linkAnchor) {
      this.context.dialog.updateModal = true;
      contextLink._linkValue = contextLink._linkAnchor.href;
      contextLink.preview.textContent = contextLink._linkAnchor.href;
      contextLink.focusElement.value = contextLink._linkAnchor.href;
      contextLink.linkAnchorText.value = contextLink._linkAnchor.textContent;
      contextLink.linkNewWindowCheck.checked = /_blank/i.test(
        contextLink._linkAnchor.target
      )
        ? true
        : false;
    }
  },

  call_controller: function (selectionATag) {
    this.editLink = selectionATag;
    this.context.link._linkAnchor = selectionATag;
    const linkBtn = this.context.link.linkController;
    const link = linkBtn.querySelector("a");

    link.href = selectionATag.href;
    link.title = selectionATag.textContent;
    link.textContent = selectionATag.textContent;

    const offset = this.util.getOffset(
      selectionATag,
      this.context.element.wysiwygFrame
    );
    linkBtn.style.top = offset.top + selectionATag.offsetHeight + 10 + "px";
    linkBtn.style.left =
      offset.left - this.context.element.wysiwygFrame.scrollLeft + "px";

    linkBtn.style.display = "block";

    const overLeft =
      this.context.element.wysiwygFrame.offsetWidth -
      (linkBtn.offsetLeft + linkBtn.offsetWidth);
    if (overLeft < 0) {
      linkBtn.style.left = linkBtn.offsetLeft + overLeft + "px";
      linkBtn.firstElementChild.style.left = 20 - overLeft + "px";
    } else {
      linkBtn.firstElementChild.style.left = "20px";
    }

    this.controllersOn(linkBtn, selectionATag, "link");
  },

  onClick_linkController: function (e) {
    e.stopPropagation();

    const command =
      e.target.getAttribute("data-command") ||
      e.target.parentNode.getAttribute("data-command");
    if (!command) {
      return;
    }

    e.preventDefault();

    if (/update/.test(command)) {
      const contextLink = this.context.link;
      contextLink._linkValue = contextLink._linkAnchor.href;
      contextLink.preview.textContent = contextLink._linkAnchor.href;
      contextLink.focusElement.value = contextLink._linkAnchor.href;
      contextLink.linkAnchorText.value = contextLink._linkAnchor.textContent;
      contextLink.linkNewWindowCheck.checked = /_blank/i.test(
        contextLink._linkAnchor.target
      )
        ? true
        : false;
      this.plugins.dialog.open.call(this, "link", true);
    } else if (/unlink/.test(command)) {
      const sc = this.util.getChildElement(
        this.context.link._linkAnchor,
        function (current) {
          return current.childNodes.length === 0 || current.nodeType === 3;
        },
        false
      );
      const ec = this.util.getChildElement(
        this.context.link._linkAnchor,
        function (current) {
          return current.childNodes.length === 0 || current.nodeType === 3;
        },
        true
      );
      this.setRange(sc, 0, ec, ec.textContent.length);
      this.nodeChange(null, null, ["A"], false);
    } else {
      /** delete */
      this.util.removeItem(this.context.link._linkAnchor);
      this.context.link._linkAnchor = null;
      this.focus();

      // history stack
      this.history.push(false);
    }

    this.controllersOff();
  },

  /**
   * @Override dialog
   */
  init: function () {
    const contextLink = this.context.link;
    contextLink.linkController.style.display = "none";
    contextLink._linkAnchor = null;
    contextLink._linkValue = "";
    contextLink.preview.textContent = "";
    contextLink.focusElement.value = "";
    contextLink.linkAnchorText.value = "";
    contextLink.linkNewWindowCheck.checked = false;
  },
};
