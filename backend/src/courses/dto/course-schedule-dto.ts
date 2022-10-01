import { IsNotEmpty, IsString, IsInt, IsOptional, IsArray } from "class-validator"

export class Schedule {
    @IsInt()
    @IsNotEmpty()
    scheduleId: number

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    timeStart?: string
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    timeEnd?: string

    @IsNotEmpty()
    @IsInt({ each: true })
    @IsArray()
    @IsOptional()
    classRoomIdList?: number[]

    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    classRoomIdRemoveList?: number[]
}
