function ConfirmDialog({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-bg-elevated border border-border rounded-lg p-6 max-w-sm w-full mx-4">
        <p className="text-text-primary text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="bg-bg-elevated border border-border text-text-secondary text-sm px-4 py-2 rounded-lg hover:bg-bg-surface transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
