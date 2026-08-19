import React from "react";
import DJHomepage from "./Components/Home";
import Services from "./Components/services";
import TextCarousel from "./Components/Elements/TextCarousel";
import VideoGallerySection from "./Components/Gallery";
import ContactUsPage from "./Components/Contact";
import Footer from "./Components/Footer";

export function App() {
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
