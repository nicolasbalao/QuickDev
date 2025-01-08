<script setup lang="ts">
import { Textarea, Button } from 'primevue'
import { ref, type Ref } from 'vue'
import { useWorkSessionStore } from '../stores/work_session.store'

const emit = defineEmits(['onCancel', 'onSuccess'])
const workSessionStore = useWorkSessionStore()

const note: Ref<string> = ref('')

const onSubmit = async () => {
  const isStoped = await workSessionStore.stopSession({
    workSessionId: workSessionStore.activeWorkSession!.id,
    note: note.value,
  })

  if (isStoped) {
    emit('onSuccess')
  }
}
</script>

<template>
  <form class="flex flex-col gap-8">
    <div class="flex flex-col gap-1">
      <label for="notes">Note</label>
      <Textarea v-model="note" rows="5" cols="20" id="note" required />
    </div>
    <div class="flex gap-4">
      <Button
        type="button"
        severity="secondary"
        label="Cancel"
        class="flex-grow"
        @click="$emit('onCancel')"
        size="small"
      />
      <Button type="submit" label="Stop" class="flex-grow" size="small" @click="onSubmit" />
    </div>
  </form>
</template>
