import { ResponseTaskDto } from "./response-task.dto";

export interface ResponseMessageDto {
    success: boolean;
    error: boolean;
    statusCode: number;
    message: string;
    data: ResponseTaskDto | ResponseTaskDto[];
}