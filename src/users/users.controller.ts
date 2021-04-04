import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @Put('/')
    @ApiBody({ type: CreateUserDto })
    @ApiQuery({ name: 'id' })
    @ApiOperation({ summary: 'Update an user' })
    updateOne(@Query('id') id: string, @Body() createUserDto: CreateUserDto): any {
        let user
        let response = this.usersService.updateUser(id, createUserDto).then(_user => {
            if (_user != null) return user = _user
            return 'Invalid CPF'
        }).catch(e => { return 'Something wrong with your form: ' + e })
        return response

    }
    @Get('/id/')
    @ApiOperation({ summary: 'Get an single user' })
    @ApiQuery({ name: 'id' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: User,
    })
    findOne(@Query('id') id: string): User {
        let user = this.usersService.findOne(id).then(_user => user = _user);
        return user
    }
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: [User],
    })
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }


    @Get('/recover/email')
    @ApiOperation({ summary: 'Reset password by email' })
    @ApiQuery({ name: 'email' })
    @ApiResponse({
        status: 200,
        description: 'Check your e-mail!',
        type: User,
    })
    resetPasswordByEmail(@Query('email') email: string): Promise<string> {
        return this.usersService.generateTokenByEmail(email)
    }
    @Get('/recover/cpf')
    @ApiOperation({
        summary: 'Reset password by cpf'
    })
    @ApiQuery({ name: 'cpf' })
    @ApiResponse({
        status: 200,
        description: 'Check your e-mail!'
    })
    resetPasswordByCpf(@Query('cpf') cpf: string): Promise<String> {

        return this.usersService.generateTokenByCpf(cpf).catch()
    }
    @Post('resetpassword/')
    @ApiBody({ type: String })
    @ApiOperation({ summary: 'Reset password with token' })
    @ApiResponse({
        status: 200,
        description: 'Reset password!'
    })
    resetPassword(@Body() updatePassword: UpdatePasswordDto): Promise<string> {
        let text = this.usersService.getUserByToken(updatePassword.token, updatePassword.password)
        return text
    }
}