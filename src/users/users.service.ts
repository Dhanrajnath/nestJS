import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    // const { username, email, password } = createUserDto;

    const newUser = new User();
    newUser.username = createUserDto.username
    newUser.email = createUserDto.email
    newUser.password = createUserDto.password

    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const found = await this.usersRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User with id:${id} Not Found!`);
    }
    else {
      return found;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {

    const updatedUser = await this.usersRepository.update({ id: id }, updateUserDto);

    if (updatedUser.affected === 0) {
      throw new NotFoundException(`User with id:${id} Not Found while attempting to update!`);
    } else {
      return `User with id:${id} updated successfully!`;
    }
  }

  async remove(id: number): Promise<string> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id:${id} Not Found while attempting to delete!`);
    } else {
      return `User with id:${id} deleted successfully!`;
    }
  }
}
