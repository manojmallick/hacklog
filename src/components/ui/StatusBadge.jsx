const STATUS_CLASSES = {
  Idea: 'text-status-idea border-status-idea',
  Building: 'text-status-building border-status-building',
  Shipped: 'text-status-shipped border-status-shipped',
  Abandoned: 'text-status-abandoned border-status-abandoned',
}

function StatusBadge({ status }) {
  const colorClasses = STATUS_CLASSES[status] ?? 'text-text-muted border-border'
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${colorClasses}`}>
      {status}
    </span>
  )
}

export default StatusBadge
