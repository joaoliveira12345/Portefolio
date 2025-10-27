import React, { useEffect, useState } from "react";
import "./index.scss";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
        const json = await res.json();
        if (res.ok && json.success) setProjects(json.projects);
        else setErr(json.message || "Failed to load projects");
      } catch (e) {
        setErr("Network error");
      }
    };
    load();
  }, []);

  if (err) return <div className="container portfolio-page">{err}</div>;

  return (
    <div className="container portfolio-page">
      <h1 className="page-title">Portfolio</h1>
      <div className="images-container">
        {projects.map((p) => (
          <div className="image-box" key={p.id}>
            <img
              className="portfolio-image"
              src={p.cover || p.image}
              alt={p.title || p.name}
            />
            <div className="content">
              <p className="title">{p.title || p.name}</p>
              <h4 className="description">{p.description}</h4>
              {(p.url || p.link) && (
                <button className="btn" onClick={() => window.open(p.url || p.link, "_blank")}>
                  View
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;