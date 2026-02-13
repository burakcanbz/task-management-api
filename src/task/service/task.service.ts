import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { ITaskRepository } from "../interfaces/task.interface";
import { ResponseMessageDto } from "../dto/response-message.dto";


@Injectable()
export class TaskService {
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