import { format, isToday, isThisYear } from "date-fns"

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)

  if (isToday(date)) {
    return format(date, "h:mm a")
  }

  if (isThisYear(date)) {
    return format(date, "MMM d, h:mm a")
  }

  return format(date, "MMM d, yyyy, h:mm a")
}

export function formatShortTimestamp(timestamp: number): string {
  const date = new Date(timestamp)

  if (isToday(date)) {
    return format(date, "h:mm a")
  }

  if (isThisYear(date)) {
    return format(date, "MMM d")
  }

  return format(date, "MM/dd/yy")
}
