import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useProjectsContext } from '../context/ProjectsContext'
import { generateId } from '../lib/utils'

const STATUS_OPTIONS = ['Idea', 'Building', 'Shipped', 'Abandoned']
const END_DATE_STATUSES = ['Shipped', 'Abandoned']

function isValidUrl(str) {
  if (!str) return false
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

function ProjectForm({ mode }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, addProject, updateProject } = useProjectsContext()

  const existingProject = mode === 'edit' ? projects.find(p => p.id === id) : null

  // Initialize state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Idea')
  const [stack, setStack] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [lessonsLearned, setLessonsLearned] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [links, setLinks] = useState([])
  const [errors, setErrors] = useState({})
  const [initialized, setInitialized] = useState(false)

  // Populate fields in edit mode once project is available
  useEffect(() => {
    if (mode === 'edit' && existingProject && !initialized) {
      setName(existingProject.name || '')
      setDescription(existingProject.description || '')
      setStatus(existingProject.status || 'Idea')
      setStack(existingProject.stack || '')
      setStartDate(existingProject.startDate || '')
      setEndDate(existingProject.endDate || '')
      setLessonsLearned(existingProject.lessonsLearned || '')
      setLinks(existingProject.links ? existingProject.links.map(l => ({ ...l })) : [])
      setTags(existingProject.tags ? [...existingProject.tags] : [])
      setInitialized(true)
    }
  }, [mode, existingProject, initialized])

  // Clear endDate when status changes away from Shipped/Abandoned
  function handleStatusChange(e) {
    const newStatus = e.target.value
    setStatus(newStatus)
    if (!END_DATE_STATUSES.includes(newStatus)) {
      setEndDate('')
    }
  }

  function addLink() {
    if (links.length >= 3) return
    setLinks(prev => [...prev, { id: generateId(), label: '', url: '' }])
  }

  function removeLink(linkId) {
    setLinks(prev => prev.filter(l => l.id !== linkId))
  }

  function updateLink(linkId, field, value) {
    setLinks(prev => prev.map(l => l.id === linkId ? { ...l, [field]: value } : l))
  }

  function validate() {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Name is required'
    } else if (name.length > 60) {
      newErrors.name = 'Name must be 60 characters or fewer'
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required'
    } else if (description.length > 200) {
      newErrors.description = 'Description must be 200 characters or fewer'
    }

    const linkErrors = {}
    links.forEach(link => {
      if (link.url && !isValidUrl(link.url)) {
        linkErrors[link.id] = 'Must be a valid URL'
      } else if (!link.url && link.label) {
        // URL is empty but label is present — treat as invalid
        linkErrors[link.id] = 'Must be a valid URL'
      }
    })
    if (Object.keys(linkErrors).length > 0) {
      newErrors.links = linkErrors
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      status,
      stack: stack.trim(),
      startDate: startDate || null,
      endDate: END_DATE_STATUSES.includes(status) ? (endDate || null) : null,
      lessonsLearned: lessonsLearned.trim(),
      links,
      tags,
    }

    if (mode === 'create') {
      const newProject = addProject(payload)
      navigate(`/projects/${newProject.id}`)
    } else {
      updateProject(id, payload)
      navigate(`/projects/${id}`)
    }
  }

  function handleCancel() {
    if (mode === 'create') {
      navigate('/')
    } else {
      navigate(`/projects/${id}`)
    }
  }

  if (mode === 'edit' && projects.length > 0 && !existingProject) {
    return (
      <div className="min-h-screen bg-bg-base px-4 py-8">
        <p className="text-text-primary">Project not found.</p>
      </div>
    )
  }

  const showEndDate = END_DATE_STATUSES.includes(status)

  return (
    <div className="min-h-screen bg-bg-base px-4 py-8">
      <div className="max-w-2xl mx-auto bg-bg-surface border border-border rounded-lg p-6">
        <h1 className="text-xl font-semibold text-text-primary mb-6">
          {mode === 'create' ? 'New project' : 'Edit project'}
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label className="text-text-secondary text-sm block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-text-secondary text-sm block mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="text-text-secondary text-sm block mb-1">Status</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Tech stack */}
          <div className="mb-4">
            <label className="text-text-secondary text-sm block mb-1">Tech stack</label>
            <input
              type="text"
              value={stack}
              onChange={e => setStack(e.target.value)}
              placeholder="React, Node, Postgres"
              className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="text-text-secondary text-sm block mb-1">Tags</label>
            {/* Existing tags as chips */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(prev => prev.filter(t => t !== tag))}
                      className="text-accent/60 hover:text-accent ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            {/* Input row */}
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault()
                    const trimmed = tagInput.trim().replace(/,$/, '')
                    if (trimmed && !tags.includes(trimmed)) {
                      setTags(prev => [...prev, trimmed])
                    }
                    setTagInput('')
                  }
                }}
                placeholder="Add tag…"
                className="flex-1 bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={() => {
                  const trimmed = tagInput.trim()
                  if (trimmed && !tags.includes(trimmed)) {
                    setTags(prev => [...prev, trimmed])
                  }
                  setTagInput('')
                }}
                className="bg-bg-elevated border border-border text-text-secondary px-3 py-2 rounded text-sm hover:text-text-primary"
              >
                Add
              </button>
            </div>
          </div>

          {/* Start date */}
          <div className="mb-4">
            <label className="text-text-secondary text-sm block mb-1">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          {/* End date — conditional */}
          {showEndDate && (
            <div className="mb-4">
              <label className="text-text-secondary text-sm block mb-1">End date</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
              />
            </div>
          )}

          {/* Links */}
          <div className="mb-4">
            <label className="text-text-secondary text-sm block mb-1">Links</label>
            {links.map(link => (
              <div key={link.id} className="flex gap-2 items-start mb-2">
                <div style={{ width: '30%' }}>
                  <input
                    type="text"
                    value={link.label}
                    onChange={e => updateLink(link.id, 'label', e.target.value)}
                    placeholder="Label"
                    className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={link.url}
                    onChange={e => updateLink(link.id, 'url', e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
                  />
                  {errors.links && errors.links[link.id] && (
                    <p className="text-red-400 text-xs mt-1">{errors.links[link.id]}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeLink(link.id)}
                  className="mt-2 text-text-muted hover:text-text-primary"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLink}
              disabled={links.length >= 3}
              className="text-accent text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add link
            </button>
          </div>

          {/* Lessons learned */}
          <div className="mb-6">
            <label className="text-text-secondary text-sm block mb-1">Lessons learned</label>
            <textarea
              value={lessonsLearned}
              onChange={e => setLessonsLearned(e.target.value)}
              rows={4}
              className="w-full bg-bg-base border border-border rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded text-sm"
            >
              {mode === 'create' ? 'Create project' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-transparent border border-border text-text-secondary px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm
