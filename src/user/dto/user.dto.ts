import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegister {
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
