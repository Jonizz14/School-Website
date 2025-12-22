import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <img id="fade-up" src="/logo.svg" alt="" />
      <p id="fade-up" className="loader-text">Sergeli Tuman Ixtisoslashtirilgan Maktab</p>
      <div id="fade-up" className="loader"></div>
      <p id="fade-up" className="loading-info">
        <span className="dots"><span>.</span><span>.</span><span>.</span></span>
      </p>
    </div>
  );
};

export default Loader;
