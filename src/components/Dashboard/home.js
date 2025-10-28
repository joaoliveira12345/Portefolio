import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    url: ''
  });
  const navigate = useNavigate();

  // Load dashboard data and projects
  useEffect(() => {
    loadDashboard();
    loadProjects();
  }, []);

  const loadDashboard = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/projects/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setDashboardData(json);
      } else {
        setError(json.message || 'Failed to load dashboard');
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const json = await res.json();
      if (res.ok && json.success) {
        setProjects(json.projects || []);
      }
    } catch (e) {
      console.error('Error loading projects:', e);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        alert('Project added successfully!');
        setFormData({ title: '', description: '', image: '', url: '' });
        setShowForm(false);
        loadProjects(); // Reload projects
      } else {
        alert(json.message || 'Failed to add project');
      }
    } catch (e) {
      alert('Network error. Check if backend is running.');
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert('Project deleted successfully!');
        loadProjects();
      } else {
        alert('Failed to delete project');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  if (loading) return <div className="dashboard-container">Loading...</div>;
  if (error) return <div className="dashboard-container error-msg">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        {dashboardData?.user && (
          <div className="user-info">
            <p><strong>Name:</strong> {dashboardData.user.name}</p>
            <p><strong>Role:</strong> {dashboardData.user.role}</p>
          </div>
        )}
      </div>

      <div className="dashboard-actions">
        <button onClick={() => setShowForm(!showForm)} className="btn-add">
          {showForm ? 'Cancel' : '+ Add New Project'}
        </button>
      </div>

      {showForm && (
        <div className="project-form">
          <h2>Add New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g., My Portfolio Website"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Brief description of your project..."
              />
            </div>

            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label>Project URL *</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                required
                placeholder="https://your-project.com"
              />
            </div>

            <button type="submit" className="btn-submit">Add Project</button>
          </form>
        </div>
      )}

      <div className="projects-list">
        <h2>Your Projects ({projects.length})</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image || project.cover} alt={project.title} />
              <div className="project-info">
                <h3>{project.title || project.name}</h3>
                <p>{project.description}</p>
                <div className="project-actions">
                  <a href={project.url || project.link} target="_blank" rel="noreferrer" className="btn-view">
                    View Project
                  </a>
                  {dashboardData?.user?.role === 'admin' && (
                    <button onClick={() => handleDelete(project.id)} className="btn-delete">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;