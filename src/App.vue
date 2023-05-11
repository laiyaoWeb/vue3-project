<script setup lang="ts">
// import '@/mq/mqttClient'
import Layout from './components/Layout.vue'
import HomeView from './pages/home/index.vue'
</script>

<template>
  <div class="app-container">
    <HomeView />
    <!-- <Layout></Layout> -->
  </div>
</template>

<style>
.app-container {
  width: 100%;
  height: 100%;
  user-select: none;
}
</style>
