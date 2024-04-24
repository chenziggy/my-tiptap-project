<template>
  <node-view-wrapper :style="`width: ${node.attrs.width };display: inline-block`">
    <el-input ref="input" v-model="value"  v-show="active" @blur="handleActive"/>
    <span v-show="!active" style="text-align: left ;border-bottom: 1px solid #000;width: 100%; display: inline-block" @click="active = true">{{ value }} </span>
  </node-view-wrapper>
</template>

<script setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'


const active = ref(true)
const value = ref('')
const input = ref()
watch(active, (val) => {
  nextTick(() => {
    if (val ) 
    input.value.focus()
  })
})

function handleActive() {
  if (value.value) {
    active.value = false
  }
}


</script>
