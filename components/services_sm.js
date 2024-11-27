import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import { useState, useEffect , useRef} from "react";
import { cfg_services } from "../config/cfg_services";
import { cfg_site } from "../config/cfg_site";
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


export default function Services_sm() {
    const div = useRef(null);
   

    useEffect(()=>{   
      const el = div.current      
  
      gsap.fromTo(el, {opacity:0},{opacity:1, duration:2, scrollTrigger:{
          trigger:el
      }})

      
      
    
    },[])
    
    return(<div ref={div}>
    <div
      className={`${marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
     
    >
      <p className="mt-24 ">Services</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3  " >
      {cfg_services.services.map((service, i) => (
        <div key={i} className="  md:mx-5 mt-10" ref={div} >
          <span
            className={`grid grid-cols-1  content-center  md:my-5 ${lora.className} `}
          >
            <div className=" flex justify-center items-center relative  overflow-hidden">
              <img
                className="w-2/3 rounded-xl transition-transform duration-500 transform hover:scale-125 peer hover:rounded-2xl"
                src={service.image}
                alt="image cannot be loaded"
              ></img>
            </div>
            <p
              className={`font-bold text-center text-3xl ${marker.className} mb-5`}
            >
              {service.title}
            </p>
          </span>
          <div className="mx-10">{service.description_short}</div>
        </div>
      ))}
    </div>
    </div>)}