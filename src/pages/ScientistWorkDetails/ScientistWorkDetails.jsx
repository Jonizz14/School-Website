import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoCalendarNumber } from "react-icons/io5";
import "./ScientistWorkDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function ScientistWorkDetails() {
  const location = useLocation();
  const work = location.state?.work;
  const [worksList, setWorksList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openModal = (media) => {
    setSelectedMedia(media);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setModalOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/scientistWorks")
      .then((res) => res.json())
      .then((data) => setWorksList(data))
      .catch((err) => console.error("❌ Xatolik:", err));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  if (!work) {
    return (
      <div className="scientistworkdetails">
        <p>Ish topilmadi.</p>
        <Link to="/scientistwork" className="breadcrumb-link">
          ⬅ Ishlarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="scientistworkdetails-layout">
        <div className="scientistworkdetails-main">
          <div data-aos="fade-up" className="scientistworkdetails">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/scientistwork" className="breadcrumb-link">
                Fanlar Ishlari
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{work.title}</span>
            </div>

            {work.video && (
              <video
                src={work.video}
                controls
                className="scientistworkdetails-video"
                onClick={() => openModal({ type: "video", src: work.video })}
              />
            )}

            <h2 className="scientistworkdetails-title">{work.title}</h2>
            <p className="scientistworkdetails-desc">O'quvchi: {work.studentName}</p>
            <p className="scientistworkdetails-desc">{work.description}</p>

            <div className="scientistworkdetails-footer">
              <IoCalendarNumber size={28} className="scientistworkdetails-icon" />
              <span className="scientistworkdetails-date">{work.date || "Sana mavjud emas"}</span>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="scientistworkdetails-side">
          <h3 className="side-title">Qo'shimcha ishlar</h3>
          {worksList.slice(0, 14).map((item) => (
            <div key={item.id} className="side-card">
              <video
                src={item.video}
                className="side-card__video"
                muted
              />
              <div className="side-card__body">
                <h4 className="side-card__title">{item.title}</h4>
                <Link
                  to={`/scientistwork/${item.id}`}
                  state={{ work: item }}
                  className="side-card__btn"
                >
                  Batafsil →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedMedia.src}
              controls
              autoPlay
              className="modal-video"
            />
            <button className="details-close-btn" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ScientistWorkDetails;