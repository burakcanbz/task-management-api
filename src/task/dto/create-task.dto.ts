import { IsBoolean, IsString, IsNotEmpty, MaxLength } from "class-validator";


export class CreateTaskDto {

    @IsString({ message: "title must be a string" })
    @IsNotEmpty({ message: "title is required" })
    @MaxLength(100, { message: "Title must be at most 100 characters long" })
    title: string;

    @IsBoolean({ message: "completed must be a boolean" })
    @IsNotEmpty({ message: "completed is required" })
    completed: boolean;

}