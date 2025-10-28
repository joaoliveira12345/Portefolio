import React, { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
        const data = await response.json();

        if (response.ok && data.success) {
          setPortfolio(data.projects || []);
        } else {
          setError(data.message || 'Failed to load projects');
        }
      } catch (err) {
        console.error('Portfolio error:', err);
        setError('Network error. Please check if backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderPortfolio = (portfolioData) => {
    if (!Array.isArray(portfolioData) || portfolioData.length === 0) {
      return <p>No projects available</p>;
    }

    return (
      <div className="images-container">
        {portfolioData.map((port, idx) => (
          <div className="image-box" key={port.id || idx}>
            <img
              src={port.cover || port.image}
              className="portfolio-image"
              alt={port.title || port.name || 'portfolio'}
            />
            <div className="content">
              <p className="title">{port.title || port.name}</p>
              <h4 className="description">{port.description}</h4>
              <button
                className="btn"
                onClick={() => window.open(port.url || port.link)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Loading...'.split('')}
            idx={15}
          />
        </h1>
        <Loader type="pacman" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Error'.split('')}
            idx={15}
          />
        </h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Portfolio'.split('')}
            idx={15}
          />
        </h1>
        <div>{renderPortfolio(portfolio)}</div>
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default Portfolio;