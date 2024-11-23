import React from "react";
import { ThemeSwitch } from "../components/theme-switch";
import { cfg_site as cfg, cfg_site } from "../config/cfg_site";
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
import Link from "next/link";

export const Navbar_contact = () => {
  const router = useRouter();

  return (
    <>
      {/** Logo | top left */}
      <NextUINavbar
        maxWidth="xl "
        height="	2rem"
        className="border-b border-black dark:border-white "
      >
        <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            {cfg.phone.map((phone, i) => (
              <NextLink
                className="flex justify-start items-center flex "
                key={i}
                href={`tel:${phone}`}
              >
                {" "}
                {phone}
              </NextLink>
            ))}
          </NavbarBrand>
        </NavbarContent>

        {/** Links | center | large */}
        <NavbarContent className="flex" justify="center">
          {cfg.email.map((email) => (
            <>{email}</>
          ))}
        </NavbarContent>

        {/** Links | end | large */}
        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className=" gap-2">
            <Link target="_blank" href={cfg_site.googleMap}>
              {cfg.address}
              {", "}
              {cfg.postCode}
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NextUINavbar>
    </>
  );
};
