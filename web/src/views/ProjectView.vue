<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue'
import { useProjectStore } from '../stores/project.store'
import { useRoute } from 'vue-router'
import type { Project } from '../interfaces/project-interface'

const route = useRoute()

const projectStore = useProjectStore()

const project: Ref<Project | undefined> = ref(undefined)

watch(
  () => route.params.slug,
  () => {
    project.value = projectStore.findProjectBySlug(route.params.slug as string)
  },
)

onMounted(() => {
  project.value = projectStore.findProjectBySlug(route.params.slug as string)
})
</script>

<template>
  <section v-if="project" class="w-full">
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
          :href="`vscode://vscode-remote/wsl+Ubuntu/${project.path}`"
          class="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
        >
          <span class="pi pi-pen-to-square"></span>
          <span>Vscode</span>
        </a>
      </div>
    </div>
  </section>
</template>
