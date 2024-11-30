import { cfg_services } from "../../config/cfg_services"
import { Progress } from "@nextui-org/react";
export default function Services({ siteData, fonts }) {
    return (
        <div>
            <div
                className={`${fonts.marker.className} text-6xl md:text-6xl font-bold text-center mb-12`}
            >
                <p className="mt-24 ">Services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  " >
                {cfg_services.services.map((service, i) => (
                    <div key={i} className="  md:mx-5 mt-10"  >
                        <span
                            className={`grid grid-cols-1  content-center  md:my-5 ${fonts.lora.className} `}
                        >
                            <div className=" flex justify-center items-center relative  overflow-hidden">
                                <img
                                    className="w-2/3 rounded-xl transition-transform duration-500 transform hover:scale-125 peer hover:rounded-2xl"
                                    src={service.image}
                                    alt="image cannot be loaded"
                                ></img>
                            </div>
                            <p
                                className={`font-bold text-center text-3xl ${fonts.marker.className} mb-5`}
                            >
                                {service.title}
                            </p>
                        </span>
                        <div className="mx-10">{service.description}</div>
                        <div className={`m-5 font-bold text-center text-xl ${fonts.marker.className}`}>
                            <p>From:  {service.price}€ </p>

                        </div>
                        <div className="m-10">
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
                ))}
            </div>


        </div>)
}