import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { ProjectTemplates } from '../interfaces/project_template-interface'
import { fetchProjectTemplates } from '../services/projectTemplatesService'
import { contructErrorMessage } from '../helpers/contructErrorMessage.helper'

export const useProjectTemplateStore = defineStore('project_template', () => {
  let projectTemplates: Ref<ProjectTemplates[]> = ref([])
  let isLoading: Ref<boolean> = ref(false)
  let error: Ref<string | null> = ref(null)

  const getProjectTemplates = async () => {
    isLoading.value = true
    error.value = null

    try {
      projectTemplates.value = await fetchProjectTemplates()
    } catch (err) {
      error.value = contructErrorMessage(err, 'Error while fetching project templates')
    } finally {
      isLoading.value = false
    }
  }

  const lazyloadingProjectTemplates = async () => {
    if (projectTemplates.value.length === 0) await getProjectTemplates()
  }

  return {
    projectTemplates,
    isLoading,
    error,

    lazyloadingProjectTemplates,
  }
})
