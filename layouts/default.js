import { Navbar } from "../components/navbar";
import { Navbar_contact } from "../components/navbar_contact";
import { Foot } from "../components/footer";
import { Head } from "../components/head";
import React , { useState, useEffect } from "react";

import { Providers } from '../components/providers';

export default function DefaultLayout({ children }) {

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
