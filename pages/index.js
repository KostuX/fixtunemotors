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
  return (
    <DefaultLayout>
      <div className="justify-between h-full  ">
        {/** intro */}
        <div className={"flex h-screen bg-[url('/intro.jpg')] bg-cover "}>
          <div className=" h-1/2 grid grid-cols-1 sm:grid-cols-3 mx-20 sm:mx-1 gap-4 content-center">
            <span></span>
            <span className="text-5xl sm:text-6xl font-bold font-mono text-white">
              <div className={roboto.className}>
                <p className="mt-48 ">From Tune-ups to Repairs</p>
                <p className="text-xl">We Keep You Moving</p>

                <Button>Call Us Now</Button>
              </div>
            </span>
            <span></span>
          </div>
        </div>
      </div>
      {/** END of intro */}
      {/** Services */}
      <div className="mt-10">
        <div>
          {" "}
          <p className="text-3xl justify-between h-full text-center font-bold m-48 ">
            "{cfg_site.slogan[1]}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cfg_services.services.map((service) => (
            <div className="border" key={service}>
              {service.title}
            </div>
          ))}
        </div>
      </div>

      {/** END of Services */}

      <div className="flex">review</div>
    </DefaultLayout>
  );
}
