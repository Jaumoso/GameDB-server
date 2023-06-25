import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type PlatformDocument = Platform & Document;

@Schema()
export class Platform {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;
}
export const PlatformSchema = SchemaFactory.createForClass(Platform);