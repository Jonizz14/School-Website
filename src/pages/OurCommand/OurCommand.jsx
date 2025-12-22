import "./OurCommand.css";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    id: 1,
    name: "To'xtayev Jahongir",
    role: "Frontend UI/UX Designer",
    bio: "UI/UX dizayn va React texnologiyasiga qiziqaman. Asosan JavaScript bilan ishlayman va JSON API hamda turli ma’lumotlar bazalari bilan integratsiya qilishni yoqtiraman. Yangi loyihalarda ishlash va o‘rganishga doim tayyorman. Men foydalanuvchi tajribasini birinchi o‘ringa qo‘yaman va har bir dizayn elementini sinchkovlik bilan ishlab chiqaman. React komponentlarini yaratish va ularni qayta ishlatishni yaxshi ko‘raman. Shuningdek, CSS animatsiyalari va zamonaviy frameworklar bilan tajriba orttirishga harakat qilaman.",
    img: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    github: "https://github.com/Jonizz14",
    telegram: "https://jonizz_devvvv.t.me/",
    skills: ["React", "JavaScript", "CSS", "UI/UX Design", "Figma", "Responsive Design"],
  },
  {
    id: 2,
    name: "Jabborov Adham",
    role: "Frontend Developer",
    bio: "React Texnalogiyasida ishlayman va UI/UX design. Asosan Javascript, Node.js va Json-Server, API hamda turli ma’lumotlar bazalari bilan integratsiya qilishni yoqtiraman. Yangi loyihalarda ishlash va o‘rganishga doim tayyorman. Men kod yozishni sevaman va har bir funksiyani optimallashtirishga e’tibor beraman. Backend bilan integratsiya qilishda tajriba orttirganman va RESTful API lar bilan ishlashni yaxshi bilaman. Jamoaviy ishda hamkorlik qilishni yoqtiraman.",
    img: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    github: "https://github.com/adhamjonjabborov07",
    telegram: "https://jabborov_0o7.t.me/",
    skills: ["React", "JavaScript", "Node.js", "JSON Server", "API Integration", "Git"],
  },
  {
    id: 3,
    name: "Buvosherov Bekzod",
    role: "Backend Developer",
    bio: "Backend rivojlanishiga qiziqaman. Node.js va Express.js bilan server tomon kod yozishni yoqtiraman. Ma’lumotlar bazalari bilan ishlash, xususan MongoDB va PostgreSQL bilan tajriba orttirganman. API yaratish va ularni xavfsiz qilishni bilaman. Mikroservis arxitekturasiga qiziqaman va katta loyihalarda ishlashni istayman. Kodni toza va o‘qilishi oson qilishga harakat qilaman.",
    img: "https://dasturbek.uz/assets/img/profile-img.jpg",
    github: "https://github.com/dasturbek",
    telegram: "https://dasturbe.t.me/",
    skills: ["Django", "Python", "Rest API", "PostgreSQL", "SQL", "JWT"],
  },
];

export default function OurTeam() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div data-aos="fade-up" className="team-page-wrapper">
      <header className="team-hero-section">
        <div className="team-hero-content">
          <h1 className="team-hero-title">Bizning Jamoa</h1>
          <p className="team-hero-lead">
            Biz yangi fikrlaydigan va texnologiyaga qiziqqan jamoamiz. Hozirda o‘rganish va tajriba orttirish jarayonida bo‘lsak-da, maqsadlarimiz katta va aniq. Biz UI/UX tamoyillariga amal qilgan holda chiroyli va qulay interfeyslar yaratishga intilamiz. Jamoamizda frontend va backend dasturchilar, shuningdek UI/UX dizaynerlar mavjud. Biz har bir loyihada innovatsion yechimlar topishga harakat qilamiz.
          </p>
        </div>
      </header>

      <main className="team-members-container">
        {teamMembers.map((member) => (
          <article className="team-member-card" key={member.id}>
            <div className="member-card-top">
              <div className="member-avatar-wrap">
                {member.img ? (
                  <img src={member.img} alt={member.name} className="member-avatar" />
                ) : (
                  <div className="member-avatar-placeholder">
                    {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                )}
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            </div>

            <p className="member-bio">{member.bio}</p>

            <div className="member-skills">
              <h4>Ko‘nikmalar:</h4>
              <div className="skills-list">
                {member.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="member-card-footer">
              <div className="member-social-links">
                <a
                  href={member.github || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github"
                  className="social-link"
                >
                  <FaGithub />
                </a>
                <a
                  href={member.telegram || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="telegram"
                  className="social-link"
                >
                  <FaTelegramPlane />
                </a>
              </div>
            </div>
          </article>
        ))}
      </main>
      
      <section data-aos="fade-up" className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Biz bilan Bog'laning</h2>
          <p className="section-description">
            Agar siz bilan hamkorlik qilishni istasangiz yoki savollaringiz bo'lsa, quyidagi havolalar orqali biz bilan bog'laning.
          </p>
          <div className="contact-links">
            <a href="https://github.com/dasturbek" target="_blank" rel="noreferrer" className="contact-link">
              <FaGithub /> GitHub
            </a>
            <a href="https://dasturbe.t.me/" target="_blank" rel="noreferrer" className="contact-link">
              <FaTelegramPlane /> Telegram
            </a>
            <a href="https://dasturbek.com@gmail.com" className="contact-link">
              Email
            </a>
          </div>
        </div>
      </section>

      <section data-aos="fade-up" className="project-info-section">
        <div className="project-info-inner">
          <h2 className="project-info-title">Loyiha haqida</h2>
          <p className="project-info-text">
            Ushbu loyiha g‘oyasi dastlab bizning o‘qituvchimiz tomonidan berilgan kichik topshiriq sifatida boshlangan edi. Keyinchalik biz uni yanada kengaytirib, mustaqil ravishda jamoaviy ishga aylantirdik. Maqsadimiz – foydalanuvchilarga qulay, chiroyli va zamonaviy web interfeyslar taqdim etishdir. Biz har bir loyihada foydalanuvchi ehtiyojlarini birinchi o‘ringa qo‘yamiz.
          </p>
          <p className="project-info-text">
            Har bir dizayn elementi foydalanuvchi tajribasini yaxshilashga qaratilgan. Bu loyiha orqali biz React komponentlar arxitekturasi va UI tamoyillarini chuqurroq o‘rgandik. Shuningdek, jamoaviy ish, kod review va agile metodologiyalarini qo‘lladik. Bizning workflowimizda Scrum metodologiyasidan foydalanamiz va har hafta sprint review o‘tkazamiz.
          </p>
          <p className="project-info-text">
            Bizning jamoamiz doimo yangi texnologiyalarni o‘rganishga va ularni amaliyotda qo‘llashga intiladi. Har bir loyiha uchun eng yaxshi yechimlarni topishga harakat qilamiz. Kelajakda bizning maqsadimiz – katta miqyosdagi loyihalarda ishtirok etish va o‘z sohamizda yetakchi bo‘lish. Biz open source hamjamiyatiga hissa qo‘shishni va bilimlarimizni ulashishni muhim deb bilamiz.
          </p>
          <p className="project-info-text">
            Loyihamizning rivojlanish jarayonida biz turli qiyinchiliklarga duch keldik. Masalan, cross-browser compatibility, performance optimization va accessibility masalalari. Har bir muammoni hal qilish orqali biz o‘sib, professional bo‘lib bordik. Hozirda bizning kodimiz clean, maintainable va scalable.
          </p>
          <p className="project-info-text">
            Bizning jamoamizda diversity muhim o‘rin tutadi. Har bir a'zo o‘z sohasida expert bo‘lib, bir-birimizni to‘ldirib turamiz. Frontend dasturchilar, backend dasturchilar va dizaynerlar birgalikda ishlaydi. Bu bizga comprehensive yechimlar yaratish imkonini beradi.
          </p>
          <p className="project-info-text">
            Kelajak rejalariimiz orasida AI va machine learning texnologiyalarini integratsiya qilish, mobile app development ga kirishish va international mijozlar bilan ishlash mavjud. Biz doimo o‘sishda va yangi imkoniyatlarni izlaymiz.
          </p>
        </div>
      </section>
    </div>
  );
}
