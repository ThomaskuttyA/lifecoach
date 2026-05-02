import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, User, ArrowRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContent();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid admin password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <motion.div 
          className="blob blob-1"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="blob blob-2"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <motion.div 
        className="login-card glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-header">
          <div className="logo">
            <Heart className="logo-icon" fill="#6366f1" color="#6366f1" />
            <span>Nayora Bloom</span>
          </div>
          <h2>Admin Portal</h2>
          <p>Sign in to manage your website content</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label><User size={16} /> Admin User</label>
            <input 
              type="text" 
              value="Admin" 
              disabled 
              className="glass-input"
            />
          </div>

          <div className="form-group">
            <label><Lock size={16} /> Password</label>
            <input 
              type="password" 
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              autoFocus
            />
          </div>

          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-msg">{error}</motion.p>}

          <button type="submit" className="btn-primary full-width">
            Login to Dashboard <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-footer">
          <button onClick={() => navigate('/')} className="btn-text">Back to Website</button>
        </div>
      </motion.div>

      <style jsx="true">{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a;
          overflow: hidden;
          position: relative;
          color: white;
          padding: 2rem;
        }

        .login-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .blob {
          position: absolute;
          width: 500px;
          height: 500px;
          filter: blur(80px);
          opacity: 0.15;
          border-radius: 50%;
        }

        .blob-1 {
          background: #6366f1;
          top: -100px;
          right: -100px;
        }

        .blob-2 {
          background: #ec4899;
          bottom: -100px;
          left: -100px;
        }

        .login-card {
          width: 100%;
          max-width: 450px;
          padding: 3rem;
          border-radius: 24px;
          position: relative;
          z-index: 1;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .login-header .logo {
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .login-header h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-header p {
          color: #94a3b8;
        }

        .login-form .form-group {
          margin-bottom: 1.5rem;
        }

        .login-form label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #cbd5e1;
        }

        .glass-input {
          width: 100%;
          padding: 0.8rem 1.2rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          color: #0f172a;
          outline: none;
          transition: all 0.3s;
        }

        .glass-input:focus {
          background: white;
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .error-msg {
          color: #ef4444;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .full-width {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Login;
