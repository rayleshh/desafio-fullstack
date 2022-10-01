import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Schedule } from './course-schedule-dto';

export class UpdateCourseDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    courseName?: string

    @IsOptional()
    @IsInt({each: true})
    @IsArray()
    teacherIdList?: number[]

    @IsOptional()
    @IsInt({each: true})
    @IsArray()
    teacherIdRemoveList?: number[]

    @IsObject()
    @ValidateNested()
    @IsOptional()
    @Type(() => Schedule)
    schedule?: Schedule
}