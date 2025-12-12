import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";
import "/src/pages/AdditionDetails/AdditionDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function AdditionDetails() {
    const location = useLocation();
    const addition = location.state?.addition;
    const [teacher, setTeacher] = useState(location.state?.teacher || null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }, []);

    useEffect(() => {
        if (addition && addition.teacherId && !teacher) {
            const fetchTeacher = async () => {
                try {
                    const res = await fetch(`/api/teachers/${addition.teacherId}/`);
                    const data = await res.json();
                    setTeacher(data);
                } catch (err) {
                    console.error('Xato:', err);
                }
            };
            fetchTeacher();
        }
    }, [addition, teacher]);

    if (!addition) {
        return (
            <div className="additiondetails">
                <p>Maʼlumot topilmadi.</p>
                <Link to="/addition" className="breadcrumb-link">
                    ⬅ To‘garaklarga qaytish
                </Link>
            </div>
        );
    }

    return (
        <div data-aos="fade-up" className="additiondetails">
            <div className="breadcrumb">
                <Link to="/addition" className="breadcrumb-link">To‘garaklar</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{addition.title}</span>
            </div>

            <img src={addition.image} alt={addition.title} className="additiondetails-img" />

            <h2 className="additiondetails-title">{addition.title}</h2>
            <p className="additiondetails-teacher">
                <strong>Ustoz:</strong>{" "}
                {teacher ? (
                    <Link to={`/teachers/${teacher.id}`} state={{ teacher: teacher }} className="teacher-link">
                        {teacher.first_name} {teacher.last_name}
                    </Link>
                ) : (
                    "Yuklanmo..."
                )}
            </p>

            {teacher && (
                <div className="teacher-social-wrapper">
                    {teacher.instagram && (
                        <a
                            href={teacher.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn instagram-btn"
                        >
                            <FaInstagram />
                        </a>
                    )}
                    {teacher.telegram && (
                        <a
                            href={teacher.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn telegram-btn"
                        >
                            <FaTelegram />
                        </a>
                    )}
                    {teacher.facebook && (
                        <a
                            href={teacher.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn facebook-btn"
                        >
                            <FaFacebook />
                        </a>
                    )}
                </div>
            )}

            <p className="additiondetails-desc">{addition.description}</p>

            <div className="additiondetails-footer">
                <span className="additiondetails-date">{addition.subject}</span>
            </div>
        </div>
    );
}

export default AdditionDetails;
