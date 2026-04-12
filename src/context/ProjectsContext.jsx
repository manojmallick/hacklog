import { createContext, useContext } from 'react'
import { useProjects } from '../hooks/useProjects'

const ProjectsContext = createContext(undefined)

export function ProjectsProvider({ children }) {
  const value = useProjects()
  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjectsContext() {
  const value = useContext(ProjectsContext)
  if (value === undefined) {
    throw new Error('useProjectsContext must be used within a ProjectsProvider')
  }
  return value
}
