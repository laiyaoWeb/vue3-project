<script setup lang="ts">
import { useMainStore } from '@/store/index'

import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const mainStore = useMainStore()

const updateName = () => {
  mainStore.$patch({
    name: 'updateName state'
  })
}
</script>

<template>
  <h1 class="test">{{ msg }}</h1>
  <div>用户名:{{ mainStore.name }}<br />长度:{{ mainStore.nameLength }}</div>
  <hr />
  <button @click="updateName">修改store中的name</button>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped lang="scss">
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.test {
  color: $test-color;
}
</style>
