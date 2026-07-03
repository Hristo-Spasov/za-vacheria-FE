/*
  Warnings:

  - The `emailVerified` column on the `app_users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "app_users" DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN;
