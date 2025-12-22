import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoCalendarNumber } from "react-icons/io5";
import { FaFilePdf, FaFileExcel, FaFileWord, FaFilePowerpoint } from "react-icons/fa";
import "./ScientistWorkDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function getFirstWordsFromHTML(html, wordCount = 5) {
    const text = html.replace(/<[^>]*>/g, ""); // HTML taglarni olib tashlash
    return text.split(/\s+/).slice(0, wordCount).join(" ")+'...'; // So'zlarni ajratish va kerakli sonini olish
}

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
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/document`)
      .then((res) => res.json())
      .then((data) => setWorksList(Array.isArray(data) ? data : data.results || data.data || []))
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
            Ilmiy Ishlar
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{work.title}</span>
        </div>

        {work.image && (
          <img
            src={work.image}
            alt={work.title}
            className="scientistworkdetails-img"
            onClick={() => openModal({ type: "image", src: work.image })}
          />
        )}

        {(work.gallery?.length > 1) && (
          <div data-aos="fade-up" className="scientistworkdetails-gallery">
            <div className="gallery-grid">
              {work.gallery?.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 2}`}
                  className="gallery-img"
                  onClick={() => openModal({ type: "image", src: img })}
                />
              ))}
            </div>
          </div>
        )}

        <div className="news-card-header">
              <p>{}</p>
        </div>
        <h2>{work.title}</h2>
        <p className="scientistworkdetails-desc" dangerouslySetInnerHTML={{ __html: work.description }}/>

        <div className="scientistworkdetails-footer">
          <IoCalendarNumber size={28} className="scientistworkdetails-icon" />
          <span className="scientistworkdetails-date">{new Date(work.time).toLocaleDateString('uz-UZ') || "Sana mavjud emas"}</span>
          
            <div className="scientistworkdetails-downloads">
              {work.file && (
                <a href={work.file} download target="_blank" rel="noopener noreferrer" className="download-link">
                  <FaFilePdf size={20} /> View | Download PDF
                </a>
              )}
            </div>
        </div>
          </div>
        </div>

        <div data-aos="fade-up" className="scientistworkdetails-side">
          <h3 className="side-title">Qo'shimcha ishlar</h3>
          {worksList.slice(0, 14).map((item) => (
            <div key={item.id} className="side-card">
              <img
                src={item.image || item.gallery?.[0]}
                alt={item.title}
                className="side-card__img"
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
            <img
              src={selectedMedia.src}
              alt="Full view"
              className="modal-img"
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