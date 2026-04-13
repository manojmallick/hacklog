import { Link } from 'react-router-dom'
import StatusBadge from './ui/StatusBadge'
import TagList from './ui/TagList'

function ProjectCard({ project }) {
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
      <TagList stack={project.stack} />
    </Link>
  )
}

export default ProjectCard
