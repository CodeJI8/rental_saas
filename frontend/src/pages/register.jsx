import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { register } from "../api/auth.js";
import {toast } from 'react-toastify';

const Register = () => {
const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  password: '',
  orgName: '',
});


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {


 await register(formData);
  toast.success("Registration Successful");

  navigate("/login");

} catch (err) {
  const message =
    err.response?.data?.message || "Registration failed";

  toast.error(message);
}

  };
  

return (
  <div className="register-page">

    <div className="register-card">

      <div className="register-header">
        <div className="logo">RS</div>

        <h1>Create your account</h1>

        <p>Set up your Rental SaaS workspace</p>
      </div>

      <form onSubmit={handleSubmit} className="register-form">

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>

          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="orgName">Organization Name</label>

          <input
            type="text"
            id="orgName"
            name="orgName"
            value={formData.orgName}
            onChange={handleChange}
            placeholder="Your property management company"
            required
          />

          <span className="input-hint">
            This will be your Rental SaaS workspace
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>

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

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

          <span className="input-hint">
            At least 6 characters
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
          />
        </div>

    <button
  type="submit"
  className="register-button"
>
  Create Account
</button>
      </form>

      <div className="login-link">
        <span>Already have an account?</span>

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