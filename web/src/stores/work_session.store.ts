import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { WorkSessionStatus, type WorkSession } from '../interfaces/work_session.interface'
import {
  apiFindActiveWorkSession,
  apiStartSession,
  apiStopSession,
  type StopWorkSessionDto,
} from '../services/work_sessionService'
import { contructErrorMessage } from '../helpers/contructErrorMessage.helper'

export const useWorkSessionStore = defineStore('work-session', () => {
  let workSessions: Ref<WorkSession[]> = ref([])
  let isLoading: Ref<boolean> = ref(false)
  let error: Ref<string | null> = ref(null)

  const activeWorkSession = computed(() =>
    workSessions.value.find((ws) => ws.status === WorkSessionStatus.IN_PROGRESS),
  )

  const fetchActiveWorkSession = async () => {
    isLoading.value = true
    error.value = null
    try {
      const activeWorkSession = await apiFindActiveWorkSession()
      if (activeWorkSession) {
        workSessions.value.push(activeWorkSession)
      }
    } catch (err) {
      error.value = contructErrorMessage(err, `Error while fetching active work session`)
    } finally {
      isLoading.value = false
    }
  }

  // Utils
  const updateWorkSession = (workSession: WorkSession) => {
    const index = workSessions.value.findIndex((ws) => ws.id === workSession.id)

    // TODO: see if it's good way (optmistic)
    if (index >= 0) {
      workSessions.value[index] = workSession
    } else {
      workSessions.value.push(workSession)
    }
  }

  // Mutations
  const startSession = async (projectId: number): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const workSession = await apiStartSession(projectId)

      workSessions.value.push(workSession)
      return true
    } catch (err) {
      error.value = contructErrorMessage(
        err,
        'Error while starting work session for the project: ' + projectId,
      )
      return false
    } finally {
      isLoading.value = false
    }
  }

  const stopSession = async (stopData: StopWorkSessionDto): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const workSessionStoped = await apiStopSession(stopData)
      updateWorkSession(workSessionStoped)
      return true
    } catch (err) {
      error.value = contructErrorMessage(
        err,
        `Error while stoping the work session ${stopData.workSessionId}`,
      )
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    workSessions,
    isLoading,
    error,

    activeWorkSession,

    fetchActiveWorkSession,
    startSession,
    stopSession,
  }
})
