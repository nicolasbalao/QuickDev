import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import stringHelpers from '@adonisjs/core/helpers/string'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare type: string | null

  @column()
  declare path: string

  @column()
  declare description: string

  @column()
  declare repo_url: string | null

  @column()
  declare public_repo: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async slugify(project: Project) {
    if (project.slug) return

    const slug = stringHelpers.slug(project.name, {
      replacement: '-',
      lower: true,
      strict: true,
    })

    // Test if slug doesn't already exists
    const rows = await Project.query()
      .select('slug')
      .whereRaw('lower(??) = ?', ['slug', slug])
      .orWhereRaw('lower(??) like ?', ['slug', `${slug}-%`])

    if (!rows.length) {
      project.slug = slug
      return
    }

    // TODO: Digg it for knowing what that do
    const incrementor = rows.reduce<number[]>((result, row) => {
      const token = row.slug.toLocaleLowerCase().split(`${slug}-`)

      if (token.length < 2) {
        return result
      }

      const increment = Number(token.at(1))

      if (!Number.isNaN(increment)) {
        result.push(increment)
      }

      return result
    }, [])

    const increment = incrementor.length ? Math.max(...incrementor) + 1 : 1
    project.slug = `${slug}-${increment}`
  }
}
