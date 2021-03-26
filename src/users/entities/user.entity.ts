import { ApiProperty } from "@nestjs/swagger";

export class User {
    /**
    * The name of the Cat
    * @example Mat
    */
    @ApiProperty({
        description: 'auto generated ID',
    })
    id: string;

    @ApiProperty({
        example: 'Maine Coon',
        description: 'User name',
    })
    name: string;

    @ApiProperty({
        example: 'mateus@mateus.com',
        description: 'A valid e-mail',
    })
    email: string;

    @ApiProperty({
        example: '123.123.123-12',
        description: 'valid CPF',
    })
    cpf: string;

    @ApiProperty({
        description: 'auto generated token',
    })
    token?: string;
    @ApiProperty({
        example: "token123",
        description: 'permision access',
    })
    access: number;

    @ApiProperty({
        example: 'YourPassword',
        description: 'Users password',
    })
    password: string;

    @ApiProperty({

        description: 'Creation Date, created by application',
    })
    creationDate: Date;
}