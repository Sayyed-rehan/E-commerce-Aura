import { Schema as MongooseSchema, Aggregate } from 'mongoose';

export class CreateOrderDto {

    product_details:[{
        product_id:MongooseSchema.Types.ObjectId
        product_name:string;
        qty:number;
        price:number
    }]

    user_id:MongooseSchema.Types.ObjectId;

    total_price:number;

    order_date:Date;

    expected_delivery:string;

    ship_address:[{
        address:string,
        city:string,
        state:string,
        pincode:number
    }];

    payment_method:string;
    delivery_status:string

}
