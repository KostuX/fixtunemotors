import React from "react";
import NextHead from "next/head";
import { cfg_site } from "../config/cfg_site";

export const Head = () => {
  return (
    <NextHead>
      <title>{cfg_site.title}</title>
      <meta key="title" content={cfg_site.title} property="og:title" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
    </NextHead>
  );
};
