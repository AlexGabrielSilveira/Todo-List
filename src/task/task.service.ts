import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/task.dto";

@Injectable()
export class TaskService {
    constructor (private readonly prismaService: PrismaService){}

    async createTask(data: CreateTaskDto) {
        return this.prismaService.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status
            }
        })
    }
    async getAllTasks() {
        return this.prismaService.task.findMany({
            orderBy: {
               id: 'desc'
            }
        })
    }
    async getTaskById(id: number) {
        return this.prismaService.task.findUnique({
            where: {
                id 
            }
       })
    }
}