'use client';
import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import { Parallax } from 'react-scroll-parallax';
import { cfg_site } from "../config/cfg_site";
import { Button } from "@nextui-org/react";
import { useRef, useEffect } from "react";
import { ParallaxBanner,ParallaxBannerLayer ,useParallax  } from 'react-scroll-parallax';
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const marker = Permanent_Marker({
    subsets: ["latin"],
    weight: ["400"],
  });
  const lora = Lora({
    subsets: ["latin"],
    weight: ["400"],
  });
export default function Intro() {
    const parallax = useParallax({
        rotateY: [0, 360],
      });

  
      const text = useRef(null);
      useEffect(()=>{    
        const el = text.current
        gsap.fromTo(el, {opacity:0},{opacity:1, duration:2, scrollTrigger:{
            trigger:el
        }})
      },[])
    
    return(
         <div className="m-10 md:m-48 text-xl justify-between " ref={text}>
    
            
   
        <div>
          {" "} <Parallax speed={2}><p className="font-bold text-center">{cfg_site.slogan[1]}</p></Parallax>
          <div ref={parallax.ref} className="spinner">
          ................
     
    </div>
          <Parallax speed={-2}>
          <p className={`text-sm text-center m-5 mt-10`}>
            Repairing your car on time ensures safety, prevents costly
            breakdowns, and enhances performance. Timely maintenance extends the
            vehicle's lifespan, improves fuel efficiency, and reduces
            environmental impact. Neglecting repairs can compromise safety
            features and lead to expensive damages. Stay proactive to ensure
            reliability, save money, and maintain your car’s value.
          </p>
          </Parallax>
        </div>
      </div>)
}