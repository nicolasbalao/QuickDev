// Interface representing the properties for creating a repository
export interface CreateUserRepositoryGithubRequest {
  // The name of the repository (required).
  name: string

  // A short description of the repository.
  description?: string

  // A URL with more information about the repository.
  homepage?: string

  // Whether the repository is private.
  // Default: false
  private?: boolean

  // Whether issues are enabled.
  // Default: true
  has_issues?: boolean

  // Whether projects are enabled.
  // Default: true
  has_projects?: boolean

  // Whether the wiki is enabled.
  // Default: true
  has_wiki?: boolean

  // Whether discussions are enabled.
  // Default: false
  has_discussions?: boolean

  // The ID of the team that will be granted access to this repository.
  // This is only valid when creating a repository in an organization.
  team_id?: number

  // Whether the repository is initialized with a minimal README.
  // Default: false
  auto_init?: boolean

  // The desired language or platform to apply to the .gitignore file.
  gitignore_template?: string

  // The license keyword of the open source license for this repository.
  license_template?: string

  // Whether to allow squash merges for pull requests.
  // Default: true
  allow_squash_merge?: boolean

  // Whether to allow merge commits for pull requests.
  // Default: true
  allow_merge_commit?: boolean

  // Whether to allow rebase merges for pull requests.
  // Default: true
  allow_rebase_merge?: boolean

  // Whether to allow Auto-merge to be used on pull requests.
  // Default: false
  allow_auto_merge?: boolean

  // Whether to delete head branches when pull requests are merged.
  // Default: false
  delete_branch_on_merge?: boolean

  // The default value for a squash merge commit title.
  // Can be one of: PR_TITLE, COMMIT_OR_PR_TITLE
  squash_merge_commit_title?: 'PR_TITLE' | 'COMMIT_OR_PR_TITLE'

  // The default value for a squash merge commit message.
  // Can be one of: PR_BODY, COMMIT_MESSAGES, BLANK
  squash_merge_commit_message?: 'PR_BODY' | 'COMMIT_MESSAGES' | 'BLANK'

  // The default value for a merge commit title.
  // Can be one of: PR_TITLE, MERGE_MESSAGE
  merge_commit_title?: 'PR_TITLE' | 'MERGE_MESSAGE'

  // The default value for a merge commit message.
  // Can be one of: PR_BODY, PR_TITLE, BLANK
  merge_commit_message?: 'PR_BODY' | 'PR_TITLE' | 'BLANK'

  // Whether downloads are enabled.
  // Default: true
  has_downloads?: boolean

  // Whether this repository acts as a template for generating new repositories.
  // Default: false
  is_template?: boolean
}

/**
 * Interface representing a GitHub repository.
 */
export interface CreateUserRepositoryGithubResponse {
  /**
   * Unique identifier for the repository.
   */
  id: number

  /**
   * Node ID for the repository.
   */
  node_id: string

  /**
   * Name of the repository.
   */
  name: string

  /**
   * Full name of the repository including the owner.
   */
  full_name: string

  /**
   * Owner information of the repository.
   */
  owner: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }

  /**
   * Indicates whether the repository is private.
   */
  private: boolean

  /**
   * URL of the repository's HTML page.
   */
  html_url: string

  /**
   * Description of the repository.
   */
  description: string | null

  /**
   * Indicates whether the repository is a fork.
   */
  fork: boolean

  /**
   * API URL of the repository.
   */
  url: string

  /**
   * Additional API URLs related to the repository.
   */
  archive_url: string
  assignees_url: string
  blobs_url: string
  branches_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  deployments_url: string
  downloads_url: string
  events_url: string
  forks_url: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  languages_url: string
  merges_url: string
  milestones_url: string
  notifications_url: string
  pulls_url: string
  releases_url: string
  ssh_url: string
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  clone_url: string
  mirror_url: string | null
  hooks_url: string
  svn_url: string

  /**
   * Homepage URL of the repository.
   */
  homepage: string | null

  /**
   * License information of the repository.
   */
  license: {
    key: string
    name: string
    url: string
    spdx_id: string
    node_id: string
    html_url: string
  } | null

  /**
   * Programming language used in the repository.
   */
  language: string | null

  /**
   * Various counts and statistics of the repository.
   */
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number

  /**
   * Indicates if the repository acts as a template.
   */
  is_template: boolean

  /**
   * List of topics associated with the repository.
   */
  topics: string[]

  /**
   * Features and settings of the repository.
   */
  has_issues: boolean
  has_projects: boolean
  has_wiki: boolean
  has_pages: boolean
  has_downloads: boolean
  archived: boolean
  disabled: boolean
  visibility: string

  /**
   * Timestamp fields for repository activity.
   */
  pushed_at: string
  created_at: string
  updated_at: string

  /**
   * Permissions associated with the repository.
   */
  permissions: {
    pull: boolean
    push: boolean
    admin: boolean
  }
}
