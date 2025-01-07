<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheSideBar from '../components/TheSideBar.vue'
</script>

<template>
  <main class="flex h-screen w-screen flex-col overflow-y-hidden">
    <TheHeader />
    <div class="flex flex-1 gap-8">
      <TheSideBar class="" />
      <div class="max-h-screen w-full overflow-y-scroll">
        <div class="h-full w-full pb-2 pr-6 pt-8">
          <slot></slot>
        </div>
      </div>
    </div>
  </main>
</template>
