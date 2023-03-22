import {
    Body,
    Controller,
    createParamDecorator,
    Delete,
    Get,
    Headers,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetPostDTO, PostsCreate, PostsId, PostsUpdate } from "./dto/posts.dto";
import { PostsService } from "./posts.service";

const User = createParamDecorator((data, req) => {
    return req.args[0].user;
});

@Controller("post")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    @Get("/")
    async getPosts(@Query() queryParams: GetPostDTO) {
        return await this.postsService.getPosts(queryParams);
    }

    @Post("/")
    @UseInterceptors(FileInterceptor("photo"))
    async createPostsHandler(
        @Body() bodyParams,
        @UploadedFile() file,
        @User() user
    ) {
        return await this.postsService.createPost(bodyParams, file, user);
    }

    @Put("/")
    @UseInterceptors(FileInterceptor("photo"))
    async updatePosts(@Body() bodyParams, @UploadedFile() file) {
        return await this.postsService.updatePost(bodyParams, file);
    }

    @Delete("/")
    async deletedPosts(@Query() queryParams: PostsId) {
        console.log(queryParams);
        return await this.postsService.deletePost(queryParams);
    }
}
