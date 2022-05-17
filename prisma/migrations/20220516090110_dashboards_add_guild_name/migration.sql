/*
  Warnings:

  - Added the required column `guild_name` to the `Dashboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "guild_name" STRING NOT NULL;
