import { Button } from "@nextui-org/react";
import { cfg_services } from "../config/cfg_services";
import { cfg_site } from "../config/cfg_site";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker, Lora, EB_Garamond } from "@next/font/google";

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
});
export default function Home() {
  function handleCallBtn() {
    window.location.href = `tel:${cfg_site.phone[0]}`;
  }

  function handleLocationButton() {
    window.open(cfg_site.googleMap, "_blank");
  }
  return (
    <DefaultLayout>
      <div className="justify-between h-full  ">
        {/** intro */}
        <div className={"flex h-screen bg-[url('/intro.jpg')] bg-cover "}>
          <div className=" h-1/2 grid grid-cols-1 sm:grid-cols-3 mx-20 sm:mx-1 gap-4 content-center">
            <span></span>
            <span className="text-6xl md:text-7xl font-bold font-mono text-white col-span-2">
              <div className={marker.className}>
                <p className="mt-48 ">From Tune-ups to Repairs</p>
                <p className="text-xl">We Keep You Moving ... fast!</p>

                <div className="grid grid-cols-1  content-right w-56">
                  <Button
                    size="sm"
                    className="mx-2 inline sm:hidden mt-5"
                    onClick={handleCallBtn}
                  >
                    Call Us
                  </Button>
                  <Button
                    size="sm"
                    className="mx-2 mt-5 w-56 "
                    onClick={handleLocationButton}
                  >
                    Find Us
                  </Button>
                </div>
              </div>
            </span>
            <span></span>
          </div>
        </div>
      </div>
      {/** END of intro */}
      {/** Services */}
      <div className="my-10 text-xl justify-between ">
        <div>
          {" "}
          <p className="font-bold text-center">{cfg_site.slogan[1]}</p>
          <p className={`text-sm text-center m-5 ${lora.className}`}>
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
      <div className="grid grid-cols-1 ">
        {cfg_services.services.map((service, index) => (
          <div className=" mt-5 ">
            <p className={`font-bold text-center text-3xl ${marker.className}`}>
              {service.title}
            </p>
            <div className={`grid grid-cols-2 mt-10 ${lora.className} `}>
              <span className="hidden sm:flex">
                <img
                  class="h-auto max-w-full rounded-lg"
                  src={service.image}
                  alt="image cannot be loaded"
                ></img>
              </span>
              <span className={`${lora} mx-5`}> {service.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/** END of Services */}

      <div className="flex">review</div>
    </DefaultLayout>
  );
}
