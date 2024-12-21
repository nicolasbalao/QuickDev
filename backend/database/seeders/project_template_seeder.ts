import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ProjectTemplate from '../../app/models/project_template.js'

export default class extends BaseSeeder {
  async run() {
    await ProjectTemplate.createMany([
      {
        name: 'Git',
        command: 'git init',
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
