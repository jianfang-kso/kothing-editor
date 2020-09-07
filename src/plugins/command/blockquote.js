/*
 * Rich Text Editor
 *
 * kothing-ditor.js
 * Copyright Kothing.
 * MIT license.
 */

export default {
  name: 'blockquote',
  display: 'command',
  add: function(core, targetElement) {
    const context = core.context;
    context.blockquote = {
      targetButton: targetElement,
      tag: core.util.createElement('BLOCKQUOTE'),
    };
  },

  /**
   * @Override core
   */
  active: function(element) {
    if (!element) {
      this.util.removeClass(this.context.blockquote.targetButton, 'active');
    } else if (/blockquote/i.test(element.nodeName)) {
      this.util.addClass(this.context.blockquote.targetButton, 'active');
      return true;
    }

    return false;
  },

  /**
   * @Override core
   */
  action: function() {
    const currentBlockquote = this.util.getParentElement(this.getSelectionNode(), 'blockquote');

    if (currentBlockquote) {
      this.detachRangeFormatElement(currentBlockquote, null, null, false, false);
    } else {
      this.applyRangeFormatElement(this.context.blockquote.tag.cloneNode(false));
    }
  },
};
