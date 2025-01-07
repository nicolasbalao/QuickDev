<script setup lang="ts">
import { Timeline } from 'primevue'
import { timeAgo } from '../helpers/date_helper'
import type { GitCommit } from '../interfaces/git_commit_interface'

defineProps<{ commits: GitCommit[] }>()
</script>

<template>
  <div
    class="flex flex-col gap-2 rounded-md border border-solid border-surface-100 p-4 dark:border-surface-700"
  >
    <span class="text-sm font-semibold">Latest changes</span>
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
          <span class="text-xs text-surface-400 dark:text-surface-400">{{
            slotProps.item.author
          }}</span>
        </div>
      </template>
    </Timeline>
  </div>
</template>

<style>
.p-timeline-event-opposite {
  width: 0;
  display: none !important;
}
</style>
