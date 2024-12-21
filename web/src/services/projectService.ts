import httpClient from '../helpers/httpClient'
import type { Project } from '../interfaces/project-interface'

export interface CreateProjectDto {
  name: string
  description: string | null
  where: 'LOCAL' | 'GITHUB'
}

export const createProject = async (formatData: CreateProjectDto): Promise<Project> => {
  const resp = await httpClient.post<Project>('/projects', { ...formatData })
  return resp.data
}

export const findAllProjects = async (): Promise<Project[]> => {
  const resp = await httpClient.get<Project[]>('/projects')
  return resp.data
}

export const findProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const resp = await httpClient.get<Project | undefined>(`/projects/${slug}`)
  return resp.data
}

export const cloneRepo = async (url: string): Promise<Project> => {
  const resp = await httpClient.post<Project>('/projects/github/clone', { url })
  return resp.data
}
