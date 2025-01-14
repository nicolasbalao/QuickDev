<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { formatDurationHHMMSS } from '../helpers/duration_helper'
import type { Project } from '../interfaces/project-interface'
import { useWorkSessionStore } from '../stores/work_session.store'
import { projectDetailsById } from '../services/projectService'

const workSessionStore = useWorkSessionStore()
const activeWorkSessionProject: Ref<Project | null> = ref(null)

watch(
  () => workSessionStore.activeWorkSession,
  async () => {
    if (workSessionStore.activeWorkSession) {
      activeWorkSessionProject.value = await projectDetailsById(
        workSessionStore.activeWorkSession.projectId,
      )
    } else {
      activeWorkSessionProject.value = null
    }
  },
)
</script>

<template>
  <template v-if="activeWorkSessionProject">
    <div
      class="flex items-center gap-2"
      v-tooltip.bottom="`Work session for the project ${activeWorkSessionProject!.name}`"
    >
      <div class="h-2 w-2 rounded bg-primary"></div>
      <RouterLink :to="{ name: 'project', params: { slug: activeWorkSessionProject!.slug } }">{{
        formatDurationHHMMSS(workSessionStore.activeWorkSessionTimer)
      }}</RouterLink>
    </div>
  </template>
</template>
