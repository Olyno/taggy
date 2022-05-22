/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "url" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Message_url_key" ON "Message"("url");
