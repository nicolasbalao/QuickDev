<script setup lang="ts">
import { ref } from 'vue'
import DarkModeToggle from './DarkModeToggle.vue'
import { Dialog } from 'primevue'
import ProjectFormCreation from './ProjectFormCreation.vue'

const visible = ref(false)
</script>

<template>
  <header
    class="flex items-center justify-end border-b border-solid bg-surface-50 p-5 dark:border-surface-700 dark:bg-surface-950"
  >
    <button
      class="mr-8 flex items-center gap-2 rounded-lg border border-solid p-2 text-sm text-slate-600 shadow-sm dark:border-primary dark:text-primary"
      @click="visible = true"
    >
      <span class="pi pi-folder-plus text-slate-600 dark:text-primary"></span>
      <span>New project</span>
    </button>
    <DarkModeToggle />
    <Dialog v-model:visible="visible" modal header="Create new project">
      <ProjectFormCreation
        @onCancel="visible = false"
        @onSuccess="visible = false"
      ></ProjectFormCreation>
    </Dialog>
  </header>
</template>
