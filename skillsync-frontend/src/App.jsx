import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import CreateProject from "./pages/CreateProject"
import ProjectDetails from "./pages/ProjectDetails"
import MyProjects from "./pages/MyProjects"
import MyApplications from "./pages/MyApplications"
import TeamDashboard from "./pages/TeamDashboard"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import PublicRoute from "./components/PublicRoute";
import ApplyProject from "./pages/ApplyProject";
import ProjectApplications from "./pages/ProjectApplications";


function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route
  path="/"
  element={
    <PublicRoute>
      <Landing />
    </PublicRoute>
  }
/>

<Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

<Route
  path="/register"
  element={
    <PublicRoute>
      <Register />
    </PublicRoute>
  }
/>


        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/apply/:projectId" element={<ProtectedRoute><ApplyProject /></ProtectedRoute> }/>
        <Route path="/my-projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
        <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
        <Route path="/project-applications/:projectId" element={ <ProtectedRoute> <ProjectApplications /></ProtectedRoute>}/>
        <Route path="/team-dashboard/:projectId" element={ <ProtectedRoute> <TeamDashboard /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
