import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export type BorderBottomOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    borderBottom: {
      setBorderBottom: (borderBottom: any) => ReturnType,
      
      unsetBorderBottom: () => ReturnType,
    }
  }
}

 const BorderBottom = Extension.create<BorderBottomOptions>({
  name: 'borderBottom',

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
          borderBottom: {
            default: null,
            parseHTML: element => element.style.borderBottom?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.borderBottom) {
                return {}
              }
              return {
                style: `border-bottom: ${attributes.borderBottom}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setBorderBottom: borderBottom => ({ chain }) => {

      return chain()
          .setMark('textStyle', { borderBottom })
          .run()
      },
      unsetBorderBottom: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { borderBottom: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})


export default BorderBottom