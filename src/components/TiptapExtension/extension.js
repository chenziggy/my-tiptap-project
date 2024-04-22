import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './Component.vue'

const VueComponent=  Node.create({
  name: 'vueComponent',

  group: 'inline',
  content: 'inline*',
  inline: true,
  selectable: false,
  atom: true,
  addAttributes() {
    return {
      count: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'vue-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['vue-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})

import Div from './Div.vue'

const VueDiv=  Node.create({
  name: 'VueDiv',

  group: 'inline',
  content: 'inline*',
  inline: true,
  selectable: false,
  atom: true,
  addAttributes() {
    return {
      style: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'vue-div',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Div)
  },
})
export {
  VueComponent,
  VueDiv
}