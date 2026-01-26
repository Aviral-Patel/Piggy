import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SMSParser from './pages/SMSParser.jsx'
import TemplateApproval from './pages/TemplateApproval.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sms-parser" element={<SMSParser />} />
        <Route path="/template-approval" element={<TemplateApproval />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
