import httpClient from '../helpers/httpClient'
import type { Project } from '../interfaces/project-interface'

export const createProject = async (formatData: { name: string; description?: string }) => {
  const resp = await httpClient.post('/projects', { ...formatData })
  return resp
}

export const findAllProjects = async (): Promise<Project[]> => {
  const resp = await httpClient.get<Project[]>('/projects')
  return resp.data
}
