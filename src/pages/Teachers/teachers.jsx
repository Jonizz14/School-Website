import React, { useEffect, useState } from "react";
import "./teachers.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/teachers/`);
        const data = await res.json();
        setTeachers(data.results);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = `${teacher.first_name} ${teacher.last_name}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      teacher.profession.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleNavigate = (teacher) => {
    navigate(`/teachers/${teacher.id}`, { state: { teacher } });
  };

  const handleKeyDown = (e, teacher) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate(teacher);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section data-aos="fade-up" className="teachers__main-section">
        <div className="teachers__section">
          <p className="teachers__title">Bizning ustozlar</p>
          <p className="teachers__subtitle">
            Bizning professional o'qituvchilar jamoamiz bilan tanishing
          </p>
          <form className="teachers__form">
            <div className="teachers__input-wrapper">
              <input
                type="text"
                className="teachers__input"
                placeholder="O‘qituvchini qidirish..."
              />
              <button
                type="button"
                className="teachers__reset-btn"
                onClick={() => {
                  document.querySelector(".teachers__input").value = "";
                }}
              >
                ×
              </button>
            </div>
          </form>
        </div>

        <section data-aos="fade-up" className="teachers__grid">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="teachers__card"
                onClick={() => handleNavigate(teacher)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, teacher)}
              >
                <img
                  src={teacher.image}
                  alt={`${teacher.first_name} ${teacher.last_name}`}
                />
                <h3>
                  {teacher.first_name} {teacher.last_name}
                </h3>
                <p className="teachers__subject">{teacher.profession}</p>
              </div>
            ))
          ) : (
            <p className="teachers__no-result">
              So'rovingiz bo'yicha hech narsa topilmadi.
            </p>
          )}
        </section>
      </section>
    </>
  );
}

export default Teachers;
