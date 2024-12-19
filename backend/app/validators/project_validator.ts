import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .maxLength(100)
      .regex(/^[a-zA-Z0-9._-]+$/)
      .regex(/^[^-_.]/)
      .regex(/[^-_.]$/),
    description: vine.string().maxLength(200).optional(),
    where: vine.enum(['LOCAL', 'GITHUB'] as const),
  })
)

export const cloneProjectValidator = vine.compile(
  vine.object({
    url: vine.string().url(),
  })
)
