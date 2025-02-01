import type { GitCommit } from './git_commit_interface'
import type { WorkSession } from './work_session.interface'

export interface Project {
  id: number
  name: string
  slug: string
  type: string | null
  path: string
  localPath: string
  description: string
  repoUrl: string | null
  publicRepo: boolean
  createdAt: string
  updatedAt: Date
  latestCommits: GitCommit[]
  workSessions: WorkSession[]
  totalHoursSpent: number
  [key: string]: any
}
