import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true})
export class Project{
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({required: true})
    ownerId: string;
}

export type  ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);