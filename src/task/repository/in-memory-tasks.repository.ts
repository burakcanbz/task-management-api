import { ITaskRepository } from "../interfaces/task.interface";
import { CreateTaskDto } from "../dto/create-task.dto";
import { InMemoryTask } from "../entity/in-memory-task.entity";

export class InMemoryTaskRepository implements ITaskRepository {
    private tasks: InMemoryTask[] = [];

    async create(task: CreateTaskDto): Promise<InMemoryTask | null> {
        const newTask = new InMemoryTask(task.title, task.completed);
        this.tasks.push(newTask);
        return newTask;
    }

    async getAllTasks(): Promise<InMemoryTask[]> {
        return this.tasks;
    }
    async findOne(title: string): Promise<InMemoryTask | null> {
        return this.tasks.find(task => task.title === title) || null;
    }
}