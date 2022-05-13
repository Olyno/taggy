/*
  Warnings:

  - Added the required column `emoji` to the `MessageGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MessageGroup" ADD COLUMN     "emoji" STRING NOT NULL;
