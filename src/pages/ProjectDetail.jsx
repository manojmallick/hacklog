import { useParams } from 'react-router-dom'

function ProjectDetail() {
  const { id } = useParams()
  return <div>ProjectDetail — id: {id}</div>
}

export default ProjectDetail
