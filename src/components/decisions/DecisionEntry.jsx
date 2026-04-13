import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useProjectsContext } from '../../context/ProjectsContext'
import { formatDate } from '../../lib/utils'
import ConfirmDialog from '../ui/ConfirmDialog'

function DecisionEntry({ projectId, decision }) {
  const { deleteDecision } = useProjectsContext()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <div className="bg-bg-elevated border border-border rounded-lg p-4 relative">
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="absolute top-3 right-3 text-text-muted hover:text-red-400 transition-colors"
          aria-label="Delete decision"
        >
          <Trash2 size={14} />
        </button>

        <p className="text-text-primary font-medium text-sm pr-6">{decision.decision}</p>

        {decision.alternatives && (
          <p className="text-text-secondary text-sm mt-2">{decision.alternatives}</p>
        )}

        <p className="text-text-secondary text-sm mt-2">{decision.reasoning}</p>

        <p className="text-text-muted text-xs mt-3">{formatDate(decision.createdAt)}</p>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        message="Delete this decision? This cannot be undone."
        onConfirm={() => {
          deleteDecision(projectId, decision.id)
          setShowDeleteDialog(false)
        }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  )
}

export default DecisionEntry
