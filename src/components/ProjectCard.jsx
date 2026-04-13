import { Link } from 'react-router-dom'
import StatusBadge from './ui/StatusBadge'
import TagList from './ui/TagList'

function ProjectCard({ project, onTagClick }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="bg-bg-surface border border-border rounded-lg p-4 block hover:border-accent/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-text-primary font-medium">{project.name}</span>
        <StatusBadge status={project.status} />
      </div>
      {project.description && (
        <p className="line-clamp-2 text-text-secondary text-sm mb-3">
          {project.description}
        </p>
      )}
      <TagList stack={project.stack} onTagClick={onTagClick} />
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {project.tags.map(tag => (
            onTagClick ? (
              <button
                key={tag}
                type="button"
                onClick={(e) => { e.preventDefault(); onTagClick(tag) }}
                className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 cursor-pointer hover:bg-accent/20"
              >
                {tag}
              </button>
            ) : (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20"
              >
                {tag}
              </span>
            )
          ))}
        </div>
      )}
      {project.decisions && project.decisions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <span className="text-text-muted text-xs">
            {project.decisions.length} {project.decisions.length === 1 ? 'decision' : 'decisions'}
          </span>
        </div>
      )}
    </Link>
  )
}

export default ProjectCard
