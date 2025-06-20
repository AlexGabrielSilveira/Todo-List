import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/task.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Status } from "@prisma/client";

@UseGuards(AuthTokenGuard)
@ApiBearerAuth('access-token')
@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post("/create")
    async createTask(@Body() createTaskDto:  CreateTaskDto, @Request() req: any) {
        const userId = req.user.sub;
        return this.taskService.createTask(createTaskDto, userId);
    }
    @Get("/my-tasks/")
    async getMyTasks(@Request() req: any) {
        const userId = req.user.sub;
        return this.taskService.getMyTasks(userId);
    }
    @Put("/edit/:id")
    async updateTask(@Param("id") id: number, @Body() updateTask: Partial<CreateTaskDto>, @Request() req: any) { 
        const userId = req.user.sub;
        return this.taskService.updateTask(id, updateTask, userId);
    }
    @Delete("/delete/:id")
    async deleteTask(@Param("id") deleteTaskId: number,  @Request() req: any) {
        const userId = req.user.sub;
        return this.taskService.deleteTask(deleteTaskId, userId);
    }
    @Get("search/:status")
    async searchTasks(@Param("status") status: Status, @Request() req: any) {
        const userId = req.user.sub;
        return this.taskService.searchTasks(status, userId);
    }
}