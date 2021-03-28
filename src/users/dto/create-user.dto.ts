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

type TipoStrings = keyof typeof Tipo;
type TipoAccess = keyof typeof Access;

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

    access?: Array<String>;

    tipo?: Tipo
    
    creationDate: Date;
    addTipo( tipo: TipoStrings, ) {
        this.tipo = Tipo[tipo] == undefined ? 1 : Tipo[tipo]
    }
    addAccess(access: Array<TipoAccess>){
        this.access = Object.keys(this.handleAccess(access))
    }
    handleAccess(access: Array<TipoAccess>): Object {
        let objAcess = Object.create(Access);
        for (let i = 0; i < access.length; i++) {
            const element = access[i];
            if (Access[element] != undefined) {
                objAcess[element] = ''
            }
        }
        return objAcess
    }
}