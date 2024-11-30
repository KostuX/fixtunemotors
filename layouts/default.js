import { Navbar } from "../components/navbar";
import { Navbar_contact } from "../components/navbar_contact";
import { Foot } from "../components/footer";
import { Head } from "../components/head";
import React from "react";
import { Providers } from '../components/providers';

export default function DefaultLayout({ children, siteData, fonts }) {
  return (
    <div>
      <Head />
      <Navbar_contact siteData={siteData}/>
      <Navbar siteData={siteData} fonts={fonts} />
      <Providers>
        <main>          
          {children}
        </main>
      </Providers>
      <Foot siteData={siteData}/>
    </div>
  );
}
