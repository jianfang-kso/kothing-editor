import '../src/assets/css/editor.css'
import '../src/assets/css/editor-contents.css'

import KothingEditor from '../src/editor'
import plugins from '../src/plugins'
import { zh_cn } from '../src/lang'

import custom_plugin_submenu from './custom_plugin_submenu'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import CodeMirror from 'codemirror'

window.cm = CodeMirror

//Editor1;
/* ================================================================= */
let s1 = KothingEditor.create(document.getElementById('editor1'), {
  plugins: plugins,
  toolBarItem: [
    [
      'formatBlock',
      'fontColor',
      'fontSize',
      'bold',
      'underline',
      'italic',
      'strike',
      'removeFormat',
      'table',
      'link',
    ],
  ],
  height: 'auto',
  width: '1080px',
  mode: 'classic',
  stickyToolbar: true,
  videoResizing: false,
  imageWidth: 150,
  // fullPage: true,
})

window.ke_destroy1 = function() {
  s1.destroy()
}

window.ke_create1 = function() {
  s1 = KothingEditor.create('editor', {})
}

// Editor2
/* ================================================================= */
let s2 = KothingEditor.create(document.getElementById('editor2'), {
  plugins: plugins,
  toolBarItem: [
    [
      'undo',
      'redo',
      'removeFormat',
      'font',
      'fontSize',
      'formatBlock',
      'bold',
      'underline',
      'italic',
      'strike',
      'subscript',
      'superscript',
      'fontColor',
      'hiliteColor',
      'outdent',
      'indent',
      'align',
      'horizontalRule',
      'list',
      'table',
      'link',
      'image',
      'video',
      'fullScreen',
      'showBlocks',
      'codeView',
      'preview',
      'print',
      'save',
    ],
  ],
  width: '100%',
  imageWidth: 300,
  mode: 'classic', //'balloon',
  // toolbarWidth: 800,
  height: 'auto',
  // fullPage: true,
  iframeCSSFileName: 'kothing-editor',
  // iframe: true,
  // callBackSave: (contents) => {
  //     console.log('callback')
  // }
  codeMirror: {
    src: CodeMirror,
  },
})

s2.onScroll = function(e) {
  console.log('onScroll', e)
}
s2.onClick = function(e) {
  console.log('onClick', e)
}
s2.onKeyDown = function(e) {
  console.log('onKeyDown', e)
}
s2.onKeyUp = function(e) {
  console.log('onKeyUp', e)
}
s2.onDrop = function(e) {
  console.log('onDrop', e)
}

s2.onChange = function(contents) {
  console.log('change')
}

s2.onImageUpload = function() {
  console.log(s2.getImagesInfo())
}

;(s2.showInline = function(toolbar, context) {}),
  (window.ke_noticeOpen = function() {
    s2.noticeOpen('test notice')
  })

window.ke_noticeClose = function() {
  s2.noticeClose()
}

window.ke_save = function() {
  s2.save()
}

window.ke_getContext = function() {
  console.log(s2.getContext())
}

window.ke_getImagesInfo = function() {
  console.log(s2.getImagesInfo())
  s2.getImagesInfo().list[0].select()
}

window.ke_insertHTML = function(html) {
  s2.insertHTML(html)
}

window.ke_getContents = function() {
  alert(s2.getContents())
}

window.ke_setContents = function(content) {
  s2.setContents(content)
}

window.ke_appendContents = function(content) {
  s2.appendContents(content)
}

window.ke_disabled = function() {
  s2.disabled()
}

window.ke_enabled = function() {
  s2.enabled()
}

window.ke_show = function() {
  s2.show()
}

window.ke_hide = function() {
  s2.hide()
}

window.ke_destroy = function() {
  s2.destroy()
}

window.ke_create = function() {
  s2 = KothingEditor.create('editor2', {
    height: 148,
  })
}

//////////////////////////////////////////////////////////////////////
const editor = KothingEditor.init({
  plugins: [
    plugins.hiliteColor,
    plugins.align,
    plugins.horizontalRule,
    plugins.list,
    plugins.table,
    plugins.link,
    custom_plugin_submenu,
  ],
  width: '100%',
  // iframe: true,
})
/////////////////////////////////////////////////////////////////////

/* ================================================================= */
// Editor3
let s3 = editor.create(document.getElementById('editor3'), {
  plugins: plugins,
  // maxHeight: '400px',
  height: 'auto',
  // height: 400,
  imageResizing: true,
  // imageWidth: '400',
  stickyToolbar: false,
  toolBarItem: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['removeFormat'],
    ['fontColor', 'hiliteColor'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'table'],
    ['link', 'image', 'video'],
    ['fullScreen', 'showBlocks', 'codeView'],
    ['preview', 'print'],
    ['save', 'template'],
  ],
  templates: [
    {
      name: 'template1',
      html: '<p>fdkjslfjdslkf</p>',
    },
    {
      name: 'template2',
      html: '<p><strong>11111</strong></p>',
    },
    {
      name: 'template3',
      html: '<p><u>22222</u></p>',
    },
  ],
  callBackSave: function(contents) {
    alert(contents)
  },
  formats: [
    'h1',
    'h4',
    'pre',
    'p',
    'blockquote',
    {
      tag: 'div',
      class: '__ke__aaa',
      title: 'Normal (DIV)',
      command: 'range',
    },
  ],
  // iframe: true,
  // fullPage: true,
  // codeMirror: CodeMirror,
  codeMirror: {
    src: CodeMirror,
    options: {
      mode: 'xml',
    },
  },
  // imageUploadSizeLimit: 30000
})

const newOption = {
  mode: 'balloon',
  iframe: false,
  plugins: [plugins.hiliteColor, plugins.fontColor],
  minHeight: '300',
  toolBarItem: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['removeFormat'],
    ['fontColor', 'hiliteColor'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'table'],
    ['link', 'image', 'video'],
    ['fullScreen', 'showBlocks', 'codeView'],
    ['preview', 'print'],
    ['save'],
  ],
  colorList: [
    ['#ccc', '#dedede', 'OrangeRed', 'Orange', 'RoyalBlue', 'SaddleBrown'],
    ['SlateGray', 'BurlyWood', 'DeepPink', 'FireBrick', 'Gold', 'SeaGreen'],
  ],
}
const newOption2 = {
  mode: 'classic',
  maxHeight: '400px',
  height: 150,
  imageWidth: '100%',
  colorList: null,
  iframe: true,
}
const newOption3 = {
  mode: 'inline',
  iframe: false,
}

let imageList = []
let selectedImages = []
const imageWrapper = document.getElementById('image_wrapper')
const imageSize = document.getElementById('image_size')
const imageRemove = document.getElementById('image_remove')
const imageTable = document.getElementById('image_list')

window.findIndex = function(arr, index) {
  let idx = -1

  arr.some(function(a, i) {
    if ((typeof a === 'number' ? a : a.index) === index) {
      idx = i
      return true
    }
    return false
  })

  return idx
}

window.setImage = function(type, index) {
  imageList[findIndex(imageList, index)][type]()
}

window.checkImage = function(index) {
  const li = imageTable.querySelector('#img_' + index)
  const currentImageIdx = findIndex(selectedImages, index)

  if (currentImageIdx > -1) {
    selectedImages.splice(currentImageIdx, 1)
    li.className = ''
  } else {
    selectedImages.push(index)
    li.className = 'checked'
  }

  if (selectedImages.length > 0) {
    imageRemove.removeAttribute('disabled')
  } else {
    imageRemove.setAttribute('disabled', true)
  }
}

window.deleteCheckedImages = function() {
  const iamgesInfo = s3.getImagesInfo()

  for (let i = 0; i < iamgesInfo.length; i++) {
    if (selectedImages.indexOf(iamgesInfo[i].index) > -1) {
      iamgesInfo[i].delete()
      i--
    }
  }

  selectedImages = []
}

window.setImageList = function() {
  if (imageList.length > 0) {
    imageWrapper.style.display = 'flex'
  } else {
    imageWrapper.style.display = 'none'
  }

  let list = ''
  let size = 0

  for (let i = 0, image, fixSize; i < imageList.length; i++) {
    image = imageList[i]
    fixSize = (image.size / 1000).toFixed(1) * 1

    list +=
      '<li id="img_' +
      image.index +
      '">' +
      '<div onclick="checkImage(' +
      image.index +
      ')">' +
      '<div><img src="' +
      image.src +
      '"></div>' +
      '</div>' +
      '<a href="javascript:void(0)" onclick="setImage(\'select\',' +
      image.index +
      ')" class="image-size">' +
      fixSize +
      'KB</a>' +
      '<div class="image-check"><svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg></div>' +
      '</li>'

    size += fixSize
  }

  imageSize.innerText = size.toFixed(1) + 'KB'
  imageTable.innerHTML = list
}

s3.onImageUpload = function(
  targetImgElement,
  index,
  state,
  imageInfo,
  remainingFilesCount
) {
  console.log('imageInfo', imageInfo)

  if (state === 'delete') {
    imageList.splice(findIndex(imageList, index), 1)
  } else {
    if (state === 'create') {
      const image = s3.getImagesInfo()[findIndex(s3.getImagesInfo(), index)]
      imageList.push(image)
    } else {
      // update
    }
  }

  if (remainingFilesCount === 0) {
    console.log('imageList', imageList)
    setImageList(imageList)
  }
}

window.ke_setOptions2 = function() {
  s3.setOptions(newOption)
}

window.ke_setOptions3 = function() {
  s3.setOptions(newOption2)
}
window.ke_setOptions4 = function() {
  s3.setOptions(newOption3)
}

window.ke_insertImage = function() {
  s3.insertImage(document.getElementById('ke_files').files)
}

window.ke_destroy2 = function() {
  s3.destroy()
}

window.ke_create3 = function() {
  s3 = KothingEditor.create('editor3', {})
}

/* ================================================================= */
// Editor4
let s4 = editor.create(document.getElementsByName('editor4')[0], {
  toolBarItem: [
    [
      plugins.formatBlock,
      'align',
      'horizontalRule',
      'list',
      'table',
      'codeView',
      plugins.image,
      plugins.video,
      plugins.link,
      plugins.link,
      plugins.fontColor,
      plugins.hiliteColor,
      plugins.fontSize,
    ],
    [
      {
        // plugin's name attribute
        name: 'custom_plugin_submenu',
        // name of the plugin to be recognized by the toolbar.
        // It must be the same as the name attribute of the plugin
        dataCommand: 'custom_plugin_submenu',
        // button's class ("ke-btn" class is registered, basic button click css is applied.)
        buttonClass: 'ke-btn',
        // HTML title attribute
        title: 'Custom plugin of the submenu',
        // 'submenu' or 'dialog' or '' (command button)
        dataDisplay: 'submenu',
        // HTML to be append to button
        innerHTML: '<i class="ke-icon-checked"></i>',
      },
    ],
  ],
  mode: 'balloon',
  lang: zh_cn,
  width: '100%',
  popupDisplay: 'local',
  // iframe: true,
  // maxCharCount: 300,
  // resizingBar: false
  // showPathLabel:false
  charCounter: true,
  formats: [
    'h1',
    'h4',
    'pre',
    'p',
    'blockquote',
    {
      tag: 'div',
      class: '__ke__aaa',
      title: 'Normal (DIV)',
      command: 'replace',
    },
  ],
})
window.ke_destroy4 = function() {
  s4.destroy()
}

window.ke_create4 = function() {
  s4 = KothingEditor.create(document.getElementsByName('editor4')[0], {})
}

/* ================================================================= */
let s5
window.ke_create5 = function() {
  const win = window.open()
  document.querySelectorAll('link').forEach(function(linkNode) {
    win.document.write(linkNode.outerHTML)
  })
  win.document.write(
    '<textarea name="editor5" id="editor5" style="width: 1080px; height: 200px;"></textarea>'
  )
  s5 = KothingEditor.create(win.document.querySelector('#editor4'), {
    plugins: plugins,
    toolBarItem: [
      [
        'undo',
        'redo',
        'removeFormat',
        'font',
        'fontSize',
        'formatBlock',
        'bold',
        'underline',
        'italic',
        'strike',
        'subscript',
        'superscript',
        'fontColor',
        'hiliteColor',
        'outdent',
        'indent',
        'align',
        'horizontalRule',
        'list',
        'table',
        'link',
        'image',
        'video',
        'fullScreen',
        'showBlocks',
        'codeView',
        'preview',
        'print',
        'save',
      ],
    ],
    width: '100%',
    imageWidth: 300,
    mode: 'classic',
    // toolbarWidth: 800,
    height: 'auto',
    // callBackSave: (contents) => {
    //     console.log('callback')
    // }
  })
}
