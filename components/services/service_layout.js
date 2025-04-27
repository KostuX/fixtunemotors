import { Progress } from "@heroui/react";
import { Parallax } from "react-scroll-parallax";
import { useRef, useEffect } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Services_layout({ siteData, fonts, service, full }) {
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
  let description = full ? service.description : service.description_short;
  let isHiden = full ? "" : "hidden";

  return (
    <div key={service.title} className="  md:mx-5 mt-10" ref={load}>
      <span className={`grid grid-cols-1  content-center  md:my-5  `}>
        <div className=" flex justify-center items-center relative  overflow-hidden">
          <img
            className="w-2/3 rounded-xl transition-transform duration-500 transform hover:scale-125 peer hover:rounded-2xl"
            src={service.image}
            alt="image cannot be loaded"
          ></img>
        </div>
        <Parallax speed={1}>
          <div
            className={`font-bold text-center text-3xl ${fonts.marker.className} mb-5`}
          >
            {service.title}
          </div>
        </Parallax>

        <Parallax speed={-1}>
          <div className="mx-10">{description}</div>
        </Parallax>
      </span>
      <Parallax speed={1}>
        <div
          className={`m-5 font-bold text-center text-xl ${fonts.marker.className} ${isHiden}`}
        >
          <p>From: {service.price}€ </p>
        </div>
      </Parallax>

      <div className={`m-10 ${isHiden}`}>
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
        />
      </div>
    </div>
  );
}
