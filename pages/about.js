import DefaultLayout from "../layouts/default";
import { cfg_site } from "../config/cfg_site";
import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import { useState, useEffect } from "react";
import { Divider } from "@nextui-org/divider";
import { ParallaxBanner,ParallaxBannerLayer  } from 'react-scroll-parallax';
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
       
        if (data.data) {
     
          setData(data.data);
          setDataFetched(true);
          setWorkingHours(data.data.current_opening_hours.weekday_text);
          setOpen(data.data.current_opening_hours.open_now);
        }
      });
  }, []);
  return (
    <DefaultLayout>
      <div className="relative w-full h-auto hidden">
        
      <div className="absolute w-full flex flex-col   ">



      <div   className={`${marker.className} text-3xl  font-bold text-center mt-48` }>About Us</div>
          <div   className={`${marker.className} text-2xl  font-bold text-center ` }>Your Trusted Car Garage in Cavan, Ireland</div>
          <p className={`text-xl text-center mx-10 md:mx-24 mt-5`}>
           {cfg_site.aboutUs}
          </p>


</div>
      <video
  preload="auto"
 
  autoPlay
  muted
  loop
  className="brightness-5"
>
  <source src="/video/fixtunemotors.mp4" type="video/mp4" />
</video>
    <div className=" bg-black opacity-90 z-20">



    </div>

</div>
  


<ParallaxBanner style={{ aspectRatio: '2 / 1' }} className=" flex bg-cover h-screen " >
  <ParallaxBannerLayer image="/engine.jpg" speed={-30} />
  <ParallaxBannerLayer className=" h-screen bg-black bg-opacity-50">
      <div className={"flex bg-cover text-white mt-10"}>
        <div >
        
          <div   className={`${marker.className} text-3xl  font-bold text-center mt-24` }>About Us</div>
          <div   className={`${marker.className} text-2xl  font-bold text-center ` }>Your Trusted Car Garage in Cavan, Ireland</div>
          <p className={`text-xl text-center mx-10 md:mx-24 mt-5`}>
           {cfg_site.aboutUs}
          </p>
        </div>
      </div>
      </ParallaxBannerLayer>
</ParallaxBanner>
      <Divider/>
         
       <div className="justify-between h-full text-center mb-10 ">


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
<Divider/>
     <ParallaxBanner style={{ aspectRatio: '2 / 1' }} className=" flex bg-cover h-auto " >
  <ParallaxBannerLayer image="/intro.jpg" speed={-30} />
  <ParallaxBannerLayer className="  bg-black bg-opacity-50">
        <div className={"flex  text-white"}>
        <div className="" >
        
          <div   className={`${marker.className} text-3xl  font-bold text-center mt-24 mx-10 md:mx-24 grid  flex justify-items-center` }>
<p>Rating</p>
         <div className={`text-xl ${lora.className}`}>Maintaining a high business rating requires exceptional service, prompt communication, and addressing feedback effectively. Build trust through transparency, personalized service, and professionalism. Monitor reviews, respond courteously, and thank customers for support. Foster a positive workplace culture and adapt to evolving needs to ensure consistent quality and customer satisfaction.</div>
         {isDataFetched && <img
                    src={`rating/${Math.ceil( data.rating)}.png`}
                    style={{ width: "200px", height: "40px" }}
                    className="my-4"
                  />
         }
                </div>

          
        
          <p className={`text-xl text-center mx-10 md:mx-24 mt-5`}>
          
          
          </p>
        </div>
      </div>
      </ParallaxBannerLayer>
      </ParallaxBanner>
<Divider/>
        <div className=" mx-10 md:mx-24 my-12  ">
          <div   className={`${marker.className} text-4xl  font-bold text-center mt-10  ` }>Mission</div>
         
          <p className={`text-xl text-center m-5 `}>
           {cfg_site.mission}
          </p>
        </div>
       
     
      <Divider/>
      <div className="grid grid-cols-1  mb-10 ">
      <div   className={`${marker.className} text-4xl  font-bold text-center mt-10  ` }>Team</div>
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
                className={`font-bold text-center text-md ${marker.className} `}
              >
                {member.postition}
              </p>
            </span>
            <div className="mx-10 text-xl text-center">{member.description}</div>
          </div>
        ))}
      </div>
    
  
    
    </DefaultLayout>
  );
}
