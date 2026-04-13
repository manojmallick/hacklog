import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjectsContext } from '../context/ProjectsContext'
import StatusFilter from '../components/StatusFilter'
import ProjectCard from '../components/ProjectCard'

function Dashboard() {
  const { projects } = useProjectsContext()
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTagFilter, setActiveTagFilter] = useState(null)
  const navigate = useNavigate()

  const filteredProjects = projects.filter(p => {
    const matchesStatus = activeFilter === 'All' || p.status === activeFilter
    const matchesTag = !activeTagFilter ||
      p.stack.split(',').map(s => s.trim()).filter(Boolean).includes(activeTagFilter) ||
      (p.tags && p.tags.includes(activeTagFilter))
    return matchesStatus && matchesTag
  })

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
          {activeTagFilter && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setActiveTagFilter(null)}
                className="flex items-center gap-1 text-xs bg-bg-elevated border border-accent text-accent px-2 py-0.5 rounded hover:bg-bg-base transition-colors"
              >
                <span>× {activeTagFilter}</span>
              </button>
            </div>
          )}
        </div>

        {/* Project grid or empty state */}
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="text-text-muted text-sm">
              {activeTagFilter && activeFilter !== 'All'
                ? `No ${activeFilter} projects tagged "${activeTagFilter}".`
                : activeTagFilter
                ? `No projects tagged "${activeTagFilter}." `
                : activeFilter !== 'All'
                ? `No ${activeFilter} projects yet.`
                : 'No projects yet — add your first one.'}
            </p>
            {activeTagFilter && (
              <button
                onClick={() => setActiveTagFilter(null)}
                className="mt-2 text-accent text-xs hover:underline"
              >
                Clear tag filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onTagClick={(tag) => setActiveTagFilter(prev => prev === tag ? null : tag)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
