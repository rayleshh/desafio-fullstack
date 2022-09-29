/*
  Warnings:

  - You are about to drop the column `classRoomId` on the `ClassSchedule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timeStart" DATETIME NOT NULL,
    "timeEnd" DATETIME NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "ClassSchedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassSchedule" ("courseId", "id", "timeEnd", "timeStart") SELECT "courseId", "id", "timeEnd", "timeStart" FROM "ClassSchedule";
DROP TABLE "ClassSchedule";
ALTER TABLE "new_ClassSchedule" RENAME TO "ClassSchedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
