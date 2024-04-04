import { IsEmail, IsOptional } from "class-validator";

export class UpdateDto {
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;
}