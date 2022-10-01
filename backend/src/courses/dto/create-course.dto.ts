import { IsArray, IsDateString, IsInt, IsOptional, IsString } from "class-validator"

export class CreateCourseDto {
    @IsString()
    courseName: string

    @IsInt({ each: true })
    @IsArray()
    @IsOptional()
    teacherIdList?: number[]

    @IsInt({ each: true })
    @IsArray()
    @IsOptional()
    classRoomIdList?: number[]

    @IsDateString()
    @IsOptional()
    timeStart?: string

    @IsDateString()
    @IsOptional()
    timeEnd?: string
}
