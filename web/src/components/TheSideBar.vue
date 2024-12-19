<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { LoadingProjectStore, useProjectStore } from '../stores/project.store'
import { useToast } from 'primevue'

const projectStore = useProjectStore()
const toast = useToast()

watch(
  () => projectStore.error,
  () => {
    toast.add({ severity: 'error', summary: 'Http error', detail: projectStore.error })
  },
)

onMounted(() => {
  projectStore.lazyLoadingProjects()
})
</script>
<template>
  <aside
    class="w-80 border-r border-solid px-4 pt-8 text-surface-700 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-300"
  >
    <h1 class="font-semibold">Projects</h1>

    <div v-if="projectStore.loading === LoadingProjectStore.FETCHING">Is Loading...</div>
    <template v-else>
      <div v-if="projectStore.projects" class="mt-5">
        <ul class="flex flex-col gap-2">
          <li
            v-for="project in projectStore.projects"
            class="flex items-center gap-2 text-sm hover:cursor-pointer"
          >
            <span v-if="project.repoUrl" class="pi pi-github"></span>
            <span v-else class="pi pi-folder"></span>
            <RouterLink :to="`/projects/${project.slug}`" class="hover:underline">{{
              project.name
            }}</RouterLink>
          </li>
        </ul>
      </div>
    </template>
  </aside>
</template>
