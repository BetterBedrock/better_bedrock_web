import { Layout } from "@/shared/ui/layout";
import { AuthProvider } from "./providers/auth";
import { CheckoutProvider } from "./providers/checkout";
import { NotificationProvider } from "./providers/notification";
import "@/public/styles/global.scss";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { SettingsProvider } from "@/app/providers/settings";
import { fetchSettings } from "@/shared/api/setting";
import Script from "next/script";
import { fetchLocalSession } from "@/shared/lib/local-session";
import { SessionProvider } from "@/app/providers/session";

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
      weight: "bold",
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
      weight: "bold",
    },
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await fetchSettings();
  const localSession = await fetchLocalSession();

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZT0YW8EKMG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ZT0YW8EKMG');
  `}
        </Script>
      </head>
      <body
        className={`relative ${mojangles.className} ${mojanglesBold.className} ${minecraft.className} ${minecraftFive.className}`}
      >
        <NotificationProvider>
          <SessionProvider localSession={localSession}>
            <SettingsProvider defaultSettings={data}>
              <CheckoutProvider>
                <AuthProvider>
                  <Layout>
                    <main>{children}</main>
                  </Layout>
                </AuthProvider>
              </CheckoutProvider>
            </SettingsProvider>
          </SessionProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
