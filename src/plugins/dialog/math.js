import dialog from "../modules/dialog";

export default {
  name: "math",
  display: "dialog",
  add: function (core) {
    core.addModule([dialog]);

    const context = core.context;
    context.math = {
      focusElement: null,
      previewElement: null,
      fontSizeElement: null,
      _mathExp: null,
    };

    /** math dialog */
    let math_dialog = this.setDialog.call(core);
    context.math.modal = math_dialog;
    context.math.focusElement = math_dialog.querySelector(".ke-math-exp");
    context.math.previewElement = math_dialog.querySelector(".ke-math-preview");
    context.math.fontSizeElement = math_dialog.querySelector(".ke-math-size");
    context.math.focusElement.addEventListener(
      "keyup",
      this._renderMathExp.bind(core, context.math),
      false
    );
    context.math.focusElement.addEventListener(
      "change",
      this._renderMathExp.bind(core, context.math),
      false
    );
    context.math.fontSizeElement.addEventListener(
      "change",
      function (e) {
        this.fontSize = e.target.value;
      }.bind(context.math.previewElement.style),
      false
    );

    /** math controller */
    let math_controller = this.setController_MathButton.call(core);
    context.math.mathController = math_controller;
    context.math._mathExp = null;
    math_controller.addEventListener("mousedown", core.eventStop);

    /** add event listeners */
    math_dialog
      .querySelector(".ke-btn-primary")
      .addEventListener("click", this.submit.bind(core), false);
    math_controller.addEventListener(
      "click",
      this.onClick_mathController.bind(core)
    );

    /** append html */
    context.dialog.modal.appendChild(math_dialog);
    context.element.relative.appendChild(math_controller);

    /** empty memory */
    math_dialog = null;
    math_controller = null;
  },

  /** dialog */
  setDialog: function () {
    const lang = this.lang;
    const dialog = this.util.createElement("DIV");

    dialog.className = "ke-dialog-content";
    dialog.style.display = "none";
    dialog.innerHTML = `
      <form>
        <div class="ke-dialog-header">
          <button type="button" data-command="close" class="ke-btn ke-dialog-close" aria-label="Close" title="${lang.dialogBox.close}">${this.icons.cancel}</button>
          <span class="ke-modal-title">${lang.dialogBox.mathBox.title}</span>
        </div>
        <div class="ke-dialog-body">
          <div class="ke-dialog-form">
            <label>${lang.dialogBox.mathBox.inputLabel}(<a href="https://katex.org/docs/supported.html" target="_blank">KaTeX</a>)</label>
            <textarea class="ke-input-form ke-math-exp" type="text"></textarea>
          </div>
          <div class="ke-dialog-form">
            <label>${lang.dialogBox.mathBox.fontSizeLabel}</label>
            <select class="ke-input-select ke-math-size">
              <option value="1em">1</option>
              <option value="1.5em">1.5</option>
              <option value="2em">2</option>
              <option value="2.5em">2.5</option>
            </select>
          </div>
          <div class="ke-dialog-form">
            <label>${lang.dialogBox.mathBox.previewLabel}</label>
            <p class="ke-math-preview"></p>
          </div>
        </div>
        <div class="ke-dialog-footer">
          <button type="submit" class="ke-btn-primary" title="${lang.dialogBox.submitButton}">${lang.dialogBox.submitButton}</button>
        </div>
      </form>`;

    return dialog;
  },

  /** modify controller button */
  setController_MathButton: function () {
    const lang = this.lang;
    const math_btn = this.util.createElement("DIV");

    math_btn.className = "ke-controller ke-controller-link";
    math_btn.innerHTML = `
      <div class="ke-arrow ke-arrow-up"></div>
      <div class="link-content">
        <div class="ke-btn-group">
          <button type="button" data-command="update" data-tooltip="${lang.controller.edit}" tabindex="-1" class="ke-btn">
            ${this.icons.edit}
          </button>
          <button type="button" data-command="delete" data-tooltip="${lang.controller.remove}" tabindex="-1" class="ke-btn">
            ${this.icons.delete}
          </button>
        </div>
      </div>`;

    return math_btn;
  },

  /**
   * @Required @Override dialog
   */
  open: function () {
    this.plugins.dialog.open.call(
      this,
      "math",
      this.currentControllerName === "math"
    );
  },

  /**
   * @Override core - managedTagsInfo
   */
  managedTags: function () {
    return {
      className: "katex",
      method: function (element) {
        if (!element.getAttribute("data-exp")) {
          return;
        }
        const dom = this._d
          .createRange()
          .createContextualFragment(
            this.plugins.math._renderer.call(
              this,
              this.util.HTMLDecoder(element.getAttribute("data-exp"))
            )
          );
        element.innerHTML = dom.querySelector(".katex").innerHTML;
      },
    };
  },

  _renderer: function (exp) {
    const katex = this.context.option.katex;
    return katex.src.renderToString(exp, katex.options);
  },

  _renderMathExp: function (contextMath, e) {
    contextMath.previewElement.innerHTML = this.plugins.math._renderer.call(
      this,
      e.target.value
    );
  },

  submit: function (e) {
    this.showLoading();

    e.preventDefault();
    e.stopPropagation();

    const submitAction = function () {
      if (this.context.math.focusElement.value.trim().length === 0) {
        return false;
      }

      const contextMath = this.context.math;
      const mathExp = contextMath.focusElement.value;
      const katexEl = contextMath.previewElement.querySelector(".katex");

      if (!katexEl) {
        return false;
      }
      katexEl.className = "__ke__katex " + katexEl.className;
      katexEl.setAttribute("contenteditable", false);
      katexEl.setAttribute("data-exp", this.util.HTMLEncoder(mathExp));
      katexEl.setAttribute("data-font-size", contextMath.fontSizeElement.value);
      katexEl.style.fontSize = contextMath.fontSizeElement.value;

      if (!this.context.dialog.updateModal) {
        const selectedFormats = this.getSelectedElements();

        if (selectedFormats.length > 1) {
          const oFormat = this.util.createElement(selectedFormats[0].nodeName);
          oFormat.appendChild(katexEl);
          if (!this.insertNode(oFormat, null, true)) {
            return false;
          }
        } else {
          if (!this.insertNode(katexEl, null, true)) {
            return false;
          }
        }

        const empty = this.util.createTextNode(this.util.zeroWidthSpace);
        katexEl.parentNode.insertBefore(empty, katexEl.nextSibling);
        this.setRange(katexEl, 0, katexEl, 1);
      } else {
        const containerEl = this.util.getParentElement(
          contextMath._mathExp,
          ".katex"
        );
        containerEl.parentNode.replaceChild(katexEl, containerEl);
        this.setRange(katexEl, 0, katexEl, 1);
      }

      contextMath.focusElement.value = "";
      contextMath.fontSizeElement.value = "1em";
      contextMath.previewElement.style.fontSize = "1em";
      contextMath.previewElement.innerHTML = "";

      return true;
    }.bind(this);

    try {
      if (submitAction()) {
        this.plugins.dialog.close.call(this);
        // history stack
        this.history.push(false);
      }
    } catch (e) {
      this.plugins.dialog.close.call(this);
    } finally {
      this.closeLoading();
    }

    return false;
  },

  active: function (element) {
    if (!element) {
      if (this.controllerArray.indexOf(this.context.math.mathController) > -1) {
        this.controllersOff();
      }
    } else if (element.getAttribute("data-exp")) {
      if (this.controllerArray.indexOf(this.context.math.mathController) < 0) {
        this.setRange(element, 0, element, 1);
        this.plugins.math.call_controller.call(this, element);
      }
      return true;
    }

    return false;
  },

  on: function (update) {
    if (!update) {
      this.plugins.math.init.call(this);
    } else {
      const contextMath = this.context.math;
      if (contextMath._mathExp) {
        const exp = this.util.HTMLDecoder(
          contextMath._mathExp.getAttribute("data-exp")
        );
        const fontSize =
          contextMath._mathExp.getAttribute("data-font-size") || "1em";
        this.context.dialog.updateModal = true;
        contextMath.focusElement.value = exp;
        contextMath.fontSizeElement.value = fontSize;
        contextMath.previewElement.innerHTML = this.plugins.math._renderer.call(
          this,
          exp
        );
        contextMath.previewElement.style.fontSize = fontSize;
      }
    }
  },

  call_controller: function (mathTag) {
    this.context.math._mathExp = mathTag;
    const mathBtn = this.context.math.mathController;

    const offset = this.util.getOffset(
      mathTag,
      this.context.element.wysiwygFrame
    );
    mathBtn.style.top = offset.top + mathTag.offsetHeight + 10 + "px";
    mathBtn.style.left =
      offset.left - this.context.element.wysiwygFrame.scrollLeft + "px";

    mathBtn.style.display = "block";

    const overLeft =
      this.context.element.wysiwygFrame.offsetWidth -
      (mathBtn.offsetLeft + mathBtn.offsetWidth);
    if (overLeft < 0) {
      mathBtn.style.left = mathBtn.offsetLeft + overLeft + "px";
      mathBtn.firstElementChild.style.left = 20 - overLeft + "px";
    } else {
      mathBtn.firstElementChild.style.left = "20px";
    }

    this.controllersOn(mathBtn, mathTag, "math");
  },

  onClick_mathController: function (e) {
    e.stopPropagation();

    const command =
      e.target.getAttribute("data-command") ||
      e.target.parentNode.getAttribute("data-command");
    if (!command) {
      return;
    }

    e.preventDefault();

    if (/update/.test(command)) {
      this.context.math.focusElement.value = this.util.HTMLDecoder(
        this.context.math._mathExp.getAttribute("data-exp")
      );
      this.plugins.dialog.open.call(this, "math", true);
    } else {
      /** delete */
      this.util.removeItem(this.context.math._mathExp);
      this.context.math._mathExp = null;
      this.focus();

      // history stack
      this.history.push(false);
    }

    this.controllersOff();
  },

  init: function () {
    const contextMath = this.context.math;
    contextMath.mathController.style.display = "none";
    contextMath._mathExp = null;
    contextMath.focusElement.value = "";
    contextMath.previewElement.innerHTML = "";
  },
};
