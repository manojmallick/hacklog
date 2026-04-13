import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjectsContext } from '../context/ProjectsContext'
import StatusFilter from '../components/StatusFilter'
import ProjectCard from '../components/ProjectCard'

function Dashboard() {
  const { projects } = useProjectsContext()
  const [activeFilter, setActiveFilter] = useState('All')
  const navigate = useNavigate()

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.status === activeFilter)

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-text-primary text-2xl font-semibold">HackLog</h1>
          <button
            onClick={() => navigate('/projects/new')}
            className="bg-accent hover:bg-accent-hover text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            New project
          </button>
        </div>

        {/* Filter tabs */}
        <div className="mb-6">
          <StatusFilter
            projects={projects}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Project grid or empty state */}
        {filteredProjects.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-text-muted text-sm">
              No projects yet — add your first one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
