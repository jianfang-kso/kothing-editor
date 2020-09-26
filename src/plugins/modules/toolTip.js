/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @description Tooltip
 * @param {selector} element dom object
 * @param {animation} animation: 'toTop' | 'rotate' | 'scale' | 'skew', css3 animation
 * @param {direction} direction: 'top' | 'right' | 'bottom' | 'left'
 * @param {enterCallback} mouseenter events callback
 * @param {outCallback} mouseleave events callback
 */
export default class Tooltip {
  static bind(
    selector,
    direction = "top",
    animation = "toBottom",
    enterCallback,
    outCallback
  ) {
    const tooltips = document.querySelectorAll(selector);
    for (let i = tooltips.length - 1; i >= 0; i--) {
      new Tooltip(
        tooltips[i],
        direction,
        animation,
        enterCallback,
        outCallback
      );
    }
  }

  constructor(element, direction, animation, enterCallback, outCallback) {
    this.element = element;

    if (animation !== null) {
      this.animation = animation.split(" ");
    }

    // direction
    this.direction = direction;

    // transition time
    this.transTime = 300;

    // timer
    this.timer = null;

    // target
    this.tipTitle = element.getAttribute("data-tooltip");

    // callback
    this.enterCallback = enterCallback;
    this.outCallback = outCallback;

    this.tooltip = null;
    this.element.addEventListener(
      "mouseover",
      // this.mouseOver.bind(this),
      (e) => {
        if (this.checkHover(e, this.element)) {
          this.mouseOver();
        }
      },
      false
    );
    this.element.addEventListener(
      "mouseout",
      // this.mouseOut.bind(this),
      (e) => {
        if (this.checkHover(e, this.element)) {
          this.mouseOut();
        }
      },
      false
    );
  }

  checkHover(e, target) {
    if (this.getEvent(e).type === "mouseover") {
      return (
        !this.nodeContains(
          target,
          this.getEvent(e).relatedTarget || this.getEvent(e).fromElement
        ) &&
        !(
          (this.getEvent(e).relatedTarget || this.getEvent(e).fromElement) ===
          target
        )
      );
    } else {
      return (
        !this.nodeContains(
          target,
          this.getEvent(e).relatedTarget || this.getEvent(e).toElement
        ) &&
        !(
          (this.getEvent(e).relatedTarget || this.getEvent(e).toElement) ===
          target
        )
      );
    }
  }

  nodeContains(parentNode, childNode) {
    if (parentNode.contains) {
      return parentNode !== childNode && parentNode.contains(childNode);
    } else {
      return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
  }

  getEvent(e) {
    return e || window.event;
  }

  mouseOver() {
    this.timer && clearTimeout(this.timer);
    let tooltip = this.createTooltip();
    let width = tooltip.offsetWidth;
    let height = tooltip.offsetHeight;
    let left = 0;
    let top = 0;
    switch (this.direction) {
      case "top":
        left =
          this.element.offsetWidth / 2 -
          width / 2 +
          this.element.getBoundingClientRect().left +
          document.documentElement.scrollLeft;
        top =
          this.element.getBoundingClientRect().top -
          height -
          15 +
          document.documentElement.scrollTop;
        break;

      case "bottom":
        left =
          (this.element.offsetWidth - width) / 2 +
          this.element.getBoundingClientRect().left +
          document.documentElement.scrollLeft;
        top =
          this.element.getBoundingClientRect().bottom +
          document.documentElement.scrollTop;
        break;

      case "left":
        left =
          this.element.getBoundingClientRect().left -
          width -
          15 +
          document.documentElement.scrollLeft;
        top =
          this.element.getBoundingClientRect().top -
          (this.element.offsetHeight - height) / 2 +
          document.documentElement.scrollTop;
        break;

      case "right":
        left =
          this.element.getBoundingClientRect().right +
          15 +
          document.documentElement.scrollLeft;
        top =
          this.element.getBoundingClientRect().top -
          (this.element.offsetHeight - height) / 2 +
          document.documentElement.scrollTop;
        break;

      default:
        left =
          (this.element.offsetWidth - width) / 2 +
          this.element.getBoundingClientRect().left +
          document.documentElement.scrollLeft;
        top =
          this.element.getBoundingClientRect().bottom +
          15 +
          document.documentElement.scrollTop;
    }
    if (top < 20) {
      top =
        this.element.getBoundingClientRect().top +
        height +
        15 +
        document.documentElement.scrollTop;
      tooltip.classList.add("trans__bottom");
    }
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
    tooltip.classList.add("tooltip__visible");
    if (typeof this.enterCallback === "function") {
      this.enterCallback();
    }
  }

  mouseOut() {
    if (this.tooltip !== null) {
      this.timer && clearTimeout(this.timer);
      this.tooltip.classList.remove("tooltip__visible");
      this.timer = setTimeout(() => {
        try {
          document.body.removeChild(this.tooltip);
          this.tooltip = null;
          if (typeof this.outCallback === "function") {
            this.outCallback();
          }
        } catch (e) {
          console.error(e);
        }
      }, this.transTime);
    }
  }

  newId() {
    return (
      new Date().getTime() + Math.floor(Math.random() * 10000 + 1)
    ).toString(16);
  }

  createTooltip() {
    if (this.tooltip === null) {
      let tooltip = document.createElement("div");
      tooltip.innerHTML = this.tipTitle;
      tooltip.classList.add("ke_tooltip");
      this.id = this.newId();
      tooltip.setAttribute("data-tooltip", this.newId());
      document.body.appendChild(tooltip);
      this.tooltip = tooltip;
      tooltip.classList.add(`direction__${this.direction}`);
      if (this.animation !== null) {
        this.animation.forEach(function (element) {
          tooltip.classList.add(`trans__${element}`);
        });
      }
    }
    return this.tooltip;
  }
}
