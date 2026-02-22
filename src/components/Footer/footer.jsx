import React, { useEffect, useState } from 'react'
import './footer.css'
import { FaInstagram, FaTelegram, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer () {
  const [school, setSchool] = useState({})

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/school/`);
        if (!res.ok) {
          console.warn('School API not available, using fallback data');
          // Fallback to default school data if API fails
          setSchool({
            number: '+998901234567',
            email: 'info@sergelitim.uz',
            instagram: 'https://www.instagram.com/sergeli_ixtisos_maktabi/',
            telegram: 'https://t.me/dasturbe',
            facebook: 'https://facebook.com'
          });
          return;
        }
        
        try {
          const data = await res.json();
          setSchool(data[0] || {});
        } catch (jsonError) {
          console.warn('School API returned non-JSON response, using fallback data');
          setSchool({
            number: '+998901234567',
            email: 'info@sergelitim.uz',
            instagram: 'https://www.instagram.com/sergeli_ixtisos_maktabi/',
            telegram: 'https://t.me/dasturbe',
            facebook: 'https://facebook.com'
          });
        }
      } catch (err) {
        console.error('Xato:', err);
        // Fallback to default school data
        setSchool({
          number: '+998901234567',
          email: 'info@sergelitim.uz',
          instagram: 'https://www.instagram.com/sergeli_ixtisos_maktabi/',
          telegram: 'https://t.me/dasturbe',
          facebook: 'https://facebook.com'
        });
      }
    };
    fetchSchool();
  }, [])
  return (
    <footer className='footer'>
      <div className="footer__stars-container">
        {/* Optimized Star Generator */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`shooting-${i}`} 
            className="star"
            style={{
              top: `${-100 - Math.random() * 200}px`, 
              right: `${-100 + Math.random() * 150}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${1 + Math.random() * 1.5}s`
            }}
          ></div>
        ))}
        {[...Array(500)].map((_, i) => (
          <div 
            key={`twinkle-${i}`} 
            className="twinkle-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              transform: `scale(${0.2 + Math.random() * 0.8})`,
              opacity: `${0.1 + Math.random() * 0.7}`
            }}
          ></div>
        ))}
      </div>
      <div className="footer__bg-text">Sergeli Tuman <br />Ixtisoslashtirilgan Maktabi</div>
      
      <div className='footer__container'>
        <div className="footer__separator"></div>
        
        <div className='footer__main-content'>
          <div className='footer__col'>
            <h4>Sahifa</h4>
            <Link to='/' onClick={() => window.scrollTo(0, 0)}>Bosh sahifa</Link>
            <Link to='/news'>Yangiliklar</Link>
            <Link to='/teachers'>Ustozlar</Link>
            <Link to='/announcements'>E'lonlar</Link>
            <Link to='/addition'>To'garaklar</Link>
          </div>

          <div className='footer__col'>
            <h4>Maktab</h4>
            <Link to='/aboutschool'>Maktab tarixi</Link>
            <Link to='/principals'>Rahbariyat</Link>
            <Link to='/schedule'>Dars jadvali</Link>
            <Link to='/contact'>Bog'lanish</Link>
          </div>

          <div className='footer__col'>
            <h4>Ijtimoiy</h4>
            <a href={school.instagram} target='_blank' rel='noopener noreferrer'>Instagram</a>
            <a href={school.telegram} target='_blank' rel='noopener noreferrer'>Telegram</a>
            <a href={school.facebook} target='_blank' rel='noopener noreferrer'>Facebook</a>
            <a href={`tel:${school.number}`}>{school.number || '+998 71 234 56 78'}</a>
          </div>

          <div className='footer__col'>
            <h4>Hujjat</h4>
            <Link to='/documentation'>FAQ</Link>
            <Link to='/ourcommand'>Our Team</Link>
            <Link to='/privacy'>Maxfiylik siyosati</Link>
            <Link to='/terms'>Foydalanish shartlari</Link>
          </div>
        </div>

        <div className='footer__bottom'>
          <p className="footer__copyright">© {new Date().getFullYear()} Sergeli Ixtisoslashgan Maktabi</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
