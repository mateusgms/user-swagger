import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
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

    
    @Get('/recover/email/:email')
    @ApiOperation({ summary: 'Reset password by email' })
    @ApiResponse({
        status: 200,
        description: 'Check your e-mail!',
        type: User,
    })
    resetPasswordByEmail(@Param('email') email: string): string {
        return this.usersService.generateTokenByEmail(email)
    }
    @Get('/recover/cpf/:cpf')
    @ApiOperation({ summary: 'Reset password by cpf' })
    @ApiResponse({
        status: 200,
        description: 'Check your e-mail!',
        type: User
    })
    resetPasswordByCpf(@Param('cpf') cpf: string): String {
        let user = this.usersService.generateTokenByCpf(cpf)
        return user
    }
    @Post('resetpassword/')
    @ApiOperation({ summary: 'Reset password with token' })
    @ApiResponse({
        status: 200,
        description: 'Reset password!'
    })
    resetPassword(@Body() updatePassword: UpdatePasswordDto): string {
        let text = this.usersService.getUserByToken(updatePassword.token, updatePassword.password)
        return text
    }
}