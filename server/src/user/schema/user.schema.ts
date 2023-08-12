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
        platform: [{type: mongoose.Types.ObjectId, ref: 'Platform'}],
        storefront: [{type: mongoose.Types.ObjectId, ref: 'Storefront'}],
        acquisitionDate: Date,
        acquisitionPrice: Number,
        own: Boolean,
        state: String
    }]})
    library: { 
        gameId: Number,
        rating: Number;
        platform?: mongoose.Types.ObjectId[];
        storefront?: string[];
        acquisitionDate?: Date;
        acquisitionPrice?: Number;
        own: boolean;
        state: string;
    }[];
}
export const UserSchema = SchemaFactory.createForClass(User);