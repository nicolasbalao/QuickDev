import vine from '@vinejs/vine'

export const startWorkSessionValidator = vine.compile(
  vine.object({
    projectId: vine.number().min(1),
  })
)

export const stopWorkSessionValidator = vine.compile(
  vine.object({
    workSessionId: vine.number().min(1),
    note: vine.string(),
  })
)
