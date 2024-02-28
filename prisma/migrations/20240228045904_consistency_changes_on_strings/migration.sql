/*
  Warnings:

  - Made the column `name` on table `Author` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Comunity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Comunity" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "image" SET NOT NULL;
