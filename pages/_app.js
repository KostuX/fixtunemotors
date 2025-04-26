import "../styles/globals.css";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
      <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
