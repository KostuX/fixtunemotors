import { cfg_site } from "../../config/cfg_site"
export default function Mission({siteData, fonts}){
    return( <div className=" mx-10 md:mx-24 my-12  ">
        <div className={`${fonts.marker.className} text-4xl  font-bold text-center mt-10  `}>Mission</div>
        <p className={`text-xl text-center m-5 `}>
          {cfg_site.mission}
        </p>
      </div>)
}