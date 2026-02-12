import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entity/task.entity";
import { ITaskRepository } from "src/task/interfaces/task.interface";
import { Model } from "mongoose";
import { HydratedDocument } from "mongoose";
import { ResponseTaskDto } from "src/task/dto/response-task.dto";



@Injectable()
export class TaskService {

    // Defining constructor parameters as private means that we are using dependency injection and also defining a property as private so we can use it with this keyword.
    constructor(private readonly taskRepository: ITaskRepository, @InjectModel(Task.name) private readonly taskModel: Model<HydratedDocument<Task>>) { }

    async createTask(task: CreateTaskDto): Promise<{ success: boolean, message: string }> {
        const taskExist = await this.taskModel.findOne({ title: task.title });
        if (taskExist) {
            return {
                success: false,
                message: "Task already exists"
            };
        }
        // mapping dto to entity
        const newTask = new this.taskModel({
            title: task.title,
            completed: task.completed,
        });
        await this.taskRepository.create(newTask);
        return {
            success: true,
            message: "Task created successfully",
        };
    }

    async getAllTasks(): Promise<{ success: boolean, message: string, data: ResponseTaskDto[] }> {
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
            message: "Tasks fetched successfully",
            data: responseTasks
        };
    }

}