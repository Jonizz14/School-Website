import React, { useEffect, useState } from 'react'
import './footer.css'
import { FaInstagram, FaTelegram, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logo from '../Footer/logo.svg'

function Footer () {
  const [school, setSchool] = useState({})

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch('/s_api/school/');
        const data = await res.json();
        setSchool(data[0] || {});
      } catch (err) {
        console.error('Xato:', err);
      }
    };
    fetchSchool();
  }, [])
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__col'>
          <Link to={'/'}>
            <div className='footer__logo-div'>
              <img className='footer__logo' src={Logo} alt='' />
              <div>
                <p className='footer__logo-text'>Bizning Maktab</p>
                <p className='footer__logo-text'>Kelajak uchun ta’lim</p>
              </div>
            </div>
          </Link>
          <div className='footer__col'>
            <a href={`tel:${school.number || '+998901234567'}`} className='footer__link'>
              {school.number || '+998 90 123 45 67'}
            </a>
            <a href={`mailto:${school.email || 'info@liftmedia.com'}`} className='footer__link'>
              info@liftmedia.com
            </a>
          </div>
          <div className='footer__socials'>
            <a
              href={school.instagram || 'https://www.instagram.com/sergeli_ixtisos_maktabi/'}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram className='footer__social-btn' />
            </a>
            <a
              href={school.telegram || 'https://t.me/dasturbe'}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTelegram className='footer__social-btn' />
            </a>
            <a
              href={school.facebook || 'https://facebook.com'}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebook className='footer__social-btn' />
            </a>
          </div>
        </div>
        <div className='footer__flex'>
          <div className='footer__col'>
            <h3>Sahifalar</h3>
            <Link to='/' className='footer__link'>
              Bosh sahifa
            </Link>
            <Link to='/news' className='footer__link'>
              Yangiliklar
            </Link>
            <Link to='/teachers' className='footer__link'>
              O'qituvchilar
            </Link>
            <Link to='/schedule' className='footer__link'>
              Dars Jadvali
            </Link>
            <Link to='/announcements' className='footer__link'>
              E'lonlar
            </Link>
            <Link to='/addition' className='footer__link'>
              To'garaklar
            </Link>
          </div>
        </div>
        <div className='footer__col'>
          <h3>Bizning manzilimiz</h3>
          <div className='footer__map'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d551.5804135650701!2d69.2218422139766!3d41.210502803385936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae61c403191f6d%3A0xc8199e959d144b2e!2sSergeli%20ixtisoslashtirilgan%20maktab!5e0!3m2!1sru!2s!4v1758799393697!5m2!1sru!2s'
              width='100%'
              height='250'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Google Map'
              className='footer__google-map'
            ></iframe>
          </div>
        </div>
      </div>

      <div className='footer__bottom'>
        <p>© 2025 Lift Media. Hamma huquqlar himoyalangan.</p>
        <div className='footer__bottom-links'>
          <Link className='footer__ourcommand' to='/ourcommand'>
            Bizning jamoa
          </Link>
          <Link className='footer__documentation' to='/documentation'>
            Hujjatlar
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
