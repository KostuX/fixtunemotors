import { cfg_site } from "../../config/cfg_site";
import { Parallax } from "react-scroll-parallax";
export default function Team({ siteData, fonts }) {
  return (
    <div className="grid grid-cols-1  mb-10 ">
      <div
        className={`${fonts.marker.className} text-4xl  font-bold text-center mt-10  `}
      >
        Team
      </div>
      {cfg_site.team.map((member, i) => (
        <div key={i} className="flex justify-center  md:mx-5 mt-10">
          <div className="max-w-6xl">
            <Parallax speed={1}>
              <span className={`grid grid-cols-1  content-center  md:my-5  `}>
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
                  className={`font-bold text-center text-3xl ${fonts.marker.className}`}
                >
                  {member.name}
                </p>
                <p
                  className={`font-bold text-center text-md ${fonts.marker.className} `}
                >
                  {member.postition}
                </p>
              </span>
            </Parallax>
            <Parallax speed={-1}>
              <div className="mx-10 text-xl text-center">
                {member.description}
              </div>
            </Parallax>
          </div>
        </div>
      ))}
    </div>
  );
}
