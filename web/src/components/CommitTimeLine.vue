<script setup lang="ts">
import { Timeline, Avatar } from 'primevue'
import { formatDate, timeAgo } from '../helpers/date_helper'
import type { GroupedGitCommit } from '../interfaces/git_commit_interface'

defineProps<{ commits: GroupedGitCommit }>()
</script>

<template>
  <Timeline :value="Object.values(commits)" align="alternate">
    <template #content="slotProps">
      <div class="flex flex-col gap-2">
        <span class="text-sm text-surface-400">
          Commits on {{ formatDate(slotProps.item[0].date) }}</span
        >

        <div
          v-for="commit of slotProps.item"
          class="mb-2 flex flex-col gap-2 rounded-md border border-solid border-surface-100 p-4"
        >
          <a
            v-if="commit.url"
            :href="commit.url"
            v-tooltip.bottom="{
              value: commit.message,
              showDelay: 500,
              pt: {
                text: '!text-sm',
              },
            }"
            class="line-clamp-2 text-sm text-surface-700 hover:cursor-pointer hover:underline"
            >{{ commit.message }}</a
          >
          <span
            v-else
            v-tooltip.bottom="{
              value: commit.message,
              showDelay: 500,
              pt: {
                text: '!text-sm',
              },
            }"
            class="line-clamp-2 text-sm text-surface-700"
          >
            {{ commit.message }}
          </span>

          <div class="flex items-center gap-2 text-xs">
            <Avatar image="https://github.com/shadcn.png" shape="circle" />
            <span class="text-xs text-surface-400"
              >{{ commit.author }} {{ timeAgo(commit.date) }} agos</span
            >
          </div>
        </div>
      </div>
    </template>
  </Timeline>
</template>

<style scoped>
.p-avatar {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
