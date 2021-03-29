import { IsEmail, IsNotEmpty } from "class-validator";

enum Tipo {
    ADMIN,
    CONVIDADO
}
enum Access {
    CREATE,
    UPDATE,
    REMOVE,
    READ
}

export class CreateUserDto {

    ID: string;

    NAME: string;

    @IsEmail()
    EMAIL: string;

    @IsNotEmpty()
    CPF: string;

    @IsNotEmpty()
    PASSWORD: string;

    TOKEN_PASSWORD?: string;

    ACCESS?: Array<Access>;

    TYPE?: Tipo
    
    CREATED_AT: Date;

    UPDATED_AT: Date;
}