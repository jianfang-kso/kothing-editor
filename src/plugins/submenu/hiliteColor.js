/*
 * Rich Text Editor
 *
 * kothing-ditor.js
 * Copyright Kothing.
 * MIT license.
 */

import colorPicker from "../modules/_colorPicker";

export default {
  name: "hiliteColor",
  display: "submenu",
  add: function (core, targetElement) {
    core.addModule([colorPicker]);

    const context = core.context;
    context.hiliteColor = {
      previewEl: null,
      colorInput: null,
      colorList: null,
    };

    /** set submenu */
    let listDiv = this.setSubmenu.call(core);
    context.hiliteColor.colorInput = listDiv.querySelector(
      "._ke_color_picker_input"
    );

    /** add event listeners */
    context.hiliteColor.colorInput.addEventListener(
      "keyup",
      this.onChangeInput.bind(core)
    );
    listDiv
      .querySelector("._ke_color_picker_submit")
      .addEventListener("click", this.submit.bind(core));
    listDiv
      .querySelector("._ke_color_picker_remove")
      .addEventListener("click", this.remove.bind(core));
    listDiv.addEventListener("click", this.pickup.bind(core));

    context.hiliteColor.colorList = listDiv.querySelectorAll("li button");

    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, listDiv);

    /** empty memory */
    listDiv = null;
  },

  setSubmenu: function () {
    const colorArea = this.context.colorPicker.colorListHTML;
    const listDiv = this.util.createElement("DIV");

    listDiv.className = "ke-submenu ke-list-layer";
    listDiv.innerHTML = colorArea;

    return listDiv;
  },

  /**
   * @Override submenu
   */
  on: function () {
    const contextPicker = this.context.colorPicker;
    const contextHiliteColor = this.context.hiliteColor;

    contextPicker._colorInput = contextHiliteColor.colorInput;
    contextPicker._defaultColor = "#FFFFFF";
    contextPicker._styleProperty = "backgroundColor";
    contextPicker._colorList = contextHiliteColor.colorList;

    this.plugins.colorPicker.init.call(this, this.getSelectionNode(), null);
  },

  /**
   * @Override _colorPicker
   */
  onChangeInput: function (e) {
    this.plugins.colorPicker.setCurrentColor.call(this, e.target.value);
  },

  submit: function () {
    this.plugins.hiliteColor.applyColor.call(
      this,
      this.context.colorPicker._currentColor
    );
  },

  pickup: function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.plugins.hiliteColor.applyColor.call(
      this,
      e.target.getAttribute("data-value")
    );
  },

  remove: function () {
    this.nodeChange(null, ["background-color"], ["span"], true);
    this.submenuOff();
  },

  applyColor: function (color) {
    if (!color) {
      return;
    }

    const newNode = this.util.createElement("SPAN");
    newNode.style.backgroundColor = color;
    this.nodeChange(newNode, ["background-color"], null, null);

    this.submenuOff();
  },
};
