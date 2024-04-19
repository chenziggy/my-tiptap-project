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
import VueComponent from './TiptapExtension/extension'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import printHtmlToPDF from "print-html-to-pdf"
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import printJS from 'print-js'

const editor = useEditor({
content: 
// ` 
//   <p style="font-family: KaiTi">
//     嘻嘻
//   <span  style="font-family: KaiTi">昂昂哈</span>  AHHAHADSFSAFL; D;SFJ
//     <vue-component style="width: 400px" count="0"></vue-component>
//       <vue-component count="0"></vue-component>
//     </p> 

// `
`<span style="font-size: 16px">
  3</span>
`
,
  // editable: false,
  extensions: [
    StarterKit,
    // Paragraph,
    // Document,
    // Text,
    VueComponent,
    Underline,
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
  ],
})

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
  console.log(editor.value.$doc)
}


function getJSON() {
  console.log(editor.value.getJSON())
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
</style>