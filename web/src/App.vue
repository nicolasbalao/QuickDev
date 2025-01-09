<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue'
import { Toast } from 'primevue'
import { useWorkSessionStore } from './stores/work_session.store'
import { onMounted } from 'vue'

const workSessionStore = useWorkSessionStore()

onMounted(() => {
  workSessionStore.fetchActiveWorkSession()
})
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
  <Toast position="bottom-right" />
</template>
