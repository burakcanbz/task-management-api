import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Task {

    @Prop({ required: true, trim: true, maxLength: 100 })
    title: string;

    @Prop({ required: true, default: false })
    completed: boolean;

    @Prop({ required: true, default: Date.now() })
    createdAt: Date;

}

export const TaskSchema = SchemaFactory.createForClass(Task);  // convert task class to model.