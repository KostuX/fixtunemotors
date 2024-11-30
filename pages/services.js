import Spliter from "../components/spliter";

import DefaultLayout from "../layouts/default";
import { Permanent_Marker } from "next/font/google";

import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";

import Intro from "../components/services/intro";
import Services from "../components/services/services";
import WorkingHours from "../components/workingHours";

import { defaultData } from "../lib/defaultData";


const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {

  const [siteData, setSiteData] = useState(defaultData);
  let fonts = {
    marker: marker,
   
  }

  useEffect(() => {
    let endpoint = "/api/googleInfo";
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSiteData({
            ...siteData,
            online: true,
            phone: [data.data["international_phone_number"]] || siteData.phone,
            address: data.data["address_components"] || siteData.address,
            opening_hours: data.data["opening_hours"] || siteData.opening_hours,
            reviews: data.data["reviews"] || siteData.reviews,
            rating: data.data["rating"] || siteData.rating
          })
        }

        // start lenis (smooth scroll) only when document is ready
        const lenis = new Lenis();
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      });
  }, []);


  return (
    <DefaultLayout siteData={siteData} fonts={fonts}>
      <Intro siteData={siteData} fonts={fonts} />
      <Spliter/>
      <Services siteData={siteData} fonts={fonts} />
      <Spliter/>
      <WorkingHours siteData={siteData} fonts={fonts} />
    </DefaultLayout>
  );
}
