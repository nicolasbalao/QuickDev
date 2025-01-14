import { Duration } from 'luxon'

export const formatHoursDuration = (duration: number): string => {
  const hours = Math.floor(duration)
  const minutes = Math.round((duration - hours) * 60)

  const hoursString = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : null
  const minutesString = minutes > 0 ? `${minutes} min${minutes > 1 ? 's' : ''}` : null

  if (hoursString && minutesString) {
    return `${hoursString} and ${minutesString}`
  }

  return hoursString || minutesString || '0 min'
}

/**
 * FORMAT: hh:mm:ss
 *
 * @param duration seconds
 */
export const formatDurationHHMMSS = (seconds: number): string => {
  const duration = Duration.fromObject({ seconds })

  return duration.toFormat('hh:mm:ss')
}
