import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

export class User {
    /**
    * The name of the Cat
    * @example Mat
    */
    @PrimaryGeneratedColumn('uuid')

    ID: string;

    @Column({ type: 'varchar' })
    NAME: string;

    @Column({ type: 'varchar' })
    EMAIL: string;

    @Column({ type: 'varchar' })
    CPF: string;

    @Column({ type: 'varchar' })
    PASSWORD: string;

    @Column({ type: 'varchar', default: "12345" })
    TOKEN_PASSWORD?: string;

    @Column({ type: 'array', default: ["READ"] })
    ACCESS?: Array<Access>;

    @Column({ type: 'varchar', default: "CONVIDADO" })
    TYPE?: Tipo;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    CREATED_AT: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    UPDATED_AT: Date;
}
