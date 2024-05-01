import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskCreation {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    userId: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    priority: number;
}