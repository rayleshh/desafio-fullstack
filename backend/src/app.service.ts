import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! This is an API to help to controll the courses stored in a database';
  }
}
