import { ResponseTaskDto } from "./response-task.dto";

export class ResponseMessageDto {
    success: boolean;
    error: boolean;
    statusCode: number;
    message: string;
    data: ResponseTaskDto | ResponseTaskDto[];
}