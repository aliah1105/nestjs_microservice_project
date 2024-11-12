import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserSchema, UsersDocument } from './models/users.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UsersDocument.name,
        schema: UserSchema,
        collection: 'users', // Replace 'users' with your actual MongoDB collection name.
      },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
