import { Layout } from "@/shared/ui/layout";
import { AuthProvider } from "./providers/auth";
import { CheckoutProvider } from "./providers/checkout";
import { NotificationProvider } from "./providers/notification";
import "@/public/styles/global.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import localFont from "next/font/local";
import Script from "next/script";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17799390098";

export const metadata: Metadata = {
  title: "Better Bedrock - Minecraft Bedrock Mods, Texture Packs & More",
  description:
    "Better Bedrock is your ultimate hub for Minecraft Bedrock mods, texture packs, scripts, maps, and skins. Explore thousands of high-quality mods and enhancements for Bedrock Edition.",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "Better Bedrock",
    locale: "en_US",
    url: "https://betterbedrock.com/",
  },
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-icon.png",
  },
};

const mojangles = localFont({
  src: [
    {
      path: "../public/fonts/mojangles/Mojangles.ttf", // relative to project root
      style: "normal",
    },
  ],
});

const mojanglesBold = localFont({
  src: [
    {
      path: "../public/fonts/mojangles/MojanglesBold.otf",
      style: "bold",
    },
  ],
});

const minecraft = localFont({
  src: [
    {
      path: "../public/fonts/minecraft/MinecraftTen.ttf",
      style: "normal",
    },
  ],
});

const minecraftFive = localFont({
  src: [
    {
      path: "../public/fonts/minecraft/MinecraftFive.ttf",
      style: "bold",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ADS_ID}');
          `}
        </Script>
      </head>
      <body
        className={`relative ${mojangles.className} ${mojanglesBold.className} ${minecraft.className} ${minecraftFive.className}`}
      >
        <GoogleOAuthProvider clientId="268821429400-jlf4995gbmur5m3a3hg8qrpuu33dv0rs.apps.googleusercontent.com">
          <CookiesProvider>
            <NotificationProvider>
              <CheckoutProvider>
                <AuthProvider>
                  <Layout>
                    <main>{children}</main>
                  </Layout>
                </AuthProvider>
              </CheckoutProvider>
            </NotificationProvider>
          </CookiesProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
