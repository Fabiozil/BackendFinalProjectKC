import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";


@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post("/create-product")
    async createProductHandler(@Body() bodyParams) {
        
        return await this.productsService.createProduct(bodyParams);
    }

    @Get("/find-id")
    async findProduct(@Query("id") bodyParams){
    console.log("🚀 ~ file: products.controller.ts:18 ~ ProductsController ~ findProduct ~ bodyParams:", bodyParams)
 

    return await this.productsService.productFindId(bodyParams)
    }

    @Put("/update-products")
    async updateProducts(@Body() bodyParams){
    console.log("🚀 ~ file: products.controller.ts:18 ~ ProductsController ~ findProduct ~ bodyParams:", bodyParams)

    return await this.productsService.updateProducts(bodyParams)
    }

    @Delete("/deleted-products")
    async deletedProducts(@Query("id") bodyParams){

    return await this.productsService.deletedProducts(bodyParams)
    }
    
}
