import { IsArray, IsDateString, IsNumber, IsString } from "class-validator"

export class CreateCourseDto {
    @IsString()
    courseName: string

    @IsNumber()
    @IsArray({ each: true })
    teacherIdList: number[]

    @IsNumber()
    @IsArray({ each: true })
    classRoomIdList: number[]

    @IsDateString()
    timeStart: string

    @IsDateString()
    timeEnd: string
}
