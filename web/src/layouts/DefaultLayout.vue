<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheSideBar from '../components/TheSideBar.vue'
</script>

<template>
  <main class="flex h-screen w-screen flex-col">
    <TheHeader />
    <div class="flex flex-1 gap-8">
      <TheSideBar class="" />
      <div class="mt-8">
        <slot></slot>
      </div>
    </div>
  </main>
</template>
