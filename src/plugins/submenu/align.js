/*
 * Rich Text Editor
 *
 * kothing-ditor.js
 * Copyright Kothing.
 * MIT license.
 */

export default {
  name: "align",
  display: "submenu",
  add: function (core, targetElement) {
    const icons = core.icons;
    const context = core.context;
    context.align = {
      targetButton: targetElement,
      _alignList: null,
      currentAlign: "",
      icons: {
        justify: icons.align_justify,
        left: icons.align_left,
        right: icons.align_right,
        center: icons.align_center,
      },
    };

    /** set submenu */
    let listDiv = this.setSubmenu.call(core);
    let listUl = listDiv.querySelector("ul");

    /** add event listeners */
    listUl.addEventListener("click", this.pickup.bind(core));
    context.align._alignList = listUl.querySelectorAll("li button");

    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, listDiv);

    /** empty memory */
    listDiv = null;
    listUl = null;
  },

  setSubmenu: function () {
    const lang = this.lang;
    const icons = this.icons;
    const listDiv = this.util.createElement("DIV");

    listDiv.className = "ke-submenu ke-list-layer ke-list-align";
    listDiv.innerHTML = `<div class="ke-list-inner">
        <ul class="ke-list-basic">
          <li>
            <button type="button" class="ke-btn-list ke-btn-align" data-command="justifyleft" data-value="left" title="${lang.toolbar.alignLeft}">
              <span class="ke-list-icon">
                ${icons.align_left}
              </span>
              ${lang.toolbar.alignLeft}
            </button>
          </li>
          <li>
            <button type="button" class="ke-btn-list ke-btn-align" data-command="justifycenter" data-value="center" title="${lang.toolbar.alignCenter}">
              <span class="ke-list-icon">
                ${icons.align_center}
              </span>
              ${lang.toolbar.alignCenter}
            </button>
          </li>
          <li>
            <button type="button" class="ke-btn-list ke-btn-align" data-command="justifyright" data-value="right" title="${lang.toolbar.alignRight}">
              <span class="ke-list-icon">
                ${icons.align_right}
              </span>
              ${lang.toolbar.alignRight}
            </button>
          </li>
          <li>
            <button type="button" class="ke-btn-list ke-btn-align" data-command="justifyfull" data-value="justify" title="${lang.toolbar.alignJustify}">
              <span class="ke-list-icon">
                ${icons.align_justify}
              </span>
              ${lang.toolbar.alignJustify}
            </button>
          </li>
        </ul>
      </div>`;

    return listDiv;
  },

  /**
   * @Override core
   */
  active: function (element) {
    const targetButton = this.context.align.targetButton;
    const target = targetButton.firstElementChild;

    if (!element) {
      this.util.changeElement(target, this.context.align.icons.left);
      targetButton.removeAttribute("data-focus");
    } else if (this.util.isFormatElement(element)) {
      const textAlign = element.style.textAlign;
      if (textAlign) {
        this.util.changeElement(target, this.context.align.icons[textAlign]);
        targetButton.setAttribute("data-focus", textAlign);
        return true;
      }
    }

    return false;
  },

  /**
   * @Override submenu
   */
  on: function () {
    const alignContext = this.context.align;
    const alignList = alignContext._alignList;
    const currentAlign =
      alignContext.targetButton.getAttribute("data-focus") || "left";

    if (currentAlign !== alignContext.currentAlign) {
      for (let i = 0, len = alignList.length; i < len; i++) {
        if (currentAlign === alignList[i].getAttribute("data-value")) {
          this.util.addClass(alignList[i], "active");
        } else {
          this.util.removeClass(alignList[i], "active");
        }
      }

      alignContext.currentAlign = currentAlign;
    }
  },

  pickup: function (e) {
    e.preventDefault();
    e.stopPropagation();

    let target = e.target;
    let value = null;

    while (!value && !/UL/i.test(target.tagName)) {
      value = target.getAttribute("data-value");
      target = target.parentNode;
    }

    if (!value) {
      return;
    }

    const selectedFormsts = this.getSelectedElements();
    for (let i = 0, len = selectedFormsts.length; i < len; i++) {
      this.util.setStyle(
        selectedFormsts[i],
        "textAlign",
        value === "left" ? "" : value
      );
    }

    this.effectNode = null;
    this.submenuOff();
    this.focus();

    // history stack
    this.history.push(false);
  },
};
