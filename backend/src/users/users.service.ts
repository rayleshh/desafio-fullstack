import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserDto } from './dto/get-user.dto';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(dto: GetUserDto) {
    return await this.prisma.user.findUniqueOrThrow({ where: { email: dto.email } });
  }

}
