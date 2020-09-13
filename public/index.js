import '../src/assets/css/editor.css';
import '../src/assets/css/editor-contents.css';
import KothingEditor from '../src/editor';
import plugins from '../src/plugins';
import lang from '../src/lang';
/**
 * ID : 'my-editor'
 * ClassName : 'kothing-eidtor'
 */
KothingEditor.create(document.getElementById('my-editor'), {
  // All of the plugins are loaded in the "window.KothingEditor" object in kothing-editor.min.js file
  // Insert options
  width: '100%',
  height: '400px',
  plugins: plugins,
  lang: lang.zh_cn,
  toolBarItem: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['removeFormat'],
    ['fontColor', 'hiliteColor'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'table'],
    ['link', 'image', 'audio', 'video'],
    ['lineHeight', 'paragraphStyle', 'textStyle'],
    ['fullScreen', 'showBlocks', 'codeView'],
    ['preview', 'print'],
    ['save', 'template'],
  ],
});