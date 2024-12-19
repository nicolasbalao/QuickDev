import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { Project } from '../interfaces/project-interface'
import { createProject, findAllProjects, type CreateProjectDto } from '../services/projectService'
import { contructErrorMessage } from '../helpers/contructErrorMessage.helper'

export enum LoadingProjectStore {
  FETCHING,
  CREATING,
  NONE,
}

export interface ProjectStoreErrror {
  type: LoadingProjectStore
  message: string
}

export const useProjectStore = defineStore('project', () => {
  let projects: Ref<Project[] | null> = ref(null)
  let loading: Ref<LoadingProjectStore> = ref(LoadingProjectStore.NONE)
  let error: Ref<ProjectStoreErrror | null> = ref(null)

  const prepareActions = (loadingState: LoadingProjectStore) => {
    ;(loading.value = loadingState), (error.value = null)
  }

  const fetchProjects = async () => {
    prepareActions(LoadingProjectStore.FETCHING)
    try {
      projects.value = await findAllProjects()
    } catch (err) {
      error.value = {
        type: LoadingProjectStore.FETCHING,
        message: contructErrorMessage(err, 'Error while fetching projects'),
      }
    } finally {
      loading.value = LoadingProjectStore.NONE
    }
  }

  const lazyLoadingProjects = async () => {
    if (!projects.value) await fetchProjects()
  }

  /**
   * MUTATIONS
   */

  const handleCreateProject = async (formData: CreateProjectDto): Promise<boolean> => {
    prepareActions(LoadingProjectStore.CREATING)
    try {
      const project = await createProject(formData)
      console.log('Project created', project)
      if (projects.value) {
        projects.value.push(project)
      } else {
        projects.value = [project]
      }
      console.log('Projects', projects.value)
      return true
    } catch (err) {
      error.value = {
        type: LoadingProjectStore.CREATING,
        message: contructErrorMessage(err, `Error while creating project ${formData.name} `),
      }
      return false
    } finally {
      loading.value = LoadingProjectStore.NONE
    }
  }

  return {
    projects,
    loading,
    error,

    lazyLoadingProjects,
    handleCreateProject,
  }
})
