import httpClient from '../helpers/httpClient'
import type { Project } from '../interfaces/project-interface'

export interface CreateProjectDto {
  name: string
  description: string | null
  where: 'LOCAL' | 'GITHUB'
  templateId?: number
}

export const createProject = async (formatData: CreateProjectDto): Promise<Project> => {
  const resp = await httpClient.post<Project>('/projects', { ...formatData })
  return resp.data
}

export const findAllProjects = async (): Promise<Project[]> => {
  const resp = await httpClient.get<Project[]>('/projects')
  return resp.data
}

export const projectDetails = async (slug: string): Promise<Project | undefined> => {
  const resp = await httpClient.get<Project | undefined>(`/projects/${slug}/details`)
  return resp.data
}

export const cloneRepo = async (url: string): Promise<Project> => {
  const resp = await httpClient.post<Project>('/projects/github/clone', { url })
  return resp.data
}

export const projectDetailsById = async (id: number): Promise<Project> => {
  const resp = await httpClient.get<Project>(`projects/${id}`)
  return resp.data
}
