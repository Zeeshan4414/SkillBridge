import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({timestamps:true})
export class Notification{
    @Prop({required: true})
    message: string;

    @Prop({type:Types.ObjectId, ref: 'User', required: true})
    recipient: Types.ObjectId;

    @Prop({default: false})
    read: boolean;
}
export type NotificationDocument= Notification & Document;
export const NotificationSchema= SchemaFactory.createForClass(Notification);