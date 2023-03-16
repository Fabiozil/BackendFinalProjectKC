import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";


@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post("/create-product")
    async createProductHandler(@Body() bodyParams) {
        console.log("🚀 ~ file: products.controller.ts:11 ~ ProductsController ~ createProductHandler ~ bodyParams:", bodyParams)
        
        return await this.productsService.createProduct(bodyParams);
    }
}
