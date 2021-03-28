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

    id: string;

    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    password: string;

    token?: string;

    access?: Array<Access>;

    tipo?: Tipo
    
    creationDate: Date;
}