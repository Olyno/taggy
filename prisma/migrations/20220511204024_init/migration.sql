-- CreateTable
CREATE TABLE "Message" (
    "id" STRING NOT NULL,
    "id_message" INT4 NOT NULL,
    "content" STRING NOT NULL,
    "author" STRING NOT NULL,
    "processed_at" TIMESTAMP(3),
    "bookmarked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_group_id" STRING NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageGroup" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "office_hour_id" STRING,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeHour" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "location" STRING NOT NULL,
    "created_by" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfficeHour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_message_key" ON "Message"("id_message");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_message_group_id_fkey" FOREIGN KEY ("message_group_id") REFERENCES "MessageGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageGroup" ADD CONSTRAINT "MessageGroup_office_hour_id_fkey" FOREIGN KEY ("office_hour_id") REFERENCES "OfficeHour"("id") ON DELETE SET NULL ON UPDATE CASCADE;
