import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserDto } from './dto/getUserDto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService){}
  
  async login(dto: GetUserDto): Promise<boolean> {
    const user: User = await this.prisma.user.findUniqueOrThrow({where: {email: dto.email}})
    if(user.password === dto.password){
      return true
    } else {
      throw new Error()
    }
  }
}
