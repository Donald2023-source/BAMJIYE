import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { Toast } from "@heroui/react";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const creato_display = localFont({
  src: [
    {
      path: "../public/fonts/creato-display/CreatoDisplay-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/creato-display/CreatoDisplay-Light.otf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/fonts/creato-display/CreatoDisplay-Medium.otf",
      style: "medium",
      weight: "500",
    },
    {
      path: "../public/fonts/creato-display/CreatoDisplay-Bold.otf",
      style: "bold",
      weight: "700",
    },
    {
      path: "../public/fonts/creato-display/CreatoDisplay-ExtraBold.otf",
      style: "extrabold",
      weight: "800",
    },
  ],
});
export const metadata: Metadata = {
  title: {
    default: "BAMJIYE",
    template: `%s - ${`BAMJIYE`}`,
  },
  description: "Your best transport companion",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={cn("font-sans", figtree.variable)}>
      <head />
      <body className={`${creato_display.className} antialiased`}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <Toast.Provider placement="top end" />
          <body>
            {children}

            <NextTopLoader
              color="#002b5c"
              initialPosition={0.08}
              crawlSpeed={200}
              height={4}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #002b5c,0 0 5px #002b5c"
            />
          </body>
        </Providers>
      </body>
    </html>
  );
}
