import React, { useEffect, useState } from "react";
import "./TalentedStudents.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function TalentedStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/students/`);
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : data.results || data.data || []);
      } catch (error) {
        console.error("Error fetching talented students:", error);
      }
    };
    fetchStudents();
  }, []);

const filteredStudents = students.filter((student) => {
  const fullName = `${student.first_name ?? ""} ${student.last_name ?? ""}`.toLowerCase();
  return fullName.includes(searchTerm.toLowerCase());
});

  const handleKeyDown = (e, student) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate(student);
    }
  };

  const handleNavigate = (student) => {
    navigate(`/talented/${student.id}`, { state: { student } });
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section data-aos="fade-up" className="talented-students">
      <div className="talented-students__header">
        <p className="talented-students__title">Iqtidorli o‘quvchilar</p>
        <p className="talented-students__subtitle">
          Bizning maktabdagi iqtidorli o‘quvchilar bilan tanishing
        </p>

        <form
          className="talented-students__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="talented-students__input-wrapper">
            <input
              className="talented-students__input"
              placeholder="Ism yoki familiya bo‘yicha qidiring"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="talented-students__reset-btn"
              type="button"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          </div>
        </form>
      </div>

      <section className="talented-students__grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="talented-students__card"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, student)}
            >
              <img
                src={student.image}
                alt={`${student.first_name} ${student.last_name}`}
                className="talented-students__img"
              />
              <h3 className="talented-students__name">
                {student.first_name} {student.last_name}
              </h3>
              <p className="talented-students__subject">Iqtidorli o‘quvchi</p>
              <p className="talented-students__bio">
                {student.biography}
              </p>
            </div>
          ))
        ) : (
          <p className="talented-students__no-result">
            So‘rovingiz bo‘yicha hech narsa topilmadi.
          </p>
        )}
      </section>
    </section>
  );
}

export default TalentedStudents;
