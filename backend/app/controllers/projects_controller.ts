import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import Project from '#models/project'
import { cloneProjectValidator, createProjectValidator } from '../validators/project_validator.js'
import { gitClone, executeGitInit, executeShellCommand } from '#helpers/command_helper'

export default class ProjectsController {
  async findAll() {
    const projects = await Project.all()

    return projects
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProjectValidator)

    const baseDir: string = env.get('PROJECT_PATH')
    const project_dir = baseDir + `/${payload.name}`

    const project: Project = await Project.create({
      name: payload.name,
      description: payload.description,
      path: project_dir,
      public_repo: false,
    })

    const projectSaved = await project.save()

    try {
      await executeShellCommand(`mkdir ${payload.name}`, baseDir)
    } catch (error) {
      // TODO: refactor with sql transaction
      project.delete()
      response.internalServerError()
    }

    try {
      await executeGitInit(project_dir)
    } catch (error) {
      project.delete()
      response.internalServerError()
    }

    return projectSaved
  }

  async clone({ request, response }: HttpContext) {
    const githubToken = env.get('GITHUB_TOKEN')

    if (!githubToken) {
      response.unauthorized('No github token provided')
    }

    const payload = await request.validateUsing(cloneProjectValidator)
    const baseDir = env.get('PROJECT_PATH')

    // https://github.com/nicolasbalao/PHP-MVC-boilerplate.git

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
      repo_url: payload.url,
      public_repo: true,
      path: `${baseDir}/${projectName}`,
    })
    console.info('Project', project)
    const projectSaved = project.save()

    return projectSaved
  }
  #extractRepoName(url: string): string {
    const parts = url.split('/')
    const repoWithGit = parts[parts.length - 1]

    return repoWithGit.replace(/\.git$/, '')
  }
}
