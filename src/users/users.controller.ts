import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
    @Put(':id')
    @ApiOperation({ summary: 'Update an user' })
    updateOne(@Param('id') id: number, @Body() createUserDto: CreateUserDto): User {
        let user = this.usersService.updateUser(id, createUserDto)
        return user
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get an single user' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: User,
    })
    findOne(@Param('id') id: string): User {
        return this.usersService.findOne(+id);
    }
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: [User],
    })
    findAll(): User[] {
        return this.usersService.findAll();
    }
    @Get(':email')
    @ApiOperation({ summary: 'Reset password by email' })
    @ApiResponse({
        status: 200,
        description: 'Check your e-mail!',
        type: String,
    })
    resetPasswordByEmail(@Param('email') email: string): Object {
        let token = this.usersService.generateTokenByEmail(email)
        return { "sass": token }
    }
    @Get(':cpf')
    @ApiOperation({ summary: 'Reset password by cpf' })
    @ApiResponse({
        status: 200,
        description: 'Check your e-mail!'
    })
    resetPasswordByCpf(@Param('cpf') cpf: string): string {
        let user = this.usersService.generateTokenByCpf(cpf)
        return user.token
    }
    @Post(':token')
    @ApiOperation({ summary: 'Reset password with token' })
    @ApiResponse({
        status: 200,
        description: 'Reset password!'
    })
    resetPassword(@Param('token') token: string, @Body() password: string): string {
        let user = this.usersService.getUserByToken(token, password)
        return 'Senha alterada'
    }
}