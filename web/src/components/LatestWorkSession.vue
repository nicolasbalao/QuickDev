<script setup lang="ts">
import { formatDate } from '../helpers/date_helper'
import { formatHoursDuration } from '../helpers/duration_helper'
import type { WorkSession } from '../interfaces/work_session.interface'
import WidgetContainer from './WidgetContainer.vue'

defineProps<{ workSessions: WorkSession[] }>()
</script>

<template>
  <WidgetContainer title="Latest work sessions">
    <div class="divide-y divide-dashed">
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
  </WidgetContainer>
</template>
