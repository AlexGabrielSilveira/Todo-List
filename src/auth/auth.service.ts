import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/user/user.service";
import { HashingService } from "./hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly hashingService: HashingService, private readonly jwtService: JwtService) {}

    async login(loginDto: LoginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email);
        let passwordMatch = false;

        if(user) {
            passwordMatch = await this.hashingService.comparePassword(loginDto.password, user[0].password);
        }

        if (!user || !passwordMatch) {
            throw new  UnauthorizedException("User does not exist!");
        }

        const accessToken = this.jwtService.sign({ sub: user[0].id, email: user[0].email }, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRATION,
        });
        return {
            accessToken
        };
    }
}