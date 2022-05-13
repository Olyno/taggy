/*
  Warnings:

  - You are about to drop the column `id_message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `message_group_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `MessageGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_discord_message]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_discord_message` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PREMIUM');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_message_group_id_fkey";

-- DropForeignKey
ALTER TABLE "MessageGroup" DROP CONSTRAINT "MessageGroup_event_id_fkey";

-- DropIndex
DROP INDEX "Message_id_message_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "id_dashboard" STRING;
ALTER TABLE "Event" ADD COLUMN     "is_private" BOOL NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "id_message";
ALTER TABLE "Message" DROP COLUMN "message_group_id";
ALTER TABLE "Message" ADD COLUMN     "id_discord_message" INT4 NOT NULL;

-- AlterTable
ALTER TABLE "MessageGroup" DROP COLUMN "event_id";
ALTER TABLE "MessageGroup" ADD COLUMN     "id_event" STRING;

-- CreateTable
CREATE TABLE "Notification" (
    "id" STRING NOT NULL,
    "id_member" STRING NOT NULL,
    "id_dashboard" STRING,
    "has_notification" BOOL NOT NULL DEFAULT true,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" STRING NOT NULL,
    "id_guild" STRING NOT NULL,
    "id_members" STRING[],
    "plan" "Plan" NOT NULL DEFAULT E'FREE',

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MessageToMessageGroup" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_id_guild_key" ON "Dashboard"("id_guild");

-- CreateIndex
CREATE UNIQUE INDEX "_MessageToMessageGroup_AB_unique" ON "_MessageToMessageGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_MessageToMessageGroup_B_index" ON "_MessageToMessageGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_discord_message_key" ON "Message"("id_discord_message");

-- AddForeignKey
ALTER TABLE "MessageGroup" ADD CONSTRAINT "MessageGroup_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_id_dashboard_fkey" FOREIGN KEY ("id_dashboard") REFERENCES "Dashboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_id_dashboard_fkey" FOREIGN KEY ("id_dashboard") REFERENCES "Dashboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessageToMessageGroup" ADD CONSTRAINT "_MessageToMessageGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessageToMessageGroup" ADD CONSTRAINT "_MessageToMessageGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "MessageGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
