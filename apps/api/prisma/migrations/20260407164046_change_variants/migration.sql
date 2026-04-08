/*
  Warnings:

  - The values [blue,special] on the enum `BannerVariant` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BannerVariant_new" AS ENUM ('info', 'neutral', 'important', 'error', 'success');
ALTER TABLE "public"."Settings" ALTER COLUMN "bannerVariant" DROP DEFAULT;
ALTER TABLE "Settings" ALTER COLUMN "bannerVariant" TYPE "BannerVariant_new" USING ("bannerVariant"::text::"BannerVariant_new");
ALTER TYPE "BannerVariant" RENAME TO "BannerVariant_old";
ALTER TYPE "BannerVariant_new" RENAME TO "BannerVariant";
DROP TYPE "public"."BannerVariant_old";
ALTER TABLE "Settings" ALTER COLUMN "bannerVariant" SET DEFAULT 'neutral';
COMMIT;
