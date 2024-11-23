import { cfg_services } from "../config/cfg_services";
import { cfg_site } from "../config/cfg_site";
import DefaultLayout from "../layouts/default";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="justify-between h-full text-center ">
        {/** intro */}
        <div className=" flex  h-screen bg-[url('/intro.jpg')] bg-cover ">
        <div className=" h-1/2 grid grid-cols-3 gap-4 content-center">
          <spna></spna>
          <spna className="text-3xl font-bold font-mono text-white">
            <p className="mt-48">{cfg_site.slogan[0]}</p>
           
            <p className="text-m mt-10">{cfg_site.phone}</p>
            <p className="text-m">{cfg_site.email}</p>
          </spna>
          <spna></spna>
        
        </div>
        
    
        </div>
        </div>
{/** END of intro */}
{/** Services */}
<div className="mt-10">
  <div> <p className="text-3xl ustify-between h-full text-center font-bold m-48 ">"{cfg_site.slogan[1]}"</p></div>


  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {cfg_services.services.map((service)=>(
      <div className="border" key={service}>{service.title}</div>
    ))}

</div>
</div>

{/** END of Services */}


      <div className="flex">review</div>
    </DefaultLayout>
  );
}
