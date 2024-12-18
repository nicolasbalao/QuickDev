<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue'
import { Toast } from 'primevue'
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
  <Toast />
</template>
