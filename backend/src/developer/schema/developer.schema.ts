import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type DeveloperDocument = Developer & Document;

@Schema()
export class Developer {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    image: string;
}
export const DeveloperSchema = SchemaFactory.createForClass(Developer);