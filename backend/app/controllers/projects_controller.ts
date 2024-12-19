import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import Project from '#models/project'
import { createProjectValidator } from '../validators/project_validator.js'
import { executeGitInit, executeShellCommand } from '#helpers/command_helper'

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
}
