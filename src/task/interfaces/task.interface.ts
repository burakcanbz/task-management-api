import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { Task } from "src/task/entity/task.entity";

export abstract class ITaskRepository {

    abstract create(task: CreateTaskDto): Promise<Task | null>;
    abstract getAllTasks(): Promise<Task[]>;
    abstract findOne(title: string): Promise<Task | null>;
}