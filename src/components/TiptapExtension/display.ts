import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

export type DisplayOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    display: {
      setDisplay: (display: any) => ReturnType,
      
      unsetDisplay: () => ReturnType,
    }
  }
}

 const Display = Extension.create<DisplayOptions>({
  name: 'display',

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
          display: {
            default: null,
            parseHTML: element => element.style.display?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.display) {
                return {}
              }
              return {
                style: `display: ${attributes.display}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setDisplay: display => ({ chain }) => {

      return chain()
          .setMark('textStyle', { display })
          .run()
      },
      unsetDisplay: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { display: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})


export default Display