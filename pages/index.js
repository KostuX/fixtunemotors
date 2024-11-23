import { Button } from "@nextui-org/react";
import { cfg_services } from "../config/cfg_services";
import { cfg_site } from "../config/cfg_site";
import DefaultLayout from "../layouts/default";
import { Permanent_Marker } from "@next/font/google";

const roboto = Permanent_Marker({
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
              <div className={roboto.className}>
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
      <div className="mt-10">
        <div className={roboto.className}>
          {" "}
          <p className="text-xl justify-between h-full text-center  m-5 ">
            {cfg_site.slogan[1]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 ">
          {cfg_services.services.map((service) => (
            <div className="border mx-10" key={service}>
              {service.title}
              {service.description}
              {service.price}
            </div>
          ))}
        </div>
      </div>

      {/** END of Services */}

      <div className="flex">review</div>
    </DefaultLayout>
  );
}
