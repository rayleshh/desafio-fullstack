import { IsNumber, IsNotEmpty, IsString, IsInt, IsOptional, IsArray } from "class-validator"

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
    @IsNotEmpty()
    @IsInt({ each: true })
    @IsArray()
    classRoomIdList: number[]
    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    classRoomIdRemoveList?: number[]
}
