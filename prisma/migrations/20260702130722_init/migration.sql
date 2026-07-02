/*
  Warnings:

  - You are about to drop the column `image` on the `app_users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `app_users` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "app_users" DROP COLUMN "image",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "displayName",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "familyName" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "sessions";

-- CreateTable
CREATE TABLE "verification_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
