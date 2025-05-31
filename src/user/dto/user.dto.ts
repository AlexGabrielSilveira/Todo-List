import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsStrongPassword, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty({
        description: 'The name of the user',
        maxLength: 30,
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'The email of the user',
    })
    email: string;

    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({
        description: 'The password of the user',
        minLength: 8,
    })
    password: string;
}