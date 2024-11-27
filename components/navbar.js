import React, {useState,useEffect} from "react";
import { ThemeSwitch } from "../components/theme-switch";
import { cfg_site as cfg } from "../config/cfg_site";
import { NextUILogo } from "../components/icons";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Permanent_Marker, Lora, EB_Garamond } from "next/font/google";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,

} from "@nextui-org/navbar";
import { Link, NavbarMenuItem } from "@nextui-org/react";
import Image from "next/image";

import NextLink from "next/link";

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
});
export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setDarkMode] = useState(false)
  const router = useRouter();
  

  return (
    <>
      {/** Logo | top left */}
      <NextUINavbar maxWidth="xl " className=" ">
        <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
           {  theme === "dark"?   <Image           
              src="/logo/logo_white.png"
              width={120}
              height={120}
              alt="Picture of the author"
            />:  <Image           
            src="/logo/logo_black.png" 
            width={120}
            height={120}
            alt="Picture of the author"
          /> }
      

            <NextLink
              className="flex justify-start items-center hidden sm:flex "
              href="/"
            >
              {" "}
            
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/** Links | center | large */}
        <NavbarContent className="hidden sm:flex" justify="center">
          {cfg.navItems.map((e) => (
            <NavbarItem key={e.label}>
              <NextLink
                className="flex justify-start items-center m-1 "
                href={e.href}
                key={e.label}
              >
                {e.label}
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/** Links | end | large */}
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        {/** Menu | end | large */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
          
          <NavbarMenu justify="end "> 
            <div className={`${marker.className} mt-10 text-center `}>
            {cfg.navMenuItems.map((item, index) => (
             
             <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color={"foreground"}
            href={item.href}
            size="lg"
            className=" group transition-all duration-300 ease-in-out mt-10 text-4xl"
          >
            <p className=" bg-left-bottom bg-gradient-to-r from-green-500 to-orange-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
       {item.label}
            </p>
          </Link>
        </NavbarMenuItem>
         
            ))}
                 </div>
          </NavbarMenu>
          
        </NavbarContent>
      </NextUINavbar>
    </>
  );
};
