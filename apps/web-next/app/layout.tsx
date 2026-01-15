import { Layout } from "@/shared/ui/layout";
import { AuthProvider } from "@/shared/model/auth";
import { CheckoutProvider } from "@/shared/model/checkout";
import { NotificationProvider } from "@/shared/model/notification";
import "@/public/styles/global.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: {
    default:
      "Minecraft PE Texture Packs, Scripts, Maps, Skins & More | Better Bedrock",
    template: "%s | Better Bedrock",
  },
  description:
    "Discover the best Minecraft PE texture packs, scripts, maps, skins, and more on Better Bedrock. Enhance your gaming experience with high-quality mods and resources.",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "Better Bedrock",
    locale: "en_US",
    url: "https://betterbedrock.com/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
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
