import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post("register")
    createUser(@Body() CreateUserDto: CreateUserDto) {
        return this.userService.createUser(CreateUserDto);
    }
}