import { Controller, Get, Post, Body, Patch, Param, Delete, Header, HttpCode, ValidationPipe, NotFoundException, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { TimeoutInterceptor } from 'src/timeout/timeout.interceptor';
import { DUser } from 'src/user/user.decorator';
import { CacheInterceptor } from '@nestjs/cache-manager';


@UseInterceptors(LoggingInterceptor, TimeoutInterceptor, CacheInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('test-decorator')
  findUser(@DUser() user: User) {
    console.log(user);
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    try {
      return this.usersService.findOne(+id);
    }
    catch (err) {
      throw new NotFoundException(`User with id:${id} not found.`);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto): Promise<string> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.usersService.remove(+id);
  }
}
