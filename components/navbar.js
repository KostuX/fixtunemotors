import React from "react";
import { ThemeSwitch } from "../components/theme-switch";
import { cfg_site as cfg } from "../config/cfg_site";
import { Logo } from "../components/icons";
import { useRouter } from "next/router";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Image from "next/image";

import NextLink from "next/link";

export const Navbar = () => {
  const router = useRouter();

  return (
    <>
      {/** Logo | top left */}
      <NextUINavbar maxWidth="xl " className=" ">
        <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Image
              src="/favicon.ico"
              width={50}
              height={20}
              alt="Picture of the author"
            />

            <NextLink
              className="flex justify-start items-center hidden sm:flex "
              href="/"
            >
              {" "}
              {cfg.title}
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
            <div className="mt-10">
            {cfg.navMenuItems.map((e, index) => (
             
              <NavbarMenuItem key={`${e}-${index}` }>
                <NextLink
                  className="w-full hover:underline mt-48"
                  href={e.href}
                  size="lg"
                >
                
                  {e.label}
                </NextLink>
              </NavbarMenuItem>
         
            ))}
                 </div>
          </NavbarMenu>
          
        </NavbarContent>
      </NextUINavbar>
    </>
  );
};
