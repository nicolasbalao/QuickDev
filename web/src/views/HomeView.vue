<script setup lang="ts">
import ProjectFormCreation from '../components/ProjectFormCreation.vue'
</script>

<template>
  <main>
    <div
      class="mb-8 flex h-[250px] w-[500px] flex-col gap-4 rounded border border-solid p-4 dark:border-surface-700"
    >
      <div class="flex gap-4">
        <div class="h-[50px] w-[50px] rounded-full bg-surface-50 dark:bg-surface-900"></div>
        <div>
          <h1 class="text-xl">Title</h1>
          <p class="text-xs text-surface-500">subtitle</p>
        </div>
      </div>
      <div class="flex-1 rounded-md bg-surface-50 p-4 dark:bg-surface-900">content</div>
    </div>

    <ProjectFormCreation />
  </main>
</template>
