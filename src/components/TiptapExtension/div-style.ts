import {
  getMarkAttributes,
  Mark,
  mergeAttributes,
} from '@tiptap/core'

export interface DivStyleOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    divStyle: {
      /**
       * Remove spans without inline style attributes.
       */
      removeEmptyDivStyle: () => ReturnType,
    }
  }
}

export const DivStyle = Mark.create<DivStyleOptions>({
  name: 'divStyle',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div',
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
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      removeEmptyDivStyle: () => ({ state, commands }) => {
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
