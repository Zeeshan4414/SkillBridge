import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



export type UserDocument = User & Document ;

export enum Role{
    User = 'user',
    Admin = 'admin',
}

@Schema ({timestamps: true})
export class User{
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({enum: Role, default: Role.User})
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);