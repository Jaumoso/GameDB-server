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

    @Prop({type: [{ 
        gameId: mongoose.Types.ObjectId, 
        rating: Number,
        platform: [{type: mongoose.Types.ObjectId, ref: 'Platform'}],
        own: Boolean,
        state: Number,
    }], 
    ref: 'Game'})
    library: { 
        gameId: mongoose.Types.ObjectId; 
        rating: Number;
        platform: mongoose.Types.ObjectId[];
        storefront: string;
        acquisitionDate: Date;
        acquisitionPrice: number;
        own: boolean;
        state: string;
    }[];
}
export const UserSchema = SchemaFactory.createForClass(User);