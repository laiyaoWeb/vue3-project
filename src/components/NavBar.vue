<template>
  <div class="nav-bar">
    <el-switch v-model="state" @change="toggle"></el-switch>

    <button
      class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 border-none cursor-pointer"
    >
      Click me
    </button>

    <div class="i-ic-baseline-add-circle text-3xl bg-green-500" />
    <div class="i-ic-baseline-playlist-add-check-circle text-3xl bg-green-500"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useDark } from '@/hooks/useDark'
const { toggle } = useDark()
const state = ref(true)
// const switchChange = function(bool: string| number | boolean) {
//   console.log(bool);
// }
</script>
<style></style>
