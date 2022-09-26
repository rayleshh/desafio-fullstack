-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timeStart" DATETIME NOT NULL,
    "timeEnd" DATETIME NOT NULL,
    "classRoomId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "ClassSchedule_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "ClassRoom" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "ClassSchedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassSchedule" ("classRoomId", "courseId", "id", "timeEnd", "timeStart") SELECT "classRoomId", "courseId", "id", "timeEnd", "timeStart" FROM "ClassSchedule";
DROP TABLE "ClassSchedule";
ALTER TABLE "new_ClassSchedule" RENAME TO "ClassSchedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
