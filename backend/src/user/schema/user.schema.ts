import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    username: string;

    @Prop()
    password: string;

/*     @Prop()
    profilePic: string; */

    @Prop()
    joined: Date;

    @Prop()
    lastSeen: Date;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]})
    library: mongoose.Schema.Types.ObjectId[];
}
export const UserSchema = SchemaFactory.createForClass(User);