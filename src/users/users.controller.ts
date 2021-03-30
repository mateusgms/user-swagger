import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
    @Put(':id')
    @ApiBody({ type: CreateUserDto })
    @ApiOperation({ summary: 'Update an user' })
    updateOne(@Param('id') id: number, @Body() createUserDto: CreateUserDto): any {
        let user
        let response = this.usersService.updateUser(id, createUserDto).then(_user => {
            if (_user != null) return user = _user
            return 'Invalid CPF'
        }).catch(e => { return 'Something wrong with your form: ' + e })
        return response

    }
    @Get(':id')
    @ApiOperation({ summary: 'Get an single user' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: User,
    })
    findOne(@Param('id') id: string): User {
        let user = this.usersService.findOne(+id).then(_user => user = _user);
        return user
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
    @ApiBody({ type: String })
    @ApiOperation({ summary: 'Reset password by cpf' })
    @ApiResponse({
        status: 200,
        description: 'Check your e-mail!',
    })
    resetPasswordByCpf(@Param('cpf') cpf: string): String {
        return this.usersService.generateTokenByCpf(cpf)
    }
    @Post('resetpassword/')
    @ApiBody({ type: String })
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