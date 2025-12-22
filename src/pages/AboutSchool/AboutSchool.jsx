import React, { useEffect } from "react";
import "./AboutSchool.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiUsers, FiBookOpen } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";

function AboutSchool() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="about-school">
      <div className="about-container">
        <h2 data-aos="fade-up" className="about-title">
          Bizning Maktab Haqida
        </h2>

        <p data-aos="fade-up" className="about-subtitle">
          Sergeli tuman ixtisoslashgan maktabi — kelajak avlod uchun zamonaviy ta’lim maskani.
          Bu yerda har bir o‘quvchining iqtidori, tafakkuri va texnologik salohiyati rivojlantiriladi.
        </p>

        <section className="about-info">
          <div className="about-info-container">
            <div data-aos="fade-right" className="about-info-image">
              <img src="/banner2.png" alt="Maktab ichki ko‘rinishi" />
            </div>

            <div data-aos="fade-left" className="about-info-content">
              <h2>Maktabimiz haqida qisqacha ma'lumot</h2>

              <div className="about-info-row">
                <span className="about-info-line"></span>
                <p className="about-info-text">
                  Sergeli tuman ixtisoslashtirilgan maktabi 2022-yilda faoliyatini
                  boshlagan. Maktab aniq va tabiiy fanlarga ixtisoslashgan bo‘lib,
                  ta’lim tili – o‘zbek. Shuningdek, ingliz tili (IELTS), koreys
                  tili, IT va robototexnika yo‘nalishlari mavjud.
                </p>
              </div>

              <div className="about-info-row">
                <span className="about-info-line"></span>
                <p className="about-info-text">
                  Ilk o‘quv yili maktab 17 ta sinfda jami 408 ta o‘quvchini qamrab
                  olgan. 2023-yil sentabrda yangi bino foydalanishga topshirildi.
                  Hozirda 540 o‘quvchi 24 ta sinfda tahsil olmoqda.
                </p>
              </div>

              <div className="about-info-row">
                <span className="about-info-line"></span>
                <p className="about-info-text">
                  Bugungi kunda 53 nafar pedagog faoliyat yuritadi. Ulardan yarmi
                  oliy toifali bo‘lib, 20 nafari xalqaro va milliy sertifikatlarga
                  ega.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div data-aos="fade-up" className="about-grid">
          <div className="about-card">
            <FiBookOpen className="about-icon" />
            <h3>Ta’lim Sifati</h3>
            <p>
              Har bir dars zamonaviy metodika asosida o‘tiladi, o‘quvchilarni fikrlashga undovchi usullar qo‘llaniladi.
            </p>
          </div>

          <div className="about-card">
            <FiUsers className="about-icon" />
            <h3>Jamoa</h3>
            <p>
              50 dan ortiq tajribali pedagoglar faoliyat yuritadi, ularning aksariyati xalqaro sertifikatlarga ega.
            </p>
          </div>

          <div className="about-card">
            <FaChalkboardTeacher className="about-icon" />
            <h3>To‘garaklar</h3>
            <p>
              IT, robototexnika, ingliz tili, san’at va sport yo‘nalishlarida muntazam to‘garaklar mavjud.
            </p>
          </div>

          <div className="about-card">
            <LuGraduationCap className="about-icon" />
            <h3>Natijalar</h3>
            <p>
              Maktab o‘quvchilari har yili respublika olimpiadalari va tanlovlarda yuqori o‘rinlarni egallaydilar.
            </p>
          </div>
        </div>

        <section data-aos="fade-up" className="about-additional">
          <h2>Qo'shimcha Ma'lumotlar</h2>
          <div className="about-additional-content">
            <p>Hozirda faoliyat olib borayotgan 182 ta ixtisoslashtirilgan maktablarda 63 ming nafardan ziyod oʻquvchilarga uch bosqichli tanlov natijalariga koʻra saralab olingan 7 ming nafardan ortiq oʻqituvchi taʼlim tarbiya berib kelmoqda.</p> 

<p>Tashkil etilgan ixtisoslashtirilgan maktablarda aniq fanlar (matematika, fizika, ingliz tili) va tabiiy fanlar (kimyo, biologiya, ingliz tili) bilan bir qatorda Oʻzbekiston tarixi fani chuqurlashtirilgan holda oʻqitilishi hamda sunʼiy intellekt, robototexnika, agrotexnologiya, biotexnologiya, IELTS, TOEFL va SAT boʻyicha qoʻshimcha kurslar yoʻlga qoʻyildi.</p>

<p>Iqtidorli yoshlarga bilim berish, oʻz bilimlarini amaliyotda qoʻllay bilishlari maqsadida har bir maktab fizika, kimyo va biologiya oʻquv fanlarining zamonaviy laboratoriya va robototexnika jihozlari, kimyoviy reagentlar bilan taʼminlangan.</p>

<p>Faoliyati tashkil etilganidan uzoq muddat oʻtmaganligiga qaramay, ixtisoslashtirilgan maktab oʻquvchilari shu kunga qadar 23 turdagi xalqaro olimpiadalarda ishtirok etib jami 95 ta (11 ta oltin, 29 ta kumush, 55 ta bronza) medalni qoʻlga kiritdilar.</p>

<p>2022/2023 oʻquv yilida ixtisoslashtirilgan maktablarda amaliyotda qoʻllanilgan yangi taʼlim dasturlari, dars oʻtishning ilgʻor metodikalari va oʻquvchi bilimini baholashning zamonaviy usullari 2023/2024 oʻquv yilida respublika boʻylab 500 ta umumtaʼlim maktablariga joriy etildi. Bu amaliyot 2024/2025 o‘quv yilida yana 1000 ta umumtaʼlim maktabiga tatbiq etilishi rejalashtirilgan.</p>
          </div>
        </section>
      </div>
    </section>
  );
}

export default AboutSchool;
