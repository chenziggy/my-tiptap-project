<template>
  <node-view-wrapper class="vue-component">
    <div>
      hahaha
      <el-select style="width: 100px" v-model="value">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
      </el-select>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { defineProps } from 'vue';
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'


  const props= defineProps({})
  console.log("🚀 ~ props:", props)
  const value = ref()
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

<style >
.vue-component {
  margin: 1rem 0;
  /* position: relative; */
  display: inline-flex;
}


.content {
  margin-top: 1.5rem;
  padding: 1rem;
}
</style>