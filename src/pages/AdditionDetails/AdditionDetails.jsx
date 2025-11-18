import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";
import "/src/pages/AdditionDetails/AdditionDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function AdditionDetails() {
    const location = useLocation();
    const addition = location.state?.addition;
    const teacher = location.state?.teacher;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }, []);

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
                <span className="breadcrumb-current">{addition.name}</span>
            </div>

            <img src={addition.image} alt={addition.name} className="additiondetails-img" />

            <h2 className="additiondetails-title">{addition.name}</h2>
            <p className="additiondetails-teacher">
                <strong>Ustoz:</strong>{" "}
                {teacher ? (
                    <Link to={`/teachers/${addition.teacherId}`} state={{ teacher: teacher }} className="teacher-link">
                        {teacher.firstName} {teacher.lastName}
                    </Link>
                ) : (
                    "Yuklanmo..."
                )}
            </p>

            {teacher && (
                <div className="teacher-social-wrapper">
                    {teacher.social?.instagram && (
                        <a
                            href={teacher.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn instagram-btn"
                        >
                            <FaInstagram />
                        </a>
                    )}
                    {teacher.social?.telegram && (
                        <a
                            href={teacher.social.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-btn telegram-btn"
                        >
                            <FaTelegram />
                        </a>
                    )}
                    {teacher.social?.facebook && (
                        <a
                            href={teacher.social.facebook}
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
                <span className="additiondetails-date">{addition.date}</span>
            </div>
        </div>
    );
}

export default AdditionDetails;
