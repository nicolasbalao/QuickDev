import { defineStore } from 'pinia'
import { computed, onUnmounted, ref, watch, type Ref } from 'vue'
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
  let intervalId: any = null

  let activeWorkSessionTimer: Ref<number> = ref(0)

  const activeWorkSession = computed(() =>
    workSessions.value.find((ws) => ws.status === WorkSessionStatus.IN_PROGRESS),
  )

  watch(
    () => activeWorkSession.value?.id, // Observe les changements dans la session active
    (newSessionId) => {
      if (newSessionId) {
        startTimer()
      } else {
        stopTimer()
        activeWorkSessionTimer.value = 0
      }
    },
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

  const startTimer = () => {
    stopTimer()
    activeWorkSessionTimer.value = calculateElapsedTime()

    intervalId = setInterval(() => {
      activeWorkSessionTimer.value++
    }, 1_000)
  }

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const calculateElapsedTime = () => {
    if (activeWorkSession.value?.startedAt) {
      const startTime = new Date(activeWorkSession.value.startedAt).getTime()
      const currentTime = Date.now()
      return Math.floor((currentTime - startTime) / 1000) // Temps écoulé en secondes
    }
    return 0
  }

  const startSession = async (projectId: number): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const workSession = await apiStartSession(projectId)

      workSessions.value.push(workSession)
      startTimer()
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
      stopTimer()
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

  onUnmounted(() => {
    stopTimer()
  })

  return {
    workSessions,
    isLoading,
    error,

    activeWorkSession,
    activeWorkSessionTimer,

    fetchActiveWorkSession,
    startSession,
    stopSession,
  }
})
