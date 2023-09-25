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
        gameId: Number, 
        rating: Number,
        platform: [String],
        storefront: [{type: mongoose.Types.ObjectId, ref: 'Storefront'}],
        acquisitionDate: Date,
        acquisitionPrice: Number,
        own: Boolean,
        format: String,
        state: String,
        time: Number,
        comment: String
    }]})
    library: { 
        gameId: number,
        rating: number,
        platform?: String[],
        storefront?: mongoose.Types.ObjectId[],
        acquisitionDate?: Date,
        acquisitionPrice?: number,
        own: boolean,
        format: string,
        state: string,
        time: Number,
        comment: String
    }[];
}
export const UserSchema = SchemaFactory.createForClass(User);