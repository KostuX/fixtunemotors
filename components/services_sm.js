import { Permanent_Marker} from "next/font/google";
import { cfg_services } from "../config/cfg_services";
import Services_layout from "./services/service_layout";

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});



export default function Services_sm({siteData, fonts}) {



  return (
  <div >

    <div
      className={`${marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}

    >
      <p className="mt-24 ">Services</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3  " >
      {cfg_services.services.map((service, i) => (
        <div key={i} className="  md:mx-5 mt-10"  >
           <Services_layout siteData={siteData} fonts={fonts} service={service} full={false}/> 
        </div> 
      ))}


    </div>


  </div>)
}