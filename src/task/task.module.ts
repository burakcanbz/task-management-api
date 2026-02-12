import { Module } from '@nestjs/common';
import { TaskController } from './controller/tasks.controller';
import { TaskService } from './service/tasks.service';
import { MongoTaskRepository } from './repository/tasks.repository';
import { ITaskRepository } from './interfaces/task.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entity/task.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskService,
    { provide: ITaskRepository, useClass: MongoTaskRepository }
  ],
})
export class TaskModule { }
