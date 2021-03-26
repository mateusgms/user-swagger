import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  token
  private readonly users: User[] = [{
    id: "1",
    name: "Mateus",
    email: "mateus@mateus.com",
    cpf: "12312312312",
    password: "12345",
    access: 1,
    token: "1234567",
    creationDate: new Date
  },
  {
    id: "2",
    name: "Marcos",
    email: "marcos@marcos.com",
    cpf: "32112312312",
    password: "12345",
    access: 2,
    token: "123456",
    creationDate: new Date
  },
  {
    id: "3",
    name: "Felipe",
    email: "felipe@felipe.com",
    cpf: "32312312312",
    password: "12345",
    access: 1,
    token: "12345",
    creationDate: new Date
  },
  {
    id: "4",
    name: "Reinald",
    email: "Reinald@Reinald.com",
    cpf: "32315312312",
    password: "12345",
    access: 0,
    token: "1234",
    creationDate: new Date
  }];

  create(user: CreateUserDto): User {
    this.users.push(user);
    return user;
  }

  findOne(id: number): User {
    return this.users.find(user => parseInt(user.id) == id);
  }
  generateTokenByEmail(email: string): string {
    let user = this.users.find(user => user.email == email)
    console.log(user.token)
    return user.token

  }
  generateTokenByCpf(cpf: string): User {
    let user = this.users.find(user => user.cpf == cpf)
    user.token = Math.floor(Math.random() * (5 - 4)).toString();
    return user
  }
  findAll(): User[] {
    return this.users
  }
  updateUser(id: number, createUserDto: CreateUserDto): User {
    let user = this.findOne(id)

    user = createUserDto
    return user
  }
  getUserByToken(token: string, newPassword: string): void {
    let user = this.users.find(user => user.token == token)
    user.password = newPassword
  }
}
