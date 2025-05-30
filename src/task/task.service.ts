import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTaskDto } from "./dto/task.dto";

@Injectable()
export class TaskService {
    constructor (private readonly prismaService: PrismaService){}

    async createTask(CreateTaskDto: CreateTaskDto, userId: number) {
        return this.prismaService.task.create({
            data: {
                title: CreateTaskDto.title,
                description: CreateTaskDto.description,
                status: CreateTaskDto.status,
                user: {
                    connect: {
                        id: userId
                    }
                       
                }
                
            }
        })
    }
    async getMyTasks(userId: number) {
        return this.prismaService.task.findMany({
            where: {
                userId: userId, 
            },
            orderBy: {
                id: 'desc', 
            }
        });
    
    }
    async updateTask(taskId: number, updateData: Partial<CreateTaskDto>, userId: number) {
        const task = await this.prismaService.task.findUnique({
            where: { id: taskId }
        })
        
        if(task?.userId !== userId) throw new UnauthorizedException("You are not authorized to modify this task");

        return this.prismaService.task.update({
            where: { id: taskId },
            data: updateData,
        });
    }
    async deleteTask(deleteTaskId: number, userId: number) {
        const task = await this.prismaService.task.findUnique({
            where: { id: deleteTaskId }
        })
        if(task?.userId !== userId) throw new UnauthorizedException("You are not authorized to delete this task");
        
        return this.prismaService.task.delete({
            where: {
                id: deleteTaskId
            }
        })
    }
}   