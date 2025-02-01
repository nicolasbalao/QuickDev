<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { useProjectStore } from '../stores/project.store'
import { useRoute } from 'vue-router'
import LastestGitCommit from '../components/LastestGitCommit.vue'
import { Button, Dialog, useToast } from 'primevue'
import { useWorkSessionStore } from '../stores/work_session.store'
import StopWorkSessionForm from '../components/StopWorkSessionForm.vue'
import LatestWorkSession from '../components/LatestWorkSession.vue'
import { formatDate } from '../helpers/date_helper'
import { formatHoursDuration } from '../helpers/duration_helper'

const route = useRoute()

const projectStore = useProjectStore()
const workSessionStore = useWorkSessionStore()
const toast = useToast()

const stopDialogVisible: Ref<boolean> = ref(false)

const project = computed(() => projectStore.currentProject)

const toggleStopDialog = (event: any) => {
  stopDialogVisible.value = !stopDialogVisible.value
}

const startWorkSession = async (projectId: number) => {
  const isWorkSessionStarted = await workSessionStore.startSession(projectId)

  if (!isWorkSessionStarted) {
    toast.add({
      severity: 'error',
      summary: 'Work session failed to start',
      detail: workSessionStore.error,
      life: 1_000,
    })
  } else {
    toast.add({
      severity: 'success',
      summary: 'Work session started',
      detail: `Work sessions successfully started ${project.value!.name}`,
      life: 1_000,
    })
  }
}

watch(
  () => route.params.slug,
  async () => {
    await projectStore.fetchProjectDetailsBySlug(route.params.slug as string)
  },
)

onMounted(async () => {
  await projectStore.fetchProjectDetailsBySlug(route.params.slug as string)
})
</script>

<template>
  <section v-if="project" class="flex h-full w-full flex-col gap-8">
    <div class="flex w-full items-center justify-between">
      <h1>Project {{ project.name }}</h1>

      <div class="flex items-center gap-8">
        <template v-if="project.repoUrl">
          <a :href="project.repoUrl" class="flex items-center gap-2" target="_blank">
            <span class="pi pi-github"></span>
            <span>Github</span>
          </a>
        </template>

        <Button variant="outlined">
          <a
            :href="`vscode://vscode-remote/wsl+Ubuntu/${project.localPath}`"
            class="flex items-center gap-2"
          >
            <span class="pi pi-pen-to-square"></span>
            <span>Vscode</span>
          </a>
        </Button>

        <Button
          icon="pi pi-play"
          label="work"
          class="text-red-300"
          v-if="workSessionStore.activeWorkSession?.projectId !== project.id"
          :disabled="workSessionStore.activeWorkSession !== undefined"
          @click="startWorkSession(project.id)"
        />
        <Button v-else @click="toggleStopDialog" icon="pi pi-stop-circle" label="work" />

        <Dialog v-model:visible="stopDialogVisible" modal header="What Did You Achieve?">
          <StopWorkSessionForm
            @on-cancel="stopDialogVisible = false"
            @on-success="stopDialogVisible = false"
          />
        </Dialog>
      </div>
    </div>
    <div class="flex justify-between h-full">
      <div>
        <div
          class="flex items-center justify-between rounded-md border border-solid border-surface-100 p-4 shadow-sm"
        >
          <div class="mr-8">
            <h3 class="text-sm text-surface-400">Hours</h3>
            <p class="mb-3 text-xl">{{ formatHoursDuration(project.totalHoursSpent) }}</p>
            <p class="text-sm text-surface-400">from {{ formatDate(project.createdAt) }}</p>
          </div>
          <span class="pi pi-clock text-primary" style="font-size: 2.5rem"></span>
        </div>
      </div>
      <div class="flex h-full flex-col items-end overflow-y-hidden">
        <div class="flex h-full w-80 flex-col gap-4">
          <template v-if="project.workSessions">
            <LatestWorkSession :work-sessions="project.workSessions" />
          </template>

          <template v-if="project.latestCommits">
            <LastestGitCommit :commits="project.latestCommits" />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
