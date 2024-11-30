import React, { useState, useEffect } from "react";
import { ThemeSwitch } from "../components/theme-switch";
import { cfg_site as cfg } from "../config/cfg_site";

import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,

} from "@nextui-org/navbar";
import { Divider, Link, NavbarMenuItem } from "@nextui-org/react";
import Image from "next/image";

import NextLink from "next/link";


export const Navbar = ({ siteData, fonts }) => {
  const { theme, setTheme } = useTheme();

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {/** Logo | top left */}
      <NextUINavbar maxWidth="xl " className=" ">
        <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">

            {isHydrated &&
              <Image
                src={`${theme === "dark" ? "/logo/logo_white.png" : "/logo/logo_black.png"}`}
                width={120}
                height={120}
                alt="Company Logo"
              />
            }


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

          <NavbarMenu >
            <div className="h-fit pb-10">
              <div className={`${fonts.marker.className} mt-10 text-center `}>
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
              <div className="grid grid-cols-1 md:grid-cols-3 text-center mt-10">
                <Divider />
                <p className={`${fonts.marker.className} mx-2 mt-12`} >Hours</p>
                <ul>
                  {siteData.opening_hours.weekday_text.map((hours, i) => (
                    <li key={i}>{hours}</li>
                  ))}
                </ul>

                <div>
                  <p className={`${fonts.marker.className} mx-2 mt-10`} >Phone</p>
                  <ul>
                    {siteData.phone.map((phone, i) => (
                      <NextLink key={i} href={`tel:${phone}`} >
                        {phone}
                      </NextLink>
                    ))}
                  </ul>
                </div>
                <div>
                  <NextLink href={siteData.googleMap} >
                    <p className={`${fonts.marker.className} mx-2 mt-10`} >Address</p>
                    {
                      siteData.address.map((address, i) => (
                        <p key={i}>{address.long_name}</p>
                      ))
                    }
                  </NextLink>
                </div>
              </div>
            </div>
          </NavbarMenu>



        </NavbarContent>
      </NextUINavbar>
    </>
  );
};
