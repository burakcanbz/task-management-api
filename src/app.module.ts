import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.development') });

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI as string ?? ""),
        TaskModule,
    ],
})
export class AppModule { }
