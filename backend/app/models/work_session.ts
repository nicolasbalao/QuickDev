import { DateTime } from 'luxon'
import { BaseModel, column, computed, hasOne } from '@adonisjs/lucid/orm'
import { WorkSessionStatus } from '#enums/work_session_status_enum'
import Project from '#models/project'
import { type HasOne } from '@adonisjs/lucid/types/relations'

export default class WorkSession extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare note: string

  @column()
  declare status: WorkSessionStatus

  @column.dateTime()
  declare startedAt: DateTime

  @column.dateTime()
  declare endedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare projectId: number

  @hasOne(() => Project)
  declare project: HasOne<typeof Project>

  @computed()
  get duration(): number | null {
    if (!this.startedAt || !this.endedAt) {
      return null
    }

    return this.endedAt.diff(this.startedAt, 'hours').hours
  }
}
