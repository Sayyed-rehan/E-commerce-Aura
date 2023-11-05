import { Schema as MongooseSchema, Aggregate } from 'mongoose';
import { Product } from '../product.schema';

export class CreateProductDto {

    
  product_name: string;
  brand: string;
  brand_img:string
  product_img: string;
  price: number;
  desc: string;
  category: string;
  sub_category: string;
  reviews:[{
     user_id:MongooseSchema.Types.ObjectId,
      review:string,
      rating:number
  }]
  ratings: number;
  available: string;
}
