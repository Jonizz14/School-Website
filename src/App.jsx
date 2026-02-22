import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/layout";
import Loader from "./components/Loader/Loader";
import Home from "./pages/Home/home";
import News from "./pages/News/news";
import Teachers from "./pages/Teachers/teachers";
import Schedule from "./pages/Schedule/schedule";
import Announcements from "./pages/Announcements/announcements";
import AdditionDetails from "./pages/AdditionDetails/AdditionDetails";
import NewsDetails from "./pages/NewsDetails/NewsDetails";
import Addition from "./pages/Addition/addition";
import TeacherDetails from "./pages/TeachersDetails/TeachersDetails";
import Noutfound from "./pages/Notfound/notfound";
import HomePrincipalsDetails from "./pages/HomePrincipalsDetails/HomePrincipalsDetails";
import OurCommand from "./pages/OurCommand/OurCommand";
import Contact from "./pages/Contact/contact";
import Chat from "./components/Chat/Chat";
import TalentedStudents from "./pages/TalentedS/TalentedStudents";
import AboutSchool from "./pages/AboutSchool/AboutSchool";
import Principals from "./pages/Principals/Principals";
import Meetings from "./pages/Meeting/Meetings";
import MeetingDetails from "./pages/MeetingDetails/MeetingDetails";
import ScientistWork from "./pages/ScientistWork/ScientistWork";
import ScientistWorkDetails from "./pages/ScientistWorkDetails/ScientistWorkDetails";
import AnnouncementDetails from "./pages/AnnouncementDetails/AnnouncementDetails";
import Documentation from "./pages/Documentation/Documentation";
import ScrollTop from "./components/ScrollTop/ScrollTop";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const mainPages = [
    "/",
    "/news",
    "/teachers",
    "/schedule",
    "/announcements",
    "/addition",
    "/contact",
    "/talentedstudents",
    "/aboutschool",
    "/principals",
    "/meeting",
    "/scientistwork",
    "/documentation",
  ];

  useEffect(() => {
    const beforeUnloadHandler = () => {
      localStorage.removeItem("visitedPages");
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);
    return () => window.removeEventListener("beforeunload", beforeUnloadHandler);
  }, []);

  useEffect(() => {
    // Initial loading logic only runs once on mount
    const preloadImages = () => {
      const images = Array.from(document.images);
      return Promise.all(
        images.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) resolve();
              else {
                img.onload = img.onerror = resolve;
              }
            })
        )
      );
    };

    Promise.all([preloadImages()]).then(() => {
      // Small buffer to ensure layout is ready
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);
 // Empty dependency array means this runs only on mount/refresh

  if (loading) {
    return (
      <div className="page-preloader">
        <Loader />
      </div>
    );
  }
  
  return (
    <>
    <ScrollTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        <Route path="/news/:id/details" element={<Layout><NewsDetails /></Layout>} />
        <Route path="/teachers" element={<Layout><Teachers /></Layout>} />
        <Route path="/teachers/:id" element={<Layout><TeacherDetails /></Layout>} />
        <Route path="/principals/:id" element={<Layout><HomePrincipalsDetails /></Layout>} />
        <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
        <Route path="/ourcommand" element={<Layout><OurCommand /></Layout>} />
        <Route path="/addition/details" element={<Layout><AdditionDetails /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/announcements" element={<Layout><Announcements /></Layout>} />
        <Route path="/announcements/:id" element={<Layout><AnnouncementDetails /></Layout>} />
        <Route path="/addition" element={<Layout><Addition /></Layout>} />
        <Route path="*" element={<Layout><Noutfound /></Layout>} />
        <Route path="/talentedstudents" element={<Layout><TalentedStudents /></Layout>} />
        <Route path="/aboutschool" element={<Layout><AboutSchool /></Layout>} />
        <Route path="/principals" element={<Layout><Principals /></Layout>} />
        <Route path="/meeting" element={<Layout><Meetings /></Layout>} />
        <Route path="/meeting/:id" element={<Layout><MeetingDetails /></Layout>} />
        <Route path="/scientistwork" element={<Layout><ScientistWork /></Layout>} />
        <Route path="/scientistwork/:id" element={<Layout><ScientistWorkDetails /></Layout>} />
        <Route path="/documentation" element={<Layout><Documentation /></Layout>} />

      </Routes>
      <Chat />
    </>
  );
}

export default App;
