// src/task/dto/create-task.dto.ts
import { Status } from '@prisma/client';
import { IsEnum, IsString, Length } from 'class-validator';

export class CreateTaskDto {

    @IsString()
    @Length(5, 100)
    title: string;

    @IsString()
    @Length(20, 150)
    description: string;

    @IsEnum(Status)
    status: Status;
}