<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div
    class="h-full overflow-y-hidden rounded-md border border-solid border-surface-100 pl-4 pt-4 text-sm dark:border-surface-700"
  >
    <h3 class="mb-2 font-semibold">{{ title }}</h3>
    <div class="h-full overflow-y-auto pb-2">
      <slot></slot>
    </div>
  </div>
</template>
