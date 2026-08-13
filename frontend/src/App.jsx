import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
// Correct the import path to match your folder structure "auth pages"
import Login from './pages/Login.jsx';
import Register from './pages/register.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
