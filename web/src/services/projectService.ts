import httpClient from '../helpers/httpClient'

export const createProject = async (formatData: { name: string; description?: string }) => {
  const resp = await httpClient.post('/projects', { ...formatData })
  return resp
}
