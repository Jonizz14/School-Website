import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoCalendarNumber } from "react-icons/io5";
import "/src/pages/MeetingDetails/MeetingDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function MeetingDetails() {
  const location = useLocation();
  const meeting = location.state?.meeting;
  const [meetingsList, setMeetingsList] = useState([]);
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
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/news`)
      .then((res) => res.json())
      .then((data) => setMeetings((Array.isArray(data)? data: data.results || data.data || []).filter((item) => item?.category == 1)))
      .catch((err) => console.error("❌ Xatolik:", err));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  if (!meeting) {
    return (
      <div className="newsdetails">
        <p>Uchrashuv topilmadi.</p>
        <Link to="/meeting" className="breadcrumb-link">
          ⬅ Uchrashuvlarga qaytish
        </Link>
      </div>
    );
  }

  const isYouTube = (url) => url && url.includes("youtube.com");

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <>
      <div className="newsdetails-layout">
        <div className="newsdetails-main">
          <div data-aos="fade-up" className="newsdetails">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/meeting" className="breadcrumb-link">
                Uchrashuvlar
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{meeting.title}</span>
            </div>

            {meeting.image && (
              <img
                src={meeting.image}
                alt={meeting.title}
                className="newsdetails-img"
                onClick={() =>
                  openModal({ type: "image", src: meeting.image })
                }
              />
            )}

            {meeting.video && (
              isYouTube(meeting.video) ? (
                <iframe
                  src={getYouTubeEmbedUrl(meeting.video)}
                  title={meeting.title}
                  className="newsdetails-video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={meeting.video}
                  controls
                  className="newsdetails-video"
                  onClick={() => openModal({ type: "video", src: meeting.video })}
                />
              )
            )}

            <h2 className="newsdetails-title">{meeting.title}</h2>
            <p className="newsdetails-description" dangerouslySetInnerHTML={{ __html: meeting.description }} />

            <div className="newsdetails-footer">
              <IoCalendarNumber size={28} className="newsdetails-icon" />
              <span className="newsdetails-date">{new Date(meeting.time).toLocaleDateString("uz-UZ")}</span>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="newsdetails-side">
          <h3 className="side-title">Qo'shimcha uchrashuvlar</h3>
          {meetingsList.slice(0, 14).map((item) => (
            <div key={item.id} className="side-card">
              <img
                src={item.image}
                alt={item.title}
                className="side-card__img"
              />
              <div className="side-card__body">
                <h4 className="side-card__title">{item.title}</h4>
                <Link
                  to={`/meeting/${item.id}`}
                  state={{ meeting: item }}
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
            {selectedMedia?.type === "image" ? (
              <img
                src={selectedMedia.src}
                alt="Full view"
                className="modal-img"
              />
            ) : (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                className="modal-video"
              />
            )}
            <button className="details-close-btn" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MeetingDetails;