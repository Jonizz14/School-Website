import React, { useEffect, useState, useRef } from "react";
import { IoCalendarNumber } from "react-icons/io5";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MdViewList, MdAccessTime, MdHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import "./Meeting.css";
import AOS from "aos";
import "aos/dist/aos.css";

  function getFirstWordsFromHTML(html, wordCount = 5) {
    const text = html.replace(/<[^>]*>/g, ""); // HTML taglarni olib tashlash
    return text.split(/\s+/).slice(0, wordCount).join(" ")+'...'; // So'zlarni ajratish va kerakli sonini olish
  }

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [bookmarked, setBookmarked] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarkedMeetings")) || [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarkedMeetings", JSON.stringify(bookmarked));
  }, [bookmarked]);

  const sortOptions = ["all", "bookmarked", "recent", "oldest"];
  const sortIcons = [
    <MdViewList />,
    <BsBookmark />,
    <MdAccessTime />,
    <MdHistory />,
  ];
  const [sortOption, setSortOption] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSortSelect = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/news`
        );
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results || [];
        setMeetings(items.filter((item) => item?.category == 1));
      } catch (err) {
        console.error("Xato:", err);
      }
    };
    fetchMeetings();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  let filteredMeetings = meetings.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "bookmarked") {
    filteredMeetings = filteredMeetings.filter((item) =>
      bookmarked.includes(item.id)
    );
  } else if (sortOption === "recent") {
    filteredMeetings = [...filteredMeetings].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  } else if (sortOption === "oldest") {
    filteredMeetings = [...filteredMeetings].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }

  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const currentItems = filteredMeetings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div data-aos="fade-up" className="news-section">
      <p className="news-section-p1">Uchrashuvlar</p>
      <p className="news-section-p2">
        Maktabimizda o‘tkazilgan uchrashuvlar va muhim tadbirlar haqida
        ma’lumotlar
      </p>

      <div className="news-controls">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="input"
            placeholder="Uchrashuvlarni qidirish..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="sort-dropdown" ref={dropdownRef}>
          <button
            className="sort-btn active"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title={
              sortOption === "all"
                ? "Barchasi"
                : sortOption === "bookmarked"
                ? "Faqat saqlanganlar"
                : sortOption === "recent"
                ? "Eng yangilari"
                : "Eng eskilari"
            }
          >
            {sortIcons[sortOptions.indexOf(sortOption)]}
          </button>
          {isDropdownOpen && (
            <div className="sort-options">
              {sortOptions.map((option, index) => (
                <button
                  key={option}
                  className={`sort-option ${
                    sortOption === option ? "active" : ""
                  }`}
                  onClick={() => handleSortSelect(option)}
                  title={
                    option === "all"
                      ? "Barchasi"
                      : option === "bookmarked"
                      ? "Faqat saqlanganlar"
                      : option === "recent"
                      ? "Eng yangilari"
                      : "Eng eskilari"
                  }
                >
                  {sortIcons[index]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div data-aos="fade-up" className="news-list">
        {currentItems.map((item) => (
          <div key={item.title} className="news-card">
            <div className="news-image-wrapper">
              <img
                src={
                  item.images.find((img) => img.is_main)?.image ||
                  item.images[0]?.image
                }
                alt={item.title}
              />
              <button
                className="bookmark-btn"
                onClick={() => toggleBookmark(item.title)}
              >
                {bookmarked.includes(item.id) ? (
                  <BsBookmarkFill className="bookmark-icon active" />
                ) : (
                  <BsBookmark className="bookmark-icon" />
                )}
              </button>
            </div>

            <div className="news-card-header">
              <h3>{item.title}</h3>
            </div>

            <p dangerouslySetInnerHTML={{ __html: getFirstWordsFromHTML(item.description, 10) }} />

            <div className="news-card-footer">
              <div className="news-date">
                <IoCalendarNumber className="calendar-icon" />
                <span className="date-text">{new Date(item.time).toLocaleDateString("uz-UZ")}</span>
              </div>

              <Link
                to={`/meeting/${item.id}`}
                state={{ meeting: item }}
                className="detail-link"
              >
                Batafsil
              </Link>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          total={filteredMeetings.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      )}

      {filteredMeetings.length === 0 && (
        <p className="no-news">Uchrashuv topilmadi.</p>
      )}
    </div>
  );
}

export default Meetings;
