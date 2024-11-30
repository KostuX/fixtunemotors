import { useEffect, useRef } from "react";
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

import gsap from "gsap";

export default function Rating({ siteData, fonts }) {

  const load = useRef(null);
  useEffect(() => {
    const el = load.current
    gsap.fromTo(el, { opacity: 0 }, {
      opacity: 1, duration: 2, scrollTrigger: {
        trigger: el
      }
    })
  }, [])
  return (<div ref={load}>
    <ParallaxBanner style={{ aspectRatio: '2 / 1' }} className=" flex bg-cover h-screen  md:h-auto " >
      <ParallaxBannerLayer image="/door.jpg" speed={-30} />
      <ParallaxBannerLayer className="  bg-black bg-opacity-50">
        <div className={"flex  text-white"}>
          <div className="" >

            <div className={`${fonts.marker.className} text-3xl  font-bold text-center mt-24 mx-10 md:mx-24 grid  flex justify-items-center`}>
              <p>Rating</p>
              {siteData.online && <img
                src={`rating/${Math.ceil(siteData.rating)}.png`}
                style={{ width: "200px", height: "40px" }}
                className="my-4"
              />
              }
              <div className={`text-xl ${fonts.lora.className}`}>Maintaining a high business rating requires exceptional service, prompt communication, and addressing feedback effectively. Build trust through transparency, personalized service, and professionalism. Monitor reviews, respond courteously, and thank customers for support. Foster a positive workplace culture and adapt to evolving needs to ensure consistent quality and customer satisfaction.
                
              </div>
            </div>
            <p className={`text-xl text-center mx-10 md:mx-24 mt-5`}>
            </p>
          </div>
        </div>
      </ParallaxBannerLayer>
    </ParallaxBanner>
  </div>)
}