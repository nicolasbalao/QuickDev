import axios, { AxiosInstance } from 'axios'
import env from '#start/env'
import {
  CreateUserRepositoryGithubRequest,
  CreateUserRepositoryGithubResponse,
} from '../interfaces/github_interface.js'

export class GithubService {
  private api: AxiosInstance

  constructor() {
    const ghToken = env.get('GITHUB_TOKEN')

    if (!ghToken) {
      throw new TypeError('Github token is undefined. Please provide a valid token')
    }

    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: 'application/vnd.github+json',
      },
    })
  }

  public async createRepository(
    data: CreateUserRepositoryGithubRequest
  ): Promise<CreateUserRepositoryGithubResponse | undefined> {
    try {
      const resp = await this.api.post<CreateUserRepositoryGithubResponse>('/user/repos', data)
      return resp.data
    } catch (error) {
      this.handleApiError(error)
      return
    }
  }

  private handleApiError(error: any) {
    console.error('GitHub API Error:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'An error occurred')
  }
}
