const TABS = ['All', 'Idea', 'Building', 'Shipped', 'Abandoned']

function StatusFilter({ projects, activeFilter, onFilterChange }) {
  function getCount(tab) {
    if (tab === 'All') return projects.length
    return projects.filter(p => p.status === tab).length
  }

  return (
    <div className="flex gap-1 border-b border-border">
      {TABS.map(tab => {
        const isActive = activeFilter === tab
        return (
          <button
            key={tab}
            onClick={() => onFilterChange(tab)}
            className={`px-3 py-2 text-sm flex items-center gap-1.5 -mb-px transition-colors ${
              isActive
                ? 'text-text-primary border-b border-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
            <span className="text-text-muted text-xs">{getCount(tab)}</span>
          </button>
        )
      })}
    </div>
  )
}

export default StatusFilter
