import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    async validateByEmail(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUserWithEmail(email, password)
        if (!user) throw new UnauthorizedException();
        return user
    }
    async validateByCpf(cpf: string, password: string): Promise<any> {
        const user = await this.authService.validateUserWithCpf(cpf, password)
        if (!user) throw new UnauthorizedException();
        return user
    }
}