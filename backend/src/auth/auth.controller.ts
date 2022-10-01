import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserDto } from './dto/getUserDto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() dto: GetUserDto) {
    return this.authService.login(dto).catch((err) => {
      throw new HttpException(
        `Email address and/or password provided are invalid.`,
        404,
      );
    });
  }
}
