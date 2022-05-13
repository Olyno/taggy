/*
  Warnings:

  - You are about to drop the column `office_hour_id` on the `MessageGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageGroup" DROP CONSTRAINT "MessageGroup_office_hour_id_fkey";

-- AlterTable
ALTER TABLE "MessageGroup" DROP COLUMN "office_hour_id";
ALTER TABLE "MessageGroup" ADD COLUMN     "event_id" STRING;

-- AddForeignKey
ALTER TABLE "MessageGroup" ADD CONSTRAINT "MessageGroup_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
