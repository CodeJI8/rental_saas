import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      if (data.success) {
        setSuccess(true);

        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="register-page">
        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h2>Registration Successful!</h2>

          <p>
            Your account has been created successfully.
            You can now login to your account.
          </p>

          <button
            className="success-button"
            onClick={() => navigate('/login')}
          >
            Proceed to Login
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="register-page">

      <div className="register-card">

        {/* Header */}
        <div className="register-header">

          <div className="logo">
            RS
          </div>

          <h1>Create your account</h1>

          <p>
            Get started with Rental SaaS
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="register-form"
        >

          {/* Full Name */}
          <div className="form-group">

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>

          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <span className="input-hint">
              Must be at least 6 characters
            </span>

          </div>

          {/* Confirm Password */}
          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />

          </div>

          {/* Error */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        {/* Login */}
        <div className="login-link">

          <span>
            Already have an account?
          </span>

          <button
            type="button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default Register;