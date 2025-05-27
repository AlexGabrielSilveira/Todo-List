import { forwardRef, Global, Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [forwardRef(() => UserModule)], 
    controllers: [AuthController],
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService
        },
        AuthService
    ],
    exports: [HashingService]
})
export class AuthModule {}