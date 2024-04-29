<template>
  <div class="w-full h-full flex">
    <div class="w-40 h-full bg-gray-50 flex flex-col">
      <el-button type="primary" class="mt-4 !mx-2" @click="getHTML">html</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="getJSON">json</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setOptions">setOptions</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="toggleEditable">toggleEditable</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="printPDF">print-pdf</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="printHTML">print-html</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="toggleBold">toggleBold</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setFontFamily">setFontFamily</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="textColorRed">textColorRed</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="textColorBlue">textColorBlue</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })">insertTable</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setOneLineFull">one-line-full</el-button>
      <el-input v-model="fontSize"></el-input>
      <el-button type="primary" class="mt-4 !mx-2" @click="setFontSize">setFontSize</el-button>
      <el-input v-model="textIndent"></el-input>
      <el-button type="primary" class="mt-4 !mx-2" @click="setTextIndent">setTextIndent</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setBorderBottom">setBorderBottom</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="editor.commands.mergeOrSplit()
">mergeOrSplit</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setContentEditable">setContentEditable</el-button>
    </div>
    <div class="overflow-auto">
      <div class="m-10">
      <editor-content id="editor" class="page" :editor="editor"  @contextmenu.prevent="handleContextMenu"/>
    </div>
    <Transition name="zoom-in-top">
        <div
          v-show="contextMenuReference" ref="floatingRef" :style="{
            minWidth: 'max-content',
            ...floatingStyles,
            visibility: middlewareData.hide?.referenceHidden
              ? 'hidden'
              : 'visible',
          }" bg="[--el-bg-color-overlay]" border="1 [--el-border-color]" z-10 rounded py-1
        >
          <div>menu</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import {mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import {VueSelect, VueInput} from './TiptapExtension/extension'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import printJS from 'print-js'
import FontSize from './TiptapExtension/fontSize'
import TextIndent from './TiptapExtension/textIndent'
import Display from './TiptapExtension/display'
import TextAlignLast from './TiptapExtension/textAlignLast'
import Width from './TiptapExtension/width'
import BorderBottom from './TiptapExtension/borderBottom'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import {DivStyle} from './TiptapExtension/div-style'
import { autoPlacement, offset, useFloating } from '@floating-ui/vue'
import printHtmlToPDF from "print-html-to-pdf"

const Cell = TableCell.extend({
  
  renderHTML({ HTMLAttributes }) {
    return ['td', mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, contenteditable: true, resizable: true }), 0]
  },
})


const Header = TableHeader.extend({
  
  renderHTML({ HTMLAttributes }) {
    return ['th', mergeAttributes(this.options.HTMLAttributes, {...HTMLAttributes, contenteditable: true}), 0]
  },
})
const editor = useEditor({
  injectCSS: true,
  content: 
  `
  <table style="minWidth: 75px"><colgroup><col><col><col></colgroup><tbody><tr><th colspan="1" rowspan="1" contenteditable="true"><p>header1</p></th><th colspan="1" rowspan="1" contenteditable="true"><p>header2</p></th><th colspan="1" rowspan="1" contenteditable="true"><p>header3</p></th></tr><tr><td colspan="1" rowspan="1" contenteditable="true" resizable="true"><p>col1</p></td><td colspan="1" rowspan="1" contenteditable="true" resizable="true"><p>col2</p></td><td colspan="1" rowspan="1" contenteditable="true" resizable="true"><p>col3</p></td></tr><tr><td colspan="1" rowspan="1" contenteditable="true" resizable="true"><p></p></td><td colspan="1" rowspan="1" contenteditable="true" resizable="true"><p></p></td><td colspan="1" rowspan="1" contenteditable="true" resizable="true"><p></p></td></tr></tbody></table><h2 style="text-align: center"><span style="font-family: SimSun; font-size: 16pt">开发省厅甲市公安局二区公安局地字号派出所</span></h2><h1 style="text-align: center"><span style="font-family: SimSun; font-size: 22pt">传 唤 证</span></h1><p style="text-align: right"><span style="font-family: SimSun; font-size: 16pt">地公（地字号）传字〔2021〕9 号</span></p><p><span style="font-family: SimSun; font-size: 16pt; text-indent: 35pt; display: inline-block; text-align-last: justify; display: inline-block; width: 100%">根据《中华人民共和国刑事诉讼法》第一百一十九条之规</span></p><p><span style="font-family: SimSun; font-size: 16pt; text-align-last: justify; display: inline-block; width: 100%">定，兹传唤涉嫌 <vue-select width="200px"></vue-select> 罪的犯罪嫌疑人<vue-input width="180px"></vue-input></span></p><p><span style="font-family: SimSun; font-size: 16pt">（性别男，出生日期2021年05月13日，住址纷纷</span></p><p><span style="font-family: SimSun; font-size: 16pt">根据根据《中华人民共和国刑事诉讼法》第一百一十九条之规</span></p><p><span style="font-family: SimSun; font-size: 16pt">接受</span></p><p><span style="font-family: SimSun; font-size: 16pt">讯问。无正当理由拒不接受传唤的，可以依法拘传。</span></p><p></p><p></p><p style="text-align: right"><span style="font-family: SimSun; font-size: 12pt">开发省厅甲市公安局二区公安局地字号派出所</span></p><p style="text-align: right"><span style="font-family: SimSun; font-size: 16pt">二〇二二年一月二十一日</span></p><p></p>
  `,
  editable: true,
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
  extensions: [
    StarterKit,
    VueSelect,
    VueInput,
    Underline,
    Color,
    TextStyle,
    FontFamily,
    TextAlign.configure({
      types: ['paragraph', 'heading'],
      defaultAlignment: 'left',
    }),
    Table.configure({
      resizable: true,
      contentEditable: true,
      isContentEditable: true,
      isEditable: true
    }),
    TableRow.configure({
      resizable: true,
      contentEditable: true,
      isContentEditable: true,
      isEditable: true
    }),
    Header,
    Cell,
    FontSize,
    TextIndent,
    TextAlignLast,
    Display,
    Width,
    BorderBottom,
    Image,
    DivStyle
  ]
})


function setBorderBottom() {
  editor.value.chain().focus().setBorderBottom(`1px solid #000`).run()

}

function setOneLineFull() {
  editor.value.chain().focus().setWidth("100%").setDisplay('inline-block').setTextAlignLast('justify').run()
}

const fontSize = ref('')

const textIndent = ref('')
function setTextIndent() {
  editor.value.chain().focus().setTextIndent(`${textIndent.value}`).run()

}



function setFontSize() {
  console.log(fontSize.value)
  editor.value.chain().focus().setFontSize(`${fontSize.value}`).run()
}


function textColorBlue() {
  const res =editor.value.chain().focus().setColor("blue").run()
  
}


function textColorRed() {
  const res =editor.value.chain().focus().setColor('red').run()

}


function setFontFamily() {
  const res =editor.value.chain().focus().setFontFamily('SimSun').run()
}



function toggleBold() {
  editor.value
  .chain()
  .focus()
  .toggleBold()
  .run()
}


function printHTML () {
  printJS({
    printable: 'editor',
    type: 'html',
    css: 'style/print.css',
  })
}

function printPDF() {
  const pdfOption = {
     jsPDF: {
       unit: 'pt',
       format: 'a4',
     },
      spin: false,
      fileName: 'default'
   }
  printHtmlToPDF.print(document.getElementById('editor'), pdfOption)
}

function toggleEditable() {
  editor.value.setEditable(!editor.value.isEditable)
}

function setOptions() {
  editor.value?.setOptions({
    editorProps: {
      attributes: {
        class: 'w-30'
      }
    },
  })
}

function getHTML() {
  console.log(editor.value.getHTML())
}


function getJSON() {
  console.log(editor.value.getJSON())
}

function setContentEditable() {
  editor.value.chain().focus().resetAttributes({
    contentEditable: true
  })
}
onUnmounted(() => {
  editor.value.destroy()
})

// 菜单节点上下文菜单
const contextMenuReference = ref(null)
const floatingRef = ref(null)
const { floatingStyles, middlewareData } = useFloating(contextMenuReference, floatingRef, {
  transform: false,
  placement: 'bottom',
  middleware: [autoPlacement(), offset({
    crossAxis: 50,
  })],
})

const currentContextMenuNode = ref()
function handleContextMenu({ clientX, clientY }, data) {
  contextMenuReference.value = null
  nextTick(() => {
    contextMenuReference.value = {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          top: clientY,
          left: clientX,
          bottom: 0,
          right: 0,
        }
      },
    }
    currentContextMenuNode.value = data
  })
}

</script>

<style>
  .page {
    width: 21cm; /* A4 页面宽度 */
    height: 29.7cm; /* A4 页面高度 */
    /* margin: 2cm; 页边距 */
    padding: 1cm; /* 内容区域内边距 */
    /* border: 1px solid black; 边框 */
    font-family: Arial, sans-serif; /* 字体 */
    font-size: 12pt; /* 字号 */
    line-height: 2.4; /* 行间距 */
    text-align: justify; /* 段落两端对齐 */
  }

  .page p {
    font-size: 12pt;
  }

  .tiptap {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #000;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>