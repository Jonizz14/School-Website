import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ScientistWork.css";
import AOS from "aos";
import "aos/dist/aos.css";

function ScientistWork() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    fetch('http://localhost:3000/scientificWorks')
      .then(response => response.json())
      .then(data => setWorks(data))
      .catch(error => console.error('Error fetching scientist works:', error));
  }, []);

  return (
    <div data-aos="fade-up" className="news-section">
      <p className="news-section-p1">Ilmiy Ishlar</p>
      <p className="news-section-p2">
        Maktabimizda fanlar bo'yicha ishlar va tadqiqotlar rivojlantiriladi.
        Bu bo'limda fanlar ishlar, loyihalar va yutuqlar haqida ma'lumotlar beriladi.
      </p>

      <div data-aos="fade-up" className="news-list">
        {works.map(work => (
          <Link key={work.id} to={`/scientistwork/${work.id}`} state={{ work }} className="news-card-link">
            <div className="news-card">
              <img src={work.image} alt={work.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />

              <div className="news-card-header">
                <h3>{work.title}</h3>
              </div>

              <p>O'quvchi: {work.studentName}</p>
              <p>{work.description}</p>

              <div className="news-card-footer">
                <span className="detail-link">Batafsil</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {works.length === 0 && (
        <p className="no-news">Ma'lumot topilmadi.</p>
      )}
    </div>
  );
}

export default ScientistWork;