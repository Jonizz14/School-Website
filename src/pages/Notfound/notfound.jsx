import React from "react";
import { Link } from "react-router-dom";
import './notfound.css'
function NotFound() {
  return (
    <div className="notfound-container" style={{ textAlign: "center", padding: "50px" }}>
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Oops! Sahifa topilmadi</p>
      <Link to="https://sergelitim.uz" className="notfound-btn">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}

export default NotFound;
