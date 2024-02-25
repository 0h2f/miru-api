-- CreateEnum
CREATE TYPE "MangaStatus" AS ENUM ('FINISHED', 'HIATUS', 'RELEASING', 'CANCELLED');

-- CreateTable
CREATE TABLE "Manga" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "status" "MangaStatus" NOT NULL DEFAULT 'RELEASING',
    "title" VARCHAR(255) NOT NULL,
    "imageCover" TEXT,
    "imageCoverBg" TEXT,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comunity" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "image" TEXT,

    CONSTRAINT "Comunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComunityMember" (
    "memberId" INTEGER NOT NULL,
    "comunityId" INTEGER NOT NULL,

    CONSTRAINT "ComunityMember_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "ComunityRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ComunityRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Comunity_name_key" ON "Comunity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberRoles_AB_unique" ON "_MemberRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberRoles_B_index" ON "_MemberRoles"("B");

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComunityMember" ADD CONSTRAINT "ComunityMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComunityMember" ADD CONSTRAINT "ComunityMember_comunityId_fkey" FOREIGN KEY ("comunityId") REFERENCES "Comunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberRoles" ADD CONSTRAINT "_MemberRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "ComunityMember"("memberId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberRoles" ADD CONSTRAINT "_MemberRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "ComunityRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
