import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostsCreate {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @IsDate()
    readonly createAt: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly sale: boolean;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    readonly photo: string;
}

export class PostsId {
    @IsNotEmpty()
    @IsString()
    readonly id: string;
}


export class PostsUpdate {
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @IsDate()
    readonly createdAt: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly sale: boolean;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    readonly photo: string;
}

