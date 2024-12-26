import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { Project } from '../interfaces/project-interface'
import {
  cloneRepo,
  createProject,
  findAllProjects,
  projectDetails,
  type CreateProjectDto,
} from '../services/projectService'
import { contructErrorMessage } from '../helpers/contructErrorMessage.helper'

export enum LoadingProjectStore {
  FETCHING,
  FETCHING_SLUG,
  CREATING,
  CLONNING,
  NONE,
}

export interface ProjectStoreErrror {
  type: LoadingProjectStore
  message: string
}

export const useProjectStore = defineStore('project', () => {
  let projects: Ref<Project[]> = ref([])
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

  // TODO: see lazyloading
  const fetchProjectBySlug = async (slug: string): Promise<Project | undefined> => {
    prepareActions(LoadingProjectStore.FETCHING_SLUG)

    try {
      const project = await projectDetails(slug)

      if (project) {
        const projectIndex = projects.value.findIndex((p) => p.id === project.id)

        if (projectIndex === -1) {
          projects.value.push(project)
        } else {
          projects.value[projectIndex] = project
        }
      }

      return project
    } catch (err) {
      error.value = {
        type: LoadingProjectStore.FETCHING_SLUG,
        message: contructErrorMessage(err, `Error while fectching project with the slug: ${slug}`),
      }
      return undefined
    } finally {
      loading.value = LoadingProjectStore.NONE
    }
  }

  const lazyLoadingProjects = async () => {
    if (projects.value.length === 0) await fetchProjects()
  }

  const findProjectBySlug = (slug: string) => projects.value.find((p) => p.slug === slug)

  /**
   * MUTATIONS
   */

  const handleCreateProject = async (formData: CreateProjectDto): Promise<boolean> => {
    prepareActions(LoadingProjectStore.CREATING)
    try {
      const project = await createProject(formData)
      addProject(project)
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

  const handleCloneRepo = async (url: string): Promise<boolean> => {
    prepareActions(LoadingProjectStore.CLONNING)
    try {
      const project = await cloneRepo(url)
      addProject(project)
    } catch (err) {
      error.value = {
        type: LoadingProjectStore.CLONNING,
        message: contructErrorMessage(err, `Failed to clone the repo at the url: ${url}`),
      }
      return false
    } finally {
      loading.value = LoadingProjectStore.NONE
    }
    return true
  }

  /**
   * UTILS
   */

  const addProject = (project: Project) => {
    if (projects.value) {
      projects.value.push(project)
      return
    }
    projects.value = [project]
  }

  return {
    projects,
    loading,
    error,

    lazyLoadingProjects,
    handleCreateProject,
    handleCloneRepo,
    fetchProjectBySlug,
  }
})
