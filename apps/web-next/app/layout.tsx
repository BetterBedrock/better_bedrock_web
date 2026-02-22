import { Layout } from "@/shared/ui/layout";
import { AuthProvider } from "./providers/auth";
import { CheckoutProvider } from "./providers/checkout";
import { NotificationProvider } from "./providers/notification";
import "@/public/styles/global.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: {
    default: "Better Bedrock - Minecraft Bedrock Mods, Texture Packs & More",
    template: "%s | Better Bedrock",
  },
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
