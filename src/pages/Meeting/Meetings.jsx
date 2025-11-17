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
      .catch(error => console.error('Error fetching scientific works:', error));
  }, []);

  return (
    <section className="meeting">
      <div className="meeting__container">
        <h2 data-aos="fade-up" className="meeting__title">
          Ilmiy Ishlar
        </h2>

        <p data-aos="fade-up" className="meeting__subtitle">
          Maktabimizda o‘quvchilarning ilmiy faoliyati va tadqiqotlari rivojlantiriladi.
          Bu bo‘limda ilmiy ishlar, loyihalar va yutuqlar haqida ma’lumotlar beriladi.
        </p>

        <div data-aos="fade-up" className="meeting__grid">
          {works.map(work => (
            <div key={work.id} className="meeting__card">
              <video controls className="meeting__video">
                <source src={work.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="meeting__card-title">{work.title}</h3>
              <p className="meeting__card-student">O‘quvchi: {work.studentName}</p>
              <p className="meeting__card-description">{work.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Meetings;