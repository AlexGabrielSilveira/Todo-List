import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()

    @ApiProperty({
        description: 'The email address of the user',
    })
    email: string;

    @ApiProperty({
        description: 'The password of the user',
    })
    @IsNotEmpty()
    password: string;
}