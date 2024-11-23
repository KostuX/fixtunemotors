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

import NextLink from "next/link";

export const Navbar_contact = () => {
  const router = useRouter();

  return (
    <>
      {/** Logo | top left */}
      <NextUINavbar
        maxWidth="xl "
        height ="	2rem"
      
     
        className="border-b border-black dark:border-white "
      >
        <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
           
            <NextLink
              className="flex justify-start items-center hidden sm:flex "
              href="/"
            >
            {cfg.phone.map((phone)=>(
              <>{phone}</>
            ))}
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/** Links | center | large */}
        <NavbarContent className="hidden sm:flex" justify="center">
        {cfg.email.map((email)=>(
              <>{email}</>
            ))}
        </NavbarContent>

        {/** Links | end | large */}
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            {cfg.address}{", "}
            {cfg.postCode}
          </NavbarItem>
        </NavbarContent>

        {/** Menu | end | large */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
          <NavbarMenu justify="end">
            {cfg.navMenuItems.map((e, index) => (
              <NavbarMenuItem key={`${e}-${index}`}>
                <NextLink
                  className="w-full hover:underline"
                  href={e.href}
                  size="lg"
                >
                  {e.label}
                </NextLink>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </NavbarContent>
      </NextUINavbar>
    </>
  );
};
