import '@tiptap/extension-text-style'

import { Extension } from '@tiptap/core'

function styleObjectToCssString(styleObj) {
  return Object.entries(styleObj).map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase(); // 将驼峰转为短横线分隔
      return `${cssKey}: ${value};`;
  }).join(' ');
}

export type FontFamilyOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    style: {
      /**
       * Set the font family
       */
      setStyle: (style: any) => ReturnType,
      /**
       * Unset the font family
       */
      unsetStyle: () => ReturnType,
    }
  }
}

 const style = Extension.create<FontFamilyOptions>({
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
          style: {
            default: null,
            parseHTML: element => { console.log('parseHTML', element.attributes);
                return element.style},
            renderHTML: attributes => {
              console.log("🚀 ~ addGlobalAttributes ~ attributes:", attributes)
              if (!attributes.style) {
                return {}
              }
              // (element as HTMLElement).hasAttribute('style')
              const {style, ...before} = attributes
              const attrs = Object.assign({}, before, style)
              const css = styleObjectToCssString(attrs)
              return {
                style: css
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setStyle: style => ({ chain, state }) => {
      console.log("🚀 ~ addCommands ~ style:", style. state)

      return chain()
          .setMark('textStyle', { style })
          .run()
      },
      unsetStyle: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { style: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})


export default style