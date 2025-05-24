import { HashingService } from "./hashing.service";

export class BcryptService extends HashingService {
    async hashPassword(password: string): Promise<string> {
        //TO DO
        return 'a';
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        //TO DO
        return true;
    }
}