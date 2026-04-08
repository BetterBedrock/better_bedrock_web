-- CreateEnum
CREATE TYPE "BannerVariant" AS ENUM ('neutral', 'blue', 'special');

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "banner" BOOLEAN NOT NULL DEFAULT false,
    "bannerText" TEXT NOT NULL DEFAULT '',
    "bannerExpirationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bannerVariant" "BannerVariant" NOT NULL DEFAULT 'neutral',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
