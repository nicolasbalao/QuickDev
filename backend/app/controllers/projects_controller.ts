import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import { exec } from 'child_process'
import Project from '#models/project'

export default class ProjectsController {
  async create({ request, response }: HttpContext) {
    const body = request.body()

    const baseDir: string = env.get('PROJECT_PATH')
    const project_dir = baseDir + `/${body.name}`

    const project: Project = await Project.create({
      name: body.name,
      path: project_dir,
      public_repo: false,
    })

    const projectSaved = await project.save()

    try {
      await executeShellCommand(`mkdir ${body.name}`, baseDir)
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

    return {
      projectSaved,
    }
  }
}

async function executeGitInit(path: string) {
  try {
    await executeShellCommand('git init', path)
  } catch (error) {
    console.error('Erreur', error)
    throw new Error(`Erreur: ${error.message}`)
  }
}

function executeShellCommand(command: string, path: string) {
  return new Promise((resolve, rejects) => {
    exec(command, { cwd: path }, (error, stdout, stderr) => {
      if (error) {
        rejects(`Error: ${error.message}`)
        return
      }

      if (stderr) {
        rejects(`Stderr: ${stderr}`)
        return
      }

      resolve(stdout.trim())
    })
  })
}
