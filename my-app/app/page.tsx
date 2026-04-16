"use client";
import { Button } from 'flowbite-react';
import Link from "next/link";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import Navbar from './components/Navbar';


export default function Home() {
  return (
    <>
      {/* mainpage */}
      <div className="bg-white h-screen w-screen ">
        <AnnouncementBar />
        <Navbar/>      
      </div>

    </>
  );
}
