import Spliter from "../components/spliter";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker } from "next/font/google";

import { useState, useEffect } from "react";

import Intro from '../components/intro';
import Intro2 from '../components/intro2';
import Services_sm from "../components/services_sm";
import WorkingHours from "../components/workingHours";
import Review from "../components/reviews";

import { defaultData } from "../lib/defaultData";

import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});



export default function Home() {
  const [isDataFetched, setDataFetched] = useState(false);
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
          setDataFetched(true);
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

      {/**============================================================ Intro */}
      <Intro siteData={siteData} fonts={fonts} />
      {/** END of Intro */}


      {/**============================================================ Intro2 */}
      <Intro2 siteData={siteData} fonts={fonts} />
      {/** END of Intro2 */}
      <Spliter />
      {/**============================================================ Services */}
      <Services_sm siteData={siteData} fonts={fonts} />
      {/** END of Services */}
      <Spliter />
      {/**============================================================ Review */}
      {isDataFetched && <Review siteData={siteData} fonts={fonts} />}
      {/** END of Review */}
      <Spliter />
      {/**============================================================ Working Hours */}
      <WorkingHours siteData={siteData} fonts={fonts} />
      {/** END of WorkingHours */}


    </DefaultLayout>
  );
}
