import { Injectable } from "@nestjs/common";
import { ResponseService } from "../common/helpers/response.service";
import { LoggerHelper } from "../common/helpers/logging";
import { PostsModel } from "../common/model/posts.model";
import { GetPostDTO, PostsCreate, PostsId, PostsUpdate } from "./dto/posts.dto";

@Injectable()
export class PostsService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly logger: LoggerHelper,
        private readonly postsModel: PostsModel
    ) {}

    async getPosts(queryParams: GetPostDTO) {
        try {
            const posts = await this.postsModel.getPosts(queryParams.user_id);

            console.log(posts.Items);
            return this.responseService.success(
                "Query executed successfully!",
                {
                    response: [posts.Items],
                }
            );
        } catch (err) {
            console.error(err);
            return this.responseService.error(err, []);
        }
    }

    async createPost(bodyParams: PostsCreate, file, user) {
        try {
            await this.postsModel.createPost(bodyParams, file, user);
            return this.responseService.success(
                "Posts registered successfully",
                {
                    response: [],
                }
            );
        } catch (err) {
            console.error(err);
            return this.responseService.error(err, []);
        }
    }

    async updatePost(bodyParams: PostsUpdate, file) {
        try {
            const product = await this.postsModel.updatePosts(bodyParams, file);

            return this.responseService.success("Post updated successfully!", {
                response: [{ product }],
            });
        } catch (err) {
            console.error(err);
            return this.responseService.error(err, []);
        }
    }

    async deletePost(queryParams: PostsId) {
        try {
            const product = await this.postsModel.deletePost(queryParams);

            return this.responseService.success("Posts deleted successfully", {
                response: [{ product }],
            });
        } catch (err) {
            console.error(err);
            return this.responseService.error(err, []);
        }
    }
}
