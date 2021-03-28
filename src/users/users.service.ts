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
    id: "1",
    name: "Mateus",
    email: "mateus@mateus.com",
    cpf: "12312312312",
    password: "12345",
    access: [Access["READ"]],
    token: "1234567",
    tipo: Tipo["CONVIDADO"],
    creationDate: new Date,
  },
  {
    id: "2",
    name: "Marcos",
    email: "marcos@marcos.com",
    cpf: "32112312312",
    password: "12345",
    access: [Access["READ"]],
    tipo: Tipo["CONVIDADO"],
    token: "123456",
    creationDate: new Date,
  },
  {
    id: "3",
    name: "Felipe",
    email: "felipe@felipe.com",
    cpf: "32312312312",
    password: "12345",
    access: [Access["READ"]],
    tipo: Tipo["CONVIDADO"],
    token: "12345",
    creationDate: new Date
  },
  {
    id: "4",
    name: "Reinald",
    email: "Reinald@Reinald.com",
    cpf: "32315312312",
    password: "12345",
    access: [Access["READ"]],
    tipo: Tipo["ADMIN"],
    token: "1234",
    creationDate: new Date
  }];

  create(user: CreateUserDto): User {
    if (true) {
      let tipo = Tipo[user.tipo]
      user.tipo = this.addTipo(Tipo[tipo])
      user.access = this.addAccess(user.access)
      return user
    }
  }

  findOne(id: number): Promise<User> {
    let user
    return new Promise<User>((resolve, reject) => {
      try {
        resolve(user = this.users.find(user => parseInt(user.id) == id))
      } catch (error) {
        reject(error)
      }
    })
  }
  generateTokenByEmail(email: string): string {
    let user = this.users.find(user => user.email == email)
    return user.token

  }
  generateTokenByCpf(cpf: string): String {
    let user = this.users.find(user => user.cpf == cpf)
    return user.token
  }
  findAll(): User[] {
    return this.users
  }
  updateUser(id: number, createUserDto: CreateUserDto): Promise<User> {
    let user = this.findOne(id).then((user) => {
      if (createUserDto.cpf == user.cpf) {
        let tipo = Tipo[createUserDto.tipo]
        user = createUserDto
        user.tipo = this.addTipo(Tipo[tipo])
        user.access = this.addAccess(createUserDto.access)
        return user
      }
    })
    return user
  }
  getUserByToken(token: string, newPassword: string): string {
    try {
      let user = this.users.find(user => user.token == token)
      user.password = newPassword
      return "senha alterada"
    } catch (error) {
      return "token invalido"
    }
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
      if (Access[element] != undefined && !accessArray.find(e => Access[e] == Access[element]) ) {
        accessArray.push(element)
      }
    }
    return accessArray
  }
}
