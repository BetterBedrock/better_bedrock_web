import { Layout } from "@/_components/layout";
import { AuthProvider } from "@/_providers/auth";
import { CheckoutProvider } from "@/_providers/checkout";
import { NotificationProvider } from "@/_providers/notification";
import { UserProvider } from "@/_providers/user";
import "@/public/styles/global.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Better Bedrock",
};

const mojangles = localFont({
  src: [
    {
      path: "../../public/fonts/mojangles/Mojangles.ttf", // relative to project root
      style: "normal",
    },
  ],
});

const mojanglesBold = localFont({
  src: [
    {
      path: "../../public/fonts/mojangles/MojanglesBold.otf",
      style: "bold",
    },
  ],
});

const minecraft = localFont({
  src: [
    {
      path: "../../public/fonts/minecraft/MinecraftTen.ttf",
      style: "normal",
    },
  ],
});

const minecraftFive = localFont({
  src: [
    {
      path: "../../public/fonts/minecraft/MinecraftFive.ttf",
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
          <NotificationProvider>
            <CookiesProvider>
              <CheckoutProvider>
                <AuthProvider>
                  <UserProvider>
                    <Layout>
                      <main>{children}</main>
                    </Layout>
                  </UserProvider>
                </AuthProvider>
              </CheckoutProvider>
            </CookiesProvider>
          </NotificationProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
