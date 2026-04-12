export function formatDate(isoString) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoString))
}

export function nowISO() {
  return new Date().toISOString()
}

export function generateId() {
  return crypto.randomUUID()
}
