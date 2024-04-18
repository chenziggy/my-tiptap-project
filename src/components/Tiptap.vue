<template>
  <div class="w-full h-full flex">
    <div class="w-40 h-full bg-gray-50 flex flex-col">
      <el-button type="primary" class="mt-4 !mx-2" @click="getHTML">html</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="getJSON">json</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setOptions">setOptions</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="toggleEditable">toggleEditable</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="printHTML">print-js</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="consoleEdit">consoleEdit</el-button>

    </div>
    <div class="overflow-auto">
      <div class="page">
      <editor-content id="editor" class="subpage" :editor="editor" />
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


const editor = useEditor({
content: ` 
  <p  style="font-family: KaiTi">
    嘻嘻
  <span  style="font-family: KaiTi">昂昂哈</span>  
    <vue-component count="0"></vue-component>
      <vue-component count="0"></vue-component>
    </p> 

`,
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

function consoleEdit() {
  console.log(editor.value)
}

function printHTML() {
  const pdfOption = {
     jsPDF: {
       unit: 'px',
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
      border: 2px solid #ced4da;
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
      background-color: #f1f3f5;
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
      /* background-color: #adf; */
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


* {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}
.page {
    width: 21cm;
    min-height: 29.7cm;
    padding: 2cm;
    margin: 1cm auto;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.subpage {
    padding: 1cm;
    height: 256mm;
    outline: 2cm #dadada solid;
}

@page {
    size: A4;
    margin: 0;
}
@media print {
    .page {
        margin: 0;
        border: initial;
        border-radius: initial;
        width: initial;
        min-height: initial;
        box-shadow: initial;
        background: initial;
        page-break-after: always;
    }
}
</style>