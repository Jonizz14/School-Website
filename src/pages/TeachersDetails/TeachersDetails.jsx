import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";
import "/src/pages/TeachersDetails/TeachersDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function TeacherDetails() {
  const location = useLocation();
  const teacher = location.state?.teacher;
  const [teachersList, setTeachersList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/teachers")
      .then((res) => res.json())
      .then((data) => setTeachersList(data))
      .catch((err) => console.error("❌ Xatolik:", err));
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
              {teacher.firstName} {teacher.lastName}
            </span>
          </div>

          <img
            src={teacher.photo}
            alt={`${teacher.firstName} ${teacher.lastName}`}
            className="teacherdetails-img"
          />

          <h2 className="teacherdetails-title">
            {teacher.firstName} {teacher.lastName}
          </h2>
          <p className="teacherdetails-subject">{teacher.subject}</p>

          <div className="teacher-social-wrapper">
            {teacher.social?.instagram && (
              <a
                href={teacher.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <FaInstagram />
              </a>
            )}
            {teacher.social?.telegram && (
              <a
                href={teacher.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <FaTelegram />
              </a>
            )}
            {teacher.social?.facebook && (
              <a
                href={teacher.social.facebook}
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
            <p>{teacher.biography || "Biografiya hali qo‘shilmagan."}</p>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" className="teacherdetails-side">
        <h3 className="side-title">Qo'shimcha ustozlar</h3>
        {teachersList
          .filter((t) => t.id !== teacher.id)
          .slice(0, 8)
          .map((item) => (
            <div key={item.id} className="side-card">
              <img
                src={item.photo}
                alt={`${item.firstName} ${item.lastName}`}
                className="side-card__img"
              />
              <div className="side-card__body">
                <h4 className="side-card__title">
                  {item.firstName} {item.lastName}
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
