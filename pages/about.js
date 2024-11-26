import DefaultLayout from "../layouts/default";
import { cfg_site } from "../config/cfg_site";
import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import { useState, useEffect } from "react";
import { Divider } from "@nextui-org/divider";

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
     

      <div className={"flex h-screen bg-[url('/intro.jpg')] bg-cover text-white"}>
        <div className="bg-black bg-opacity-30" >
        
          <div   className={`${marker.className} text-3xl  font-bold text-center mt-48` }>About Us</div>
          <div   className={`${marker.className} text-2xl  font-bold text-center ` }>Your Trusted Car Garage in Cavan, Ireland</div>
          <p className={`text-xl text-center mx-10 md:mx-24`}>
           {cfg_site.aboutUs}
          </p>
        </div>
      </div>
      <Divider/>
      <div className="m-10 text-xl justify-between  ">
       
       
        <div className="mx-10 md:mx-48 ">
          <div   className={`${marker.className} text-2xl  font-bold text-center mt-10  ` }>Mission</div>
         
          <p className={`text-sm text-center m-5 `}>
           {cfg_site.mission}
          </p>
        </div>
        </div>
      <Divider/>
      <div className="grid grid-cols-1  mb-10 ">
        {cfg_site.team.map((member, i) => (
          <div key={i} className="  md:mx-5 mt-10">
            <span
              className={`grid grid-cols-1  content-center  md:my-5 ${lora.className} `}
            >
              <div className=" flex justify-center items-center ">
              <img
                      src={member.image}
                      alt={`${member.name}'s profile`}
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    />
              </div>
              <p
                className={`font-bold text-center text-3xl ${marker.className}`}
              >
                {member.name}
              </p>
              <p
                className={`font-bold text-center text-xl ${marker.className} `}
              >
                {member.postition}
              </p>
            </span>
            <div className="mx-10">{member.description}</div>
          </div>
        ))}
      </div>
    
      <Divider/>
      <div className="justify-between h-full text-center ">

      <div className=" ">
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
      </div>
    </DefaultLayout>
  );
}
