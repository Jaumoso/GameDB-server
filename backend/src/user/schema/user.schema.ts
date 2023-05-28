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
        own: boolean;
        state: Number;
        // 0 Not played yet
        // 1 Playing
        // 2 Infinite
        // 3 Abandoned
        // 4 Played
        // 5 Completed
        // 6 Wishlist
    }[];
}
export const UserSchema = SchemaFactory.createForClass(User);