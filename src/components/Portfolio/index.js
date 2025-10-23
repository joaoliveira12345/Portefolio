import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Portfolio = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!db) return; // guard if firebase not initialized

    const fetch = async () => {
      try {
        const colRef = collection(db, "projects"); // <-- db first, then collection name
        const snap = await getDocs(colRef);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Firestore fetch error:", err);
      }
    };

    fetch();
  }, []);

  const renderPortfolio = (items) => {
    return (
      <div className="images-container">
        {
          items.map((item, idx) => {
            return (
              <div className="image-box" key={idx}>
                <img
                  src={item.image}
                  className="portfolio-image"
                  alt="portfolio" />
                <div className="content">
                  <p className="title">{item.name}</p>
                  <h4 className="description">{item.description}</h4>
                  <button
                    className="btn"
                    onClick={() => window.open(item.url)}
                  >View</button>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  };

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass="text-animate"
            strArray={"Portfolio".split("")}
            idx={15}
          />
        </h1>
        <div>{renderPortfolio(items)}</div>
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default Portfolio;