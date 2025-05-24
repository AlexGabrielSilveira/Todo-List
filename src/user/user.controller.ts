import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post("create")
    createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body);
    }

    @Get("all")
    getAllUsers() {
        return this.userService.getAllUsers();
    }

}