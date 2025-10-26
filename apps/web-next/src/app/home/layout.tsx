import "@/public/styles/global.scss";

import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Better Bedrock",
};

const mojangles = localFont({
  src: [
    {
      path: "../../../public/fonts/mojangles/Mojangles.ttf", // relative to project root
      style: "normal",
    },
  ],
});

const mojanglesBold = localFont({
  src: [
    {
      path: "../../../public/fonts/mojangles/MojanglesBold.otf",
      style: "bold",
    },
  ],
});

const minecraft = localFont({
  src: [
    {
      path: "../../../public/fonts/minecraft/MinecraftTen.ttf",
      style: "normal",
    },
  ],
});

const minecraftFive = localFont({
  src: [
    {
      path: "../../../public/fonts/minecraft/MinecraftFive.ttf",
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
        <main>{children}</main>
      </body>
    </html>
  );
}
