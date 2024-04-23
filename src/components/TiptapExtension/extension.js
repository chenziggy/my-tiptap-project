import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Select from './Select.vue'
import Input from './Input.vue'

const VueSelect =  Node.create({
  name: 'select',
  group: 'inline',
  content: 'inline*',
  inline: true,
  selectable: false,
  atom: true,
  addAttributes() {
    return {
      width: {
        default: '200px',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'vue-select',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['vue-select', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Select)
  },
})

const VueInput =  Node.create({
  name: 'input',
  group: 'inline',
  content: 'inline*',
  inline: true,
  selectable: false,
  atom: true,
  addAttributes() {
    return {
      width: {
        default: '200px',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'vue-input',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['vue-input', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Input)
  },
})

export {
  VueSelect,
  VueInput
}