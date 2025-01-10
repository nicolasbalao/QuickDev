<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheSideBar from '../components/TheSideBar.vue'
</script>

<template>
  <main class="flex h-screen w-screen flex-col">
    <TheHeader />
    <div class="flex h-full flex-1 gap-8 overflow-hidden">
      <TheSideBar />
      <div class="flex h-full grow flex-col overflow-y-auto">
        <div class="h-full w-full pb-2 pr-6 pt-8">
          <slot></slot>
        </div>
      </div>
    </div>
  </main>
</template>
