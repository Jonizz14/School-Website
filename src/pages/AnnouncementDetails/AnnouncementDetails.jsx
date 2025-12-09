import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoCalendarNumber, IoTimeOutline } from "react-icons/io5";
import "./AnnouncementDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function AnnouncementDetails() {
  const location = useLocation();
  const announcement = location.state?.announcement;
  const [announcementsList, setAnnouncementsList] = useState([]);
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
    fetch("/api/event/")
      .then((res) => res.json())
      .then((data) => setAnnouncementsList(data.results || []))
      .catch((err) => console.error("❌ Xatolik:", err));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  if (!announcement) {
    return (
      <div className="announcementdetails">
        <p>E'lon topilmadi.</p>
        <Link to="/announcements" className="breadcrumb-link">
          ⬅ E'lonlarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="announcementdetails-layout">
        <div className="announcementdetails-main">
          <div data-aos="fade-up" className="announcementdetails">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/announcements" className="breadcrumb-link">
                E'lonlar
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{announcement.topic}</span>
            </div>

            {announcement.image && (
              <img
                src={announcement.image}
                alt={announcement.topic}
                className="announcementdetails-img"
                onClick={() => openModal({ type: "image", src: announcement.image })}
              />
            )}

            <h2 className="announcementdetails-title">{announcement.topic}</h2>
            <p className="announcementdetails-desc">{announcement.description}</p>

            <div className="announcementdetails-footer">
              <div className="announcementdetails-date">
                <IoCalendarNumber size={28} className="announcementdetails-icon" />
                <span className="announcementdetails-date-text">{new Date(announcement.start_time).toLocaleDateString('uz-UZ')}</span>
              </div>

              <div className="announcementdetails-time">
                <IoTimeOutline size={28} className="announcementdetails-icon" />
                <span className="announcementdetails-time-text">{new Date(announcement.start_time).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })} - {new Date(announcement.end_time).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="announcementdetails-side">
          <h3 className="side-title">Qo'shimcha e'lonlar</h3>
          {announcementsList.slice(0, 14).map((item) => (
            <div key={item.id} className="side-card">
              <img
                src={item.image}
                alt={item.topic}
                className="side-card__img"
              />
              <div className="side-card__body">
                <h4 className="side-card__title">{item.topic}</h4>
                <Link
                  to={`/announcements/${item.id}`}
                  state={{ announcement: item }}
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

export default AnnouncementDetails;
