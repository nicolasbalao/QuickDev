<script setup lang="ts">
import { formatDate } from '../helpers/date_helper'
import { formatHoursDuration } from '../helpers/duration_helper'
import type { WorkSession } from '../interfaces/work_session.interface'

defineProps<{ workSessions: WorkSession[] }>()
</script>

<template>
  <section
    class="flex flex-col gap-2 rounded-md border border-solid border-surface-100 p-4 pb-0 text-sm dark:border-surface-700"
  >
    <h1 class="mb-2 font-semibold">Latest work sessions</h1>
    <div class="divide-y divide-dashed overflow-y-auto">
      <div v-for="workSession of workSessions" class="flex flex-col gap-1 py-2 pr-4">
        <span class="mr-2 text-surface-400">{{ formatDate(workSession.startedAt) }}</span>
        <span>{{ workSession.note }}</span>
        <div class="flex items-center justify-between">
          <span class="text-surface-400"
            >{{ formatDate(workSession.startedAt, { hour: '2-digit', minute: '2-digit' }) }} ->
            {{ formatDate(workSession.endedAt, { hour: '2-digit', minute: '2-digit' }) }}</span
          >

          <span>{{ formatHoursDuration(workSession.duration) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
