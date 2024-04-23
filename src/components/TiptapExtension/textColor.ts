import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export type TextColorOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    style: {
      /**
       * Set the font family
       */
      setTextColor: (style: any) => ReturnType,
      /**
       * Unset the font family
       */
      unsetTextColor: () => ReturnType,
    }
  }
}

 const textColor = Extension.create<TextColorOptions>({
  name: 'style',

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
          textColor: {
            default: null,
            parseHTML: element => element.style.color?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.textColor) {
                return {}
              }
              return {
                style: `color: ${attributes.textColor.split(',').map((textColor: string) => CSS.escape(textColor.trim())).join(', ')}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setTextColor: textColor => ({ chain }) => {

      return chain()
          .setMark('textStyle', { textColor })
          .run()
      },
      unsetTextColor: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { textColor: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})


export default textColor