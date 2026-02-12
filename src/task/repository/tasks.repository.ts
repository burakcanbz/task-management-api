import { ITaskRepository } from "src/task/interfaces/task.interface";
import { Task } from "src/task/entity/task.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HydratedDocument } from "mongoose";


@Injectable()
export class MongoTaskRepository implements ITaskRepository {

    constructor(@InjectModel(Task.name) private readonly taskModel: Model<HydratedDocument<Task>>) { }

    async create(task: HydratedDocument<Task>): Promise<Task> {
        return await this.taskModel.create(task);
    }
    async getAllTasks(): Promise<HydratedDocument<Task>[]> {
        return await this.taskModel.find();
    }

}