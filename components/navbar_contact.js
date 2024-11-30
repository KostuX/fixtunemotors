import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";

import NextLink from "next/link";
import Link from "next/link";

export const Navbar_contact = ({siteData}) => {
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
            <NextLink
              className="flex justify-start items-center flex "
              href={`tel:${siteData.phone[0]}`}
            >
              {siteData.phone[0]}
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/** Links | center | large */}
        <NavbarContent className="flex" justify="center"></NavbarContent>

        {/** Links | end | large */}
        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className=" gap-2 ">
            <Link target="_blank" href={siteData.googleMap}>
              <span className=" hidden sm:flex">
                {" "}
                {siteData.address[0].long_name}
                {", "}
                {siteData.address[1].long_name}
                {", "}
                {siteData.address[3].long_name}
              </span>
              <span className=" sm:hidden">{siteData.address[3].long_name}</span>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NextUINavbar>
    </>
  );
};
