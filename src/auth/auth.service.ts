import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/user/user.service";
import { HashingService } from "./hashing/hashing.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly hashingService: HashingService) {}

    async login(loginDto: LoginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email);
        let passwordMatch = false;

        if(user) {
            passwordMatch = await this.hashingService.comparePassword(loginDto.password, user[0].password);
        }

        if (!user || !passwordMatch) {
            throw new  UnauthorizedException("Invalid email or password");
        }

        // generate JWT token here
        return {
            message: "Login successful",
        };
    }
}