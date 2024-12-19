import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { Project } from '../interfaces/project-interface'
import { findAllProjects } from '../services/projectService'

export enum LoadingProjectStore {
  FETCHING,
  CREATING,
  NONE,
}

export const useProjectStore = defineStore('project', () => {
  let projects: Ref<Project[] | null> = ref(null)
  let loading: Ref<LoadingProjectStore> = ref(LoadingProjectStore.NONE)
  let error: Ref<string | null> = ref(null)

  const prepareActions = (loadingState: LoadingProjectStore) => {
    ;(loading.value = loadingState), (error.value = null)
  }

  const fetchProjects = async () => {
    prepareActions(LoadingProjectStore.FETCHING)
    try {
      projects.value = await findAllProjects()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error while fetching projects'
    } finally {
      loading.value = LoadingProjectStore.NONE
    }
  }

  const lazyLoadingProjects = async () => {
    if (!projects.value) await fetchProjects()
  }

  return {
    projects,
    loading,
    error,

    lazyLoadingProjects,
  }
})
