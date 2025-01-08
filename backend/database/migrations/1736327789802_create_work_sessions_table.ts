import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'work_sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Project
      table.integer('project_id').unsigned().references('projects.id').notNullable()
      table.text('note').defaultTo('')

      table
        .enu('status', ['IN_PROGRESS', 'COMPLETED', 'CANCELED'], {
          useNative: true,
          enumName: 'work_session_status',
          existingType: false,
          schemaName: 'public',
        })
        .defaultTo('IN_PROGRESS')

      table.timestamp('started_at').defaultTo(this.now())
      table.timestamp('ended_at')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "work_session_status"')
  }
}
