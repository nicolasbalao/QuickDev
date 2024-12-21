// import type { HttpContext } from '@adonisjs/core/http'

import ProjectTemplate from '#models/project_template'

export default class ProjectTemplatesController {
  async findAll(): Promise<ProjectTemplate[]> {
    return await ProjectTemplate.all()
  }
}
