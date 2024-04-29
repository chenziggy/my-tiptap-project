<template>
  <VuetifyTiptap v-model="content" label="Title" rounded :min-height="200" :max-height="465" :max-width="900" :extensions="extensions" />
</template>

<script setup>

defineOptions({
  name: 'VuetifyProTiptap'
})
import { VuetifyTiptap, VuetifyViewer } from 'vuetify-pro-tiptap'
import 'vuetify-pro-tiptap/style.css'
import { BaseKit, Bold, Italic, Underline, Strike, Color, Highlight, Heading, Link, Image, Video, Table, Fullscreen, History } from 'vuetify-pro-tiptap'

const extensions = [
  BaseKit.configure({
    placeholder: {
      placeholder: 'Enter some text...'
    }
  }),
  Bold,
  Italic,
  Underline,
  Strike,
  Color,
  Highlight,
  Heading,
  Link,
  Image,
  Video,
  Table,
  Fullscreen,
  History
]
</script>
