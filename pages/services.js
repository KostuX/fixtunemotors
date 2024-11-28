import { Button } from "@nextui-org/react";
import { cfg_services } from "../config/cfg_services";
import { cfg_site } from "../config/cfg_site";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import { Divider } from "@nextui-org/divider";
import { useState, useEffect, useRef } from "react";
import Intro from '../components/intro';
import Intro2 from '../components/intro2';
import Services_sm from "../components/services_sm";
import { ParallaxBanner,ParallaxBannerLayer  } from 'react-scroll-parallax';
import { Progress } from "@nextui-org/react";
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
export default function Home() {
  const [data, setData] = useState([]);
  const [workingHours, setWorkingHours] = useState(cfg_site.workHours);
  const [isOpen, setOpen] = useState(true);
  const [isDataFetched, setDataFetched] = useState(false);
  const [phone, setPhone] = useState(cfg_site.phone)
  const [isDarkMode, setDarkMode] = useState(false)

  function handleCallBtn() {
    window.location.href = `tel:${cfg_site.phone[0]}`;
  }

  function handleLocationButton() {
    window.open(cfg_site.googleMap, "_blank");
  }

  const review = useRef(null);
  const hours = useRef(null);
  useEffect(() => {
    const el = review.current
    const hr = hours.current
    gsap.fromTo(el, { opacity: 0 }, {
      opacity: 1, duration: 2, scrollTrigger: {
        trigger: el
      }
    })
    gsap.fromTo(hr, { opacity: 0 }, {
      opacity: 1, duration: 2, scrollTrigger: {
        trigger: hr
      }
    })
  }, [])



  useEffect(() => {


    let endpoint = "/api/googleInfo";
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        if (data.data) {
          setDataFetched(true);
          setWorkingHours(data.data.current_opening_hours.weekday_text);
          setOpen(data.data.current_opening_hours.open_now);
        }
      });
  }, []);
  return (
    <DefaultLayout>  
         <ParallaxBanner style={{ aspectRatio: '2 / 1' }} className=" flex bg-cover h-screen" >
  <ParallaxBannerLayer image="/diagnostic.jpg" speed={-10} />
  <ParallaxBannerLayer className="flex bg-cover h-screen">
 
  <span className=" w-screen bg-black bg-opacity-50">
            <div className=" h-1/2 grid grid-cols-1 sm:grid-cols-3 mx-20 sm:mx-1 gap-4 content-center ">
              <span></span>
              <span className="text-4xl md:text-7xl font-bold font-mono text-white col-span-2">
                <div className={marker.className}>
                  <p className="mt-48 md:mr-48">Driven to Excellence, Always Reliable!</p>
                  <p className="text-xl">Expert care, smooth rides, dependable service!</p>

                  <div className="grid grid-cols-2 content-end w-56">
                    <Button
                      size="sm"
                      className="mx-2 inline sm:hidden mt-5 before:ease relative  overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-blue hover:shadow-black hover:before:-rotate-180"
                      onClick={handleCallBtn}
                    
                    >
                      <div className="hover:text-red-600 relative z-10">Call Us</div>
                      
                    </Button>
                    <Button
                      size="sm"
                      className="mx-2 inline  mt-5 before:ease relative  overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-blue hover:shadow-black hover:before:-rotate-180"
                      onClick={handleLocationButton}
                    >
                       <div className="hover:text-red-600 relative z-10">Find Us</div>
                      
                    </Button>
                  </div>
                </div>
              </span>
              <span></span>
            </div>
          </span>
         
  </ParallaxBannerLayer>
</ParallaxBanner>


 

   <div >
      
     
    <div
      className={`${marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
      
    >
      <Divider className="mt-10" />
     
      <p className="mt-24 ">Services</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2  " >
      {cfg_services.services.map((service, i) => (
        <div key={i} className="  md:mx-5 mt-10"  >
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
          <div className="mx-10">{service.description}</div>
          <div className={`m-5 font-bold text-center text-xl ${marker.className}`}>
            <p>From:  {service.price}€ </p>
           
            </div>
            <div className="m-10">
            <Progress
      size="sm"
      radius="sm"
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        indicator: "bg-gradient-to-r from-red-900 to-green-500",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
      label={service.boost.type}
      value={service.boost.size}
      showValueLabel={true}
    /></div>
        </div>
      ))}
    </div>
   
      
    </div>
    </DefaultLayout>
  );
}
