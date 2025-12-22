import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import "/src/pages/Addition/addition.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Addition() {
    const [additions, setAdditions] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [bookmarked, setBookmarked] = useState(() => {
        return JSON.parse(localStorage.getItem("bookmarkedNews")) || [];
    });

    useEffect(() => {
        localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarked));
    }, [bookmarked]);

    const [sortOption, setSortOption] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const additionsRes = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/course/`);
                const additionsData = await additionsRes.json();
                setAdditions(additionsData.results || []);
                // Keep teachers from local for now
                const teachersRes = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/teachers/`);
                const teachersData = await teachersRes.json();
                setTeachers(teachersData.results || []);
            } catch (err) {
                console.error("Xato:", err);
            }
        };
        fetchData();
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

    let filteredAdditions = additions.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showOnlyBookmarked) {
        filteredAdditions = filteredAdditions.filter((item) =>
            bookmarked.includes(item.id)
        );
    }

    const totalPages = Math.ceil(filteredAdditions.length / itemsPerPage);
    const currentItems = filteredAdditions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div data-aos="fade-up" className="addition-section">
            <p className="addition-section-p1">To‘garaklar</p>
            <p className="addition-section-p2">
                Maktabimizdagi tashkil etilgan to‘garaklar
            </p>

            <div className="addition-controls">
                <form className="form-addition" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="input"
                        placeholder="To‘garaklarni qidirish..."
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

            <div data-aos="fade-up" className="addition-list">
                {currentItems.map((item) => {
                    const teacher = teachers.find(t => t.id == item.teacher);
                    return (
                        <div key={item.id} className="addition-card">
                            <div className="addition-image-wrapper">
                                <img src={item.image} alt={item.title} />

                                <button
                                    className="bookmark-btn"
                                    onClick={() => toggleBookmark(item.id)}
                                >
                                    {bookmarked.includes(item.id) ? (
                                        <BsBookmarkFill className="bookmark-icon active" />
                                    ) : (
                                        <BsBookmark className="bookmark-icon" />
                                    )}
                                </button>
                            </div>

                            <div className="addition-card-header">
                                <h3>{item.title}</h3>
                            </div>

                            <p>{item.description}</p>

                            <div className="addition-card-footer">
                                <div className="addition-date">
                                    <FaChalkboardTeacher className="time-icon" />
                                    {teacher ? (
                                        <Link
                                            to={`/teachers/${teacher.id}`}
                                            state={{ teacher: teacher }}
                                            className="teacher-text"
                                        >
                                            {teacher.first_name} {teacher.last_name}
                                        </Link>
                                    ) : (
                                        <span className="teacher-text">Yuklanmo...</span>
                                    )}
                                </div>

                                <Link
                                    to="/addition/details"
                                    state={{ addition: item, teacher: teacher }}
                                    className="detail-link"
                                >
                                    Batafsil
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <Pagination
                    current={currentPage}
                    total={filteredAdditions.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            )}

            {filteredAdditions.length === 0 && (
                <p className="no-additions">To‘garak topilmadi.</p>
            )}
        </div>
    );
}

export default Addition;