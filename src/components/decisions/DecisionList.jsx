import AddDecisionForm from './AddDecisionForm'
import DecisionEntry from './DecisionEntry'

function DecisionList({ projectId, decisions, isLoggingDecision, setIsLoggingDecision }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-text-primary font-medium">Decisions</h2>
        {!isLoggingDecision && (
          <button
            onClick={() => setIsLoggingDecision(true)}
            className="text-sm bg-bg-elevated border border-border text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-lg transition-colors"
          >
            Log decision
          </button>
        )}
      </div>

      {isLoggingDecision && (
        <div className="mb-4">
          <AddDecisionForm
            projectId={projectId}
            onClose={() => setIsLoggingDecision(false)}
          />
        </div>
      )}

      {decisions.length === 0 && !isLoggingDecision && (
        <p className="text-text-muted text-sm">
          No decisions logged yet — hit 'Log decision' to capture your first one.
        </p>
      )}

      {decisions.length > 0 && (
        <div className="flex flex-col gap-3">
          {decisions.map(d => (
            <DecisionEntry key={d.id} projectId={projectId} decision={d} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DecisionList
