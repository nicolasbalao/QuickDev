<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms'
import { reactive, watch } from 'vue'
import { Form } from '@primevue/forms'
import {
  InputText,
  Message,
  Button,
  Textarea,
  useToast,
  RadioButton,
  RadioButtonGroup,
} from 'primevue'
import { type CreateProjectDto } from '../services/projectService'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { LoadingProjectStore, useProjectStore } from '../stores/project.store'

const emit = defineEmits(['onCancel', 'onSuccess'])

const project = reactive({
  name: '',
  description: '',
  where: 'LOCAL',
})

const toast = useToast()
const projectStore = useProjectStore()

watch(
  () => projectStore.error,
  () => {
    if (projectStore.error && projectStore.error.type === LoadingProjectStore.CREATING) {
      toast.add({
        severity: 'error',
        summary: 'Http error',
        detail: projectStore.error.message,
        life: 3_000,
      })
    }
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
    where: z.enum(['LOCAL', 'GITHUB'] as const),
  }),
)

const onFormSubmit = async (form: FormSubmitEvent) => {
  if (!form.valid) {
    return
  }
  let formatData: CreateProjectDto = {
    name: form.states['name'].value,
    description: form.states['description'].value,
    where: form.states['where'].value,
  }

  const success = await projectStore.handleCreateProject(formatData)

  if (!success) {
    return
  }

  toast.add({
    severity: 'success',
    summary: 'Project created',
    detail: `Project ${formatData.name} was created successfully`,
    life: 3_000,
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
      <InputText name="name" type="text" fluid id="name" autofocus size="small" />
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

    <div class="mb-4">
      <h1 class="mb-2">Where</h1>
      <RadioButtonGroup name="where" class="flex w-full gap-4">
        <div
          class="flex flex-grow items-center gap-4 rounded-md border border-solid p-4 hover:cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800"
        >
          <RadioButton input-id="local" value="LOCAL" />
          <label for="local" class="flex items-center gap-2 hover:cursor-pointer">
            <span class="pi pi-desktop" style="font-style: 1.9rem"></span>
            <span>Git local</span>
          </label>
        </div>

        <div
          class="flex flex-grow items-center gap-4 rounded-md border border-solid p-4 hover:cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800"
        >
          <RadioButton input-id="github" value="GITHUB" />
          <div class="flex items-center gap-2">
            <label for="github" class="flex items-center gap-2 hover:cursor-pointer">
              <span class="pi pi-github" style="font-size: 1.3rem"></span>
              <span>Github</span>
            </label>
          </div>
        </div>
      </RadioButtonGroup>
    </div>

    <div class="flex gap-4">
      <Button
        type="button"
        severity="secondary"
        label="Cancel"
        class="flex-grow"
        @click="$emit('onCancel')"
        :disabled="projectStore.loading === LoadingProjectStore.CREATING"
        size="small"
      />
      <Button
        type="submit"
        label="Create"
        class="flex-grow"
        :loading="projectStore.loading === LoadingProjectStore.CREATING"
        size="small"
      />
    </div>
  </Form>
</template>
