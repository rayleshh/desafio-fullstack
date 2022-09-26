import { IsNumber, IsNotEmpty, IsString } from "class-validator"

export class Schedule {
    @IsNumber()
    @IsNotEmpty()
    scheduleId: number
    @IsString()
    @IsNotEmpty()
    timeStart: string
    @IsString()
    @IsNotEmpty()
    timeEnd: string
    @IsNumber()
    @IsNotEmpty()
    classRoomId: number
}
