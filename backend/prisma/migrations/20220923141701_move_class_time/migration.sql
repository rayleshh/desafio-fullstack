/*
  Warnings:

  - You are about to drop the column `timeEnd` on the `ClassRoom` table. All the data in the column will be lost.
  - You are about to drop the column `timeStart` on the `ClassRoom` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ClassRoom" ("id", "name") SELECT "id", "name" FROM "ClassRoom";
DROP TABLE "ClassRoom";
ALTER TABLE "new_ClassRoom" RENAME TO "ClassRoom";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
