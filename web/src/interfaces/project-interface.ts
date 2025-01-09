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
  created_at: Date
  updated_at: Date
  latestCommits: GitCommit[]
  workSessions: WorkSession[]
  [key: string]: any
}
