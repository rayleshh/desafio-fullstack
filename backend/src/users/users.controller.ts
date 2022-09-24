import {
  Controller,
  Get,
  Body,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findOne(@Body() getUserDto: GetUserDto) {
    return this.usersService.findOne(getUserDto).catch((err) => {
      throw new HttpException(`This user was not found.`, 404);
    });
  }
}
