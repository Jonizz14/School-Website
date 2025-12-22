import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoCalendarNumber } from "react-icons/io5";
import "/src/pages/NewsDetails/NewsDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function NewsDetails() {
  const location = useLocation();
  const news = location.state?.news;
  const [newsList, setNewsList] = useState([]);
  const [teacher, setTeacher] = useState(null);
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
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/news/`)
      .then((res) => res.json())
      .then((data) => setNewsList(data.results || []))
      .catch((err) => console.error("❌ Xatolik:", err));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  if (!news) {
    return (
      <div className="newsdetails">
        <p>Yangilik topilmadi.</p>
        <Link to="/news" className="breadcrumb-link">
          ⬅ Yangiliklarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="newsdetails-layout">
        <div className="newsdetails-main">
          <div data-aos="fade-up" className="newsdetails">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/news" className="breadcrumb-link">
                Yangiliklar
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{news.title}</span>
            </div>

            {news.images && news.images.length > 0 && (
              <img
                src={news.images.find(img => img.is_main)?.image || news.images[0].image}
                alt={news.title}
                className="newsdetails-img"
                onClick={() =>
                  openModal({ type: "image", src: news.images.find(img => img.is_main)?.image || news.images[0].image })
                }
              />
            )}

            {news.images && news.images.length > 1 && (
              <div data-aos="fade-up" className="newsdetails-gallery">
                <div className="gallery-grid">
                  {news.images.filter(img => !img.is_main).map((img, idx) => (
                    <img
                      key={img.id}
                      src={img.image}
                      alt={`Gallery ${idx + 2}`}
                      className="gallery-img"
                      onClick={() => openModal({ type: "image", src: img.image })}
                    />
                  ))}
                </div>
              </div>
            )}

            <h2 className="newsdetails-title">{news.title}</h2>
            <p className="newsdetails-desc" dangerouslySetInnerHTML={{ __html: news.description }} />

            <div className="newsdetails-footer">
              <IoCalendarNumber size={28} className="newsdetails-icon" />
              <span className="newsdetails-date">{new Date(news.time).toLocaleDateString('uz-UZ')}</span>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="newsdetails-side">
          <h3 className="side-title">Qo'shimcha yangiliklar</h3>
          {newsList.slice(0, 14).map((item) => (
            <div key={item.id} className="side-card">
              <img
                src={item.images.find(img => img.is_main)?.image || item.images[0]?.image}
                alt={item.title}
                className="side-card__img"
              />
              <div className="side-card__body">
                <h4 className="side-card__title">{item.title}</h4>
                <Link
                  to="/news/details"
                  state={{ news: item }}
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

export default NewsDetails;
