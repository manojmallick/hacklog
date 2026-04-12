const STORAGE_KEY = 'hacklog_projects'

export function loadProjects() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) return []
  try {
    return JSON.parse(raw)
  } catch (err) {
    console.warn('hacklog: failed to parse stored projects', err)
    return []
  }
}

export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (err) {
    console.error('hacklog: failed to save projects (storage full?)', err)
  }
}
