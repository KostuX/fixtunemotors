import React, { useState, useEffect } from "react";
import { cfg_site } from "../config/cfg_site";
import { Facebook, TickTok } from "./icons";
import { SocialIcon } from "react-social-icons";
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
          {isHydrated && (
            <Image
              src={`${
                theme === "dark"
                  ? "/logo/logo_white.png"
                  : "/logo/logo_black.png"
              }`}
              width={120}
              height={120}
              alt="Company Logo"
            />
          )}
        </span>
        <span>
          <ul className=" justify-center flex hidden sm:flex">
            <li className="mx-1 sm:mx-5 ">
              <SocialIcon
                network="facebook"
                url={cfg_site.facebook_link}
                style={{ width: 30, height: 30 }}
              />
            </li>
            <li className="mx-1 sm:mx-5">
              <SocialIcon
                network="tiktok"
                url={cfg_site.tiktok_link}
                style={{ width: 30, height: 30 }}
              />
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
