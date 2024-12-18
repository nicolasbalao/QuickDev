<script setup lang="ts">
import type { FormResolverOptions, FormSubmitEvent } from '@primevue/forms'
import { reactive, ref, type Ref } from 'vue'
import { Form } from '@primevue/forms'
import { InputText, Message, Button, Textarea, useToast } from 'primevue'
import { createProject } from '../services/projectService'

const emit = defineEmits(['onCancel', 'onSuccess'])

const project = reactive({
  name: '',
  description: '',
})

const isLoading: Ref<boolean> = ref(false)
const toast = useToast()

const resolver = ({ values }: FormResolverOptions) => {
  const errors: any = {}

  if (!values.name) {
    errors.name = [{ message: 'Project Name is required' }]
  }

  return {
    errors,
  }
}

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
    isLoading.value = false
    toast.add({
      severity: 'error',
      summary: 'Http error',
      detail: err instanceof Error ? err.message : 'Error while creating new project',
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
    :initial-values="project"
    :resolver
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
