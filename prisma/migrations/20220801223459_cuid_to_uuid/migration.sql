-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PREMIUM');

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "id_discord_message" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "processed_at" TIMESTAMP(3),
    "bookmarked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageGroup" (
    "id" TEXT NOT NULL,
    "id_event" TEXT,
    "name" VARCHAR(50) NOT NULL,
    "emoji" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "id_dashboard" TEXT,
    "name" VARCHAR(50) NOT NULL,
    "location" TEXT NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "id_member" TEXT NOT NULL,
    "id_dashboard" TEXT,
    "has_notification" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" TEXT NOT NULL,
    "id_guild" TEXT NOT NULL,
    "id_members" TEXT[],
    "guild_name" VARCHAR(50) NOT NULL,
    "guild_image_url" TEXT NOT NULL,
    "plan" "Plan" NOT NULL DEFAULT E'FREE',

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MessageToMessageGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_discord_message_key" ON "Message"("id_discord_message");

-- CreateIndex
CREATE UNIQUE INDEX "Message_url_key" ON "Message"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_id_guild_key" ON "Dashboard"("id_guild");

-- CreateIndex
CREATE UNIQUE INDEX "_MessageToMessageGroup_AB_unique" ON "_MessageToMessageGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_MessageToMessageGroup_B_index" ON "_MessageToMessageGroup"("B");

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
