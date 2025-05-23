import { Body, Controller, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/task.dto";

@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post("create")
    async createTask(@Body() createTaskDto:  CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }
}