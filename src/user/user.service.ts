import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}
    
    async createUser(data: CreateUserDto) {
        return this.prismaService.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: data.password,
            },
        }); 
    }
    async getAllUsers() {
        return this.prismaService.user.findMany();
    }
    
}