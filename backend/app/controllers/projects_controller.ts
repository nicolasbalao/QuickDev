import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import Project from '#models/project'
import { cloneProjectValidator, createProjectValidator } from '#validators/project_validator'
import {
  gitClone,
  executeShellCommand,
  prepareTemplateCommand,
  getLatestGitCommits,
} from '#helpers/command_helper'
import { GithubService } from '#services/github_service'
import { inject } from '@adonisjs/core'
import ProjectTemplate from '#models/project_template'
import { GitCommit, GroupedGitCommit } from '#interfaces/git_commit_interface'
import WorkSession from '../models/work_session.js'
import { Duration } from 'luxon'

@inject()
export default class ProjectsController {
  constructor(protected GithubService: GithubService) {}

  async findAll() {
    const projects = await Project.all()

    return projects
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProjectValidator)
    const baseDir: string = env.get('CONTAINER_PROJECT_PATH')
    const projectDir = baseDir + `/${payload.name}`
    const project = await Project.create({
      name: payload.name,
      description: payload.description,
      path: projectDir,
      publicRepo: true,
      templateId: payload.templateId,
    })
    try {
      let repoUrl = ''

      if (payload.where === 'GITHUB') {
        const githubResponse = await this.GithubService.createRepository({
          name: payload.name,
          description: payload.description,
        })

        if (!githubResponse) {
          response.internalServerError('Github repository creation failed')
          throw new Error('Github repository creation failed')
        }

        repoUrl = githubResponse.html_url
        project.repoUrl = repoUrl
        project.apiRepoUrl = githubResponse.url
      }

      if (payload.where === 'LOCAL') {
        let template = await ProjectTemplate.findOrFail(payload.templateId)
        let command = prepareTemplateCommand(template.command, { name: payload.name })

        await executeShellCommand(command, baseDir, true)
      }

      if (payload.where === 'GITHUB') {
        await gitClone(repoUrl, baseDir)
      }

      project.save()

      return response.ok(project)
    } catch (error) {
      project.delete()
      if (payload.where === 'LOCAL') {
        await executeShellCommand(`rm -rf ${payload.name}`, baseDir)
      }

      if (error.message === 'Github repository creation failed') {
        return response.internalServerError('Unable to creaete the repository on Github')
      }

      console.error('Error during project creation:', error)
      return response.internalServerError('An error occurred during project creation')
    }
  }

  async clone({ request, response }: HttpContext) {
    const githubToken = env.get('GITHUB_TOKEN')

    if (!githubToken) {
      response.unauthorized('No github token provided')
    }

    const payload = await request.validateUsing(cloneProjectValidator)
    const baseDir = env.get('CONTAINER_PROJECT_PATH')

    try {
      await gitClone(payload.url, baseDir)
    } catch (error) {
      console.error(error)
      response.internalServerError(error)
      return
    }

    let projectName = this.#extractRepoName(payload.url)
    // Create project
    const project = await Project.create({
      name: projectName,
      repoUrl: payload.url,
      publicRepo: true,
      path: `${baseDir}/${projectName}`,
    })
    const projectSaved = project.save()

    return projectSaved
  }

  async findBySlug({ params }: HttpContext) {
    const slug = params.slug

    const project = Project.findByOrFail({ slug: slug })

    return project
  }
  async findById({ params }: HttpContext) {
    const id = params.id

    const project = Project.findOrFail(id)

    return project
  }

  async getDetails({ params }: HttpContext) {
    const slug = params.slug

    let project = await Project.query()
      .where('slug', slug)
      .preload('workSessions', (query) => {
        query.orderBy('started_at', 'desc').limit(5)
      })
      .firstOrFail()

    let latestCommits = await getLatestGitCommits(project.path)

    const totalHoursSpent = project.workSessions.reduce((total, session) => {
      if (!session.duration) {
        return total + 0
      }
      return total + session.duration
    }, 0)

    if (project.repoUrl) {
      latestCommits = latestCommits.map((commit: any) => ({
        ...commit,
        url: `${project.repoUrl}/commit/${commit.hash}`,
      }))
    }

    return {
      ...project.toJSON(),
      latestCommits,
      totalHoursSpent
    }
  }

  #extractRepoName(url: string): string {
    const parts = url.split('/')
    const repoWithGit = parts[parts.length - 1]

    return repoWithGit.replace(/\.git$/, '')
  }

  // Keep it for the page with changelogs with all commits
  // @ts-ignore
  #groupCommitByDay(commits: GitCommit[]): GroupedGitCommit {
    return commits.reduce<GroupedGitCommit>((grouped, commit) => {
      const date = commit.date.split(' ')[0] as string

      if (!grouped[date]) {
        grouped[date] = []
      }

      grouped[date].push(commit)

      return grouped
    }, {})
  }
}
