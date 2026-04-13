import { useState } from 'react'
import { useProjectsContext } from '../../context/ProjectsContext'

function AddDecisionForm({ projectId, onClose }) {
  const { addDecision } = useProjectsContext()
  const [decision, setDecision] = useState('')
  const [alternatives, setAlternatives] = useState('')
  const [reasoning, setReasoning] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const newErrors = {}
    if (!decision.trim()) newErrors.decision = 'Decision is required.'
    if (!reasoning.trim()) newErrors.reasoning = 'Reasoning is required.'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    addDecision(projectId, {
      decision: decision.trim(),
      alternatives: alternatives.trim(),
      reasoning: reasoning.trim(),
    })
    setDecision('')
    setAlternatives('')
    setReasoning('')
    setErrors({})
    onClose()
  }

  const fieldClass = 'bg-bg-surface border border-border rounded px-3 py-2 text-text-primary text-sm w-full'
  const labelClass = 'text-text-secondary text-sm'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg-elevated border border-border rounded-lg p-4"
    >
      <div className="flex flex-col gap-4">
        {/* Decision */}
        <div>
          <label className={labelClass}>Decision</label>
          <input
            type="text"
            value={decision}
            onChange={e => setDecision(e.target.value)}
            className={`${fieldClass} mt-1`}
          />
          {errors.decision && (
            <p className="text-red-400 text-xs mt-1">{errors.decision}</p>
          )}
        </div>

        {/* Alternatives */}
        <div>
          <label className={labelClass}>Alternatives considered</label>
          <textarea
            value={alternatives}
            onChange={e => setAlternatives(e.target.value)}
            rows={3}
            className={`${fieldClass} mt-1 resize-y`}
          />
        </div>

        {/* Reasoning */}
        <div>
          <label className={labelClass}>Reasoning</label>
          <textarea
            value={reasoning}
            onChange={e => setReasoning(e.target.value)}
            rows={3}
            className={`${fieldClass} mt-1 resize-y`}
          />
          {errors.reasoning && (
            <p className="text-red-400 text-xs mt-1">{errors.reasoning}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-transparent border border-border text-text-secondary px-4 py-2 rounded text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-accent text-white px-4 py-2 rounded text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddDecisionForm
