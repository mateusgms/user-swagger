import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    id: string;

    name: string;
    @IsNotEmpty()
    cpf: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    token?: string;

    access: number;

    creationDate: Date;
}