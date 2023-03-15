import { Controller, Get, Headers } from "@nestjs/common";
import { ProductsService } from "./products.service";


@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get("/refresh-token")
    async refreshTokenHandler(@Headers("user") user) {
        return 0;
    }
}
