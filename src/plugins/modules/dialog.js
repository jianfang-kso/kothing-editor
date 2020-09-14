/*
 * Rich Text Editor
 *
 * kothing-ditor.js
 * Copyright Kothing.
 * MIT license.
 */

(function (global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
          if (!w.document) {
            throw new Error("KothingEditor_Modules a window with a document");
          }
          return factory(w);
        };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  /**
   * @description Append the className value of the argument value element
   * @param {Element} element Elements to add class name
   * @param {String} className Class name to be add
   */
  const addClass = (element, className) => {
    if (!element) {
      return;
    }

    const check = new window.RegExp("(\\s|^)" + className + "(\\s|$)");
    if (check.test(element.className)) {
      return;
    }

    element.className += (element.className.length > 0 ? " " : "") + className;
  };

  /**
   * @description Delete the className value of the argument value element
   * @param {Element} element Elements to remove class name
   * @param {String} className Class name to be remove
   */
  const removeClass = (element, className) => {
    if (!element) {
      return;
    }

    const check = new window.RegExp("(\\s|^)" + className + "(\\s|$)");
    element.className = element.className.replace(check, " ").trim();

    if (!element.className.trim()) {
      element.removeAttribute("class");
    }
  };

  const dialog = {
    name: "dialog",
    /**
     * @description Constructor
     * @param {Object} core Core object
     */
    add: function (core) {
      const context = core.context;
      context.dialog = {
        kind: "",
        updateModal: false,
        _closeSignal: false,
      };

      /** dialog */
      let dialog_div = core.util.createElement("DIV");
      dialog_div.className = "ke-dialog kothing-editor-common";

      let dialog_back = core.util.createElement("DIV");
      dialog_back.className = "ke-dialog-back";
      dialog_back.style.display = "none";

      let dialog_area = core.util.createElement("DIV");
      dialog_area.className = "ke-dialog-inner";
      dialog_area.style.display = "none";

      dialog_div.appendChild(dialog_back);
      dialog_div.appendChild(dialog_area);

      context.dialog.modalArea = dialog_div;
      context.dialog.back = dialog_back;
      context.dialog.modal = dialog_area;

      /** add event listeners */
      context.dialog.modal.addEventListener(
        "mousedown",
        this._onMouseDown_dialog.bind(core)
      );
      context.dialog.modal.addEventListener(
        "click",
        this._onClick_dialog.bind(core)
      );

      /** append html */
      context.element.relative.appendChild(dialog_div);

      /** empty memory */
      dialog_div = null;
      dialog_back = null;
      dialog_area = null;
    },

    /**
     * @description Event to control the behavior of closing the dialog
     * @param {MouseEvent} e Event object
     * @private
     */
    _onMouseDown_dialog: function (e) {
      if (/ke-dialog-inner/.test(e.target.className)) {
        this.context.dialog._closeSignal = true;
      } else {
        this.context.dialog._closeSignal = false;
      }
    },

    /**
     * @description Event to close the window when the outside area of the dialog or close button is click
     * @param {MouseEvent} e Event object
     * @private
     */
    _onClick_dialog: function (e) {
      e.stopPropagation();

      if (
        /close/.test(e.target.getAttribute("data-command")) ||
        this.context.dialog._closeSignal
      ) {
        this.plugins.dialog.close.call(this);
      }
    },

    /**
     * @description Open a Dialog plugin
     * @param {String} kind Dialog plugin name
     * @param {Boolean} update Whether it will open for update ('image' === this.currentControllerName)
     */
    open: function (kind, update) {
      if (this.modalForm) {
        return false;
      }
      if (this.plugins.dialog._bindClose) {
        this._d.removeEventListener("keydown", this.plugins.dialog._bindClose);
        this.plugins.dialog._bindClose = null;
      }

      this.plugins.dialog._bindClose = function (e) {
        if (!/27/.test(e.keyCode)) {
          return;
        }
        this.plugins.dialog.close.call(this);
      }.bind(this);
      this._d.addEventListener("keydown", this.plugins.dialog._bindClose);

      this.context.dialog.updateModal = update;

      if (this.context.option.popupDisplay === "full") {
        this.context.dialog.modalArea.style.position = "fixed";
      } else {
        this.context.dialog.modalArea.style.position = "absolute";
      }
      addClass(this.context.dialog.modalArea, "dialog--open");

      this.context.dialog.kind = kind;
      this.modalForm = this.context[kind].modal;
      const focusElement = this.context[kind].focusElement;

      if (typeof this.plugins[kind].on === "function") {
        this.plugins[kind].on.call(this, update);
      }

      this.context.dialog.modalArea.style.display = "block";
      this.context.dialog.back.style.display = "block";
      this.context.dialog.modal.style.display = "block";
      this.modalForm.style.display = "block";

      if (focusElement) {
        focusElement.focus();
      }
    },

    _bindClose: null,

    /**
     * @description Close a Dialog plugin
     * The plugin's "init" method is called.
     */
    close: function () {
      if (this.plugins.dialog._bindClose) {
        this._d.removeEventListener("keydown", this.plugins.dialog._bindClose);
        this.plugins.dialog._bindClose = null;
      }

      const kind = this.context.dialog.kind;
      removeClass(this.context.dialog.modalArea, "dialog--open");
      addClass(this.context.dialog.modalArea, "dialog--close");

      const rmCls = new Promise((resolve) => {
        setTimeout(() => {
          removeClass(this.context.dialog.modalArea, "dialog--close");
          resolve();
        }, 200);
      });

      rmCls.then(() => {
        this.modalForm.style.display = "none";
        this.context.dialog.back.style.display = "none";
        this.context.dialog.modalArea.style.display = "none";
        this.context.dialog.updateModal = false;
        if (typeof this.plugins[kind].init === "function") {
          this.plugins[kind].init.call(this);
        }
        this.context.dialog.kind = "";
        this.modalForm = null;
        this.focus();
      });
    },
  };

  if (typeof noGlobal === typeof undefined) {
    if (!window.KothingEditor_Modules) {
      Object.defineProperty(window, "KothingEditor_Modules", {
        enumerable: true,
        writable: false,
        configurable: false,
        value: {},
      });
    }

    Object.defineProperty(window.KothingEditor_Modules, "dialog", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: dialog,
    });
  }

  return dialog;
});
