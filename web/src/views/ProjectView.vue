<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue'
import { useProjectStore } from '../stores/project.store'
import { useRoute } from 'vue-router'
import type { Project } from '../interfaces/project-interface'
import { Timeline } from 'primevue'
import { formatDate, timeAgo } from '../helpers/date_helper'

const route = useRoute()

const projectStore = useProjectStore()

const project: Ref<Project | undefined> = ref(undefined)

watch(
  () => route.params.slug,
  async () => {
    project.value = await projectStore.fetchProjectBySlug(route.params.slug as string)
  },
)

onMounted(async () => {
  project.value = await projectStore.fetchProjectBySlug(route.params.slug as string)
})
</script>

<template>
  <section v-if="project" class="flex h-full w-full flex-col gap-4">
    <div class="flex w-full items-center justify-between">
      <h1>Project {{ project.name }}</h1>

      <div class="flex items-center gap-8">
        <template v-if="project.repoUrl">
          <a :href="project.repoUrl" class="flex items-center gap-2" target="_blank">
            <span class="pi pi-github"></span>
            <span>Github</span>
          </a>
        </template>

        <a
          :href="`vscode://vscode-remote/wsl+Ubuntu/${project.localPath}`"
          class="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
        >
          <span class="pi pi-pen-to-square"></span>
          <span>Vscode</span>
        </a>
      </div>
    </div>
    <div class="flex-grow">
      <div class="bg-red-50">Commits</div>
      <template v-if="project.commits">
        <Timeline :value="project.commits" align="alternate">
          <template #opposite="slotProps">
            <span class="text-sm text-surface-400"
              >Commits on {{ formatDate(slotProps.item.date) }}</span
            >
          </template>
          <template #content="slotProps">
            <div class="flex flex-col gap-2 rounded-md border border-solid border-surface-100 p-4">
              <span class="text-sm text-surface-800">{{ slotProps.item.message }}</span>
              <span class="text-sm text-surface-300"
                >{{ slotProps.item.author }} commited {{ timeAgo(slotProps.item.date) }} agos</span
              >
            </div>
          </template>
        </Timeline>
      </template>
    </div>
  </section>
</template>
