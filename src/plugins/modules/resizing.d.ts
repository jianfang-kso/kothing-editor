import { Module } from "../Module";

/**
 * @description Require context properties when resizing module
    inputX: Element,
    inputY: Element,
    _container: null,
    _cover: null,
    _element: null,
    _element_w: 1,
    _element_h: 1,
    _element_l: 0,
    _element_t: 0,
    _defaultSizeX: 'auto',
    _defaultSizeY: 'auto',
    _origin_w: context.option.imageWidth === 'auto' ? '' : context.option.imageWidth,
    _origin_h: context.option.imageHeight === 'auto' ? '' : context.option.imageHeight,
    _proportionChecked: true,
    // -- select function --
    _resizing: context.option.imageResizing,
    _resizeDotHide: !context.option.imageHeightShow,
    _rotation: context.option.imageRotation,
    _onlyPercentage: context.option.imageSizeOnlyPercentage,
    _ratio: false,
    _ratioX: 1,
    _ratioY: 1
    _captionShow: true,
    // -- when used caption (_captionShow: true) --
    _caption: null,
    _captionChecked: false,
    captionCheckEl: null
*/

interface contextPluginProps {
  [key: string | number]: any;
}
declare interface resizing extends Module {
  /**
   * @description Gets the width size
   * @param contextPlugin context object of plugin (core.context[plugin])
   * @param element Target element [default: "this.plugin[plugin]._element"]
   * @param cover Cover element (FIGURE) [default: "this.plugin[plugin]._cover"]
   * @param container Container element (DIV.ke-component) [default: "this.plugin[plugin]._container"]
   * @returns
   */
  _module_getSizeX(
    contextPlugin: contextPluginProps,
    element: Element,
    cover: Element,
    container: Element
  ): string;

  /**
   * @description Gets the height size
   * @param contextPlugin context object of plugin (core.context[plugin])
   * @param element Target element [default: "this.plugin[plugin]._element"]
   * @param cover Cover element (FIGURE) [default: "this.plugin[plugin]._cover"]
   * @param container Container element (DIV.ke-component) [default: "this.plugin[plugin]._container"]
   * @returns
   */
  _module_getSizeY(
    contextPlugin: Record<string, unknown>,
    element: Element,
    cover: Element,
    container: Element
  ): string;

  /**
   * @description Called at the "openModify" to put the size of the current target into the size input element.
   * @param contextPlugin context object of plugin (core.context[plugin])
   * @param pluginObj Plugin object
   */
  _module_setModifyInputSize(
    contextPlugin: Record<string, unknown>,
    pluginObj: Record<string, unknown>
  ): void;

  /**
   * @description It is called in "setInputSize" (input tag keyupEvent),
   * checks the value entered in the input tag,
   * calculates the ratio, and sets the calculated value in the input tag of the opposite size.
   * @param contextPlugin context object of plugin (core.context[plugin])
   * @param xy 'x': width, 'y': height
   */
  _module_setInputSize(
    contextPlugin: Record<string, unknown>,
    xy: string
  ): void;

  /**
   * @description It is called in "setRatio" (input and proportionCheck tags changeEvent),
   * checks the value of the input tag, calculates the ratio, and resets it in the input tag.
   * @param contextPlugin context object of plugin (core.context[plugin])
   */
  _module_setRatio(contextPlugin: Record<string, unknown>): void;

  /**
   * @description Revert size of element to origin size (plugin._origin_w, plugin._origin_h)
   * @param contextPlugin context object of plugin (core.context[plugin])
   */
  _module_sizeRevert(contextPlugin: Record<string, unknown>): void;

  /**
   * @description Save the size data (element.setAttribute("data-size"))
   * Used at the "setSize" method
   * @param contextPlugin context object of plugin (core.context[plugin])
   */
  _module_saveCurrentSize(contextPlugin: Record<string, unknown>): void;

  /**
   * @description Call the resizing module
   * @param targetElement Resizing target element
   * @param plugin Plugin name
   * @returns Size of resizing div {w, h, t, l}
   */
  call_controller_resize(
    targetElement: Element,
    plugin: string
  ): Record<string, number>;

  /**
   * @description Open align submenu of module
   */
  openAlignMenu(): void;

  /**
   * @description Click event of resizing toolbar
   * Performs the action of the clicked toolbar button.
   * @param e Event object
   */
  onClick_resizeButton(e: MouseEvent): void;

  /**
   * @description Initialize the transform style (rotation) of the element.
   * @param element Target element
   */
  resetTransform(element: Element): void;

  /**
   * @description Set the transform style (rotation) of the element.
   * @param element Target element
   * @param width Element's width size
   * @param height Element's height size
   */
  setTransformSize(element: Element, width?: number, height?: number): void;

  /**
   * @description The position of the caption is set automatically.
   * @param element Target element (not caption element)
   */
  setCaptionPosition(element: Element): void;

  /**
   * @description Mouse down event of resize handles
   * @param e Event object
   */
  onMouseDown_resize_handle(e: MouseEvent): void;

  /**
   * @description Mouse move event after call "onMouseDown_resize_handle" of resize handles
   * The size of the module's "div" is adjusted according to the mouse move event.
   * @param contextResizing "core.context.resizing" object (binding argument)
   * @param direction Direction ("tl", "tr", "bl", "br", "lw", "th", "rw", "bh") (binding argument)
   * @param plugin "core.context[currentPlugin]" object (binding argument)
   * @param e Event object
   */
  resizing_element(
    contextResizing: Record<string, unknown>,
    direction: string,
    plugin: Record<string, unknown>,
    e: MouseEvent
  ): void;

  /**
   * @description Resize the element to the size of the "div" adjusted in the "resizing_element" method.
   * Called at the mouse-up event registered in "onMouseDown_resize_handle".
   * @param direction Direction ("tl", "tr", "bl", "br", "lw", "th", "rw", "bh")
   */
  cancel_controller_resize(direction: string): void;
}

export default resizing;
