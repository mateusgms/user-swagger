import { ApiProperty } from "@nestjs/swagger";
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

    @ApiProperty({})
    NAME: string;

    @ApiProperty({})
    @IsEmail()
    EMAIL: string;

    @ApiProperty({})
    @IsNotEmpty()
    CPF: string;

    @ApiProperty({})
    @IsNotEmpty()
    PASSWORD: string;

    @ApiProperty({})
    TOKEN_PASSWORD?: string;

    @ApiProperty({})
    ACCESS?: Array<Access>;

    @ApiProperty({})
    TYPE?: Tipo;

}