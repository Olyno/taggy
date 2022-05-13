/*
  Warnings:

  - You are about to drop the `OfficeHour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageGroup" DROP CONSTRAINT "MessageGroup_office_hour_id_fkey";

-- DropTable
DROP TABLE "OfficeHour";

-- CreateTable
CREATE TABLE "Event" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "location" STRING NOT NULL,
    "created_by" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MessageGroup" ADD CONSTRAINT "MessageGroup_office_hour_id_fkey" FOREIGN KEY ("office_hour_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
