import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

// const configServiceProvider = {
//   provide: ConfigService,
//   useClass: process.env.NODE_ENV === 'dev' ? DevConfigService : ProdConfigService,
// };


@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  // providers: [UsersService],
  // providers: [configServiceProvider],
  providers: [
    {
      provide: UsersService,
      useClass: UsersService
    },
  ]
})
export class UsersModule { }
