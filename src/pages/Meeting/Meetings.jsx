import React, { useEffect, useState } from "react";
import "./Meeting.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Meetings() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    fetch('http://localhost:3000/meetings')
      .then(response => response.json())
      .then(data => setWorks(data))
      .catch(error => console.error('Error fetching meetings:', error));
  }, []);

  return (
    <div data-aos="fade-up" className="news-section">
      <p className="news-section-p1">Ilmiy Ishlar</p>
      <p className="news-section-p2">
        Maktabimizda o‘quvchilarning ilmiy faoliyati va tadqiqotlari rivojlantiriladi.
        Bu bo‘limda ilmiy ishlar, loyihalar va yutuqlar haqida ma’lumotlar beriladi.
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

            <p>O‘quvchi: {work.studentName}</p>
            <p>{work.description}</p>
          </div>
        ))}
      </div>

      {works.length === 0 && (
        <p className="no-news">Ma'lumot topilmadi.</p>
      )}
    </div>
  );
}

export default Meetings;