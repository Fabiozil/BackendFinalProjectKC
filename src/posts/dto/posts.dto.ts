import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";

export class PostsCreate {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly forSale: boolean;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsString()
    readonly token: string;
}

export class GetPostDTO {
    @IsOptional()
    readonly user_id: string;

    @IsOptional()
    @IsString()
    readonly token: string;
}

export class PostsId {
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsOptional()
    @IsString()
    readonly token: string;
}

export class PostsUpdate {
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly sale: boolean;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsString()
    readonly token: string;
}
