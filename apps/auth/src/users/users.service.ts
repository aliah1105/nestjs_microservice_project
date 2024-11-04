import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    async createUser(createUserDto: CreateUserDto) {
        return await this.usersRepository.create(createUserDto);
    }
}
