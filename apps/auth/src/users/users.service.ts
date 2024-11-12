import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    async createUser(createUserDto: CreateUserDto) {
        return await this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        })
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credentials are not valid');
        }
        return user;
    }
}
