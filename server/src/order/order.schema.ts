import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema, Aggregate}from 'mongoose'


export type OrderDocument = Order & Document

@Schema({timestamps:true})
export class Order{

    @Prop({type:MongooseSchema.Types.Array, ref:'Product'})
    product_details:[{
        product_id:MongooseSchema.Types.ObjectId
        product_name:string;
        qty:number;
        price:number
    }]

    @Prop({type:MongooseSchema.Types.ObjectId, ref:'User'})
    user_id:MongooseSchema.Types.ObjectId;
    

    @Prop()
    total_price:number;

    @Prop({type:Date.now})
    order_date:Date;


    @Prop()
    expected_delivery:string;
    // @Prop({type:Date})
    // expected_delivery:Date;

    @Prop({type:MongooseSchema.Types.Array, ref:"User"})
    ship_address:[{
        address:string,
        city:string,
        state:string,
        pincode:number
    }];

    @Prop()
    payment_method:string;

    @Prop({enum:["delivered", 'Pending', 'canceled'], default:"Pending"})
    delivery_status:string

}


export const OrderSchema = SchemaFactory.createForClass(Order) 