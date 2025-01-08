import type { HttpContext } from '@adonisjs/core/http'
import {
  startWorkSessionValidator,
  stopWorkSessionValidator,
} from '#validators/work_session_validator'
import WorkSession from '#models/work_session'
import Project from '#models/project'
import { DateTime } from 'luxon'
import { WorkSessionStatus } from '#enums/work_session_status_enum'

export default class WorkSessionsController {
  async startSession({ request }: HttpContext): Promise<WorkSession> {
    const payload = await request.validateUsing(startWorkSessionValidator)

    // Check if project exist
    await Project.findOrFail(payload.projectId)

    const workSession = await WorkSession.create({
      projectId: payload.projectId,
    })

    return await workSession.save()
  }

  async stopSessions({ request }: HttpContext): Promise<WorkSession> {
    const payload = await request.validateUsing(stopWorkSessionValidator)

    const workSession = await WorkSession.findOrFail(payload.workSessionId)

    workSession.endedAt = DateTime.now()
    workSession.note = payload.note
    workSession.status = WorkSessionStatus.COMPLETED

    await workSession.save()

    return workSession
  }

  async findAll(): Promise<WorkSession[]> {
    return await WorkSession.all()
  }

  async findByProject({ params }: HttpContext): Promise<WorkSession[]> {
    const projectId = params.projectId

    const workSessions = await WorkSession.findManyBy({ projectId })

    return workSessions
  }
}
