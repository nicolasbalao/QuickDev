import { DateTime } from 'luxon'
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' },
  locale: string = 'fr-FR',
): string {
  try {
    const date = new Date(dateString)

    // Validate if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string')
    }

    return new Intl.DateTimeFormat(locale, options).format(date)
  } catch (error) {
    console.error('Date formatting error:', error)
    return 'Invalid Date'
  }
}

export function timeAgo(dateString: string): string {
  try {
    const now = DateTime.now()
    const jsDate = new Date(dateString)

    const pastDate = DateTime.fromJSDate(jsDate)

    // Vérifier si la date est valide
    if (!pastDate.isValid) {
      throw new Error('Invalid date string')
    }

    const diff = now
      .diff(pastDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds'])
      .toObject()

    const timeAgo = Object.entries(diff).find(([unit, value]) => value && value > 0)

    if (timeAgo) {
      const [unit, value] = timeAgo
      return `${Math.floor(value as number)} ${unit}`
    } else {
      return 'quelques secondes'
    }
  } catch (error) {
    console.error('Error calculating time ago:', error)
    return 'Date invalide'
  }
}
