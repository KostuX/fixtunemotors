import { Navbar } from "../components/navbar";
import { Navbar_contact } from "../components/navbar_contact";
import { Foot } from "../components/footer";
import { Head } from "../components/head";
import React, { useEffect, useState } from "react";
import { Providers } from "../components/providers";
import ScrollContext from "../components/ScrollContext";

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function DefaultLayout({ children, siteData, fonts }) {
  const [isHydrated, setIsHidrated] = useState(false);
  useEffect(() => {
    setIsHidrated(true);
  }, []);
  return (
    <div>
      <Head />
      <Navbar_contact siteData={siteData} />
      <Navbar siteData={siteData} fonts={fonts} />
      <Providers>
        <ScrollContext>
          <main>{children}</main>
        </ScrollContext>
      </Providers>
      {isHydrated && <SpeedInsights />}
      <Foot siteData={siteData} />
    </div>
  );
}
