import '../src/assets/css/editor.css';
import '../src/assets/css/editor-contents.css';
import KothingEditor from '../src/editor';
import plugins from '../src/plugins';
import lang from '../src/lang';
import katex from 'katex';
import 'katex/dist/katex.min.css'
/**
 * ID : 'my-editor'
 * ClassName : 'kothing-eidtor'
 */
const editor = KothingEditor.create(document.getElementById('my-editor'), {
  // All of the plugins are loaded in the "window.KothingEditor" object in kothing-editor.min.js file
  // Insert options
  width: '100%',
  height: '400px',
  plugins: plugins,
  katex: katex,
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

const getValueBtn = document.getElementById("get-content");
getValueBtn.addEventListener('click', () => {
  alert(editor.getContents());
}, false); 
