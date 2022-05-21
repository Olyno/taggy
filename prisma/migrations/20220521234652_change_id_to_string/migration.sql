/*
  Warnings:

  - Changed the type of `id_discord_message` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "id_discord_message";
ALTER TABLE "Message" ADD COLUMN     "id_discord_message" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_discord_message_key" ON "Message"("id_discord_message");
