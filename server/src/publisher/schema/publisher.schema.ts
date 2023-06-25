import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type PublisherDocument = Publisher & Document;

@Schema()
export class Publisher {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    image: string;
}
export const PublisherSchema = SchemaFactory.createForClass(Publisher);