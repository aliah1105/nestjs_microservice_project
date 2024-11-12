import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGaurd } from './guards/local-auth.guard';
import { CurrentUserDecorator } from './current-user.decorator';
import { UsersDocument } from './users/models/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  async login(
    @CurrentUserDecorator() user: UsersDocument,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }
}
