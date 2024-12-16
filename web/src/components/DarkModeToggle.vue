<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

let isDarkMode: Ref<boolean> = ref(false)

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('app-dark')
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div class="flex items-center gap-2">
    <button @click="toggleDarkMode">
      <span v-if="isDarkMode" class="pi pi-sun animate-flip"></span>
      <span v-else class="pi pi-moon animate-flip"></span>
    </button>
  </div>
</template>
