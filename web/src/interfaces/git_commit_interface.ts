export interface GitCommit {
  hash: string
  author: string
  message: string
  date: string
  url: string | undefined
}

export interface GroupedGitCommit {
  [date: string]: GitCommit[]
}
