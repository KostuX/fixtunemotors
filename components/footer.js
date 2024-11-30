import React, {useState,useEffect} from "react";
import { cfg_site } from "../config/cfg_site";
import { Facebook } from "./icons";
import Image from "next/image";
import { useTheme } from "next-themes";
export const Foot = () => {
  const { theme, setTheme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <footer className="border-t  bg-background w-full   p-4 text-sm text-gray-300  mt-10  ">
      <span className=" text-center grid grid-cols-3 gap-4  m-3 text-foreground/80">
        <span>
        {isHydrated &&
            <Image           
            src={ `${theme ===  "dark" ? "/logo/logo_white.png":"/logo/logo_black.png" }`}
            width={120}
            height={120}
            alt="Picture of the author"           
          />            
            }
      
        </span>
        <span>
          <ul className="flex justify-center ">
            <li>
              <a
                href={cfg_site.facebook_link}
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                <Facebook />
              </a>
            </li>
          </ul>
        </span>
        <span>
          © {cfg_site.year}
          <a href="#" className="hover:underline">
            {" "}
            {cfg_site.title}
          </a>
        </span>
      </span>
    </footer>
  );
};
