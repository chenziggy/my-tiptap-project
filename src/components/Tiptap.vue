<template>
  <div class="w-full h-full flex">
    <div class="w-40 h-full bg-gray-50 flex flex-col">
      <el-button type="primary" class="mt-4 !mx-2" @click="getHTML">html</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="getJSON">json</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="setOptions">setOptions</el-button>
      <el-button type="primary" class="mt-4 !mx-2" @click="toggleEditable">toggleEditable</el-button>

    </div>
    <editor-content class="flex-1" :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
 
import VueComponent from './TiptapExtension/extension'

const editor = useEditor({
  content: `<span>span</span><p  style="background: white">I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. I’m running Tiptap with Vue.js. 🎉         </p><vue-component count="0"></vue-component>
`,
  extensions: [
    StarterKit,
    Paragraph,
    Document,
    Text,
    VueComponent
  ],
})


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