import React, { useEffect, useState } from "react";
import "./Principals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";

function Principals() {
  const [principals, setPrincipals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 100,
      disable: window.innerWidth <= 768 ? true : false,
    });

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/principal/`)
      .then((res) => res.json())
      .then((data) => {
        setPrincipals(Array.isArray(data) ? data : data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching principals:", error);
      });
  }, []);

  return (
    <div className="principals__section">
      <div className="principals__header" data-aos="fade-up">
        <h2 className="principals__title">Maktab Rahbariyati</h2>
        <p className="principals__subtitle">
          Bizning professional rahbariyat jamoamiz bilan tanishing
        </p>
      </div>

      <div className="principals__grid" data-aos="fade-up">
        {principals.slice(0, 3).map((principal, index) => (
          <div
            key={principal.id}
            className={`principals__card ${index === 0 ? 'principals__card--large' : 'principals__card--small'}`}
            onClick={() => navigate(`/principals/${principal.id}`, { state: { person: principal } })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(`/principals/${principal.id}`, { state: { person: principal } });
              }
            }}
          >
            <img
              src={principal.image}
              alt={`${principal.first_name} ${principal.last_name}`}
            />
            <div className="principals__content">
              <h3>{principal.first_name} {principal.last_name}</h3>
              <p className="principals__position">{principal.profession}</p>
              <div className="teacher-social-wrapper">
                {principal.instagram && (
                  <a href={principal.instagram} target="_blank" rel="noopener noreferrer" className="social-btn" onClick={(e) => e.stopPropagation()}><FaInstagram /></a>
                )}
                {principal.telegram && (
                  <a href={principal.telegram} target="_blank" rel="noopener noreferrer" className="social-btn" onClick={(e) => e.stopPropagation()}><FaTelegram /></a>
                )}
                {principal.facebook && (
                  <a href={principal.facebook} target="_blank" rel="noopener noreferrer" className="social-btn" onClick={(e) => e.stopPropagation()}><FaFacebook /></a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="principals__additional-grid" data-aos="fade-up">
        {principals.slice(3, 6).map((principal) => (
          <div
            key={principal.id}
            className="teachers__card"
            onClick={() => navigate(`/principals/${principal.id}`, { state: { person: principal } })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(`/principals/${principal.id}`, { state: { person: principal } });
              }
            }}
          >
            <img
              src={principal.image}
              alt={`${principal.first_name} ${principal.last_name}`}
            />
            <h3>{principal.first_name} {principal.last_name}</h3>
            <p className="teachers__subject">{principal.profession}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Principals;
