export enum WorkSessionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCEL',
}

export interface WorkSession {
  id: number
  note: string
  status: WorkSessionStatus
  endedAt: string // TODO: see better to be string or Date and see for luxon on frontend
  startedAt: string
  projectId: number
  duration: number
}
