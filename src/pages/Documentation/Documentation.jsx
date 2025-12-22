import React, { useEffect } from "react";
import "./Documentation.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Documentation() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="documentation-page">
      <div data-aos="fade-up" className="documentation-header">
        <h1>FAQ</h1>
        <p>Sayt haqida batafsil ma'lumot va qo'shimcha resurslar</p>
      </div>

      <div className="documentation-content">
        <section data-aos="fade-up" className="doc-section">
          <h2>Tez-tez beriladigan savollar</h2>

          <div className="faq-item">
            <h3>Maktab qayerda joylashgan?</h3>
            <p>Sergeli tumani, Nilufar MFY, Sergeli 2-mavzesi, 64A-uy</p>
          </div>

          <div className="faq-item">
            <h3>Maktabda qaysi to'garaklar mavjud?</h3>
            <p>Maktabda matematika, fizika, kimyo, biologiya, ingliz tili va boshqa fanlar bo'yicha to'garaklar mavjud. To'garaklar sahifasidan batafsil ma'lumot olishingiz mumkin.</p>
          </div>

          <div className="faq-item">
            <h3>O'qituvchilar haqida qanday ma'lumot olish mumkin?</h3>
            <p>O'qituvchilar sahifasiga o'ting va kerakli o'qituvchi nomini bosib, uning profili bilan tanishing.</p>
          </div>

          <div className="faq-item">
            <h3>Yangiliklarni qanday ko'rish mumkin?</h3>
            <p>Yangiliklar sahifasida barcha yangiliklar ro'yxati mavjud. Qidiruv funksiyasidan foydalanib, kerakli yangilikni topishingiz mumkin.</p>
          </div>

          <div className="faq-item">
            <h3>AI chat qanday ishlaydi?</h3>
            <p>Sahifa o'ng pastida joylashgan chat tugmasini bosing. Sun'iy intellekt sizning savollaringizga maktab haqida ma'lumot beradi.</p>
          </div>

          <div className="faq-item">
            <h3>Sayt mobil qurilmalarda ishlaydimi?</h3>
            <p>Ha, sayt to'liq responsive dizayn asosida qurilgan va barcha qurilmalarda mukammal ishlaydi.</p>
          </div>

          <div className="faq-item">
            <h3>Maktabga qanday murojaat qilish mumkin?</h3>
            <p>Aloqa sahifasida telefon raqam, email va manzil ko'rsatilgan. Shuningdek, onlayn forma orqali murojaat yuborishingiz mumkin.</p>
          </div>
        </section>

        <section data-aos="fade-up" className="doc-section">
          <h2>Litsenziya</h2>

          <div className="license-content">
            <h3>MIT Litsenziyasi</h3>
            <p>Copyright (c) 2025 Lift Media</p>

            <p>Bu dasturiy ta'minot va uning hujjatlariga nisbatan quyidagi shartlar asosida ruxsat beriladi:</p>

            <h4>Ruxsat</h4>
            <p>Ushbu dasturiy ta'minotni (va uning hujjatlarini) istalgan maqsadda, shu jumladan tijoriy va notijoriy maqsadlarda, o'zgartirish va tarqatish huquqi beriladi, agar quyidagi shartlar bajarilsa:</p>

            <ul>
              <li>Ushbu dasturiy ta'minotning nusxasi yoki muhim qismi har qanday tarqatilgan nusxada saqlanishi kerak.</li>
              <li>Mualliflik huquqi va litsenziya bildirishnomasi har qanday tarqatilgan nusxada saqlanishi kerak.</li>
            </ul>

            <h4>Cheklovlar</h4>
            <p>Bu litsenziya hech qanday kafolat bermaydi. Mualliflar yoki litsenziya egalar hech qanday holatda javobgar emaslar, shu jumladan, lekin ular bilan cheklanmagan holda, shartnoma, javobgarlik yoki boshqa harakatlar uchun javobgarlik.</p>

            <h4>Qo'shimcha ma'lumot</h4>
            <p>Bu litsenziya haqida batafsil ma'lumot olish uchun <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT Litsenziyasi</a> sahifasini ko'ring.</p>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Documentation;