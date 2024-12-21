import httpClient from '../helpers/httpClient'
import type { ProjectTemplates } from '../interfaces/project_template-interface'

export const fetchProjectTemplates = async (): Promise<ProjectTemplates[]> => {
  const resp = await httpClient.get<ProjectTemplates[]>('/projects/templates')
  return resp.data
}
