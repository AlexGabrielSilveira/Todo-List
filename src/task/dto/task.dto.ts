import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsString, Length } from 'class-validator';

export class CreateTaskDto {

    @IsString()
    @Length(5, 100)
    @ApiProperty({
        description: 'The title of the task',
        minLength: 5,
        maxLength: 100,
    })
    title: string;

    @IsString()
    @Length(20, 150)
    @ApiProperty({
        description: 'The description of the task',
        minLength: 20,
        maxLength: 150,
    })
    description: string;

    @IsEnum(Status)
    @ApiProperty({
        description: 'The status of the task',
        enum: Status,
    })
    status: Status;


}