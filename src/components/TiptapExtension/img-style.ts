import {
  getMarkAttributes,
  Mark,
  mergeAttributes,
} from '@tiptap/core'

export interface ImgStyleOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imgStyle: {
      /**
       * Remove spans without inline style attributes.
       */
      removeEmptyImgStyle: () => ReturnType,
    }
  }
}

export const imgStyle = Mark.create<ImgStyleOptions>({
  name: 'imgStyle',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img',
        getAttrs: element => {
          const hasStyles = (element as HTMLElement).hasAttribute('style')

          if (!hasStyles) {
            return false
          }

          return {}
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      removeEmptyImgStyle: () => ({ state, commands }) => {
        const attributes = getMarkAttributes(state, this.type)
        const hasStyles = Object.entries(attributes).some(([, value]) => !!value)

        if (hasStyles) {
          return true
        }

        return commands.unsetMark(this.name)
      },
    }
  },

})
