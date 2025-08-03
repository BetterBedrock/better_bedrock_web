/*
  Warnings:

  - A unique constraint covering the columns `[name,date,type]` on the table `Analytics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Analytics_name_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_name_date_type_key" ON "Analytics"("name", "date", "type");
