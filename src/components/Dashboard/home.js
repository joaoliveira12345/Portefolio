import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/projects/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setData(json);
        } else {
          setErr(json.message || 'Failed to load dashboard');
          if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
          }
        }
      } catch (e) {
        setErr('Network error');
      }
    };
    load();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (err) return <div style={{ padding: '50px' }}>{err}</div>;
  if (!data) return <div style={{ padding: '50px' }}>Loading...</div>;

  return (
    <div style={{ padding: '50px' }}>
      <h2>{data.message}</h2>
      {data.user && (
        <ul>
          <li>Name: {data.user.name}</li>
          <li>Email: {data.user.email}</li>
          <li>Role: {data.user.role}</li>
        </ul>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;