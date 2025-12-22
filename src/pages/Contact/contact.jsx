import React, { useRef, useEffect, useState } from "react";
import "./contact.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
    const form = useRef();
    const [notification, setNotification] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("Form yuborildi!");
                setNotification({ type: 'success', message: 'Xabar yuborildi!' });
                form.current.reset();
                setTimeout(() => setNotification(null), 3000);
            } else {
                console.error("Xatolik:", response.status);
                setNotification({ type: 'error', message: 'Xatolik yuz berdi!' });
                setTimeout(() => setNotification(null), 3000);
            }
        } catch (error) {
            console.error("Xatolik:", error);
            setNotification({ type: 'error', message: 'Xatolik yuz berdi!' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            <div data-aos="fade-up" className="text-align-center">
                <p className="news-section-p1">Biz bilan bog'lanish</p>
                <p className="news-section-p2">
                    Savol va takliflaringiz bo'lsa, bemalol murojaat qiling!
                </p>
            </div>
            <div data-aos="fade-up" className="contact-page">

                <div data-aos="fade-up" className="contact-container">
                    <div className="contact-top">
                        <div className="contact-info">
                            <p>
                                <strong>Telefon:</strong> <br /> +998 98 989 99 99
                            </p>
                            <p>
                                <strong>Elektron pochta:</strong> <br /> dasturbek.com@gmail.com
                            </p>
                            <p>
                                <strong>Manzil:</strong> <br />
                                Sergeli tumani, Nilufar MFY <br />
                                Sergeli 2-mavzesi, 64A-uy
                            </p>
                            <p>
                                <strong>Diqqat:</strong> <br />
                                Agar saytning biror qismi to‘g‘ri ishlamayotgan bo‘lsa, sahifa umuman
                                ochilmasa yoki ishlash jarayonida kutilmagan xatolik paydo bo‘lsa —
                                iltimos, bizga bu haqda xabar bering. Sizning fikr va xabaringiz saytni
                                yanada yaxshilashimizga yordam beradi.
                            </p>
                        </div>

                        <form data-aos="fade-up" ref={form} onSubmit={handleSubmit} className="contact-form">
                            <h3>Savolingiz bormi?</h3>

                            <input
                                type="text"
                                name="full_name"
                                placeholder="To‘liq ism-familyangiz"
                                required
                            />

                            <input
                                type="tel"
                                name="number"
                                placeholder="Telefon raqamingiz"
                                required
                            />

                            <input
                                type="text"
                                name="subject"
                                placeholder="Murojaat mavzusi (qisqa)"
                                required
                            />

                            <textarea
                                name="text"
                                placeholder="Savol va takliflaringizni yozing"
                                rows="5"
                                required
                            ></textarea>

                            <button type="submit">Yuborish</button>
                        </form>
                    </div>

                    <div data-aos="fade-up" className="contact-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d551.5804135650701!2d69.2218422139766!3d41.210502803385936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae61c403191f6d%3A0xc8199e959d144b2e!2sSergeli%20ixtisoslashtirilgan%20maktab!5e0!3m2!1sru!2s!4v1758799393697!5m2!1sru!2s"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
