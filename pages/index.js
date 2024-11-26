import { Button } from "@nextui-org/react";
import { cfg_services } from "../config/cfg_services";
import { cfg_site } from "../config/cfg_site";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import { Divider } from "@nextui-org/divider";
import { useState, useEffect } from "react";


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
          
   
      <div className="justify-between h-full   ">
    
       
        <div className={"flex h-screen bg-[url('/intro.jpg')] bg-cover"}>
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
        </div>
      </div>
   
      {/** END of intro */}
      <Divider />
      {/** Services */}
      <div className="m-10 md:m-48 text-xl justify-between ">
        <div>
          {" "}
          <p className="font-bold text-center">{cfg_site.slogan[1]}</p>
          <p className={`text-sm text-center m-5 `}>
            Repairing your car on time ensures safety, prevents costly
            breakdowns, and enhances performance. Timely maintenance extends the
            vehicle's lifespan, improves fuel efficiency, and reduces
            environmental impact. Neglecting repairs can compromise safety
            features and lead to expensive damages. Stay proactive to ensure
            reliability, save money, and maintain your car’s value.
          </p>
        </div>
      </div>

      {/** end of up  start of func */}
      <Divider className="" />
      <div
        className={`${marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
      >
        <p className="mt-24 ">Services</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  ">
        {cfg_services.services.map((service, i) => (
          <div key={i} className="  md:mx-5 mt-10">
            <span
              className={`grid grid-cols-1  content-center  md:my-5 ${lora.className} `}
            >
              <div className=" flex justify-center items-center ">
                <img
                  className="w-2/3 rounded-xl"
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
            <div className="mx-10">{service.description_short}</div>
          </div>
        ))}
      </div>

      {/** END of Services */}
      <Divider className="mt-5  " />
      {isDataFetched && (
        <div>
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
      <Divider className="mt-5  " />
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
    </DefaultLayout>
  );
}
