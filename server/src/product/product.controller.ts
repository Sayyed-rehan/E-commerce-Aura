import {  Controller, Get, Post, Body, Patch, Param, Delete ,Query, UseGuards, UseInterceptors} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductSchema } from './product.schema';
import { query } from 'express';
import { doc } from 'prettier';
import {AuthGuard}from "@nestjs/passport"
import { PaginationDto } from './dto/Pagination.dto';
// import { pid } from 'process';
import { PaginationInterceptor } from 'src/ass';
import { request } from 'http';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  // @UseGuards(AuthGuard())
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  //pagination
  

  // Pafgination
  // @Get("/findPagination")
  // async getProducts(@Query('page') page:number, @Query('perpage') perpage:number){
  //   const products = await this.productService.getProducts(page,perpage);
  //   const totlalProducts = await this.productService.getTotalProducts();
  //   return {products, totlalProducts}
  // }

  // @Get("/findPagination")
  // async getProducts(@Query('page') page:number, @Query('perpage') perpage:number){
  //   const products = await this.productService.getProducts(page,perpage);
  //   const totlalProducts = await this.productService.getTotalProducts();
  //   return {products, totlalProducts}
  // }

  //paginaton
  @Get("/page")
  async getData(@Query() paginationDto:PaginationDto){
    const {page,limit} = paginationDto
    const data = await this.productService.getPaginatedData(page,limit)
    const totlalProducts = await this.productService.getTotalProducts();
    return data
  }




  @Get('/findById/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get("/avg/:id")
  findAverageRating(@Param('id')  id:string){
    return this.productService.findAverageRating(id)
  }

  //search by product name
  // @Get('/findByName/:product_name/')
  // findByName(@Param('product_name') product_name:string){
  //   return this.productService.findByName(product_name)
  // }

  @Get('/findByName/:page/:limit')
  async findByName(@Query("product_name") product_name:string, @Param() param:{page:number, limit:number}, paginationDto:PaginationDto){
    const data = await this.productService.findByName(product_name,{...param})
    const count = await this.productService.countFindByName(product_name,{...param})
    return {count:count, data:data}
  }



  // @Get('/findByName/:Product_name/:brand')
  // findByName(@Param() params:string){
  //   console.log(params);
    
  //   return this.productService.findByName(params)
  // }

  // filter by Gender
  // @Get("/findByGender/:sub_category")
  // findByGender(@Param('sub_category') sub_category:string){
  //   return this.productService.findByGender(sub_category)
  // }

  @Get("/findByGender/:sub_category/:page/:limit")
  async findByGender(@Param()  param:{sub_category:string, page:number, limit:number}, paginationDto:PaginationDto){
    const data = await this.productService.findByGender({...param})
    const count = await this.productService.countGenders({...param})
    return {count:count, data:data}
  }

  
  @Get('/findByQuery')
  findByQuery(@Query() query:{gender:string, category:string, price:number}){
      return this.productService.findByQuery({...query})
  }

  // @Get('/findByQuery')
  // async findByQuery(@Query() query:{gender:string, category:string, price:number, page:number, limit:number}, paginationDto:PaginationDto){
  //     const data = await this.productService.findByQuery({...query})
  //     return data
  // }

  @Get("/findbyCategory/:category/:page/:limit")
  async findbyCategory(@Param () param:{category:string, page:number, limit:number}, paginationDto:PaginationDto){
    const data = await this.productService.findbyCategory({...param})
    const count = await this.productService.countCategorys({...param})
    return {count:count, data:data}
  }


  //filter by price
  // @Get('/findByPrice')
  // findByPrice(@Query() query:{ minPrice:number, maxPrice:number}){
  //   return  this.productService.findByPrice({...query})
  // }

  @Get('/findByPrice')
  async findByPrice(@Query() query:{ minPrice:number, maxPrice:number, page:number, limit:number}){
    const data = await this.productService.findByPrice({...query})
    const count = await this.productService.countFindByPrice({...query})
    return {count:count, data:data}
    
  }

  //filter by ratings
  // @Get('/findByRatings')
  // findByRatings(@Query() query:{minRating:number, maxRating:number}){
  //   return this.productService.findByRatings({...query})
  // }

  @Get('/findByRatings')
  async findByRatings(@Query() query:{minRating:number, maxRating:number, page:number, limit:number}){
    const data = await this.productService.findByRatings({...query})
    const count = await this.productService.countFindByRating({...query}) 
    return {count:count, data:data}
  }

 


  // find by findByBrand
  // @Get("/findByBrand")
  // findByBrand(@Query('brand') brand:string){
  //   return this.productService.findByBrand(brand)
  // }

  @Get("/findByBrand")
  async findByBrand(@Query() query:{brand:string, page:number, limit:number}){
    const data = await this.productService.findByBrand({...query})
    const count = await this.productService.CountFindByBrand({...query})
    return {count:count, data:data}
  }
  
  @Patch(':id')
  update(@Param('id') id: string,  @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

   //update revviews
   @Patch('/updateReviews/:pid')
   updateReviews(@Param('pid') pid:string, @Body() updateProductDto: UpdateProductDto){
    return this.productService.updateReviews(pid, updateProductDto)
   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  // findOneAndUpdate(@doc){
  //   return this.productService.findOneAndUpdate(doc)
  // }
}