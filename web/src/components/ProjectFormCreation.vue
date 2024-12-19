<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms'
import { reactive, ref, watch, type Ref } from 'vue'
import { Form } from '@primevue/forms'
import { InputText, Message, Button, Textarea, useToast } from 'primevue'
import { createProject } from '../services/projectService'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useProjectStore } from '../stores/project.store'

const emit = defineEmits(['onCancel', 'onSuccess'])

const project = reactive({
  name: '',
  description: '',
})

const isLoading: Ref<boolean> = ref(false)
const toast = useToast()
const projectStore = useProjectStore()

watch(
  () => projectStore.error,
  () => {
    toast.add({ severity: 'error', summary: 'Http error', detail: projectStore.error })
  },
)

const resolver = zodResolver(
  z.object({
    name: z
      .string()
      .min(1, { message: 'Project name is required' })
      .max(100, { message: 'Project name must be less than 100 chars' })
      .regex(/^[a-zA-Z0-9._-]+$/, { message: 'Accepted char aA-zZ-09._-' })
      .regex(/^[^-_.]/, { message: "¨Project name can't start with -_." })
      .regex(/[^-_.]$/, { message: "Project name can't end with '.-_'" }),
    description: z.string().max(200, { message: "Description can't exeed 200 chars" }).optional(),
  }),
)

const onFormSubmit = async (form: FormSubmitEvent) => {
  if (!form.valid) {
    return
  }
  let formatData: { name: string; description?: string } = {
    name: form.states['name'].value,
    description: form.states['description'].value,
  }

  try {
    isLoading.value = true
    await createProject(formatData)
    isLoading.value = false
  } catch (err: any) {
    console.log('Err', err)
    isLoading.value = false

    let detail = err instanceof Error ? err.message : 'Error while creating new project'

    if (err.code === 'ERR_BAD_REQUEST') {
      detail = err.response.data.errors[0].message
    }

    toast.add({
      severity: 'error',
      summary: 'Http error',
      detail,
    })
    return
  }

  toast.add({
    severity: 'success',
    summary: 'Project created',
    detail: `Project ${formatData.name} was created successfully`,
  })
  emit('onSuccess')
}
</script>

<template>
  <Form
    v-slot="$form"
    :resolver
    :initial-values="project"
    @submit="onFormSubmit"
    class="flex flex-col gap-5"
  >
    <div class="flex flex-col gap-1">
      <label for="name">Project name *</label>
      <InputText name="name" type="text" fluid id="name" autofocus size="small" required />
      <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
        {{ $form.name.error?.message }}
      </Message>
    </div>

    <div class="flex flex-col gap-1">
      <label for="description">Project description</label>
      <Textarea
        rows="3"
        cols="20"
        name="description"
        id="description"
        style="resize: none"
      ></Textarea>
      <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
        {{ $form.description.error?.message }}
      </Message>
    </div>

    <div class="flex gap-4">
      <Button
        type="button"
        severity="secondary"
        label="Cancel"
        class="flex-grow"
        @click="$emit('onCancel')"
        :disabled="isLoading"
        size="small"
      />
      <Button type="submit" label="Create" class="flex-grow" :loading="isLoading" size="small" />
    </div>
  </Form>
</template>
