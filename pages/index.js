import { Button } from "@nextui-org/react";
import { cfg_services } from "../config/cfg_services";
import { cfg_site } from "../config/cfg_site";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import { Divider } from "@nextui-org/divider";
import { useState, useEffect , useRef} from "react";
import Intro from '../components/intro';
import Intro2 from '../components/intro2';
import Services_sm from "../components/services_sm";

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

 

  const review = useRef(null);
  const hours = useRef(null);
  useEffect(()=>{    
    const el = review.current
    const hr = hours.current
    gsap.fromTo(el, {opacity:0},{opacity:1, duration:2, scrollTrigger:{
        trigger:el
    }})
    gsap.fromTo(hr, {opacity:0},{opacity:1, duration:2, scrollTrigger:{
      trigger:hr
  }})
  },[])
  
  function handleCallBtn() {
    window.location.href = `tel:${phone[0]}`;
  }

  function handleLocationButton() {
    window.open(cfg_site.googleMap, "_blank");
  }

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
   
   
      <div className="justify-between h-full   ">
    <Intro/>
   <Intro2/>
     
  
      </div>
      
      {/** END of intro */}
      <Divider />
      {/** Services */}
 

      {/** end of up  start of func */}
      <Divider className="" />
      <Services_sm/>
      
      {/** END of Services */}
     
      <div ref={review}>
      {isDataFetched && (
        <div >
          <div
            className={`${marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
          >
            <p className="mt-24 ">Reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {data?.reviews?.map((review, i) => (
              <div key={i} className="mt-10 mx-10 ">
                <span className="flex">
                  {review.profile_photo_url && (
                    <img
                      src={review.profile_photo_url}
                      alt={`${review.author_name}'s profile`}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <div className={`${marker.className} mx-2`}>
                    <div> {review.author_name}</div>
                    <div className="inline text-xs font-mono">
                      {review.relative_time_description}
                    </div>
                  </div>
                </span>
                <div>
                  <img
                    src={`rating/${review.rating}.png`}
                    style={{ width: "100px", height: "20px" }}
                    className="my-4"
                  />
                </div>
                <div>{review.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
   
      </div>
      <Divider className="mt-5  " />
      <div ref={hours}>
        <div
          className={`${marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
        >
          <p className="mt-24 ">Working Hours</p>
          <div className="flex justify-center">
            {" "}
            
           {isDataFetched && <img
              src={isOpen ? `workHours/open.png` : `workHours/closed.png`}
              style={{ width: "50px", height: "50px" }}
            />}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 text-center">
          <div>
            <p className={`${marker.className} mx-2 font`} >Hours</p>
          <ul>
            {workingHours.map((hours, i) => (
              <li key={i}>{hours}</li>
            ))}
          </ul>
          </div>
          <div>
            
            <p className={`${marker.className} mx-2 mt-10`} >Phone</p>
            <ul>
            {phone.map((phone, i) => (
              <li key={i}>{phone}</li>
            ))}
          </ul>
          </div>
           <div>
           <p className={`${marker.className} mx-2 mt-10`} >Address</p>
           <p className="">{cfg_site.address}</p>
           <p className="">{cfg_site.postCode}</p>
           <p className="">{cfg_site.country}</p>
           </div>
         
         
        </div>
      </div>
    </DefaultLayout>
  );
}
