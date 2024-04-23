import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export type TextIndentOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textIndent: {
      setTextIndent: (textIndent: any) => ReturnType,
      
      unsetTextIndent: () => ReturnType,
    }
  }
}

 const TextIndent = Extension.create<TextIndentOptions>({
  name: 'textIndent',

  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textIndent: {
            default: null,
            parseHTML: element => element.style.textIndent?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.textIndent) {
                return {}
              }
              return {
                style: `text-indent: ${attributes.textIndent}; display: inline-block`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setTextIndent: textIndent => ({ chain }) => {

      return chain()
          .setMark('textStyle', { textIndent })
          .run()
      },
      unsetTextIndent: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { textIndent: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})


export default TextIndent