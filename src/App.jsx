import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import DJHomepage from "./Components/Home";
import Services from "./Components/Services";
import TextCarousel from "./Components/Elements/TextCarousel";
import VideoGallerySection from "./Components/Gallery";
import ContactUsPage from "./Components/Contact";
import Footer from "./Components/Footer";
import GallerySection from "./Components/MainGallery";
import FloatingWhatsApp from "./Components/Elements/FloatingWhatsApp";

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <DJHomepage />
      <TextCarousel />
      <Services />
      <VideoGallerySection />
      <ContactUsPage />
      <Footer />
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden min-h-screen bg-[#141010] pt-20">
      <GallerySection />
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden bg-[#141010] text-[#FAF6F6] relative">
      <ScrollToTopOnRoute />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <FloatingWhatsApp />
    </div>
  );
}

