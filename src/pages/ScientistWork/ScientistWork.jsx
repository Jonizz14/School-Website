import React, { useEffect, useState } from "react";
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
    <section className="scientist-work">
      <div className="scientist-work__container">
        <h2 data-aos="fade-up" className="scientist-work__title">
          Ilmiy Ishlar
        </h2>

        <p data-aos="fade-up" className="scientist-work__subtitle">
          Maktabimizda o‘quvchilarning ilmiy faoliyati va tadqiqotlari rivojlantiriladi.
          Bu bo‘limda ilmiy ishlar, loyihalar va yutuqlar haqida ma’lumotlar beriladi.
        </p>

        <div data-aos="fade-up" className="scientist-work__grid">
          {works.map(work => (
            <div key={work.id} className="scientist-work__card">
              <video controls className="scientist-work__video">
                <source src={work.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="scientist-work__card-title">{work.title}</h3>
              <p className="scientist-work__card-student">O‘quvchi: {work.studentName}</p>
              <p className="scientist-work__card-description">{work.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScientistWork;