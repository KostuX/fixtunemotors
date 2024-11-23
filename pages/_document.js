import { Html, Head, Main, NextScript } from "next/document";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="h-screen bg-background text-foreground ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
