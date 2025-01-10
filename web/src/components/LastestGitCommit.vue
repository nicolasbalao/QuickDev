<script setup lang="ts">
import { Timeline } from 'primevue'
import { timeAgo } from '../helpers/date_helper'
import type { GitCommit } from '../interfaces/git_commit_interface'
import WidgetContainer from './WidgetContainer.vue'

defineProps<{ commits: GitCommit[] }>()
</script>

<template>
  <WidgetContainer title="Latest changes">
    <template v-if="commits.length > 0">
      <Timeline :value="Object.values(commits)">
        <template #content="slotProps">
          <div class="flex flex-col gap-1">
            <span class="text-sm text-surface-400">{{ timeAgo(slotProps.item.date) }} ago</span>

            <a
              v-if="slotProps.item.url"
              :href="slotProps.item.url"
              v-tooltip.bottom="{
                value: slotProps.item.message,
                showDelay: 500,
                pt: {
                  text: '!text-sm',
                },
              }"
              class="line-clamp-2 text-left text-sm text-surface-600 hover:cursor-pointer hover:underline dark:text-surface-300"
              >{{ slotProps.item.message }}</a
            >
            <span
              v-else
              v-tooltip.bottom="{
                value: slotProps.item.message,
                showDelay: 500,
                pt: {
                  text: '!text-sm',
                },
              }"
              class="line-clamp-2 text-left text-sm text-surface-600 dark:text-surface-300"
            >
              {{ slotProps.item.message }}
            </span>
            <span class="mb-2 text-xs text-surface-400 dark:text-surface-400">{{
              slotProps.item.author
            }}</span>
          </div>
        </template>
      </Timeline>
    </template>
    <template v-else>
      <div class="flex h-full w-full items-center justify-center">
        <span>No commits</span>
      </div>
    </template>
  </WidgetContainer>
</template>

<style>
.p-timeline-event-opposite {
  width: 0;
  display: none !important;
}
</style>
