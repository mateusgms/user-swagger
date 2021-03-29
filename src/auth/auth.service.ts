import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async validateUserWithCpf(cpf: string, password: string): Promise<any> {
        const user = await this.userService.getUserByCpf(cpf)
        if (user && user.password === password) {
            const { password, ...result } = user
            return result
        }
        return null
    }
    async validateUserWithEmail(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email)
        if (user && user.password === password) {
            const { password, ...result } = user
            return result
        }
        return null
    }
}
