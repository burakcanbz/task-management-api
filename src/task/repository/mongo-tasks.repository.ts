import { ITaskRepository } from "src/task/interfaces/task.interface";
import { Task } from "src/task/entity/task.entity";
import { Injectable, Optional } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, HydratedDocument } from "mongoose";
import { CreateTaskDto } from "src/task/dto/create-task.dto";

@Injectable()
export class MongoTaskRepository implements ITaskRepository {
    constructor(
        @Optional()
        @InjectModel(Task.name) private readonly taskModel?: Model<HydratedDocument<Task>>
    ) { }

    async create(taskDto: CreateTaskDto): Promise<Task | null> {
        if (!this.taskModel) return null;

        const newTask = new this.taskModel({
            title: taskDto.title,
            completed: taskDto.completed,
        });

        return await newTask.save();
    }

    async getAllTasks(): Promise<Task[]> {
        if (!this.taskModel) return [];

        return await this.taskModel.find();
    }

    async findOne(title: string): Promise<Task | null> {
        if (!this.taskModel) return null;

        return await this.taskModel.findOne({ title });
    }
}