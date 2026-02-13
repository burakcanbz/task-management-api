import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entity/task.entity";
import { InMemoryTask } from "../entity/in-memory-task.entity";
import { ITaskRepository } from "src/task/interfaces/task.interface";
import { Model } from "mongoose";
import { HydratedDocument } from "mongoose";
import { ResponseMessageDto } from "src/task/dto/response-message.dto";


@Injectable()
export class TaskService {
    private inMemoryTasks: InMemoryTask[] = [];
    private dbAvailable = true;
    // Defining constructor parameters as private means that we are using dependency injection and also defining a property as private so we can use it with this keyword.
    constructor(private readonly taskRepository: ITaskRepository) {
    }

    async createTask(task: CreateTaskDto): Promise<ResponseMessageDto> {
        const taskExist = await this.taskRepository.findOne(task.title);
        if (taskExist) {
            throw new HttpException(`Task already exists ${this.taskRepository.constructor.name}`, HttpStatus.BAD_REQUEST);
        }
        // mapping dto to entity
        const createdTask = await this.taskRepository.create(task);
        if (!createdTask) {
            throw new InternalServerErrorException(`Task could not be created ${this.taskRepository.constructor.name}`);
        }
        const responseTask = {
            title: createdTask.title,
            completed: createdTask.completed,
            createdAt: createdTask.createdAt
        }
        return {
            success: true,
            error: false,
            statusCode: HttpStatus.CREATED,
            message: `Task created successfully ${this.taskRepository.constructor.name}`,
            data: responseTask
        };
    }

    async getAllTasks(): Promise<ResponseMessageDto> {
        const tasks = await this.taskRepository.getAllTasks();

        // mapping entity to ResponseDto to avoid unrelated _id and _v fields. 
        const responseTasks = tasks.map(task => {
            return {
                title: task.title,
                completed: task.completed,
                createdAt: task.createdAt
            }
        })
        return {
            success: true,
            error: false,
            statusCode: HttpStatus.OK,
            message: `Tasks fetched successfully ${this.taskRepository.constructor.name}`,
            data: responseTasks
        };
    }

}