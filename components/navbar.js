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
  const { resolvedTheme } = useTheme(); 
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
            <NextLink
              className="flex justify-start items-center hidden sm:flex "
              href="/"
            >
              {isHydrated && (
                <Image
                  src={`${
                    resolvedTheme === "dark"
                      ? "/logo/logo_white.png"
                      : "/logo/logo_black.png"
                  }`}
                  width={120}
                  height={120}
                  alt="Company Logo"
                />
              )}
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        {/* ...rest of the code */}
      </NextUINavbar>
    </>
  );
};
