import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/hero.jsx'
import FeatureSection from './components/FeatureSection.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SMSParser from './pages/SMSParser.jsx'
import TemplateApproval from './pages/TemplateApproval.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <FeatureSection />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sms-parser" element={<SMSParser />} />
        <Route path="/template-approval" element={<TemplateApproval />} />
      </Routes>
    </Router>
  )
}

export default App
