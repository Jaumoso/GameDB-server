import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type GenreDocument = Genre & Document;

@Schema()
export class Genre {

    @Prop()
    title: string;

    @Prop()
    description: string;
}
export const GenreSchema = SchemaFactory.createForClass(Genre);