import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export type TextAlignLastOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textAlignLast: {
      setTextAlignLast: (textAlignLast: any) => ReturnType,
      
      unsetTextAlignLast: () => ReturnType,
    }
  }
}

 const TextAlignLast = Extension.create<TextAlignLastOptions>({
  name: 'textAlignLast',

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
          textAlignLast: {
            default: null,
            parseHTML: element => element.style.textAlignLast?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.textAlignLast) {
                return {}
              }
              return {
                style: `text-align-last: ${attributes.textAlignLast}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setTextAlignLast: textAlignLast => ({ chain }) => {

      return chain()
          .setMark('textStyle', { textAlignLast })
          .run()
      },
      unsetTextAlignLast: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { textAlignLast: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})


export default TextAlignLast