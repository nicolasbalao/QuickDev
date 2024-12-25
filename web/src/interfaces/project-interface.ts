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
}
