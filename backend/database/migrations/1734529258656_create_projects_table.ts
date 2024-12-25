import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 50).notNullable().unique()
      table.string('slug', 50).notNullable().unique()
      table.string('path').notNullable()
      table.text('description').defaultTo('')
      table.string('repo_url').unique()
      table.string('api_repo_url').unique()
      table.boolean('public_repo')

      table.integer('template_id').unsigned().references('project_templates.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
