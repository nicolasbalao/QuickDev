import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .maxLength(100)
      .regex(/^[a-zA-Z0-9._-]+$/)
      .regex(/^[^-_.]/)
      .regex(/[^.]$/),
    description: vine.string().maxLength(200).optional(),
  })
)
