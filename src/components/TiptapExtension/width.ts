import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export type WidthOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    width: {
      setWidth: (width: any) => ReturnType,
      
      unsetWidth: () => ReturnType,
    }
  }
}

 const Width = Extension.create<WidthOptions>({
  name: 'width',

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
          width: {
            default: null,
            parseHTML: element => element.style.width?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.width) {
                return {}
              }
              return {
                style: `width: ${attributes.width}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setWidth: width => ({ chain }) => {

      return chain()
          .setMark('textStyle', { width })
          .run()
      },
      unsetWidth: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { width: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})


export default Width