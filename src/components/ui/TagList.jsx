function TagList({ stack }) {
  if (!stack) return null

  const tags = stack.split(',').map(s => s.trim()).filter(Boolean)

  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map(tag => (
        <span
          key={tag}
          className="text-xs px-2 py-0.5 rounded bg-bg-elevated text-text-secondary"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default TagList
