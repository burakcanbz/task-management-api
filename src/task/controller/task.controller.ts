import { Controller, Get, Post, Body } from "@nestjs/common";
import { TaskService } from "src/task/service/task.service";
import { CreateTaskDto } from "src/task/dto/create-task.dto";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {

    }

    @Get()
    getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }
}