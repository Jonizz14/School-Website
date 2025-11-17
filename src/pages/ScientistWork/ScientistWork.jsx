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
          <div key={work.id} className="news-card">
            <video controls style={{ width: '100%', height: '220px', objectFit: 'cover' }}>
              <source src={work.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="news-card-header">
              <h3>{work.title}</h3>
            </div>

            <p>O'quvchi: {work.studentName}</p>
            <p>{work.description}</p>

            <div className="news-card-footer">
              <Link
                to={`/scientistwork/${work.id}`}
                state={{ work }}
                className="detail-link"
              >
                Batafsil
              </Link>
            </div>
          </div>
        ))}
      </div>

      {works.length === 0 && (
        <p className="no-news">Ma'lumot topilmadi.</p>
      )}
    </div>
  );
}

export default ScientistWork;