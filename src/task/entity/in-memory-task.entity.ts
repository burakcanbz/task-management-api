import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class InMemoryTask {
    @IsDefined({ message: "Title is required" })
    @IsString({ message: "Title must be a string" })
    @IsNotEmpty({ message: "Title is required" })
    @MaxLength(100, { message: "Title must be at most 100 characters long" })
    title: string;

    @IsDefined({ message: "Completed is required" })
    @IsBoolean({ message: "Completed must be a boolean" })
    @IsNotEmpty({ message: "Completed is required" })
    completed: boolean;

    @IsDefined({ message: "CreatedAt is required" })
    @IsDate({ message: "CreatedAt must be a date" })
    @IsNotEmpty({ message: "CreatedAt is required" })
    @Type(() => Date)
    createdAt: Date;

    constructor(title: string, completed: boolean) {
        this.title = title;
        this.completed = completed;
        this.createdAt = new Date();
    }

}   