import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/task.dto";

@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post("create")
    async createTask(@Body() createTaskDto:  CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }
    @Get("all")
    async getAllTasks() {
        return this.taskService.getAllTasks();
    }
    @Get(":id")
    async getTaskById(@Param("id") id: number) {
        return this.taskService.getTaskById(parseInt(id.toString()));
    }
}