import { Module } from "../Module";

/**
 * @description This is a required module of fileBrowser plugin.
    Require context properties when using fileBrowser module:
    title(@Required): "File browser window title",
    url(@Required): "File server url",
    listClass(@Required): "Class name of list div",
    itemTemplateHandler(@Required): "Function that defines the HTML of an file item",
    selectorHandler(@Required): "Function that action when item click",
    columnSize(@Option): "Number of "div.ke-file-item-column" to be created (default: 4)"
*/

interface DrawItem {
  [key: string | number]: any;
}

declare interface fileBrowser extends Module {
  /**
   * @description Open a file browser window
   * @param pluginName Plugin name using the file browser
   * @param selectorHandler When the function comes as an argument value, it substitutes "context.selectorHandler".
   * @example this.plugins.fileBrowser.open.call(this, 'imageGallery', (selectorHandler || null));
   */
  open(kind: string, update: boolean): void;

  /**
   * @description Define the HTML of the item to be put in "div.ke-file-item-column".
   * @param item Item of the response data's array
   */
  drawItems: (item: DrawItem) => string;

  /**
   * @description Close a file browser window
   * The plugin's "init" method is called.
   * @example this.plugins.fileBrowser.close.call(this);
   */
  close(): void;

  /**
   * @description This method is called when the file browser window is closed.
   * Initialize the properties.
   */
  init?: () => void;
}

export default fileBrowser;
