import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, minLength } from "class-validator";


export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    password: string;

}
