import { Injectable } from "@nestjs/common";
import { ResponseService } from "../common/helpers/response.service";
import { LoggerHelper } from "../common/helpers/logging";
import { PostsModel } from "../common/model/posts.model";


@Injectable()
export class PostsService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly logger: LoggerHelper,
        private readonly postsModel: PostsModel
    ) {}

    async createPosts(bodyParams) {
        try {

            await this.postsModel.createPosts(bodyParams)

            return this.responseService.success( "Posts registered successfully", {
                response: [],
            });
            
        } catch (err) {
            console.log("🚀 ~ file: posts.service.ts:21 ~ PostsService ~ createPosts ~ err:", err)
            return this.responseService.error(err, []);
        }
        
        
    }

    async productFindId(bodyParams){
        try {
            const product = await this.postsModel.findPosts(bodyParams)

            return this.responseService.success( "Posts find successfully", {
                response: [{product}],
            });
    
        } catch (err) {
            console.log("🚀 ~ file: posts.service.ts:21 ~ PostsService ~ createPosts ~ err:", err)
            return this.responseService.error(err, []);
        }
    }

    async updatePosts(bodyParams){
        try {
            const product = await this.postsModel.updatePosts(bodyParams)

            return this.responseService.success( "Posts find successfully", {
                response: [{product}],
            });
    
        } catch (err) {
            console.log("🚀 ~ file: posts.service.ts:21 ~ PostsService ~ createPosts ~ err:", err)
            return this.responseService.error(err, []);
        }
    }

    async deletedPosts(bodyParams){
        try {
            const product = await this.postsModel.deletedPosts(bodyParams)

            return this.responseService.success( "Posts find successfully", {
                response: [{product}],
            });
    
        } catch (err) {
            console.log("🚀 ~ file: posts.service.ts:21 ~ PostsService ~ createPosts ~ err:", err)
            return this.responseService.error(err, []);
        }

    }

    
}