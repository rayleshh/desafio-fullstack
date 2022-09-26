import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Schedule } from './course-schedule-dto';

export class UpdateCourseDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    courseName?: string

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    teacherId?: number

    @IsObject()
    @ValidateNested()
    @IsOptional()
    @Type(() => Schedule)
    schedule?: Schedule
}