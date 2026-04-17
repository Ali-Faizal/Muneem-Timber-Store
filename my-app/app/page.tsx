"use client";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ItemsSection from './components/ItemsSection';
import ServicesSection from './components/ServicesSection';
import CallToAction from './components/CallToAction';
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      {/* mainpage */}
      <div className="bg-white h-screen w-screen ">
        <AnnouncementBar />
        <Navbar/>      
        <Hero />
        <ItemsSection/>
        <ServicesSection/>
        <CallToAction/>
        <LocationSection/>
        <Footer/>
      </div>

    </>
  );
}
