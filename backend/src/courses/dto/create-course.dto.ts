import { IsDateString, IsNumber, IsString } from "class-validator"

export class CreateCourseDto {
    @IsString()
    courseName: string

    @IsNumber()
    teacherId: number

    @IsNumber()
    classRoomId: number

    @IsDateString()
    timeStart: string

    @IsDateString()
    timeEnd: string
}
