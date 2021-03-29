import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
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
type AccessString = keyof typeof Access;

@Injectable()
export class UsersService {


  private readonly users: User[] = [{
    ID: "1",
    NAME: "Mateus",
    EMAIL: "mateus@mateus.com",
    CPF: "12312312312",
    PASSWORD: "12345",
    ACCESS: [Access["READ"]],
    TYPE: Tipo["CONVIDADO"],
    TOKEN_PASSWORD: "1234567",
    CREATED_AT: new Date,
    UPDATED_AT: new Date
  },
  {
    ID: "2",
    NAME: "Marcos",
    EMAIL: "marcos@marcos.com",
    CPF: "32112312312",
    PASSWORD: "12345",
    ACCESS: [Access["READ"]],
    TYPE: Tipo["CONVIDADO"],
    TOKEN_PASSWORD: "123456",
    CREATED_AT: new Date,
    UPDATED_AT: new Date
  },
  {
    ID: "3",
    NAME: "Felipe",
    EMAIL: "felipe@felipe.com",
    CPF: "32312312312",
    PASSWORD: "12345",
    ACCESS: [Access["READ"]],
    TYPE: Tipo["CONVIDADO"],
    TOKEN_PASSWORD: "12345",
    CREATED_AT: new Date,

    UPDATED_AT: new Date
  },
  {
    ID: "4",
    NAME: "Reinald",
    EMAIL: "Reinald@Reinald.com",
    CPF: "32315312312",
    PASSWORD: "12345",
    ACCESS: [Access["READ"]],
    TYPE: Tipo["ADMIN"],
    TOKEN_PASSWORD: "1234",
    CREATED_AT: new Date,

    UPDATED_AT: new Date
  }];

  create(user: CreateUserDto): User {
    if (true) {
      let tipo = Tipo[user.TYPE]
      user.TYPE = this.addTipo(Tipo[tipo])
      user.ACCESS = this.addAccess(user.ACCESS)
      return user
    }
  }

  findOne(id: number): Promise<User> {
    let user
    return new Promise<User>((resolve, reject) => {
      try {
        resolve(user = this.users.find(user => parseInt(user.ID) == id))
      } catch (error) {
        reject(error)
      }
    })
  }
  generateTokenByEmail(email: string): string {
    let user = this.users.find(user => user.EMAIL == email)
    return user.TOKEN_PASSWORD
  }
  generateTokenByCpf(cpf: string): String {
    let user = this.users.find(user => user.CPF == cpf)
    return user.TOKEN_PASSWORD
  }
  findAll(): User[] {
    return this.users
  }
  updateUser(id: number, createUserDto: CreateUserDto): Promise<User> {
    let user = this.findOne(id).then((user) => {
      if (createUserDto.CPF == user.CPF) {
        let tipo = Tipo[createUserDto.TYPE]
        user = createUserDto
        user.TYPE = this.addTipo(Tipo[tipo])
        user.ACCESS = this.addAccess(createUserDto.ACCESS)
        return user
      }
    })
    return user
  }
  getUserByToken(token: string, newPassword: string): string {
    try {
      let user = this.users.find(user => user.TOKEN_PASSWORD == token)
      user.PASSWORD = newPassword
      return "senha alterada"
    } catch (error) {
      return "token invalido"
    }
  }
  getUserByEmail(email: string): User {
    return this.users.find(user => user.EMAIL == email)
  }
  getUserByCpf(cpf: string): User {
    return this.users.find(user => user.CPF == cpf)
  }
  addTipo(tipo: TipoStrings) {
    let _tipo = Tipo[tipo] == 1 ? 1 : Tipo[tipo]
    return _tipo

  }
  addAccess(access: Array<Access>): Array<Access> {
    let _access
    return _access = this.handleAccess(access)
  }
  handleAccess(access: Array<Access>): Array<Access> {
    let accessArray: Array<Access> = []
    for (let i = 0; i < access.length; i++) {
      const element = access[i];
      if (Access[element] != undefined && !accessArray.find(e => Access[e] == Access[element])) {
        accessArray.push(element)
      }
    }
    return accessArray
  }
}
