import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/portfolio');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || {}));

        // Redirect to portfolio after successful login
        navigate('/portfolio');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '50px', 
      maxWidth: '400px', 
      margin: '100px auto',
      background: '#1a1a1a',
      borderRadius: '8px',
      color: '#fff'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Portfolio Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            placeholder="admin@local"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #333',
              background: '#2a2a2a',
              color: '#fff'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            placeholder="admin123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #333',
              background: '#2a2a2a',
              color: '#fff'
            }}
          />
        </div>
        {error && <p style={{ color: '#ff6b6b', marginBottom: '15px' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            fontSize: '16px',
            background: '#ffd700',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#999' }}>
        <p>Default Admin Credentials:</p>
        <p><strong>Email:</strong> admin@local</p>
        <p><strong>Password:</strong> admin123</p>
      </div>
    </div>
  );
};

export default Login;