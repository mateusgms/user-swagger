import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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
@Entity('User')
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    NAME: string;

    @ApiProperty()
    @Column({ type: 'varchar', unique: true })
    EMAIL: string;

    @ApiProperty()
    @Column({ type: 'varchar', unique: true })
    CPF: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    PASSWORD: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    TOKEN_PASSWORD?: string;

    @ApiProperty()
    @Column({ type: 'set', enum: Access })
    ACCESS?: Array<Access>;

    @ApiProperty()
    @Column({ type: 'enum', enum: Tipo, nullable: false })
    TYPE?: Tipo;

}