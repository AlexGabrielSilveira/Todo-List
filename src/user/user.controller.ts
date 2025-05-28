import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";

@UseGuards(AuthTokenGuard)
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post("create")
    createUser(@Body() CreateUserDto: CreateUserDto) {
        return this.userService.createUser(CreateUserDto);
    }

    @Get("all")
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":email")
    getUserByEmail(@Param("email") email: string) {
        return this.userService.getUserByEmail(email);
    }

}