import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SMSParser from './pages/SMSParser.jsx'
import TemplateApproval from './pages/TemplateApproval.jsx'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route 
          path="/sms-parser" 
          element={
            <ProtectedRoute allowedRoles={['MAKER', 'CHECKER']}>
              <SMSParser />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/template-approval" 
          element={
            <ProtectedRoute allowedRoles={['CHECKER']}>
              <TemplateApproval />
            </ProtectedRoute>
          } 
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
