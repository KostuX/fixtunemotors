import { cfg_site } from "../../config/cfg_site";
import { Parallax } from "react-scroll-parallax";
export default function Mission({ siteData, fonts }) {
  return (
    <div className=" mx-10 md:mx-24 my-12 flex justify-center  ">
      <div className="max-w-6xl">
        <Parallax speed={1}>
          <div
            className={`${fonts.marker.className} text-4xl  font-bold text-center mt-10  `}
          >
            Mission
          </div>
        </Parallax>
        <Parallax speed={-1}>
          <p className={`text-xl text-center m-5 `}>{cfg_site.mission}</p>
        </Parallax>
      </div>
    </div>
  );
}
