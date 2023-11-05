import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema, Aggregate}from 'mongoose'


export type ProductDocument = Product & Document

@Schema({timestamps:true})
export class Product{

    @Prop()
    product_name:string;

    @Prop()
    brand:string;

    @Prop()
    brand_img:string

    @Prop()
    product_img:string;

    @Prop()
    price:number;

    @Prop()
    desc:string;

    @Prop()
    category:string;

    @Prop()
    sub_category:string;
    
    @Prop({type:MongooseSchema.Types.Array, ref:'User'})
    reviews:[{
        user_id:MongooseSchema.Types.ObjectId,
        review:string,
        rating:number
    }]
  
    @Prop()
    ratings:number;


    @Prop()
    available:string;
}


export const ProductSchema = SchemaFactory.createForClass(Product)