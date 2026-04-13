import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { useProjectsContext } from '../context/ProjectsContext'
import { formatDate } from '../lib/utils'
import StatusBadge from '../components/ui/StatusBadge'
import TagList from '../components/ui/TagList'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import DecisionList from '../components/decisions/DecisionList'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, deleteProject } = useProjectsContext()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isLoggingDecision, setIsLoggingDecision] = useState(false)

  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">Project not found.</p>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-accent hover:underline"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    )
  }

  const showEndDate =
    project.endDate && (project.status === 'Shipped' || project.status === 'Abandoned')

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/projects/${id}/edit`)}
              className="flex items-center gap-1.5 bg-bg-surface border border-border text-text-secondary hover:text-text-primary text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-1.5 bg-bg-surface border border-border text-red-500 hover:text-red-400 text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        {/* Header: name + status */}
        <div className="flex items-start gap-3 mb-6">
          <h1 className="text-2xl font-semibold text-text-primary leading-tight">
            {project.name}
          </h1>
          <div className="mt-1">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {project.description}
          </p>
        )}

        {/* Tech stack */}
        {project.stack && (
          <div className="mb-6">
            <TagList stack={project.stack} />
          </div>
        )}

        {/* Dates */}
        {(project.startDate || showEndDate) && (
          <div className="flex flex-wrap gap-6 mb-6 text-sm">
            {project.startDate && (
              <div>
                <span className="text-text-muted block text-xs mb-0.5">Started</span>
                <span className="text-text-secondary">{formatDate(project.startDate)}</span>
              </div>
            )}
            {showEndDate && (
              <div>
                <span className="text-text-muted block text-xs mb-0.5">Ended</span>
                <span className="text-text-secondary">{formatDate(project.endDate)}</span>
              </div>
            )}
          </div>
        )}

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mb-6">
            <p className="text-text-muted text-xs mb-2">Links</p>
            <div className="flex flex-wrap gap-2">
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-bg-elevated border border-border text-accent hover:bg-bg-surface transition-colors"
                >
                  <ExternalLink size={11} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Lessons learned */}
        {project.lessonsLearned && (
          <div className="mb-6">
            <p className="text-text-muted text-xs mb-2">Lessons learned</p>
            <div className="bg-bg-elevated border border-border rounded-lg p-4">
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                {project.lessonsLearned}
              </p>
            </div>
          </div>
        )}

        {/* Decisions section */}
        <div className="mt-8">
          <DecisionList
            projectId={project.id}
            decisions={project.decisions}
            isLoggingDecision={isLoggingDecision}
            setIsLoggingDecision={setIsLoggingDecision}
          />
        </div>

      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        message="Are you sure? This cannot be undone."
        onConfirm={() => {
          deleteProject(id)
          navigate('/')
        }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  )
}

export default ProjectDetail
