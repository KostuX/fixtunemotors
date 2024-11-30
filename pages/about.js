import DefaultLayout from "../layouts/default";
import { defaultData } from "../lib/defaultData";
import { Permanent_Marker, Lora } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { Divider } from "@nextui-org/divider";
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { cfg_site } from "../config/cfg_site";
import Intro_about from "../components/about/intro";
import WorkingHours from "../components/workingHours";
import Mission from "../components/about/mission";
import Video from "../components/about/video";
import Team from "../components/about/team"
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Rating from "../components/about/rating";
gsap.registerPlugin(ScrollTrigger)

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
});

export default function about() {

  const load = useRef(null);
  useEffect(() => {
    const el = load.current
    gsap.fromTo(el, { opacity: 0 }, {
      opacity: 1, duration: 2, scrollTrigger: {
        trigger: el
      }
    })
  }, [])



  const [siteData, setSiteData] = useState(defaultData);
  let fonts = {
    marker: marker,
    lora: lora
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
            reviews: data.data["reviews"] || siteData.reviews
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



      <Intro_about siteData={siteData} fonts={fonts} />


      <Divider />
      <WorkingHours siteData={siteData} fonts={fonts} />



      <Divider />

      <Rating siteData={siteData} fonts={fonts} />


      <Divider />


      <Mission siteData={siteData} fonts={fonts} />

      <Divider />
      <Video />


      <Team siteData={siteData} fonts={fonts} />

    </DefaultLayout>
  );
}
