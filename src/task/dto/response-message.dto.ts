import { ResponseTaskDto } from "./response-task.dto";

export interface ResponseMessageDto<T = any> {
    success: boolean;
    error: boolean;
    statusCode: number;
    message: string;
    data: T | T[];
}