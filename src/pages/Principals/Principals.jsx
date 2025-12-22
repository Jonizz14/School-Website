import React, { useEffect, useState } from "react";
import "./Principals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Principals() {
  const [principals, setPrincipals] = useState([]);

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
      .then((data) => setPrincipals(data.results || data));
  }, []);

  return (
    <div className="school-leadership-dashboard">
      <section data-aos="fade-up" className="leadership-section">
        <h2 className="leadership-title">Maktab Rahbariyati</h2>

        {principals.length > 0 && (
           <div className="leadership-director" data-aos="zoom-in">
             <img
               src={principals[0].photo}
               alt="Director"
               className="director-img"
             />
             <div className="director-info">
               <h3 className="leadership-name">
                 {principals[0].firstName} {principals[0].lastName}
               </h3>
               <p className="leadership-position">{principals[0].position}</p>
               <p className="leadership-experience">
                 Tajriba: {principals[0].experience} yil
               </p>
             </div>
           </div>
         )}

        <div className="leadership-principals">
           {principals.slice(1).map((principal) => (
             <Link
               key={principal.id}
               to={`/principals/${principal.id}`}
               state={{ person: principal }}
               data-aos="fade-up"
               className="leadership-principal"
             >
               <img
                 src={principal.photo}
                 alt={principal.firstName}
                 className="principal-img"
               />
               <div className="principal-info">
                 <span className="principal-name">
                   {principal.firstName} {principal.lastName}
                 </span>
                 <p className="principal-position">{principal.position}</p>
                 <p className="principal-experience">
                   Tajriba: {principal.experience} yil
                 </p>
               </div>
             </Link>
           ))}
         </div>
      </section>
    </div>
  );
}

export default Principals;
