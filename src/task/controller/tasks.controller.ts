import { Controller, Get, Post, Body } from "@nestjs/common";
import { TaskService } from "src/task/service/tasks.service";
import { CreateTaskDto } from "src/task/dto/create-task.dto";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {

    }

    @Get()
    getAllTasks() {
        console.log("getting all tasks");
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        console.log(createTaskDto);
        console.log("creating task");
        return this.taskService.createTask(createTaskDto);
    }
}