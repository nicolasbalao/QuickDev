import httpClient from '../helpers/httpClient'
import type { WorkSession } from '../interfaces/work_session.interface'

export interface StopWorkSessionDto {
  workSessionId: number
  note: string
}

// TODO find better solution for handling api services
export const apiStartSession = async (projectId: number): Promise<WorkSession> => {
  const resp = await httpClient.post<WorkSession>('/work-sessions/start', {
    projectId,
  })

  return resp.data
}

export const apiStopSession = async (stopData: StopWorkSessionDto): Promise<WorkSession> => {
  const resp = await httpClient.post<WorkSession>('/work-sessions/stop', {
    ...stopData,
  })
  return resp.data
}

export const apiFindActiveWorkSession = async (): Promise<WorkSession | null> => {
  const resp = await httpClient.get<WorkSession | null>('/work-sessions/active')
  return resp.data
}
