<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { reactive, watch } from 'vue'
import { z } from 'zod'
import { InputText, Message, useToast, Button, InputGroup, InputGroupAddon } from 'primevue'
import { LoadingProjectStore, useProjectStore } from '../stores/project.store'

const emit = defineEmits(['onCancel', 'onSuccess'])

const cloneForm = reactive({
  url: '',
})

const projectStore = useProjectStore()
const toast = useToast()

watch(
  () => projectStore.error,
  () => {
    if (projectStore.error && projectStore.error.type === LoadingProjectStore.CLONNING) {
      toast.add({
        severity: 'error',
        summary: 'Http error: CLONNING',
        detail: projectStore.error.message,
        life: 3_000,
      })
    }
  },
)

const resolver = zodResolver(
  z.object({
    url: z
      .string()
      .min(1, { message: 'Url is required' })
      .url({ message: 'Url is not a valide url' }),
  }),
)
const onFormSubmit = async (form: FormSubmitEvent) => {
  if (!form.valid) {
    return
  }

  let url = form.states['url'].value

  const success = await projectStore.handleCloneRepo(url)

  if (!success) {
    return
  }

  toast.add({
    severity: 'success',
    summary: 'Project clonned',
    detail: `Project at ${url} was clonned successfully`,
  })

  emit('onSuccess')
}
</script>

<template>
  <Form
    v-slot="$form"
    :initial-values="cloneForm"
    :resolver
    @submit="onFormSubmit"
    class="flex flex-col gap-8"
  >
    <div class="flex flex-col gap-1">
      <label for="url">Repository url *</label>
      <InputGroup>
        <InputGroupAddon>www</InputGroupAddon>
        <InputText name="url" type="text" id="url" size="small" fluid autofocus />
      </InputGroup>
      <Message v-if="$form.url?.invalid" severity="error" size="small" variant="simple">
        {{ $form.url.error?.message }}
      </Message>
    </div>

    <div class="flex gap-4">
      <Button
        type="button"
        severity="secondary"
        label="Cancel"
        class="flex-grow"
        @click="$emit('onCancel')"
        :disabled="projectStore.loading === LoadingProjectStore.CLONNING"
        size="small"
      />
      <Button
        type="submit"
        label="Clone"
        class="flex-grow"
        :loading="projectStore.loading === LoadingProjectStore.CLONNING"
        size="small"
      />
    </div>
  </Form>
</template>
