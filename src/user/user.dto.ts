import {
    IsString,
    IsNotEmpty,
    IsEmail,
    Length,
    IsPositive,
    IsOptional,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateUserDto {
    @IsString()
    @IsEmail()
    @ApiProperty({ description: 'the email of user' })
    readonly email: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(6)
    @ApiProperty()
     password: string;

     @IsOptional()
     @IsPositive()
     @ApiProperty()
     readonly id: number;
  

  }
