<template>
  <node-view-wrapper :style="`width: ${node.attrs.width };display: inline-block`">
    <el-input v-model="value"  v-if="active" @blur="active = false"/>
    <span v-else style="text-align: left ;border-bottom: 1px solid #000;width: 100%; display: inline-block" @click="active = true">{{ value }}&nbsp&nbsp </span>
  </node-view-wrapper>
</template>

<script setup>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'


const active = ref(true)
const value = ref('')

// watch(value, (val) => {
//   if (val) {
//     active.value = false
//   }
// })

</script>
