import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument, ProductSchema } from './product.schema';
import {Model, Aggregate, Schema as MongooseSchema, }from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  

  constructor(
    @InjectModel(Product.name) private productModel:Model<ProductDocument>){

  }

  //add products
 async create(createProductDto: CreateProductDto) :Promise<Product> {
   
   const model = new this.productModel();
  

  //  const res = await this.productModel.aggregate([
  //   { $unwind: "$reviews" },
  //   { $group: { _id: "$_id", avgRating: { $avg: "$reviews.rating" } } },
  //   {$merge:"products"}
  // ])
    
    model.product_name = createProductDto.product_name;
    model.brand = createProductDto.brand;
    model.brand_img = createProductDto.brand_img;
    model.product_img = createProductDto.product_img;
    model.price = createProductDto.price;
    model.desc = createProductDto.desc;
    model.category = createProductDto.category;
    model.sub_category = createProductDto.sub_category;
    model.reviews = createProductDto.reviews;
    model.ratings =createProductDto.ratings
    model.available = createProductDto.available;
    return model.save();
  }

 

 


  findAll() :Promise<Product[]>{
    return this.productModel.find().exec();
  }






  // Pagination
  // async getProducts(page:number, perpage:number):Promise<Product[]> {
  //   const skip = (page - 1)*perpage;
  //   return this.productModel.find({ skip, take:perpage}).exec()
  // }

  async getTotalProducts():Promise<number>{
    return this.productModel.countDocuments()
  }

  async getPaginatedData(page:number, limit:number){
    const offset = (page-1)*limit
    const data = await this.productModel.find().skip(offset).limit(limit)
    return data
  }


  


  findOne(id: string) {
    return this.productModel.findById(id);
  }

  //  async findAverageRating(id){
  //   const res = await this.productModel.aggregate([
  //     { $unwind: "$reviews" },
  //     { $group: { _id: "$_id", avgRating: { $avg: "$reviews.rating" } } }
  //   ]).exec()
  //  return res
  // }
  
  
  
  // async findAverageRating(id:string){
    
  //     const results = await this.productModel.aggregate([
  //       { $unwind: "$reviews" },
  //       { $group: { _id:"$_id",avg_rating:{ $avg: '$reviews.rating' } } },
  //     ]);
  //     for (const result of results) { 
  //       await this.productModel.findByIdAndUpdate(
  //         id,
  //         { $set: { ratings: result.avgRating } },
  //         { new: true },
  //         );
  //         return results
        
  //     }
  // }

  // findAvgRating 2
  findAverageRating(id:string){
   return this.productModel.findOneAndUpdate({_id:id},
    [{$set:{ratings:{$avg:'$reviews.rating'}}}])
  }



  


  // find By Name
  // findByName(Product_name:string){
  //   return this.productModel.find({product_name:{$regex:Product_name, $options:"i"}}).exec()
  // }

  async findByName(Product_name:string, param){
    const offset = (param.page-1)*param.limit
    const data = await this.productModel.find({product_name:{$regex:Product_name, $options:"i"}}).skip(offset).limit(param.limit)
    return data
  }

  async countFindByName (Product_name:string,param){
    const count = await this.productModel.find({product_name:{$regex:Product_name, $options:"i"}}).count()
    return count
  }
  // findByName(params){
  //   return this.productModel.find(params)
  // }


  // filter by Gender
  // findByGender(sub_category:string){
  //   return this.productModel.find({sub_category:sub_category})
  // }

  async findByGender(param){
    const offset = (param.page-1)*param.limit
    const data = await this.productModel.find({sub_category:param.sub_category}).skip(offset).limit(param.limit)
    // const count = this.productModel.find({sub_category:param.sub_category}).count()
    return data
  }

  async countGenders(param){
    const count = await this.productModel.find({sub_category:param.sub_category}).count()
    return count
  }

  //filter by brand, category
  findByQuery(query){
    return this.productModel.find(query).exec()
  }

  // async findByQuery(query){
  //   const offset = (query.page-1)*query.limit
  //   const data =  await this.productModel.find(query).skip(offset).limit(query.limit).exec()
  //   return data
  // }

  async findbyCategory(param){
    const offset = (param.page-1)*param.limit
    const data  =await this.productModel.find({category:param.category}).skip(offset).limit(param.limit)
    return data
  }
  async countCategorys(param){
    const count = await this.productModel.find({category:param.category}).count()
    return count
  }


   //filter by price
  //  findByPrice(query){
  //   return this.productModel.find().where('price').gte(query.minPrice).lte(query.maxPrice).exec()
  //  }

    findByPrice(query){
    const offset = (query.page-1)*query.limit
    return this.productModel.find().where('price').gte(query.minPrice).lte(query.maxPrice).skip(offset).limit(query.limit)
   }

   async countFindByPrice(query){
    const count = await this.productModel.find().where('price').gte(query.minPrice).lte(query.maxPrice).count()
    return count
   }

   //filter by Rating
  //  findByRatings(query){
  //   return this.productModel.find().where('ratings').gte(query.minRating).lte(query.maxRating).exec()
  //  }

  findByRatings(query){
    const offset = (query.page-1)*query.limit
    return this.productModel.find().where('ratings').gte(query.minRating).lte(query.maxRating).skip(offset).limit(query.limit)
   }

   async countFindByRating(query){
    const count = await this.productModel.find().where('ratings').gte(query.minRating).lte(query.maxRating).count()
    return count
   }

   //find by Brand
  //  findByBrand(brand){
  //   return this.productModel.find({brand:brand})
  //  }

    findByBrand(query){
      const offset = (query.page-1)*query.limit
    return this.productModel.find({brand:query.brand}).skip(offset).limit(query.limit)
   }

   async CountFindByBrand(query){
    const count = await this.productModel.find({brand:query.brand}).count()
    return count
   }


  //update product or add reviews in array
   update(id: string, updateProductDto: UpdateProductDto){

    return this.productModel.updateOne({_id:id},
      {
        product_name:updateProductDto.product_name,
        product_img:updateProductDto.product_img,
        brand:updateProductDto.brand,
        price:updateProductDto.price,
        desc:updateProductDto.desc,
        category:updateProductDto.category,
        sub_category:updateProductDto.sub_category,
        $push:{reviews:updateProductDto.reviews},
        available:updateProductDto.available,
        ratings:updateProductDto.ratings
      })
  }


  //update reviews
  async updateReviews(pid:string, updateProductDto: UpdateProductDto){
    return this.productModel.updateOne({_id:pid},{
      $push:{reviews:updateProductDto.reviews}
    }).then(()=>{
      return this.productModel.updateOne({_id:pid},
        [{$set:{ratings:{$avg:'$reviews.rating'}}}])
    })
  }

  

  // async findAverage(): Promise<Product[]> {
  //   return this.productModel.aggregate([
  //     {
  //       $group: {
  //         _id: "$item",
  //         first_round_av: { $avg: "$first_round" },
  //         second_round_av: { $avg: "$second_round" },
  //         third_round_av: { $avg: "$third_round" },
  //       },
  //     },
  //   ]);
  // }

  // async findAverage(): Promise<Product[]> {
  //   return this.productModel.aggregate([
  //     {
  //      $addFields:{
  //       rating:{
  //         $avg:{
  //           $map:{
  //             input:"$rating"
  //           }
  //         }
  //       }
  //      }
  //     },
  //   ]);
  // }

  
  // async updateRatings() {
  //   // First, you need to aggregate the reviews by product and calculate the average rating
  //   const results = await this.productModel.aggregate([
  //     { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
  //   ]);

  //   // Then, you need to iterate over the results and update the corresponding product ratings
  //   for (const result of results) {
  //     await this.productModel.findByIdAndUpdate(
  //       result._id,
  //       { $push: { ratings: result.avgRating } },
  //       { new: true },
  //     );
  //   }
  // }

  


  

  remove(id: string) {
    return this.productModel.deleteOne({_id:id});
  }
  

}