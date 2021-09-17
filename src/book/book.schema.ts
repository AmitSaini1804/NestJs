import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true, index: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  authorname: string;

}

export const BookSchema = SchemaFactory.createForClass(Book);