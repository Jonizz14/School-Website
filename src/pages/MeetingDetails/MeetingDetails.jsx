import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { IoCalendarNumber } from "react-icons/io5";
import { Helmet } from "react-helmet";
import "/src/pages/MeetingDetails/MeetingDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function MeetingDetails() {
  const location = useLocation();
  const { id } = useParams();
  const meeting = location.state?.meeting;
  const [meetingData, setMeetingData] = useState(meeting);
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
    if (!meetingData && id) {
      fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/news/${id}/`)
        .then((res) => res.json())
        .then((data) => setMeetingData(data))
        .catch((err) => console.error("❌ Xatolik:", err));
    }

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/news`)
      .then((res) => res.json())
      .then((data) => setMeetingsList((Array.isArray(data) ? data : data.results || data.data || []).filter((item) => item?.category == 1)))
      .catch((err) => console.error("❌ Xatolik:", err));
  }, [id, meetingData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  if (!meetingData) {
    return (
      <div className="newsdetails">
        <p>Uchrashuv topilmadi.</p>
        <Link to="/meeting" className="breadcrumb-link">
          ⬅ Uchrashuvlarga qaytish
        </Link>
      </div>
    );
  }

  const description = meetingData.description?.replace(/<[^>]*>/g, "").substring(0, 160) + "...";

  const isYouTube = (url) => url && url.includes("youtube.com");

  const getYouTubeEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <>
      <Helmet>
        <title>{meetingData.title} - Maktab Uchrashuvlari</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={meetingData.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={meetingData.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meetingData.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={meetingData.image} />
      </Helmet>
      
      <div className="newsdetails-layout">
        <div className="newsdetails-main">
          <div data-aos="fade-up" className="newsdetails">
            <div className="breadcrumb">
              <Link to="/meeting" className="breadcrumb-link">
                Uchrashuvlar
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{meetingData.title}</span>
            </div>

            {meetingData.image && (
              <img
                src={meetingData.image}
                alt={meetingData.title}
                className="newsdetails-img"
                onClick={() =>
                  openModal({ type: "image", src: meetingData.image })
                }
              />
            )}

            {meetingData.video && (
              isYouTube(meetingData.video) ? (
                <iframe
                  src={getYouTubeEmbedUrl(meetingData.video)}
                  title={meetingData.title}
                  className="newsdetails-video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={meetingData.video}
                  controls
                  className="newsdetails-video"
                  onClick={() => openModal({ type: "video", src: meetingData.video })}
                />
              )
            )}

            <h2 className="newsdetails-title">{meetingData.title}</h2>
            <p className="newsdetails-description" dangerouslySetInnerHTML={{ __html: meetingData.description }} />

            <div className="newsdetails-footer">
              <IoCalendarNumber size={28} className="newsdetails-icon" />
              <span className="newsdetails-date">{new Date(meetingData.time).toLocaleDateString("uz-UZ")}</span>
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