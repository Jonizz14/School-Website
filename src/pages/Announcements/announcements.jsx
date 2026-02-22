import React, { useEffect, useState } from "react";
import { IoTimeOutline, IoCalendarNumber } from "react-icons/io5";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import "/src/pages/Announcements/announcements.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader/Loader";

function Announcements() {
  const [anons, setAnons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [bookmarked, setBookmarked] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarkedNews")) || [];
  });

  function getFirstWordsFromHTML(html = "", wordCount = 5) {
    const text = html.replace(/<[^>]*>/g, ""); 
    return text.split(/\s+/).slice(0, wordCount).join(" ") + (text.split(/\s+/).length > wordCount ? '...' : '');
  }

  useEffect(() => {
    localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarked));
  }, [bookmarked]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/event/`)
      .then((res) => res.json())
      .then((data) => {
        setAnons(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showOnlyBookmarked]);

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const filteredAnons = anons.filter((item) =>
    item.topic?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((item) =>
    showOnlyBookmarked ? bookmarked.includes(item.id) : true
  );

  const totalPages = Math.ceil(filteredAnons.length / itemsPerPage);
  const currentItems = filteredAnons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <Loader />;

  return (
    <div data-aos="fade-up" className="anons-section">
      <p className="anons-title">E'lonlar</p>
      <p className="anons-subtitle">Maktabimizdagi eng so‘nggi anonslar va xabarlar</p>

      <div className="addition-controls">
        <form className="anons-form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="anons-input"
            placeholder="Anonslarni qidirish..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <button
          className={`bookmark-toggle ${showOnlyBookmarked ? "active" : ""}`}
          onClick={() => setShowOnlyBookmarked((prev) => !prev)}
        >
          {showOnlyBookmarked ? <BsBookmarkFill size={20} /> : <BsBookmark size={20} />}
        </button>
      </div>

      <div data-aos="fade-up" className="anons-list">
        {currentItems.map((item) => (
          <div key={item.id} className="anons-card">
            <div className="anons-image-wrapper">
              <img src={item.image} alt={item.topic} />
              <button className="bookmark-btn" onClick={() => toggleBookmark(item.id)}>
                {bookmarked.includes(item.id) ? (
                  <BsBookmarkFill className="bookmark-icon active" />
                ) : (
                  <BsBookmark className="bookmark-icon" />
                )}
              </button>
            </div>

            <div className="anons-card-header">
              <h3>{item.topic}</h3>
            </div>

            <p>{getFirstWordsFromHTML(item.description, 10)}</p>

            <div className="anons-card-footer">
              <div style={{ display: "flex", gap: "16px" }}>
                <div className="anons-date">
                  <IoCalendarNumber className="time-icon" />
                  <span className="date-text">{new Date(item.start_time).toLocaleDateString('uz-UZ')}</span>
                </div>
                <div className="anons-time">
                  <IoTimeOutline className="time-icon" />
                  <span className="time-text">{new Date(item.start_time).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <Link to={`/announcements/${item.id}`} state={{ announcement: item }} className="anons-detail-link">Batafsil</Link>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          total={filteredAnons.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      )}

      {filteredAnons.length === 0 && <p className="no-anons">E'lon topilmadi.</p>}
    </div>
  );
}

export default Announcements;
