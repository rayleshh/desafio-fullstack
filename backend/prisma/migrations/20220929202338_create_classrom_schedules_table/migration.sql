-- CreateTable
CREATE TABLE "ClassRooms_Schedules" (
    "classRoomId" INTEGER NOT NULL,
    "classScheduleId" INTEGER NOT NULL,

    PRIMARY KEY ("classRoomId", "classScheduleId"),
    CONSTRAINT "ClassRooms_Schedules_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "ClassRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ClassRooms_Schedules_classScheduleId_fkey" FOREIGN KEY ("classScheduleId") REFERENCES "ClassSchedule" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timeStart" DATETIME NOT NULL,
    "timeEnd" DATETIME NOT NULL,
    "classRoomId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "ClassSchedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassSchedule" ("classRoomId", "courseId", "id", "timeEnd", "timeStart") SELECT "classRoomId", "courseId", "id", "timeEnd", "timeStart" FROM "ClassSchedule";
DROP TABLE "ClassSchedule";
ALTER TABLE "new_ClassSchedule" RENAME TO "ClassSchedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
