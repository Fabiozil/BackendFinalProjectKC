import { Injectable } from "@nestjs/common";
import { ResponseService } from "../common/helpers/response.service";
import { LoggerHelper } from "../common/helpers/logging";
import { ProductsModel } from "../common/model/pruducts.model";


@Injectable()
export class ProductsService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly logger: LoggerHelper,
        private readonly productsModel: ProductsModel
    ) {}

    async createProduct(bodyParams) {
        console.log("🚀 ~ file: products.service.ts:16 ~ ProductsService ~ createProduct ~ bodyParams:", bodyParams)
        try {

            await this.productsModel.createProduct(bodyParams)

            return this.responseService.success( "Product registered successfully", {
                response: [],
            });
            
        } catch (err) {
            console.log("🚀 ~ file: products.service.ts:21 ~ ProductsService ~ createProduct ~ err:", err)
            return this.responseService.error(err, []);
        }
        
        
    }

    async productFindId(bodyParams){
        try {
            const product = await this.productsModel.findProducts(bodyParams)

            return this.responseService.success( "Product find successfully", {
                response: [{product}],
            });
    
        } catch (err) {
            console.log("🚀 ~ file: products.service.ts:21 ~ ProductsService ~ createProduct ~ err:", err)
            return this.responseService.error(err, []);
        }
    }

    async updateProducts(bodyParams){
        try {
            const product = await this.productsModel.updateProducts(bodyParams)

            return this.responseService.success( "Product find successfully", {
                response: [{product}],
            });
    
        } catch (err) {
            console.log("🚀 ~ file: products.service.ts:21 ~ ProductsService ~ createProduct ~ err:", err)
            return this.responseService.error(err, []);
        }
    }

    async deletedProducts(bodyParams){
        try {
            const product = await this.productsModel.deletedProducts(bodyParams)

            return this.responseService.success( "Product find successfully", {
                response: [{product}],
            });
    
        } catch (err) {
            console.log("🚀 ~ file: products.service.ts:21 ~ ProductsService ~ createProduct ~ err:", err)
            return this.responseService.error(err, []);
        }

    }

    
}