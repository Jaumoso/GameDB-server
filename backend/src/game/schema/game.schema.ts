import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type GameDocument = Game & Document;

@Schema()
export class Game {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    released: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Developer'})
    developer: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Publisher'})
    publisher: mongoose.Schema.Types.ObjectId;

    @Prop({type: [{type: String}]})
    genre: string[];

    @Prop()
    franchise: string;

    @Prop({type: [{type: String}]})
    platform: string[];
}
export const GameSchema = SchemaFactory.createForClass(Game);