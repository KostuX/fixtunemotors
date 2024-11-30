import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { cfg_site } from '../../config/cfg_site';
export default function Intro_about({siteData, fonts}){
    return(    <div className="h-max" >
        <ParallaxBanner style={{ aspectRatio: '2 / 1' }} className=" h-[74rem] md:h-screen"  >
          <ParallaxBannerLayer image="/in_car.jpg" speed={-20} />
          <ParallaxBannerLayer className="  bg-black bg-opacity-50  ">
            <div className={"flex bg-cover text-white mt-10 "}>
              <div >
                <div className={`${fonts.marker.className} text-3xl  font-bold text-center mt-24 `}>About Us</div>
                <div className={`${fonts.marker.className} text-2xl  font-bold text-center mx-2 `}>Your Trusted Car Garage in Cavan, Ireland</div>
                <p className={`text-xl text-center mx-10 md:mx-24 mt-5 `}>
                  {cfg_site.aboutUs}
                </p>
              </div>
            </div>
          </ParallaxBannerLayer>
        </ParallaxBanner>
      </div>)
}