'use client';
import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import { Parallax } from 'react-scroll-parallax';
import { cfg_site } from "../config/cfg_site";
import { Button } from "@nextui-org/react";
import { ParallaxBanner,ParallaxBannerLayer  } from 'react-scroll-parallax';
const marker = Permanent_Marker({
    subsets: ["latin"],
    weight: ["400"],
  });
  const lora = Lora({
    subsets: ["latin"],
    weight: ["400"],
  });
export default function Intro() {
    function handleCallBtn() {
        window.location.href = `tel:${phone[0]}`;
      }
    
      function handleLocationButton() {
        window.open(cfg_site.googleMap, "_blank");
      }
  return (
    
             


   <ParallaxBanner style={{ aspectRatio: '2 / 1' }} className=" flex bg-cover h-screen" >
  <ParallaxBannerLayer image="/intro.jpg" speed={-30} />
  <ParallaxBannerLayer className="flex bg-cover h-screen">
 
  <span className=" w-screen bg-black bg-opacity-50">
            <div className=" h-1/2 grid grid-cols-1 sm:grid-cols-3 mx-20 sm:mx-1 gap-4 content-center ">
              <span></span>
              <span className="text-6xl md:text-7xl font-bold font-mono text-white col-span-2">
                <div className={marker.className}>
                  <p className="mt-48 md:mr-48">From Tune-ups to Repairs</p>
                  <p className="text-xl">We Keep You Moving ... fast!</p>

                  <div className="grid grid-cols-2 content-ends w-56">
                    <Button
                      size="sm"
                      className="mx-2 inline sm:hidden mt-5"
                      onClick={handleCallBtn}
                    >
                      Call Us
                    </Button>
                    <Button
                      size="sm"
                      className="mx-2 mt-5  "
                      onClick={handleLocationButton}
                    >
                      Find Us
                    </Button>
                  </div>
                </div>
              </span>
              <span></span>
            </div>
          </span>
         
  </ParallaxBannerLayer>
</ParallaxBanner>


      
    
  
  );
}