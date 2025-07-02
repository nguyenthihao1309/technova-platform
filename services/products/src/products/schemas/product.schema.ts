import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // auto add createdAt & updatedAt
export class Product extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: 0 })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
