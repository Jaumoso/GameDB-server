import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

export type DlcDocument = Dlc & Document;

@Schema()
export class Dlc {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    released: Date;
}
export const DlcSchema = SchemaFactory.createForClass(Dlc);