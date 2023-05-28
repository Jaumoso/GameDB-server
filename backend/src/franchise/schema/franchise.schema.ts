import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type FranchiseDocument = Franchise & Document;

@Schema()
export class Franchise {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;
}
export const FranchiseSchema = SchemaFactory.createForClass(Franchise);