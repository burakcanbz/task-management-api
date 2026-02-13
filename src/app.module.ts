import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.development') });
const isDbDefined = process.env.MONGO_URI && process.env.MONGO_URI.includes('mongodb');

// provides database connection
@Module({
    imports: [
        ...(isDbDefined ? [MongooseModule.forRoot(process.env.MONGO_URI!)] : []),
        TaskModule,
    ],
})
export class AppModule { }
