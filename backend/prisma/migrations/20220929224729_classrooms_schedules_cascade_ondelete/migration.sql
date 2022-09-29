-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassRooms_Schedules" (
    "classRoomId" INTEGER NOT NULL,
    "classScheduleId" INTEGER NOT NULL,

    PRIMARY KEY ("classRoomId", "classScheduleId"),
    CONSTRAINT "ClassRooms_Schedules_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "ClassRoom" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClassRooms_Schedules_classScheduleId_fkey" FOREIGN KEY ("classScheduleId") REFERENCES "ClassSchedule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassRooms_Schedules" ("classRoomId", "classScheduleId") SELECT "classRoomId", "classScheduleId" FROM "ClassRooms_Schedules";
DROP TABLE "ClassRooms_Schedules";
ALTER TABLE "new_ClassRooms_Schedules" RENAME TO "ClassRooms_Schedules";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
