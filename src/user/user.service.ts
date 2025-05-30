import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/user.dto";
import { HashingService } from "src/auth/hashing/hashing.service";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService, private readonly hashService: HashingService) {}
    
    async createUser(CreateUserDto: CreateUserDto) {
        const passwordHash = await this.hashService.hashPassword(CreateUserDto.password);

        return this.prismaService.user.create({
            
            data: {
                email: CreateUserDto.email,
                name: CreateUserDto.name,
                password: passwordHash,
            },
        }); 
    }
    async getUserByEmail(email: string) {
        return this.prismaService.user.findMany({
            where: {
                email: email,
            },
        });
    }
}