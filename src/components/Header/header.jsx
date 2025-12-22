import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiImage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./header.css";

function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [activityDropdownOpen, setActivityDropdownOpen] = useState(false);
  const [mobileActivityDropdownOpen, setMobileActivityDropdownOpen] = useState(false);
  const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);
  const [mobileMediaDropdownOpen, setMobileMediaDropdownOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const aboutDropdownRef = useRef(null);
  const activityDropdownRef = useRef(null);
  const mediaDropdownRef = useRef(null);

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
    setActivityDropdownOpen(false);
  };

  const toggleActivityDropdown = () => {
    setActivityDropdownOpen(!activityDropdownOpen);
    setAboutDropdownOpen(false);
  };

  const toggleMobileActivityDropdown = () => {
    setMobileActivityDropdownOpen(!mobileActivityDropdownOpen);
    setMobileAboutDropdownOpen(false);
    setMobileMediaDropdownOpen(false);
  };

  const toggleMobileAboutDropdown = () => {
    setMobileAboutDropdownOpen(!mobileAboutDropdownOpen);
    setMobileActivityDropdownOpen(false);
    setMobileMediaDropdownOpen(false);
  };

  const toggleMobileMediaDropdown = () => {
    setMobileMediaDropdownOpen(!mobileMediaDropdownOpen);
    setMobileAboutDropdownOpen(false);
    setMobileActivityDropdownOpen(false);
  };

  const toggleMediaDropdown = () => {
    setMediaDropdownOpen(!mediaDropdownOpen);
    setAboutDropdownOpen(false);
    setActivityDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setAboutDropdownOpen(false);
    setActivityDropdownOpen(false);
    setMediaDropdownOpen(false);
    setMobileActivityDropdownOpen(false);
    setMobileAboutDropdownOpen(false);
    setMobileMediaDropdownOpen(false);
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        aboutDropdownOpen &&
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target)
      ) {
        setAboutDropdownOpen(false);
      }

      if (
        activityDropdownOpen &&
        activityDropdownRef.current &&
        !activityDropdownRef.current.contains(event.target)
      ) {
        setActivityDropdownOpen(false);
      }

      if (
        mediaDropdownOpen &&
        mediaDropdownRef.current &&
        !mediaDropdownRef.current.contains(event.target)
      ) {
        setMediaDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [aboutDropdownOpen, activityDropdownOpen, mediaDropdownOpen]);

  return (
    <header className={`header ${showHeader ? "header--visible" : "header--hidden"}`}>
      <nav className="header__nav-container">
        <NavLink to="/" onClick={closeAllDropdowns}>
          <div className="header__logo-div">
            <img className="header__logo" src="/logo.svg" alt="logo" />
            <div className="header__logo-text">
              <p className="header__logo-text-tuman">Sergeli Tuman</p>
              <p className="header__logo-text-maktab">Ixtisoslashtirilgan Maktab</p>
            </div>
          </div>
        </NavLink>

        <div className="header__nav-right-section header__desktop-menu">
          <ul className="header__nav-links">
            <li>
              <NavLink className="header__nav-links-home" to="/" end onClick={closeAllDropdowns}>
                Bosh sahifa
              </NavLink>
            </li>
          </ul>

          <div className="header__dropdown-container" ref={aboutDropdownRef}>
            <button className="header__dropdown-toggle" onClick={toggleAboutDropdown}>
              Maktab Haqida
              <span className={`header__arrow ${aboutDropdownOpen ? "header__arrow--up" : ""}`}></span>
            </button>
            <ul className={`header__dropdown-menu ${aboutDropdownOpen ? "header__dropdown-menu--show" : ""}`}>
              <li><NavLink to="/aboutschool" onClick={closeAllDropdowns}>Maktab tarixi</NavLink></li>
              <li><NavLink to="/principals" onClick={closeAllDropdowns}>Rahbariyat</NavLink></li>
              <li><NavLink to="/scientistwork" onClick={closeAllDropdowns}>Ilmiy Ishlar</NavLink></li>
            </ul>
          </div>

          <div className="header__dropdown-container" ref={activityDropdownRef}>
            <button className="header__dropdown-toggle" onClick={toggleActivityDropdown}>
              Maktab Faoliyati
              <span className={`header__arrow ${activityDropdownOpen ? "header__arrow--up" : ""}`}></span>
            </button>
            <ul className={`header__dropdown-menu ${activityDropdownOpen ? "header__dropdown-menu--show" : ""}`}>
              <li><NavLink to="/addition" onClick={closeAllDropdowns}>To'garaklar</NavLink></li>
              <li><NavLink to="/teachers" onClick={closeAllDropdowns}>Ustozlar</NavLink></li>
              <li><NavLink to="/talentedstudents" onClick={closeAllDropdowns}>O'quvchilar</NavLink></li>
              <li><NavLink to="/schedule" onClick={closeAllDropdowns}>Dars Jadvali</NavLink></li>
            </ul>
          </div>

          <div className="header__dropdown-container" ref={mediaDropdownRef}>
            <button className="header__dropdown-toggle" onClick={toggleMediaDropdown}>
              Maktab Mediasi
              <span className={`header__arrow ${mediaDropdownOpen ? "header__arrow--up" : ""}`}></span>
            </button>
            <ul className={`header__dropdown-menu ${mediaDropdownOpen ? "header__dropdown-menu--show" : ""}`}>
              <li><NavLink to="/news" onClick={closeAllDropdowns}>Yangiliklar</NavLink></li>
              <li><NavLink to="/announcements" onClick={closeAllDropdowns}>E'lonlar</NavLink></li>
              <li><NavLink to="/meeting" onClick={closeAllDropdowns}>Uchrashuvlar</NavLink></li>
            </ul>
          </div>

          <ul className="header__nav-links">
            <li>
              <NavLink to="/contact" onClick={closeAllDropdowns}>Bog'lanish</NavLink>
            </li>
          </ul>
        </div>

        <div className="header__mobile-menu-btn">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpen(false)}
              >
                <FiX size={28} color="#fff" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpen(true)}
              >
                <FiMenu size={28} color="#0b1e70" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`header__mobile-sidebar ${open ? "header__mobile-sidebar--open" : ""}`}>
          <ul>
            <li><NavLink to="/" end onClick={closeAllDropdowns}>Bosh sahifa</NavLink></li>
            <li>
              <button className="header__mobile-dropdown-toggle" onClick={toggleMobileAboutDropdown}>
                Maktab Haqida
                <FiChevronDown className={`header__mobile-chevron ${mobileAboutDropdownOpen ? "header__mobile-chevron--up" : ""}`} />
              </button>
              <ul className={`header__mobile-dropdown-menu ${mobileAboutDropdownOpen ? "header__mobile-dropdown-menu--show" : ""}`}>
                <li><NavLink to="/aboutschool" onClick={closeAllDropdowns}>Maktab Tarixi</NavLink></li>
                <li><NavLink to="/principals" onClick={closeAllDropdowns}>Rahbariyat</NavLink></li>
                <li><NavLink to="/meeting" onClick={closeAllDropdowns}>Ilmiy Ishlar</NavLink></li>
                <li><NavLink to="/schedule" onClick={closeAllDropdowns}>Dars Jadvali</NavLink></li>
              </ul>
            </li>
            <li>
              <button className="header__mobile-dropdown-toggle" onClick={toggleMobileActivityDropdown}>
                Maktab Faoliyati
                <FiChevronDown className={`header__mobile-chevron ${mobileActivityDropdownOpen ? "header__mobile-chevron--up" : ""}`} />
              </button>
              <ul className={`header__mobile-dropdown-menu ${mobileActivityDropdownOpen ? "header__mobile-dropdown-menu--show" : ""}`}>
                <li><NavLink to="/addition" onClick={closeAllDropdowns}>To'garaklar</NavLink></li>
                <li><NavLink to="/teachers" onClick={closeAllDropdowns}>Ustozlar</NavLink></li>
                <li><NavLink to="/talentedstudents" onClick={closeAllDropdowns}>O'quvchilar</NavLink></li>
              </ul>
            </li>
            <li>
              <button className="header__mobile-dropdown-toggle" onClick={toggleMobileMediaDropdown}>
                Maktab Mediasi
                <FiChevronDown className={`header__mobile-chevron ${mobileMediaDropdownOpen ? "header__mobile-chevron--up" : ""}`} />
              </button>
              <ul className={`header__mobile-dropdown-menu ${mobileMediaDropdownOpen ? "header__mobile-dropdown-menu--show" : ""}`}>
                <li><NavLink to="/news" onClick={closeAllDropdowns}>Yangiliklar</NavLink></li>
                <li><NavLink to="/announcements" onClick={closeAllDropdowns}>E'lonlar</NavLink></li>
                <li><NavLink to="/scientistwork" onClick={closeAllDropdowns}>Ilmiy Ishlar</NavLink></li>
              </ul>
            </li>
            <li><NavLink to="/contact" onClick={closeAllDropdowns}>Bog'lanish</NavLink></li>
          </ul>
        </div>
      </nav>

    </header>
  );
}

export default Header;
