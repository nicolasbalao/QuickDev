import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ProjectTemplate from '#models/project_template'

export default class extends BaseSeeder {
  async run() {
    await ProjectTemplate.updateOrCreateMany('name', [
      {
        name: 'Git',
        command: 'git init {{ name }}',
        description: 'Init git repository',
      },
      {
        name: 'Rust',
        command: 'cargo new {{ name }}',
        description: 'Create new cargo project',
      },
    ])
  }
}
