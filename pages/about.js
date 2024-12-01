import DefaultLayout from "../layouts/default";
import { defaultData } from "../lib/defaultData";
import { Permanent_Marker } from "next/font/google";
import { useState, useEffect, useRef } from "react";

import Spliter from "../components/spliter";
import Intro_about from "../components/about/intro";
import WorkingHours from "../components/workingHours";
import Mission from "../components/about/mission";
import Video from "../components/about/video";
import Team from "../components/about/team";
import Rating from "../components/about/rating";

import Lenis from "lenis";

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function about() {
  const [siteData, setSiteData] = useState(defaultData);
  let fonts = {
    marker: marker,
  };

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
          });
        }
        /*
        // start lenis (smooth scroll) only when document is ready
        const lenis = new Lenis();
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        */
      });
  }, []);

  return (
    <DefaultLayout siteData={siteData} fonts={fonts}>
      <Intro_about siteData={siteData} fonts={fonts} />

      <Spliter />

      <WorkingHours siteData={siteData} fonts={fonts} />

      <Spliter />

      <Rating siteData={siteData} fonts={fonts} />

      <Spliter />

      <Mission siteData={siteData} fonts={fonts} />

      <Spliter />
      <Video />
      <Spliter />

      <Team siteData={siteData} fonts={fonts} />
    </DefaultLayout>
  );
}
