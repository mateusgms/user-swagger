import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
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

  constructor(@InjectRepository(User)
  private readonly usersRepository: Repository<User>) { }



  async create(user: CreateUserDto): Promise<any> {
    if (true) {
      let tipo = Tipo[user.TYPE]

      user.ACCESS = this.addAccess(user.ACCESS)
      let newUser = await getConnection().getRepository(User).insert(user).then(result => { return result }).catch(e => { return e })
      return newUser

    }
  }

  async findOne(id: string): Promise<User> {
    let user = await getConnection().getRepository(User).createQueryBuilder("user").where('user.ID = :id', { id: id }).getOne()
    return user
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find().then(_users => { return _users; }).catch();
  }
  async generateTokenByEmail(email: string): Promise<string> {
    let user = await getConnection().getRepository(User).createQueryBuilder("user").where('user.EMAIL = :email', { email: email }).getOne()
    return user.TOKEN_PASSWORD
  }
  async generateTokenByCpf(cpf: string): Promise<String> {
    let user = await getConnection().getRepository(User).createQueryBuilder("user").where('user.CPF = :cpf', { cpf: cpf }).getOne()
    return user.TOKEN_PASSWORD
  }

  updateUser(id: string, createUserDto: CreateUserDto): Promise<User> {
    let user = this.findOne(id).then((user) => {
      if (createUserDto.CPF == user.CPF) {
        let tipo = Tipo[createUserDto.TYPE]
        user = createUserDto

        user.ACCESS = this.addAccess(createUserDto.ACCESS)
        return user
      }
    })
    return user
  }
  async getUserByToken(token: string, newPassword: string): Promise<string> {
    try {
      let user = await getConnection().getRepository(User).createQueryBuilder().select('User').from(User, "user").where('user.TOKEN_PASSWORD = :token', { token: token }).getOne()
      user.PASSWORD = newPassword
      return "senha alterada"
    } catch (error) {
      return "token invalido"
    }
  }
  async getUserByEmail(email: string): Promise<User> {
    let user = await getConnection().getRepository(User).createQueryBuilder().select('User').from(User, "user").where('user.email = :email', { email: email }).getOne()
    return user
  }
  async getUserByCpf(cpf: string): Promise<User> {
    let user = await getConnection().getRepository(User).createQueryBuilder().select('User').from(User, "user").where('user.cpf = :cpf', { cpf: cpf }).getOne()
    return user
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


