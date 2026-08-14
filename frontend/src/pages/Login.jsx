import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const data = await login(formData);
      console.log("Login response data:", data);

      if (data.success) {
        setSuccess(true);

        localStorage.setItem('authToken', data.token);

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      // Use err.response.data.message for axios errors
      const message = err.response?.data?.message || err.message || 'Login failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-page">
        <div className="success-card">
          <h2>Login Successful!</h2>
          <p>
            Welcome back! Redirecting you to the dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h2>Login to Rental SaaS</h2>
          <p>
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="input-group">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <div className="register-link">
          <p>
            Don't have an account?{' '}
            <a href="/register">
              Register here
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;