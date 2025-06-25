import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({ timestamps: true })
export class Goal{
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({default: false})
    completed: boolean;

    @Prop({type: Types.ObjectId, ref: 'Project', required: true})
    projectId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    createdBy: Types.ObjectId;
}
export type GoalDocument = Goal & Document;
export const GoalSchema = SchemaFactory.createForClass(Goal);
