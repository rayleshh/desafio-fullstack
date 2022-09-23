import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCourseDto: CreateCourseDto) {
    const data: Prisma.CourseCreateInput = {
      name: createCourseDto.courseName,
      teacher: { connect: { id: createCourseDto.teacherId } },
      classTime: { create: { timeStart: createCourseDto.timeStart, timeEnd: createCourseDto.timeEnd, classRoomId: createCourseDto.classRoomId } }
    }
    return await this.prisma.course.create({ data });
  }

  async findAll() {
    return await this.prisma.course.findMany({ include: { teacher: { select: { name: true } }, classTime: { include: { classRoom: true } } } });
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
