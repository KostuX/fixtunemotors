"use client";

import { Parallax } from "react-scroll-parallax";
import { cfg_site } from "../config/cfg_site";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Intro(siteData, fonts) {
  const load = useRef(null);
  useEffect(() => {
    const el = load.current;
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: el,
        },
      }
    );
  }, []);

  return (
    <div className="m-10 md:m-48 text-xl  flex justify-center " ref={load}>
      <div className="max-w-xl">
        <Parallax speed={1}>
          <p className="font-bold text-center ">{cfg_site.slogan[1]}</p>
        </Parallax>

        <Parallax speed={-1}>
          <p className={`text-sm text-center m-5 mt-10 `}>
            Repairing your car on time ensures safety, prevents costly
            breakdowns, and enhances performance. Timely maintenance extends the
            vehicle's lifespan, improves fuel efficiency, and reduces
            environmental impact. Neglecting repairs can compromise safety
            features and lead to expensive damages. Stay proactive to ensure
            reliability, save money, and maintain your car’s value.
          </p>
        </Parallax>
      </div>
    </div>
  );
}
