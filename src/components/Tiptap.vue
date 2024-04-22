<template>
  <div class="w-full h-full flex">
    <div class="w-40 h-full bg-gray-50 flex flex-col">
      <el-button type="primary" class="mt-4 !mx-2" @click="getHTML">html</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="getJSON">json</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setOptions">setOptions</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="toggleEditable">toggleEditable</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="printPDF">print-pdf</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="printHTML">print-html</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="consoleEdit">consoleEdit</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setContent">setContent</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="updateAttributes">updateAttributes</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="toggleBold">toggleBold</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setFontfamily">setFontfamily</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setStyle">setStyle</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setStyle1">setStyle1</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
">insertTable</el-button>
    

    </div>
    <div class="overflow-auto">
      <div class="m-10">
      <editor-content id="editor" class="page" :editor="editor" />
    </div>
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import {VueComponent} from './TiptapExtension/extension'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import printHtmlToPDF from "print-html-to-pdf"
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import printJS from 'print-js'
import style from './TiptapExtension/styleCommon'


const editor = useEditor({
  injectCSS: true,
  content: 
  `
  <h1>传 唤 证</h1>
          
  <p>根据《中华人民共和国刑事诉讼法》第一百一十九条之规</p>
  <p>定，兹传唤涉嫌	<vue-component></vue-component>
  的犯罪嫌疑人	(FZXYR01)[FZXYR_XM]
  </p>
  `,
  editable: true,
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
  extensions: [
    StarterKit,
    VueComponent,
    Underline,
    style,
    TextStyle,
    FontFamily,
    TextAlign.configure({
      types: ['paragraph'],
      defaultAlignment: 'left',
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ]
})


function setStyle1() {
  const res =editor.value.chain().focus().setStyle({ color: 'blue', fontWeight: 'bold', lineHeight: '100px', fontSize: '30px'}).run()
  
}


function setStyle() {
  const res =editor.value.chain().focus().setStyle({ color: 'red'}).run()

}


function setFontfamily() {
  const res =editor.value.chain().focus().setFontFamily('Corbel Light Italic').run()
}



function toggleBold() {
  editor.value
  .chain()
  .focus()
  .toggleBold()
  .run()
}
function updateAttributes() {
  const res = editor.value.can().chain().focus()
  .updateAttributes( {style: 'color: yellow'}).run()
}

function setContent() {
  editor.value.commands.setContent(`<hahaha count="0"></hahaha>`)
}

function consoleEdit() {
  console.log(editor.value)
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
    }
  })
}

function getHTML() {
  console.log(editor.value.getHTML())
}


function getJSON() {
  console.log(editor.value.getJSON())
}

onUnmounted(() => {
  editor.value.destroy()
})

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
</style>