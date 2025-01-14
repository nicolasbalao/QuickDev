<script setup lang="ts">
import { ref } from 'vue'
import DarkModeToggle from './DarkModeToggle.vue'
import { Dialog, Popover } from 'primevue'
import ProjectFormCreation from './ProjectFormCreation.vue'
import ProjectFormClone from './ProjectFormClone.vue'
import WorkSessionTimer from './WorkSessionTimer.vue'

const createNewProjectDialog = ref(false)
const clonningProjectDialog = ref(false)

const op = ref()
const togglePoppover = (event: any) => {
  op.value.toggle(event)
}
</script>

<template>
  <!-- TODO: See for refactoring with toolbar from primevue -->
  <header
    class="flex items-center justify-between border-b border-solid bg-surface-50 p-5 dark:border-surface-700 dark:bg-surface-950"
  >
    <div class="ml-4">
      <RouterLink :to="{ name: 'home' }" class="text-xl">QuickDev</RouterLink>
      <RouterLink :to="{ name: 'dev' }" class="ml-8">dev</RouterLink>
    </div>

    <div class="flex items-center gap-12">
      <WorkSessionTimer />
      <div class="flex items-center">
        <button
          class="mr-8 flex items-end gap-3 rounded-md border border-solid p-2 text-xs shadow-sm hover:bg-surface-100 dark:border-primary dark:text-primary dark:hover:bg-surface-900"
          @click="togglePoppover"
        >
          <span class="pi pi-plus" style="font-size: 0.9rem"></span>
          <span class="pi pi-sort-down-fill" style="font-size: 0.7rem"></span>
        </button>

        <Popover ref="op" class="min-w-48">
          <div class="flex flex-col gap-2">
            <button
              class="flex items-center gap-2 rounded-md p-2 text-sm text-slate-600 hover:bg-surface-50 dark:text-surface-50 dark:hover:bg-surface-800"
              @click="createNewProjectDialog = true"
            >
              <span class="pi pi-folder-plus text-slate-600 dark:text-surface-200"></span>
              <span>New project</span>
            </button>
            <button
              class="flex items-center gap-2 rounded-md p-2 text-sm text-slate-600 hover:bg-surface-50 dark:text-surface-200 dark:hover:bg-surface-800"
              @click="clonningProjectDialog = true"
            >
              <span class="pi pi-github text-slate-600 dark:text-surface-200"></span>
              <span>Clone project</span>
            </button>
          </div>
        </Popover>

        <DarkModeToggle />

        <!-- TODO: see for keep one dialog but with component injection <content> -->
        <Dialog v-model:visible="createNewProjectDialog" modal header="Create new project">
          <ProjectFormCreation
            @onCancel="createNewProjectDialog = false"
            @onSuccess="createNewProjectDialog = false"
          ></ProjectFormCreation>
        </Dialog>
        <Dialog v-model:visible="clonningProjectDialog" modal header="Clone a project">
          <ProjectFormClone
            @onCancel="clonningProjectDialog = false"
            @onSuccess="clonningProjectDialog = false"
          ></ProjectFormClone>
        </Dialog>
      </div>
    </div>
  </header>
</template>
