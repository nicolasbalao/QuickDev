<script setup lang="ts">
import { Textarea, Button, Message, useToast } from 'primevue'
import { reactive, ref, type Ref } from 'vue'
import { useWorkSessionStore } from '../stores/work_session.store'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useProjectStore } from '../stores/project.store'

const emit = defineEmits(['onCancel', 'onSuccess'])
const workSessionStore = useWorkSessionStore()
const toast = useToast()
const projectStore = useProjectStore()

const stopSessionForm = reactive({
  note: '',
})

const resolver = zodResolver(
  z.object({
    note: z.string().min(1),
  }),
)

const onSubmit = async (form: FormSubmitEvent) => {
  if (!form.valid) {
    return
  }

  const isStoped = await workSessionStore.stopSession({
    workSessionId: workSessionStore.activeWorkSession!.id,
    note: form.values.note,
  })

  if (isStoped) {
    toast.add({
      severity: 'success',
      summary: 'Work session stoped',
      detail: 'Work session successfully stoped',
      life: 1_000,
    })
    projectStore.refreshCurrentProject()
    emit('onSuccess')
  } else {
    toast.add({
      severity: 'error',
      summary: 'Work session failed to stop',
      detail: workSessionStore.error,
      life: 1_000,
    })
  }
}
</script>

<template>
  <Form
    v-slot="$form"
    :initial-values="stopSessionForm"
    :resolver
    @submit="onSubmit"
    class="flex flex-col gap-4"
  >
    <div class="flex flex-col gap-1">
      <label for="notes">Note</label>
      <Textarea name="note" rows="5" cols="20" id="note" required autofocus />
      <Message v-if="$form.note?.invalid" severity="error" size="small" variant="simple">
        {{ $form.note.error?.message }}
      </Message>
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
      <Button type="submit" label="Stop" class="flex-grow" size="small" />
    </div>
  </Form>
</template>
