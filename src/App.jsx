import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProjectsProvider } from './context/ProjectsContext'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import ProjectForm from './pages/ProjectForm'

function App() {
  return (
    <BrowserRouter>
      <ProjectsProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects/new" element={<ProjectForm mode="create" />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects/:id/edit" element={<ProjectForm mode="edit" />} />
        </Routes>
      </ProjectsProvider>
    </BrowserRouter>
  )
}

export default App
