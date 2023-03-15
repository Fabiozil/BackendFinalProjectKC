import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthRegister {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;
}

export class AuthLogin {
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
