import { Navbar } from "../components/navbar";
import { Navbar_contact } from "../components/navbar_contact";
import { Foot } from "../components/footer";
import { Head } from "../components/head";
import { useState, useEffect } from "react";
import { Providers } from '../components/providers';
import Lenis from "lenis";
export default function DefaultLayout({ children }) {
  
  useEffect(() => {
    {
      const lenis = new Lenis();

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }, []);

  return (
    <div>
      <Head />
      <Navbar_contact />
      <Navbar />

     <Providers><main>{children}</main></Providers> 
      <Foot />
    </div>
  );
}
