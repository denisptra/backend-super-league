/*
  Warnings:

  - You are about to drop the column `draw` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `form` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `ga` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `gd` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `gf` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `loss` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `played` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `win` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "draw",
DROP COLUMN "form",
DROP COLUMN "ga",
DROP COLUMN "gd",
DROP COLUMN "gf",
DROP COLUMN "loss",
DROP COLUMN "played",
DROP COLUMN "points",
DROP COLUMN "win";

-- CreateTable
CREATE TABLE "Standing" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "played" INTEGER NOT NULL DEFAULT 0,
    "win" INTEGER NOT NULL DEFAULT 0,
    "draw" INTEGER NOT NULL DEFAULT 0,
    "loss" INTEGER NOT NULL DEFAULT 0,
    "gf" INTEGER NOT NULL DEFAULT 0,
    "ga" INTEGER NOT NULL DEFAULT 0,
    "gd" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "form" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Standing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Standing_teamId_key" ON "Standing"("teamId");

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
