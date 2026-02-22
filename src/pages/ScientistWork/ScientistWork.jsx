import React, { useEffect, useState, useRef } from "react";
import { IoCalendarNumber } from "react-icons/io5";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { MdViewList, MdAccessTime, MdHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import "./ScientistWork.css";
import AOS from "aos";
import "aos/dist/aos.css";

function getFirstWordsFromHTML(html = "", wordCount = 5) {
    const text = html.replace(/<[^>]*>/g, ""); 
    return text.split(/\s+/).slice(0, wordCount).join(" ") + (text.split(/\s+/).length > wordCount ? '...' : '');
}

function ScientistWork() {
  const [works, setWorks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [bookmarked, setBookmarked] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarkedWorks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarkedWorks", JSON.stringify(bookmarked));
  }, [bookmarked]);

  const sortOptions = ["all", "bookmarked", "recent", "oldest"];
  const sortIcons = [<MdViewList />, <BsBookmark />, <MdAccessTime />, <MdHistory />];
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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/document`);
        const data = await res.json();
        setWorks(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Xato:", err);
      }
    };
    fetchWorks();
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

  const toggleBookmark = (title) => {
    setBookmarked((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  let filteredWorks = works.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "bookmarked") {
    filteredWorks = filteredWorks.filter((item) =>
      bookmarked.includes(item.title)
    );
  } else if (sortOption === "recent") {
    filteredWorks = [...filteredWorks].sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
  } else if (sortOption === "oldest") {
    filteredWorks = [...filteredWorks].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );
  }

  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const currentItems = filteredWorks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div data-aos="fade-up" className="news-section">
      <p className="news-section-p1">Ilmiy Ishlar</p>
      <p className="news-section-p2">
        Maktabimizda fanlar bo'yicha ishlar va tadqiqotlar rivojlantiriladi.
      </p>

      <div className="news-controls">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="input"
            placeholder="Ishlarni qidirish..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="sort-dropdown" ref={dropdownRef}>
          <button className="sort-btn active" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {sortIcons[sortOptions.indexOf(sortOption)]}
          </button>
          {isDropdownOpen && (
            <div className="sort-options">
              {sortOptions.map((option, index) => (
                <button
                  key={option}
                  className={`sort-option ${sortOption === option ? 'active' : ''}`}
                  onClick={() => handleSortSelect(option)}
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
          <div key={item.id} className="news-card">
            <div className="news-image-wrapper">
              <img src={item.image} alt={item.title} />
              <button
                className="bookmark-btn"
                onClick={() => toggleBookmark(item.title)}
              >
                {bookmarked.includes(item.title) ? (
                  <BsBookmarkFill className="bookmark-icon active" />
                ) : (
                  <BsBookmark className="bookmark-icon" />
                )}
              </button>
            </div>

            <div className="news-card-header">
              <h3>{item.title}</h3>
            </div>

            <p dangerouslySetInnerHTML={{ __html: getFirstWordsFromHTML(item.description, 10) }}/>

            <div className="news-card-footer"> 
              <div className="news-date">
                <IoCalendarNumber className="calendar-icon" />
                <span className="date-text">{new Date(item.time).toLocaleDateString('uz-UZ')}</span>
              </div>

              <Link
                to={`/scientistwork/${item.id}`}
                state={{ work: item }}
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
          total={filteredWorks.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      )}

      {filteredWorks.length === 0 && (
        <p className="no-news">Ish topilmadi.</p>
      )}
    </div>
  );
}

export default ScientistWork;
