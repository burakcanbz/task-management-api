import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
import { MongoTaskRepository } from './repository/mongo-tasks.repository';
import { ITaskRepository } from './interfaces/task.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entity/task.entity';
import { InMemoryTaskRepository } from './repository/in-memory-tasks.repository';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.development') });
const isDbDefined = process.env.MONGO_URI && process.env.MONGO_URI.includes('mongodb');

// provides which collection should be used
@Module({
  imports: [
    ...(isDbDefined
      ? [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])]
      : []),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    MongoTaskRepository,
    InMemoryTaskRepository,
    {
      provide: ITaskRepository,
      useFactory: (mongo: MongoTaskRepository, inMem: InMemoryTaskRepository) => {
        if (isDbDefined) {
          console.log('MongoDB connection established. MongoTaskRepository selected.');
          return mongo;
        } else {
          console.log('MongoDB connection failed. InMemoryTaskRepository selected.');
          return inMem;
        }
      },
      inject: [MongoTaskRepository, InMemoryTaskRepository],
    },
  ],
})
export class TaskModule { }