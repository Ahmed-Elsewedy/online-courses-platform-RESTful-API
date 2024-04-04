import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../interface/role";

export class AuthenticateDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    role: Role;

}