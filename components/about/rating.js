import { useEffect, useRef } from "react";
import {
  ParallaxBanner,
  ParallaxBannerLayer,
  Parallax,
} from "react-scroll-parallax";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Rating({ siteData, fonts }) {
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
    <div ref={load}>
      <ParallaxBanner
        style={{ aspectRatio: "2 / 1" }}
        className=" flex bg-cover h-screen  md:h-auto "
      >
        <ParallaxBannerLayer image="/door.jpg" speed={-30} />
        <ParallaxBannerLayer className="  bg-black bg-opacity-50">
          <div className={"flex justify-center  text-white"}>
            <div className="max-w-6xl">
              <div
                className={`  text-center mt-24 mx-10 md:mx-24 grid  flex justify-items-center`}
              >
                <Parallax speed={1}>
                  <div>
                    <p
                      className={`${fonts.marker.className} text-3xl  font-bold`}
                    >
                      Rating
                    </p>

                    {siteData.online && (
                      <img
                        src={`rating/${Math.ceil(siteData.rating)}.png`}
                        style={{ width: "200px", height: "40px" }}
                        className="my-4"
                      />
                    )}
                  </div>
                </Parallax>
                <Parallax speed={-1}>
                  <div className={`text-xl  `}>
                    Maintaining a high business rating requires exceptional
                    service, prompt communication, and addressing feedback
                    effectively. Build trust through transparency, personalized
                    service, and professionalism. Monitor reviews, respond
                    courteously, and thank customers for support. Foster a
                    positive workplace culture and adapt to evolving needs to
                    ensure consistent quality and customer satisfaction.
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
        </ParallaxBannerLayer>
      </ParallaxBanner>
    </div>
  );
}
