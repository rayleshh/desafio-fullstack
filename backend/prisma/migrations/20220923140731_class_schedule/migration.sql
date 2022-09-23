/*
  Warnings:

  - Made the column `name` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `ClassRoom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "ClassSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timeStart" DATETIME NOT NULL,
    "timeEnd" DATETIME NOT NULL,
    "classRoomId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "ClassSchedule_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "ClassRoom" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "ClassSchedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Course" ("id", "name") SELECT "id", "name" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE TABLE "new_ClassRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "timeStart" DATETIME,
    "timeEnd" DATETIME
);
INSERT INTO "new_ClassRoom" ("id", "name", "timeEnd", "timeStart") SELECT "id", "name", "timeEnd", "timeStart" FROM "ClassRoom";
DROP TABLE "ClassRoom";
ALTER TABLE "new_ClassRoom" RENAME TO "ClassRoom";
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "course_id" INTEGER,
    CONSTRAINT "Teacher_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("course_id", "id", "name") SELECT "course_id", "id", "name" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_name_key" ON "Teacher"("name");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password") SELECT "email", "id", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
