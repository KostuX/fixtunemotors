import { cfg_services } from "../../config/cfg_services";
import { Progress } from "@heroui/react";
import Services_layout from "./service_layout";
export default function Services({ siteData, fonts }) {
  return (
    <div>
      <div
        className={`${fonts.marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
      >
        <p className="mt-24 ">Services</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
        {cfg_services.services.map((service, i) => (
          <div key={i} className="  md:mx-5 mt-10">
            <Services_layout
              siteData={siteData}
              fonts={fonts}
              service={service}
              full={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
