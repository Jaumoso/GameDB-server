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
        // 0 Not interested
        // 1 Want to play
        // 2 Playing
        // 3 Infinite
        // 4 Abandoned
        // 5 Played
        // 6 Completed
        // 7 Wishlist
    }[];
}
export const UserSchema = SchemaFactory.createForClass(User);