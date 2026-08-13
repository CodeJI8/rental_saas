import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Correct the import path to match your folder structure "auth pages"
import Register from './pages/auth pages/register.jsx';
import Login from './pages/auth pages/Login.jsx';

// A simple placeholder for your home page
const HomePage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Welcome to Rental SaaS</h1>
    <p>
      Please <Link to="/register">Register</Link> or <Link to="/login">Login</Link> to continue.
    </p>
  </div>
);

// A simple placeholder for the dashboard page after login
const DashboardPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Dashboard</h1>
    <p>Welcome! You are logged in.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App
