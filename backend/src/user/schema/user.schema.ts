import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    profilePic: string;

    @Prop()
    joined: Date;

    @Prop()
    lastSeen: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);