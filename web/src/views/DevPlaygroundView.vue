<script setup lang="ts">
import CommitTimeLine from '../components/CommitTimeLine.vue'
import LastestGitCommit from '../components/LastestGitCommit.vue'
import ProjectFormClone from '../components/ProjectFormClone.vue'
import ProjectFormCreation from '../components/ProjectFormCreation.vue'
import type { GitCommit } from '../interfaces/git_commit_interface'

let commits = {
  '2025-01-06': [
    {
      hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
      author: 'nicolas balao',
      url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
      message:
        'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
      date: '2025-01-06 18:49:46 +0100',
    },
    {
      hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
      author: 'nicolas balao',
      url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
      message:
        'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
      date: '2025-01-06 18:49:46 +0100',
    },
  ],
  '2024-12-26': [
    {
      hash: 'b3533be8338868f9de4b67eaeccbc8022ec4dc0d',
      url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
      author: 'nicolas balao',
      message: 'feat(web): dialog for adding a new project',
      date: '2024-12-26 17:33:47 +0100',
    },
  ],
  '2024-13-26': [
    {
      hash: 'b3533be8338868f9de4b67eaeccbc8022ec4dc0d',
      url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
      author: 'nicolas balao',
      message: 'feat(web): dialog for adding a new project',
      date: '2024-12-26 17:33:47 +0100',
    },
  ],
  '2025-04-06': [
    {
      hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
      url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
      author: 'nicolas balao',
      message:
        'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
      date: '2025-01-06 18:49:46 +0100',
    },
    {
      hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
      url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
      author: 'nicolas balao',
      message:
        'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
      date: '2025-01-06 18:49:46 +0100',
    },
    {
      hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
      url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
      author: 'nicolas balao',
      message:
        'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
      date: '2025-01-06 18:49:46 +0100',
    },
    {
      hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
      url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
      author: 'nicolas balao',
      message:
        'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
      date: '2025-01-06 18:49:46 +0100',
    },
  ],
}

let latestCommits: GitCommit[] = [
  {
    hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
    author: 'nicolas balao',
    url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
    message:
      'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
    date: '2025-01-06 18:49:46 +0100',
  },
  {
    hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
    author: 'nicolas balao',
    url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
    message:
      'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
    date: '2025-01-06 18:49:46 +0100',
  },
  {
    hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
    url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
    author: 'nicolas balao',
    message:
      'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
    date: '2025-01-06 18:49:46 +0100',
  },
  {
    hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
    url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
    author: 'nicolas balao',
    message:
      'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
    date: '2025-01-06 18:49:46 +0100',
  },
  {
    hash: 'b17540cf840f66704caa174cb6093b81137c50f4',
    url: 'https://github.com/nicolasbalao/snap-event/commit/4f48adb4c86ff3e2090cfdcd96619b98b2d04265',
    author: 'nicolas balao',
    message:
      'ref(test.txt): Add other date commit to the repository for testing the components and length with the frontend',
    date: '2025-01-06 18:49:46 +0100',
  },
]
</script>

<template>
  <main>
    <div class="flex flex-col gap-8">
      <div
        class="mb-8 flex h-[250px] w-[500px] flex-col gap-4 rounded border border-solid p-4 dark:border-surface-700"
      >
        <div class="flex gap-4">
          <div class="h-[50px] w-[50px] rounded-full bg-surface-50 dark:bg-surface-900"></div>
          <div>
            <h1 class="text-xl">Title</h1>
            <p class="text-xs text-surface-500">subtitle</p>
          </div>
        </div>
        <div class="flex-1 rounded-md bg-surface-50 p-4 dark:bg-surface-900">content</div>
      </div>

      <ProjectFormCreation />
      <ProjectFormClone />
      <CommitTimeLine :commits="commits" />
      <LastestGitCommit :commits="latestCommits" />
    </div>
  </main>
</template>
