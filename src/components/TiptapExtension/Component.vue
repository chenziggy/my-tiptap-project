<template>
  <node-view-wrapper style="width: 200px;display: inline-block">
    <el-select v-if="active" size="small" v-model="value">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <span v-else style="text-align: left ;border-bottom: 1px solid #000;width: 100%; display: inline-block" @click="active = true">{{ value }}&nbsp&nbsp </span>
  </node-view-wrapper>
</template>

<script setup>
import { defineProps } from 'vue';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'


const active = ref(true)
const value = ref()

watch(value, (val) => {
  if (val) {
    active.value = false
  }
})
const props = defineProps({})
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style>
.vue-component {
  margin: 1rem 0;
  /* position: relative; */
  display: inline;
  width: 40px;
  height: 40px;

}


.content {
  margin-top: 1.5rem;
  padding: 1rem;
}
</style>