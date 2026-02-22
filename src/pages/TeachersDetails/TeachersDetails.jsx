import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";
import "./TeachersDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function TeacherDetails() {
  const location = useLocation();
  const teacher = location.state?.teacher;
  const [teachersList, setTeachersList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/teachers/`)
      .then((res) => res.json())
      .then((data) => setTeachersList(Array.isArray(data) ? data : data.results || []))
      .catch((err) => {
        console.error("❌ Xatolik:", err);
        setTeachersList([]);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  if (!teacher) {
    return (
      <div className="teacherdetails">
        <p>Ustoz topilmadi.</p>
        <Link to="/teachers" className="breadcrumb-link">
          ⬅ Ustozlarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <>
    <div className="teacherdetails-layout">
      <div className="teacherdetails-main">
        <div data-aos="fade-up" className="teacherdetails">
          <div className="breadcrumb">
            <Link to="/teachers" className="breadcrumb-link">
              Ustozlar
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">
              {teacher.first_name} {teacher.last_name}
            </span>
          </div>

          <img
            src={teacher.image}
            alt={`${teacher.first_name} ${teacher.last_name}`}
            className="teacherdetails-img"
          />

          <h2 className="teacherdetails-title">
            {teacher.first_name} {teacher.last_name}
          </h2>
          <p className="teacherdetails-subject">{teacher.profession}</p>

          <div className="teacher-social-wrapper">
            {teacher.instagram && (
              <a
                href={teacher.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <FaInstagram />
              </a>
            )}
            {teacher.telegram && (
              <a
                href={teacher.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <FaTelegram />
              </a>
            )}
            {teacher.facebook && (
              <a
                href={teacher.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <FaFacebook />
              </a>
            )}
          </div>

          <div className="teacherdetails-info">
            <p>
              <strong>Biografiya:</strong>
            </p>
            <p>{teacher.main_biography || "Biografiya hali qo‘shilmagan."}</p>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" className="teacherdetails-side">
        <h3 className="side-title">Qo'shimcha ustozlar</h3>
        {Array.isArray(teachersList) && teachersList
          .slice(0, 12)
          .map((item) => (
            <div key={item.id} className="side-card">
              <img
                src={item.image}
                alt={`${item.first_name} ${item.last_name}`}
                className="side-card__img"
              />
              <div className="side-card__body">
                <h4 className="side-card__title">
                  {item.first_name} {item.last_name}
                </h4>
                <Link
                  to={`/teachers/${item.id}`}
                  state={{ teacher: item }}
                  className="side-card__btn"
                >
                  Batafsil →
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
    </>
  );
}

export default TeacherDetails;
