import { useParams } from 'react-router-dom'

function ProjectForm({ mode }) {
  const { id } = useParams()
  return <div>ProjectForm — mode: {mode}, id: {id}</div>
}

export default ProjectForm
