import "../styles/globals.css";
import * as React from "react";
import { HeroUIProvider } from "@heroui/react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
export default function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider attribute="class">
    <HeroUIProvider>
      
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      
    </HeroUIProvider>
    </NextThemesProvider>
  );
}
