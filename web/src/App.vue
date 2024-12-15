<script setup lang="ts">
import { Button } from 'primevue'
</script>

<template>
  <h1 class="text-2xl text-red-700">Hello world tailwindcss</h1>
  <h3>Prime vue test</h3>
  <Button label="Verify" />
  <h3>Tailwind primevue</h3>
  <div class="flex flex-col gap-12">
    <div class="flex gap-6 flex-wrap">
      <div
        class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors"
      >
        primary
      </div>
      <div
        class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors"
      >
        highlight
      </div>
      <div
        class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors"
      >
        box
      </div>
    </div>
  </div>
  <h3>Test icons</h3>
  <div class="flex gap-3">
    <i class="pi pi-check"></i>
    <i class="pi pi-times"></i>
    <span class="pi pi-search"></span>
    <span class="pi pi-user"></span>
  </div>
</template>
