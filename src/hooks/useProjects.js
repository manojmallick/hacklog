import { useState, useEffect } from 'react'
import { loadProjects, saveProjects } from '../lib/storage'
import { generateId, nowISO } from '../lib/utils'

function sortByUpdatedAt(projects) {
  return [...projects].sort((a, b) => {
    if (a.updatedAt < b.updatedAt) return 1
    if (a.updatedAt > b.updatedAt) return -1
    return 0
  })
}

export function useProjects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const loaded = loadProjects()
    setProjects(sortByUpdatedAt(loaded))
  }, [])

  function addProject(data) {
    const now = nowISO()
    const newProject = {
      decisions: [],
      links: [],
      lessonsLearned: '',
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setProjects(prev => {
      const updated = sortByUpdatedAt([...prev, newProject])
      saveProjects(updated)
      return updated
    })
    return newProject
  }

  function updateProject(id, updates) {
    setProjects(prev => {
      const updated = sortByUpdatedAt(
        prev.map(p =>
          p.id === id ? { ...p, ...updates, updatedAt: nowISO() } : p
        )
      )
      saveProjects(updated)
      return updated
    })
  }

  function deleteProject(id) {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id)
      saveProjects(updated)
      return updated
    })
  }

  function addDecision(projectId, decisionData) {
    const newDecision = {
      alternatives: '',
      ...decisionData,
      id: generateId(),
      createdAt: nowISO(),
    }
    setProjects(prev => {
      const updated = sortByUpdatedAt(
        prev.map(p => {
          if (p.id !== projectId) return p
          return {
            ...p,
            decisions: [newDecision, ...p.decisions],
            updatedAt: nowISO(),
          }
        })
      )
      saveProjects(updated)
      return updated
    })
  }

  function deleteDecision(projectId, decisionId) {
    setProjects(prev => {
      const updated = sortByUpdatedAt(
        prev.map(p => {
          if (p.id !== projectId) return p
          return {
            ...p,
            decisions: p.decisions.filter(d => d.id !== decisionId),
            updatedAt: nowISO(),
          }
        })
      )
      saveProjects(updated)
      return updated
    })
  }

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    addDecision,
    deleteDecision,
  }
}
