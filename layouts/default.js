import { Navbar } from "../components/navbar";
import { Navbar_contact } from "../components/navbar_contact";
import { Foot } from "../components/footer";
import { Head } from "../components/head";
import React, { useEffect, useState } from "react";
import { Providers } from "../components/providers";
import ScrollContext from "../components/ScrollContext";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "@heroui/react";
export default function DefaultLayout({ children, siteData, fonts }) {
  const [isHydrated, setIsHidrated] = useState(false);
  useEffect(() => {
    setIsHidrated(true);
  }, []);
  return (
    <div className="h-screen">
      <SessionProvider >
     
      <Head />
      <Navbar_contact siteData={siteData} />
      <Navbar siteData={siteData} fonts={fonts} />
      <Providers>
        <ScrollContext>
    
          <main>{children}</main>
   
        </ScrollContext>
      </Providers>
      {isHydrated && <SpeedInsights />}
      <Analytics />
      <Foot siteData={siteData} />
      
      </SessionProvider >
    </div>
  );
}
