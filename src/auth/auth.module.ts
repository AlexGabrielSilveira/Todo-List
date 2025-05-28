import { forwardRef, Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [forwardRef(() => UserModule), JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION } 
    })], 
    controllers: [AuthController],
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService
        },
        AuthService
    ],
    exports: [HashingService, JwtModule]
})
export class AuthModule {}