import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";


@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post("/create-posts")
    async createPostsHandler(@Body() bodyParams) {
        return await this.postsService.createPosts(bodyParams);
    }

    @Get("/find-id")
    async findPosts(@Query("id") bodyParams){
    console.log("🚀 ~ file: posts.controller.ts:18 ~ PostsController ~ findPosts ~ bodyParams:", bodyParams)
    return await this.postsService.productFindId(bodyParams)
    }

    @Put("/update-posts")
    async updatePosts(@Body() bodyParams){
    console.log("🚀 ~ file: posts.controller.ts:18 ~ PostsController ~ findPosts ~ bodyParams:", bodyParams)

    return await this.postsService.updatePosts(bodyParams)
    }

    @Delete("/deleted-posts")
    async deletedPosts(@Query("id") bodyParams){

    return await this.postsService.deletedPosts(bodyParams)
    }
    
}
