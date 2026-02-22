import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./HomePrincipalsDetails.css";
import AOS from "aos";
import "aos/dist/aos.css";

function HomePrincipalsDetails() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/principal`);
                const data = await res.json();
                const principals = Array.isArray(data) ? data : data.results || [];
                const foundPerson = principals.find(p => p.id === parseInt(id));
                if (foundPerson) {
                    setPerson({
                        firstName: foundPerson.first_name,
                        lastName: foundPerson.last_name,
                        profession: foundPerson.profession,
                        photo: foundPerson.image,
                        biography: foundPerson.main_biography || "Biografiya hali qo‘shilmagan."
                    });
                } else {
                    setPerson(null);
                }
            } catch (error) {
                setPerson(null);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!person) {
        return (
            <div className="teacherdetails">
                <p>Maʼlumot topilmadi.</p>
                <Link to="/" className="breadcrumb-link">
                    ⬅ Bosh sahifaga qaytish
                </Link>
            </div>
        );
    }

    return (
        <>
        <div className="teacherdetails">
            <div className="breadcrumb">
                <Link to="/principals" className="breadcrumb-link">Rahbariyat</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">
                    {person.firstName} {person.lastName}
                </span>
            </div>

            <img src={person.photo} alt={person.firstName} className="teacherdetails-img" />

            <h2 className="teacherdetails-title">
                {person.firstName} {person.lastName}
            </h2>
            <p className="teacherdetails-subject">{person.profession}</p>

            <div className="teacherdetails-info">
                <p><strong>Biografiya:</strong></p>
                <p>{person.biography}</p>
            </div>
        </div>
        </>
    );
}

export default HomePrincipalsDetails;
